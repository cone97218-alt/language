import { reactive } from 'vue';
import { getConfig, loadConfig } from '../../config.js';
import { loadVocab, getVocabState } from '../../core/vocabStore.js';

export const appState = reactive({
  config: getConfig(),
  vocab: getVocabState(),

  // 查词悬浮窗状态
  popover: {
    visible: false,
    loading: false,
    word: '',
    lang: 'en',
    contextSentence: '',
    entry: null,
    activeSourceId: '',
    sentenceTranslation: '',
    sentenceLoading: false,
    showBookPicker: false,
    // 智能避让定位样式（由 WordPopover 根据词与所在句位置动态计算）
    placement: 'below', // 'above' | 'below'
    style: {},
  },

  // 划词 / 选句悬浮条状态
  selection: {
    visible: false,
    text: '',
    lang: 'en',
    translation: '',
    loading: false,
    style: {},
  },

  // 主抽屉 / 设置与生词本弹窗状态
  modal: {
    visible: false,
    activeTab: 'vocab', // 'vocab' | 'general' | 'dict' | 'exclude'
  },
});

export function syncConfigToState() {
  appState.config = JSON.parse(JSON.stringify(getConfig()));
}

export function syncVocabToState() {
  appState.vocab = JSON.parse(JSON.stringify(getVocabState()));
}

export function initAppState() {
  loadConfig();
  loadVocab();
  syncConfigToState();
  syncVocabToState();
}

export function openModal(tab = 'general') {
  appState.modal.activeTab = tab;
  appState.modal.visible = true;
}

export function closeModal() {
  appState.modal.visible = false;
}
