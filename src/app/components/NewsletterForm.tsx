import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#0a1f44] to-[#1e3a8a] py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-[#c9a227] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Send className="w-6 h-6 text-[#0a1f44]" />
        </div>
        <h2
          className="text-white font-black mb-3"
          style={{ fontSize: "1.75rem", lineHeight: "1.3" }}
        >
          ابقَ على اطلاع دائم
        </h2>
        <p className="text-blue-200 mb-8 leading-relaxed">
          اشترك في نشرتنا الإخبارية اليومية واستقبل أبرز المقالات والتحليلات وأخبار العالم العربي مباشرةً في بريدك الإلكتروني.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl p-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div className="text-right">
              <p className="text-white font-bold">تم الاشتراك بنجاح!</p>
              <p className="text-blue-200 text-sm">سنرسل لك أبرز المحتوى يومياً</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 outline-none focus:border-[#c9a227] focus:bg-white/15 transition-all text-sm"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#c9a227] text-[#0a1f44] font-bold rounded-xl hover:bg-[#b8911f] transition-colors text-sm whitespace-nowrap"
            >
              اشتراك مجاني
            </button>
          </form>
        )}
        <p className="text-blue-300 text-xs mt-4">لن نشارك بريدك مع أي طرف ثالث. إلغاء الاشتراك في أي وقت.</p>
      </div>
    </section>
  );
}
