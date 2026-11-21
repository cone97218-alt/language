import { registerTranslator } from './registry.js';
import { getTavernHelper } from '../core/host.js';

export const customAiTranslator = registerTranslator({
  id: 'custom-ai',
  name: '自定义 AI',
  description: '使用自定义 OpenAI 兼容接口翻译',
  async translate(text, { from, to = '简体中文', context, config }) {
    const ai = config?.customAi || {};
    if (!ai.apiKey || !ai.baseUrl || !ai.model) {
      throw new Error('请先在设置中填写自定义 AI 的 Base URL、API Key 与模型名称');
    }
    const endpoint = `${ai.baseUrl.replace(/\/+$/, '')}/chat/completions`;
    const systemPrompt = `You are a literary translator. Translate the user's ${from || 'foreign'} text into natural, fluent ${to === 'zh-CN' ? 'Simplified Chinese' : to}. Preserve tone, emotion, and character voice. Output ONLY the translation without explanation.`;
    const userPrompt = context && context !== text
      ? `Context:\n${context}\n\nTranslate this text:\n${text}`
      : text;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ai.apiKey}`,
      },
      body: JSON.stringify({
        model: ai.model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`Custom AI HTTP ${res.status}`);
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Custom AI 未返回内容');
    return content.trim();
  },
});

export const tavernAiTranslator = registerTranslator({
  id: 'tavern-ai',
  name: '酒馆 API',
  description: '使用酒馆当前连接的模型翻译',
  async translate(text, { from, to = '简体中文' }) {
    const helper = getTavernHelper();
    if (!helper || typeof helper.generateRaw !== 'function') {
      throw new Error('当前酒馆助手版本不支持 generateRaw');
    }
    const prompt = `请将以下${from || '外语'}文本准确、自然地翻译成${to === 'zh-CN' ? '简体中文' : to}，保留原本的语气与情绪。只输出中文译文，不要附加任何解释或引号：\n\n${text}`;
    const result = await helper.generateRaw({
      user_input: prompt,
      should_stream: false,
    });
    if (!result || typeof result !== 'string') {
      throw new Error('酒馆 API 未返回有效译文');
    }
    return result.trim();
  },
});
