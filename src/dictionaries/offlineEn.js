import { registerDictionary, normalizePos } from './registry.js';
import { getHostWindow } from '../core/host.js';

const DB_NAME = 'tavern_language_offline_dicts';
const STORE_NAME = 'dicts';
const RECORD_ID = 'en-core';
const DATA_VERSION = 'v1';

const DICT_URLS = [
  'https://fastly.jsdelivr.net/gh/cone97218-alt/language@main/data/dict-en-core.tsv',
  'https://cdn.jsdelivr.net/gh/cone97218-alt/language@main/data/dict-en-core.tsv',
  'https://raw.githubusercontent.com/cone97218-alt/language/main/data/dict-en-core.tsv',
];

const entryMap = new Map(); // lowercase word -> "phonetic\ttrans"
const lemmaMap = new Map(); // inflected -> base

let status = 'idle'; // 'idle' | 'loading' | 'downloading' | 'ready' | 'error'
let wordCount = 0;
let lastError = '';
let initPromise = null;
const statusListeners = new Set();

function setStatus(nextStatus, errMsg = '') {
  status = nextStatus;
  lastError = errMsg;
  const snapshot = getOfflineDictStatus();
  statusListeners.forEach((fn) => {
    try {
      fn(snapshot);
    } catch {
      // ignore
    }
  });
}

export function getOfflineDictStatus() {
  return {
    status,
    count: wordCount,
    error: lastError,
  };
}

export function onOfflineDictStatusChange(fn) {
  statusListeners.add(fn);
  return () => statusListeners.delete(fn);
}

function openDb() {
  return new Promise((resolve, reject) => {
    const idb = getHostWindow().indexedDB;
    if (!idb) {
      reject(new Error('浏览器不支持 IndexedDB'));
      return;
    }
    const req = idb.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('打开离线词库数据库失败'));
  });
}

async function readFromDb() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(RECORD_ID);
    req.onsuccess = () => {
      db.close();
      resolve(req.result || null);
    };
    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}

async function writeToDb(text, count) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({
      id: RECORD_ID,
      version: DATA_VERSION,
      count,
      text,
      updatedAt: Date.now(),
    });
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

function parseTsvIntoMemory(text) {
  entryMap.clear();
  lemmaMap.clear();
  const lines = text.split('\n');
  let inLemma = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.charCodeAt(0) === 35) continue; // skip empty & '#' header
    if (line === '===LEMMA===') {
      inLemma = true;
      continue;
    }
    const tab1 = line.indexOf('\t');
    if (tab1 <= 0) continue;
    const key = line.slice(0, tab1);
    const rest = line.slice(tab1 + 1);
    if (inLemma) {
      lemmaMap.set(key, rest);
    } else {
      entryMap.set(key, rest);
    }
  }

  wordCount = entryMap.size;
  return wordCount;
}

