// SillyTavern & JS-Slash-Runner (酒馆助手) 宿主环境适配层
// 兼容 iframe 沙箱脚本与主页面直接注入两种运行方式

export function getHostWindow() {
  try {
    if (window.parent && window.parent !== window && window.parent.document) {
      return window.parent;
    }
  } catch {
    // 跨域降级到当前 window
  }
  return window;
}

export function getHostDocument() {
  return getHostWindow().document;
}

export function getTavernHelper() {
  const host = getHostWindow();
  return window.TavernHelper || host.TavernHelper || null;
}

export function getEventApi() {
  const host = getHostWindow();
  return {
    eventOn: window.eventOn || host.eventOn || null,
    eventRemoveListener: window.eventRemoveListener || host.eventRemoveListener || null,
    tavern_events: window.tavern_events || host.tavern_events || null,
    iframe_events: window.iframe_events || host.iframe_events || null,
  };
}

export function notify(message, type = 'info') {
  const host = getHostWindow();
  const toast = window.toastr || host.toastr;
  if (toast && typeof toast[type] === 'function') {
    toast[type](message, '酒馆外语学习');
  } else {
    console.log(`[TavernLanguage][${type}] ${message}`);
  }
}

export function getSillyTavernContext() {
  const host = getHostWindow();
  try {
    if (typeof host.SillyTavern?.getContext === 'function') {
      return host.SillyTavern.getContext();
    }
  } catch {
    // ignore
  }
  return null;
}
