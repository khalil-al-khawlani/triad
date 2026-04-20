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
      if (depth === 0) {
        blockStart = i;
      }
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

const blocks = splitArticleBlocks(articlesText);
const fails = [];
let checked = 0;

for (const block of blocks) {
  const idMatch = block.match(/id:\s*"(\d+)"/);
  const contentMatch = block.match(/content:\s*`([\s\S]*?)`/);
  const srcMatch = block.match(/contentSource:\s*"(\/data\/[^"]+)"/);

  if (!idMatch || !contentMatch || !srcMatch) {
    continue;
  }

  const id = idMatch[1];
  const content = contentMatch[1].trim();
  const src = srcMatch[1];

  const fullPath = path.join(root, 'public', ...src.replace(/^\/data\//, '').split('/'));
  if (!fs.existsSync(fullPath)) {
    fails.push(`ID ${id} missing ${src}`);
    continue;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8').trim();
  if (fileContent !== content) {
    fails.push(`ID ${id} mismatch ${src}`);
  }

  checked += 1;
}

if (fails.length === 0) {
  console.log(`ROBUST_SYNC_OK checked=${checked}`);
} else {
  console.log('ROBUST_SYNC_MISMATCH');
  for (const f of fails) console.log(f);
}
