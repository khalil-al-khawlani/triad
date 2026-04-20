const fs = require('fs');
const path = require('path');

const root = process.cwd();
const mockPath = path.join(root, 'src', 'app', 'data', 'mockData.ts');
const source = fs.readFileSync(mockPath, 'utf8');

const startMarker = 'export const articles = [';
const endMarker = '];\n\nexport const editors = [';
const start = source.indexOf(startMarker);
const end = source.indexOf(endMarker);
if (start === -1 || end === -1 || end <= start) {
  throw new Error('Could not locate articles array in mockData.ts');
}

const articlesText = source.slice(start + startMarker.length, end);

function splitArticleBlocks(text) {
  const blocks = [];
  let depth = 0;
  let inString = false;
  let inTemplate = false;
  let escape = false;
  let blockStart = -1;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === '\\') {
      escape = true;
      continue;
    }

    if (!inTemplate && ch === '"') {
      inString = !inString;
      continue;
    }

    if (!inString && ch === '`') {
      inTemplate = !inTemplate;
      continue;
    }

    if (inString || inTemplate) {
      continue;
    }

    if (ch === '{') {
      if (depth === 0) blockStart = i;
      depth += 1;
      continue;
    }

    if (ch === '}') {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(text.slice(blockStart, i + 1));
        blockStart = -1;
      }
    }
  }

  return blocks;
}

const rows = [];
for (const block of splitArticleBlocks(articlesText)) {
  const id = (block.match(/id:\s*"(\d+)"/) || [])[1];
  const title = (block.match(/title:\s*"([^"]+)"/) || [])[1];
  const category = (block.match(/category:\s*"([^"]+)"/) || [])[1];
  const subcategory = (block.match(/subcategory:\s*"([^"]+)"/) || [])[1];
  const content = (block.match(/content:\s*`([\s\S]*?)`/) || [])[1];
  const src = (block.match(/contentSource:\s*"(\/data\/[^"]+)"/) || [])[1];

  let status = 'NO_CONTENT_SOURCE';
  if (src) {
    const full = path.join(root, 'public', ...src.replace(/^\/data\//, '').split('/'));
    if (!fs.existsSync(full)) {
      status = 'MISSING_FILE';
    } else if (!content) {
      status = 'NO_INLINE_CONTENT';
    } else {
      const fileContent = fs.readFileSync(full, 'utf8').trim();
      status = fileContent === content.trim() ? 'MATCH' : 'MISMATCH';
    }
  }

  rows.push({ id, title, category, subcategory, src: src || '-', status });
}

rows.sort((a, b) => Number(a.id) - Number(b.id));

console.log('ID | CATEGORY | TYPE | STATUS | SOURCE | TITLE');
for (const r of rows) {
  console.log(`${r.id} | ${r.category} | ${r.subcategory} | ${r.status} | ${r.src} | ${r.title}`);
}

const summary = rows.reduce((acc, r) => {
  acc.total += 1;
  acc[r.status] = (acc[r.status] || 0) + 1;
  return acc;
}, { total: 0 });

console.log('\nSUMMARY');
console.log(JSON.stringify(summary, null, 2));
