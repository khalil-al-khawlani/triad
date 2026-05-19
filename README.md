# Triad — Arabic News Platform UI

واجهة تحريرية عربية مبنية بـ **React + Vite** لعرض محتوى صحفي متعدد الأنواع (تقارير، مقالات، تحقيقات، أخبار، قصص، إنفوجرافيك) مع دعم **RTL** وتحميل المحتوى الطويل من ملفات **Markdown**.

## نظرة سريعة

- **الاتجاه**: RTL افتراضيًا
- **التركيز**: تجربة عربية أولاً (Arabic-first UX)
- **الواجهة**: React + React Router
- **البناء**: Vite
- **التصميم**: Tailwind CSS + CSS مخصص
- **مصدر المحتوى**: بيانات المقالات + ملفات Markdown داخل `public/data`

## المزايا الأساسية

- بنية صفحات تحريرية واضحة:
  - الرئيسية
  - الأقسام
  - التصنيفات الفرعية
  - صفحة المقال
  - من نحن
  - فريق التحرير
  - تواصل
  - صفحة 3D
- تنظيم المحتوى حسب الأقسام:
  - `heritage`
  - `technology`
  - `society`
- تنظيم المحتوى حسب النوع التحريري:
  - `reports`
  - `articles`
  - `investigations`
  - `news`
  - `stories`
  - `infographics`
- دعم `contentSource` لقراءة النص من ملف Markdown مباشر وقت التشغيل.
- أدوات تحقق وسكربتات مزامنة لضبط تطابق المحتوى.

## المسارات (Routes)

المسارات معرفة في:

- `/home/runner/work/triad/triad/src/app/routes.tsx`

المسارات الفعلية:

- `/` (تعرض صفحة About كافتراضي)
- `/home`
- `/category/:categorySlug`
- `/category/:categorySlug/:subcategorySlug`
- `/article/:articleId`
- `/about`
- `/three-d`
- `/editors`
- `/contact`

## هيكل المحتوى

### 1) مصدر البيانات الأساسي

- `/home/runner/work/triad/triad/src/app/data/mockData.ts`

يحتوي على بيانات المقالات الوصفية (العنوان، الكاتب، القسم...) ويمكن أن يحتوي:

- محتوى مباشر (`content`)
- أو رابط ملف محتوى (`contentSource`)

### 2) ملفات المحتوى العامة

- `/home/runner/work/triad/triad/public/data/`

تتوزع تحت مجلدات الأقسام والأنواع التحريرية.

### 3) سلوك وقت التشغيل

- `/home/runner/work/triad/triad/src/app/pages/ArticlePage.tsx`

عند وجود `contentSource` يتم جلب Markdown وعرضه داخل صفحة المقال.

## التشغيل المحلي

### المتطلبات

- Node.js 18+
- npm 9+

### التثبيت والتشغيل

```bash
npm install
npm run dev
```

### بناء نسخة الإنتاج

```bash
npm run build
```

### معاينة نسخة الإنتاج

```bash
npm run start
```

## أوامر المشروع

الأوامر المعرفة في:

- `/home/runner/work/triad/triad/package.json`

- `npm run dev` → تشغيل بيئة التطوير
- `npm run build` → بناء الإنتاج
- `npm run start` → معاينة البناء محليًا

## أدوات سلامة المحتوى

السكربتات داخل:

- `/home/runner/work/triad/triad/scripts/`

أهم الأدوات:

- `report-content-sync.cjs`
  - تقرير حالة التوافق بين بيانات المقالات وملفات المحتوى.
- `sync-content-sources-robust.cjs`
  - مزامنة المحتوى من المصدر الرئيسي إلى ملفات Markdown.
- `verify-content-sync-robust.cjs`
  - تحقق صارم من التطابق النصي.

تشغيل يدوي:

```bash
node scripts/report-content-sync.cjs
node scripts/verify-content-sync-robust.cjs
```

## هيكل المستودع

```text
triad/
├─ src/
│  ├─ app/
│  │  ├─ components/
│  │  ├─ data/
│  │  │  └─ mockData.ts
│  │  ├─ pages/
│  │  └─ routes.tsx
│  ├─ styles/
│  └─ main.tsx
├─ public/
│  ├─ data/
│  │  ├─ heritage/
│  │  ├─ technology/
│  │  └─ society/
│  └─ ...
├─ scripts/
├─ package.json
└─ README.md
```

## سير عمل تحرير المحتوى (مقترح)

1. تحديث بيانات المقال في `mockData.ts`.
2. تحديث/إضافة ملف Markdown داخل `public/data`.
3. تشغيل سكربتات التحقق من التطابق.
4. تشغيل `npm run build` قبل الدمج.

## قائمة تحقق قبل التسليم

- [ ] `npm run build` يمر بدون أخطاء
- [ ] روابط `contentSource` تشير إلى ملفات موجودة
- [ ] نتائج `report-content-sync` سليمة
- [ ] نتائج `verify-content-sync-robust` سليمة

## المساهمة

- حافظ على دعم RTL وعدم كسر تجربة العربية.
- استخدم أسماء ملفات واضحة وثابتة للمحتوى.
- عند تعديل المحتوى التحريري، حدّث ملفات Markdown والبيانات معًا.
- لا تضف تغييرات غير مرتبطة بنفس الـ PR.

## مرجع التصميم

- Figma:
  - https://www.figma.com/design/m1bkB8F5aZeyDHTvw4lmMd/Arabic-News-Platform-UI
