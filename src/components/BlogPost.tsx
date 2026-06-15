import Link from "next/link";
import { ReactNode } from "react";
import GiscusComments from "./GiscusComments";

// ─── Colour map ─────────────────────────────────────────────────────────────
const COLOR_MAP: Record<string, { border: string; bg: string }> = {
  helix:   { border: "var(--helix)",   bg: "rgba(79, 142, 247, 0.07)" },
  amber:   { border: "var(--amber)",   bg: "rgba(255, 140, 66, 0.07)" },
  emerald: { border: "var(--emerald)", bg: "rgba(0, 200, 150, 0.07)"  },
  violet:  { border: "var(--violet)",  bg: "rgba(155, 89, 245, 0.07)" },
};

// ─── Section sub-component ────────────────────────────────────────────────────
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "18px",
          fontWeight: 600,
          marginTop: "32px",
          marginBottom: "12px",
          letterSpacing: "-0.01em",
          color: "var(--text)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          lineHeight: 1.85,
          color: "var(--text-2)",
          marginBottom: "16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Callout sub-component ────────────────────────────────────────────────────
export function Callout({
  color = "helix",
  children,
}: {
  color?: "helix" | "amber" | "emerald" | "violet";
  children: ReactNode;
}) {
  const { border, bg } = COLOR_MAP[color] ?? COLOR_MAP.helix;
  return (
    <div
      style={{
        borderLeft: `3px solid ${border}`,
        background: bg,
        padding: "14px 18px",
        borderRadius: "8px",
        fontSize: "13px",
        marginBottom: "20px",
        color: "var(--text-2)",
        lineHeight: 1.7,
      }}
    >
      {children}
    </div>
  );
}

// ─── BlogPost layout ──────────────────────────────────────────────────────────
interface HeroImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

interface BlogPostProps {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  heroImage?: HeroImage;
  children: ReactNode;
}

export default function BlogPost({ title, date, tags, excerpt, heroImage, children }: BlogPostProps) {
  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "40px 24px 80px",
      }}
    >
      {/* Back link */}
      <div style={{ marginBottom: "32px" }}>
        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-3)",
            textDecoration: "none",
            letterSpacing: "0.02em",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "color 0.15s",
          }}
        >
          ← Back to blog
        </Link>
      </div>

      {/* Tag chips */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "var(--text-3)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(24px, 5vw, 32px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          lineHeight: 1.25,
          marginBottom: "12px",
        }}
      >
        {title}
      </h1>

      {/* Date */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--text-3)",
          marginBottom: "24px",
        }}
      >
        {date}
      </p>

      {/* Hero image */}
      {heroImage && (
        <div style={{ marginBottom: "28px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface-2)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            style={{ width: "100%", display: "block", maxHeight: "360px", objectFit: "contain", background: "#f8f9fa" }}
          />
          {(heroImage.caption || heroImage.credit) && (
            <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)" }}>
              {heroImage.caption && (
                <p style={{ fontSize: "12px", color: "var(--text-2)", marginBottom: heroImage.credit ? "2px" : "0", lineHeight: 1.5 }}>
                  {heroImage.caption}
                </p>
              )}
              {heroImage.credit && (
                <p style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-3)" }}>
                  {heroImage.credit}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Excerpt */}
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.75,
          color: "var(--text-2)",
          borderLeft: "3px solid var(--helix)",
          paddingLeft: "16px",
          marginBottom: "32px",
        }}
      >
        {excerpt}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border)",
          marginBottom: "32px",
        }}
      />

      {/* Body */}
      <div>{children}</div>

      {/* Giscus comments */}
      <GiscusComments />

      {/* Footer disclaimer */}
      <div
        style={{
          marginTop: "56px",
          paddingTop: "20px",
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-3)",
          letterSpacing: "0.01em",
        }}
      >
        Research and educational use only. Not for clinical decision-making.
      </div>
    </div>
  );
}
