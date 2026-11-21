import { getConfig } from '../config.js';
import { getLanguage } from '../languages/registry.js';
import { getHostWindow } from './host.js';

let activeAudio = null;
let playbackToken = 0;

export function stopSpeaking() {
  playbackToken++;
  if (activeAudio) {
    try {
      activeAudio.onended = null;
      activeAudio.onerror = null;
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudio = null;
  }
  const win = getHostWindow();
  if (win.speechSynthesis) {
    try {
      win.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

function createAudio(url, rate = 1.0) {
  const AudioCtor = getHostWindow().Audio || Audio;
  const audio = new AudioCtor(url);
  audio.preload = 'auto';
  audio.playbackRate = Math.max(0.5, Math.min(2.0, rate || 1.0));
  return audio;
}

function playAudioElement(audio, token) {
  return new Promise((resolve, reject) => {
    if (token !== playbackToken) {
      resolve(false);
      return;
    }
    activeAudio = audio;
    audio.onended = () => {
      if (activeAudio === audio) activeAudio = null;
      resolve(true);
    };
    audio.onerror = (e) => {
      if (activeAudio === audio) activeAudio = null;
      reject(e || new Error('音频播放失败'));
    };
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch((err) => {
        if (activeAudio === audio) activeAudio = null;
        reject(err);
      });
    }
  });
}

function getYoudaoVoiceUrl(text, langCode, enAccent = 'us') {
  const encoded = encodeURIComponent(text);
  if (langCode === 'en') {
    const type = enAccent === 'uk' ? 1 : 2;
    return `https://dict.youdao.com/dictvoice?audio=${encoded}&type=${type}`;
  }
  const langMap = { ja: 'jap', fr: 'fr', ko: 'ko', de: 'de', es: 'es' };
  const le = langMap[langCode] || langCode;
  return `https://dict.youdao.com/dictvoice?audio=${encoded}&le=${encodeURIComponent(le)}`;
}

/**
 * 将长段落按自然句界切分为适合在线人声连播的短句（<= 140 字）
 */
function splitIntoSpeechChunks(text, maxLen = 140) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  if (clean.length <= maxLen) return [clean];

  const rawSentences = clean
    .split(/(?<=[.!?。！？\n])\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks = [];
  for (const sentence of rawSentences) {
    if (sentence.length <= maxLen) {
      if (chunks.length > 0 && chunks[chunks.length - 1].length + 1 + sentence.length <= maxLen) {
        chunks[chunks.length - 1] += ' ' + sentence;
      } else {
        chunks.push(sentence);
      }
      continue;
    }

    // 超长单句按逗号/分号进一步切分
    const subParts = sentence
      .split(/(?<=[,;，；：—])\s*/)
      .map((s) => s.trim())
      .filter(Boolean);

    let buf = '';
    for (const part of subParts) {
      if (part.length > maxLen) {
        if (buf) {
          chunks.push(buf);
          buf = '';
        }
        // 极端无标点超长句按空格或定长切分
        let rest = part;
        while (rest.length > maxLen) {
          let cut = rest.lastIndexOf(' ', maxLen);
          if (cut < Math.floor(maxLen * 0.5)) cut = maxLen;
          chunks.push(rest.slice(0, cut).trim());
          rest = rest.slice(cut).trim();
        }
        if (rest) buf = rest;
      } else if (!buf) {
        buf = part;
      } else if (buf.length + 1 + part.length <= maxLen) {
        buf += ' ' + part;
      } else {
        chunks.push(buf);
        buf = part;
      }
    }
    if (buf) chunks.push(buf);
  }

  return chunks.filter(Boolean);
}

/**
 * 挑选质量最高的浏览器语音（优先 Natural / Neural / Google / Online，避开老旧机械音）
 */
function pickBestWebVoice(voices, bcp47) {
  if (!Array.isArray(voices) || voices.length === 0) return null;
  const targetLower = bcp47.toLowerCase();
  const prefix = targetLower.split('-')[0];

  const candidates = voices.filter(
    (v) => v.lang && v.lang.toLowerCase().startsWith(prefix)
  );
  if (candidates.length === 0) return null;

  const qualityRe = /(natural|neural|google|online|enhanced|premium|wavenet|siri)/i;
  candidates.sort((a, b) => {
    const aExact = a.lang.toLowerCase() === targetLower ? 2 : 0;
    const bExact = b.lang.toLowerCase() === targetLower ? 2 : 0;
    const aQual = qualityRe.test(a.name || '') ? 4 : 0;
    const bQual = qualityRe.test(b.name || '') ? 4 : 0;
    return bExact + bQual - (aExact + aQual);
  });

  return candidates[0];
}

function speakWithWebSpeech(text, langCode, rate = 1.0, token = playbackToken) {
  return new Promise((resolve, reject) => {
    if (token !== playbackToken) {
      resolve(false);
      return;
    }
    const win = getHostWindow();
    const synth = win.speechSynthesis;
    const UtteranceCtor = win.SpeechSynthesisUtterance || window.SpeechSynthesisUtterance;
    if (!synth || !UtteranceCtor) {
      reject(new Error('当前浏览器不支持 Web Speech'));
      return;
    }
    try {
      synth.cancel();
    } catch {
      // ignore
    }

    const langDef = getLanguage(langCode);
    const bcp47 = langDef?.bcp47 || langCode || 'en-US';
    const utter = new UtteranceCtor(text);
    utter.lang = bcp47;
    utter.rate = Math.max(0.5, Math.min(2.0, rate || 1.0));

    const voices = synth.getVoices ? synth.getVoices() : [];
    const matched = pickBestWebVoice(voices, bcp47);
    if (matched) utter.voice = matched;

    utter.onend = () => resolve(true);
    utter.onerror = (e) => reject(e);
    synth.speak(utter);
  });
}

/**
 * 逐句预加载 + 无缝连播有道在线自然人声
 */
async function playYoudaoChunks(chunks, langCode, enAccent, rate, token) {
  if (chunks.length === 0) return;

  let nextAudio = createAudio(getYoudaoVoiceUrl(chunks[0], langCode, enAccent), rate);

  for (let i = 0; i < chunks.length; i++) {
    if (token !== playbackToken) return;
    const currentAudio = nextAudio;
    // 播放当前句的同时，提前预加载下一句音频，消除句间卡顿
    nextAudio =
      i + 1 < chunks.length
        ? createAudio(getYoudaoVoiceUrl(chunks[i + 1], langCode, enAccent), rate)
        : null;

    try {
      await playAudioElement(currentAudio, token);
    } catch {
      if (token !== playbackToken) return;
      // 单句在线音频偶发失败时，仅该句回退到高质量系统语音，不影响后续自然人声
      try {
        await speakWithWebSpeech(chunks[i], langCode, rate, token);
      } catch {
        // continue
      }
    }
  }
}

/**
 * 朗读单词（优先真人词典音频 -> 有道在线真人语音 -> 高质量系统语音兜底）
 */
export async function speakWord(word, options = {}) {
  const text = String(word || '').trim();
  if (!text) return;
  stopSpeaking();
  const token = playbackToken;

  const cfg = getConfig();
  const langCode = options.lang || cfg.targetLang || 'en';
  const rate = options.rate ?? cfg.tts?.rate ?? 1.0;
  const engine = cfg.tts?.engine || 'auto';

  if (engine === 'webspeech') {
    return speakWithWebSpeech(text, langCode, rate, token);
  }

  if (options.audioUrl) {
    try {
      await playAudioElement(createAudio(options.audioUrl, rate), token);
      return;
    } catch {
      if (token !== playbackToken) return;
    }
  }

  try {
    const url = getYoudaoVoiceUrl(text, langCode, cfg.tts?.enAccent || 'us');
    await playAudioElement(createAudio(url, rate), token);
    return;
  } catch {
    if (token !== playbackToken) return;
  }

  return speakWithWebSpeech(text, langCode, rate, token);
}

/**
 * 朗读整句或整条消息（默认全程使用在线自然人声切片预加载连播，告别机械音）
 */
export async function speakSentence(text, options = {}) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return;
  stopSpeaking();
  const token = playbackToken;

  const cfg = getConfig();
  const langCode = options.lang || cfg.targetLang || 'en';
  const rate = options.rate ?? cfg.tts?.rate ?? 1.0;
  const engine = cfg.tts?.engine || 'auto';

  if (engine === 'webspeech') {
    return speakWithWebSpeech(clean, langCode, rate, token);
  }

  const chunks = splitIntoSpeechChunks(clean, 140);
  await playYoudaoChunks(chunks, langCode, cfg.tts?.enAccent || 'us', rate, token);
}
