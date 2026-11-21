// 可扩展语言注册中心
// 后续新增任意语种（如德语 de、韩语 ko、西语 es）只需按同样结构调用 registerLanguage()

const languageMap = new Map();

export function registerLanguage(langDef) {
  if (!langDef || !langDef.code) {
    throw new Error('[TavernLanguage] registerLanguage 需要包含 code 字段');
  }
  languageMap.set(langDef.code, langDef);
  return langDef;
}

export function getLanguage(code) {
  return languageMap.get(code) || languageMap.get('en') || [...languageMap.values()][0] || null;
}

export function listLanguages() {
  return [...languageMap.values()];
}
