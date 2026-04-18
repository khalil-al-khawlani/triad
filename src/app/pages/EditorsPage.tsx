import { Link } from "react-router";
import { editors } from "../data/mockData";
import { Twitter, Linkedin, FileText } from "lucide-react";

export function EditorsPage() {
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-[#0a1f44] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block bg-[#c9a227] text-[#0a1f44] text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              فريق التحرير
            </span>
            <h1
              className="text-white font-black mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.3" }}
            >
              المحررون والكتّاب
            </h1>
            <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed text-lg">
              يضم فريق ترياد نخبة من الصحفيين والمحللين والكتّاب الذين يجمعون بين الخبرة الميدانية والعمق الفكري.
            </p>
          </div>
        </div>
      </div>

      {/* Editors grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Chief editors */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full bg-[#c9a227]" />
              <h2 className="font-black text-[#0a1f44]" style={{ fontSize: "1.375rem" }}>
                القيادة التحريرية
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {editors.slice(0, 2).map((editor) => (
                <div
                  key={editor.id}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <img
                        src={editor.image}
                        alt={editor.name}
                        className="w-24 h-24 rounded-2xl object-cover"
                      />
                      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#c9a227] rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#0a1f44]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-[#0a1f44] text-lg mb-1">{editor.name}</h3>
                      <p className="text-[#c9a227] font-bold text-sm mb-3">{editor.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{editor.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {editor.specialization.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-[#f8fafc] text-[#0a1f44] text-xs font-medium rounded-full border border-gray-100"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={editor.socialLinks.twitter}
                          className="p-2 rounded-lg bg-gray-50 hover:bg-[#1DA1F2] hover:text-white text-gray-400 transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a
                          href={editor.socialLinks.linkedin}
                          className="p-2 rounded-lg bg-gray-50 hover:bg-[#0A66C2] hover:text-white text-gray-400 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <span className="text-xs text-gray-400 mr-auto">
                          {editor.articlesCount} مقال منشور
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rest of editors */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full bg-[#1e3a8a]" />
              <h2 className="font-black text-[#0a1f44]" style={{ fontSize: "1.375rem" }}>
                المحررون المتخصصون
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {editors.slice(2).map((editor) => (
                <div
                  key={editor.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={editor.image}
                      alt={editor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/70 to-transparent" />
                    <div className="absolute bottom-0 right-0 left-0 p-4">
                      <h3 className="text-white font-bold">{editor.name}</h3>
                      <p className="text-[#c9a227] text-xs font-medium">{editor.title}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {editor.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {editor.specialization.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <a
                          href={editor.socialLinks.twitter}
                          className="p-1.5 rounded-lg hover:bg-[#1DA1F2] hover:text-white text-gray-400 transition-colors"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={editor.socialLinks.linkedin}
                          className="p-1.5 rounded-lg hover:bg-[#0A66C2] hover:text-white text-gray-400 transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <span className="text-xs text-gray-400">{editor.articlesCount} مقال</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join team CTA */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-l from-[#1e3a8a] to-[#0a1f44] rounded-3xl p-10 sm:p-14 text-center">
            <h2
              className="text-white font-black mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              انضم إلى فريقنا
            </h2>
            <p className="text-blue-200 mb-8 leading-relaxed max-w-xl mx-auto">
              نبحث دائماً عن أصوات جديدة وأقلام موهوبة تؤمن برسالة الصحافة العربية الراقية. إذا كانت لديك القصة، لدينا المنصة.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-3.5 bg-[#c9a227] text-[#0a1f44] font-bold rounded-xl hover:bg-[#b8911f] transition-colors"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
