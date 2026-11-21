import { registerDictionary, normalizePos } from './registry.js';

function parseJotobaPos(posList) {
  if (!Array.isArray(posList) || posList.length === 0) {
    return { raw: 'word', info: normalizePos('') };
  }
  const first = posList[0];
  let raw = '';
  if (typeof first === 'string') {
    raw = first;
  } else if (first && typeof first === 'object') {
    const key = Object.keys(first)[0];
    raw = key || '';
  }
  const lower = raw.toLowerCase();
  if (lower.includes('noun')) return { raw: 'noun', info: normalizePos('noun') };
  if (lower.includes('verb') || lower.includes('godan') || lower.includes('ichidan')) {
    return { raw: 'verb', info: normalizePos('verb') };
  }
  if (lower.includes('adj')) return { raw: 'adjective', info: normalizePos('adjective') };
  if (lower.includes('adv')) return { raw: 'adverb', info: normalizePos('adverb') };
  if (lower.includes('part')) return { raw: 'particle', info: normalizePos('particle') };
  if (lower.includes('expr')) return { raw: 'expression', info: normalizePos('expression') };
  return { raw, info: normalizePos(raw) };
}

export const jotobaDictionary = registerDictionary({
  id: 'jotoba',
  name: 'Jotoba 日语词典',
  description: '基于 JMdict 的日语开源词典，提供假名读音、词性、常用度与发音',
  languages: ['ja'],
  async lookup(word) {
    const res = await fetch('https://jotoba.de/api/search/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: word,
        language: 'English',
        no_english: false,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const words = data?.words;
    if (!Array.isArray(words) || words.length === 0) return null;

    // 优先匹配完全一致的汉字或假名
    const hit =
      words.find((w) => w.reading?.kanji === word || w.reading?.kana === word) || words[0];

    const kanji = hit.reading?.kanji || '';
    const kana = hit.reading?.kana || '';
    const audioUrl = hit.audio ? `https://jotoba.de${hit.audio}` : '';
    const tags = [];
    if (hit.common) tags.push('常用词');

    const grouped = new Map();
    for (const sense of (hit.senses || []).slice(0, 5)) {
      const { raw, info } = parseJotobaPos(sense.pos);
      const glossText = Array.isArray(sense.glosses) ? sense.glosses.slice(0, 4).join('; ') : '';
      if (!glossText) continue;
      const key = info.abbr || raw;
      if (!grouped.has(key)) {
        grouped.set(key, { pos: raw, posInfo: info, definitions: [] });
      }
      grouped.get(key).definitions.push({
        text: glossText,
        cn: '',
        example: '',
      });
    }

    const meanings = [...grouped.values()];
    if (meanings.length === 0) return null;

    return {
      word: kanji || kana || word,
      phonetic: '',
      reading: kana && kana !== kanji ? kana : '',
      audioUrl,
      briefCn: '',
      tags,
      meanings,
    };
  },
});
