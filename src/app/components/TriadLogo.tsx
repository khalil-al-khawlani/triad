interface TriadLogoProps {
  variant?: "navbar" | "footer";
  size?: "sm" | "md" | "lg";
}

export function TriadLogo({ variant = "navbar", size = "md" }: TriadLogoProps) {
  const isFooter = variant === "footer";

  const iconSize = size === "sm" ? 32 : size === "lg" ? 52 : 42;
  const textSize = size === "sm" ? "1.25rem" : size === "lg" ? "2.25rem" : "1.75rem";

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: "10px",
          background: isFooter
            ? "linear-gradient(135deg, #0d2560 0%, #0a1f44 100%)"
            : "linear-gradient(135deg, #0a1f44 0%, #1e3a8a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          boxShadow: isFooter
            ? "0 0 16px rgba(34,211,238,0.3), inset 0 0 12px rgba(34,211,238,0.05)"
            : "0 2px 12px rgba(10,31,68,0.25)",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Triangle */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${iconSize * 0.18}px solid transparent`,
            borderRight: `${iconSize * 0.18}px solid transparent`,
            borderBottom: `${iconSize * 0.22}px solid #22d3ee`,
            marginBottom: 1,
            filter: "drop-shadow(0 0 4px rgba(34,211,238,0.9))",
            position: "relative",
            zIndex: 1,
          }}
        />
        {/* Arabic letter ت */}
        <span
          style={{
            color: "#22d3ee",
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 900,
            fontSize: iconSize * 0.38,
            lineHeight: 1,
            textShadow: "0 0 8px rgba(34,211,238,0.7), 1px 1px 0 rgba(0,60,120,0.8)",
            position: "relative",
            zIndex: 1,
          }}
        >
          ت
        </span>
      </div>

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 900,
            fontSize: textSize,
            color: isFooter ? "#22d3ee" : "#0a1f44",
            letterSpacing: "-0.02em",
            textShadow: isFooter
              ? "2px 2px 0px rgba(0,80,180,0.6), 0 0 20px rgba(34,211,238,0.3)"
              : "none",
            lineHeight: 1.1,
          }}
        >
          ترياد
        </span>
        {size !== "sm" && (
          <span
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 500,
              fontSize: "0.6rem",
              color: isFooter ? "rgba(34,211,238,0.6)" : "#c9a227",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            TRIAD MEDIA
          </span>
        )}
      </div>
    </div>
  );
}

/** Standalone icon-only version (for favicons / compact use) */
export function TriadIcon({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "linear-gradient(135deg, #0a1f44 0%, #1e3a8a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "0 0 16px rgba(34,211,238,0.35)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size * 0.18}px solid transparent`,
          borderRight: `${size * 0.18}px solid transparent`,
          borderBottom: `${size * 0.22}px solid #22d3ee`,
          marginBottom: 1,
          filter: "drop-shadow(0 0 4px rgba(34,211,238,0.9))",
          position: "relative",
          zIndex: 1,
        }}
      />
      <span
        style={{
          color: "#22d3ee",
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 900,
          fontSize: size * 0.38,
          lineHeight: 1,
          textShadow: "0 0 8px rgba(34,211,238,0.7)",
          position: "relative",
          zIndex: 1,
        }}
      >
        ت
      </span>
    </div>
  );
}
