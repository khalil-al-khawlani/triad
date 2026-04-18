import { Link } from "react-router";
import { Play, TrendingUp, Star, ChevronLeft } from "lucide-react";
import { articles, categories, featuredArticles, latestArticles, trendingArticles, IMAGES } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { SectionHeader } from "../components/SectionHeader";
import { NewsletterForm } from "../components/NewsletterForm";

export function HomePage() {
  const heroArticle = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  return (
    <div className="bg-[#f8fafc]">
      {/* HERO SECTION */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main hero */}
            <div className="lg:col-span-8">
              {heroArticle && <ArticleCard article={heroArticle} variant="featured" />}
            </div>

            {/* Side articles */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {secondaryFeatured.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="group flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-100"
                >
                  <div className="flex-1">
                    {(() => {
                      const cat = categories.find(c => c.id === article.category);
                      return cat ? (
                        <span
                          className="text-xs font-bold mb-2 block"
                          style={{ color: cat.color }}
                        >
                          {cat.name}
                        </span>
                      ) : null;
                    })()}
                    <h3 className="font-bold text-[#0a1f44] text-sm leading-relaxed line-clamp-3 group-hover:text-[#1e3a8a] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-500">{article.author.name}</span>
                      <span className="text-xs text-gray-400 mr-auto">{article.date}</span>
                    </div>
                  </div>
                  <div className="w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              ))}

              {/* Breaking news ticker */}
              <div className="bg-[#0a1f44] rounded-2xl p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse">
                    عاجل
                  </span>
                  <span className="text-blue-200 text-xs">آخر الأخبار</span>
                </div>
                <div className="space-y-3">
                  {articles.slice(4, 6).map((a) => (
                    <Link
                      key={a.id}
                      to={`/article/${a.id}`}
                      className="block text-white text-sm leading-relaxed hover:text-[#c9a227] transition-colors line-clamp-2 py-2 border-b border-white/10 last:border-0"
                    >
                      {a.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS GRID */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader title="أحدث الأخبار" link="/category/heritage" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles.slice(0, 4).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES PREVIEW */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader title="استكشف الأقسام" subtitle="تصفح محتوانا المتنوع عبر أقسامنا الرئيسية" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl h-64 block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${cat.color}dd, #0a1f44cc)` }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-white font-black text-xl mb-2">{cat.name}</h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-4">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">{cat.articleCount}+ مقال</span>
                    <span className="flex items-center gap-1 text-white text-xs font-bold group-hover:gap-2 transition-all">
                      استكشف
                      <ChevronLeft className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING + EDITORIAL PICKS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Trending */}
            <div className="lg:col-span-5">
              <SectionHeader
                title="الأكثر قراءة"
                subtitle="المقالات الأكثر تفاعلاً هذا الأسبوع"
                accentColor="#e53e3e"
              />
              <div className="space-y-1">
                {trendingArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 group-hover:bg-[#0a1f44] transition-colors">
                      <span className="font-black text-gray-400 group-hover:text-[#c9a227] transition-colors">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#0a1f44] text-sm leading-relaxed line-clamp-2 group-hover:text-[#1e3a8a] transition-colors mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-red-400" />
                          {article.views} مشاهدة
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Editorial Picks */}
            <div className="lg:col-span-7">
              <SectionHeader
                title="اختيارات التحرير"
                subtitle="مقالات مختارة بعناية من فريق التحرير"
                accentColor="#1e3a8a"
                link="/category/society"
              />
              <div className="space-y-4">
                {articles.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MULTIMEDIA SECTION */}
      <section className="py-12 sm:py-16 bg-[#0a1f44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="الوسائط المتعددة"
            subtitle="شاهد أبرز التقارير المرئية"
            accentColor="#c9a227"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#c9a227] transition-colors border-2 border-white/40">
                    <Play className="w-5 h-5 text-white fill-white mr-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 left-0 p-4 bg-gradient-to-t from-black/80">
                  <p className="text-white text-sm font-bold line-clamp-2 leading-relaxed">
                    {article.title}
                  </p>
                  <span className="text-blue-200 text-xs mt-1 block">{article.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterForm />

      {/* MORE ARTICLES */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="مزيد من المقالات"
            link="/category/technology"
            accentColor="#3b82f6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(3, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
