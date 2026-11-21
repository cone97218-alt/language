import { defineComponent, reactive, computed, watch } from 'vue';
import { appState, closeModal, syncConfigToState } from './appState.js';
import { VocabBookView } from './VocabBookView.js';
import { notify } from '../../core/host.js';
import { getConfig, updateConfig, parseExcludeList, VERSION } from '../../config.js';
import { listLanguages, getLanguage } from '../../languages/registry.js';
import { getDefaultPromptText, getEffectivePromptText } from '../../core/promptInjector.js';
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
      promptInjection: { enabled: true, level: 'B1', promptText: '', depth: 0 },
      dictionaryChains: {},
      autoTranslateDict: true,
      autoSpeakWord: false,
      translator: 'google',
      customAi: { baseUrl: '', apiKey: '', model: '' },
      tts: { engine: 'auto', rate: 1, enAccent: 'us' },
      ui: { showWordUnderline: true, autoShowMesButtons: true, autoTranslateNewMessage: false },
      excludeText: '',
    });

    function loadDraftFromConfig() {
      const cfg = JSON.parse(JSON.stringify(getConfig()));
      Object.assign(draft, cfg);
      draft.promptInjection.promptText = getEffectivePromptText(cfg);
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
      draft.promptInjection.promptText = getDefaultPromptText(
        draft.targetLang,
        draft.promptInjection.level
      );
    }

    function onLevelChange() {
      draft.promptInjection.promptText = getDefaultPromptText(
        draft.targetLang,
        draft.promptInjection.level
      );
    }

    function onResetPrompt() {
      draft.promptInjection.promptText = getDefaultPromptText(
        draft.targetLang,
        draft.promptInjection.level
      );
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
      notify('缓存已清理', 'success');
    }

    function onSave() {
      const patch = JSON.parse(JSON.stringify(draft));
      patch.excludeSelectors = parseExcludeList(draft.excludeText);
      patch.tts.rate = Number(draft.tts.rate) || 1.0;
      delete patch.excludeText;
      updateConfig(patch);
      syncConfigToState();
      closeModal();
      notify('设置已保存', 'success');
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
      onLevelChange,
      onResetPrompt,
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
            <span>外语学习</span>
            <span class="tl-modal-version">v{{ VERSION }}</span>
          </div>
          <button type="button" class="tl-icon-btn" @click="closeModal" title="关闭">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="tl-tabs">
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'vocab' }" @click="modal.activeTab = 'vocab'">生词本</button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'general' }" @click="modal.activeTab = 'general'">基础</button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'dict' }" @click="modal.activeTab = 'dict'">词典</button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'exclude' }" @click="modal.activeTab = 'exclude'">排除</button>
        </div>

        <div class="tl-modal-body">
          <!-- Tab 0: 生词本 -->
          <VocabBookView v-if="modal.activeTab === 'vocab'" />

          <!-- Tab 1: 基础 -->
          <div v-else-if="modal.activeTab === 'general'">
            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">启用插件</span>
              <input type="checkbox" v-model="draft.enabled" />
            </div>

            <div class="tl-field">
              <label class="tl-label">学习语种</label>
              <select class="tl-select" v-model="draft.targetLang" @change="onLangChange">
                <option v-for="l in languages" :key="l.code" :value="l.code">{{ l.name }}</option>
              </select>
            </div>

            <div class="tl-field">
              <label class="tl-label">界面主题</label>
              <select class="tl-select" v-model="draft.theme">
                <option value="tavern">跟随酒馆</option>
                <option value="light">日间</option>
                <option value="dark">夜间</option>
              </select>
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">自动注入外语提示词</span>
              <input type="checkbox" v-model="draft.promptInjection.enabled" />
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.45 }">
              <label class="tl-label">语言难度</label>
              <select class="tl-select" v-model="draft.promptInjection.level" @change="onLevelChange">
                <option v-for="lv in currentLevels" :key="lv.id" :value="lv.id">{{ lv.label }}</option>
              </select>
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.45 }">
              <div class="tl-label-row">
                <label class="tl-label" style="margin:0;">注入提示词内容</label>
                <button type="button" class="tl-icon-btn" @click="onResetPrompt" title="恢复默认提示词">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
              </div>
              <textarea
                class="tl-textarea tl-prompt-textarea"
                v-model="draft.promptInjection.promptText"
                placeholder="输入要注入给 AI 的外语回复提示词"
              ></textarea>
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">输出后自动逐段双语翻译</span>
              <input type="checkbox" v-model="draft.ui.autoTranslateNewMessage" />
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">悬停下划线</span>
              <input type="checkbox" v-model="draft.ui.showWordUnderline" />
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">消息底部翻译与朗读</span>
              <input type="checkbox" v-model="draft.ui.autoShowMesButtons" />
            </div>
          </div>

          <!-- Tab 2: 词典与翻译 -->
          <div v-else-if="modal.activeTab === 'dict'">
            <div class="tl-field">
              <label class="tl-label">词典优先级</label>
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
              <span class="tl-label" style="margin:0;">释义自动补全中文</span>
              <input type="checkbox" v-model="draft.autoTranslateDict" />
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">点词自动发音</span>
              <input type="checkbox" v-model="draft.autoSpeakWord" />
            </div>

            <div class="tl-field">
              <label class="tl-label">翻译引擎</label>
              <select class="tl-select" v-model="draft.translator">
                <option v-for="t in translators" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </div>

            <div class="tl-field">
              <label class="tl-label">自定义 AI 接口</label>
              <input type="text" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.baseUrl" placeholder="Base URL" />
              <input type="password" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.apiKey" placeholder="API Key" />
              <input type="text" class="tl-input" v-model="draft.customAi.model" placeholder="模型名称" />
            </div>

            <div class="tl-field">
              <label class="tl-label">朗读设置</label>
              <div class="tl-tts-grid">
                <select class="tl-select" v-model="draft.tts.engine">
                  <option value="auto">自动</option>
                  <option value="webspeech">浏览器语音</option>
                  <option value="youdao">有道语音</option>
                </select>
                <select class="tl-select" v-model="draft.tts.enAccent">
                  <option value="us">美式英语</option>
                  <option value="uk">英式英语</option>
                </select>
                <select class="tl-select" v-model.number="draft.tts.rate">
                  <option :value="0.7">0.7x</option>
                  <option :value="0.85">0.85x</option>
                  <option :value="1">1.0x</option>
                  <option :value="1.2">1.2x</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Tab 3: 排除标签 -->
          <div v-else>
            <div class="tl-field">
              <label class="tl-label">排除标签与选择器</label>
              <textarea
                class="tl-textarea"
                v-model="draft.excludeText"
                placeholder="逗号或换行分隔，如 code, pre, details, .status-bar"
              ></textarea>
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
          </div>
        </div>

        <div v-if="modal.activeTab !== 'vocab'" class="tl-modal-footer">
          <button type="button" class="tl-icon-btn" @click="onClearCache" title="清理缓存">
            <i class="fa-solid fa-broom"></i>
          </button>
          <div style="flex:1;"></div>
          <button type="button" class="tl-btn" @click="closeModal">取消</button>
          <button type="button" class="tl-btn tl-btn-primary" @click="onSave">保存</button>
        </div>
      </div>
    </div>
  `,
});
