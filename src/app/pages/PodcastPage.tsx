import { Link } from "react-router";
import { Mic, Headphones, Radio, ChevronLeft } from "lucide-react";
import { articles } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { SectionHeader } from "../components/SectionHeader";

export function PodcastPage() {
  const podcastEpisodes = articles
    .filter((article) => article.subcategory === "investigations")
    .slice(0, 6);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="bg-gradient-to-l from-[#0a1f44] to-[#0d2560] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white font-medium">البودكاست</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-100 text-sm font-bold mb-5">
              <Mic className="w-4 h-4" />
              بودكاست ترياد
            </span>
            <h1 className="text-white font-black mb-5" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.3" }}>
              البودكاست: تحليل أعمق للخبر
            </h1>
            <p className="text-blue-100 leading-loose text-lg">
              مساحة صوتية مخصصة لشرح خلفيات الأخبار ومناقشة أثرها على الجمهور، عبر حلقات تحليلية
              تعتمد على المقارنة بين طرق عرض الحدث المختلفة.
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "حلقات تحليلية",
              desc: "مناقشة معمقة للسياق، لا تكتفي بسرد الخبر السريع.",
              icon: <Headphones className="w-5 h-5" />,
            },
            {
              title: "زاوية مقارنة",
              desc: "مقارنة بين طريقة العرض النصية والبصرية والصوتية للحدث.",
              icon: <Radio className="w-5 h-5" />,
            },
            {
              title: "لغة أقرب للجمهور",
              desc: "أسلوب حواري واضح يساعد على تبسيط القضايا المركبة.",
              icon: <Mic className="w-5 h-5" />,
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#0a1f44]/5 text-[#0a1f44] flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#0a1f44] mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <SectionHeader
          title="حلقات وتحليلات مقترحة"
          subtitle="محتوى التحقيقات والتحليل الأنسب لمسار البودكاست"
          accentColor="#0a1f44"
        />

        <div className="space-y-2">
          {podcastEpisodes.map((article) => (
            <ArticleCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </section>
    </div>
  );
}
