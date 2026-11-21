import { getHostDocument } from '../core/host.js';
import { openModal } from './vue/appState.js';

const ENTRY_SETTINGS_ID = 'tl-option-language-settings';
const ENTRY_VOCAB_ID = 'tl-option-vocab-book';
let mountRetryTimer = null;

function closeOptionsMenu(doc) {
  const optionsEl = doc.getElementById('options');
  if (optionsEl) {
    optionsEl.style.display = 'none';
  }
}

function createMenuItem(doc, id, iconClass, label, targetTab) {
  const item = doc.createElement('a');
  item.id = id;
  item.className = 'tl-ignore';
  item.innerHTML = `<i class="fa-lg fa-solid ${iconClass}"></i><span>${label}</span>`;
  item.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeOptionsMenu(doc);
    openModal(targetTab);
  });
  return item;
}

/**
 * 精准注入到 SillyTavern 原生汉堡菜单容器：#options .options-content
 */
function tryMount() {
  const doc = getHostDocument();
  // 清理任何旧版残留入口
  doc.getElementById('tl-settings-entry')?.remove();
  doc.getElementById('tl-options-entry')?.remove();

  const optionsContent =
    doc.querySelector('#options .options-content') ||
    doc.getElementById('options_content') ||
    doc.getElementById('options');

  if (!optionsContent) return false;

  if (!doc.getElementById(ENTRY_VOCAB_ID)) {
    optionsContent.appendChild(
      createMenuItem(doc, ENTRY_VOCAB_ID, 'fa-star', '我的生词本', 'vocab')
    );
  }
  if (!doc.getElementById(ENTRY_SETTINGS_ID)) {
    optionsContent.appendChild(
      createMenuItem(doc, ENTRY_SETTINGS_ID, 'fa-language', '外语学习设置', 'general')
    );
  }
  return true;
}

export function mountHamburgerEntries() {
  unmountHamburgerEntries();
  if (tryMount()) return;

  let attempts = 0;
  mountRetryTimer = setInterval(() => {
    attempts++;
    if (tryMount() || attempts >= 20) {
      clearInterval(mountRetryTimer);
      mountRetryTimer = null;
    }
  }, 500);
}

export function unmountHamburgerEntries() {
  if (mountRetryTimer) {
    clearInterval(mountRetryTimer);
    mountRetryTimer = null;
  }
  const doc = getHostDocument();
  doc.getElementById(ENTRY_SETTINGS_ID)?.remove();
  doc.getElementById(ENTRY_VOCAB_ID)?.remove();
  doc.getElementById('tl-settings-entry')?.remove();
  doc.getElementById('tl-options-entry')?.remove();
}
