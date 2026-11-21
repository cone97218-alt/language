import { getConfig, getEffectiveExcludeSelectors } from '../config.js';
import { getLanguage } from '../languages/registry.js';
import { getHostDocument } from './host.js';

/**
 * 安全判断元素是否命中用户或系统的排除名单（兼容任意标签名与 CSS 选择器）
 */
export function isElementExcluded(el, selectors) {
  if (!el || el.nodeType !== 1) return false;
  const tagLower = el.tagName ? el.tagName.toLowerCase() : '';
  for (const rawSel of selectors) {
    if (!rawSel) continue;
    // 纯标签名快速匹配（支持自定义 HTML 标签如 thinking / statusbar）
    if (/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(rawSel)) {
      if (tagLower === rawSel.toLowerCase()) return true;
      continue;
    }
    try {
      if (el.matches(rawSel)) return true;
    } catch {
      // 用户写了非法选择器时静默忽略，绝不崩溃
    }
  }
  return false;
}

export function isInsideExcluded(node, root, selectors) {
  let cur = node.nodeType === 1 ? node : node.parentElement;
  while (cur && cur !== root) {
    if (isElementExcluded(cur, selectors)) return true;
    cur = cur.parentElement;
  }
  return false;
}

/**
 * 撤销已分词的 span，100% 还原酒馆原生 DOM
 */
export function untokenizeElement(root) {
  if (!root) return;
  const words = root.querySelectorAll('span.tl-word');
  for (const span of words) {
    const textNode = root.ownerDocument.createTextNode(span.textContent || '');
    span.replaceWith(textNode);
  }
  root.normalize();
  delete root.dataset.tlTokenizedLang;
  delete root.dataset.tlExcludeHash;
}

/**
 * 对单条消息正文（.mes_text）进行安全无侵入分词
 */
export function tokenizeMessageText(mesTextEl, options = {}) {
  if (!mesTextEl) return;
  const cfg = getConfig();
  if (!cfg.enabled) {
    untokenizeElement(mesTextEl);
    return;
  }

  const langCode = options.lang || cfg.targetLang || 'en';
  const langDef = getLanguage(langCode);
  if (!langDef) return;

  const selectors = getEffectiveExcludeSelectors(cfg);
  const excludeHash = selectors.join('|');

  if (
    !options.force &&
    mesTextEl.dataset.tlTokenizedLang === langCode &&
    mesTextEl.dataset.tlExcludeHash === excludeHash
  ) {
    return;
  }

  // 如果之前用旧语言或旧排除名单分过词，先还原再重新分词
  if (mesTextEl.dataset.tlTokenizedLang) {
    untokenizeElement(mesTextEl);
  }

  const doc = mesTextEl.ownerDocument || getHostDocument();
  const walker = doc.createTreeWalker(mesTextEl, 4 /* NodeFilter.SHOW_TEXT */, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return 2; // FILTER_REJECT
      if (isInsideExcluded(node, mesTextEl, selectors)) return 2;
      return 1; // FILTER_ACCEPT
    },
  });

  const textNodes = [];
  let current;
  while ((current = walker.nextNode())) {
    textNodes.push(current);
  }

  for (const textNode of textNodes) {
    const tokens = langDef.tokenize(textNode.nodeValue);
    if (!tokens || tokens.length === 0) continue;
    const hasWord = tokens.some((t) => t.isWord);
    if (!hasWord) continue;

    const frag = doc.createDocumentFragment();
    for (const token of tokens) {
      if (token.isWord) {
        const span = doc.createElement('span');
        span.className = 'tl-word';
        span.textContent = token.text;
        span.dataset.tlWord = token.lookup || token.text;
        span.dataset.tlLang = langCode;
        frag.appendChild(span);
      } else {
        frag.appendChild(doc.createTextNode(token.text));
      }
    }
    textNode.replaceWith(frag);
  }

  mesTextEl.dataset.tlTokenizedLang = langCode;
  mesTextEl.dataset.tlExcludeHash = excludeHash;
}

/**
 * 提取被点击单词所在的完整句子（用于一键整句翻译 / 整句朗读）
 */
export function extractSentenceAroundWord(wordEl) {
  if (!wordEl) return '';
  const block =
    wordEl.closest('p, li, blockquote, div.mes_text, h1, h2, h3, h4, h5, h6') ||
    wordEl.parentElement;
  if (!block) return wordEl.textContent || '';

  // 收集该段落中排除译文块后的纯文本，并定位当前词的偏移量
  let fullText = '';
  let targetStart = -1;
  let targetEnd = -1;

  const walker = block.ownerDocument.createTreeWalker(block, 4, {
    acceptNode(node) {
      if (node.parentElement?.closest('.tl-trans-block')) return 2;
      return 1;
    },
  });

  let n;
  while ((n = walker.nextNode())) {
    const val = n.nodeValue || '';
    if (wordEl.contains(n) && targetStart === -1) {
      targetStart = fullText.length;
      targetEnd = fullText.length + val.length;
    }
    fullText += val;
  }

  if (targetStart === -1) return fullText.trim();

  // 向左/向右查找句子边界
  const boundaryRe = /[.!?。！？\n]/;
  let start = targetStart;
  while (start > 0 && !boundaryRe.test(fullText[start - 1])) {
    start--;
  }
  let end = targetEnd;
  while (end < fullText.length && !boundaryRe.test(fullText[end])) {
    end++;
  }
  if (end < fullText.length && /[.!?。！？]/.test(fullText[end])) {
    end++;
  }

  return fullText.slice(start, end).replace(/\s+/g, ' ').trim();
}
