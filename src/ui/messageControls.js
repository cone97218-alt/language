import { getConfig, getEffectiveExcludeSelectors } from '../config.js';
import { isElementExcluded, isInsideExcluded } from '../core/tokenizer.js';
import { translateText } from '../translators/registry.js';
import { speakSentence, stopSpeaking } from '../core/tts.js';

let speakingMesEl = null;

/**
 * 提取消息正文用于翻译与朗读：
 * 注意必须保留 .tl-word 内部文本，仅排除用户和系统指定的非正文标签（如 code/pre/details 等）
 */
function getContentExcludeSelectors(cfg) {
  return getEffectiveExcludeSelectors(cfg).filter((s) => s !== '.tl-word');
}

function extractCleanText(el, root, selectors) {
  let out = '';
  const walker = el.ownerDocument.createTreeWalker(el, 4, {
    acceptNode(node) {
      if (node.parentElement?.closest('.tl-trans-block, .tl-mes-footer')) return 2;
      if (isInsideExcluded(node, root, selectors)) return 2;
      return 1;
    },
  });
  let n;
  while ((n = walker.nextNode())) {
    out += n.nodeValue || '';
  }
  return out.replace(/\s+/g, ' ').trim();
}

function collectParagraphBlocks(mesTextEl, selectors) {
  const candidates = [...mesTextEl.querySelectorAll('p, li, blockquote')].filter((el) => {
    if (el.closest('.tl-mes-footer, .tl-trans-block')) return false;
    if (isElementExcluded(el, selectors)) return false;
    if (isInsideExcluded(el, mesTextEl, selectors)) return false;
    if (el.parentElement?.closest('p, li, blockquote')) return false;
    return extractCleanText(el, mesTextEl, selectors).length > 0;
  });

  if (candidates.length > 0) return candidates;

  const fallbackText = extractCleanText(mesTextEl, mesTextEl, selectors);
  return fallbackText ? [mesTextEl] : [];
}

async function toggleParagraphTranslations(mesEl, btnEl) {
  const mesText = mesEl.querySelector('.mes_text');
  if (!mesText) return;

  const existingBlocks = [...mesText.querySelectorAll('.tl-trans-block')];
  if (existingBlocks.length > 0) {
    const isHidden = existingBlocks[0].classList.contains('tl-hidden');
    existingBlocks.forEach((b) => b.classList.toggle('tl-hidden', !isHidden));
    btnEl.classList.toggle('tl-active', isHidden);
    return;
  }

  const cfg = getConfig();
  const selectors = getContentExcludeSelectors(cfg);
  const blocks = collectParagraphBlocks(mesText, selectors);
  if (blocks.length === 0) return;

  btnEl.classList.add('tl-active');
  btnEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

  const doc = mesText.ownerDocument;
  const lang = cfg.targetLang || 'en';
  const footerEl = mesText.querySelector('.tl-mes-footer');

  const pairs = blocks.map((block) => {
    const text = extractCleanText(block, mesText, selectors);
    const transDiv = doc.createElement('div');
    transDiv.className = 'tl-trans-block tl-trans-loading tl-ignore';
    transDiv.textContent = '翻译中...';
    if (block === mesText) {
      if (footerEl) footerEl.insertAdjacentElement('beforebegin', transDiv);
      else mesText.appendChild(transDiv);
    } else {
      block.insertAdjacentElement('afterend', transDiv);
    }
    return { text, transDiv };
  });

  // 合并多段落为少量批量请求（每批 <= 1500 字），大幅减少请求次数，避免触发免费接口 429 限流
  const batches = [];
  let currentBatch = [];
  let currentLen = 0;
  for (const item of pairs) {
    const lineText = item.text.replace(/\r?\n+/g, ' ');
    if (currentBatch.length > 0 && currentLen + lineText.length + 1 > 1500) {
      batches.push(currentBatch);
      currentBatch = [];
      currentLen = 0;
    }
    currentBatch.push({ ...item, lineText });
    currentLen += lineText.length + 1;
  }
  if (currentBatch.length > 0) batches.push(currentBatch);

  for (const batch of batches) {
    if (batch.length === 1) {
      try {
        const cn = await translateText(batch[0].lineText, { from: lang, to: 'zh-CN' });
        batch[0].transDiv.classList.remove('tl-trans-loading');
        batch[0].transDiv.textContent = cn;
      } catch (err) {
        batch[0].transDiv.classList.remove('tl-trans-loading');
        batch[0].transDiv.textContent = `翻译失败：${err?.message || '请重试'}`;
      }
      continue;
    }

    try {
      const joined = batch.map((b) => b.lineText).join('\n');
      const translated = await translateText(joined, { from: lang, to: 'zh-CN' });
      const lines = translated.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
      if (lines.length === batch.length) {
        batch.forEach((b, i) => {
          b.transDiv.classList.remove('tl-trans-loading');
          b.transDiv.textContent = lines[i];
        });
        continue;
      }
    } catch (err) {
      // 批量失败若是 429 直接提示，不再继续轰炸接口
      if (String(err?.message || '').includes('429')) {
        batch.forEach((b) => {
          b.transDiv.classList.remove('tl-trans-loading');
          b.transDiv.textContent = `翻译失败：${err.message}`;
        });
        continue;
      }
    }

    // 行数不匹配时降级逐段顺序翻译
    for (const item of batch) {
      try {
        const cn = await translateText(item.lineText, { from: lang, to: 'zh-CN' });
        item.transDiv.classList.remove('tl-trans-loading');
        item.transDiv.textContent = cn;
      } catch (err) {
        item.transDiv.classList.remove('tl-trans-loading');
        item.transDiv.textContent = `翻译失败：${err?.message || '请重试'}`;
      }
    }
  }
  btnEl.innerHTML = '<i class="fa-solid fa-language"></i>';
}

