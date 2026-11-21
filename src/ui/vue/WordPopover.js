import { defineComponent, computed } from 'vue';
import { appState, syncVocabToState } from './appState.js';
import { getHostDocument, getHostWindow, notify } from '../../core/host.js';
import { getConfig } from '../../config.js';
import { lookupWord, prefetchWord, getDictionaryChainForLang, getDictionary } from '../../dictionaries/registry.js';
import { translateText } from '../../translators/registry.js';
import { speakWord, speakSentence } from '../../core/tts.js';
import { extractSentenceAroundWord } from '../../core/tokenizer.js';
import { isCleanTap } from '../../core/gestureGuard.js';
import {
  findVocabItem,
  saveVocabWord,
  removeVocabWord,
  setActiveBook,
} from '../../core/vocabStore.js';

let activeWordEl = null;
let clickHandler = null;
let pointerDownPrefetchHandler = null;
let keydownHandler = null;
let lookupSeq = 0;

export function closeWordPopover() {
  appState.popover.visible = false;
  appState.popover.showBookPicker = false;
  if (activeWordEl) {
    activeWordEl.classList.remove('tl-word-active');
    activeWordEl = null;
  }
}

/**
 * 智能避让定位算法：
 * 测量单词及其所在句子的纵向保护带，自动决定弹窗停靠在「上方」还是「下方」，
 * 并动态约束 maxHeight，绝不遮挡所点单词和所在句，且移动端绝不左右溢出！
 */
function computeSmartPopoverStyle(wordEl) {
  const win = getHostWindow();
  const doc = getHostDocument();
  const vw = win.visualViewport?.width || win.innerWidth;
  const vh = win.visualViewport?.height || win.innerHeight;
  const margin = 10;
  const sentenceBuffer = 26; // 为单词上下留出约 1-1.5 行保护带，确保所在句不被遮挡

  let rect = wordEl.getBoundingClientRect();

  // 如果单词位于屏幕正中且上下空间都偏紧，轻微平滑滚动 #chat 把单词移到舒适区
  const rawAbove = rect.top - sentenceBuffer - margin;
  const rawBelow = vh - (rect.bottom + sentenceBuffer) - margin;
  if (rawAbove < 210 && rawBelow < 210) {
    const chatEl = doc.getElementById('chat');
    if (chatEl && chatEl.scrollHeight > chatEl.clientHeight) {
      const targetY = Math.round(vh * 0.28);
      const delta = rect.top - targetY;
      chatEl.scrollTop += delta;
      rect = wordEl.getBoundingClientRect();
    }
  }

  const protectTop = Math.max(margin, rect.top - sentenceBuffer);
  const protectBottom = Math.min(vh - margin, rect.bottom + sentenceBuffer);
  const spaceAbove = protectTop - margin;
  const spaceBelow = vh - protectBottom - margin;

  const placement = spaceBelow >= spaceAbove ? 'below' : 'above';
  const style = {};

  if (placement === 'below') {
    const top = Math.min(vh - 180, Math.round(protectBottom + 6));
    const maxH = Math.max(170, Math.min(400, Math.round(vh - top - margin - 6)));
    style.top = `${top}px`;
    style.bottom = 'auto';
    style.maxHeight = `${maxH}px`;
  } else {
    const bottom = Math.min(vh - 180, Math.round(vh - protectTop + 6));
    const maxH = Math.max(170, Math.min(400, Math.round(vh - bottom - margin - 6)));
    style.bottom = `${bottom}px`;
    style.top = 'auto';
    style.maxHeight = `${maxH}px`;
  }

  if (vw <= 640) {
    style.left = `${margin}px`;
    style.right = `${margin}px`;
    style.width = 'auto';
  } else {
    const cardWidth = Math.min(368, vw - margin * 2);
    const left = Math.max(margin, Math.min(rect.left + rect.width / 2 - cardWidth / 2, vw - cardWidth - margin));
    style.left = `${Math.round(left)}px`;
    style.right = 'auto';
    style.width = `${cardWidth}px`;
  }

  return { placement, style };
}

