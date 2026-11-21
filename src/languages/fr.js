import { registerLanguage } from './registry.js';

// 法语字母范围（含重音符号及连字 œ/æ），并拆分缩合前缀如 l'amour -> l' + amour
const FR_LETTERS = 'A-Za-zÀ-ÖØ-öø-ÿŒœÆæ';
const FR_TOKEN_RE = new RegExp(`([${FR_LETTERS}]+(?:-[${FR_LETTERS}]+)*)`, 'g');

export const frLanguage = registerLanguage({
  code: 'fr',
  name: '法语',
  nativeName: 'Français',
  bcp47: 'fr-FR',
  googleCode: 'fr',
  wiktionaryLang: 'French',
  youdaoLang: 'fr',
  defaultDictionaries: ['wiktionary', 'ai-context'],
  levels: [
    { id: 'A2', label: 'A2 初级', desc: 'Use clear A2-level French with simple sentences and everyday vocabulary.' },
    { id: 'B1', label: 'B1 中级', desc: 'Use natural B1-level intermediate French with common idiomatic expressions.' },
    { id: 'B2', label: 'B2 中高级', desc: 'Use expressive, idiomatic B2-level French with natural nuance.' },
    { id: 'C1', label: 'C1 高级', desc: 'Use refined C1-level French with rich literary vocabulary and authentic turns of phrase.' },
    { id: 'native', label: '母语级', desc: 'Use completely authentic, natural native-level French matching the character and atmosphere.' },
  ],
  tokenize(text) {
    const tokens = [];
    let lastIndex = 0;
    FR_TOKEN_RE.lastIndex = 0;
    let match;
    while ((match = FR_TOKEN_RE.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ text: text.slice(lastIndex, match.index), isWord: false });
      }
      const word = match[0];
      tokens.push({
        text: word,
        lookup: word,
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
      '[Language Learning Mode: French]',
      'Write your ENTIRE response strictly in French (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.',
      lv.desc,
      customInstruction ? `Additional preference: ${customInstruction}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  },
});
