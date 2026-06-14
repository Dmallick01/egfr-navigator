'use client';

import { useState } from "react";
import type { DrugPipelineEntry } from "@/lib/types";

interface Props {
  drugs: DrugPipelineEntry[];
}

type Filter = "all" | "approved" | "pipeline" | "withdrawn";

const filterLabels: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "approved", label: "Approved" },
  { key: "pipeline", label: "Pipeline" },
  { key: "withdrawn", label: "Withdrawn" },
];

const statusStyle: Record<string, { color: string; bg: string; border: string; label: string }> = {
  approved: { color: "var(--emerald-light)", bg: "var(--emerald-dim)", border: "rgba(5,150,105,0.22)", label: "Approved" },
  pipeline: { color: "var(--sky-light)", bg: "var(--sky-dim)", border: "rgba(2,132,199,0.22)", label: "Pipeline" },
  withdrawn: { color: "var(--amber-light)", bg: "var(--amber-dim)", border: "rgba(217,119,6,0.22)", label: "Withdrawn" },
  active: { color: "var(--sky-light)", bg: "var(--sky-dim)", border: "rgba(2,132,199,0.22)", label: "Active" },
};

const genStyle: Record<number, { color: string; bg: string }> = {
  1: { color: "var(--text-2)", bg: "var(--surface-2)" },
  2: { color: "var(--sky-light)", bg: "var(--sky-dim)" },
  3: { color: "var(--emerald-light)", bg: "var(--emerald-dim)" },
  4: { color: "var(--violet-light)", bg: "var(--violet-dim)" },
};

// SVG color helpers
const h = (a: number) => `rgba(79,142,247,${a})`;   // helix blue
const am = (a: number) => `rgba(255,140,66,${a})`;  // amber
const g = (a: number) => `rgba(0,200,150,${a})`;    // emerald
const v = (a: number) => `rgba(155,89,245,${a})`;   // violet
const w = (a: number) => `rgba(255,255,255,${a})`;  // white
const r = (a: number) => `rgba(255,80,80,${a})`;    // red

const svgWrap: React.CSSProperties = {
  display: 'block',
  width: '100%',
  borderRadius: 8,
  background: 'rgba(79,142,247,0.03)',
  border: '1px solid rgba(79,142,247,0.09)',
  marginBottom: 12,
};

function Gen1Visual() {
  return (
    <svg viewBox="0 0 200 92" aria-hidden style={svgWrap}>
      {/* Kinase domain body */}
      <ellipse cx="75" cy="48" rx="58" ry="32" fill={h(0.07)} stroke={h(0.20)} strokeWidth="1.5"/>
      {/* ATP pocket walls */}
      <rect x="118" y="30" width="14" height="36" fill={h(0.10)} stroke="none"/>
      <line x1="118" y1="30" x2="118" y2="66" stroke={h(0.25)} strokeWidth="1.2"/>
      <line x1="132" y1="30" x2="132" y2="66" stroke={h(0.25)} strokeWidth="1.2"/>
      {/* TKI inhibitor pill */}
      <rect x="110" y="37" width="14" height="22" rx="7" fill={h(0.72)} stroke={h(0.9)} strokeWidth="1.2"/>
      <text x="117" y="51" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.9)">TKI</text>
      {/* Bidirectional dashed arrows — reversible */}
      <line x1="100" y1="44" x2="138" y2="44" stroke={h(0.42)} strokeWidth="1.1" strokeDasharray="3,2"/>
      <line x1="100" y1="52" x2="138" y2="52" stroke={h(0.42)} strokeWidth="1.1" strokeDasharray="3,2"/>
      <polygon points="104,41 100,44 104,47" fill={h(0.62)}/>
      <polygon points="134,41 138,44 134,47" fill={h(0.62)}/>
      {/* T790M resistance site (asterisk) */}
      <circle cx="74" cy="25" r="5.5" fill={am(0.15)} stroke={am(0.55)} strokeWidth="1.2"/>
      <text x="74" y="28.5" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill={am(0.88)}>*</text>
      <text x="82" y="24" fontSize="7.5" fontFamily="monospace" fill={am(0.68)}>T790M</text>
      {/* EGFR label */}
      <text x="16" y="44" fontSize="10" fontFamily="monospace" fontWeight="600" fill={h(0.82)}>EGFR</text>
      <text x="16" y="56" fontSize="8" fontFamily="monospace" fill={w(0.3)}>kinase</text>
      {/* ATP pocket label */}
      <text x="140" y="40" fontSize="7.5" fontFamily="monospace" fill={h(0.52)}>ATP</text>
      <text x="140" y="52" fontSize="7.5" fontFamily="monospace" fill={h(0.52)}>pocket</text>
      <text x="100" y="88" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={w(0.2)}>reversible · ATP-competitive inhibition</text>
    </svg>
  );
}

