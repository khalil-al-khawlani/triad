import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
  accentColor?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  link,
  linkText = "عرض الكل",
  accentColor = "#c9a227",
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-8 ${centered ? "flex-col items-center text-center" : ""}`}>
      <div className={centered ? "text-center" : ""}>
        <div className="flex items-center gap-3 mb-2" style={{ justifyContent: centered ? "center" : "flex-start" }}>
          <div
            className="w-1 h-8 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <h2
            className="font-black text-[#0a1f44]"
            style={{ fontSize: "1.375rem", lineHeight: "1.4" }}
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1 mr-5">{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          to={link}
          className="flex-shrink-0 flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all duration-200"
          style={{ color: accentColor }}
        >
          {linkText}
          <ArrowLeft className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
