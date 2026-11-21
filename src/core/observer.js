import { getHostDocument, getEventApi } from './host.js';
import { getConfig } from '../config.js';
import { tokenizeMessageText, untokenizeElement } from './tokenizer.js';
import { attachMessageButtons } from '../ui/messageControls.js';

let chatObserver = null;
let debounceTimer = null;
let isGenerating = false;
const boundEventCleanups = [];

function getAllMessages() {
  const doc = getHostDocument();
  return [...doc.querySelectorAll('#chat .mes')];
}

export function processMessageElement(mesEl, options = {}) {
  if (!mesEl) return;
  const mesText = mesEl.querySelector('.mes_text');
  if (!mesText) return;
  tokenizeMessageText(mesText, options);
  attachMessageButtons(mesEl);
}

export function processAllMessages(options = {}) {
  const messages = getAllMessages();
  for (const mes of messages) {
    processMessageElement(mes, options);
  }
}

export function clearAllProcessedMessages() {
  const doc = getHostDocument();
  doc.querySelectorAll('#chat .mes .mes_text').forEach((el) => untokenizeElement(el));
  doc.querySelectorAll('#chat .mes .tl-trans-block').forEach((el) => el.remove());
  doc.querySelectorAll('#chat .mes .tl-mes-btn').forEach((el) => el.remove());
}

function scheduleProcess(delay = 280) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    if (isGenerating) return;
    if (!getConfig().enabled) return;
    processAllMessages();
  }, delay);
}

function safeBindEvent(eventName, handler) {
  const { eventOn, eventRemoveListener } = getEventApi();
  if (!eventOn || !eventName) return;
  try {
    const ret = eventOn(eventName, handler);
    boundEventCleanups.push(() => {
      try {
        if (ret && typeof ret.stop === 'function') {
          ret.stop();
        } else if (typeof eventRemoveListener === 'function') {
          eventRemoveListener(eventName, handler);
        }
      } catch {
        // ignore
      }
    });
  } catch {
    // ignore
  }
}

export function startObserving() {
  stopObserving();

  const doc = getHostDocument();
  const chatEl = doc.getElementById('chat');
  if (chatEl) {
    chatObserver = new MutationObserver((mutations) => {
      if (isGenerating || !getConfig().enabled) return;
      // 忽略我们自己插入的译文块和按钮触发的变动
      const hasExternalChange = mutations.some((m) => {
        const target = m.target;
        if (target?.nodeType === 1) {
          if (
            target.classList?.contains('tl-word') ||
            target.classList?.contains('tl-trans-block') ||
            target.classList?.contains('tl-mes-btn') ||
            target.closest?.('.tl-popover, .tl-sel-bar, .tl-modal-backdrop')
          ) {
            return false;
          }
        }
        return true;
      });
      if (hasExternalChange) {
        scheduleProcess(320);
      }
    });
    chatObserver.observe(chatEl, { childList: true, subtree: true });
  }

  // 监听酒馆生命周期事件，流式输出期间暂停分词，输出结束后立即分词
  const { tavern_events, iframe_events } = getEventApi();
  if (tavern_events) {
    safeBindEvent(tavern_events.GENERATION_STARTED, () => {
      isGenerating = true;
    });
    safeBindEvent(tavern_events.GENERATION_STOPPED, () => {
      isGenerating = false;
      scheduleProcess(200);
    });
    safeBindEvent(tavern_events.GENERATION_ENDED, () => {
      isGenerating = false;
      scheduleProcess(200);
    });
    safeBindEvent(tavern_events.MESSAGE_RECEIVED, () => {
      isGenerating = false;
      scheduleProcess(220);
    });
    safeBindEvent(tavern_events.MESSAGE_UPDATED, () => {
      scheduleProcess(200);
    });
    safeBindEvent(tavern_events.MESSAGE_SWIPED, () => {
      scheduleProcess(250);
    });
    safeBindEvent(tavern_events.CHAT_CHANGED, () => {
      isGenerating = false;
      scheduleProcess(350);
    });
  }
  if (iframe_events) {
    safeBindEvent(iframe_events.STREAM_TOKEN_RECEIVED_FULLY, () => {
      isGenerating = false;
      scheduleProcess(260);
    });
  }

  // 初次加载立即处理当前屏幕上的消息
  scheduleProcess(150);
}

export function stopObserving() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (chatObserver) {
    chatObserver.disconnect();
    chatObserver = null;
  }
  while (boundEventCleanups.length > 0) {
    const fn = boundEventCleanups.pop();
    fn();
  }
  isGenerating = false;
}
