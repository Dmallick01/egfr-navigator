'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/variant/L858R", label: "Variants" },
  { href: "/timeline", label: "Timeline" },
  { href: "/pathway", label: "Pathway" },
  { href: "/drugs", label: "Pipeline" },
  { href: "/lab", label: "Lab" },
  { href: "/blog", label: "Blog" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      background: scrolled ? "rgba(4,12,32,0.95)" : "rgba(4,12,32,0.65)",
      borderBottom: "1px solid rgba(79,142,247,0.09)",
      transition: "background 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#059669" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="3" fill="#059669" opacity="0.6"/>
            <line x1="10" y1="2" x2="10" y2="5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="15" x2="10" y2="18" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="10" x2="5" y2="10" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="15" y1="10" x2="18" y2="10" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "var(--text)", letterSpacing: "-0.01em" }}>
            EGFR Navigator
          </span>
        </Link>
        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4 }} className="hidden-mobile">
          {links.map(l => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href.split("/")[1] ? `/${l.href.split("/")[1]}` : l.href));
            return (
              <Link key={l.href} href={l.href} style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: "none",
                color: active ? "var(--text)" : "var(--text-2)",
                background: active ? "rgba(255,255,255,0.07)" : "transparent",
                transition: "all 0.12s",
              }}>{l.label}</Link>
            );
          })}
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-2)", padding: 4, fontSize: 18 }} className="show-mobile" aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "8px 24px 16px" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 14, color: "var(--text-2)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`.hidden-mobile { display: flex; } .show-mobile { display: none; } @media (max-width: 640px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }`}</style>
    </nav>
  );
}
