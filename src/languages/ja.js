import { registerLanguage } from './registry.js';

const JA_CHAR_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBFー]/;
const JA_FALLBACK_RE = /([\u4E00-\u9FFF\u3400-\u4DBF]+[\u3040-\u309F]*|[\u30A0-\u30FFー]+|[\u3040-\u309F]{2,})/g;

let jaSegmenter = null;
try {
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    jaSegmenter = new Intl.Segmenter('ja', { granularity: 'word' });
  }
} catch {
  jaSegmenter = null;
}

export const jaLanguage = registerLanguage({
  code: 'ja',
  name: '日语',
  nativeName: '日本語',
  bcp47: 'ja-JP',
  googleCode: 'ja',
  wiktionaryLang: 'Japanese',
  youdaoLang: 'ja',
  defaultDictionaries: ['jotoba', 'wiktionary', 'ai-context'],
  levels: [
    { id: 'N5', label: 'JLPT N5（入门）', desc: 'Use beginner JLPT N5-level Japanese with simple grammar and basic everyday words.' },
    { id: 'N4', label: 'JLPT N4（初级）', desc: 'Use JLPT N4-level Japanese with clear conversational expressions.' },
    { id: 'N3', label: 'JLPT N3（中级日常）', desc: 'Use natural JLPT N3-level intermediate Japanese suitable for everyday conversation and light fiction.' },
    { id: 'N2', label: 'JLPT N2（中高级）', desc: 'Use natural JLPT N2-level Japanese with rich expressions and nuanced tone.' },
    { id: 'native', label: '母语级（地道自然）', desc: 'Use completely natural, authentic native Japanese matching the character personality and context.' },
  ],
  tokenize(text) {
    if (jaSegmenter) {
      const tokens = [];
      for (const seg of jaSegmenter.segment(text)) {
        const isWord = Boolean(seg.isWordLike && JA_CHAR_RE.test(seg.segment));
        tokens.push({
          text: seg.segment,
          lookup: seg.segment,
          isWord,
        });
      }
      return tokens;
    }

    // 浏览器不支持 Intl.Segmenter 时的兜底正则分词
    const tokens = [];
    let lastIndex = 0;
    JA_FALLBACK_RE.lastIndex = 0;
    let match;
    while ((match = JA_FALLBACK_RE.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ text: text.slice(lastIndex, match.index), isWord: false });
      }
      tokens.push({ text: match[0], lookup: match[0], isWord: true });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push({ text: text.slice(lastIndex), isWord: false });
    }
    return tokens;
  },
  buildPrompt(levelId, customInstruction) {
    const lv = this.levels.find((l) => l.id === levelId) || this.levels[2];
    return [
      '[Language Learning Mode: Japanese]',
      'Write your ENTIRE response strictly in Japanese (dialogue, narration, actions, and thoughts). Do not include Chinese translations or romaji unless explicitly asked.',
      lv.desc,
      customInstruction ? `Additional preference: ${customInstruction}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  },
});
