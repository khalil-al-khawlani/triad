import { useParams, Link } from "react-router";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getArticlesByCategoryAndSubcategory,
  articles,
  subcategories,
} from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { SectionHeader } from "../components/SectionHeader";
import { NewsletterForm } from "../components/NewsletterForm";
import { ChevronLeft, FileText, Newspaper, Search as SearchIcon, Megaphone } from "lucide-react";

const subcategoryIcons: Record<string, React.ReactNode> = {
  reports: <FileText className="w-5 h-5" />,
  articles: <Newspaper className="w-5 h-5" />,
  investigations: <SearchIcon className="w-5 h-5" />,
  news: <Megaphone className="w-5 h-5" />,
};

export function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();

  const category = getCategoryBySlug(categorySlug || "");
  const subcategory = getSubcategoryBySlug(subcategorySlug || "");
  const subcatArticles = getArticlesByCategoryAndSubcategory(categorySlug || "", subcategorySlug || "");

  // Fallback: if no matching articles, show all articles for demonstration
  const displayArticles = subcatArticles.length > 0 ? subcatArticles : articles.slice(0, 4);

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0a1f44] mb-4">الصفحة غير موجودة</h1>
          <Link to="/" className="text-[#c9a227] font-bold">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc]">
      {/* Banner */}
      <div
        className="relative overflow-hidden py-14 sm:py-20"
        style={{
          background: `linear-gradient(135deg, #0a1f44 0%, ${category.color}33 100%)`,
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3 h-3" />
            <Link to={`/category/${categorySlug}`} className="hover:text-white transition-colors">
              {category.name}
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white font-medium">{subcategory.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: category.color }}
            >
              {subcategoryIcons[subcategorySlug || ""] || <FileText className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">{category.name}</p>
              <h1
                className="text-white font-black"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: "1.3" }}
              >
                {subcategory.name}
              </h1>
            </div>
          </div>

          {/* Tab navigation for subcategories */}
          <div className="flex items-center gap-2 mt-8">
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/category/${categorySlug}/${sub.slug}`}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                  sub.slug === subcategorySlug
                    ? "bg-[#c9a227] text-[#0a1f44] border-[#c9a227]"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main articles */}
          <div className="lg:col-span-8">
            <SectionHeader
              title={`${subcategory.name} — ${category.name}`}
              subtitle={`${displayArticles.length} ${subcategory.name} في هذا القسم`}
            />

            {/* Featured first article */}
            {displayArticles.length > 0 && (
              <div className="mb-8">
                <ArticleCard article={displayArticles[0]} variant="featured" />
              </div>
            )}

            {/* Rest as grid */}
            {displayArticles.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {displayArticles.slice(1).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {displayArticles.length === 0 && (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">لا توجد مقالات حالياً</p>
                <p className="text-gray-400 text-sm mt-2">سيتم إضافة محتوى جديد قريباً</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Back to category */}
              <Link
                to={`/category/${categorySlug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                >
                  <ChevronLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">العودة إلى</p>
                  <p className="font-bold text-[#0a1f44] text-sm">{category.name}</p>
                </div>
              </Link>

              {/* Other subcategories */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#0a1f44] mb-4 pb-3 border-b border-gray-100">
                  أنواع المحتوى الأخرى
                </h3>
                <div className="space-y-2">
                  {subcategories
                    .filter((s) => s.slug !== subcategorySlug)
                    .map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/category/${categorySlug}/${sub.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                          style={{ backgroundColor: category.color + "33" }}
                        >
                          <span style={{ color: category.color }}>
                            {subcategoryIcons[sub.slug] || <FileText className="w-4 h-4" />}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#0a1f44]">
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Related articles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#0a1f44] mb-4 pb-3 border-b border-gray-100">
                  مقالات ذات صلة
                </h3>
                <div className="space-y-1">
                  {articles.slice(2, 5).map((article) => (
                    <ArticleCard key={article.id} article={article} variant="horizontal" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsletterForm />
    </div>
  );
}
