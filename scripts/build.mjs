import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_ENTRY = path.join(ROOT, 'src', 'index.js');
const DIST_FILE = path.join(ROOT, 'dist', 'tavern-language.js');

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

await esbuild.build({
  entryPoints: [SRC_ENTRY],
  outfile: DIST_FILE,
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['es2020'],
  alias: {
    vue: path.join(ROOT, 'node_modules', 'vue', 'dist', 'vue.esm-bundler.js'),
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
  },
  banner: {
    js: `/**
 * Tavern Language v${pkg.version} (Vue 3)
 * SillyTavern 酒馆助手沉浸式外语学习插件
 * Repo: https://github.com/cone97218-alt/language
 */`,
  },
});

const stat = fs.statSync(DIST_FILE);
console.log(`[build] Vue 3 单文件产物已生成 -> dist/tavern-language.js (${(stat.size / 1024).toFixed(1)} KB)`);
