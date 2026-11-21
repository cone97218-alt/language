import { registerDictionary, normalizePos } from './registry.js';

/**
 * 极速双语词典（单次请求同时获取：词性、多条中文释义、简明释义与读音）
 * 无需二次翻译请求，通常 150~300ms 即可完整出词，支持所有语种及动词变位/复数形式
 */
export const googleDict = registerDictionary({
  id: 'google-dict',
  name: '极速词典',
  description: '单次请求直出词性与中文释义，响应最快，支持所有语种',
  languages: ['*'],
  async lookup(word, { lang }) {
    const sl = lang || 'auto';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=zh-CN&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(word)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;

    const briefCn = Array.isArray(data[0])
      ? data[0].map((seg) => (Array.isArray(seg) ? seg[0] : '')).join('').trim()
      : '';

    // 提取音标/读音（如果有）
    let reading = '';
    if (Array.isArray(data[0])) {
      for (const seg of data[0]) {
        if (Array.isArray(seg) && typeof seg[3] === 'string' && seg[3].trim()) {
          reading = seg[3].trim();
          break;
        }
      }
    }

    const meanings = [];
    if (Array.isArray(data[1])) {
      for (const block of data[1]) {
        if (!Array.isArray(block)) continue;
        const rawPos = block[0] || '';
        const terms = Array.isArray(block[1]) ? block[1].slice(0, 6) : [];
        if (terms.length === 0) continue;
        meanings.push({
          pos: rawPos,
          posInfo: normalizePos(rawPos),
          definitions: [
            {
              cn: terms.join('；'),
              text: '',
              example: '',
            },
          ],
        });
      }
    }

    if (meanings.length === 0 && briefCn) {
      meanings.push({
        pos: 'translation',
        posInfo: { abbr: '译', cn: '释义', tone: 'other' },
        definitions: [{ cn: briefCn, text: '', example: '' }],
      });
    }

    if (meanings.length === 0) return null;

    return {
      word,
      phonetic: '',
      reading: lang === 'ja' ? reading : '',
      audioUrl: '',
      briefCn,
      tags: [],
      meanings,
    };
  },
});