function Gen2Visual() {
  return (
    <svg viewBox="0 0 200 92" aria-hidden style={svgWrap}>
      {/* Kinase body */}
      <ellipse cx="72" cy="50" rx="56" ry="32" fill={h(0.07)} stroke={h(0.20)} strokeWidth="1.5"/>
      {/* Pocket */}
      <rect x="112" y="32" width="12" height="36" fill={h(0.11)} stroke="none"/>
      <line x1="112" y1="32" x2="112" y2="68" stroke={h(0.28)} strokeWidth="1.2"/>
      <line x1="124" y1="32" x2="124" y2="68" stroke={h(0.28)} strokeWidth="1.2"/>
      {/* TKI pill */}
      <rect x="105" y="39" width="14" height="22" rx="7" fill={h(0.75)} stroke={h(0.9)} strokeWidth="1.2"/>
      <text x="112" y="53" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.9)">TKI</text>
      {/* Covalent bond — zigzag */}
      <path d="M119 47 L121 44 L124 50 L127 44" stroke={am(0.82)} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Cys773 residue */}
      <circle cx="133" cy="50" r="6" fill={am(0.18)} stroke={am(0.72)} strokeWidth="1.5"/>
      <text x="133" y="54" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fontWeight="700" fill={am(0.92)}>C</text>
      <text x="143" y="44" fontSize="7.5" fontFamily="monospace" fontWeight="600" fill={am(0.75)}>Cys773</text>
      <text x="143" y="55" fontSize="7" fontFamily="monospace" fill={am(0.58)}>covalent ⚡</text>
      {/* EGFR label */}
      <text x="14" y="46" fontSize="10" fontFamily="monospace" fontWeight="600" fill={h(0.82)}>EGFR</text>
      <text x="14" y="58" fontSize="8" fontFamily="monospace" fill={w(0.3)}>kinase</text>
      {/* Pan-HER family */}
      {(['HER2', 'HER4'] as const).map((label, i) => (
        <g key={label}>
          <circle cx={10 + i * 30} cy={80} r={11} fill={h(0.08)} stroke={h(0.22)} strokeWidth="1"/>
          <text x={10 + i * 30} y={84} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={h(0.65)}>{label}</text>
        </g>
      ))}
      <text x="76" y="84" fontSize="7.5" fontFamily="monospace" fill={w(0.28)}>pan-HER · irreversible</text>
    </svg>
  );
}

