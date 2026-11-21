import { getConfig } from '../config.js';
import { getLanguage } from '../languages/registry.js';
import { getHostWindow } from './host.js';

let activeAudio = null;

export function stopSpeaking() {
  if (activeAudio) {
    try {
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

function playAudioUrl(url, rate = 1.0) {
  return new Promise((resolve, reject) => {
    stopSpeaking();
    const AudioCtor = getHostWindow().Audio || Audio;
    const audio = new AudioCtor(url);
    audio.playbackRate = Math.max(0.5, Math.min(2.0, rate || 1.0));
    activeAudio = audio;
    audio.onended = () => {
      if (activeAudio === audio) activeAudio = null;
      resolve(true);
    };
    audio.onerror = (e) => {
      if (activeAudio === audio) activeAudio = null;
      reject(e || new Error('音频播放失败'));
    };
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((err) => {
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

function speakWithWebSpeech(text, langCode, rate = 1.0) {
  return new Promise((resolve, reject) => {
    const win = getHostWindow();
    const synth = win.speechSynthesis;
    const UtteranceCtor = win.SpeechSynthesisUtterance || window.SpeechSynthesisUtterance;
    if (!synth || !UtteranceCtor) {
      reject(new Error('当前浏览器不支持 Web Speech 朗读'));
      return;
    }
    stopSpeaking();
    const langDef = getLanguage(langCode);
    const bcp47 = langDef?.bcp47 || langCode || 'en-US';
    const utter = new UtteranceCtor(text);
    utter.lang = bcp47;
    utter.rate = Math.max(0.5, Math.min(2.0, rate || 1.0));

    // 尽量挑选匹配语种的优质语音
    const voices = synth.getVoices ? synth.getVoices() : [];
    const prefix = bcp47.split('-')[0].toLowerCase();
    const matched =
      voices.find((v) => v.lang && v.lang.toLowerCase() === bcp47.toLowerCase()) ||
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix));
    if (matched) utter.voice = matched;

    utter.onend = () => resolve(true);
    utter.onerror = (e) => reject(e);
    synth.speak(utter);
  });
}

/**
 * 朗读单词（优先真人词典音频 -> 有道语音 -> Web Speech）
 */
export async function speakWord(word, options = {}) {
  const text = String(word || '').trim();
  if (!text) return;
  const cfg = getConfig();
  const langCode = options.lang || cfg.targetLang || 'en';
  const rate = options.rate ?? cfg.tts?.rate ?? 1.0;
  const engine = cfg.tts?.engine || 'auto';

  if (engine === 'webspeech') {
    return speakWithWebSpeech(text, langCode, rate);
  }

  // 1. 优先播放词典返回的真实音频
  if (options.audioUrl) {
    try {
      await playAudioUrl(options.audioUrl, rate);
      return;
    } catch {
      // fallback
    }
  }

  // 2. 使用有道语音接口（<audio> 天然免 CORS，支持英美音/日语/法语等）
  try {
    const url = getYoudaoVoiceUrl(text, langCode, cfg.tts?.enAccent || 'us');
    await playAudioUrl(url, rate);
    return;
  } catch {
    // fallback
  }

  // 3. 兜底使用浏览器 Web Speech
  return speakWithWebSpeech(text, langCode, rate);
}

/**
 * 朗读整句或整段（默认 Web Speech，支持调速；若选有道则按短句播放）
 */
export async function speakSentence(text, options = {}) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return;
  const cfg = getConfig();
  const langCode = options.lang || cfg.targetLang || 'en';
  const rate = options.rate ?? cfg.tts?.rate ?? 1.0;
  const engine = cfg.tts?.engine || 'auto';

  if (engine === 'youdao' && clean.length <= 220) {
    try {
      const url = getYoudaoVoiceUrl(clean, langCode, cfg.tts?.enAccent || 'us');
      await playAudioUrl(url, rate);
      return;
    } catch {
      // fallback
    }
  }

  try {
    await speakWithWebSpeech(clean, langCode, rate);
  } catch {
    if (clean.length <= 220) {
      const url = getYoudaoVoiceUrl(clean, langCode, cfg.tts?.enAccent || 'us');
      await playAudioUrl(url, rate);
    }
  }
}
