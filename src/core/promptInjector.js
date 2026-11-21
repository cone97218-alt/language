import { getConfig } from '../config.js';
import { getLanguage } from '../languages/registry.js';
import { getTavernHelper } from './host.js';

const PROMPT_ID = 'tavern-language-immersive-prompt';
let currentUninject = null;

export function getDefaultPromptText(langCode, levelId) {
  const langDef = getLanguage(langCode);
  if (!langDef) return '';
  return langDef.buildPrompt(levelId, '');
}

export function getEffectivePromptText(cfg = getConfig()) {
  const custom = String(cfg.promptInjection?.promptText || '').trim();
  if (custom) return custom;
  return getDefaultPromptText(cfg.targetLang, cfg.promptInjection?.level);
}

export function clearInjectedPrompt() {
  if (typeof currentUninject === 'function') {
    try {
      currentUninject();
    } catch {
      // ignore
    }
    currentUninject = null;
  }
  const helper = getTavernHelper();
  if (helper && typeof helper.uninjectPrompts === 'function') {
    try {
      helper.uninjectPrompts([PROMPT_ID]);
    } catch {
      // ignore
    }
  }
}

export function syncPromptInjection() {
  clearInjectedPrompt();

  const cfg = getConfig();
  if (!cfg.enabled || !cfg.promptInjection?.enabled) {
    return false;
  }

  const helper = getTavernHelper();
  if (!helper || typeof helper.injectPrompts !== 'function') {
    return false;
  }

  const content = getEffectivePromptText(cfg);
  if (!content) return false;

  try {
    const res = helper.injectPrompts([
      {
        id: PROMPT_ID,
        role: 'system',
        content,
        position: 'in_chat',
        depth: Number.isFinite(Number(cfg.promptInjection.depth))
          ? Number(cfg.promptInjection.depth)
          : 0,
        should_scan: false,
      },
    ]);
    if (res && typeof res.uninject === 'function') {
      currentUninject = res.uninject;
    }
    return true;
  } catch (err) {
    console.warn('[TavernLanguage] injectPrompts 注入失败:', err);
    return false;
  }
}
