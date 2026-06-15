'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const scienceLinks = [
  { href: "/variant/L858R",  label: "Variants",     matchPrefix: "/variant"      },
  { href: "/cancer-types",   label: "Cancer Types", matchPrefix: "/cancer-types" },
  { href: "/snp",            label: "SNPs",          matchPrefix: "/snp"          },
  { href: "/pathway",        label: "Pathway",       matchPrefix: "/pathway"      },
  { href: "/timeline",       label: "Timeline",      matchPrefix: "/timeline"     },
  { href: "/drugs",          label: "Pipeline",      matchPrefix: "/drugs"        },
  { href: "/lab",            label: "Lab",           matchPrefix: "/lab"          },
];

const workspaceLinks = [
  { href: "/papers", label: "Papers", matchPrefix: "/papers" },
  { href: "/notes",  label: "Research Log",  matchPrefix: "/notes"  },
];

function Caret({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", opacity: 0.55 }}>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DropdownPanel({ links, accentColor }: {
  links: typeof scienceLinks;
  accentColor: string;
}) {
  const pathname = usePathname();
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 6px)", left: 0,
      minWidth: 180, borderRadius: 9,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(15,23,42,0.12)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      padding: "6px", zIndex: 100,
    }}>
      {links.map(l => {
        const active = pathname === l.href || pathname.startsWith(l.matchPrefix);
        return (
          <Link key={l.href} href={l.href} style={{
            display: "block", padding: "8px 12px", borderRadius: 6,
            fontSize: 13, fontWeight: 500, textDecoration: "none",
            color: active ? "var(--text)" : "var(--text-2)",
            background: active ? `rgba(${accentColor},0.08)` : "transparent",
            transition: "background 0.1s",
          }}
          onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(15,23,42,0.04)"; }}
          onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = active ? `rgba(${accentColor},0.08)` : "transparent"; }}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scienceOpen, setScienceOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setScienceOpen(false);
    setWorkspaceOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const scienceActive   = scienceLinks.some(l => pathname.startsWith(l.matchPrefix));
  const workspaceActive = workspaceLinks.some(l => pathname.startsWith(l.matchPrefix));
  const blogActive      = pathname.startsWith("/blog");
  const aboutActive     = pathname === "/about";

  const linkStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500,
    textDecoration: "none",
    color: active ? "var(--text)" : "var(--text-2)",
    background: active ? "rgba(15,23,42,0.06)" : "transparent",
    transition: "all 0.12s", display: "inline-block",
  });

  const btnStyle = (active: boolean): React.CSSProperties => ({
    ...linkStyle(active),
    display: "inline-flex", alignItems: "center", gap: 5,
    border: "none", cursor: "pointer", fontFamily: "inherit",
  });

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      background: scrolled ? "rgba(248,249,250,0.97)" : "rgba(248,249,250,0.85)",
      borderBottom: "1px solid rgba(15,23,42,0.08)",
      boxShadow: scrolled ? "0 1px 0 rgba(15,23,42,0.08)" : "none",
      transition: "background 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 56,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <ellipse cx="8" cy="8" rx="6" ry="4.5" fill="rgba(26,86,219,0.10)" stroke="#1A56DB" strokeWidth="1.3"/>
            <ellipse cx="14" cy="14" rx="6" ry="4.5" fill="rgba(4,120,87,0.10)" stroke="#047857" strokeWidth="1.3"/>
            <path d="M6 10.5 Q11 11 16 11.5" stroke="#1A56DB" strokeWidth="1" strokeDasharray="2,1.5" strokeLinecap="round" opacity="0.7"/>
            <circle cx="14" cy="16.5" r="2" fill="#047857" opacity="0.75"/>
          </svg>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--text)", letterSpacing: "-0.02em" }}>
            EGFR<span style={{ color: "var(--helix)", fontWeight: 400 }}> Navigator</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden-mobile">

          {/* Science dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => { setScienceOpen(true); setWorkspaceOpen(false); }}
            onMouseLeave={() => setScienceOpen(false)}
          >
            <button onClick={() => { setScienceOpen(!scienceOpen); setWorkspaceOpen(false); }} style={btnStyle(scienceActive)}>
              Science <Caret open={scienceOpen} />
            </button>
            {scienceOpen && <DropdownPanel links={scienceLinks} accentColor="26,86,219" />}
          </div>

          {/* Workspace dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => { setWorkspaceOpen(true); setScienceOpen(false); }}
            onMouseLeave={() => setWorkspaceOpen(false)}
          >
            <button onClick={() => { setWorkspaceOpen(!workspaceOpen); setScienceOpen(false); }} style={btnStyle(workspaceActive)}>
              Workspace <Caret open={workspaceOpen} />
            </button>
            {workspaceOpen && <DropdownPanel links={workspaceLinks} accentColor="109,40,217" />}
          </div>

          <Link href="/" style={linkStyle(pathname === "/")}>Home</Link>
          <Link href="/blog"  style={linkStyle(blogActive)}>Blog</Link>
          <Link href="/about" style={linkStyle(aboutActive)}>About</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-2)", padding: "8px", display: "flex", alignItems: "center", borderRadius: 6 }}
          className="show-mobile"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${mobileOpen ? " open" : ""}`}>
        <div style={{ padding: "8px 20px 24px" }}>

          <div style={{ padding: "10px 4px 4px", fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Science
          </div>
          {scienceLinks.map(l => {
            const active = pathname === l.href || pathname.startsWith(l.matchPrefix);
            return (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                display: "flex", alignItems: "center",
                padding: "12px 4px 12px 14px", fontSize: 14,
                color: active ? "var(--helix)" : "var(--text-2)",
                textDecoration: "none", borderBottom: "1px solid var(--border)",
                fontWeight: active ? 600 : 400,
              }}>
                {l.label}
              </Link>
            );
          })}

          <div style={{ padding: "14px 4px 4px", fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Workspace
          </div>
          {workspaceLinks.map(l => {
            const active = pathname.startsWith(l.matchPrefix);
            return (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                display: "flex", alignItems: "center",
                padding: "12px 4px 12px 14px", fontSize: 14,
                color: active ? "var(--violet)" : "var(--text-2)",
                textDecoration: "none", borderBottom: "1px solid var(--border)",
                fontWeight: active ? 600 : 400,
              }}>
                {l.label}
              </Link>
            );
          })}

          {[
            { href: "/blog",  label: "Blog"  },
            { href: "/about", label: "About" },
          ].map(l => {
            const active = pathname.startsWith(`/${l.href.split("/")[1]}`);
            return (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 4px", fontSize: 15,
                fontWeight: active ? 600 : 400,
                color: active ? "var(--text)" : "var(--text-2)",
                textDecoration: "none", borderBottom: "1px solid var(--border)",
              }}>
                {l.label}
                {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--helix)", display: "inline-block" }} />}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
