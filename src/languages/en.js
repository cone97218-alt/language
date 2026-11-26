import { registerLanguage } from './registry.js';

const EN_WORD_RE = /([A-Za-z]+(?:['’][A-Za-z]+)?(?:-[A-Za-z]+)*)/g;

export const enLanguage = registerLanguage({
  code: 'en',
  name: '英语',
  nativeName: 'English',
  bcp47: 'en-US',
  googleCode: 'en',
  wiktionaryLang: 'English',
  youdaoLang: 'en',
  defaultDictionaries: ['offline-en', 'google-dict', 'free-dict', 'wiktionary', 'ai-context'],
  levels: [
    { id: 'A2', label: 'A2 初级', desc: 'Use simple A2-level English with short, clear sentences and high-frequency daily vocabulary.' },
    { id: 'B1', label: 'B1 中级', desc: 'Use natural B1-level intermediate English with everyday expressions and moderate sentence complexity.' },
    { id: 'B2', label: 'B2 中高级', desc: 'Use rich, idiomatic B2-level upper-intermediate English with nuanced phrasing.' },
    { id: 'C1', label: 'C1 高级', desc: 'Use sophisticated C1-level advanced English with vivid literary vocabulary and natural idioms.' },
    { id: 'native', label: '母语级', desc: 'Use completely natural, authentic native-level English matching the character and setting.' },
  ],
  tokenize(text) {
    const tokens = [];
    let lastIndex = 0;
    EN_WORD_RE.lastIndex = 0;
    let match;
    while ((match = EN_WORD_RE.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ text: text.slice(lastIndex, match.index), isWord: false });
      }
      const word = match[0];
      tokens.push({
        text: word,
        lookup: word.replace(/’/g, "'"),
        isWord: word.length >= 1,
      });
      lastIndex = match.index + word.length;
    }
    if (lastIndex < text.length) {
      tokens.push({ text: text.slice(lastIndex), isWord: false });
    }
    return tokens;
  },
  buildPrompt(levelId, customInstruction) {
    const lv = this.levels.find((l) => l.id === levelId) || this.levels[1];
    return [
      '[Language Learning Mode: English]',
      'Write your ENTIRE response strictly in English (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.',
      lv.desc,
      customInstruction ? `Additional preference: ${customInstruction}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  },
});
