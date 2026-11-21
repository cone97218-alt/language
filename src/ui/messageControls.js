import { getConfig, getEffectiveExcludeSelectors } from '../config.js';
import { isElementExcluded, isInsideExcluded } from '../core/tokenizer.js';
import { translateText } from '../translators/registry.js';
import { speakSentence, stopSpeaking } from '../core/tts.js';

let speakingMesEl = null;

function extractCleanText(el, root, selectors) {
  let out = '';
  const walker = el.ownerDocument.createTreeWalker(el, 4, {
    acceptNode(node) {
      if (node.parentElement?.closest('.tl-trans-block')) return 2;
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
  const selectors = getEffectiveExcludeSelectors(cfg);
  const blocks = collectParagraphBlocks(mesText, selectors);
  if (blocks.length === 0) return;

  btnEl.classList.add('tl-active');
  const doc = mesText.ownerDocument;
  const lang = cfg.targetLang || 'en';

  const pairs = blocks.map((block) => {
    const text = extractCleanText(block, mesText, selectors);
    const transDiv = doc.createElement('div');
    transDiv.className = 'tl-trans-block tl-trans-loading tl-ignore';
    transDiv.textContent = '翻译中...';
    if (block === mesText) {
      mesText.appendChild(transDiv);
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
}

function setSpeakIcon(btnEl, isPlaying) {
  btnEl.innerHTML = isPlaying
    ? '<i class="fa-solid fa-stop"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
}

async function toggleReadMessage(mesEl, btnEl) {
  if (speakingMesEl === mesEl) {
    stopSpeaking();
    speakingMesEl = null;
    btnEl.classList.remove('tl-active');
    setSpeakIcon(btnEl, false);
    return;
  }

  const mesText = mesEl.querySelector('.mes_text');
  if (!mesText) return;
  const cfg = getConfig();
  const selectors = getEffectiveExcludeSelectors(cfg);
  const fullText = extractCleanText(mesText, mesText, selectors);
  if (!fullText) return;

  mesEl.ownerDocument
    .querySelectorAll('.tl-mes-btn[data-tl-mes-action="speak"].tl-active')
    .forEach((b) => {
      b.classList.remove('tl-active');
      setSpeakIcon(b, false);
    });

  speakingMesEl = mesEl;
  btnEl.classList.add('tl-active');
  setSpeakIcon(btnEl, true);
  try {
    await speakSentence(fullText, { lang: cfg.targetLang || 'en' });
  } catch {
    // ignore
  } finally {
    if (speakingMesEl === mesEl) {
      speakingMesEl = null;
    }
    btnEl.classList.remove('tl-active');
    setSpeakIcon(btnEl, false);
  }
}

export function attachMessageButtons(mesEl) {
  const cfg = getConfig();
  if (!cfg.enabled || cfg.ui?.autoShowMesButtons === false) return;
  if (!mesEl || mesEl.querySelector('.tl-mes-btn')) return;

  const btnBar =
    mesEl.querySelector('.mes_buttons') || mesEl.querySelector('.extraMesButtons');
  if (!btnBar) return;

  const doc = mesEl.ownerDocument;

  const transBtn = doc.createElement('div');
  transBtn.className = 'tl-mes-btn tl-ignore';
  transBtn.dataset.tlMesAction = 'translate';
  transBtn.title = '整段双语对照翻译（点击展开/收起）';
  transBtn.innerHTML = '<i class="fa-solid fa-language"></i>';
  transBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleParagraphTranslations(mesEl, transBtn);
  });

  const speakBtn = doc.createElement('div');
  speakBtn.className = 'tl-mes-btn tl-ignore';
  speakBtn.dataset.tlMesAction = 'speak';
  speakBtn.title = '朗读整条消息（再次点击停止）';
  setSpeakIcon(speakBtn, false);
  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleReadMessage(mesEl, speakBtn);
  });

  btnBar.prepend(speakBtn);
  btnBar.prepend(transBtn);
}
