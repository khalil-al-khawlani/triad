import { Link } from "react-router";
import { Clock, Eye, FileText } from "lucide-react";
import { categories } from "../data/mockData";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: { name: string; title?: string };
  date: string;
  readTime: string;
  category: string;
  subcategory: string;
  image: string;
  video?: string;
  tags: string[];
  views: string;
  featured?: boolean;
}

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured" | "horizontal";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const category = categories.find(c => c.id === article.category);
  const isOpinionArticle = article.subcategory === "articles";

  if (variant === "horizontal") {
    return (
      <Link
        to={`/article/${article.id}`}
        className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
      >
        {!isOpinionArticle && (
          <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            {article.video ? (
              <video
                src={article.video}
                poster={article.image}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {category && (
            <span
              className="text-xs font-bold mb-1 block"
              style={{ color: category.color }}
            >
              {category.name}
            </span>
          )}
          <h4 className="text-sm font-bold text-[#0a1f44] line-clamp-2 group-hover:text-[#1e3a8a] transition-colors leading-relaxed">
            {article.title}
          </h4>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/article/${article.id}`}
        className={`group block ${isOpinionArticle ? 'bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow' : ''}`}
      >
        {!isOpinionArticle && (
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-3">
            {article.video ? (
              <video
                src={article.video}
                poster={article.image}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {category && (
              <span
                className="absolute top-3 right-3 text-xs font-bold text-white px-2 py-1 rounded-full"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            )}
          </div>
        )}

        {isOpinionArticle && category && (
          <span
            className="inline-block text-xs font-bold text-white px-2 py-1 rounded-full mb-3"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
        )}

        <h3 className={`font-bold text-[#0a1f44] line-clamp-2 group-hover:text-[#1e3a8a] transition-colors leading-relaxed mb-2 ${isOpinionArticle ? 'text-sm' : ''}`}>
          {article.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span>{article.date}</span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    // For featured, we'll keep the image even if it's an opinion article because featured relies on hero imagery
    return (
      <Link
        to={`/article/${article.id}`}
        className="group block relative overflow-hidden rounded-2xl"
      >
        <div className="aspect-[16/9] overflow-hidden">
          {article.video ? (
            <video
              src={article.video}
              poster={article.image}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/90 via-[#0a1f44]/40 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-6">
          {category && (
            <span
              className="text-xs font-bold text-white px-3 py-1 rounded-full mb-3 inline-block"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          )}
          <h2 className="text-white font-bold text-xl sm:text-2xl leading-relaxed mb-3 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-blue-200 text-xs">{article.date}</span>
            <span className="flex items-center gap-1 text-blue-200 text-xs mr-auto">
              <Eye className="w-3 h-3" />
              {article.views}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      to={`/article/${article.id}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {!isOpinionArticle ? (
        <>
          <div className="relative overflow-hidden aspect-[16/10]">
            {article.video ? (
              <video
                src={article.video}
                poster={article.image}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {category && (
              <span
                className="absolute top-3 right-3 text-xs font-bold text-white px-2.5 py-1 rounded-full shadow-sm"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            )}
          </div>
          <div className="bg-white flex-1 flex flex-col p-5">
            <h3 className="text-base font-bold text-[#0a1f44] line-clamp-2 group-hover:text-[#1e3a8a] transition-colors leading-relaxed mb-2">
              {article.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
              {article.excerpt}
            </p>
            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-1 text-xs text-gray-400 w-full">
               <span className="ml-auto flex items-center gap-1">
                 <Clock className="w-3 h-3" />
                 {article.readTime}
               </span>
            </div>
          </div>
        </>
      ) : (
        <div className="relative bg-[#f8fafc] flex-1 flex flex-col p-8 group-hover:bg-[#f1f5f9] transition-colors h-full justify-between overflow-hidden">
          {/* Subtle Watermark Icon */}
          <FileText className="absolute -top-12 -left-12 w-48 h-48 text-gray-200/50 rotate-[-15deg] group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-center">
            {category && (
              <span
                className="inline-block text-[10px] font-black tracking-widest text-[#0a1f44] uppercase mb-6 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm"
                style={{ color: category.color }}
              >
                {category.name}
              </span>
            )}
            
            <h3 className="text-xl font-black text-[#0a1f44] group-hover:text-[#c9a227] transition-colors leading-snug mb-4">
              "{article.title}"
            </h3>
            
            <p className="text-gray-500 text-sm leading-loose line-clamp-4 max-w-sm mx-auto">
              {article.excerpt}
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-gray-200/60 flex items-center justify-between w-full">
            {article.author && (
              <div className="flex items-center gap-3 text-right">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
                   {/* Fallback to initials if no author avatar exists in reality, but mockData authors usually have avatar. We don't have author.avatar in Article interface so we'll just use icon or color */}
                   <div className="w-full h-full bg-[#0a1f44] flex items-center justify-center text-white text-xs font-bold">
                      {article.author.name.charAt(0)}
                   </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0a1f44]">{article.author.name}</span>
                  <span className="text-[10px] text-gray-400">{article.author.title}</span>
                </div>
              </div>
            )}
            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
