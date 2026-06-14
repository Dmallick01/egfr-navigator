import Link from 'next/link';
import HeroCanvas from '@/components/HeroCanvas';
import TextScramble from '@/components/TextScramble';

const variants = [
  { id: 'exon19del-E746_A750',        label: 'Exon 19 del',    sub: '~45% of EGFR mut.',   type: 'sensitizing'      },
  { id: 'L858R',                       label: 'L858R',          sub: '~41% of EGFR mut.',   type: 'sensitizing'      },
  { id: 'T790M',                       label: 'T790M',          sub: 'Acquired resistance', type: 'resistance'       },
  { id: 'C797S',                       label: 'C797S',          sub: 'Osimertinib fails',   type: 'resistance'       },
  { id: 'G719A',                       label: 'G719A',          sub: 'Uncommon · Exon 18',  type: 'sensitizing'      },
  { id: 'exon20ins-A767_V769dup',      label: 'Exon 20 ins',    sub: 'TKI-resistant',       type: 'exon20_insertion' },
  { id: 'L861Q',                       label: 'L861Q',          sub: 'Uncommon · Exon 21',  type: 'sensitizing'      },
  { id: 'exon20ins-D770_N771insSVD',   label: 'D770_N771ins',   sub: 'Exon 20 insertion',   type: 'exon20_insertion' },
];

const typeColor: Record<string, { c: string; bg: string; border: string }> = {
  sensitizing:      { c: 'var(--emerald)',  bg: 'var(--emerald-dim)', border: 'rgba(0,200,150,0.22)'  },
  resistance:       { c: 'var(--amber)',    bg: 'var(--amber-dim)',   border: 'rgba(255,140,66,0.22)' },
  exon20_insertion: { c: 'var(--helix)',    bg: 'var(--helix-dim)',   border: 'rgba(79,142,247,0.22)' },
};

