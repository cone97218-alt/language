import { registerDictionary, normalizePos } from './registry.js';

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export const wiktionaryDictionary = registerDictionary({
  id: 'wiktionary',
  name: 'Wiktionary 多语种词典',
  description: '维基词典官方接口，原生支持英/日/法及几乎所有小语种',
  languages: ['*'],
  async lookup(word, { lang, langDef }) {
    const candidates = [word];
    if (word !== word.toLowerCase()) candidates.push(word.toLowerCase());

    let data = null;
    let matchedWord = word;
    for (const candidate of candidates) {
      const url = `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(candidate)}`;
      const res = await fetch(url);
      if (res.ok) {
        data = await res.json();
        matchedWord = candidate;
        break;
      }
    }
    if (!data || typeof data !== 'object') return null;

    // 匹配目标语言区块（如 en / fr / ja）
    const langBlocks = data[lang] || data[langDef?.code] || null;
    if (!Array.isArray(langBlocks) || langBlocks.length === 0) return null;

    const meanings = [];
    for (const block of langBlocks.slice(0, 4)) {
      const defs = [];
      for (const d of (block.definitions || []).slice(0, 3)) {
        const cleanText = stripHtml(d.definition);
        if (!cleanText) continue;
        const example = Array.isArray(d.examples) && d.examples[0] ? stripHtml(d.examples[0]) : '';
        defs.push({ text: cleanText, cn: '', example });
      }
      if (defs.length > 0) {
        meanings.push({
          pos: block.partOfSpeech || '',
          posInfo: normalizePos(block.partOfSpeech),
          definitions: defs,
        });
      }
    }

    if (meanings.length === 0) return null;

    return {
      word: matchedWord,
      phonetic: '',
      reading: '',
      audioUrl: '',
      briefCn: '',
      tags: [langDef?.nativeName || lang],
      meanings,
    };
  },
});
