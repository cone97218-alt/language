import { registerTranslator } from './registry.js';

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

export const googleFreeTranslator = registerTranslator({
  id: 'google',
  name: 'Google 翻译',
  description: '免 Key、速度快',
  async translate(text, { from = 'auto', to = 'zh-CN' }) {
    const sl = from === 'auto' ? 'auto' : from;
    try {
      return await fetchGoogleGtx(text, sl, to);
    } catch (err1) {
      try {
        return await fetchGoogleClients5(text, sl, to);
      } catch {
        throw err1;
      }
    }
  },
});
