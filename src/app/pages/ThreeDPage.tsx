import { Link } from "react-router";
import { Box, Compass, Layers, ChevronLeft } from "lucide-react";
import { articles } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { SectionHeader } from "../components/SectionHeader";

export function ThreeDPage() {
  const polycamCaptureUrl = "https://poly.cam/capture/7eae9151-cb5b-4463-9d2d-cd326ce0c783";
  const immersiveStories = articles
    .filter((article) => article.subcategory === "reports")
    .slice(0, 6);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="bg-gradient-to-l from-[#1e3a8a] to-[#0a1f44] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white font-medium">ثري دي</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-100 text-sm font-bold mb-5">
              <Box className="w-4 h-4" />
              تجربة تفاعلية
            </span>
            <h1 className="text-white font-black mb-5" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.3" }}>
              ثري دي: عِش الحدث من الداخل
            </h1>
            <p className="text-blue-100 leading-loose text-lg">
              هذه الصفحة تمثل مسار العرض التفاعلي داخل المنصة، حيث يتم تقديم المحتوى بصيغة أقرب إلى التجربة
              البصرية متعددة الزوايا، تمهيدًا لتوسيعها لاحقًا إلى تجارب 360 وبيئات أكثر تفاعلًا.
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "مشاهدة متعددة الزوايا",
              desc: "عرض الحدث بتسلسل بصري يساعد القارئ على استيعاب المشهد الكامل.",
              icon: <Compass className="w-5 h-5" />,
            },
            {
              title: "سرد مكاني أوضح",
              desc: "ربط النص بالصور والعناصر المساعدة لتقليل فجوة الفهم.",
              icon: <Layers className="w-5 h-5" />,
            },
            {
              title: "جاهزية للتطوير",
              desc: "هيكل الصفحة مصمم لاستقبال مزايا العرض ثلاثي الأبعاد لاحقًا.",
              icon: <Box className="w-5 h-5" />,
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

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-12">
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="font-black text-[#0a1f44] mb-2" style={{ fontSize: "clamp(1.2rem, 2vw, 1.7rem)" }}>
              تجربة 3D التفاعلية
            </h2>
            <p className="text-gray-500 leading-relaxed">
              هذا هو نموذج الـ3D المطلوب. يمكنك تدوير المشهد والتكبير والتصغير مباشرة من داخل الصفحة.
            </p>
          </div>

          <div className="p-4 sm:p-6 bg-[#f8fafc]">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black aspect-[16/10]">
              <iframe
                title="Polycam 3D Capture"
                src={polycamCaptureUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={polycamCaptureUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a1f44] text-white text-sm font-bold hover:bg-[#1e3a8a] transition-colors"
              >
                فتح النموذج في Polycam
              </a>
              <span className="text-xs text-gray-500">
                في حال بطء التحميل داخل الصفحة، استخدم الفتح الخارجي.
              </span>
            </div>
          </div>
        </div>

        <SectionHeader
          title="تقارير مناسبة لمسار ثري دي"
          subtitle="محتوى تقريري قابل للتقديم التفاعلي"
          accentColor="#1e3a8a"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {immersiveStories.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
