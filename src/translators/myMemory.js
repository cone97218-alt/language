import { registerTranslator } from './registry.js';

function splitLongText(text, maxLen = 420) {
  if (text.length <= maxLen) return [text];
  const sentences = text.split(/(?<=[.!?。！？\n])\s*/).filter(Boolean);
  const chunks = [];
  let buf = '';
  for (const s of sentences) {
    if (s.length > maxLen) {
      if (buf) {
        chunks.push(buf);
        buf = '';
      }
      let rest = s;
      while (rest.length > maxLen) {
        let cut = rest.lastIndexOf(' ', maxLen);
        if (cut < Math.floor(maxLen * 0.5)) cut = maxLen;
        chunks.push(rest.slice(0, cut).trim());
        rest = rest.slice(cut).trim();
      }
      if (rest) buf = rest;
    } else if (!buf) {
      buf = s;
    } else if (buf.length + 1 + s.length <= maxLen) {
      buf += ' ' + s;
    } else {
      chunks.push(buf);
      buf = s;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

async function fetchOneChunk(chunk, sl, to) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=${encodeURIComponent(sl)}|${encodeURIComponent(to)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const data = await res.json();
  const translated = data?.responseData?.translatedText;
  if (!translated || /QUERY LENGTH LIMIT EXCEEDED|MYMEMORY WARNING/i.test(translated)) {
    throw new Error(translated || 'MyMemory 未返回译文');
  }
  return translated;
}

export const myMemoryTranslator = registerTranslator({
  id: 'mymemory',
  name: 'MyMemory',
  description: '免费兜底翻译',
  async translate(text, { from = 'en', to = 'zh-CN' }) {
    const sl = from === 'auto' ? 'en' : from;
    const chunks = splitLongText(text, 420);
    const out = [];
    for (const c of chunks) {
      out.push(await fetchOneChunk(c, sl, to));
    }
    return out.join(' ');
  },
});
