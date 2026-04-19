import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Twitter, Music2 } from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "البريد الإلكتروني",
      value: "Triad2026@gmail.com",
      link: "mailto:Triad2026@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "الهاتف",
      value: "+966-0000",
      link: "tel:+9660000",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "العنوان",
      value: "المدينة المنورة، المملكة العربية السعودية",
      link: "#",
    },
  ];

  const socialLinks = [
    {
      name: "X (تويتر)",
      icon: <Twitter className="w-4 h-4" />,
      color: "#111111",
      href: "https://x.com/triiad_sa?s=21&t=LFnKEdD2FgJ7K8XoVeWfjg",
      label: "@triiad_sa",
    },
    {
      name: "TikTok",
      icon: <Music2 className="w-4 h-4" />,
      color: "#111111",
      href: "https://www.tiktok.com/@triad_sa?_r=1&_t=ZS-95fUhOBebcT",
      label: "@triad_sa",
    },
  ];

  const topics = [
    "استفسار عام",
    "إعلانات وشراكات",
    "اقتراح موضوع",
    "تصحيح معلومة",
    "الانضمام للفريق",
    "أخرى",
  ];

  return (
    <div className="bg-[#f8fafc]">
      {/* Hero */}
      <div className="bg-[#0a1f44] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-[#c9a227] text-[#0a1f44] text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            تواصل معنا
          </span>
          <h1
            className="text-white font-black mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.3" }}
          >
            نسعد بتواصلك معنا
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto leading-relaxed text-lg">
            سواء كانت لديك قصة تريد مشاركتها، أو اقتراح تودّ تقديمه، أو استفساراً عاماً — فريقنا هنا للاستماع.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
              <h2 className="font-black text-[#0a1f44] mb-6" style={{ fontSize: "1.375rem" }}>
                أرسل رسالتك
              </h2>

              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-bold text-[#0a1f44] text-xl mb-3">تم الإرسال بنجاح!</h3>
                  <p className="text-gray-500 leading-relaxed">
                    شكراً لتواصلك معنا. سيرد عليك فريقنا في غضون ٢٤-٤٨ ساعة عمل.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-8 px-8 py-3 bg-[#0a1f44] text-white font-bold rounded-xl hover:bg-[#1e3a8a] transition-colors"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[#0a1f44] mb-2">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="محمد أحمد"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0a1f44] placeholder-gray-400 outline-none focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10 transition-all text-sm"
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0a1f44] mb-2">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0a1f44] placeholder-gray-400 outline-none focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10 transition-all text-sm"
                        style={{ fontFamily: "'Cairo', sans-serif", direction: "ltr" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0a1f44] mb-2">
                      موضوع الرسالة <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0a1f44] outline-none focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10 transition-all text-sm bg-white"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      <option value="">اختر موضوع الرسالة</option>
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0a1f44] mb-2">
                      نص الرسالة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0a1f44] placeholder-gray-400 outline-none focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10 transition-all text-sm resize-none"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0a1f44] text-white font-bold rounded-xl hover:bg-[#1e3a8a] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0a1f44] mb-5 pb-3 border-b border-gray-100">
                معلومات التواصل
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.link}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-[#0a1f44]/5 rounded-xl flex items-center justify-center text-[#0a1f44] group-hover:bg-[#0a1f44] group-hover:text-[#c9a227] transition-colors flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{info.label}</p>
                      <p className="text-sm font-medium text-[#0a1f44]">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0a1f44] mb-5 pb-3 border-b border-gray-100">
                موقعنا
              </h3>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <iframe
                  title="خريطة المدينة المنورة"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=39.56%2C24.42%2C39.66%2C24.50&layer=mapnik&marker=24.4672%2C39.6111"
                  className="w-full h-48"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Social media */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0a1f44] mb-5 pb-3 border-b border-gray-100">
                تابعنا على وسائل التواصل
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: social.color }}
                    >
                      {social.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0a1f44]">{social.name}</p>
                      <p className="text-xs text-gray-400">{social.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-[#0a1f44] rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">أوقات العمل</h3>
              <div className="space-y-2">
                {[
                  { day: "الأحد — الخميس", time: "٩ صباحاً — ٦ مساءً" },
                  { day: "الجمعة — السبت", time: "مغلق" },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-blue-200 text-sm">{item.day}</span>
                    <span className="text-white text-sm font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-blue-300 text-xs mt-4">
                * تصل الاستجابة إلى الاستفسارات الإلكترونية خلال ٤٨ ساعة عمل
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}