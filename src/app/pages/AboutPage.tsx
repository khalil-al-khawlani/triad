import { Link } from "react-router";
import { IMAGES } from "../data/mockData";
import { Award, Target, Globe, Users, BookOpen, Heart } from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "الموضوعية والدقة",
      description: "نلتزم بتقديم المعلومات بدقة متناهية، مستندين إلى مصادر موثوقة ومتعددة في كل ما ننشر.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "الشمولية والتنوع",
      description: "نحرص على تمثيل أطياف المجتمع العربي كافة، وإتاحة المنبر لأصوات متنوعة ووجهات نظر مختلفة.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "الجودة الاحترافية",
      description: "نضع معايير صارمة للجودة الصحفية والتحريرية، رافضين التسرع على حساب الدقة والعمق.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "خدمة المجتمع",
      description: "رسالتنا في نهاية المطاف خدمة المواطن العربي وتمكينه من معلومات تساعده على اتخاذ قرارات مستنيرة.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "التعليم والتثقيف",
      description: "نؤمن بأن الإعلام الرصين يتجاوز نقل الأخبار إلى تعميق الوعي ونشر المعرفة.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "الهوية والانتماء",
      description: "نفخر بهويتنا العربية ونعمل على صونها وتعزيزها في مواجهة تحديات العولمة.",
    },
  ];

  const triadMethods = [
    {
      num: "1",
      title: "المعايشة التفاعلية",
      subtitle: "D3 — ثلاثي الأبعاد",
      desc: "تجربة تُمكّن القارئ من التجوّل داخل الحدث كأنه يقف داخله، يكتشف من كل زاوية ويتفاعل مع عناصر المشهد.",
      color: "#22d3ee",
      bg: "linear-gradient(135deg, #0a1f44 0%, #1e3a8a 100%)",
    },
    {
      num: "2",
      title: "السرد القصصي",
      subtitle: "الكواليس الإنسانية",
      desc: "تحويل ما خلف الخبر إلى قصة إنسانية بأسلوب قصصي، من خلال عدة نقاط عرض: كيف بدأ الحدث؟ ما المواقف التي حصلت في كواليسه؟",
      color: "#c9a227",
      bg: "linear-gradient(135deg, #7c3f00 0%, #92400e 100%)",
    },
    {
      num: "3",
      title: "البودكاست التحليلي",
      subtitle: "العقل والتأثير",
      desc: "مناقشة الخبر بأسلوب تحليلي ومقارن بين طرق عرض الحدث، وما التأثير الذي تُبديه كل طريقة على عقل الجمهور.",
      color: "#10b981",
      bg: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
    },
  ];

  return (
    <div className="bg-[#f8fafc]">
      {/* Hero */}
      <div className="relative bg-[#0a1f44] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.newsroom} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#c9a227] text-[#0a1f44] text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              من نحن
            </span>
            <h1
              className="text-white font-black mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.3" }}
            >
              منصة إعلامية تروي القصة من ثلاث زوايا
            </h1>
            <p className="text-blue-100 leading-loose text-lg">
              ترياد منصة إعلامية رقمية مبتكرة، تهدف إلى تقديم الخبر الواحد عبر ثلاث روايات متكاملة: المعايشة التفاعلية، والسرد القصصي، والبودكاست التحليلي — لأن كل قصة تستحق أن تُعاش، لا أن تُقرأ فحسب.
            </p>
          </div>
        </div>
      </div>

      {/* Triad Concept */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#0a1f44]/5 text-[#0a1f44] text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              فلسفة ترياد
            </span>
            <h2 className="font-black text-[#0a1f44] mb-4" style={{ fontSize: "1.75rem" }}>
              الخبر الواحد... ثلاث تجارب
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              اخترنا اسم "ترياد" لأنه يرمز إلى تقديم القصة عبر ثلاث روايات مترابطة تشكّل تجربة متكاملة، وتعكس مفهوم الأبعاد الثلاثة في السرد الصحفي.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {triadMethods.map((item) => (
              <div
                key={item.num}
                className="relative rounded-3xl p-8 overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                style={{ background: item.bg }}
              >
                <div
                  className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                >
                  <span className="font-black text-xl" style={{ color: item.color }}>
                    {item.num}
                  </span>
                </div>
                <div className="mt-14">
                  <p className="text-xs font-bold mb-1" style={{ color: item.color }}>
                    {item.subtitle}
                  </p>
                  <h3 className="font-black text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f8fafc] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-[#0a1f44] rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#c9a227]" />
              </div>
              <h2 className="font-black text-[#0a1f44] mb-4" style={{ fontSize: "1.5rem" }}>
                رسالتنا
              </h2>
              <p className="text-gray-600 leading-loose">
                تقديم صحافة عربية متميزة تعتمد على الدقة والموضوعية والعمق، عبر ثلاث أساليب سرد متكاملة تخدم المواطن العربي أينما كان وتعكس الواقع وتستشرف المستقبل.
              </p>
            </div>
            <div className="bg-[#0a1f44] rounded-3xl p-8">
              <div className="w-12 h-12 bg-[#c9a227] rounded-2xl flex items-center justify-center mb-5">
                <Globe className="w-6 h-6 text-[#0a1f44]" />
              </div>
              <h2 className="font-black text-white mb-4" style={{ fontSize: "1.5rem" }}>
                رؤيتنا
              </h2>
              <p className="text-blue-100 leading-loose">
                أن تكون ترياد النموذج الأمثل للإعلام التفاعلي الحديث في العالم العربي، حيث يُعدّ منبراً للحوار الراقي ونقطة مرجعية لكل من يبحث عن المعلومة الصحيحة من زوايا متعددة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      {/* <section className="py-16 bg-gradient-to-l from-[#1e3a8a] to-[#0a1f44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "5M+", label: "قارئ شهري" },
              { num: "22", label: "دولة عربية" },
              { num: "700+", label: "مقال ومحتوى" },
              { num: "30+", label: "صحفي ومحرر" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white/10 rounded-2xl">
                <div
                  className="font-black text-[#c9a227] mb-2"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
                >
                  {stat.num}
                </div>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values */}
      {/* <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-black text-[#0a1f44] mb-3" style={{ fontSize: "1.75rem" }}>
              قيمنا الجوهرية
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              نؤمن بمجموعة من القيم الراسخة التي تُشكّل هويتنا المؤسسية وترسم ملامح عملنا اليومي.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-[#c9a227]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0a1f44]/5 group-hover:bg-[#0a1f44] flex items-center justify-center mb-4 transition-colors text-[#0a1f44] group-hover:text-[#c9a227]">
                  {value.icon}
                </div>
                <h3 className="font-bold text-[#0a1f44] mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="bg-[#0a1f44] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-white font-black mb-4" style={{ fontSize: "1.75rem" }}>
            انضم إلى مجتمع ترياد
          </h2>
          <p className="text-blue-200 mb-8 leading-relaxed">
            سواء كنت قارئاً شغوفاً، أو صحفياً مبدعاً، أو شريكاً محتملاً، أبوابنا مفتوحة دائماً.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#c9a227] text-[#0a1f44] font-bold rounded-xl hover:bg-[#b8911f] transition-colors"
            >
              تواصل معنا
            </Link>
            <Link
              to="/editors"
              className="px-8 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              تعرف على فريقنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