const arc = [
  {
    n: '01',
    title: 'Sensitizing Mutation',
    body: 'L858R or exon 19 deletion locks EGFR kinase in the active conformation without ligand. Constitutive MAPK and PI3K-AKT signaling drives uncontrolled proliferation.',
    accent: 'var(--emerald)',
    link: '/variant/L858R',
    next: '→ T790M acquired',
  },
  {
    n: '02',
    title: 'TKI Therapy & Resistance',
    body: 'Three TKI generations battle successive resistance. T790M steric clash overcomes 1st gen. Then C797S abolishes osimertinib\'s covalent bond — leaving no ATP-competitive options.',
    accent: 'var(--helix)',
    link: '/timeline',
    next: '→ C797S acquired',
  },
  {
    n: '03',
    title: 'PROTAC Degradation',
    body: 'CFT8919 bypasses the active site entirely. As a BiDAC, it recruits CRBN E3 ligase, polyubiquitinates mutant EGFR, and sends it to the 26S proteasome — catalytically, sub-stoichiometrically.',
    accent: 'var(--violet)',
    link: '/drugs',
    next: null,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO — full viewport ═══ */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <HeroCanvas />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1144,
          margin: '0 auto',
          padding: '89px 34px 89px',
          width: '100%',
        }}>
          {/* Golden ratio: text lives in 61.8% of width */}
          <div style={{ maxWidth: '61.8%' }}>

            {/* Eyebrow tag */}
            <div className="fade-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 21,
              padding: '5px 13px 5px 6px',
              borderRadius: 99,
              background: 'rgba(79,142,247,0.08)',
              border: '1px solid rgba(79,142,247,0.20)',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--helix)', display: 'inline-block',
                boxShadow: '0 0 8px rgba(79,142,247,0.60)',
              }} />
              <span style={{
                fontSize: 11, fontWeight: 600, color: 'var(--helix)',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>
                EGFR · NSCLC · Precision Oncology
              </span>
            </div>

            {/* Headline — text scramble */}
            <h1 className="fade-up delay-1" style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px,5.5vw,72px)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: 21,
            }}>
              <TextScramble text="One gene." delay={150} duration={800} tag="span" style={{ display: 'block' }} />
              <TextScramble text="One mutation." delay={450} duration={900} tag="span" style={{ display: 'block', color: 'var(--helix)' }} />
              <TextScramble
                text="A decade of resistance."
                delay={850}
                duration={1100}
                tag="span"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(28px,3.6vw,50px)',
                  color: 'var(--text-2)',
                  letterSpacing: '-0.015em',
                }}
              />
            </h1>

            <p className="fade-up delay-2" style={{
              fontSize: 17, color: 'var(--text-2)', lineHeight: 1.70,
              marginBottom: 34, maxWidth: 510,
            }}>
              Explore how a single EGFR kinase mutation determines drug response,
              drives acquired resistance, and is being overcome — from the first TKI
              to PROTAC protein degraders.
            </p>

            {/* CTAs */}
            <div className="fade-up delay-3" style={{ display: 'flex', gap: 13, flexWrap: 'wrap', marginBottom: 55 }}>
              <Link href="/variant/L858R" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 21px',
                background: 'var(--helix)', color: '#fff',
                borderRadius: 8, fontWeight: 600, fontSize: 14,
                textDecoration: 'none', fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.01em',
                boxShadow: '0 0 24px rgba(79,142,247,0.25)',
              }}>
                Explore Variants →
              </Link>
              <Link href="/timeline" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 21px',
                background: 'rgba(79,142,247,0.08)',
                color: 'var(--text)',
                border: '1px solid var(--border-2)',
                borderRadius: 8, fontWeight: 500, fontSize: 14,
                textDecoration: 'none',
                backdropFilter: 'blur(12px)',
              }}>
                Watch Resistance Evolve
              </Link>
            </div>

            {/* Fibonacci scroll hint */}
            <div className="fade-up delay-4" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 1, height: 34,
                background: 'linear-gradient(to bottom, rgba(79,142,247,0.5), transparent)',
              }} />
              <span style={{
                fontSize: 11, color: 'var(--text-3)',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
              }}>
                scroll to explore
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS — Fibonacci 4-col ═══ */}
      <section style={{ maxWidth: 1144, margin: '0 auto', padding: '0 34px 89px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 1, background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 13, overflow: 'hidden',
        }}>
          {[
            { v: '~85%',   l: 'of TKI-responsive EGFR NSCLC', s: 'Exon 19 del + L858R'          },
            { v: '3',      l: 'TKI generations',               s: 'Gefitinib → Osimertinib'       },
            { v: '50–60%', l: 'Acquire T790M',                 s: 'After 1st/2nd gen TKI'         },
            { v: 'CFT8919',l: 'Phase 1 PROTAC',                s: 'NCT06641609 · CRBN E3 ligase'  },
          ].map((s, i) => (
            <div key={i} className="glass" style={{
              padding: '34px 21px', textAlign: 'center',
              borderRadius: 0, border: 'none', boxShadow: 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: s.v.length > 5 ? 22 : 38,
                fontWeight: 700, color: 'var(--text)',
                letterSpacing: '-0.03em', marginBottom: 8,
              }}>
                {s.v}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500, marginBottom: 5 }}>{s.l}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{s.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CURATED VARIANTS ═══ */}
      <section style={{ maxWidth: 1144, margin: '0 auto', padding: '0 34px 89px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 21 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 5 }}>Curated variants</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
              10 EGFR variants with clinical evidence, AlphaMissense scores, and drug sensitivity data
            </p>
          </div>
          <Link href="/variant/L858R" style={{ fontSize: 12, color: 'var(--helix)', textDecoration: 'none', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            view all →
          </Link>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {variants.map(v => {
            const tc = typeColor[v.type] || typeColor.sensitizing;
            return (
              <Link
                key={v.id}
                href={`/variant/${v.id}`}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 4,
                  padding: '10px 16px', borderRadius: 8,
                  background: tc.bg, border: `1px solid ${tc.border}`,
                  textDecoration: 'none', transition: 'all 0.15s',
                  minWidth: 138,
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: tc.c }}>{v.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{v.sub}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ THE ARC — 3 glass cards ═══ */}
      <section style={{ maxWidth: 1144, margin: '0 auto', padding: '0 34px 144px' }}>
        <div style={{ marginBottom: 34 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--text-3)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: 8,
          }}>
            The resistance arc
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            From mutation to PROTAC — in three acts
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 13 }}>
          {arc.map((a, i) => (
            <Link key={i} href={a.link} className="glass" style={{
              padding: '34px 21px', textDecoration: 'none', display: 'block',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Accent top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 21, right: 21,
                height: 2, background: a.accent,
                borderRadius: '0 0 2px 2px', opacity: 0.55,
              }} />
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: a.accent, marginBottom: 13, letterSpacing: '0.06em',
              }}>
                {a.n}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: 17,
                fontWeight: 600, color: 'var(--text)', marginBottom: 13,
              }}>
                {a.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                {a.body}
              </p>
              {a.next && (
                <div style={{
                  marginTop: 21, fontSize: 11,
                  color: 'var(--text-3)', fontFamily: 'var(--font-mono)',
                }}>
                  {a.next}
                </div>
              )}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 21, textAlign: 'center' }}>
          <Link href="/timeline" style={{
            fontSize: 13, color: 'var(--helix)',
            textDecoration: 'none', fontWeight: 500,
          }}>
            See the full resistance timeline →
          </Link>
        </div>
      </section>
    </>
  );
}
