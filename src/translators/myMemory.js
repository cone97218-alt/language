import { registerTranslator } from './registry.js';

export const myMemoryTranslator = registerTranslator({
  id: 'mymemory',
  name: 'MyMemory 免费翻译',
  description: '免 Key 开源翻译兜底接口',
  async translate(text, { from = 'en', to = 'zh-CN' }) {
    const sl = from === 'auto' ? 'en' : from;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(sl)}|${encodeURIComponent(to)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (!translated) throw new Error('MyMemory 未返回译文');
    return translated;
  },
});
