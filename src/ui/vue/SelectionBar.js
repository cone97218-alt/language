import { defineComponent } from 'vue';
import { appState } from './appState.js';
import { getHostDocument, getHostWindow, notify } from '../../core/host.js';
import { getConfig } from '../../config.js';
import { translateText } from '../../translators/registry.js';
import { speakSentence } from '../../core/tts.js';

let mouseUpHandler = null;
let mouseDownHandler = null;
let selectionTimer = null;

export function closeSelectionBar() {
  appState.selection.visible = false;
  appState.selection.text = '';
  appState.selection.translation = '';
  appState.selection.loading = false;
}

function computeBarStyle(rect) {
  const win = getHostWindow();
  const vw = win.visualViewport?.width || win.innerWidth;
  const vh = win.visualViewport?.height || win.innerHeight;
  const margin = 10;

  if (vw <= 640) {
    const placeBelow = rect.top < 110;
    return placeBelow
      ? { left: `${margin}px`, right: `${margin}px`, top: `${Math.min(vh - 90, Math.round(rect.bottom + 12))}px` }
      : { left: `${margin}px`, right: `${margin}px`, bottom: `${Math.max(margin, Math.round(vh - rect.top + 12))}px` };
  }

  const estWidth = 310;
  const left = Math.max(margin, Math.min(rect.left + rect.width / 2 - estWidth / 2, vw - estWidth - margin));
  const placeBelow = rect.top < 110;
  return placeBelow
    ? { left: `${Math.round(left)}px`, top: `${Math.min(vh - 80, Math.round(rect.bottom + 10))}px` }
    : { left: `${Math.round(left)}px`, bottom: `${Math.max(margin, Math.round(vh - rect.top + 10))}px` };
}

function handleSelectionCheck() {
  if (!getConfig().enabled) {
    closeSelectionBar();
    return;
  }
  const win = getHostWindow();
  const sel = win.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;

  const text = sel.toString().replace(/\s+/g, ' ').trim();
  if (text.length < 2) return;

  const range = sel.getRangeAt(0);
  const container =
    range.commonAncestorContainer.nodeType === 1
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;

  if (!container || !container.closest('.mes_text') || container.closest('.tl-trans-block, .tl-mes-footer')) {
    return;
  }

  const rect = range.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) return;

  appState.selection.text = text;
  appState.selection.lang = getConfig().targetLang || 'en';
  appState.selection.translation = '';
  appState.selection.loading = false;
  appState.selection.style = computeBarStyle(rect);
  appState.selection.visible = true;
}

export function initSelectionListeners() {
  destroySelectionListeners();
  const doc = getHostDocument();

  mouseUpHandler = (e) => {
    if (e.target?.closest?.('.tl-sel-bar, .tl-popover, .tl-modal-backdrop')) return;
    if (selectionTimer) clearTimeout(selectionTimer);
    selectionTimer = setTimeout(handleSelectionCheck, 70);
  };

  mouseDownHandler = (e) => {
    if (appState.selection.visible && !e.target?.closest?.('.tl-sel-bar')) {
      closeSelectionBar();
    }
  };

  doc.addEventListener('mouseup', mouseUpHandler, false);
  doc.addEventListener('touchend', mouseUpHandler, false);
  doc.addEventListener('mousedown', mouseDownHandler, false);
}

export function destroySelectionListeners() {
  if (selectionTimer) {
    clearTimeout(selectionTimer);
    selectionTimer = null;
  }
  closeSelectionBar();
  const doc = getHostDocument();
  if (mouseUpHandler) {
    doc.removeEventListener('mouseup', mouseUpHandler, false);
    doc.removeEventListener('touchend', mouseUpHandler, false);
    mouseUpHandler = null;
  }
  if (mouseDownHandler) {
    doc.removeEventListener('mousedown', mouseDownHandler, false);
    mouseDownHandler = null;
  }
}

export const SelectionBar = defineComponent({
  name: 'SelectionBar',
  setup() {
    const sel = appState.selection;

    async function onTranslate() {
      if (!sel.text || sel.loading) return;
      sel.loading = true;
      sel.translation = '';
      try {
        sel.translation = await translateText(sel.text, { from: sel.lang, to: 'zh-CN' });
      } catch (err) {
        sel.translation = `翻译失败：${err?.message || '网络异常'}`;
      } finally {
        sel.loading = false;
      }
    }

    function onSpeak() {
      if (sel.text) speakSentence(sel.text, { lang: sel.lang }).catch(() => {});
    }

    async function onCopy() {
      try {
        await getHostWindow().navigator.clipboard.writeText(sel.text);
        notify('已复制选中文本', 'success');
      } catch {
        notify('复制失败，请手动复制', 'warning');
      }
    }

    return { sel, onTranslate, onSpeak, onCopy, closeSelectionBar };
  },
  template: `
    <div v-if="sel.visible" class="tl-sel-bar tl-ignore" :style="sel.style" @click.stop>
      <div class="tl-sel-actions">
        <button type="button" class="tl-icon-btn" @click="onTranslate">
          <i class="fa-solid fa-language"></i><span>翻译选句</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="onSpeak">
          <i class="fa-solid fa-volume-high"></i><span>朗读</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="onCopy">
          <i class="fa-regular fa-copy"></i><span>复制</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="closeSelectionBar" title="关闭">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div v-if="sel.loading || sel.translation" class="tl-sel-result">
        <span v-if="sel.loading"><i class="fa-solid fa-spinner fa-spin"></i> 正在翻译选中内容...</span>
        <span v-else>{{ sel.translation }}</span>
      </div>
    </div>
  `,
});
