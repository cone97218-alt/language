# Tavern Language — 酒馆助手沉浸式外语学习插件

专为 **SillyTavern（酒馆）+ 酒馆助手（JS-Slash-Runner）** 打造的原生界面外语学习插件。  
无需单独面板、不破坏酒馆美化排版，支持 **GitHub 远程热更新**、**英语 / 日语 / 法语** 首发重点语种、**可组装词典链**、**安全分词排除名单** 与 **三套主题（跟随酒馆美化变量 / 日间 / 夜间）**。

---

## 一、一键安装（支持每次自动热更新）

1. 打开 SillyTavern → **扩展** → **酒馆助手（JS-Slash-Runner）** → **全局脚本**。
2. 新建一个脚本，将下方引导器代码完整复制进去并启用即可（也可以直接查看 [loader/tavern-loader.js](loader/tavern-loader.js)）：

```javascript
(async () => {
  const REPO = 'cone97218-alt/language';
  const BRANCH = 'main';
  const ENTRY = 'dist/tavern-language.js';

  // 先实时获取 main 最新 commit SHA，绕过 jsDelivr @main 分支边缘缓存
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
  } catch {}

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
})();
```

3. 刷新酒馆后，打开左下角 **汉堡菜单（含重新开始、删除消息、关闭聊天的菜单）**，点击 **外语学习设置** 即可打开设置面板。以后仓库更新后，只需刷新酒馆即可自动热更新。

---

## 二、核心功能

- **API 直出目标外语（无侵入）**：开启「沉浸外语模式」后，通过 `TavernHelper.injectPrompts` 动态注入目标语言与难度等级（如英语/法语 `A2–C1`，日语 `JLPT N5–N1`），关闭开关立刻恢复原样，不修改角色卡。
- **原生消息界面直接改造**：
  - **点按单词**：弹出轻巧词典卡片，显示音标/假名、词性（名词/动词/形容词等）、中文释义、例句，支持点击例句发音、一键「朗读所在句」与「翻译所在句」。
  - **划词 / 选句**：选中任意短语或句子弹出极简悬浮条（翻译 / 朗读 / 复制）。
  - **整段双语对照**：点击原生消息栏的 **译** 按钮，在每个段落下方优雅展开/收起中文译文；点击 **🔊** 朗读/停止整条消息。
- **中文译文不止有机翻**：翻译引擎默认免 Key 开箱即用（Google / MyMemory），同时也支持切换为 **酒馆当前 API** 或 **自定义 OpenAI 兼容模型（如 DeepSeek / GPT-4o-mini / Gemini）**，实现贴合上下文的高质量文学级中文对照。
- **安全分词排除名单**：采用 `TreeWalker` 遍历纯文本节点，支持在设置中自由添加需要跳过的 HTML 标签或 CSS 选择器（如 `code, pre, details, thinking, .status-bar`），绝不破坏状态栏、代码块和美化卡。
- **三套配色主题**：
  - **跟随酒馆美化主题（默认）**：自动引用 `--SmartThemeBodyColor`、`--SmartThemeBlurTintColor`、`--SmartThemeChatTintColor`、`--SmartThemeQuoteColor`、`--SmartThemeBorderColor` 等酒馆核心变量。
  - **纯净日间模式** / **护眼夜间模式**。

---

## 三、可组装架构：如何快速扩展新语种或新词典？

本插件将**语种包**、**词典源**与**翻译引擎**完全解耦，目录结构如下：

```text
src/
├── languages/       # 语种包：en.js / ja.js / fr.js / registry.js
├── dictionaries/    # 可组装词典：freeDictionary.js / jotoba.js / wiktionary.js / aiContext.js
├── translators/     # 翻译引擎：googleFree.js / myMemory.js / customAi.js
├── core/            # 宿主适配、提示词注入、安全分词、事件监听、TTS 发音
└── ui/              # 主题样式、查词卡片、划词条、消息双语对照、设置弹窗
```

### 添加一个新语种（例如德语 `de`）
1. 在 `src/languages/de.js` 中调用 `registerLanguage({ code: 'de', name: '德语', nativeName: 'Deutsch', bcp47: 'de-DE', defaultDictionaries: ['wiktionary', 'ai-context'], levels: [...], tokenize(text) {...}, buildPrompt(...) {...} })`。
2. 在 `src/index.js` 中增加一行 `import './languages/de.js';`。
3. 运行构建命令并推送：
   ```bash
   node scripts/build.mjs
   ```

### 添加一个新词典源
1. 在 `src/dictionaries/` 新建文件并调用 `registerDictionary({ id, name, description, languages: ['en'], async lookup(word, ctx) { ... } })`。
2. 在 `src/index.js` 引入该文件，重新运行 `node scripts/build.mjs` 即可在设置面板的「可组装词典链」里自由勾选与排序。
