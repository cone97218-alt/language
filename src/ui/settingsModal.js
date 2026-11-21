import { getHostDocument, notify } from '../core/host.js';
import { getConfig, updateConfig, parseExcludeList, VERSION } from '../config.js';
import { listLanguages, getLanguage } from '../languages/registry.js';
import { listDictionaries, getDictionaryChainForLang, clearDictionaryCache } from '../dictionaries/registry.js';
import { listTranslators, clearTranslationCache } from '../translators/registry.js';

let entryEl = null;
let modalBackdrop = null;
let activeTab = 'general';

const QUICK_EXCLUDE_CHIPS = [
  'details',
  'blockquote',
  'table',
  'thinking',
  'status',
  '.status-bar',
  'em',
  'strong',
];

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function closeSettingsModal() {
  if (modalBackdrop) {
    modalBackdrop.remove();
    modalBackdrop = null;
  }
}

function renderGeneralTab(draft) {
  const langs = listLanguages();
  const currentLangDef = getLanguage(draft.targetLang);
  const levels = currentLangDef?.levels || [];

  return `
    <div class="tl-field-row">
      <div>
        <div class="tl-label" style="margin:0;">启用外语学习增强</div>
        <div class="tl-hint">关闭后将自动还原酒馆原生消息 DOM，不留残留</div>
      </div>
      <input type="checkbox" data-tl-bind="enabled" ${draft.enabled ? 'checked' : ''} />
    </div>

    <div class="tl-field">
      <label class="tl-label">目标学习语种</label>
      <select class="tl-select" data-tl-bind="targetLang">
        ${langs
          .map(
            (l) =>
              `<option value="${escapeHtml(l.code)}" ${l.code === draft.targetLang ? 'selected' : ''}>${escapeHtml(l.name)} (${escapeHtml(l.nativeName)})</option>`
          )
          .join('')}
      </select>
    </div>

    <div class="tl-field-row">
      <div>
        <div class="tl-label" style="margin:0;">API 直出外语模式（自动注入提示词）</div>
        <div class="tl-hint">通过酒馆助手动态注入系统指令，让 AI 直接输出地道目标外语；关闭立即失效，不污染角色卡</div>
      </div>
      <input type="checkbox" data-tl-bind="promptInjection.enabled" ${draft.promptInjection.enabled ? 'checked' : ''} />
    </div>

    <div class="tl-field" style="${draft.promptInjection.enabled ? '' : 'opacity:0.55;'}">
      <label class="tl-label">输出难度等级</label>
      <select class="tl-select" data-tl-bind="promptInjection.level">
        ${levels
          .map(
            (lv) =>
              `<option value="${escapeHtml(lv.id)}" ${lv.id === draft.promptInjection.level ? 'selected' : ''}>${escapeHtml(lv.label)}</option>`
          )
          .join('')}
      </select>
    </div>

    <div class="tl-field" style="${draft.promptInjection.enabled ? '' : 'opacity:0.55;'}">
      <label class="tl-label">额外语言要求（可选）</label>
      <input type="text" class="tl-input" data-tl-bind="promptInjection.customInstruction"
        value="${escapeHtml(draft.promptInjection.customInstruction)}"
        placeholder="例如：多使用日常口语短语，避免过于生僻的古词" />
    </div>

    <div class="tl-field">
      <label class="tl-label">界面配色主题</label>
      <select class="tl-select" data-tl-bind="theme">
        <option value="tavern" ${draft.theme === 'tavern' ? 'selected' : ''}>跟随酒馆美化主题变量（推荐）</option>
        <option value="light" ${draft.theme === 'light' ? 'selected' : ''}>纯净日间模式</option>
        <option value="dark" ${draft.theme === 'dark' ? 'selected' : ''}>护眼夜间模式</option>
      </select>
      <div class="tl-hint">「跟随酒馆」自动读取 --SmartThemeBodyColor / --SmartThemeBlurTintColor 等美化变量</div>
    </div>

    <div class="tl-field-row">
      <div>
        <div class="tl-label" style="margin:0;">鼠标悬停单词显示轻柔下划线</div>
      </div>
      <input type="checkbox" data-tl-bind="ui.showWordUnderline" ${draft.ui.showWordUnderline ? 'checked' : ''} />
    </div>

    <div class="tl-field-row">
      <div>
        <div class="tl-label" style="margin:0;">在原生消息栏显示「译」「🔊」按钮</div>
      </div>
      <input type="checkbox" data-tl-bind="ui.autoShowMesButtons" ${draft.ui.autoShowMesButtons ? 'checked' : ''} />
    </div>
  `;
}