async function fetchTsvFromCdn() {
  const tasks = DICT_URLS.map(async (url) => {
    const res = await fetch(url, { cache: 'default' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.startsWith('#v1') || !text.includes('===LEMMA===')) {
      throw new Error('词库数据格式无效');
    }
    return text;
  });
  return Promise.any(tasks);
}

/**
 * 后台初始化本地离线英语词库（优先读 IndexedDB，约 15ms；首次静默从 CDN 下载一次并永久缓存）
 */
export function initOfflineEnDict({ forceDownload = false } = {}) {
  if (!forceDownload && status === 'ready' && entryMap.size > 0) {
    return Promise.resolve(getOfflineDictStatus());
  }
  if (!forceDownload && initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      if (!forceDownload) {
        setStatus('loading');
        try {
          const cached = await readFromDb();
          if (cached && cached.version === DATA_VERSION && typeof cached.text === 'string' && cached.text.length > 10000) {
            parseTsvIntoMemory(cached.text);
            if (entryMap.size > 0) {
              setStatus('ready');
              return getOfflineDictStatus();
            }
          }
        } catch {
          // IndexedDB 不可用时继续尝试网络下载到内存
        }
      }

      setStatus('downloading');
      const text = await fetchTsvFromCdn();
      const count = parseTsvIntoMemory(text);
      if (count > 0) {
        writeToDb(text, count).catch(() => {});
        setStatus('ready');
      } else {
        setStatus('error', '词库为空');
      }
      return getOfflineDictStatus();
    } catch (err) {
      setStatus('error', err?.message || '下载失败');
      return getOfflineDictStatus();
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
}

const POS_PREFIX_MAP = {
  n: 'noun',
  pl: 'noun',
  v: 'verb',
  vt: 'verb',
  vi: 'verb',
  aux: 'verb',
  modal: 'verb',
  a: 'adjective',
  adj: 'adjective',
  ad: 'adverb',
  adv: 'adverb',
  prep: 'preposition',
  conj: 'conjunction',
  pron: 'pronoun',
  int: 'interjection',
  interj: 'interjection',
  art: 'article',
  num: 'numeral',
  det: 'determiner',
  abbr: 'noun',
};

function parseTranslationToMeanings(transStr) {
  const lines = String(transStr || '')
    .split('\\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const grouped = new Map();
  let briefCn = '';

  for (const line of lines) {
    let rawPos = '';
    let cnText = line;
    const match = line.match(/^([a-z]{1,6})\.(?:\/[a-z]{1,6}\.)*\s+(.+)$/i);
    if (match) {
      rawPos = match[1].toLowerCase();
      cnText = match[2].trim();
    }
    if (!briefCn) briefCn = cnText;

    const canonical = POS_PREFIX_MAP[rawPos] || (rawPos ? rawPos : 'other');
    const posInfo =
      canonical === 'other'
        ? { abbr: '释义', cn: '', tone: 'other' }
        : normalizePos(canonical);

    const groupKey = posInfo.abbr || canonical;
    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, {
        pos: canonical,
        posInfo,
        definitions: [],
      });
    }
    grouped.get(groupKey).definitions.push({
      cn: cnText,
      text: '',
      example: '',
    });
  }

  return {
    briefCn,
    meanings: [...grouped.values()],
  };
}

/**
 * 英语词形还原候选生成（覆盖名词复数、动词时态/分词、形容词比较级、副词等）
 */
function generateLemmaCandidates(word) {
  const cands = [];
  const push = (w) => {
    if (w && w.length >= 2 && w !== word && !cands.includes(w)) {
      cands.push(w);
    }
  };

  // 所有格 / 缩写
  if (word.endsWith("'s") || word.endsWith("’s")) {
    push(word.slice(0, -2));
  }
  if (word.endsWith("n't") || word.endsWith("n’t")) {
    push(word.slice(0, -3));
  }

  // -ies -> -y (studies -> study)
  if (word.endsWith('ies') && word.length > 4) {
    push(word.slice(0, -3) + 'y');
  }
  // -ves -> -f / -fe (wolves -> wolf, knives -> knife)
  if (word.endsWith('ves') && word.length > 4) {
    push(word.slice(0, -3) + 'f');
    push(word.slice(0, -3) + 'fe');
  }
  // -es / -s
  if (word.endsWith('es') && word.length > 3) {
    push(word.slice(0, -2));
  }
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) {
    push(word.slice(0, -1));
  }

  // -ied -> -y (carried -> carry)
  if (word.endsWith('ied') && word.length > 4) {
    push(word.slice(0, -3) + 'y');
  }
  // -ed
  if (word.endsWith('ed') && word.length > 4) {
    const stem = word.slice(0, -2);
    // 双写辅音 (stopped -> stop)
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      push(stem.slice(0, -1));
    }
    push(stem);
    push(stem + 'e'); // loved -> love
  }

  // -ying -> -ie (dying -> die)
  if (word.endsWith('ying') && word.length > 5) {
    push(word.slice(0, -4) + 'ie');
  }
  // -ing
  if (word.endsWith('ing') && word.length > 5) {
    const stem = word.slice(0, -3);
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      push(stem.slice(0, -1)); // running -> run
    }
    push(stem); // walking -> walk
    push(stem + 'e'); // making -> make
  }

  // -ier / -iest -> -y
  if (word.endsWith('ier') && word.length > 4) push(word.slice(0, -3) + 'y');
  if (word.endsWith('iest') && word.length > 5) push(word.slice(0, -4) + 'y');

  // -er / -est
  if (word.endsWith('er') && word.length > 4) {
    const stem = word.slice(0, -2);
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      push(stem.slice(0, -1));
    }
    push(stem);
    push(stem + 'e');
  }
  if (word.endsWith('est') && word.length > 5) {
    const stem = word.slice(0, -3);
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      push(stem.slice(0, -1));
    }
    push(stem);
    push(stem + 'e');
  }

  // -ily -> -y / -ly -> ""
  if (word.endsWith('ily') && word.length > 5) {
    push(word.slice(0, -3) + 'y');
  } else if (word.endsWith('ly') && word.length > 4) {
    push(word.slice(0, -2));
    push(word.slice(0, -2) + 'e');
  }

  return cands;
}

function findInOfflineMap(rawWord) {
  const lower = String(rawWord || '').trim().toLowerCase().replace(/^['’]+|['’]+$/g, '');
  if (!lower) return null;

  // 1. 精确命中
  if (entryMap.has(lower)) {
    return { matchedWord: lower, raw: entryMap.get(lower), isLemma: false };
  }

  // 2. 不规则词形表命中
  const irrBase = lemmaMap.get(lower);
  if (irrBase && entryMap.has(irrBase)) {
    return { matchedWord: irrBase, raw: entryMap.get(irrBase), isLemma: true };
  }

  // 3. 规则词形还原命中
  const cands = generateLemmaCandidates(lower);
  for (const cand of cands) {
    if (entryMap.has(cand)) {
      return { matchedWord: cand, raw: entryMap.get(cand), isLemma: true };
    }
    const irr = lemmaMap.get(cand);
    if (irr && entryMap.has(irr)) {
      return { matchedWord: irr, raw: entryMap.get(irr), isLemma: true };
    }
  }

  return null;
}

export const offlineEnDict = registerDictionary({
  id: 'offline-en',
  name: '本地词典',
  description: '离线 3 万核心英语词库，0ms 瞬开，无需联网',
  languages: ['en'],
  isLocal: true,
  async lookup(word) {
    if (entryMap.size === 0) {
      // 尚未就绪时不阻塞，立即交由在线词典兜底，同时确保后台正在加载
      if (status === 'idle') initOfflineEnDict();
      return null;
    }

    const hit = findInOfflineMap(word);
    if (!hit) return null;

    const tabIdx = hit.raw.indexOf('\t');
    const phoneticRaw = tabIdx >= 0 ? hit.raw.slice(0, tabIdx).trim() : '';
    const transRaw = tabIdx >= 0 ? hit.raw.slice(tabIdx + 1) : hit.raw;

    const { briefCn, meanings } = parseTranslationToMeanings(transRaw);
    if (meanings.length === 0) return null;

    return {
      word,
      phonetic: phoneticRaw ? `/${phoneticRaw}/` : '',
      reading: '',
      audioUrl: '',
      briefCn,
      tags: hit.isLemma ? [`原形 ${hit.matchedWord}`] : [],
      meanings,
    };
  },
});
