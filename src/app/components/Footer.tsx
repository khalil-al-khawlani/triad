import { Link } from "react-router";
import { Twitter, Music2, Send } from "lucide-react";
import { categories, subcategories } from "../data/mockData";
import { TriadLogo } from "./TriadLogo";

export function Footer() {
  return (
    <footer className="bg-[#0a1f44] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <TriadLogo variant="footer" size="md" />
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              منصة إعلامية مبتكرة تُقدّم الخبر الواحد بثلاث روايات متكاملة — المعايشة التفاعلية، السرد القصصي، والبودكاست التحليلي.
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  Icon: Twitter,
                  label: "X (تويتر)",
                  href: "https://x.com/triiad_sa?s=21&t=LFnKEdD2FgJ7K8XoVeWfjg",
                },
                {
                  Icon: Music2,
                  label: "TikTok",
                  href: "https://www.tiktok.com/@triad_sa?_r=1&_t=ZS-95fUhOBebcT",
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#c9a227] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-[#c9a227] mb-5 pb-2 border-b border-white/10">الأقسام</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-blue-200 hover:text-[#c9a227] text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/about" className="text-blue-200 hover:text-[#c9a227] text-sm transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/three-d" className="text-blue-200 hover:text-[#c9a227] text-sm transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
                  ثري دي
                </Link>
              </li>
              
                
              <li>
                <Link to="/editors" className="text-blue-200 hover:text-[#c9a227] text-sm transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
                  المحررون
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-[#c9a227] text-sm transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Subcategories */}
          <div>
            <h4 className="font-bold text-[#c9a227] mb-5 pb-2 border-b border-white/10">أنواع المحتوى</h4>
            <ul className="space-y-3">
              {subcategories.map((sub) => (
                <li key={sub.id}>
                  <span className="text-blue-200 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
                    {sub.name}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="font-bold text-[#c9a227] mb-5 pb-2 border-b border-white/10">السياسات</h4>
              <ul className="space-y-3">
                {["سياسة الخصوصية", "شروط الاستخدام", "سياسة النشر"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-[#c9a227] text-sm transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-[#c9a227] mb-5 pb-2 border-b border-white/10">النشرة الإخبارية</h4>
            <p className="text-blue-200 text-sm mb-5 leading-relaxed">
              اشترك في نشرتنا اليومية واستقبل أبرز الأخبار والتحليلات مباشرةً في بريدك.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 text-sm outline-none focus:border-[#c9a227] transition-colors"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#c9a227] text-[#0a1f44] font-bold rounded-lg hover:bg-[#b8911f] transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                اشتراك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-blue-300">
            <span>جميع الحقوق محفوظة © ٢٠٢٦ ترياد</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#c9a227] transition-colors">سياسة الخصوصية</a>
              <span>|</span>
              <a href="#" className="hover:text-[#c9a227] transition-colors">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}