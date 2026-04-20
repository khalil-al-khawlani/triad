import { editors } from "../data/mockData";

export function EditorsPage() {
  return (
    <div className="bg-[#efefef] min-h-screen pb-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        <div className="text-center mb-10">
          <h1 className="text-[#111111] font-black mb-4" style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)" }}>
            الفريق
          </h1>
          <div className="flex justify-center" aria-hidden="true">
            <svg width="150" height="24" viewBox="0 0 150 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5L19 19L35 5L51 19L67 5L83 19L99 5L115 19L131 5L147 19" stroke="#6b4525" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="space-y-8">
          {editors.map((editor) => (
            <article
              key={editor.id}
              className="bg-white rounded-2xl shadow-sm border border-[#e3e3e3] pt-10 pb-12 px-6 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 left-0 h-2 bg-[#6b4525]" />

              <h2 className="text-[#111111] font-black mb-4" style={{ fontSize: "clamp(1.75rem, 5.5vw, 2.25rem)" }}>
                {editor.name}
              </h2>

              <div className="w-40 h-1.5 bg-[#6b4525] mx-auto rounded-full mb-5" aria-hidden="true" />

              <p className="text-[#727272] font-semibold" style={{ fontSize: "clamp(1.45rem, 4.5vw, 1.8rem)" }}>
                {editor.title}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
