import { getConfig } from '../config.js';

const translatorMap = new Map();
const translationCache = new Map();
const MAX_CACHE = 400;

function setCache(key, val) {
  if (translationCache.size >= MAX_CACHE) {
    const firstKey = translationCache.keys().next().value;
    translationCache.delete(firstKey);
  }
  translationCache.set(key, val);
}

export function registerTranslator(provider) {
  if (!provider || !provider.id) {
    throw new Error('[TavernLanguage] registerTranslator 需要 id 字段');
  }
  translatorMap.set(provider.id, provider);
  return provider;
}

export function listTranslators() {
  return [...translatorMap.values()];
}

export function getTranslator(id) {
  return translatorMap.get(id) || null;
}

export function clearTranslationCache() {
  translationCache.clear();
}

export async function translateText(text, options = {}) {
  const cleanText = String(text || '').trim();
  if (!cleanText) return '';

  const cfg = getConfig();
  const from = options.from || cfg.targetLang || 'auto';
  const to = options.to || 'zh-CN';
  const preferredId = options.providerId || cfg.translator || 'google';
  const cacheKey = `${preferredId}|${from}|${to}|${cleanText}`;

  if (!options.bypassCache && translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // 构建主源 + 免费兜底链
  const chain = [preferredId, 'google', 'mymemory'].filter(
    (id, idx, arr) => arr.indexOf(id) === idx && translatorMap.has(id)
  );

  let lastError = null;
  for (const id of chain) {
    const provider = translatorMap.get(id);
    try {
      const result = await provider.translate(cleanText, {
        from,
        to,
        context: options.context || '',
        config: cfg,
      });
      if (result && result.trim()) {
        setCache(cacheKey, result.trim());
        return result.trim();
      }
    } catch (err) {
      lastError = err;
      console.warn(`[TavernLanguage] 翻译源 ${id} 失败，尝试下一个:`, err?.message || err);
    }
  }

  throw lastError || new Error('所有翻译源均不可用');
}
