import { getConfig } from '../config.js';
import { getLanguage } from '../languages/registry.js';
import { translateText } from '../translators/registry.js';

const dictMap = new Map();
const dictCache = new Map();
const MAX_CACHE = 300;

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

/**
 * 注册可组装词典源
 * provider: { id, name, description, languages: ['en'] | ['*'], requiresConfig?: boolean, lookup(word, ctx) }
 */
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
  const chain = Array.isArray(configured) && configured.length > 0
    ? configured
    : (lang?.defaultDictionaries || ['wiktionary', 'ai-context']);
  return chain.filter((id) => dictMap.has(id));
}

/**
 * 为外语词典释义补充简明中文（仅在缺少中文时触发，批量合并一次翻译请求）
 */
async function enrichChineseMeanings(entry, langCode) {
  const cfg = getConfig();
  if (!cfg.autoTranslateDict || !entry || !Array.isArray(entry.meanings)) return entry;

  // 收集需要翻译成中文的词条（最多前 5 条，保持极速响应）
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
    // 先把词本身也附带一个简明中文速译
    const batchLines = [entry.word, ...targets.map((t) => t.text)];
    const joined = batchLines.join('\n');
    const translated = await translateText(joined, {
      from: 'en', // 词典释义通常为英文（FreeDict / Jotoba / En-Wiktionary）
      to: 'zh-CN',
      providerId: cfg.translator === 'tavern-ai' ? 'google' : cfg.translator,
    });
    const lines = translated.split(/\r?\n/).map((s) => s.trim());
    if (lines.length === batchLines.length) {
      if (!entry.briefCn) entry.briefCn = lines[0];
      targets.forEach((t, idx) => {
        t.cn = lines[idx + 1] || '';
      });
    } else if (!entry.briefCn) {
      entry.briefCn = await translateText(entry.word, {
        from: langCode,
        to: 'zh-CN',
        providerId: cfg.translator === 'tavern-ai' ? 'google' : cfg.translator,
      });
    }
  } catch {
    // 补全中文失败时不影响原词典展示
  }
  return entry;
}

/**
 * 查词主入口：按组装的词典链依次尝试，或指定特定词典源
 */
export async function lookupWord(word, options = {}) {
  const rawWord = String(word || '').trim();
  if (!rawWord) return null;

  const cfg = getConfig();
  const langCode = options.lang || cfg.targetLang || 'en';
  const langDef = getLanguage(langCode);
  const preferredSource = options.sourceId || null;

  const cacheKey = `${preferredSource || 'auto'}|${langCode}|${rawWord.toLowerCase()}`;
  if (!options.bypassCache && dictCache.has(cacheKey)) {
    return dictCache.get(cacheKey);
  }

  const chain = preferredSource
    ? [preferredSource]
    : getDictionaryChainForLang(langCode);

  for (const id of chain) {
    const provider = dictMap.get(id);
    if (!provider) continue;
    // 在自动查词链中，默认跳过需要手动点击的 ai-context（除非它是唯一源或用户主动点击）
    if (!preferredSource && id === 'ai-context' && chain.length > 1) {
      continue;
    }
    try {
      const entry = await provider.lookup(rawWord, {
        lang: langCode,
        langDef,
        context: options.context || '',
        config: cfg,
      });
      if (entry && entry.meanings && entry.meanings.length > 0) {
        entry.sourceId = provider.id;
        entry.sourceName = provider.name;
        await enrichChineseMeanings(entry, langCode);
        setCache(cacheKey, entry);
        return entry;
      }
    } catch (err) {
      console.warn(`[TavernLanguage] 词典 ${id} 查词失败 (${rawWord}):`, err?.message || err);
    }
  }

  // 所有词典均未命中（例如复杂动词变位/人名/短语）时，降级返回快捷翻译卡片
  try {
    const brief = await translateText(rawWord, {
      from: langCode,
      to: 'zh-CN',
    });
    const fallbackEntry = {
      word: rawWord,
      phonetic: '',
      reading: '',
      audioUrl: '',
      briefCn: brief,
      tags: ['快捷释义'],
      sourceId: 'fallback-translate',
      sourceName: '翻译兜底',
      meanings: [
        {
          pos: 'translation',
          posInfo: { abbr: '译', cn: '直译', tone: 'other' },
          definitions: [{ text: '', cn: brief, example: '' }],
        },
      ],
    };
    setCache(cacheKey, fallbackEntry);
    return fallbackEntry;
  } catch {
    return null;
  }
}
