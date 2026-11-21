import { getHostDocument, getHostWindow } from '../core/host.js';
import { getConfig } from '../config.js';
import { lookupWord, getDictionaryChainForLang, getDictionary } from '../dictionaries/registry.js';
import { translateText } from '../translators/registry.js';
import { speakWord, speakSentence } from '../core/tts.js';
import { extractSentenceAroundWord } from '../core/tokenizer.js';

let popoverEl = null;
let activeWordEl = null;
let currentWordData = null;
let currentContextSentence = '';
let currentLang = 'en';
let clickHandler = null;
let keydownHandler = null;

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function closePopover() {
  if (popoverEl) {
    popoverEl.remove();
    popoverEl = null;
  }
  if (activeWordEl) {
    activeWordEl.classList.remove('tl-word-active');
    activeWordEl = null;
  }
  currentWordData = null;
}

function positionPopover(anchorRect) {
  if (!popoverEl) return;
  const win = getHostWindow();
  const vw = win.visualViewport?.width || win.innerWidth;
  const vh = win.visualViewport?.height || win.innerHeight;

  // 移动端（<= 640px）由 CSS 统一固定为底部悬浮卡片，不设置行内坐标，彻底杜绝溢出
  if (vw <= 640) {
    popoverEl.style.left = '';
    popoverEl.style.top = '';
    return;
  }

  const popRect = popoverEl.getBoundingClientRect();
  const margin = 10;

  let left = anchorRect.left + anchorRect.width / 2 - popRect.width / 2;
  left = Math.max(margin, Math.min(left, vw - popRect.width - margin));

  let top = anchorRect.bottom + 8;
  if (top + popRect.height > vh - margin) {
    const aboveTop = anchorRect.top - popRect.height - 8;
    if (aboveTop >= margin) {
      top = aboveTop;
    } else {
      top = Math.max(margin, vh - popRect.height - margin);
    }
  }

  popoverEl.style.left = `${Math.round(left)}px`;
  popoverEl.style.top = `${Math.round(top)}px`;
}

function renderSourcePills(activeSourceId) {
  const chain = getDictionaryChainForLang(currentLang);
  return chain
    .map((id) => {
      const dict = getDictionary(id);
      if (!dict) return '';
      const activeClass = id === activeSourceId ? 'tl-active' : '';
      return `<button type="button" class="tl-source-pill ${activeClass}" data-tl-source="${escapeHtml(id)}">${escapeHtml(dict.name)}</button>`;
    })
    .join('');
}

function renderEntryContent(entry) {
  if (!entry) {
    return `<div class="tl-def-orig">未找到该词条，可点击上方「AI 语境精讲」或下方「翻译所在句」。</div>`;
  }

  return (entry.meanings || [])
    .map((m) => {
      const tone = m.posInfo?.tone || 'other';
      const label = [m.posInfo?.abbr, m.posInfo?.cn].filter(Boolean).join(' ');
      const defsHtml = (m.definitions || [])
        .map((d) => {
          const cnHtml = d.cn ? `<div class="tl-def-cn">${escapeHtml(d.cn)}</div>` : '';
          const origHtml = d.text ? `<div class="tl-def-orig">${escapeHtml(d.text)}</div>` : '';
          const exHtml = d.example
            ? `<div class="tl-def-example" data-tl-speak-ex="${escapeHtml(d.example)}" title="点击朗读例句"><i class="fa-solid fa-volume-high"></i><span>${escapeHtml(d.example)}</span></div>`
            : '';
          return `<div class="tl-def-item">${cnHtml}${origHtml}${exHtml}</div>`;
        })
        .join('');
      return `
        <div class="tl-meaning-block">
          <div class="tl-pos-badge tl-pos-${escapeHtml(tone)}">${escapeHtml(label || m.pos || '词义')}</div>
          ${defsHtml}
        </div>
      `;
    })
    .join('');
}

function renderPopoverShell(word, entry, loading = false, activeSourceId = '') {
  const phonetic = entry?.phonetic || '';
  const reading = entry?.reading || '';
  const briefCn = entry?.briefCn || '';
  const tagsHtml = (entry?.tags || [])
    .map((t) => `<span>· ${escapeHtml(t)}</span>`)
    .join('');

  return `
    <div class="tl-pop-header">
      <div class="tl-pop-word-group">
        <div class="tl-pop-word">${escapeHtml(entry?.word || word)}</div>
        <div class="tl-pop-meta">
          ${reading ? `<span>${escapeHtml(reading)}</span>` : ''}
          ${phonetic ? `<span>${escapeHtml(phonetic)}</span>` : ''}
          ${tagsHtml}
        </div>
        ${briefCn ? `<div class="tl-pop-brief">${escapeHtml(briefCn)}</div>` : ''}
      </div>
      <div class="tl-pop-actions">
        <button type="button" class="tl-icon-btn" data-tl-action="speak-word" title="朗读单词"><i class="fa-solid fa-volume-high"></i></button>
        <button type="button" class="tl-icon-btn" data-tl-action="close" title="关闭"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    <div class="tl-pop-sources">
      ${renderSourcePills(activeSourceId || entry?.sourceId || '')}
    </div>
    <div class="tl-pop-body">
      ${loading ? '<div class="tl-def-orig"><i class="fa-solid fa-spinner fa-spin"></i> 正在查询词典...</div>' : renderEntryContent(entry)}
      <div class="tl-sentence-box" data-tl-sentence-box style="display:none;"></div>
    </div>
    <div class="tl-pop-footer">
      <button type="button" class="tl-icon-btn" data-tl-action="speak-sentence"><i class="fa-solid fa-volume-high"></i><span>朗读所在句</span></button>
      <button type="button" class="tl-icon-btn" data-tl-action="translate-sentence"><i class="fa-solid fa-language"></i><span>翻译所在句</span></button>
    </div>
  `;
}

