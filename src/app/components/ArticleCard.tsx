import { Link } from "react-router";
import { Clock, Eye } from "lucide-react";
import { categories } from "../data/mockData";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: { name: string; avatar: string };
  date: string;
  readTime: string;
  category: string;
  subcategory: string;
  image: string;
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

  if (variant === "horizontal") {
    return (
      <Link
        to={`/article/${article.id}`}
        className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
      >
        <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
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
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-3">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
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
        <h3 className="font-bold text-[#0a1f44] line-clamp-2 group-hover:text-[#1e3a8a] transition-colors leading-relaxed mb-2">
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
    return (
      <Link
        to={`/article/${article.id}`}
        className="group block relative overflow-hidden rounded-2xl"
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
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
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-white/30"
              />
              <span className="text-white text-xs font-medium">{article.author.name}</span>
            </div>
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
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {category && (
          <span
            className="absolute top-3 right-3 text-xs font-bold text-white px-2.5 py-1 rounded-full"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#0a1f44] line-clamp-2 group-hover:text-[#1e3a8a] transition-colors leading-relaxed mb-2 text-base">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-xs text-gray-600 font-medium flex-1">{article.author.name}</span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
