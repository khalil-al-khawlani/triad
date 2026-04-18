import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#0a1f44] rounded-3xl flex items-center justify-center mx-auto mb-8">
          <span className="text-[#c9a227] font-black text-4xl">٤٠٤</span>
        </div>
        <h1 className="font-black text-[#0a1f44] mb-3" style={{ fontSize: "2rem" }}>
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3.5 bg-[#0a1f44] text-white font-bold rounded-xl hover:bg-[#1e3a8a] transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
