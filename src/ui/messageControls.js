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
    // 跳过嵌套在其他已收集块里的子块，避免重复翻译
    if (el.parentElement?.closest('p, li, blockquote')) return false;
    return extractCleanText(el, mesTextEl, selectors).length > 0;
  });

  if (candidates.length > 0) return candidates;

  // 若消息没有 <p> 标签（纯文本块），则以 .mes_text 整体作为一个段落块
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

  // 先在每个段落下方插入加载态双语块
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

  // 并发翻译各段落（限制并发数避免触发限流）
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

async function toggleReadMessage(mesEl, btnEl) {
  if (speakingMesEl === mesEl) {
    stopSpeaking();
    speakingMesEl = null;
    btnEl.classList.remove('tl-active');
    return;
  }

  const mesText = mesEl.querySelector('.mes_text');
  if (!mesText) return;
  const cfg = getConfig();
  const selectors = getEffectiveExcludeSelectors(cfg);
  const fullText = extractCleanText(mesText, mesText, selectors);
  if (!fullText) return;

  // 取消之前其他消息的朗读高亮
  mesEl.ownerDocument
    .querySelectorAll('.tl-mes-btn[data-tl-mes-action="speak"].tl-active')
    .forEach((b) => b.classList.remove('tl-active'));

  speakingMesEl = mesEl;
  btnEl.classList.add('tl-active');
  try {
    await speakSentence(fullText, { lang: cfg.targetLang || 'en' });
  } catch {
    // ignore
  } finally {
    if (speakingMesEl === mesEl) {
      speakingMesEl = null;
    }
    btnEl.classList.remove('tl-active');
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
  transBtn.textContent = '译';
  transBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleParagraphTranslations(mesEl, transBtn);
  });

  const speakBtn = doc.createElement('div');
  speakBtn.className = 'tl-mes-btn tl-ignore';
  speakBtn.dataset.tlMesAction = 'speak';
  speakBtn.title = '朗读整条消息（再次点击停止）';
  speakBtn.textContent = '🔊';
  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleReadMessage(mesEl, speakBtn);
  });

  btnBar.prepend(speakBtn);
  btnBar.prepend(transBtn);
}
