import { registerDictionary, normalizePos } from './registry.js';
import { getTavernHelper } from '../core/host.js';

async function requestAiDict(prompt, config) {
  const ai = config?.customAi || {};
  if (ai.apiKey && ai.baseUrl && ai.model) {
    const endpoint = `${ai.baseUrl.replace(/\/+$/, '')}/chat/completions`;
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
          {
            role: 'system',
            content:
              'You are a concise multilingual dictionary. Respond ONLY in valid JSON: {"phonetic":"","reading":"","pos":"noun|verb|adjective|adverb|expression|other","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}',
          },
          { role: 'user', content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`AI 词典 HTTP ${res.status}`);
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  }

  const helper = getTavernHelper();
  if (helper && typeof helper.generateRaw === 'function') {
    return await helper.generateRaw({
      user_input: `${prompt}\n\n请仅输出合法 JSON（不要 markdown 代码块）：{"phonetic":"","reading":"","pos":"noun","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}`,
      should_stream: false,
    });
  }

  throw new Error('未配置自定义 AI 且酒馆当前不支持 generateRaw');
}

export const aiContextDictionary = registerDictionary({
  id: 'ai-context',
  name: 'AI 语境精讲',
  description: '结合当前句子语境解析词性、真实含义与地道用法（按需点击触发）',
  languages: ['*'],
  async lookup(word, { langDef, context, config }) {
    const prompt = [
      `Language: ${langDef?.name || 'Foreign'} (${langDef?.nativeName || ''})`,
      `Word: ${word}`,
      context ? `Sentence context: "${context}"` : '',
      'Give the base form/reading/IPA, part of speech, exact Chinese meaning in this context, a concise explanation, and one short example.',
    ]
      .filter(Boolean)
      .join('\n');

    const raw = await requestAiDict(prompt, config);
    const jsonMatch = String(raw).match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI 词典返回格式无法解析');
    const parsed = JSON.parse(jsonMatch[0]);

    const defs = Array.isArray(parsed.definitions)
      ? parsed.definitions.slice(0, 3).map((d) => ({
          cn: d.cn || '',
          text: d.text || '',
          example: d.example || '',
        }))
      : [{ cn: parsed.briefCn || '', text: '', example: '' }];

    return {
      word,
      phonetic: parsed.phonetic || '',
      reading: parsed.reading || '',
      audioUrl: '',
      briefCn: parsed.briefCn || defs[0]?.cn || '',
      tags: ['AI 语境解析'],
      meanings: [
        {
          pos: parsed.pos || 'expression',
          posInfo: normalizePos(parsed.pos),
          definitions: defs,
        },
      ],
    };
  },
});
