import { getConfig } from '../config.js';
import { getLanguage } from '../languages/registry.js';
import { translateText } from '../translators/registry.js';

const dictMap = new Map();
const dictCache = new Map();
const MAX_CACHE = 300;
const DICT_TIMEOUT_MS = 4500;

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

function setCache(key, value) {
  if (dictCache.size >= MAX_CACHE) {
    const first = dictCache.keys().next().value;
    dictCache.delete(first);
  }
  dictCache.set(key, value);
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
}

export function getDictionaryChainForLang(langCode) {
  const cfg = getConfig();
  const lang = getLanguage(langCode);
  const configured = cfg.dictionaryChains?.[langCode];
  const chain =
    Array.isArray(configured) && configured.length > 0
      ? configured
      : lang?.defaultDictionaries || ['wiktionary', 'ai-context'];
  return chain.filter((id) => dictMap.has(id));
}

async function enrichChineseMeanings(entry, langCode) {
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

/**
 * 渐进式高速查词：
 * 1. 命中缓存立即 0ms 返回；
 * 2. 并行发起「极速中文速译」与「词典查询」，谁先返回先渲染，大幅降低等待感；
 * 3. 词典返回后立即展示词性/音标/释义，中文逐条释义在后台补全并无感刷新。
 */
export async function lookupWord(word, options = {}) {
  const rawWord = String(word || '').trim();
  if (!rawWord) return null;

  const cfg = getConfig();
  const langCode = options.lang || cfg.targetLang || 'en';
  const langDef = getLanguage(langCode);
  const preferredSource = options.sourceId || null;
  const onUpdate = typeof options.onUpdate === 'function' ? options.onUpdate : null;

  const cacheKey = `${preferredSource || 'auto'}|${langCode}|${rawWord.toLowerCase()}`;
  if (!options.bypassCache && dictCache.has(cacheKey)) {
    const cached = dictCache.get(cacheKey);
    if (onUpdate) onUpdate(cached, false);
    return cached;
  }

  const chain = preferredSource ? [preferredSource] : getDictionaryChainForLang(langCode);
  let dictFinished = false;
  let quickBrief = '';

  // 并行启动极速单词中文速译（仅在非手动 AI 精讲时），通常 150~300ms 即可先亮出中文释义
  const quickTranslatePromise =
    preferredSource !== 'ai-context'
      ? translateText(rawWord, {
          from: langCode,
          to: 'zh-CN',
          providerId: cfg.translator === 'tavern-ai' ? 'google' : cfg.translator,
        })
          .then((cn) => {
            quickBrief = cn;
            if (!dictFinished && onUpdate && cn) {
              onUpdate(
                {
                  word: rawWord,
                  phonetic: '',
                  reading: '',
                  audioUrl: '',
                  briefCn: cn,
                  tags: [],
                  sourceId: '',
                  sourceName: '',
                  meanings: [],
                },
                true
              );
            }
            return cn;
          })
          .catch(() => '')
      : Promise.resolve('');

  let foundEntry = null;

  for (const id of chain) {
    const provider = dictMap.get(id);
    if (!provider) continue;
    if (!preferredSource && id === 'ai-context' && chain.length > 1) {
      continue;
    }
    try {
      const timeout = id === 'ai-context' ? 15000 : DICT_TIMEOUT_MS;
      const entry = await withTimeout(
        provider.lookup(rawWord, {
          lang: langCode,
          langDef,
          context: options.context || '',
          config: cfg,
        }),
        timeout
      );
      if (entry && entry.meanings && entry.meanings.length > 0) {
        entry.sourceId = provider.id;
        entry.sourceName = provider.name;
        if (!entry.briefCn && quickBrief) entry.briefCn = quickBrief;
        foundEntry = entry;
        break;
      }
    } catch (err) {
      console.warn(`[TavernLanguage] 词典 ${id} 查词失败 (${rawWord}):`, err?.message || err);
    }
  }

  dictFinished = true;

  if (foundEntry) {
    // 第一时间展示词典结果，无需等中文逐条翻译
    if (onUpdate) onUpdate({ ...foundEntry }, false);

    // 并行补全标题中文速译 & 逐条释义中文
    const [brief] = await Promise.all([
      foundEntry.briefCn ? Promise.resolve(foundEntry.briefCn) : quickTranslatePromise,
      enrichChineseMeanings(foundEntry, langCode),
    ]);
    if (!foundEntry.briefCn && brief) foundEntry.briefCn = brief;

    setCache(cacheKey, foundEntry);
    if (onUpdate) onUpdate({ ...foundEntry }, false);
    return foundEntry;
  }

  // 所有词典均未命中，使用已并行的速译结果兜底
  const brief = quickBrief || (await quickTranslatePromise);
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

  return null;
}
