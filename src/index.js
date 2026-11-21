// 酒馆助手沉浸式外语学习插件主入口
import { getHostWindow, notify } from './core/host.js';
import { loadConfig, onConfigChange, getConfig, updateConfig, VERSION } from './config.js';
import { syncPromptInjection, clearInjectedPrompt } from './core/promptInjector.js';
import { startObserving, stopObserving, processAllMessages, clearAllProcessedMessages } from './core/observer.js';
import { stopSpeaking } from './core/tts.js';
import { injectStyles, removeStyles, applyThemeAttributes } from './ui/styles.js';
import { initPopover, destroyPopover } from './ui/popover.js';
import { initSelectionBar, destroySelectionBar } from './ui/selectionBar.js';
import { mountSettingsEntry, unmountSettingsEntry, openSettingsModal } from './ui/settingsModal.js';

// 注册内置语种包（英语 / 日语 / 法语）
import { registerLanguage, getLanguage, listLanguages } from './languages/registry.js';
import './languages/en.js';
import './languages/ja.js';
import './languages/fr.js';

// 注册内置可组装词典源
import { registerDictionary, listDictionaries, lookupWord } from './dictionaries/registry.js';
import './dictionaries/freeDictionary.js';
import './dictionaries/jotoba.js';
import './dictionaries/wiktionary.js';
import './dictionaries/aiContext.js';

// 注册内置翻译引擎
import { registerTranslator, listTranslators, translateText } from './translators/registry.js';
import './translators/googleFree.js';
import './translators/myMemory.js';
import './translators/customAi.js';

const INSTANCE_KEY = '__TAVERN_LANG_INSTANCE__';
let unsubscribeConfig = null;

export function destroy() {
  if (unsubscribeConfig) {
    unsubscribeConfig();
    unsubscribeConfig = null;
  }
  stopSpeaking();
  clearInjectedPrompt();
  stopObserving();
  destroyPopover();
  destroySelectionBar();
  unmountSettingsEntry();
  clearAllProcessedMessages();
  removeStyles();

  const host = getHostWindow();
  if (host[INSTANCE_KEY]?.destroy === destroy) {
    delete host[INSTANCE_KEY];
  }
}

export function init(options = {}) {
  const host = getHostWindow();
  // 热更新保护：若存在旧版本实例，先完整卸载再启动新版
  if (host[INSTANCE_KEY] && typeof host[INSTANCE_KEY].destroy === 'function') {
    try {
      host[INSTANCE_KEY].destroy();
    } catch (err) {
      console.warn('[TavernLanguage] 清理旧实例时出现警告:', err);
    }
  }

  loadConfig();
  injectStyles();
  mountSettingsEntry();
  initPopover();
  initSelectionBar();
  syncPromptInjection();
  startObserving();

  unsubscribeConfig = onConfigChange((cfg) => {
    applyThemeAttributes(cfg);
    syncPromptInjection();
    if (!cfg.enabled) {
      clearAllProcessedMessages();
    } else {
      processAllMessages({ force: true });
    }
  });

  const api = {
    version: VERSION,
    init,
    destroy,
    openSettings: openSettingsModal,
    getConfig,
    updateConfig,
    registerLanguage,
    getLanguage,
    listLanguages,
    registerDictionary,
    listDictionaries,
    lookupWord,
    registerTranslator,
    listTranslators,
    translateText,
  };

  host[INSTANCE_KEY] = api;

  if (!options.silent) {
    const langName = getLanguage(getConfig().targetLang)?.name || getConfig().targetLang;
    notify(`已加载 v${VERSION}（当前语种：${langName}）`, 'success');
  }

  return api;
}

export {
  VERSION as version,
  registerLanguage,
  registerDictionary,
  registerTranslator,
  openSettingsModal as openSettings,
};
