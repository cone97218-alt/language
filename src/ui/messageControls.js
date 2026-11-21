import { getConfig, getEffectiveExcludeSelectors } from '../config.js';
import { isElementExcluded, isInsideExcluded } from '../core/tokenizer.js';
import { translateText } from '../translators/registry.js';
import { speakSentence, stopSpeaking } from '../core/tts.js';

let speakingMesEl = null;

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
    const label = btnEl.querySelector('span');
    if (label) label.textContent = isHidden ? '隐藏译文' : '双语译文';
    return;
  }

  const cfg = getConfig();
  const selectors = getEffectiveExcludeSelectors(cfg);
  const blocks = collectParagraphBlocks(mesText, selectors);
  if (blocks.length === 0) return;

  btnEl.classList.add('tl-active');
  const label = btnEl.querySelector('span');
  if (label) label.textContent = '翻译中...';

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

  const concurrency = 3;
  let index = 0;
  async function worker() {
    while (index < pairs.length) {
      const item = pairs[index++];
      try {
        const cn = await translateText(item.text, { from: lang, to: 'zh-CN' });
        item.transDiv.classList.remove('tl-trans-loading');
        item.transDiv.textContent = cn;
      } catch (err) {
        item.transDiv.classList.remove('tl-trans-loading');
        item.transDiv.textContent = `翻译失败：${err?.message || '请稍后重试'}`;
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, pairs.length) }, () => worker()));
  if (label) label.textContent = '隐藏译文';
}

function setSpeakState(btnEl, isPlaying) {
  btnEl.classList.toggle('tl-active', isPlaying);
  btnEl.innerHTML = isPlaying
    ? '<i class="fa-solid fa-stop"></i><span>停止</span>'
    : '<i class="fa-solid fa-volume-high"></i><span>朗读</span>';
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
  const selectors = getEffectiveExcludeSelectors(cfg);
  const fullText = extractCleanText(mesText, mesText, selectors);
  if (!fullText) return;

  mesEl.ownerDocument
    .querySelectorAll('.tl-footer-pill[data-tl-mes-action="speak"].tl-active')
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
 * 在消息正文底部注入极简柔和胶囊微栏（不再挤占顶部 .mes_buttons 的编辑/更多图标区）
 */
export function attachMessageButtons(mesEl) {
  // 清理旧版可能残留在 .mes_buttons 里的按钮
  mesEl?.querySelectorAll('.tl-mes-btn').forEach((el) => el.remove());

  const cfg = getConfig();
  if (!cfg.enabled || cfg.ui?.autoShowMesButtons === false) {
    mesEl?.querySelector('.tl-mes-footer')?.remove();
    return;
  }

  const mesText = mesEl?.querySelector('.mes_text');
  if (!mesText || mesText.querySelector('.tl-mes-footer')) return;

  // 仅当消息有实际正文内容时才附加底部微栏
  if (!mesText.textContent || !mesText.textContent.trim()) return;

  const doc = mesEl.ownerDocument;
  const footer = doc.createElement('div');
  footer.className = 'tl-mes-footer tl-ignore';

  const transBtn = doc.createElement('button');
  transBtn.type = 'button';
  transBtn.className = 'tl-footer-pill';
  transBtn.dataset.tlMesAction = 'translate';
  transBtn.title = '展开/收起整段双语对照翻译';
  transBtn.innerHTML = '<i class="fa-solid fa-language"></i><span>双语译文</span>';
  transBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleParagraphTranslations(mesEl, transBtn);
  });

  const speakBtn = doc.createElement('button');
  speakBtn.type = 'button';
  speakBtn.className = 'tl-footer-pill';
  speakBtn.dataset.tlMesAction = 'speak';
  speakBtn.title = '朗读整条消息（再次点击停止）';
  setSpeakState(speakBtn, false);
  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleReadMessage(mesEl, speakBtn);
  });

  footer.appendChild(transBtn);
  footer.appendChild(speakBtn);
  mesText.appendChild(footer);
}
