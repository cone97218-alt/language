import { defineComponent, reactive, computed, watch } from 'vue';
import { appState, closeModal, syncConfigToState } from './appState.js';
import { VocabBookView } from './VocabBookView.js';
import { notify } from '../../core/host.js';
import { getConfig, updateConfig, parseExcludeList, VERSION } from '../../config.js';
import { listLanguages, getLanguage } from '../../languages/registry.js';
import {
  listDictionaries,
  getDictionaryChainForLang,
  clearDictionaryCache,
} from '../../dictionaries/registry.js';
import { listTranslators, clearTranslationCache } from '../../translators/registry.js';

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

export const SettingsModal = defineComponent({
  name: 'SettingsModal',
  components: { VocabBookView },
  setup() {
    const modal = appState.modal;
    const draft = reactive({
      enabled: true,
      targetLang: 'en',
      theme: 'tavern',
      promptInjection: { enabled: true, level: 'B1', customInstruction: '', depth: 0 },
      dictionaryChains: {},
      autoTranslateDict: true,
      autoSpeakWord: false,
      translator: 'google',
      customAi: { baseUrl: '', apiKey: '', model: '' },
      tts: { engine: 'auto', rate: 1, enAccent: 'us' },
      ui: { showWordUnderline: true, autoShowMesButtons: true },
      excludeText: '',
    });

    function loadDraftFromConfig() {
      const cfg = JSON.parse(JSON.stringify(getConfig()));
      Object.assign(draft, cfg);
      draft.excludeText = parseExcludeList(cfg.excludeSelectors).join(', ');
    }

    watch(
      () => modal.visible,
      (visible) => {
        if (visible) loadDraftFromConfig();
      },
      { immediate: true }
    );

    const languages = computed(() => listLanguages());
    const translators = computed(() => listTranslators());
    const currentLangDef = computed(() => getLanguage(draft.targetLang));
    const currentLevels = computed(() => currentLangDef.value?.levels || []);

    const currentDictChain = computed(() => {
      const code = draft.targetLang;
      const configured = draft.dictionaryChains?.[code];
      return Array.isArray(configured) && configured.length > 0
        ? configured
        : getDictionaryChainForLang(code);
    });

    const orderedDictionaries = computed(() => {
      const avail = listDictionaries(draft.targetLang);
      const chain = currentDictChain.value;
      return [
        ...chain.map((id) => avail.find((d) => d.id === id)).filter(Boolean),
        ...avail.filter((d) => !chain.includes(d.id)),
      ];
    });

    function onLangChange() {
      const levels = currentLevels.value;
      if (levels.length && !levels.some((l) => l.id === draft.promptInjection.level)) {
        draft.promptInjection.level = levels[1]?.id || levels[0].id;
      }
    }

    function isDictEnabled(id) {
      return currentDictChain.value.includes(id);
    }

    function toggleDict(id, checked) {
      const code = draft.targetLang;
      const chain = [...currentDictChain.value];
      if (checked && !chain.includes(id)) chain.push(id);
      else if (!checked) {
        const idx = chain.indexOf(id);
        if (idx >= 0) chain.splice(idx, 1);
      }
      draft.dictionaryChains = { ...draft.dictionaryChains, [code]: chain };
    }

    function moveDict(id, dir) {
      const code = draft.targetLang;
      const chain = [...currentDictChain.value];
      const idx = chain.indexOf(id);
      const next = idx + dir;
      if (idx >= 0 && next >= 0 && next < chain.length) {
        [chain[idx], chain[next]] = [chain[next], chain[idx]];
        draft.dictionaryChains = { ...draft.dictionaryChains, [code]: chain };
      }
    }

    function addExcludeChip(chip) {
      const list = parseExcludeList(draft.excludeText);
      if (!list.includes(chip)) {
        list.push(chip);
        draft.excludeText = list.join(', ');
      }
    }

    function onClearCache() {
      clearDictionaryCache();
      clearTranslationCache();
      notify('已清理词典与翻译缓存', 'success');
    }

    function onSave() {
      const patch = JSON.parse(JSON.stringify(draft));
      patch.excludeSelectors = parseExcludeList(draft.excludeText);
      patch.tts.rate = Number(draft.tts.rate) || 1.0;
      delete patch.excludeText;
      updateConfig(patch);
      syncConfigToState();
      closeModal();
      notify('外语学习设置已生效', 'success');
    }

    return {
      VERSION,
      QUICK_EXCLUDE_CHIPS,
      modal,
      draft,
      languages,
      translators,
      currentLangDef,
      currentLevels,
      orderedDictionaries,
      closeModal,
      onLangChange,
      isDictEnabled,
      toggleDict,
      moveDict,
      addExcludeChip,
      onClearCache,
      onSave,
    };
  },
  template: `
    <div v-if="modal.visible" class="tl-modal-backdrop tl-ignore" @click.self="closeModal">
      <div class="tl-modal">
        <div class="tl-modal-header">
          <div class="tl-modal-title">
            <i class="fa-solid fa-language"></i>
            <span>酒馆外语学习</span>
            <span class="tl-modal-version">v{{ VERSION }}</span>
          </div>
          <button type="button" class="tl-icon-btn" @click="closeModal" title="关闭">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="tl-tabs">
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'vocab' }" @click="modal.activeTab = 'vocab'">
            <i class="fa-solid fa-star"></i><span>生词本</span>
          </button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'general' }" @click="modal.activeTab = 'general'">
            <i class="fa-solid fa-sliders"></i><span>基础</span>
          </button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'dict' }" @click="modal.activeTab = 'dict'">
            <i class="fa-solid fa-book-open"></i><span>词典</span>
          </button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'exclude' }" @click="modal.activeTab = 'exclude'">
            <i class="fa-solid fa-filter"></i><span>排除</span>
          </button>
        </div>

        <div class="tl-modal-body">
          <!-- Tab 0: 生词本 -->
          <VocabBookView v-if="modal.activeTab === 'vocab'" />

          <!-- Tab 1: 基础与主题 -->
          <div v-else-if="modal.activeTab === 'general'">
            <div class="tl-field-row">
              <div>
                <div class="tl-label" style="margin:0;">启用外语学习增强</div>
                <div class="tl-hint">关闭后自动还原酒馆原生消息 DOM，不留残留</div>
              </div>
              <input type="checkbox" v-model="draft.enabled" />
            </div>

            <div class="tl-field">
              <label class="tl-label">目标学习语种</label>
              <select class="tl-select" v-model="draft.targetLang" @change="onLangChange">
                <option v-for="l in languages" :key="l.code" :value="l.code">
                  {{ l.name }} ({{ l.nativeName }})
                </option>
              </select>
            </div>

            <div class="tl-field-row">
              <div>
                <div class="tl-label" style="margin:0;">API 直出外语模式（自动注入提示词）</div>
                <div class="tl-hint">动态注入系统指令，让 AI 直接输出地道目标外语；关闭即失效，不污染角色卡</div>
              </div>
              <input type="checkbox" v-model="draft.promptInjection.enabled" />
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.55 }">
              <label class="tl-label">输出难度等级</label>
              <select class="tl-select" v-model="draft.promptInjection.level">
                <option v-for="lv in currentLevels" :key="lv.id" :value="lv.id">{{ lv.label }}</option>
              </select>
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.55 }">
              <label class="tl-label">额外语言要求（可选）</label>
              <input
                type="text"
                class="tl-input"
                v-model="draft.promptInjection.customInstruction"
                placeholder="例如：多使用日常口语短语，避免生僻古词"
              />
            </div>

            <div class="tl-field">
              <label class="tl-label">界面配色主题</label>
              <select class="tl-select" v-model="draft.theme">
                <option value="tavern">跟随酒馆美化主题变量（推荐）</option>
                <option value="light">纯净日间模式</option>
                <option value="dark">护眼夜间模式</option>
              </select>
              <div class="tl-hint">「跟随酒馆」自动引用 --SmartThemeBodyColor / --SmartThemeBlurTintColor 等美化变量</div>
            </div>

            <div class="tl-field-row">
              <div><div class="tl-label" style="margin:0;">悬停单词显示轻柔下划线</div></div>
              <input type="checkbox" v-model="draft.ui.showWordUnderline" />
            </div>

            <div class="tl-field-row">
              <div><div class="tl-label" style="margin:0;">在消息底部显示「双语译文 / 朗读」轻胶囊</div></div>
              <input type="checkbox" v-model="draft.ui.autoShowMesButtons" />
            </div>
          </div>

          <!-- Tab 2: 词典与翻译 -->
          <div v-else-if="modal.activeTab === 'dict'">
            <div class="tl-field">
              <label class="tl-label">可组装词典链（当前：{{ currentLangDef?.name || draft.targetLang }}）</label>
              <div class="tl-hint" style="margin-bottom:8px;">勾选启用词典并调整优先级，查词时按顺序自动匹配与兜底</div>
              <div class="tl-dict-list">
                <div v-for="(d, idx) in orderedDictionaries" :key="d.id" class="tl-dict-row">
                  <input
                    type="checkbox"
                    :checked="isDictEnabled(d.id)"
                    @change="toggleDict(d.id, $event.target.checked)"
                  />
                  <div class="tl-dict-row-info">
                    <div class="tl-dict-row-name">{{ d.name }}</div>
                    <div class="tl-dict-row-desc">{{ d.description }}</div>
                  </div>
                  <div v-if="isDictEnabled(d.id)" class="tl-dict-row-actions">
                    <button type="button" class="tl-icon-btn" :disabled="idx === 0" @click="moveDict(d.id, -1)" title="上移">
                      <i class="fa-solid fa-chevron-up"></i>
                    </button>
                    <button type="button" class="tl-icon-btn" @click="moveDict(d.id, 1)" title="下移">
                      <i class="fa-solid fa-chevron-down"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="tl-field-row">
              <div>
                <div class="tl-label" style="margin:0;">查词自动补全中文释义</div>
                <div class="tl-hint">将英英 / 日英词典释义自动附带简明中文</div>
              </div>
              <input type="checkbox" v-model="draft.autoTranslateDict" />
            </div>

            <div class="tl-field-row">
              <div><div class="tl-label" style="margin:0;">点按单词时自动朗读发音</div></div>
              <input type="checkbox" v-model="draft.autoSpeakWord" />
            </div>

            <div class="tl-field">
              <label class="tl-label">整句 / 整段中文翻译引擎</label>
              <select class="tl-select" v-model="draft.translator">
                <option v-for="t in translators" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
              <div class="tl-hint">想要媲美人工的中文对照，推荐选择「酒馆当前 API」或配置低成本「自定义 AI 模型」</div>
            </div>

            <div class="tl-field">
              <label class="tl-label">自定义 AI 接口（用于高质量翻译 & AI 语境词典）</label>
              <input type="text" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.baseUrl" placeholder="Base URL，如 https://api.openai.com/v1" />
              <input type="password" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.apiKey" placeholder="API Key（仅保存在本地浏览器）" />
              <input type="text" class="tl-input" v-model="draft.customAi.model" placeholder="模型名称，如 gpt-4o-mini / deepseek-chat" />
            </div>

            <div class="tl-field">
              <label class="tl-label">朗读与发音设置</label>
              <div class="tl-tts-grid">
                <select class="tl-select" v-model="draft.tts.engine">
                  <option value="auto">自动（推荐）</option>
                  <option value="webspeech">浏览器语音</option>
                  <option value="youdao">有道在线语音</option>
                </select>
                <select class="tl-select" v-model="draft.tts.enAccent">
                  <option value="us">美式英语</option>
                  <option value="uk">英式英语</option>
                </select>
                <select class="tl-select" v-model.number="draft.tts.rate">
                  <option :value="0.7">0.7x 慢速</option>
                  <option :value="0.85">0.85x 稍慢</option>
                  <option :value="1">1.0x 正常</option>
                  <option :value="1.2">1.2x 较快</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Tab 3: 安全分词排除 -->
          <div v-else>
            <div class="tl-field">
              <label class="tl-label">安全分词排除名单（标签名或 CSS 选择器）</label>
              <textarea
                class="tl-textarea"
                v-model="draft.excludeText"
                placeholder="用逗号或换行分隔，例如：code, pre, details, .status-bar, thinking"
              ></textarea>
              <div class="tl-hint">写在名单里的 HTML 标签、自定义标签或 CSS 选择器内部不会被分词，也不会被整段翻译破坏排版。</div>
              <div class="tl-chips">
                <button
                  v-for="chip in QUICK_EXCLUDE_CHIPS"
                  :key="chip"
                  type="button"
                  class="tl-chip"
                  @click="addExcludeChip(chip)"
                >
                  <i class="fa-solid fa-plus"></i><span>{{ chip }}</span>
                </button>
              </div>
            </div>
            <div class="tl-hint">
              系统内置始终保护：<code>script, style, iframe, svg, canvas, audio, video</code> 等非正文元素。<br/>
              保存后会自动安全还原并按新名单重新处理当前所有消息。
            </div>
          </div>
        </div>

        <div v-if="modal.activeTab !== 'vocab'" class="tl-modal-footer">
          <button type="button" class="tl-btn" @click="onClearCache">
            <i class="fa-solid fa-broom"></i><span>清缓存</span>
          </button>
          <button type="button" class="tl-btn" @click="closeModal">取消</button>
          <button type="button" class="tl-btn tl-btn-primary" @click="onSave">保存并应用</button>
        </div>
      </div>
    </div>
  `,
});
