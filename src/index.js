// 酒馆助手沉浸式外语学习插件主入口 (Vue 3 架构)
import { getHostWindow, getHostDocument, notify } from './core/host.js';
import { onConfigChange, getConfig, updateConfig, VERSION } from './config.js';
import { syncPromptInjection, clearInjectedPrompt } from './core/promptInjector.js';
import { startObserving, stopObserving, processAllMessages, clearAllProcessedMessages } from './core/observer.js';
import { stopSpeaking } from './core/tts.js';
import { initGestureGuard, destroyGestureGuard } from './core/gestureGuard.js';
import { injectStyles, removeStyles, applyThemeAttributes } from './ui/styles.js';
import { mountHamburgerEntries, unmountHamburgerEntries } from './ui/menuEntry.js';
import { initAppState, syncConfigToState, openModal } from './ui/vue/appState.js';
import { mountVueUi, unmountVueUi } from './ui/vue/App.js';
import { initPopoverListeners, destroyPopoverListeners } from './ui/vue/WordPopover.js';
import { initSelectionListeners, destroySelectionListeners } from './ui/vue/SelectionBar.js';

// 注册内置语种包（英语 / 日语 / 法语）
import { registerLanguage, getLanguage, listLanguages } from './languages/registry.js';
import './languages/en.js';
import './languages/ja.js';
import './languages/fr.js';

// 注册内置可组装词典源
import { registerDictionary, listDictionaries, lookupWord } from './dictionaries/registry.js';
import './dictionaries/googleDict.js';
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
  destroyPopoverListeners();
  destroySelectionListeners();
  destroyGestureGuard();
  unmountHamburgerEntries();
  unmountVueUi();
  clearAllProcessedMessages();
  removeStyles();

  const host = getHostWindow();
  if (host[INSTANCE_KEY]?.destroy === destroy) {
    delete host[INSTANCE_KEY];
  }
}

function injectPreconnectHints() {
  const doc = getHostDocument();
  const origins = [
    'https://translate.googleapis.com',
    'https://api.dictionaryapi.dev',
    'https://en.wiktionary.org',
    'https://jotoba.de',
  ];
  for (const href of origins) {
    const id = `tl-preconnect-${href.replace(/[^a-z0-9]/gi, '')}`;
    if (doc.getElementById(id)) continue;
    const link = doc.createElement('link');
    link.id = id;
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = 'anonymous';
    doc.head.appendChild(link);
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

  injectPreconnectHints();
  initAppState();
  injectStyles();
  mountVueUi();
  initGestureGuard();
  initPopoverListeners();
  initSelectionListeners();
  mountHamburgerEntries();
  syncPromptInjection();
  startObserving();

  unsubscribeConfig = onConfigChange((cfg) => {
    syncConfigToState();
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
    openSettings: () => openModal('general'),
    openVocabBook: () => openModal('vocab'),
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
};
export function openSettings() {
  openModal('general');
}
export function openVocabBook() {
  openModal('vocab');
}