async function openWordPopover(wordEl, sourceId = null) {
  const doc = getHostDocument();
  const word = wordEl.dataset.tlWord || wordEl.textContent || '';
  const lang = wordEl.dataset.tlLang || getConfig().targetLang || 'en';
  if (!word.trim()) return;

  if (activeWordEl && activeWordEl !== wordEl) {
    activeWordEl.classList.remove('tl-word-active');
  }
  activeWordEl = wordEl;
  activeWordEl.classList.add('tl-word-active');
  currentLang = lang;
  currentContextSentence = extractSentenceAroundWord(wordEl);

  const anchorRect = wordEl.getBoundingClientRect();

  if (!popoverEl) {
    popoverEl = doc.createElement('div');
    popoverEl.className = 'tl-popover tl-ignore';
    doc.body.appendChild(popoverEl);
  }

  popoverEl.innerHTML = renderPopoverShell(word, null, true, sourceId || '');
  positionPopover(anchorRect);

  if (!sourceId && getConfig().autoSpeakWord) {
    speakWord(word, { lang }).catch(() => {});
  }

  const entry = await lookupWord(word, {
    lang,
    context: currentContextSentence,
    sourceId,
  });

  if (!popoverEl || activeWordEl !== wordEl) return;

  currentWordData = entry;
  popoverEl.innerHTML = renderPopoverShell(word, entry, false, sourceId || entry?.sourceId || '');
  positionPopover(anchorRect);

  if (!sourceId && getConfig().autoSpeakWord && entry?.audioUrl) {
    speakWord(word, { lang, audioUrl: entry.audioUrl }).catch(() => {});
  }
}

export function initPopover() {
  destroyPopover();
  const doc = getHostDocument();

  clickHandler = (e) => {
    const pop = e.target?.closest?.('.tl-popover');
    if (pop) {
      const actionBtn = e.target.closest('[data-tl-action]');
      if (actionBtn) {
        const action = actionBtn.dataset.tlAction;
        if (action === 'close') {
          closePopover();
        } else if (action === 'speak-word') {
          const w = currentWordData?.word || activeWordEl?.dataset.tlWord || '';
          speakWord(w, { lang: currentLang, audioUrl: currentWordData?.audioUrl }).catch(() => {});
        } else if (action === 'speak-sentence') {
          if (currentContextSentence) {
            speakSentence(currentContextSentence, { lang: currentLang }).catch(() => {});
          }
        } else if (action === 'translate-sentence') {
          const box = pop.querySelector('[data-tl-sentence-box]');
          if (box && currentContextSentence) {
            box.style.display = 'block';
            box.innerHTML = `<div class="tl-sentence-orig">${escapeHtml(currentContextSentence)}</div><div class="tl-def-orig"><i class="fa-solid fa-spinner fa-spin"></i> 正在翻译所在句...</div>`;
            translateText(currentContextSentence, { from: currentLang, to: 'zh-CN' })
              .then((cn) => {
                if (!popoverEl) return;
                box.innerHTML = `<div class="tl-sentence-orig">${escapeHtml(currentContextSentence)}</div><div class="tl-sentence-cn">${escapeHtml(cn)}</div>`;
                if (activeWordEl) positionPopover(activeWordEl.getBoundingClientRect());
              })
              .catch((err) => {
                if (!popoverEl) return;
                box.innerHTML = `<div class="tl-def-orig">翻译失败：${escapeHtml(err?.message || '网络异常')}</div>`;
              });
          }
        }
        return;
      }

      const sourceBtn = e.target.closest('[data-tl-source]');
      if (sourceBtn && activeWordEl) {
        openWordPopover(activeWordEl, sourceBtn.dataset.tlSource);
        return;
      }

      const exEl = e.target.closest('[data-tl-speak-ex]');
      if (exEl) {
        speakSentence(exEl.dataset.tlSpeakEx, { lang: currentLang }).catch(() => {});
        return;
      }
      return;
    }

    const wordEl = e.target?.closest?.('span.tl-word');
    if (wordEl && getConfig().enabled) {
      const sel = getHostWindow().getSelection();
      if (sel && sel.toString().trim().length > 0) {
        return;
      }
      e.stopPropagation();
      openWordPopover(wordEl);
      return;
    }

    if (popoverEl && !e.target?.closest?.('.tl-popover')) {
      closePopover();
    }
  };

  keydownHandler = (e) => {
    if (e.key === 'Escape') closePopover();
  };

  doc.addEventListener('click', clickHandler, false);
  doc.addEventListener('keydown', keydownHandler, false);
}

export function destroyPopover() {
  closePopover();
  const doc = getHostDocument();
  if (clickHandler) {
    doc.removeEventListener('click', clickHandler, false);
    clickHandler = null;
  }
  if (keydownHandler) {
    doc.removeEventListener('keydown', keydownHandler, false);
    keydownHandler = null;
  }
}
