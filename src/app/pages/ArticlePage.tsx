import { useParams, Link } from "react-router";
import {
  getArticleById,
  getCategoryBySlug,
  articles,
} from "../data/mockData";
import { ReadingProgressBar } from "../components/ReadingProgressBar";
import { ArticleCard } from "../components/ArticleCard";
import {
  Clock,
  Eye,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState } from "react";

interface GalleryItem {
  src: string;
  caption?: string;
}

interface InlineMediaItem {
  afterHeading: string;
  src: string;
  caption: string;
}

export function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = getArticleById(articleId || "");
  const [resolvedContent, setResolvedContent] = useState("");
  const [isResolvingContent, setIsResolvingContent] = useState(false);
  const contentSource = (article as { contentSource?: string } | undefined)?.contentSource;
  const articleInlineMedia = (article as { inlineMedia?: InlineMediaItem[] } | undefined)?.inlineMedia ?? [];

  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      if (!article) {
        return;
      }

      if (!contentSource) {
        setResolvedContent("");
        setIsResolvingContent(false);
        return;
      }

      setIsResolvingContent(true);

      try {
        const response = await fetch(contentSource);
        const markdown = await response.text();

        if (active) {
          setResolvedContent(markdown);
        }
      } catch {
        if (active) {
          setResolvedContent("");
        }
      } finally {
        if (active) {
          setIsResolvingContent(false);
        }
      }
    };

    loadContent();

    return () => {
      active = false;
    };
  }, [article, contentSource, articleId]);

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

  // Render article content with basic formatting
  const renderContent = (content: string) => {
    const normalizedContent = content.replace(/\r\n/g, "\n");
    const lines = normalizedContent.split("\n");

    const renderInlineText = (text: string) => {
      if (!text.includes("**")) {
        return text;
      }

      const parts = text.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, partIndex) =>
        partIndex % 2 === 1 ? (
          <strong key={partIndex} className="font-bold text-[#0a1f44]">
            {part}
          </strong>
        ) : (
          <span key={partIndex}>{part}</span>
        )
      );
    };

    const renderHeadingBlock = (headingText: string, key: number, level: number) => {
      const headingClassName =
        level === 1
          ? "font-black text-[#0a1f44] mt-10 mb-4"
          : level === 2
            ? "font-bold text-[#0a1f44] mt-8 mb-4"
            : "font-semibold text-[#0a1f44] mt-6 mb-3";

      return (
        <div key={key}>
          <h3
            className={headingClassName}
            style={{ fontSize: level === 1 ? "1.5rem" : level === 2 ? "1.2rem" : "1.05rem", lineHeight: "1.5" }}
          >
            {headingText}
          </h3>
        </div>
      );
    };

    const blocks: Array<React.ReactNode> = [];
    let paragraphLines: string[] = [];
    let listItems: string[] = [];
    let imageCount = 0;

    const flushParagraph = () => {
      if (!paragraphLines.length) {
        return;
      }

      const paragraphText = paragraphLines.join(" ").replace(/\s+/g, " ").trim();
      paragraphLines = [];

      if (!paragraphText) {
        return;
      }

      blocks.push(
        <p
          key={`p-${blocks.length}`}
          className="text-gray-700 leading-loose mb-6"
          style={{ fontSize: "1.0625rem" }}
        >
          {renderInlineText(paragraphText)}
        </p>
      );
    };

    const flushList = () => {
      if (!listItems.length) {
        return;
      }

      const items = listItems;
      listItems = [];

      blocks.push(
        <ul key={`ul-${blocks.length}`} className="list-disc pr-6 space-y-2 text-gray-700 mb-6 leading-loose" style={{ fontSize: "1.0625rem" }}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        flushParagraph();
        flushList();
        return;
      }

      if (trimmedLine === "---") {
        flushParagraph();
        flushList();
        blocks.push(<hr key={`hr-${index}`} className="my-8 border-gray-200" />);
        return;
      }

      const headingMatch = trimmedLine.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        flushParagraph();
        flushList();
        const headingLevel = headingMatch[1].length;
        const headingText = headingMatch[2].trim();
        blocks.push(renderHeadingBlock(headingText, index, headingLevel));
        return;
      }

      const listMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
      if (listMatch) {
        flushParagraph();
        listItems.push(listMatch[1].trim());
        return;
      }

      const imageMatch = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        flushParagraph();
        flushList();
        const imageAlt = imageMatch[1].trim() || article.title;
        const imageSrc = imageMatch[2].trim();
        
        const isInfographic = imageAlt.includes("انفوجرافيك") || imageAlt.includes("إنفوجرافيك");
        
        const floatClass = (imageCount % 2 === 0) ? "sm:float-left sm:ml-4" : "sm:float-right sm:mr-4";
        imageCount += 1;

        const wrapperClass = isInfographic
          ? "my-8 w-full block"
          : `my-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm w-full sm:w-36 md:w-40 aspect-[4/6] ${floatClass}`;
          
        const imgClass = isInfographic
          ? "w-full h-auto object-contain"
          : "w-full h-full object-cover";

        blocks.push(
          <figure
            key={`img-${index}`}
            className={wrapperClass}
          >
            <img
              src={imageSrc}
              alt={imageAlt.replace(/إ?نفوجرافيك:?/, "").trim()}
              className={imgClass}
            />
            {!isInfographic && (
              <figcaption className="px-3 py-2 text-[11px] text-gray-500 bg-gray-50 leading-relaxed">
                {imageAlt}
              </figcaption>
            )}
          </figure>
        );
        return;
      }

      if (trimmedLine.startsWith(">")) {
        flushParagraph();
        flushList();
        blocks.push(
          <blockquote key={`quote-${index}`} className="relative border-r-4 border-[#c9a227] pr-6 my-8">
            <p className="text-[#0a1f44] font-medium leading-relaxed" style={{ fontSize: "1.0625rem" }}>
              {renderInlineText(trimmedLine.replace(/^>\s?/, ""))}
            </p>
          </blockquote>
        );
        return;
      }

      paragraphLines.push(trimmedLine);
    });

    flushParagraph();
    flushList();

    if (imageCount > 0) {
      blocks.push(<div key="image-clear" className="clear-both" />);
    }

    return blocks;
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
                      <div>
                        {/* <p className="font-bold text-[#0a1f44] text-sm">{article.author.name}</p> */}
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

                {/* Article body */}
                <div className="p-6 sm:p-10">
                  <div className="prose-content">
                    {isResolvingContent ? (
                      <div className="text-gray-500 text-sm py-6">جاري تحميل النص الكامل...</div>
                    ) : resolvedContent.trim() ? (
                      renderContent(resolvedContent)
                    ) : (
                      <div className="text-gray-500 text-sm py-6">لا يوجد ملف محتوى مرتبط بهذه المادة.</div>
                    )}
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
