import { registerTranslator } from './registry.js';

function splitByMaxLen(text, maxLen = 1400) {
  if (text.length <= maxLen) return [text];
  const parts = text.split(/(?<=[.!?。！？\n])/).filter(Boolean);
  const chunks = [];
  let buf = '';
  for (const p of parts) {
    if (p.length > maxLen) {
      if (buf) {
        chunks.push(buf);
        buf = '';
      }
      for (let i = 0; i < p.length; i += maxLen) {
        chunks.push(p.slice(i, i + maxLen));
      }
    } else if (buf.length + p.length > maxLen) {
      chunks.push(buf);
      buf = p;
    } else {
      buf += p;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

async function fetchGoogleGtx(text, sl, to) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error('Google 返回格式异常');
  }
  return data[0].map((seg) => (Array.isArray(seg) ? seg[0] : '')).join('');
}

async function fetchGoogleClients5(text, sl, to) {
  const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(to)}&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google-C5 HTTP ${res.status}`);
  const data = await res.json();
  if (Array.isArray(data)) {
    if (typeof data[0] === 'string') return data[0];
    if (Array.isArray(data[0]) && typeof data[0][0] === 'string') return data[0][0];
  }
  throw new Error('Google-C5 返回格式异常');
}

async function translateSingleChunk(chunk, sl, to) {
  try {
    return await fetchGoogleGtx(chunk, sl, to);
  } catch (err1) {
    try {
      return await fetchGoogleClients5(chunk, sl, to);
    } catch {
      throw err1;
    }
  }
}

export const googleFreeTranslator = registerTranslator({
  id: 'google',
  name: 'Google 翻译',
  description: '免 Key、速度快',
  async translate(text, { from = 'auto', to = 'zh-CN' }) {
    const sl = from === 'auto' ? 'auto' : from;
    const chunks = splitByMaxLen(text, 1400);
    const out = [];
    for (const chunk of chunks) {
      out.push(await translateSingleChunk(chunk, sl, to));
    }
    return out.join('');
  },
});
