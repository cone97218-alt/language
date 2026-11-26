import { getConfig } from '../config.js';
import { getLanguage } from '../languages/registry.js';
import { translateText } from '../translators/registry.js';
import { getHostWindow } from '../core/host.js';

const dictMap = new Map();
const dictCache = new Map();
const inFlightMap = new Map();
const DICT_CACHE_STORAGE_KEY = 'tavern_language_dict_cache_v1';
const MAX_CACHE = 400;
const DICT_TIMEOUT_MS = 4000;

let cacheLoaded = false;
let persistTimer = null;

export const POS_CN_MAP = {
  noun: { abbr: 'n.', cn: '名词', tone: 'noun' },
  'proper noun': { abbr: 'prop.n.', cn: '专有名词', tone: 'noun' },
  verb: { abbr: 'v.', cn: '动词', tone: 'verb' },
  adjective: { abbr: 'adj.', cn: '形容词', tone: 'adj' },
  adverb: { abbr: 'adv.', cn: '副词', tone: 'adv' },
  pronoun: { abbr: 'pron.', cn: '代词', tone: 'other' },
  preposition: { abbr: 'prep.', cn: '介词', tone: 'other' },
  conjunction: { abbr: 'conj.', cn: '连词', tone: 'other' },
  interjection: { abbr: 'int.', cn: '感叹词', tone: 'other' },
  article: { abbr: 'art.', cn: '冠词', tone: 'other' },
  determiner: { abbr: 'det.', cn: '限定词', tone: 'other' },
  particle: { abbr: 'part.', cn: '助词', tone: 'other' },
  expression: { abbr: 'expr.', cn: '惯用语', tone: 'other' },
  numeral: { abbr: 'num.', cn: '数词', tone: 'other' },
  prefix: { abbr: 'pref.', cn: '前缀', tone: 'other' },
  suffix: { abbr: 'suff.', cn: '后缀', tone: 'other' },
};

export function normalizePos(rawPos) {
  const key = String(rawPos || '').toLowerCase().trim();
  if (POS_CN_MAP[key]) return POS_CN_MAP[key];
  if (key.includes('noun')) return POS_CN_MAP.noun;
  if (key.includes('verb')) return POS_CN_MAP.verb;
  if (key.includes('adj')) return POS_CN_MAP.adjective;
  if (key.includes('adv')) return POS_CN_MAP.adverb;
  if (key.includes('pron')) return POS_CN_MAP.pronoun;
  if (key.includes('prep')) return POS_CN_MAP.preposition;
  if (key.includes('conj')) return POS_CN_MAP.conjunction;
  if (key.includes('interj')) return POS_CN_MAP.interjection;
  if (key.includes('part')) return POS_CN_MAP.particle;
  if (key.includes('expr')) return POS_CN_MAP.expression;
  return { abbr: rawPos || '词项', cn: '', tone: 'other' };
}

function ensureCacheLoaded() {
  if (cacheLoaded) return;
  cacheLoaded = true;
  try {
    const raw = getHostWindow().localStorage.getItem(DICT_CACHE_STORAGE_KEY);
    if (!raw) return;
    const entries = JSON.parse(raw);
    if (Array.isArray(entries)) {
      for (const [k, v] of entries) {
        if (k && v) dictCache.set(k, v);
      }
    }
  } catch {
    // ignore
  }
}

function schedulePersistCache() {
  if (persistTimer) return;
  persistTimer = setTimeout(() => {
    persistTimer = null;
    try {
      const arr = [...dictCache.entries()].slice(-MAX_CACHE);
      getHostWindow().localStorage.setItem(DICT_CACHE_STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // ignore quota error
    }
  }, 600);
}

function setCache(key, value) {
  ensureCacheLoaded();
  if (dictCache.has(key)) dictCache.delete(key);
  if (dictCache.size >= MAX_CACHE) {
    const first = dictCache.keys().next().value;
    dictCache.delete(first);
  }
  dictCache.set(key, value);
  schedulePersistCache();
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('词典请求超时')), ms);
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

export function registerDictionary(provider) {
  if (!provider || !provider.id) {
    throw new Error('[TavernLanguage] registerDictionary 需要 id 字段');
  }
  dictMap.set(provider.id, provider);
  return provider;
}

