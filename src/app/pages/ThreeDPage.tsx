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
ظاهرة الكتابة على الجدران.. تباين في الآراء حول تصنيفها كـ "فن شارع" أو "تشويه بصري"            </h1>
            <p className="text-blue-100 leading-loose text-lg">
              تشهد المرافق العامة والأسوار في الآونة الأخيرة تصاعداً في ظاهرة الرسومات وكتابات الجرافيتي، مما أثار جدلاً واسعاً حول تصنيفها بين الفن الحديث "فن الشارع" وبين الممارسات التي تندرج تحت التشويه البصري للمدن.
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

        {/* News Story Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 mb-16 px-6 sm:px-16">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-50 shadow-sm">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80" alt="ميان الجهني" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[#0a1f44] font-bold">ميان عبدالرحمن الجهني</p>
              <p className="text-gray-400 text-sm">محررة ثري دي | ٢١ أبريل ٢٠٢٦</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-loose mb-8 text-lg font-medium">
              ويأتي هذا التباين في ظل سعي الجهات المعنية إلى تحسين المشهد الحضري والقضاء على العشوائيات البصرية، حيث تشير التقارير الميدانية إلى أن تحويل الجدران العامة إلى ساحات للرسم دون تصريح مسبق يربك الجهود الرامية لتنظيم الهوية البصرية للمناطق السكنية والتجارية.
            </p>

            <h3 className="text-[#0a1f44] font-black text-2xl mb-6 mt-10">تباين الآراء بين الفن والتشويه</h3>
            <p className="text-gray-600 leading-loose mb-8">
              من جانبهم، يرى مؤيدو هذا الفن أن "الجرافيتي" يمثل لغة بصرية عالمية تضفي حيوية على الصمت الخرساني، مطالبين بضرورة تخصيص مساحات نظامية تحتضن هذه المواهب وتوجهها بما يخدم الجمال العام. وفي المقابل، يؤكد مختصون في التخطيط الحضري أن الكتابات العشوائية وغير المدروسة تساهم في خفض القيمة الجمالية للمرافق، وتُحمل الميزانيات أعباء إضافية لإزالتها وإعادة طلائها.
            </p>

            <div className="bg-blue-50/50 rounded-2xl p-8 border-r-4 border-[#1e3a8a] my-10">
              <p className="text-[#1e3a8a] font-bold text-xl leading-relaxed italic">
                "الحاجة ملحة لإيجاد ميثاق يجمع بين دعم الإبداع الشبابي وبين الحفاظ على الأنظمة الرسمية، لضمان عدم الانزلاق نحو الفوضى البصرية."
              </p>
            </div>

            <h3 className="text-[#0a1f44] font-black text-2xl mb-6 mt-10">نحو ميثاق بصري مشترك</h3>
            <p className="text-gray-600 leading-loose mb-8">
              وختاماً، تبرز الحاجة إلى إيجاد ميثاق يجمع بين دعم الإبداع الشبابي وبين الحفاظ على الأنظمة الرسمية، وذلك من خلال مبادرات حكومية تتبنى تحويل الجدران الصماء إلى لوحات فنية منظمة، تضمن عدم الانزلاق نحو الفوضى البصرية وتكفل حق المجتمع في بيئة حضارية نظيفة ومنظمة.
            </p>
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