function setSpeakState(btnEl, isPlaying) {
  btnEl.classList.toggle('tl-active', isPlaying);
  btnEl.innerHTML = isPlaying
    ? '<i class="fa-solid fa-stop"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
}

async function toggleReadMessage(mesEl, btnEl) {
  if (speakingMesEl === mesEl) {
    stopSpeaking();
    speakingMesEl = null;
    setSpeakState(btnEl, false);
    return;
  }

  const mesText = mesEl.querySelector('.mes_text');
  if (!mesText) return;
  const cfg = getConfig();
  const selectors = getContentExcludeSelectors(cfg);
  const fullText = extractCleanText(mesText, mesText, selectors);
  if (!fullText) return;

  mesEl.ownerDocument
    .querySelectorAll('.tl-footer-icon[data-tl-mes-action="speak"].tl-active')
    .forEach((b) => setSpeakState(b, false));

  speakingMesEl = mesEl;
  setSpeakState(btnEl, true);
  try {
    await speakSentence(fullText, { lang: cfg.targetLang || 'en' });
  } catch {
    // ignore
  } finally {
    if (speakingMesEl === mesEl) {
      speakingMesEl = null;
    }
    setSpeakState(btnEl, false);
  }
}

/**
 * 消息底部纯图标微栏（无冗余中文文字）
 */
export function attachMessageButtons(mesEl) {
  mesEl?.querySelectorAll('.tl-mes-btn').forEach((el) => el.remove());

  const cfg = getConfig();
  if (!cfg.enabled || cfg.ui?.autoShowMesButtons === false) {
    mesEl?.querySelector('.tl-mes-footer')?.remove();
    return;
  }

  const mesText = mesEl?.querySelector('.mes_text');
  if (!mesText || mesText.querySelector('.tl-mes-footer')) return;
  if (!mesText.textContent || !mesText.textContent.trim()) return;

  const doc = mesEl.ownerDocument;
  const footer = doc.createElement('div');
  footer.className = 'tl-mes-footer tl-ignore';

  const transBtn = doc.createElement('button');
  transBtn.type = 'button';
  transBtn.className = 'tl-footer-icon';
  transBtn.dataset.tlMesAction = 'translate';
  transBtn.title = '双语对照';
  transBtn.innerHTML = '<i class="fa-solid fa-language"></i>';
  transBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleParagraphTranslations(mesEl, transBtn);
  });

  const speakBtn = doc.createElement('button');
  speakBtn.type = 'button';
  speakBtn.className = 'tl-footer-icon';
  speakBtn.dataset.tlMesAction = 'speak';
  speakBtn.title = '朗读';
  setSpeakState(speakBtn, false);
  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleReadMessage(mesEl, speakBtn);
  });

  footer.appendChild(transBtn);
  footer.appendChild(speakBtn);
  mesText.appendChild(footer);
}

/**
 * 输出完成后自动全文逐段双语翻译（幂等，避免重复翻译同一条消息）
 */
export async function autoTranslateMessage(mesEl) {
  if (!mesEl) return;
  const mesText = mesEl.querySelector('.mes_text');
  if (!mesText) return;
  if (mesText.querySelector('.tl-trans-block')) return;
  if (mesEl.dataset.tlAutoTranslating === '1') return;

  attachMessageButtons(mesEl);
  const transBtn = mesEl.querySelector('.tl-footer-icon[data-tl-mes-action="translate"]');
  mesEl.dataset.tlAutoTranslating = '1';
  try {
    await toggleParagraphTranslations(mesEl, transBtn || {
      classList: { add() {}, toggle() {} },
      innerHTML: '',
    });
  } finally {
    delete mesEl.dataset.tlAutoTranslating;
  }
}
