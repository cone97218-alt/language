/**
 * 酒馆沉浸式外语学习插件 — 实时无缓存远程热更新引导器
 * 使用方法：完整复制本段代码到「酒馆助手 (JS-Slash-Runner) -> 全局脚本」并启用即可。
 * 原理：先获取 main 分支最新 commit SHA，再用不可变 SHA 走 jsDelivr 极速拉取，彻底绕开 CDN 分支缓存！
 */
(async () => {
  const REPO = 'cone97218-alt/language';
  const BRANCH = 'main';
  const ENTRY = 'dist/tavern-language.js';

  // 1. 实时获取 main 最新 commit SHA（绕过 jsDelivr @main 长达 12 小时的边缘缓存）
  let ref = BRANCH;
  try {
    const metaRes = await fetch(`https://api.github.com/repos/${REPO}/commits/${BRANCH}`, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store',
    });
    if (metaRes.ok) {
      const meta = await metaRes.json();
      if (meta && meta.sha) ref = meta.sha;
    }
  } catch {
    // 若 GitHub API 限流或不可达，继续走备用源
  }

  const ts = Date.now();
  const SOURCES = [
    `https://cdn.jsdelivr.net/gh/${REPO}@${ref}/${ENTRY}`,
    `https://fastly.jsdelivr.net/gh/${REPO}@${ref}/${ENTRY}`,
    `https://raw.githubusercontent.com/${REPO}/${ref}/${ENTRY}?t=${ts}`,
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