function Gen3Visual() {
  return (
    <svg viewBox="0 0 200 92" aria-hidden style={svgWrap}>
      {/* Left: mutant EGFR */}
      <text x="50" y="11" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={am(0.65)}>T790M mutant</text>
      <ellipse cx="50" cy="50" rx="40" ry="28" fill={h(0.08)} stroke={h(0.22)} strokeWidth="1.5"/>
      {/* T790M dot */}
      <circle cx="50" cy="27" r="5.5" fill={am(0.2)} stroke={am(0.65)} strokeWidth="1.5"/>
      <text x="50" y="30.5" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill={am(0.9)}>*</text>
      {/* TKI in pocket */}
      <rect x="40" y="43" width="13" height="20" rx="6.5" fill={h(0.75)} stroke={h(0.9)} strokeWidth="1"/>
      <text x="46.5" y="56" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="rgba(255,255,255,0.9)">TKI</text>
      {/* C797 covalent zigzag */}
      <path d="M53 52 L56 49 L59 53 L62 49" stroke={g(0.72)} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <circle cx="66" cy="52" r="4.5" fill={g(0.18)} stroke={g(0.65)} strokeWidth="1.5"/>
      <text x="66" y="55.5" textAnchor="middle" fontSize="5" fontFamily="monospace" fontWeight="700" fill={g(0.9)}>C797</text>
      {/* Divider */}
      <line x1="100" y1="14" x2="100" y2="82" stroke={w(0.09)} strokeWidth="1" strokeDasharray="3,3"/>
      <text x="100" y="10" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={w(0.2)}>vs</text>
      {/* Right: wild-type EGFR (spared) */}
      <text x="150" y="11" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={w(0.38)}>wild-type</text>
      <ellipse cx="150" cy="50" rx="40" ry="28" fill="rgba(255,255,255,0.02)" stroke={w(0.12)} strokeWidth="1.5"/>
      {/* WT TKI (dashed outline — not bound) */}
      <rect x="140" y="43" width="13" height="20" rx="6.5" fill="rgba(255,255,255,0.04)" stroke={w(0.18)} strokeWidth="1" strokeDasharray="2,2"/>
      {/* X over WT binding site */}
      <line x1="136" y1="38" x2="158" y2="60" stroke={r(0.55)} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="158" y1="38" x2="136" y2="60" stroke={r(0.55)} strokeWidth="1.5" strokeLinecap="round"/>
      <text x="150" y="76" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={g(0.55)}>WT spared</text>
      <text x="4" y="90" fontSize="7" fontFamily="monospace" fill={w(0.2)}>mutant-selective · irreversible C797 covalent bond</text>
    </svg>
  );
}

function BispecificAbVisual() {
  return (
    <svg viewBox="0 0 200 92" aria-hidden style={svgWrap}>
      <text x="100" y="7" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={w(0.25)}>ADCC · trogocytosis · receptor blockade</text>
      {/* Y-shape antibody stem */}
      <line x1="100" y1="62" x2="100" y2="82" stroke={h(0.65)} strokeWidth="5" strokeLinecap="round"/>
      {/* Fc region */}
      <rect x="88" y="78" width="24" height="10" rx="4" fill={h(0.18)} stroke={h(0.35)} strokeWidth="1"/>
      {/* Left arm → EGFR */}
      <path d="M100 62 Q80 46 56 30" stroke={h(0.65)} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* Right arm → MET */}
      <path d="M100 62 Q120 46 144 30" stroke={h(0.65)} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* EGFR Fab */}
      <circle cx="50" cy="24" r="16" fill={h(0.14)} stroke={h(0.42)} strokeWidth="1.5"/>
      <text x="50" y="21" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="600" fill={h(0.92)}>EGFR</text>
      <text x="50" y="32" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={h(0.65)}>extracell.</text>
      {/* MET Fab */}
      <circle cx="150" cy="24" r="16" fill={g(0.11)} stroke={g(0.38)} strokeWidth="1.5"/>
      <text x="150" y="21" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="600" fill={g(0.9)}>MET</text>
      <text x="150" y="32" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={g(0.65)}>extracell.</text>
      {/* Cell membrane */}
      <line x1="22" y1="85" x2="178" y2="85" stroke={w(0.14)} strokeWidth="1" strokeDasharray="4,3"/>
      <text x="4" y="84" fontSize="6" fontFamily="monospace" fill={w(0.2)}>membrane</text>
      <text x="100" y="91" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={w(0.2)}>bispecific IgG1 · bypasses kinase domain</text>
    </svg>
  );
}

