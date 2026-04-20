
# Arabic News Platform UI

واجهة منصة أخبار عربية مبنية باستخدام React + Vite، مع هيكل تحريري منظم (تقارير، مقالات، تحقيقات، أخبار، قصص) ودعم عرض محتوى عربي طويل عبر ملفات Markdown مرتبطة بكل مادة.

## Project Snapshot

- **Direction**: RTL by default
- **Language**: Arabic-first content and UX
- **Framework**: React + React Router + Vite
- **Styling**: Tailwind + custom CSS
- **Status**: Build passes and content-source integrity checks are in place

## Key Features

- بنية صفحات واضحة: رئيسية، أقسام، تصنيفات فرعية، صفحة مقال، فريق التحرير، تواصل، وصفحة 3D.
- عرض المقالات من مصدرين مضبوطين:
  - `content` داخل البيانات
  - `contentSource` من ملفات Markdown في `public/data`
- فصل المحتوى حسب الأقسام الرئيسية:
  - `heritage`
  - `technology`
  - `society`
- فصل المحتوى حسب النوع التحريري:
  - `reports`
  - `articles`
  - `investigations`
  - `news`
  - `stories`
  - `infographics`
- أدوات تحقق داخل `scripts/` للتأكد من التطابق بين المصدر الرئيسي وملفات المحتوى.

## Routes

Defined in `src/app/routes.tsx`:

- `/` (about)
- `/home`
- `/category/:categorySlug`
- `/category/:categorySlug/:subcategorySlug`
- `/article/:articleId`
- `/about`
- `/three-d`
- `/editors`
- `/contact`

## Content Architecture

### Primary data source

- `src/app/data/mockData.ts`

This file contains article metadata and content blocks and can also point to a Markdown file via `contentSource`.

### Public content files

- `public/data/heritage/**`
- `public/data/technology/**`
- `public/data/society/**`

Each article with `contentSource` points to one dedicated `.md` file.

### Runtime behavior

Article rendering logic in `src/app/pages/ArticlePage.tsx` loads `contentSource` directly when provided.

## Install and Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run start
```

## Quality and Integrity Checks

The repository includes scripts used to keep content safe and consistent:

- `scripts/report-content-sync.cjs`
  - Generates a per-article report (id, title, category, type, source, status).
- `scripts/sync-content-sources-robust.cjs`
  - Syncs linked markdown files from article content safely block-by-block.
- `scripts/verify-content-sync-robust.cjs`
  - Verifies exact equality between inline content and linked markdown.

Run manually:

```bash
node scripts/report-content-sync.cjs
node scripts/verify-content-sync-robust.cjs
```

## Repository Structure

```text
src/
  app/
    data/mockData.ts
    pages/
    components/

public/
  data/
    heritage/
    technology/
    society/
    ...

scripts/
```

## Release Checklist

- [ ] `npm run build` passes
- [ ] Content integrity report returns `MATCH` for all linked articles
- [ ] All `contentSource` paths exist under `public/data`
- [ ] Mobile and desktop checks completed for core pages

## Notes

- Old archive files (`*-full.md`) may remain for reference, while active content uses per-article files.
- If updating article text, run sync/verify scripts before release to avoid mismatches.

## Credits

- Original design reference: Figma
  - https://www.figma.com/design/m1bkB8F5aZeyDHTvw4lmMd/Arabic-News-Platform-UI
  