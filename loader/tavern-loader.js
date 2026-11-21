/**
 * 酒馆沉浸式外语学习插件 — 毫秒级秒开 + 后台无感热更新引导器 (SWR)
 * 原理：
 * 1. 刷新酒馆时直接从本地缓存 0ms 瞬时启动（不等网络，与本地扩展一样快）；
 * 2. 同时在后台静默比对 GitHub main 最新 commit SHA；
 * 3. 若发现新版本，多线路并行竞速下载并自动热替换，下次启动继续秒开。
 */
(async () => {
  const REPO = 'cone97218-alt/language';
  const BRANCH = 'main';
  const ENTRY = 'dist/tavern-language.js';
  const CACHE_CODE_KEY = 'tl_loader_code_v2';
  const CACHE_SHA_KEY = 'tl_loader_sha_v2';

  const hostWin = (() => {
    try {
      return window.parent && window.parent.document ? window.parent : window;
    } catch {
      return window;
    }
  })();

  async function bootFromCode(code, opts = {}) {
    const blobUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    try {
      const mod = await import(blobUrl);
      if (mod && typeof mod.init === 'function') {
        mod.init(opts);
        return true;
      }
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
    return false;
  }

  async function fetchFastestCode(ref) {
    const ts = Date.now();
    const urls = [
      `https://cdn.jsdelivr.net/gh/${REPO}@${ref}/${ENTRY}`,
      `https://fastly.jsdelivr.net/gh/${REPO}@${ref}/${ENTRY}`,
      `https://raw.githubusercontent.com/${REPO}/${ref}/${ENTRY}?t=${ts}`,
    ];
    return Promise.any(
      urls.map(async (url) => {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!text || text.length < 1000) throw new Error('empty bundle');
        return text;
      })
    );
  }

  async function fetchLatestSha() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/commits/${BRANCH}`, {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-store',
        signal: controller.signal,
      });
      if (!res.ok) return '';
      const data = await res.json();
      return data?.sha || '';
    } catch {
      return '';
    } finally {
      clearTimeout(timer);
    }
  }

  // 1. 命中本地缓存：立即 0ms 秒开，绝不阻塞等待网络
  let bootedFromCache = false;
  let cachedSha = '';
  try {
    const cachedCode = hostWin.localStorage.getItem(CACHE_CODE_KEY);
    cachedSha = hostWin.localStorage.getItem(CACHE_SHA_KEY) || '';
    if (cachedCode) {
      bootedFromCache = await bootFromCode(cachedCode);
    }
  } catch (err) {
    console.warn('[TavernLanguage Loader] 本地缓存启动失败，转远程拉取:', err);
  }

  // 2. 后台静默检查更新（或首次无缓存时拉取）
  try {
    const latestSha = await fetchLatestSha();
    if (bootedFromCache && (!latestSha || latestSha === cachedSha)) {
      return; // 已是最新版，零额外流量
    }

    const ref = latestSha || BRANCH;
    const freshCode = await fetchFastestCode(ref);
    try {
      hostWin.localStorage.setItem(CACHE_CODE_KEY, freshCode);
      if (latestSha) hostWin.localStorage.setItem(CACHE_SHA_KEY, latestSha);
    } catch {
      // 忽略存储配额限制
    }

    // 首次加载或发现新版本：立即热替换运行新版
    await bootFromCode(freshCode);
  } catch (err) {
    if (!bootedFromCache) {
      const toast = window.toastr || hostWin.toastr;
      if (toast) toast.error('远程加载失败，请检查网络后刷新重试', '外语学习');
      console.error('[TavernLanguage Loader] 首次加载失败:', err);
    }
  }
})();