export async function openWordPopoverForElement(wordEl, sourceId = null) {
  const word = wordEl.dataset.tlWord || wordEl.textContent || '';
  const lang = wordEl.dataset.tlLang || getConfig().targetLang || 'en';
  if (!word.trim()) return;

  if (activeWordEl && activeWordEl !== wordEl) {
    activeWordEl.classList.remove('tl-word-active');
  }
  activeWordEl = wordEl;
  activeWordEl.classList.add('tl-word-active');

  const contextSentence = extractSentenceAroundWord(wordEl);
  const { placement, style } = computeSmartPopoverStyle(wordEl);

  const seq = ++lookupSeq;
  const pop = appState.popover;
  pop.visible = true;
  pop.loading = true;
  pop.word = word;
  pop.lang = lang;
  pop.contextSentence = contextSentence;
  pop.entry = null;
  pop.activeSourceId = sourceId || '';
  pop.sentenceTranslation = '';
  pop.sentenceLoading = false;
  pop.showBookPicker = false;
  pop.placement = placement;
  pop.style = style;

  if (!sourceId && getConfig().autoSpeakWord) {
    speakWord(word, { lang }).catch(() => {});
  }

  const entry = await lookupWord(word, {
    lang,
    context: contextSentence,
    sourceId,
    onUpdate(partial, stillLoading) {
      if (seq !== lookupSeq || !appState.popover.visible) return;
      pop.entry = partial;
      pop.loading = stillLoading;
      if (partial?.sourceId) {
        pop.activeSourceId = sourceId || partial.sourceId;
      }
      if (!sourceId && getConfig().autoSpeakWord && partial?.audioUrl) {
        speakWord(word, { lang, audioUrl: partial.audioUrl }).catch(() => {});
      }
    },
  });

  if (seq !== lookupSeq || !appState.popover.visible) return;
  pop.loading = false;
  if (entry) {
    pop.entry = entry;
    pop.activeSourceId = sourceId || entry.sourceId || '';
  }
}

export function initPopoverListeners() {
  destroyPopoverListeners();
  const doc = getHostDocument();

  clickHandler = (e) => {
    if (e.target?.closest?.('.tl-popover, .tl-sel-bar, .tl-modal-backdrop')) return;

    const wordEl = e.target?.closest?.('span.tl-word');
    if (wordEl && getConfig().enabled) {
      // 防误触：上下滚动、左右翻页、长按选词一律不触发点按查词
      if (!isCleanTap(e)) return;
      e.stopPropagation();
      openWordPopoverForElement(wordEl);
      return;
    }

    if (appState.popover.visible) {
      closeWordPopover();
    }
  };

  pointerDownPrefetchHandler = (e) => {
    if (!getConfig().enabled) return;
    const wordEl = e.target?.closest?.('span.tl-word');
    if (!wordEl) return;
    const w = wordEl.dataset.tlWord || wordEl.textContent || '';
    const lang = wordEl.dataset.tlLang || getConfig().targetLang || 'en';
    if (w.trim()) prefetchWord(w, lang);
  };

  keydownHandler = (e) => {
    if (e.key === 'Escape' && appState.popover.visible) {
      closeWordPopover();
    }
  };

  doc.addEventListener('pointerdown', pointerDownPrefetchHandler, { passive: true });
  doc.addEventListener('click', clickHandler, false);
  doc.addEventListener('keydown', keydownHandler, false);
}

export function destroyPopoverListeners() {
  closeWordPopover();
  const doc = getHostDocument();
  if (pointerDownPrefetchHandler) {
    doc.removeEventListener('pointerdown', pointerDownPrefetchHandler);
    pointerDownPrefetchHandler = null;
  }
  if (clickHandler) {
    doc.removeEventListener('click', clickHandler, false);
    clickHandler = null;
  }
  if (keydownHandler) {
    doc.removeEventListener('keydown', keydownHandler, false);
    keydownHandler = null;
  }
}

