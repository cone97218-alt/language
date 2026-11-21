import { getHostWindow } from './core/host.js';

export const VERSION = '2.2.2';
export const STORAGE_KEY = 'tavern_language_config_v1';

// 系统级始终跳过的非正文标签（防止破坏脚本、样式与插件自身节点）
export const SYSTEM_EXCLUDE_SELECTORS = [
  'script',
  'style',
  'noscript',
  'iframe',
  'svg',
  'canvas',
  'audio',
  'video',
  '.tl-ignore',
  '.tl-trans-block',
  '.tl-mes-footer',
  '.tl-word',
  '.tl-popover',
  '.tl-sel-bar',
  '.tl-modal-backdrop',
  '#tl-vue-root',
];

export const DEFAULT_CONFIG = {
  enabled: true,
  // 目标学习语种：'en' | 'ja' | 'fr'（可通过 registerLanguage 扩展）
  targetLang: 'en',
  // 沉浸式外语提示词注入（让 API 直接输出目标外语）
  promptInjection: {
    enabled: true,
    level: 'B1',
    promptText: '',
    depth: 0,
  },
  // 界面主题：'tavern'（跟随酒馆美化变量）| 'light'（日间）| 'dark'（夜间）
  theme: 'tavern',
  // 安全分词：用户可自定义的排除标签 / CSS 选择器名单
  excludeSelectors: [
    'code',
    'pre',
    'kbd',
    'math',
    'summary',
    'button',
    'input',
    'textarea',
    'select',
  ],
  // 每个语种启用的词典链（按优先级组装，可调整顺序与开关）
  dictionaryChains: {
    en: ['google-dict', 'free-dict', 'wiktionary', 'ai-context'],
    ja: ['google-dict', 'jotoba', 'wiktionary', 'ai-context'],
    fr: ['google-dict', 'wiktionary', 'ai-context'],
  },
  // 点词时是否自动附带中文释义补全
  autoTranslateDict: true,
  // 点词时是否自动发音
  autoSpeakWord: false,
  // 翻译引擎：'google' | 'mymemory' | 'custom-ai' | 'tavern-ai'
  translator: 'google',
  // 自定义 OpenAI 兼容 API（用于高质量语境翻译 & AI 语境词典）
  customAi: {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
    model: 'gpt-4o-mini',
  },
  // 发音设置
  tts: {
    engine: 'auto', // 'auto'（优先真人音频，整句用 WebSpeech）| 'webspeech' | 'youdao'
    rate: 1.0,
    enAccent: 'us', // 'us' | 'uk'
  },
  // 界面显示细节
  ui: {
    showWordUnderline: true, // 鼠标悬停时轻柔下划线提示
    autoShowMesButtons: true, // 在原生消息栏添加「译」「读」按钮
  },
};

function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  const result = Array.isArray(target) ? [...target] : { ...target };
  for (const key of Object.keys(source)) {
    const val = source[key];
    if (val && typeof val === 'object' && !Array.isArray(val) && target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      result[key] = deepMerge(target[key], val);
    } else if (val !== undefined) {
      result[key] = Array.isArray(val) ? [...val] : val;
    }
  }
  return result;
}

let currentConfig = deepMerge(DEFAULT_CONFIG, {});
const listeners = new Set();

export function loadConfig() {
  try {
    const raw = getHostWindow().localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      currentConfig = deepMerge(DEFAULT_CONFIG, parsed);
      // 平滑升级：为旧版配置自动将「极速词典」置顶，立刻提速
      if (!parsed._migratedGoogleDict) {
        for (const code of ['en', 'ja', 'fr']) {
          const chain = currentConfig.dictionaryChains?.[code];
          if (Array.isArray(chain) && !chain.includes('google-dict')) {
            currentConfig.dictionaryChains[code] = ['google-dict', ...chain];
          }
        }
        currentConfig._migratedGoogleDict = true;
        try {
          getHostWindow().localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConfig));
        } catch {
          // ignore
        }
      }
    } else {
      currentConfig = deepMerge(DEFAULT_CONFIG, {});
      currentConfig._migratedGoogleDict = true;
    }
  } catch (err) {
    console.warn('[TavernLanguage] 读取配置失败，使用默认配置:', err);
    currentConfig = deepMerge(DEFAULT_CONFIG, {});
  }
  return currentConfig;
}

export function getConfig() {
  return currentConfig;
}

export function updateConfig(patch) {
  currentConfig = deepMerge(currentConfig, patch);
  try {
    getHostWindow().localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConfig));
  } catch (err) {
    console.warn('[TavernLanguage] 保存配置失败:', err);
  }
  listeners.forEach((fn) => {
    try {
      fn(currentConfig);
    } catch (e) {
      console.error('[TavernLanguage] 配置监听回调异常:', e);
    }
  });
  return currentConfig;
}

export function onConfigChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * 解析用户输入的排除标签/选择器（支持逗号、分号、换行分隔）
 */
export function parseExcludeList(input) {
  if (Array.isArray(input)) {
    return input.map((s) => String(s).trim()).filter(Boolean);
  }
  return String(input || '')
    .split(/[\n,;，；]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getEffectiveExcludeSelectors(cfg = currentConfig) {
  const userList = parseExcludeList(cfg.excludeSelectors);
  return [...new Set([...SYSTEM_EXCLUDE_SELECTORS, ...userList])];
}
