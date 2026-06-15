'use client';
import Link from 'next/link';
import { VARIANT_CHIPS, typeColor } from '@/lib/variants';

const demos = [
  {
    href: '/variant/C797S',
    label: 'C797S variant',
    desc: 'Four-panel view — structure, AlphaMissense, ClinVar evidence, and why osimertinib fails here.',
    tag: 'Variant explorer',
  },
  {
    href: '/timeline',
    label: 'Resistance timeline',
    desc: 'Gefitinib → T790M → osimertinib → C797S → PROTAC. Seven nodes, three TKI generations.',
    tag: 'Interactive',
  },
  {
    href: '/lab',
    label: 'In silico lab',
    desc: 'Pair any variant with a drug. Curated IC50 data and mechanism notes from ChEMBL and trial literature.',
    tag: 'Sandbox',
  },
  {
    href: '/drugs',
    label: 'Drug pipeline',
    desc: '20 agents — TKIs, bispecifics, ADCs, and CFT8919 (Phase 1 PROTAC, NCT06641609).',
    tag: 'Pipeline',
  },
];

const tools = [
  { name: 'AlphaMissense', role: 'Pathogenicity scores' },
  { name: 'gnomAD / ClinVar', role: 'Population & clinical variant data' },
  { name: 'ChEMBL', role: 'Drug IC50 & mechanism' },
  { name: '3Dmol.js', role: 'Kinase domain structures' },
  { name: 'Next.js 16', role: 'App architecture' },
  { name: 'Cursor + Claude', role: 'Development workflow' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-grid">
            <div className="fade-up">
              <p className="home-kicker">Portfolio · Oncology · Computational Biology</p>
              <h1 className="home-title">
                Dibakar <span className="home-title-accent">Mallick</span>
              </h1>
              <p className="home-subtitle">
                Medical &amp; Molecular Biology · BCH Choudhury Lab · BIDMC · MCPHS 2026
              </p>
              <p className="home-lead">
                I built EGFR Navigator because I think EGFR is where targeted oncology is headed — not just
                third-generation TKIs, but{' '}
                <Link href="/drugs" className="home-inline-link">PROTAC degraders</Link> that remove the
                protein entirely. CFT8919 is the compound I watch most closely: a bifunctional degrader that
                doesn&apos;t need Cys797 to work.
              </p>
              <div className="home-cta-row">
                <Link href="/lab" className="btn-primary">Try the in silico lab</Link>
                <Link href="/about" className="btn-secondary">About me</Link>
              </div>
            </div>

            <div className="home-project-card fade-up delay-1">
              <p className="home-project-label">Flagship project</p>
              <h2 className="home-project-title">EGFR Navigator</h2>
              <p className="home-project-desc">
                A research reference I designed and built — 10 curated variants, interactive pathway and
                timeline views, a 20-agent drug pipeline, and API integrations across eight public databases.
              </p>
              <div className="home-project-stats">
                <div>
                  <span className="home-stat-value">10</span>
                  <span className="home-stat-label">variants</span>
                </div>
                <div>
                  <span className="home-stat-value">8</span>
                  <span className="home-stat-label">databases</span>
                </div>
                <div>
                  <span className="home-stat-value">20</span>
                  <span className="home-stat-label">drugs</span>
                </div>
              </div>
              <Link href="/blog/building-egfr-navigator" className="home-project-link">
                How I built it →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive demos */}
      <section id="explore" className="section-wrap" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Explore the science</h2>
          <p className="section-desc">
            Interactive modules — not static reference pages. Start anywhere.
          </p>
        </div>
        <div className="demo-grid">
          {demos.map((d) => (
            <Link key={d.href} href={d.href} className="demo-card">
              <span className="demo-tag">{d.tag}</span>
              <h3 className="demo-label">{d.label}</h3>
              <p className="demo-desc">{d.desc}</p>
              <span className="demo-arrow">→</span>
            </Link>
          ))}
        </div>
        <div className="science-links-row">
          {[
            { href: '/cancer-types', label: 'Cancer types' },
            { href: '/snp', label: 'SNPs' },
            { href: '/pathway', label: 'Pathway' },
            { href: '/papers', label: 'Papers' },
            { href: '/blog', label: 'Blog' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="science-pill">
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      {/* PROTAC insight */}
      <section className="section-wrap" style={{ paddingTop: 0 }}>
        <div className="insight-box">
          <div className="insight-content">
            <p className="insight-kicker">Why PROTACs matter</p>
            <p className="insight-text">
              Every TKI generation has been defeated by a point mutation at the active site — T790M, then C797S.
              PROTACs work differently: they recruit an E3 ligase to ubiquitinate and degrade EGFR, so the
              kinase domain conformation becomes irrelevant.{' '}
              <Link href="/blog/c797s-protein-degraders" className="home-inline-link">
                Read my C797S analysis
              </Link>
            </p>
          </div>
          <div className="insight-stat">
            <span className="insight-stat-value">CFT8919</span>
            <span className="insight-stat-sub">Phase 1 · NCT06641609 · CRBN ligase</span>
          </div>
        </div>
      </section>

      {/* Tools & stack */}
      <section className="section-wrap" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Tools I work with</h2>
          <p className="section-desc">
            Wet lab at BCH, clinical research at BIDMC, and computational work across public databases and modern dev tools.
          </p>
        </div>
        <div className="tools-grid">
          {tools.map((t) => (
            <div key={t.name} className="tool-item">
              <span className="tool-name">{t.name}</span>
              <span className="tool-role">{t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Variants */}
      <section className="section-wrap" style={{ paddingBottom: 96 }}>
        <div className="section-header-row">
          <div>
            <h2 className="section-title">EGFR variants</h2>
            <p className="section-desc" style={{ marginBottom: 0 }}>
              10 curated mutations with structure, pathogenicity, and drug sensitivity per allele.
            </p>
          </div>
          <Link href="/variant/L858R" className="view-all-link">
            All variants →
          </Link>
        </div>
        <div className="variant-chips">
          {VARIANT_CHIPS.map((v) => {
            const tc = typeColor[v.type] || typeColor.sensitizing;
            return (
              <Link
                key={v.id}
                href={`/variant/${v.id}`}
                className="variant-chip"
                style={{ background: tc.bg, borderColor: tc.border }}
              >
                <span className="variant-chip-label" style={{ color: tc.c }}>
                  {v.label}
                </span>
                <span className="variant-chip-sub">{v.sub}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