function renderDictTab(draft) {
  const langCode = draft.targetLang;
  const availableDicts = listDictionaries(langCode);
  const currentChain =
    Array.isArray(draft.dictionaryChains?.[langCode]) && draft.dictionaryChains[langCode].length > 0
      ? draft.dictionaryChains[langCode]
      : getDictionaryChainForLang(langCode);

  // 按已启用顺序 + 未启用顺序排列
  const orderedDicts = [
    ...currentChain.map((id) => availableDicts.find((d) => d.id === id)).filter(Boolean),
    ...availableDicts.filter((d) => !currentChain.includes(d.id)),
  ];

  const translators = listTranslators();

  return `
    <div class="tl-field">
      <label class="tl-label">可组装词典链（当前语种：${escapeHtml(getLanguage(langCode)?.name || langCode)}）</label>
      <div class="tl-hint" style="margin-bottom:8px;">勾选启用词典并调整优先级，查词时按顺序自动匹配与兜底</div>
      <div class="tl-dict-list">
        ${orderedDicts
          .map((d, idx) => {
            const enabled = currentChain.includes(d.id);
            return `
              <div class="tl-dict-row">
                <input type="checkbox" data-tl-dict-toggle="${escapeHtml(d.id)}" ${enabled ? 'checked' : ''} />
                <div class="tl-dict-row-info">
                  <div class="tl-dict-row-name">${escapeHtml(d.name)}</div>
                  <div class="tl-dict-row-desc">${escapeHtml(d.description || '')}</div>
                </div>
                ${
                  enabled
                    ? `<button type="button" class="tl-icon-btn" data-tl-dict-move="${escapeHtml(d.id)}" data-dir="-1" ${idx === 0 ? 'disabled' : ''}>↑</button>
                       <button type="button" class="tl-icon-btn" data-tl-dict-move="${escapeHtml(d.id)}" data-dir="1">↓</button>`
                    : ''
                }
              </div>
            `;
          })
          .join('')}
      </div>
    </div>

    <div class="tl-field-row">
      <div>
        <div class="tl-label" style="margin:0;">查词自动补全中文释义</div>
        <div class="tl-hint">将英英 / 日英词典释义自动附带简明中文</div>
      </div>
      <input type="checkbox" data-tl-bind="autoTranslateDict" ${draft.autoTranslateDict ? 'checked' : ''} />
    </div>

    <div class="tl-field-row">
      <div>
        <div class="tl-label" style="margin:0;">点按单词时自动朗读发音</div>
      </div>
      <input type="checkbox" data-tl-bind="autoSpeakWord" ${draft.autoSpeakWord ? 'checked' : ''} />
    </div>

    <div class="tl-field">
      <label class="tl-label">整句 / 整段中文翻译引擎</label>
      <select class="tl-select" data-tl-bind="translator">
        ${translators
          .map(
            (t) =>
              `<option value="${escapeHtml(t.id)}" ${t.id === draft.translator ? 'selected' : ''}>${escapeHtml(t.name)}</option>`
          )
          .join('')}
      </select>
      <div class="tl-hint">想要媲美人工的中文对照，推荐选择「酒馆当前 API」或配置低成本「自定义 AI 模型」</div>
    </div>

    <div class="tl-field" style="${draft.translator === 'custom-ai' ? '' : 'opacity:0.85;'}">
      <label class="tl-label">自定义 AI 接口（用于高质量翻译 & AI 语境词典）</label>
      <input type="text" class="tl-input" style="margin-bottom:6px;" data-tl-bind="customAi.baseUrl"
        value="${escapeHtml(draft.customAi.baseUrl)}" placeholder="Base URL，如 https://api.openai.com/v1" />
      <input type="password" class="tl-input" style="margin-bottom:6px;" data-tl-bind="customAi.apiKey"
        value="${escapeHtml(draft.customAi.apiKey)}" placeholder="API Key（仅保存在本地浏览器 localStorage）" />
      <input type="text" class="tl-input" data-tl-bind="customAi.model"
        value="${escapeHtml(draft.customAi.model)}" placeholder="模型名称，如 gpt-4o-mini / deepseek-chat" />
    </div>

    <div class="tl-field">
      <label class="tl-label">朗读与发音设置</label>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
        <select class="tl-select" data-tl-bind="tts.engine">
          <option value="auto" ${draft.tts.engine === 'auto' ? 'selected' : ''}>自动（推荐）</option>
          <option value="webspeech" ${draft.tts.engine === 'webspeech' ? 'selected' : ''}>浏览器语音</option>
          <option value="youdao" ${draft.tts.engine === 'youdao' ? 'selected' : ''}>有道在线语音</option>
        </select>
        <select class="tl-select" data-tl-bind="tts.enAccent">
          <option value="us" ${draft.tts.enAccent === 'us' ? 'selected' : ''}>美式英语</option>
          <option value="uk" ${draft.tts.enAccent === 'uk' ? 'selected' : ''}>英式英语</option>
        </select>
        <select class="tl-select" data-tl-bind="tts.rate">
          <option value="0.7" ${Number(draft.tts.rate) === 0.7 ? 'selected' : ''}>0.7x 慢速</option>
          <option value="0.85" ${Number(draft.tts.rate) === 0.85 ? 'selected' : ''}>0.85x 稍慢</option>
          <option value="1" ${Number(draft.tts.rate) === 1 ? 'selected' : ''}>1.0x 正常</option>
          <option value="1.2" ${Number(draft.tts.rate) === 1.2 ? 'selected' : ''}>1.2x 较快</option>
        </select>
      </div>
    </div>
  `;
}

