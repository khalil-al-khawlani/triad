const fs = require('fs');
const path = require('path');

const root = process.cwd();
const mockPath = path.join(root, 'src', 'app', 'data', 'mockData.ts');
const text = fs.readFileSync(mockPath, 'utf8');

const items = [
  { id: '1', typeLabel: 'تقرير صحفي', out: 'public/data/society/reports/digital-mind-sedation-report.md', category: 'society' },
  { id: '2', typeLabel: 'مقال صحفي', out: 'public/data/society/articles/news-framing-article.md', category: 'society' },
  { id: '6', typeLabel: 'تقرير صحفي', out: 'public/data/society/reports/local-podcast-report.md', category: 'society' },
  { id: '8', typeLabel: 'تقرير صحفي', out: 'public/data/society/reports/reading-speed-report.md', category: 'society' },
  { id: '11', typeLabel: 'قصة خبرية', out: 'public/data/society/stories/coffee-culture-story.md', category: 'society' },
  { id: '12', typeLabel: 'تقرير صحفي', out: 'public/data/society/reports/digital-relationships-report.md', category: 'society' },
  { id: '13', typeLabel: 'مقال صحفي', out: 'public/data/society/articles/phones-relationships-article.md', category: 'society' },
  { id: '14', typeLabel: 'خبر صحفي', out: 'public/data/society/news/brt-news.md', category: 'society' },
  { id: '20', typeLabel: 'تحقيق صحفي', out: 'public/data/society/investigations/digital-addiction-investigation.md', category: 'society' },
  { id: '21', typeLabel: 'تحقيق صحفي', out: 'public/data/society/investigations/madinah-digital-transformation-investigation.md', category: 'society' },
];

function extractItemContent(id, category) {
  const pattern =
    'id: "' + id + '"[\\s\\S]*?title: "([^\\"]+)"[\\s\\S]*?content: \\`([\\s\\S]*?)\\`,[\\s\\S]*?category: "' +
    category +
    '"';
  const re = new RegExp(pattern);
  const match = text.match(re);
  if (!match) {
    throw new Error(`Could not extract content for id=${id}, category=${category}`);
  }
  return { title: match[1], content: match[2].trim() };
}

for (const item of items) {
  const { title, content } = extractItemContent(item.id, item.category);
  const finalText = `# ${item.typeLabel}\n\n## ${title}\n\n${content}\n`;
  const outPath = path.join(root, ...item.out.split('/'));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, finalText, 'utf8');
  console.log(`WROTE ${item.out}`);
}

console.log('DONE');
