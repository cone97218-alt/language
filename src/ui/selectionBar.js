import { getHostDocument, getHostWindow, notify } from '../core/host.js';
import { getConfig } from '../config.js';
import { translateText } from '../translators/registry.js';
import { speakSentence } from '../core/tts.js';

let barEl = null;
let selectedText = '';
let mouseUpHandler = null;
let mouseDownHandler = null;
let selectionTimer = null;

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function closeSelectionBar() {
  if (barEl) {
    barEl.remove();
    barEl = null;
  }
  selectedText = '';
}

function positionBar(rect) {
  if (!barEl) return;
  const win = getHostWindow();
  const vw = win.visualViewport?.width || win.innerWidth;
  const vh = win.visualViewport?.height || win.innerHeight;
  const bRect = barEl.getBoundingClientRect();
  const margin = 10;

  let left = rect.left + rect.width / 2 - bRect.width / 2;
  left = Math.max(margin, Math.min(left, vw - bRect.width - margin));

  let top = rect.top - bRect.height - 8;
  if (top < margin) {
    top = Math.min(vh - bRect.height - margin, rect.bottom + 8);
  }
  top = Math.max(margin, Math.min(top, vh - bRect.height - margin));

  barEl.style.left = `${Math.round(left)}px`;
  barEl.style.top = `${Math.round(top)}px`;
}

function showSelectionBar(text, rangeRect) {
  const doc = getHostDocument();
  selectedText = text;

  if (!barEl) {
    barEl = doc.createElement('div');
    barEl.className = 'tl-sel-bar tl-ignore';
    doc.body.appendChild(barEl);

    barEl.addEventListener('click', async (e) => {
      const btn = e.target?.closest?.('[data-tl-sel-action]');
      if (!btn) return;
      e.stopPropagation();
      const action = btn.dataset.tlSelAction;
      const lang = getConfig().targetLang || 'en';

      if (action === 'speak') {
        speakSentence(selectedText, { lang }).catch(() => {});
      } else if (action === 'copy') {
        try {
          await getHostWindow().navigator.clipboard.writeText(selectedText);
          notify('已复制选中文本', 'success');
        } catch {
          notify('复制失败，请手动复制', 'warning');
        }
      } else if (action === 'translate') {
        const resBox = barEl.querySelector('[data-tl-sel-result]');
        if (!resBox) return;
        resBox.style.display = 'block';
        resBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 正在翻译选中内容...';
        positionBar(rangeRect);
        try {
          const cn = await translateText(selectedText, { from: lang, to: 'zh-CN' });
          if (!barEl) return;
          resBox.innerHTML = escapeHtml(cn);
          positionBar(rangeRect);
        } catch (err) {
          if (!barEl) return;
          resBox.textContent = `翻译失败：${err?.message || '网络异常'}`;
        }
      } else if (action === 'close') {
        closeSelectionBar();
      }
    });
  }

  barEl.innerHTML = `
    <div class="tl-sel-actions">
      <button type="button" class="tl-icon-btn" data-tl-sel-action="translate"><i class="fa-solid fa-language"></i><span>翻译选句</span></button>
      <button type="button" class="tl-icon-btn" data-tl-sel-action="speak"><i class="fa-solid fa-volume-high"></i><span>朗读</span></button>
      <button type="button" class="tl-icon-btn" data-tl-sel-action="copy"><i class="fa-regular fa-copy"></i><span>复制</span></button>
      <button type="button" class="tl-icon-btn" data-tl-sel-action="close" title="关闭"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="tl-sel-result" data-tl-sel-result style="display:none;"></div>
  `;
  positionBar(rangeRect);
}

function handleSelectionCheck() {
  if (!getConfig().enabled) {
    closeSelectionBar();
    return;
  }
  const win = getHostWindow();
  const sel = win.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
    return;
  }

  const text = sel.toString().replace(/\s+/g, ' ').trim();
  if (text.length < 2) return;

  const range = sel.getRangeAt(0);
  const container =
    range.commonAncestorContainer.nodeType === 1
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;

  if (!container || !container.closest('.mes_text') || container.closest('.tl-trans-block')) {
    return;
  }

  const rect = range.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) return;

  showSelectionBar(text, rect);
}

export function initSelectionBar() {
  destroySelectionBar();
  const doc = getHostDocument();

  mouseUpHandler = (e) => {
    if (e.target?.closest?.('.tl-sel-bar, .tl-popover, .tl-modal-backdrop')) return;
    if (selectionTimer) clearTimeout(selectionTimer);
    selectionTimer = setTimeout(handleSelectionCheck, 60);
  };

  mouseDownHandler = (e) => {
    if (barEl && !e.target?.closest?.('.tl-sel-bar')) {
      closeSelectionBar();
    }
  };

  doc.addEventListener('mouseup', mouseUpHandler, false);
  doc.addEventListener('touchend', mouseUpHandler, false);
  doc.addEventListener('mousedown', mouseDownHandler, false);
}

export function destroySelectionBar() {
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
