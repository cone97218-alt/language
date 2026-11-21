import { registerTranslator } from './registry.js';

export const googleFreeTranslator = registerTranslator({
  id: 'google',
  name: 'Google 免费翻译',
  description: '免 Key、速度快、支持多语种（默认推荐）',
  async translate(text, { from = 'auto', to = 'zh-CN' }) {
    const sl = from === 'auto' ? 'auto' : from;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google Translate HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error('Google Translate 返回格式异常');
    }
    return data[0].map((seg) => (Array.isArray(seg) ? seg[0] : '')).join('');
  },
});
