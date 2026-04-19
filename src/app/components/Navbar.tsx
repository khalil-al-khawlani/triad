import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { categories, subcategories } from "../data/mockData";
import { TriadLogo } from "./TriadLogo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileCat, setMobileCat] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0a1f44] text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-blue-200">
            <span>الأحد، ١٨ أبريل ٢٠٢٦</span>
            <span className="hidden sm:block">|</span>
            <span className="hidden sm:block">آخر تحديث: منذ ٥ دقائق</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a href="#" className="hover:text-[#c9a227] transition-colors">عربي</a>
            <span>|</span>
            <a href="#" className="hover:text-[#c9a227] transition-colors">English</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        ref={menuRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        } bg-[#f6faff] border-b border-[#dbe8ff]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Search + Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-[#e9f2ff] transition-colors text-[#0a1f44]"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="lg:hidden p-2 rounded-full hover:bg-[#e9f2ff] transition-colors text-[#0a1f44]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="القائمة"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Center: Nav links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className="px-4 py-2 text-sm text-[#0a1f44] hover:text-[#145e94] hover:bg-[#eaf3ff] rounded-lg font-semibold transition-colors"
              >
                الرئيسية
              </Link>

              <Link
                to="/about"
                className="px-4 py-2 text-sm text-[#0a1f44] hover:text-[#145e94] hover:bg-[#eaf3ff] rounded-lg font-semibold transition-colors"
              >
                من نحن
              </Link>

              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => setMegaMenu(cat.id)}
                  onMouseLeave={() => setMegaMenu(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm text-[#0a1f44] hover:text-[#145e94] hover:bg-[#eaf3ff] rounded-lg font-semibold transition-colors">
                    {cat.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenu === cat.id ? "rotate-180" : ""}`} />
                  </button>

                  {/* Mega Menu */}
                  {megaMenu === cat.id && (
                    <div className="absolute top-full right-0 w-72 bg-[#f9fcff] shadow-2xl rounded-b-xl border-t-2 border-[#22d3ee] z-50 overflow-hidden border border-[#dbe8ff]">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#e2ecff]">
                          <div
                            className="w-2 h-6 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="font-bold text-[#0a1f44]">{cat.name}</span>
                        </div>
                        {/* <p className="text-xs text-gray-500 mb-4 leading-relaxed">{cat.description}</p> */}
                        <div className="space-y-1">
                          {subcategories
                            .filter((sub) => sub.name.trim().length > 0)
                            .map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/category/${cat.slug}/${sub.slug}`}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#ecf4ff] text-gray-700 hover:text-[#0a1f44] transition-colors"
                              onClick={() => setMegaMenu(null)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                              <span className="text-sm">{sub.name.trim()}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/three-d"
                className="px-4 py-2 text-sm text-[#0a1f44] hover:text-[#145e94] hover:bg-[#eaf3ff] rounded-lg font-semibold transition-colors"
              >
                ثري دي
              </Link>
              <Link
                to="/podcast"
                className="px-4 py-2 text-sm text-[#0a1f44] hover:text-[#145e94] hover:bg-[#eaf3ff] rounded-lg font-semibold transition-colors"
              >
                البودكاست
              </Link>
              <Link
                to="/editors"
                className="px-4 py-2 text-sm text-[#0a1f44] hover:text-[#145e94] hover:bg-[#eaf3ff] rounded-lg font-semibold transition-colors"
              >
                المحررون
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-sm text-[#0a1f44] hover:text-[#145e94] hover:bg-[#eaf3ff] rounded-lg font-semibold transition-colors"
              >
                تواصل معنا
              </Link>
            </div>

            {/* Right side: Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <TriadLogo variant="navbar" size="md" />
            </Link>
          </div>
        </div>

        {/* Search bar overlay */}
        {searchOpen && (
          <div className="border-t border-[#dbe8ff] bg-[#f3f8ff]">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <form onSubmit={handleSearch} className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في ترياد..."
                  className="flex-1 bg-transparent outline-none text-[#0a1f44] placeholder-gray-400"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#dbe8ff] bg-[#f8fbff]">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <Link
                to="/"
                className="block px-4 py-3 text-[#0a1f44] font-semibold hover:bg-[#eaf3ff] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 text-[#0a1f44] font-semibold hover:bg-[#eaf3ff] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                من نحن
              </Link>
              {categories.map((cat) => (
                <div key={cat.id}>
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-[#0a1f44] font-semibold hover:bg-[#eaf3ff] rounded-lg"
                    onClick={() => setMobileCat(mobileCat === cat.id ? null : cat.id)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileCat === cat.id ? "rotate-180" : ""}`} />
                    {cat.name}
                  </button>
                  {mobileCat === cat.id && (
                    <div className="mr-4 border-r-2 border-[#dbe8ff] pr-4 mb-2 space-y-1">
                      <Link
                        to={`/category/${cat.slug}`}
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-[#0a1f44] hover:bg-[#eaf3ff] rounded-lg"
                        onClick={() => setMobileOpen(false)}
                      >
                        الكل
                      </Link>
                      {subcategories
                        .filter((sub) => sub.name.trim().length > 0)
                        .map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/category/${cat.slug}/${sub.slug}`}
                          className="block px-3 py-2 text-sm text-gray-700 hover:text-[#0a1f44] hover:bg-[#eaf3ff] rounded-lg"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name.trim()}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/three-d"
                className="block px-4 py-3 text-[#0a1f44] font-semibold hover:bg-[#eaf3ff] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                ثري دي
              </Link>
              <Link
                to="/podcast"
                className="block px-4 py-3 text-[#0a1f44] font-semibold hover:bg-[#eaf3ff] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                البودكاست
              </Link>
              <Link
                to="/editors"
                className="block px-4 py-3 text-[#0a1f44] font-semibold hover:bg-[#eaf3ff] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                المحررون
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-[#0a1f44] font-semibold hover:bg-[#eaf3ff] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}