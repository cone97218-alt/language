import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import readline from 'node:readline';

const inputPath =
  process.argv[2] ||
  'C:/Users/dday9/.gemini/antigravity/brain/8aa24f0d-a4fa-44c7-9375-5af454fdfea8/scratch/ecdict.csv';
const outputPath = path.resolve('data/dict-en-core.tsv');

function parseCsvLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

function cleanTranslation(raw) {
  if (!raw) return '';
  const lines = raw
    .split('\\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('[网络]') && !l.startsWith('[人名]') && !l.startsWith('[地名]'));
  if (lines.length === 0) return '';
  // 限制最多 4 行释义，保持弹窗紧凑且文件极小
  return lines
    .slice(0, 4)
    .map((l) => l.replace(/\t/g, ' ').replace(/\r?\n/g, ' ').trim())
    .join('\\n');
}

function isSimpleRegularInflection(inflected, base) {
  if (!inflected || !base) return true;
  if (inflected === base) return true;
  if (inflected === base + 's' || inflected === base + 'es') return true;
  if (inflected === base + 'd' || inflected === base + 'ed') return true;
  if (inflected === base + 'ing') return true;
  if (inflected === base + 'r' || inflected === base + 'er') return true;
  if (inflected === base + 'st' || inflected === base + 'est') return true;
  if (base.endsWith('y') && (inflected === base.slice(0, -1) + 'ies' || inflected === base.slice(0, -1) + 'ied' || inflected === base.slice(0, -1) + 'ier' || inflected === base.slice(0, -1) + 'iest')) {
    return true;
  }
  if (base.endsWith('e') && inflected === base.slice(0, -1) + 'ing') return true;
  return false;
}

async function run() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`找不到源词库文件: ${inputPath}`);
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  const entries = new Map(); // word -> { phonetic, trans, exchange, score }
  let isHeader = true;

  for await (const line of rl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    if (!line) continue;
    const cols = parseCsvLine(line);
    const rawWord = (cols[0] || '').trim();
    if (!/^[a-zA-Z][a-zA-Z'-]{0,28}$/.test(rawWord)) continue;

    const word = rawWord.toLowerCase();
    const phonetic = (cols[1] || '').trim().replace(/\t/g, ' ');
    const translation = cleanTranslation(cols[3] || '');
    if (!translation) continue;

    const collins = Number(cols[5]) || 0;
    const oxford = cols[6] === '1';
    const tag = (cols[7] || '').trim();
    const bnc = Number(cols[8]) || 0;
    const frq = Number(cols[9]) || 0;
    const exchange = (cols[10] || '').trim();

    const hasExamTag = /\b(zk|gk|cet4|cet6|ky|ielts|toefl|gre)\b/.test(tag);
    const isHighFreq = (frq > 0 && frq <= 25000) || (bnc > 0 && bnc <= 25000);

    if (!oxford && collins < 1 && !hasExamTag && !isHighFreq) continue;

    // 如果同一小写词已有条目，优先保留全小写或评分更高的
    const score =
      (rawWord === word ? 10 : 0) +
      (oxford ? 5 : 0) +
      collins * 2 +
      (hasExamTag ? 4 : 0) +
      (phonetic ? 2 : 0);

    const prev = entries.get(word);
    if (!prev || score > prev.score) {
      entries.set(word, { phonetic, trans: translation, exchange, score });
    }
  }

  // 构建不规则词形还原映射表
  const lemmaMap = new Map();
  for (const [word, info] of entries.entries()) {
    if (!info.exchange) continue;
    const parts = info.exchange.split('/');
    for (const part of parts) {
      const idx = part.indexOf(':');
      if (idx <= 0) continue;
      const type = part.slice(0, idx);
      const val = part.slice(idx + 1).trim().toLowerCase();
      if (!val || !/^[a-z][a-z'-]{0,28}$/.test(val)) continue;

      if (['p', 'd', 'i', '3', 's', 'r', 't'].includes(type)) {
        if (!entries.has(val) && !isSimpleRegularInflection(val, word)) {
          if (!lemmaMap.has(val)) lemmaMap.set(val, word);
        }
      } else if (type === '0') {
        if (entries.has(val) && !isSimpleRegularInflection(word, val)) {
          if (!lemmaMap.has(word)) lemmaMap.set(word, val);
        }
      }
    }
  }

  const outLines = ['#v1'];
  const sortedWords = [...entries.keys()].sort();
  for (const w of sortedWords) {
    const { phonetic, trans } = entries.get(w);
    outLines.push(`${w}\t${phonetic}\t${trans}`);
  }
  outLines.push('===LEMMA===');
  const sortedLemmas = [...lemmaMap.keys()].sort();
  for (const inf of sortedLemmas) {
    outLines.push(`${inf}\t${lemmaMap.get(inf)}`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const content = outLines.join('\n') + '\n';
  fs.writeFileSync(outputPath, content, 'utf8');

  const gz = zlib.gzipSync(Buffer.from(content, 'utf8'), { level: 9 });
  console.log(`构建完成: ${outputPath}`);
  console.log(`词条数: ${sortedWords.length}`);
  console.log(`不规则词形映射: ${sortedLemmas.length}`);
  console.log(`原始体积: ${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`);
  console.log(`Gzip 体积: ${(gz.length / 1024).toFixed(1)} KB`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
