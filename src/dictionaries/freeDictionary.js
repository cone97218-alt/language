import { registerDictionary, normalizePos } from './registry.js';

export const freeDictionary = registerDictionary({
  id: 'free-dict',
  name: 'Free Dictionary',
  description: '英语权威开源词典，提供音标、词性、例句与真人发音',
  languages: ['en'],
  async lookup(word, { config }) {
    const query = word.toLowerCase().replace(/^['’]+|['’]+$/g, '');
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const list = await res.json();
    if (!Array.isArray(list) || list.length === 0) return null;

    const first = list[0];
    const accent = config?.tts?.enAccent || 'us';

    // 挑选对应口音的真人音频
    let phonetic = first.phonetic || '';
    let audioUrl = '';
    const phonetics = Array.isArray(first.phonetics) ? first.phonetics : [];
    for (const p of phonetics) {
      if (!phonetic && p.text) phonetic = p.text;
      if (p.audio) {
        const lower = p.audio.toLowerCase();
        if (!audioUrl) audioUrl = p.audio;
        if (accent === 'uk' && lower.includes('-uk')) {
          audioUrl = p.audio;
          if (p.text) phonetic = p.text;
          break;
        }
        if (accent === 'us' && lower.includes('-us')) {
          audioUrl = p.audio;
          if (p.text) phonetic = p.text;
          break;
        }
      }
    }

    const meanings = [];
    for (const m of first.meanings || []) {
      const defs = (m.definitions || []).slice(0, 3).map((d) => ({
        text: d.definition || '',
        cn: '',
        example: d.example || '',
      }));
      if (defs.length > 0) {
        meanings.push({
          pos: m.partOfSpeech || '',
          posInfo: normalizePos(m.partOfSpeech),
          definitions: defs,
        });
      }
    }

    if (meanings.length === 0) return null;
    return {
      word: first.word || word,
      phonetic,
      reading: '',
      audioUrl,
      briefCn: '',
      tags: [],
      meanings,
    };
  },
});
