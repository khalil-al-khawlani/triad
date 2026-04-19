import { useParams, Link } from "react-router";
import {
  getArticleById,
  getCategoryBySlug,
  articles,
} from "../data/mockData";
import { ReadingProgressBar } from "../components/ReadingProgressBar";
import { ArticleCard } from "../components/ArticleCard";
import {
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Clock,
  Eye,
  ChevronLeft,
  Quote,
  Bookmark,
} from "lucide-react";
import { useState } from "react";

export function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = getArticleById(articleId || "");
  const [copied, setCopied] = useState(false);
  const articleVideo = (article as { video?: string } | undefined)?.video;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0a1f44] mb-4">المقال غير موجود</h1>
          <Link to="/" className="text-[#c9a227] font-bold">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(article.category);
  const relatedArticles = articles.filter(
    (a) => a.id !== article.id && a.category === article.category
  ).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render article content with basic formatting
  const renderContent = (content: string) => {
    const paragraphs = content.split("\n\n");
    return paragraphs.map((para, index) => {
      if (para.startsWith("**") && para.endsWith("**")) {
        return (
          <h3
            key={index}
            className="font-bold text-[#0a1f44] mt-8 mb-4"
            style={{ fontSize: "1.2rem", lineHeight: "1.5" }}
          >
            {para.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (para.includes("**")) {
        const parts = para.split(/\*\*(.*?)\*\*/g);
        return (
          <p
            key={index}
            className="text-gray-700 leading-loose mb-6"
            style={{ fontSize: "1.0625rem" }}
          >
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-bold text-[#0a1f44]">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      return (
        <p
          key={index}
          className="text-gray-700 leading-loose mb-6"
          style={{ fontSize: "1.0625rem" }}
        >
          {para}
        </p>
      );
    });
  };

  return (
    <>
      <ReadingProgressBar />
      <div className="bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-[#0a1f44] transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3 h-3" />
            {category && (
              <>
                <Link
                  to={`/category/${article.category}`}
                  className="hover:text-[#0a1f44] transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronLeft className="w-3 h-3" />
              </>
            )}
            <span className="text-gray-400 line-clamp-1">{article.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Article */}
            <article className="lg:col-span-8">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                {/* Article header */}
                <div className="p-6 sm:p-10 pb-0">
                  {/* Category badge */}
                  {category && (
                    <Link
                      to={`/category/${article.category}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold text-white mb-6"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name}
                    </Link>
                  )}

                  {/* Title */}
                  <h1
                    className="font-black text-[#0a1f44] mb-4 leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.4" }}
                  >
                    {article.title}
                  </h1>

                  {/* Subtitle */}
                  <p
                    className="text-gray-500 mb-8 leading-relaxed border-r-4 border-[#c9a227] pr-4"
                    style={{ fontSize: "1.125rem" }}
                  >
                    {article.subtitle}
                  </p>

                  {/* Author + meta */}
                  <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                      />
                      <div>
                        <p className="font-bold text-[#0a1f44] text-sm">{article.author.name}</p>
                        <p className="text-gray-500 text-xs">{article.author.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Featured image */}
                <div className="mx-6 sm:mx-10 mt-8 rounded-2xl overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                  <p className="text-xs text-gray-400 mt-2 mr-1">
                    صورة توضيحية | © ترياد ٢٠٢٦
                  </p>
                </div>

                {articleVideo && (
                  <div className="mx-6 sm:mx-10 mt-6 rounded-2xl overflow-hidden border border-gray-100 bg-black">
                    <video
                      src={articleVideo}
                      controls
                      preload="metadata"
                      className="w-full h-auto max-h-[520px]"
                    />
                    <p className="text-xs text-gray-400 mt-2 mr-1 bg-white px-2 py-1">
                      فيديو المقابلة | © ترياد ٢٠٢٦
                    </p>
                  </div>
                )}

                {/* Article body */}
                <div className="p-6 sm:p-10">
                  {/* Excerpt highlight */}
                  <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 mb-8">
                    <div className="flex gap-3">
                      <Quote className="w-6 h-6 text-[#c9a227] flex-shrink-0 mt-1" />
                      <p className="text-[#0a1f44] font-medium leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="prose-content">
                    {renderContent(article.content)}
                  </div>

                  {/* Additional content for depth */}
                  <div className="mt-8 space-y-6">
                    <p className="text-gray-700 leading-loose" style={{ fontSize: "1.0625rem" }}>
                      وفي سياق متصل، يرى خبراء المجال أن الاهتمام المتزايد بهذا الموضوع يعكس تحولاً عميقاً في الوعي المجتمعي، وهو ما يستدعي مزيداً من الدراسة والتحليل لاستيعاب أبعاده المتشعبة وانعكاساته على المستقبل.
                    </p>

                    {/* Pullquote */}
                    <blockquote className="relative border-r-4 border-[#c9a227] pr-6 my-10">
                      <p
                        className="text-[#0a1f44] font-bold italic leading-relaxed"
                        style={{ fontSize: "1.25rem" }}
                      >
                        "إن التحولات الكبرى في التاريخ لا تبدأ دائماً بأحداث صاخبة، بل كثيراً ما تنمو في صمت العقول المفكرة وهمس الأقلام الواعية."
                      </p>
                      <footer className="mt-3">
                        <cite className="text-gray-500 text-sm not-italic">— {article.author.name}</cite>
                      </footer>
                    </blockquote>

                    <p className="text-gray-700 leading-loose" style={{ fontSize: "1.0625rem" }}>
                      وختاماً، يظل هذا الملف أحد أبرز القضايا التي تشغل حيزاً واسعاً في النقاشات الأكاديمية والإعلامية، ونأمل أن تكون هذه القراءة إضافةً مثرية لفهم أبعاده والمشاركة في صياغة استجاباته المستقبلية.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap mt-10 pt-8 border-t border-gray-100">
                    <span className="text-xs text-gray-500 ml-1">الوسوم:</span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-[#0a1f44] hover:text-white transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Share section */}
                  <div className="mt-8 p-6 bg-[#f8fafc] rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-[#0a1f44] mb-4 text-sm">شارك هذا المقال</h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        <Twitter className="w-4 h-4" />
                        تويتر
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        <Linkedin className="w-4 h-4" />
                        لينكدإن
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        {copied ? "تم النسخ!" : "نسخ الرابط"}
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#0a1f44] text-white rounded-xl text-sm font-medium hover:bg-[#1e3a8a] transition-colors mr-auto">
                        <Bookmark className="w-4 h-4" />
                        حفظ
                      </button>
                    </div>
                  </div>

                  {/* Author bio */}
                  <div className="mt-8 p-6 bg-white border border-gray-100 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#0a1f44] mb-1">{article.author.name}</p>
                        <p className="text-[#c9a227] text-sm font-medium mb-3">{article.author.title}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          محرر متخصص لدى ترياد، يتناول القضايا الثقافية والفكرية بعمق وموضوعية، ويسعى إلى تقديم محتوى يُثري الحوار العام.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Related Articles */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[#0a1f44] mb-5 pb-3 border-b border-gray-100">
                    مقالات ذات صلة
                  </h3>
                  <div className="space-y-1">
                    {relatedArticles.length > 0
                      ? relatedArticles.map((rel) => (
                          <ArticleCard key={rel.id} article={rel} variant="horizontal" />
                        ))
                      : articles.slice(0, 3).map((rel) => (
                          <ArticleCard key={rel.id} article={rel} variant="horizontal" />
                        ))}
                  </div>
                </div>

                {/* Most Read */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[#0a1f44] mb-5 pb-3 border-b border-gray-100">
                    الأكثر قراءة
                  </h3>
                  <div className="space-y-4">
                    {articles.slice(0, 4).map((a, i) => (
                      <Link
                        key={a.id}
                        to={`/article/${a.id}`}
                        className="group flex items-start gap-3"
                      >
                        <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 text-xs font-black group-hover:bg-[#c9a227] group-hover:text-white transition-colors">
                          {i + 1}
                        </span>
                        <p className="text-sm text-gray-700 group-hover:text-[#0a1f44] line-clamp-2 leading-relaxed transition-colors">
                          {a.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter mini */}
                <div className="bg-gradient-to-br from-[#0a1f44] to-[#1e3a8a] rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">النشرة الإخبارية</h3>
                  <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                    احصل على أبرز المقالات يومياً في بريدك.
                  </p>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                    <input
                      type="email"
                      placeholder="بريدك الإلكتروني"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 text-sm outline-none focus:border-[#c9a227]"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#c9a227] text-[#0a1f44] font-bold rounded-xl text-sm hover:bg-[#b8911f] transition-colors"
                    >
                      اشتراك
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