export const WordPopover = defineComponent({
  name: 'WordPopover',
  setup() {
    const pop = appState.popover;

    const sources = computed(() => {
      const chain = getDictionaryChainForLang(pop.lang);
      return chain.map((id) => getDictionary(id)).filter(Boolean);
    });

    const starredItem = computed(() => {
      // 依赖 appState.vocab.items 以确保响应式更新
      void appState.vocab.items;
      return findVocabItem(pop.entry?.word || pop.word, pop.lang);
    });

    const books = computed(() => appState.vocab.books || []);

    function getDisplayWord() {
      return pop.entry?.word || pop.word;
    }

    function onSpeakWord() {
      speakWord(getDisplayWord(), {
        lang: pop.lang,
        audioUrl: pop.entry?.audioUrl || '',
      }).catch(() => {});
    }

    function onSpeakExample(ex) {
      if (ex) speakSentence(ex, { lang: pop.lang }).catch(() => {});
    }

    function onSpeakSentence() {
      if (pop.contextSentence) {
        speakSentence(pop.contextSentence, { lang: pop.lang }).catch(() => {});
      }
    }

    async function onTranslateSentence() {
      if (!pop.contextSentence || pop.sentenceLoading) return;
      pop.sentenceLoading = true;
      pop.sentenceTranslation = '';
      try {
        pop.sentenceTranslation = await translateText(pop.contextSentence, {
          from: pop.lang,
          to: 'zh-CN',
        });
      } catch (err) {
        pop.sentenceTranslation = `翻译失败：${err?.message || '网络异常'}`;
      } finally {
        pop.sentenceLoading = false;
      }
    }

    function onSwitchSource(sourceId) {
      if (activeWordEl) {
        openWordPopoverForElement(activeWordEl, sourceId);
      }
    }

    function buildSavePayload(bookId) {
      const firstMeaning = pop.entry?.meanings?.[0];
      const firstDef = firstMeaning?.definitions?.[0];
      return {
        word: getDisplayWord(),
        lang: pop.lang,
        bookId,
        phonetic: pop.entry?.phonetic || '',
        reading: pop.entry?.reading || '',
        pos: firstMeaning?.posInfo?.abbr || firstMeaning?.pos || '',
        briefCn: pop.entry?.briefCn || firstDef?.cn || firstDef?.text || '',
        context: pop.contextSentence || '',
        audioUrl: pop.entry?.audioUrl || '',
      };
    }

    function onToggleStar() {
      const w = getDisplayWord();
      if (starredItem.value) {
        removeVocabWord(w, pop.lang);
        syncVocabToState();
        notify(`已移出生词本：${w}`, 'info');
      } else {
        const bookId = appState.vocab.activeBookId;
        saveVocabWord(buildSavePayload(bookId));
        syncVocabToState();
        const bookName = books.value.find((b) => b.id === bookId)?.name || '生词本';
        notify(`已收藏到「${bookName}」`, 'success');
      }
    }

    function onSaveToBook(bookId) {
      setActiveBook(bookId);
      saveVocabWord(buildSavePayload(bookId));
      syncVocabToState();
      pop.showBookPicker = false;
      const bookName = books.value.find((b) => b.id === bookId)?.name || '生词本';
      notify(`已保存到「${bookName}」`, 'success');
    }

    return {
      pop,
      sources,
      starredItem,
      books,
      closeWordPopover,
      onSpeakWord,
      onSpeakExample,
      onSpeakSentence,
      onTranslateSentence,
      onSwitchSource,
      onToggleStar,
      onSaveToBook,
    };
  },
  template: `
    <div
      v-if="pop.visible"
      class="tl-popover tl-ignore"
      :class="'tl-pop-' + pop.placement"
      :style="pop.style"
      @click.stop
    >
      <div class="tl-pop-header">
        <div class="tl-pop-word-group">
          <div class="tl-pop-word">{{ pop.entry?.word || pop.word }}</div>
          <div class="tl-pop-meta">
            <span v-if="pop.entry?.reading">{{ pop.entry.reading }}</span>
            <span v-if="pop.entry?.phonetic">{{ pop.entry.phonetic }}</span>
            <span v-for="(tag, idx) in (pop.entry?.tags || [])" :key="idx">· {{ tag }}</span>
          </div>
          <div v-if="pop.entry?.briefCn" class="tl-pop-brief">{{ pop.entry.briefCn }}</div>
        </div>

        <div class="tl-pop-actions">
          <button type="button" class="tl-icon-btn" @click="onSpeakWord" title="朗读单词">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button
            type="button"
            class="tl-icon-btn"
            :class="{ 'tl-star-active': Boolean(starredItem) }"
            @click="onToggleStar"
            :title="starredItem ? '取消星标收藏' : '加星标收藏'"
          >
            <i :class="starredItem ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
          </button>
          <button
            type="button"
            class="tl-icon-btn"
            @click="pop.showBookPicker = !pop.showBookPicker"
            title="选择存入的单词本"
          >
            <i class="fa-solid fa-folder-plus"></i>
          </button>
          <button type="button" class="tl-icon-btn" @click="closeWordPopover" title="关闭">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- 快捷选择存入指定单词本 -->
      <div v-if="pop.showBookPicker" class="tl-book-picker">
        <span class="tl-book-picker-label">存入单词本：</span>
        <button
          v-for="b in books"
          :key="b.id"
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': starredItem?.bookId === b.id }"
          @click="onSaveToBook(b.id)"
        >
          <i class="fa-solid fa-book"></i> {{ b.name }}
        </button>
      </div>

      <div class="tl-pop-sources">
        <button
          v-for="dict in sources"
          :key="dict.id"
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': pop.activeSourceId === dict.id }"
          @click="onSwitchSource(dict.id)"
        >
          {{ dict.name }}
        </button>
      </div>

      <div class="tl-pop-body">
        <div v-if="pop.entry && pop.entry.meanings && pop.entry.meanings.length">
          <div v-for="(m, mi) in pop.entry.meanings" :key="mi" class="tl-meaning-block">
            <div class="tl-pos-badge" :class="'tl-pos-' + (m.posInfo?.tone || 'other')">
              {{ [m.posInfo?.abbr, m.posInfo?.cn].filter(Boolean).join(' ') || m.pos || '词义' }}
            </div>
            <div v-for="(d, di) in m.definitions" :key="di" class="tl-def-item">
              <div v-if="d.cn" class="tl-def-cn">{{ d.cn }}</div>
              <div v-if="d.text" class="tl-def-orig">{{ d.text }}</div>
              <div
                v-if="d.example"
                class="tl-def-example"
                @click="onSpeakExample(d.example)"
                title="朗读例句"
              >
                <i class="fa-solid fa-volume-high"></i>
                <span>{{ d.example }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="pop.loading" class="tl-def-orig tl-loading-row">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <span>{{ pop.entry?.briefCn ? '加载详细词典...' : '查询中...' }}</span>
        </div>

        <div v-else-if="!pop.entry" class="tl-def-orig">
          未找到词条，可切换「AI 精讲」或翻译整句
        </div>

        <div v-if="pop.sentenceLoading || pop.sentenceTranslation" class="tl-sentence-box">
          <div class="tl-sentence-orig">{{ pop.contextSentence }}</div>
          <div v-if="pop.sentenceLoading" class="tl-def-orig">
            <i class="fa-solid fa-spinner fa-spin"></i>
          </div>
          <div v-else class="tl-sentence-cn">{{ pop.sentenceTranslation }}</div>
        </div>
      </div>

      <div class="tl-pop-footer">
        <span class="tl-pop-footer-label">整句</span>
        <div class="tl-pop-footer-actions">
          <button type="button" class="tl-icon-btn" @click="onSpeakSentence" title="朗读整句">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button type="button" class="tl-icon-btn" @click="onTranslateSentence" title="翻译整句">
            <i class="fa-solid fa-language"></i>
          </button>
        </div>
      </div>
    </div>
  `,
});
