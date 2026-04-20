# دليل استخدام قاعدة البيانات
# Database Usage Guide

## 📁 البنية

```
src/app/data/database/
├── schema.ts          # تعريف الأنواع والواجهات
├── students.json      # بيانات الطالبات
├── articles.json      # بيانات المقالات
└── index.ts          # دوال قاعدة البيانات

src/app/hooks/
└── useDatabase.ts    # React Hooks للاستخدام السهل
```

## 🚀 كيفية الاستخدام

### 1. في مكونات React

```tsx
import { useDatabase, useArticle, useStudentArticles } from '@/app/hooks/useDatabase';

function ArticlesPage() {
  const db = useDatabase();
  
  // الحصول على جميع المقالات
  const allArticles = db.getAllArticles();
  
  // الحصول على المقالات المميزة
  const featured = db.getFeaturedArticles();
  
  // البحث
  const results = db.searchArticles('المدينة');
  
  return (
    <div>
      {allArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

### 2. الحصول على مقال واحد

```tsx
import { useArticle } from '@/app/hooks/useDatabase';

function ArticleDetailPage({ slug }: { slug: string }) {
  const article = useArticle(slug);
  
  if (!article) return <div>المقال غير موجود</div>;
  
  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.excerpt}</p>
    </article>
  );
}
```

### 3. مقالات طالبة معينة

```tsx
import { useStudentArticles } from '@/app/hooks/useDatabase';

function StudentProfile({ studentId }: { studentId: string }) {
  const articles = useStudentArticles(studentId);
  
  return (
    <div>
      <h2>المقالات ({articles.length})</h2>
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

### 4. الفلترة حسب النوع

```tsx
import { useArticlesByType } from '@/app/hooks/useDatabase';

function ReportsPage() {
  const reports = useArticlesByType('report');
  
  return (
    <div>
      <h1>التقارير ({reports.length})</h1>
      {reports.map(report => (
        <ArticleCard key={report.id} article={report} />
      ))}
    </div>
  );
}
```

### 5. الإحصائيات

```tsx
import { useDatabase } from '@/app/hooks/useDatabase';

function StatsPage() {
  const db = useDatabase();
  const stats = db.getStats();
  
  return (
    <div>
      <p>عدد الطالبات: {stats.totalStudents}</p>
      <p>عدد المقالات: {stats.totalArticles}</p>
      <p>المقالات: {stats.articlesByType.article}</p>
      <p>التقارير: {stats.articlesByType.report}</p>
      <p>الأخبار: {stats.articlesByType.news}</p>
    </div>
  );
}
```

## 📝 إضافة مقالات جديدة

### في ملف `articles.json`:

```json
{
  "articles": [
    {
      "id": "6",
      "slug": "new-article-slug",
      "title": "عنوان المقال",
      "subtitle": "العنوان الفرعي",
      "excerpt": "ملخص المقال",
      "studentId": "student-id",
      "studentName": "اسم الطالبة",
      "type": "article",
      "category": "technology",
      "image": "/images/article.jpg",
      "tags": ["تقنية", "ذكاء اصطناعي"],
      "date": "2026-04-20",
      "readTime": "٥ دقائق",
      "views": "١,٢٣٤",
      "featured": false,
      "contentSource": "/data/article.md"
    }
  ]
}
```

## 🎯 أنواع الفنون الصحفية

- `article` - مقال
- `report` - تقرير
- `news` - خبر
- `investigation` - تحقيق
- `infographic` - إنفوجرافيك
- `story` - قصة خبرية

## 🏷️ التصنيفات

- `heritage` - التراث والهوية
- `technology` - التقنية والـAI
- `society` - نبض المجتمع

## 🔍 دوال البحث المتاحة

```typescript
// المقالات
getAllArticles()                    // جميع المقالات
getArticleById(id)                  // مقال بواسطة ID
getArticleBySlug(slug)              // مقال بواسطة Slug
getArticlesByStudent(studentId)     // مقالات طالبة
getArticlesByType(type)             // مقالات حسب النوع
getArticlesByCategory(category)     // مقالات حسب التصنيف
getFeaturedArticles()               // المقالات المميزة
searchArticles(query)               // البحث
getLatestArticles(limit)            // أحدث المقالات
getMostViewedArticles(limit)        // الأكثر مشاهدة

// الطالبات
getAllStudents()                    // جميع الطالبات
getStudentById(id)                  // طالبة بواسطة ID

// الإحصائيات
getStats()                          // إحصائيات شاملة
```

## 🚀 النشر على Vercel

لا تحتاج أي إعدادات خاصة! الملفات JSON ثابتة وستعمل مباشرة على Vercel:

1. ارفع المشروع على GitHub
2. اربط المشروع مع Vercel
3. انشر المشروع

✅ جاهز للعمل!

## 💡 نصائح

1. **الصور**: ضع الصور في مجلد `public/images/`
2. **المحتوى**: ضع ملفات Markdown في `public/data/`
3. **التحديث**: عدّل ملفات JSON مباشرة لإضافة محتوى جديد
4. **الأداء**: البيانات تُحمّل مرة واحدة عند بناء المشروع

## 🔄 مثال كامل

```tsx
import { useDatabase } from '@/app/hooks/useDatabase';

export default function HomePage() {
  const db = useDatabase();
  
  const featured = db.getFeaturedArticles();
  const latest = db.getLatestArticles(5);
  const stats = db.getStats();
  
  return (
    <div>
      <section>
        <h2>المقالات المميزة</h2>
        {featured.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
      
      <section>
        <h2>أحدث المقالات</h2>
        {latest.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
      
      <section>
        <h2>الإحصائيات</h2>
        <p>إجمالي المقالات: {stats.totalArticles}</p>
        <p>عدد الطالبات: {stats.totalStudents}</p>
      </section>
    </div>
  );
}
```

---

## ✨ المميزات

- ✅ بسيط وسهل الاستخدام
- ✅ يعمل على Vercel بدون إعدادات
- ✅ TypeScript للأمان
- ✅ React Hooks جاهزة
- ✅ دوال بحث وفلترة قوية
- ✅ إحصائيات تلقائية
- ✅ لا يحتاج قاعدة بيانات خارجية
