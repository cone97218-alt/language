import { getConfig } from '../config.js';
import { getHostWindow } from '../core/host.js';

const translatorMap = new Map();
const translationCache = new Map();
const TRANS_CACHE_STORAGE_KEY = 'tavern_language_trans_cache_v1';
const MAX_CACHE = 300;
let cacheLoaded = false;
let persistTimer = null;

function ensureCacheLoaded() {
  if (cacheLoaded) return;
  cacheLoaded = true;
  try {
    const raw = getHostWindow().localStorage.getItem(TRANS_CACHE_STORAGE_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      for (const [k, v] of arr) {
        if (k && v) translationCache.set(k, v);
      }
    }
  } catch {
    // ignore
  }
}

function schedulePersist() {
  if (persistTimer) return;
  persistTimer = setTimeout(() => {
    persistTimer = null;
    try {
      const arr = [...translationCache.entries()].slice(-MAX_CACHE);
      getHostWindow().localStorage.setItem(TRANS_CACHE_STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // ignore
    }
  }, 800);
}

function setCache(key, val) {
  ensureCacheLoaded();
  if (translationCache.has(key)) translationCache.delete(key);
  if (translationCache.size >= MAX_CACHE) {
    const firstKey = translationCache.keys().next().value;
    translationCache.delete(firstKey);
  }
  translationCache.set(key, val);
  schedulePersist();
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
  try {
    getHostWindow().localStorage.removeItem(TRANS_CACHE_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export async function translateText(text, options = {}) {
  const cleanText = String(text || '').trim();
  if (!cleanText) return '';

  ensureCacheLoaded();
  const cfg = getConfig();
  const from = options.from || cfg.targetLang || 'auto';
  const to = options.to || 'zh-CN';
  const preferredId = options.providerId || cfg.translator || 'google';
  const cacheKey = `${preferredId}|${from}|${to}|${cleanText}`;

  if (!options.bypassCache && translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const chain = [preferredId, 'google', 'mymemory'].filter(
    (id, idx, arr) => arr.indexOf(id) === idx && translatorMap.has(id)
  );

  let lastError = null;
  let saw429 = false;

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
      if (String(err?.message || '').includes('429')) saw429 = true;
      console.warn(`[TavernLanguage] 翻译源 ${id} 失败，尝试下一个:`, err?.message || err);
    }
  }

  if (saw429) {
    throw new Error('免费翻译限流（429），可稍后重试或切换为「酒馆 API」/「自定义 AI」');
  }
  throw lastError || new Error('所有翻译源均不可用');
}
