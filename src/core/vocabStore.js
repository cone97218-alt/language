import { getHostWindow } from './host.js';

const VOCAB_STORAGE_KEY = 'tavern_language_vocab_v1';

const DEFAULT_BOOK_ID = 'default';

function createDefaultData() {
  return {
    activeBookId: DEFAULT_BOOK_ID,
    books: [
      { id: DEFAULT_BOOK_ID, name: '默认生词本', createdAt: Date.now() },
    ],
    items: [],
  };
}

let vocabState = createDefaultData();
const listeners = new Set();

function emit() {
  try {
    getHostWindow().localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(vocabState));
  } catch (err) {
    console.warn('[TavernLanguage] 保存生词本失败:', err);
  }
  listeners.forEach((fn) => {
    try {
      fn(vocabState);
    } catch {
      // ignore
    }
  });
}

export function loadVocab() {
  try {
    const raw = getHostWindow().localStorage.getItem(VOCAB_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.books) && Array.isArray(parsed.items)) {
        if (parsed.books.length === 0) {
          parsed.books.push({ id: DEFAULT_BOOK_ID, name: '默认生词本', createdAt: Date.now() });
        }
        if (!parsed.books.some((b) => b.id === parsed.activeBookId)) {
          parsed.activeBookId = parsed.books[0].id;
        }
        vocabState = parsed;
        return vocabState;
      }
    }
  } catch {
    // ignore
  }
  vocabState = createDefaultData();
  return vocabState;
}

export function getVocabState() {
  return vocabState;
}

export function onVocabChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function normalizeWordKey(word, lang) {
  return `${String(lang || 'en').toLowerCase()}::${String(word || '').trim().toLowerCase()}`;
}

export function findVocabItem(word, lang) {
  const key = normalizeWordKey(word, lang);
  return vocabState.items.find((it) => it.key === key) || null;
}

export function isWordStarred(word, lang) {
  return Boolean(findVocabItem(word, lang));
}

export function setActiveBook(bookId) {
  if (!vocabState.books.some((b) => b.id === bookId)) return;
  vocabState.activeBookId = bookId;
  emit();
}

export function createBook(name) {
  const clean = String(name || '').trim();
  if (!clean) return null;
  const id = `book_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const book = { id, name: clean, createdAt: Date.now() };
  vocabState.books.push(book);
  vocabState.activeBookId = id;
  emit();
  return book;
}

export function renameBook(bookId, newName) {
  const clean = String(newName || '').trim();
  if (!clean) return false;
  const book = vocabState.books.find((b) => b.id === bookId);
  if (!book) return false;
  book.name = clean;
  emit();
  return true;
}

export function deleteBook(bookId) {
  if (vocabState.books.length <= 1) return false;
  const idx = vocabState.books.findIndex((b) => b.id === bookId);
  if (idx < 0) return false;
  vocabState.books.splice(idx, 1);
  const fallbackId = vocabState.books[0].id;
  // 被删单词本里的词自动归入第一个单词本，防止数据丢失
  vocabState.items.forEach((it) => {
    if (it.bookId === bookId) it.bookId = fallbackId;
  });
  if (vocabState.activeBookId === bookId) {
    vocabState.activeBookId = fallbackId;
  }
  emit();
  return true;
}

export function saveVocabWord(payload) {
  const word = String(payload.word || '').trim();
  const lang = String(payload.lang || 'en').toLowerCase();
  if (!word) return null;

  const key = normalizeWordKey(word, lang);
  const bookId = payload.bookId || vocabState.activeBookId || vocabState.books[0].id;
  const existing = vocabState.items.find((it) => it.key === key);

  if (existing) {
    existing.bookId = bookId;
    if (payload.phonetic) existing.phonetic = payload.phonetic;
    if (payload.reading) existing.reading = payload.reading;
    if (payload.briefCn) existing.briefCn = payload.briefCn;
    if (payload.pos) existing.pos = payload.pos;
    if (payload.context) existing.context = payload.context;
    if (payload.audioUrl) existing.audioUrl = payload.audioUrl;
    existing.updatedAt = Date.now();
    emit();
    return existing;
  }

  const item = {
    id: `w_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    key,
    word,
    lang,
    bookId,
    phonetic: payload.phonetic || '',
    reading: payload.reading || '',
    pos: payload.pos || '',
    briefCn: payload.briefCn || '',
    context: payload.context || '',
    audioUrl: payload.audioUrl || '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  vocabState.items.unshift(item);
  emit();
  return item;
}

export function removeVocabWord(wordOrId, lang = null) {
  let idx = -1;
  if (lang) {
    const key = normalizeWordKey(wordOrId, lang);
    idx = vocabState.items.findIndex((it) => it.key === key);
  } else {
    idx = vocabState.items.findIndex((it) => it.id === wordOrId);
  }
  if (idx < 0) return false;
  vocabState.items.splice(idx, 1);
  emit();
  return true;
}

export function moveVocabWord(itemId, targetBookId) {
  const item = vocabState.items.find((it) => it.id === itemId);
  if (!item || !vocabState.books.some((b) => b.id === targetBookId)) return false;
  item.bookId = targetBookId;
  item.updatedAt = Date.now();
  emit();
  return true;
}

export function exportVocabJson() {
  return JSON.stringify(vocabState, null, 2);
}

export function importVocabJson(jsonStr) {
  const parsed = JSON.parse(jsonStr);
  if (!parsed || !Array.isArray(parsed.books) || !Array.isArray(parsed.items)) {
    throw new Error('无效的生词本 JSON 格式');
  }
  // 合并导入（保留现有单词本与词条，按 key 去重）
  for (const b of parsed.books) {
    if (b?.id && b?.name && !vocabState.books.some((x) => x.id === b.id)) {
      vocabState.books.push({ id: b.id, name: b.name, createdAt: b.createdAt || Date.now() });
    }
  }
  for (const it of parsed.items) {
    if (!it?.word || !it?.lang) continue;
    const key = normalizeWordKey(it.word, it.lang);
    if (!vocabState.items.some((x) => x.key === key)) {
      const targetBook = vocabState.books.some((b) => b.id === it.bookId)
        ? it.bookId
        : vocabState.books[0].id;
      vocabState.items.push({ ...it, key, bookId: targetBook });
    }
  }
  emit();
  return vocabState.items.length;
}