function PROTACVisual() {
  return (
    <svg viewBox="0 0 200 96" aria-hidden style={{ ...svgWrap, background: 'rgba(155,89,245,0.04)', border: '1px solid rgba(155,89,245,0.12)' }}>
      {/* EGFR warhead box */}
      <rect x="4" y="20" width="56" height="30" rx="6" fill={v(0.12)} stroke={v(0.45)} strokeWidth="1.5"/>
      <text x="32" y="32" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="600" fill={v(0.9)}>EGFR</text>
      <text x="32" y="44" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={v(0.7)}>L858R</text>
      {/* Linker — zigzag chain */}
      <path d="M60 35 Q68 27 76 35 Q84 43 92 35 Q100 27 108 35 Q116 43 124 35 Q132 27 140 35" stroke={v(0.5)} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <text x="100" y="52" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={w(0.22)}>linker</text>
      {/* CRBN E3 ligase box */}
      <rect x="144" y="20" width="52" height="30" rx="6" fill={g(0.10)} stroke={g(0.40)} strokeWidth="1.5"/>
      <text x="170" y="32" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="600" fill={g(0.9)}>CRBN</text>
      <text x="170" y="44" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={g(0.7)}>E3 ligase</text>
      {/* Arrow down: degradation cascade */}
      <line x1="32" y1="50" x2="32" y2="60" stroke={v(0.45)} strokeWidth="1" strokeDasharray="2,2"/>
      <polygon points="29,58 32,63 35,58" fill={v(0.6)}/>
      {/* Ubiquitin chain */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <circle cx={20 + i * 14} cy={72} r={6} fill={am(0.15)} stroke={am(0.5)} strokeWidth="1"/>
          <text x={20 + i * 14} y={75.5} textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill={am(0.85)}>Ub</text>
        </g>
      ))}
      {/* Arrow to proteasome */}
      <line x1="56" y1="72" x2="68" y2="72" stroke={w(0.22)} strokeWidth="1"/>
      <polygon points="66,69 70,72 66,75" fill={w(0.32)}/>
      {/* 26S proteasome barrel (stacked ellipses) */}
      {[0, 1, 2, 3].map(i => (
        <ellipse key={i} cx={83} cy={62 + i * 7} rx={12} ry={4.5} fill={w(0.04)} stroke={w(0.16)} strokeWidth="1"/>
      ))}
      <text x="83" y="92" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={w(0.35)}>26S</text>
      {/* Caption */}
      <text x="140" y="84" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={w(0.2)}>catalytic · sub-stoichiometric</text>
      <text x="140" y="93" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill={w(0.2)}>proteasomal degradation</text>
    </svg>
  );
}

function WithdrawnExon20Visual() {
  return (
    <svg viewBox="0 0 200 92" aria-hidden style={{ ...svgWrap, background: 'rgba(255,140,66,0.04)', border: '1px solid rgba(255,140,66,0.15)' }}>
      {/* Kinase body */}
      <ellipse cx="75" cy="50" rx="56" ry="30" fill="rgba(255,140,66,0.05)" stroke="rgba(255,140,66,0.18)" strokeWidth="1.5"/>
      {/* Exon 20 insertion loop */}
      <path d="M62 34 Q72 14 88 26 Q98 34 86 44" stroke={am(0.6)} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="62" cy="34" r="3" fill={am(0.5)}/>
      <circle cx="86" cy="44" r="3" fill={am(0.5)}/>
      <text x="82" y="17" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={am(0.7)}>Exon 20 ins</text>
      {/* TKI pill */}
      <rect x="108" y="38" width="14" height="22" rx="7" fill="rgba(255,140,66,0.42)" stroke={am(0.7)} strokeWidth="1.2"/>
      <text x="115" y="52" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.85)">TKI</text>
      {/* Covalent binding line */}
      <path d="M108 47 L104 44 L101 49 L98 44" stroke={am(0.55)} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Red diagonal slash overlay */}
      <rect x="0" y="0" width="200" height="92" rx="8" fill={r(0.06)}/>
      <text x="100" y="54" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="700" fill={r(0.65)} transform="rotate(-12 100 54)">WITHDRAWN</text>
      <text x="4" y="87" fontSize="7" fontFamily="monospace" fill={w(0.22)}>EXCLAIM-2 confirmatory trial failed · 2023</text>
    </svg>
  );
}

function DrugVisual({ drug }: { drug: DrugPipelineEntry }) {
  if (drug.name === 'CFT8919') return <PROTACVisual />;
  if (drug.name === 'Amivantamab') return <BispecificAbVisual />;
  if (drug.status === 'withdrawn') return <WithdrawnExon20Visual />;
  if (drug.generation === 2) return <Gen2Visual />;
  if (drug.generation === 3) return <Gen3Visual />;
  if (drug.generation === 1) return <Gen1Visual />;
  return null;
}

