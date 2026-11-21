import { defineComponent, ref, computed } from 'vue';
import { appState, syncVocabToState } from './appState.js';
import { getHostWindow, notify } from '../../core/host.js';
import { listLanguages } from '../../languages/registry.js';
import { speakWord, speakSentence } from '../../core/tts.js';
import {
  createBook,
  deleteBook,
  removeVocabWord,
  moveVocabWord,
  setActiveBook,
  exportVocabJson,
  importVocabJson,
} from '../../core/vocabStore.js';

export const VocabBookView = defineComponent({
  name: 'VocabBookView',
  setup() {
    const selectedBookId = ref('all');
    const selectedLang = ref('all');
    const searchQuery = ref('');
    const newBookName = ref('');
    const showCreateBook = ref(false);

    const books = computed(() => appState.vocab.books || []);
    const totalCount = computed(() => (appState.vocab.items || []).length);
    const activeBookId = computed(() => appState.vocab.activeBookId);
    const languages = computed(() => listLanguages());

    const filteredItems = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      return (appState.vocab.items || []).filter((it) => {
        if (selectedBookId.value !== 'all' && it.bookId !== selectedBookId.value) return false;
        if (selectedLang.value !== 'all' && it.lang !== selectedLang.value) return false;
        if (q) {
          const hay = `${it.word} ${it.briefCn} ${it.reading} ${it.context}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
    });

    function countByBook(bookId) {
      return (appState.vocab.items || []).filter((it) => it.bookId === bookId).length;
    }

    function onCreateBook() {
      const name = newBookName.value.trim();
      if (!name) return;
      const b = createBook(name);
      if (b) {
        syncVocabToState();
        selectedBookId.value = b.id;
        newBookName.value = '';
        showCreateBook.value = false;
        notify(`已新建单词本「${b.name}」`, 'success');
      }
    }

    function onSetDefaultBook(bookId) {
      setActiveBook(bookId);
      syncVocabToState();
      notify('已设为默认收藏单词本', 'success');
    }

    function onDeleteBook(book) {
      if (books.value.length <= 1) {
        notify('至少保留一个单词本', 'warning');
        return;
      }
      deleteBook(book.id);
      syncVocabToState();
      if (selectedBookId.value === book.id) selectedBookId.value = 'all';
      notify(`已删除「${book.name}」，词条已保留到默认本`, 'info');
    }

    function onMoveItem(item, e) {
      moveVocabWord(item.id, e.target.value);
      syncVocabToState();
      notify('已移动至目标单词本', 'success');
    }

    function onRemoveItem(item) {
      removeVocabWord(item.id);
      syncVocabToState();
    }

    function onSpeakItem(item) {
      speakWord(item.word, { lang: item.lang, audioUrl: item.audioUrl }).catch(() => {});
    }

    function onSpeakContext(item) {
      if (item.context) speakSentence(item.context, { lang: item.lang }).catch(() => {});
    }

    async function onExport() {
      try {
        await getHostWindow().navigator.clipboard.writeText(exportVocabJson());
        notify('生词本 JSON 已复制到剪贴板', 'success');
      } catch {
        notify('复制失败，请检查剪贴板权限', 'warning');
      }
    }

    function onImport() {
      const win = getHostWindow();
      const raw = win.prompt('请粘贴之前导出的生词本 JSON：');
      if (!raw) return;
      try {
        const total = importVocabJson(raw);
        syncVocabToState();
        notify(`导入成功，当前共 ${total} 条生词`, 'success');
      } catch (err) {
        notify(`导入失败：${err?.message || '格式错误'}`, 'error');
      }
    }

    return {
      selectedBookId,
      selectedLang,
      searchQuery,
      newBookName,
      showCreateBook,
      books,
      totalCount,
      activeBookId,
      languages,
      filteredItems,
      countByBook,
      onCreateBook,
      onSetDefaultBook,
      onDeleteBook,
      onMoveItem,
      onRemoveItem,
      onSpeakItem,
      onSpeakContext,
      onExport,
      onImport,
    };
  },
  template: `
    <div class="tl-vocab-wrap">
      <!-- 单词本横向标签栏 -->
      <div class="tl-book-bar">
        <button
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': selectedBookId === 'all' }"
          @click="selectedBookId = 'all'"
        >
          全部 ({{ totalCount }})
        </button>
        <button
          v-for="b in books"
          :key="b.id"
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': selectedBookId === b.id }"
          @click="selectedBookId = b.id"
        >
          <i v-if="b.id === activeBookId" class="fa-solid fa-star"></i>
          {{ b.name }} ({{ countByBook(b.id) }})
        </button>
        <button type="button" class="tl-source-pill" @click="showCreateBook = !showCreateBook">
          <i class="fa-solid fa-plus"></i> 新建本
        </button>
      </div>

      <!-- 新建单词本输入框 -->
      <div v-if="showCreateBook" class="tl-inline-form">
        <input
          v-model="newBookName"
          type="text"
          class="tl-input"
          placeholder="输入新单词本名称（如：日语高频 / 剧情好词）"
          @keyup.enter="onCreateBook"
        />
        <button type="button" class="tl-btn tl-btn-primary" @click="onCreateBook">创建</button>
      </div>

      <!-- 当前选中单词本的管理快捷操作 -->
      <div v-if="selectedBookId !== 'all'" class="tl-book-manage-row">
        <button
          v-if="selectedBookId !== activeBookId"
          type="button"
          class="tl-icon-btn"
          @click="onSetDefaultBook(selectedBookId)"
        >
          <i class="fa-regular fa-star"></i><span>设为默认收藏本</span>
        </button>
        <span v-else class="tl-hint" style="margin:0;">
          <i class="fa-solid fa-star"></i> 当前为默认收藏本
        </span>
        <button
          v-if="books.length > 1"
          type="button"
          class="tl-icon-btn"
          @click="onDeleteBook(books.find(b => b.id === selectedBookId))"
        >
          <i class="fa-regular fa-trash-can"></i><span>删除此本</span>
        </button>
      </div>

      <!-- 搜索与语种过滤 -->
      <div class="tl-vocab-filters">
        <input
          v-model="searchQuery"
          type="text"
          class="tl-input"
          placeholder="搜索单词、释义或原句..."
        />
        <select v-model="selectedLang" class="tl-select tl-lang-filter">
          <option value="all">全部语种</option>
          <option v-for="l in languages" :key="l.code" :value="l.code">{{ l.name }}</option>
        </select>
      </div>

      <!-- 生词列表 -->
      <div v-if="filteredItems.length === 0" class="tl-empty-state">
        <i class="fa-regular fa-star"></i>
        <div>暂无收藏的单词</div>
        <div class="tl-hint">点按聊天里的任意外语单词，点击星标即可加入生词本</div>
      </div>

      <div v-else class="tl-vocab-list">
        <div v-for="item in filteredItems" :key="item.id" class="tl-vocab-card">
          <div class="tl-vocab-card-top">
            <div class="tl-vocab-word-main">
              <span class="tl-vocab-word">{{ item.word }}</span>
              <span v-if="item.reading || item.phonetic" class="tl-vocab-meta">
                {{ item.reading || item.phonetic }}
              </span>
              <span v-if="item.pos" class="tl-pos-badge tl-pos-other" style="margin:0;">{{ item.pos }}</span>
            </div>
            <div class="tl-vocab-actions">
              <button type="button" class="tl-icon-btn" @click="onSpeakItem(item)" title="朗读单词">
                <i class="fa-solid fa-volume-high"></i>
              </button>
              <button type="button" class="tl-icon-btn" @click="onRemoveItem(item)" title="移出生词本">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>

          <div v-if="item.briefCn" class="tl-vocab-cn">{{ item.briefCn }}</div>

          <div v-if="item.context" class="tl-vocab-ctx" @click="onSpeakContext(item)" title="点击朗读原句">
            <i class="fa-solid fa-volume-high"></i>
            <span>{{ item.context }}</span>
          </div>

          <div class="tl-vocab-card-foot">
            <span class="tl-hint" style="margin:0;">语种：{{ item.lang.toUpperCase() }}</span>
            <select class="tl-select tl-mini-select" :value="item.bookId" @change="onMoveItem(item, $event)">
              <option v-for="b in books" :key="b.id" :value="b.id">{{ b.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="tl-vocab-io">
        <button type="button" class="tl-icon-btn" @click="onExport">
          <i class="fa-solid fa-file-export"></i><span>导出 JSON</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="onImport">
          <i class="fa-solid fa-file-import"></i><span>导入 JSON</span>
        </button>
      </div>
    </div>
  `,
});
