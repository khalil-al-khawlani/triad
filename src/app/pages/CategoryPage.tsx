import { useParams, Link } from "react-router";
import { getArticlesByCategory, getCategoryBySlug, subcategories, articles } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { SectionHeader } from "../components/SectionHeader";
import { NewsletterForm } from "../components/NewsletterForm";
import { ChevronLeft } from "lucide-react";

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || "");
  const categoryArticles = getArticlesByCategory(categorySlug || "");
  const otherArticles = articles.filter(a => a.category !== categorySlug).slice(0, 4);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0a1f44] mb-4">القسم غير موجود</h1>
          <Link to="/" className="text-[#c9a227] font-bold">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const heroArticle = categoryArticles[0];
  const gridArticles = categoryArticles.slice(1);

  return (
    <div className="bg-[#f8fafc]">
      {/* Category Hero Banner */}
      <div
        className="relative overflow-hidden py-16 sm:py-24"
        style={{
          background: `linear-gradient(135deg, #0a1f44 0%, ${category.color}44 60%, #1e3a8a 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white font-medium">{category.name}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-2 h-12 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <h1
              className="text-white font-black"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.3" }}
            >
              {category.name}
            </h1>
          </div>
          <p className="text-blue-100 max-w-2xl leading-relaxed text-lg mr-6">
            {category.description}
          </p>
          <div className="flex items-center gap-6 mt-8 mr-6">
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/category/${categorySlug}/${sub.slug}`}
                className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 bg-white/10 text-white hover:bg-[#c9a227] hover:text-[#0a1f44] border border-white/20"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {categoryArticles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">لا توجد مقالات في هذا القسم حالياً</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main content */}
              <div className="lg:col-span-8">
                {/* Featured article */}
                {heroArticle && (
                  <div className="mb-10">
                    <ArticleCard article={heroArticle} variant="featured" />
                  </div>
                )}

                {/* Grid articles */}
                {gridArticles.length > 0 && (
                  <>
                    <SectionHeader title="جميع المقالات" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {gridArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  {/* Subcategory navigation */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#0a1f44] mb-4 pb-3 border-b border-gray-100">
                      تصفح حسب النوع
                    </h3>
                    <div className="space-y-2">
                      {subcategories.map((sub) => {
                        const count = categoryArticles.filter(a => a.subcategory === sub.slug).length;
                        return (
                          <Link
                            key={sub.id}
                            to={`/category/${categorySlug}/${sub.slug}`}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <span className="flex items-center gap-2 text-gray-700 group-hover:text-[#0a1f44] font-medium text-sm">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              {sub.name}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                              {count}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Other categories */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#0a1f44] mb-4 pb-3 border-b border-gray-100">
                      من أقسام أخرى
                    </h3>
                    <div className="space-y-1">
                      {otherArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} variant="horizontal" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <NewsletterForm />
    </div>
  );
}