export default function DrugPipelineView({ drugs }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = drugs.filter((d) => {
    if (filter === "all") return true;
    if (filter === "pipeline") return d.status === "pipeline" || d.status === "active";
    return d.status === filter;
  });

  const countFor = (f: Filter) => {
    if (f === "all") return drugs.length;
    if (f === "pipeline") return drugs.filter((d) => d.status === "pipeline" || d.status === "active").length;
    return drugs.filter((d) => d.status === f).length;
  };

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid var(--border)" }}>
        {filterLabels.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "8px 16px", background: "none", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 500,
              color: filter === f.key ? "var(--text)" : "var(--text-3)",
              borderBottom: filter === f.key ? "2px solid var(--emerald)" : "2px solid transparent",
              transition: "all 0.12s", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {f.label}
            <span style={{ fontSize: 11, color: filter === f.key ? "var(--text-2)" : "var(--text-3)", background: "rgba(255,255,255,0.06)", padding: "1px 5px", borderRadius: 4 }}>
              {countFor(f.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Drug cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
        {filtered.map((drug) => {
          const ss = statusStyle[drug.status] || statusStyle.pipeline;
          const gs = drug.generation ? genStyle[drug.generation] : null;
          const isFrontier = drug.name === "CFT8919";

          return (
            <div
              key={drug.name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "20px 20px 20px",
                position: "relative",
                borderLeft: isFrontier ? "3px solid var(--violet)" : undefined,
                transition: "border-color 0.15s",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{drug.name}</h2>
                    {drug.brand_name && <span style={{ fontSize: 13, color: "var(--text-3)" }}>({drug.brand_name})</span>}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                    {drug.company}{drug.approved_year && ` · Approved ${drug.approved_year}`}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: ss.color, background: ss.bg, border: `1px solid ${ss.border}`, padding: "3px 9px", borderRadius: 99 }}>
                    {drug.phase}
                  </span>
                  {gs && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: gs.color, background: gs.bg, padding: "3px 9px", borderRadius: 99 }}>
                      {drug.generation === 4 ? "PROTAC" : `Gen ${drug.generation}`}
                    </span>
                  )}
                  {!drug.generation && drug.name === "Amivantamab" && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--violet-light)", background: "var(--violet-dim)", padding: "3px 9px", borderRadius: 99 }}>Bispecific Ab</span>
                  )}
                  {isFrontier && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--violet-light)", background: "var(--violet-dim)", border: "1px solid rgba(124,58,237,0.22)", padding: "3px 9px", borderRadius: 99 }}>BiDAC</span>
                  )}
                </div>
              </div>

              {/* Mechanism visual */}
              <DrugVisual drug={drug} />

              <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8, fontStyle: "italic" }}>Target: {drug.target}</p>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 10 }}>{drug.mechanism}</p>

              <div style={{ background: "var(--surface-2)", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "var(--text-2)", marginBottom: drug.note || drug.nct_id ? 10 : 0 }}>
                <span style={{ color: "var(--text-3)", fontWeight: 500 }}>Indication: </span>{drug.indication}
              </div>

              {drug.nct_id && (
                <a
                  href={`https://clinicaltrials.gov/study/${drug.nct_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, color: "var(--sky-light)", background: "var(--sky-dim)", border: "1px solid rgba(2,132,199,0.2)", padding: "3px 9px", borderRadius: 6, textDecoration: "none", marginBottom: drug.note ? 8 : 0 }}
                >
                  {drug.nct_id} ↗
                </a>
              )}

              {drug.note && (
                <p style={{
                  fontSize: 12, color: drug.status === "withdrawn" ? "var(--amber-light)" : "var(--text-3)",
                  lineHeight: 1.5, marginTop: 4,
                  padding: drug.status === "withdrawn" ? "8px 12px" : 0,
                  background: drug.status === "withdrawn" ? "var(--amber-dim)" : "transparent",
                  borderRadius: drug.status === "withdrawn" ? 6 : 0,
                  border: drug.status === "withdrawn" ? "1px solid rgba(217,119,6,0.2)" : "none",
                }}>
                  {drug.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28, padding: "14px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>
        Note: Mobocertinib (Exkivity) was voluntarily withdrawn by Takeda in 2023 after the EXCLAIM-2 confirmatory trial failed to demonstrate superior benefit over platinum-based chemotherapy.
      </div>
    </div>
  );
}
