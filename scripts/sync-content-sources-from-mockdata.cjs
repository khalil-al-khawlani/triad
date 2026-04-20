const fs = require('fs');
const path = require('path');

const root = process.cwd();
const mockPath = path.join(root, 'src', 'app', 'data', 'mockData.ts');
const text = fs.readFileSync(mockPath, 'utf8');

const re = /id:\s*"(?<id>\d+)"[\s\S]*?title:\s*"(?<title>[^"]+)"[\s\S]*?content:\s*`(?<content>[\s\S]*?)`[\s\S]*?contentSource:\s*"(?<src>\/data\/[^\"]+)"/g;

let count = 0;
for (const match of text.matchAll(re)) {
  const id = match.groups.id;
  const src = match.groups.src;
  const content = match.groups.content;

  const fullPath = path.join(root, 'public', ...src.replace(/^\/data\//, '').split('/'));
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${content}\n`, 'utf8');
  console.log(`SYNCED id=${id} -> ${src}`);
  count += 1;
}

console.log(`DONE: ${count} files synced`);