export function listDictionaries(langCode = null) {
  const all = [...dictMap.values()];
  if (!langCode) return all;
  return all.filter((d) => d.languages.includes('*') || d.languages.includes(langCode));
}

export function getDictionary(id) {
  return dictMap.get(id) || null;
}

export function clearDictionaryCache() {
  dictCache.clear();
  inFlightMap.clear();
  try {
    getHostWindow().localStorage.removeItem(DICT_CACHE_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getDictionaryChainForLang(langCode) {
  const cfg = getConfig();
  const lang = getLanguage(langCode);
  const configured = cfg.dictionaryChains?.[langCode];
  const chain =
    Array.isArray(configured) && configured.length > 0
      ? configured
      : lang?.defaultDictionaries || ['google-dict', 'wiktionary', 'ai-context'];
  return chain.filter((id) => dictMap.has(id));
}

async function enrichChineseMeanings(entry) {
  const cfg = getConfig();
  if (!cfg.autoTranslateDict || !entry || !Array.isArray(entry.meanings)) return entry;

  const targets = [];
  for (const m of entry.meanings) {
    for (const d of m.definitions || []) {
      if (!d.cn && d.text && targets.length < 5) {
        targets.push(d);
      }
    }
  }
  if (targets.length === 0) return entry;

  try {
    const joined = targets.map((t) => t.text).join('\n');
    const translated = await translateText(joined, {
      from: 'en',
      to: 'zh-CN',
      providerId: cfg.translator === 'tavern-ai' ? 'google' : cfg.translator,
    });
    const lines = translated.split(/\r?\n/).map((s) => s.trim());
    if (lines.length === targets.length) {
      targets.forEach((t, idx) => {
        t.cn = lines[idx] || '';
      });
    }
  } catch {
    // ignore
  }
  return entry;
}

async function queryProvider(provider, rawWord, ctx) {
  const timeout = provider.id === 'ai-context' ? 15000 : DICT_TIMEOUT_MS;
  const entry = await withTimeout(provider.lookup(rawWord, ctx), timeout);
  if (entry && entry.meanings && entry.meanings.length > 0) {
    entry.sourceId = provider.id;
    entry.sourceName = provider.name;
    return entry;
  }
  return null;
}

/**
 * 手指按下时提前预取（与随后的 click 共享同一个 inFlight Promise，绝不重复发请求）
 */
export function prefetchWord(word, langCode = null) {
  const rawWord = String(word || '').trim();
  if (!rawWord) return;
  const lang = langCode || getConfig().targetLang || 'en';
  const cacheKey = `auto|${lang}|${rawWord.toLowerCase()}`;
  ensureCacheLoaded();
  if (dictCache.has(cacheKey) || inFlightMap.has(cacheKey)) return;

  lookupWord(rawWord, { lang }).catch(() => {});
}

/**
 * 极速查词主入口：
 * 1. 持久化本地缓存命中：0ms 瞬开（刷新页面仍保留）；
 * 2. 复用 pointerdown 预取中的请求（inFlightMap 去重）；
 * 3. 多源并行竞速（前两个词典同时请求，谁先回谁先渲染），大幅消除串行超时等待；
 * 4. 默认首选「极速词典」，单次请求直出词性 + 中文释义，零二次翻译延迟。
 */
export async function lookupWord(word, options = {}) {
  const rawWord = String(word || '').trim();
  if (!rawWord) return null;

  ensureCacheLoaded();
  const cfg = getConfig();
  const langCode = options.lang || cfg.targetLang || 'en';
  const langDef = getLanguage(langCode);
  const preferredSource = options.sourceId || null;
  const onUpdate = typeof options.onUpdate === 'function' ? options.onUpdate : null;

  const cacheKey = `${preferredSource || 'auto'}|${langCode}|${rawWord.toLowerCase()}`;

  // 1. 本地持久化缓存命中：立即瞬开
  if (!options.bypassCache && dictCache.has(cacheKey)) {
    const cached = dictCache.get(cacheKey);
    if (onUpdate) onUpdate(cached, false);
    return cached;
  }

  // 2. 复用正在进行中的预取请求（例如 pointerdown 刚刚触发的）
  if (!options.bypassCache && inFlightMap.has(cacheKey)) {
    const entry = await inFlightMap.get(cacheKey);
    if (entry && onUpdate) onUpdate(entry, false);
    return entry;
  }

  const task = (async () => {
    const chain = preferredSource ? [preferredSource] : getDictionaryChainForLang(langCode);
    const ctx = {
      lang: langCode,
      langDef,
      context: options.context || '',
      config: cfg,
    };

    const autoChain = preferredSource
      ? chain
      : chain.filter((id) => id !== 'ai-context' || chain.length === 1);

    let foundEntry = null;
    let usedLocalProvider = false;

    // 优先检查本地离线词典（<1ms 瞬开，命中后不发任何网络请求）
    if (!preferredSource) {
      const localIds = autoChain.filter((id) => dictMap.get(id)?.isLocal);
      for (const id of localIds) {
        const provider = dictMap.get(id);
        if (!provider) continue;
        try {
          foundEntry = await queryProvider(provider, rawWord, ctx);
          if (foundEntry) {
            usedLocalProvider = true;
            break;
          }
        } catch {
          // ignore
        }
      }
    }

    const remoteChain = preferredSource
      ? autoChain
      : autoChain.filter((id) => !dictMap.get(id)?.isLocal);

    if (!foundEntry && remoteChain.length >= 2 && !preferredSource) {
      // 并行竞速前 2 个在线词典源，谁先返回有效词条立刻使用
      const racers = remoteChain.slice(0, 2).map((id) => {
        const provider = dictMap.get(id);
        if (!provider) return Promise.reject(new Error('missing'));
        return queryProvider(provider, rawWord, ctx).then((res) => {
          if (!res) throw new Error('empty');
          return res;
        });
      });

      try {
        foundEntry = await Promise.any(racers);
      } catch {
        foundEntry = null;
      }

      // 若前 2 个都未命中，顺序尝试剩余在线词典
      if (!foundEntry && remoteChain.length > 2) {
        for (const id of remoteChain.slice(2)) {
          const provider = dictMap.get(id);
          if (!provider) continue;
          try {
            foundEntry = await queryProvider(provider, rawWord, ctx);
            if (foundEntry) break;
          } catch {
            // continue
          }
        }
      }
    } else if (!foundEntry) {
      for (const id of remoteChain) {
        const provider = dictMap.get(id);
        if (!provider) continue;
        try {
          foundEntry = await queryProvider(provider, rawWord, ctx);
          if (foundEntry) break;
        } catch (err) {
          console.warn(`[TavernLanguage] 词典 ${id} 查词失败 (${rawWord}):`, err?.message || err);
        }
      }
    }

    if (foundEntry) {
      // 第一时间回调渲染（本地词典/极速词典此时已含全部中文释义，直接一步到位）
      if (onUpdate) onUpdate({ ...foundEntry }, false);

      // 若词典本身是纯英文释义（如 FreeDict / Wiktionary / Jotoba），后台补全中文
      const needsCn = foundEntry.meanings.some((m) =>
        (m.definitions || []).some((d) => !d.cn && d.text)
      );
      if (needsCn && cfg.autoTranslateDict) {
        await enrichChineseMeanings(foundEntry);
        if (onUpdate) onUpdate({ ...foundEntry }, false);
      }

      // 本地离线词典本身已在内存 Map 中 <0.1ms 命中，无需占满 localStorage LRU 缓存
      if (!usedLocalProvider) {
        setCache(cacheKey, foundEntry);
      }
      return foundEntry;
    }

    // 最终兜底：调用极速翻译
    try {
      const brief = await translateText(rawWord, { from: langCode, to: 'zh-CN' });
      if (brief) {
        const fallbackEntry = {
          word: rawWord,
          phonetic: '',
          reading: '',
          audioUrl: '',
          briefCn: brief,
          tags: [],
          sourceId: 'fallback-translate',
          sourceName: '直译',
          meanings: [
            {
              pos: 'translation',
              posInfo: { abbr: '译', cn: '直译', tone: 'other' },
              definitions: [{ text: '', cn: brief, example: '' }],
            },
          ],
        };
        setCache(cacheKey, fallbackEntry);
        if (onUpdate) onUpdate(fallbackEntry, false);
        return fallbackEntry;
      }
    } catch {
      // ignore
    }

    return null;
  })();

  inFlightMap.set(cacheKey, task);
  try {
    return await task;
  } finally {
    inFlightMap.delete(cacheKey);
  }
}
