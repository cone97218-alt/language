/**
 * 酒馆沉浸式外语学习插件 — 远程热更新引导器
 * 使用方法：完整复制本段代码到「酒馆助手 (JS-Slash-Runner) -> 全局脚本」并启用即可。
 * 每次打开或刷新酒馆时，会自动从 GitHub 拉取最新版本热更新，无需再次复制代码。
 */
(async () => {
  const REPO = 'cone97218-alt/language';
  const BRANCH = 'main';
  const ENTRY = 'dist/tavern-language.js';
  const ts = Date.now();

  // 优先走 jsDelivr CDN（国内速度更快），失败自动回退 GitHub Raw
  const SOURCES = [
    `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/${ENTRY}?t=${ts}`,
    `https://fastly.jsdelivr.net/gh/${REPO}@${BRANCH}/${ENTRY}?t=${ts}`,
    `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${ENTRY}?t=${ts}`,
  ];

  for (const url of SOURCES) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const code = await res.text();
      const blobUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
      try {
        const mod = await import(blobUrl);
        if (mod && typeof mod.init === 'function') {
          mod.init();
          return;
        }
      } finally {
        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      console.warn('[TavernLanguage Loader] 线路加载失败，尝试备用源:', url, err);
    }
  }

  const toast = window.toastr || window.parent?.toastr;
  if (toast) {
    toast.error('远程加载失败，请检查网络连接或稍后刷新重试', '酒馆外语学习');
  }
})();