function renderExcludeTab(draft) {
  const listStr = parseExcludeList(draft.excludeSelectors).join(', ');
  return `
    <div class="tl-field">
      <label class="tl-label">安全分词排除名单（标签名或 CSS 选择器）</label>
      <textarea class="tl-textarea" data-tl-bind="excludeText" placeholder="用逗号或换行分隔，例如：code, pre, details, .status-bar, thinking">${escapeHtml(listStr)}</textarea>
      <div class="tl-hint">写在名单里的 HTML 标签、自定义标签或 CSS 选择器内部不会被分词，也不会被整段翻译破坏排版。</div>
      <div class="tl-chips">
        ${QUICK_EXCLUDE_CHIPS.map(
          (chip) => `<button type="button" class="tl-chip" data-tl-add-chip="${escapeHtml(chip)}">+ ${escapeHtml(chip)}</button>`
        ).join('')}
      </div>
    </div>

    <div class="tl-field">
      <div class="tl-hint">
        系统内置始终保护：<code>script, style, iframe, svg, canvas, audio, video</code> 等非正文元素。<br/>
        修改并保存后，插件会自动安全还原并按新名单重新处理当前所有消息。
      </div>
    </div>
  `;
}

function setByPath(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

export function openSettingsModal() {
  closeSettingsModal();
  const doc = getHostDocument();
  const draft = JSON.parse(JSON.stringify(getConfig()));
  draft.excludeText = parseExcludeList(draft.excludeSelectors).join(', ');

  modalBackdrop = doc.createElement('div');
  modalBackdrop.className = 'tl-modal-backdrop tl-ignore';
  doc.body.appendChild(modalBackdrop);

  function render() {
    if (!modalBackdrop) return;
    let bodyHtml = '';
    if (activeTab === 'general') bodyHtml = renderGeneralTab(draft);
    else if (activeTab === 'dict') bodyHtml = renderDictTab(draft);
    else bodyHtml = renderExcludeTab(draft);

    modalBackdrop.innerHTML = `
      <div class="tl-modal">
        <div class="tl-modal-header">
          <div class="tl-modal-title">
            <span>🌐 酒馆沉浸外语学习</span>
            <span class="tl-modal-version">v${escapeHtml(VERSION)}</span>
          </div>
          <button type="button" class="tl-icon-btn" data-tl-modal-action="close">✕</button>
        </div>
        <div class="tl-tabs">
          <button type="button" class="tl-tab ${activeTab === 'general' ? 'tl-active' : ''}" data-tl-tab="general">基础与主题</button>
          <button type="button" class="tl-tab ${activeTab === 'dict' ? 'tl-active' : ''}" data-tl-tab="dict">词典与翻译</button>
          <button type="button" class="tl-tab ${activeTab === 'exclude' ? 'tl-active' : ''}" data-tl-tab="exclude">安全分词排除</button>
        </div>
        <div class="tl-modal-body">${bodyHtml}</div>
        <div class="tl-modal-footer">
          <button type="button" class="tl-btn" data-tl-modal-action="clear-cache">清理缓存</button>
          <button type="button" class="tl-btn" data-tl-modal-action="close">取消</button>
          <button type="button" class="tl-btn tl-btn-primary" data-tl-modal-action="save">保存并应用</button>
        </div>
      </div>
    `;
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeSettingsModal();
      return;
    }

    const tabBtn = e.target.closest('[data-tl-tab]');
    if (tabBtn) {
      activeTab = tabBtn.dataset.tlTab;
      render();
      return;
    }

    const chipBtn = e.target.closest('[data-tl-add-chip]');
    if (chipBtn) {
      const chip = chipBtn.dataset.tlAddChip;
      const list = parseExcludeList(draft.excludeText);
      if (!list.includes(chip)) {
        list.push(chip);
        draft.excludeText = list.join(', ');
        draft.excludeSelectors = list;
        render();
      }
      return;
    }

    const moveBtn = e.target.closest('[data-tl-dict-move]');
    if (moveBtn) {
      const id = moveBtn.dataset.tlDictMove;
      const dir = Number(moveBtn.dataset.dir);
      const langCode = draft.targetLang;
      const chain = [...(draft.dictionaryChains?.[langCode] || getDictionaryChainForLang(langCode))];
      const idx = chain.indexOf(id);
      const nextIdx = idx + dir;
      if (idx >= 0 && nextIdx >= 0 && nextIdx < chain.length) {
        [chain[idx], chain[nextIdx]] = [chain[nextIdx], chain[idx]];
        draft.dictionaryChains = { ...draft.dictionaryChains, [langCode]: chain };
        render();
      }
      return;
    }

    const actionBtn = e.target.closest('[data-tl-modal-action]');
    if (actionBtn) {
      const action = actionBtn.dataset.tlModalAction;
      if (action === 'close') {
        closeSettingsModal();
      } else if (action === 'clear-cache') {
        clearDictionaryCache();
        clearTranslationCache();
        notify('已清理词典与翻译缓存', 'success');
      } else if (action === 'save') {
        const finalPatch = {
          ...draft,
          excludeSelectors: parseExcludeList(draft.excludeText),
          tts: {
            ...draft.tts,
            rate: Number(draft.tts.rate) || 1.0,
          },
        };
        delete finalPatch.excludeText;
        updateConfig(finalPatch);
        closeSettingsModal();
        notify('外语学习设置已生效', 'success');
      }
    }
  });

  modalBackdrop.addEventListener('change', (e) => {
    const toggleDict = e.target.closest('[data-tl-dict-toggle]');
    if (toggleDict) {
      const id = toggleDict.dataset.tlDictToggle;
      const langCode = draft.targetLang;
      const chain = [...(draft.dictionaryChains?.[langCode] || getDictionaryChainForLang(langCode))];
      if (toggleDict.checked && !chain.includes(id)) {
        chain.push(id);
      } else if (!toggleDict.checked) {
        const idx = chain.indexOf(id);
        if (idx >= 0) chain.splice(idx, 1);
      }
      draft.dictionaryChains = { ...draft.dictionaryChains, [langCode]: chain };
      render();
      return;
    }

    const bindEl = e.target.closest('[data-tl-bind]');
    if (!bindEl) return;
    const path = bindEl.dataset.tlBind;
    const val = bindEl.type === 'checkbox' ? bindEl.checked : bindEl.value;
    setByPath(draft, path, val);

    // 切换目标语种时自动适配默认难度等级
    if (path === 'targetLang') {
      const langDef = getLanguage(val);
      if (langDef?.levels?.length && !langDef.levels.some((l) => l.id === draft.promptInjection.level)) {
        draft.promptInjection.level = langDef.levels[1]?.id || langDef.levels[0].id;
      }
      render();
    } else if (path === 'promptInjection.enabled' || path === 'translator') {
      render();
    }
  });

  modalBackdrop.addEventListener('input', (e) => {
    const bindEl = e.target.closest('[data-tl-bind]');
    if (!bindEl || bindEl.type === 'checkbox' || bindEl.tagName === 'SELECT') return;
    setByPath(draft, bindEl.dataset.tlBind, bindEl.value);
  });

  render();
}

export function mountSettingsEntry() {
  unmountSettingsEntry();
  const doc = getHostDocument();
  const topHolder = doc.getElementById('top-settings-holder');

  if (topHolder) {
    entryEl = doc.createElement('div');
    entryEl.id = 'tl-settings-entry';
    entryEl.className = 'tl-top-entry tl-ignore';
    entryEl.title = '酒馆外语学习设置';
    entryEl.textContent = '🌐';
    topHolder.appendChild(entryEl);
  } else {
    entryEl = doc.createElement('button');
    entryEl.id = 'tl-settings-entry';
    entryEl.type = 'button';
    entryEl.className = 'tl-float-entry tl-ignore';
    entryEl.title = '酒馆外语学习设置';
    entryEl.textContent = '🌐';
    doc.body.appendChild(entryEl);
  }

  entryEl.addEventListener('click', (e) => {
    e.stopPropagation();
    openSettingsModal();
  });
}

export function unmountSettingsEntry() {
  closeSettingsModal();
  if (entryEl) {
    entryEl.remove();
    entryEl = null;
  }
  const stale = getHostDocument().getElementById('tl-settings-entry');
  if (stale) stale.remove();
}
