'use client';

import { useState } from "react";
import type { Variant } from "@/lib/types";
import MolViewer from "@/components/MolViewer";

interface Props {
  variant: Variant;
}

type Panel = "structure" | "prediction" | "evidence" | "interpretation";

const panelLabels: { key: Panel; label: string }[] = [
  { key: "structure", label: "Structure" },
  { key: "prediction", label: "Prediction" },
  { key: "evidence", label: "Evidence" },
  { key: "interpretation", label: "Interpretation" },
];

function AlphaMissenseGauge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  let color = "var(--emerald)";
  let lightColor = "var(--emerald-light)";
  let label = "Likely Benign";
  if (score > 0.564) {
    color = "var(--rose)";
    lightColor = "var(--rose-light)";
    label = "Likely Pathogenic";
  } else if (score > 0.34) {
    color = "var(--amber)";
    lightColor = "var(--amber-light)";
    label = "Ambiguous";
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>AlphaMissense</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: lightColor }}>{score.toFixed(2)}</span>
          <span style={{ fontSize: 11, color: lightColor, background: `${color}18`, border: `1px solid ${color}30`, padding: "2px 8px", borderRadius: 99, fontWeight: 500 }}>{label}</span>
        </div>
      </div>
      <div style={{ height: 4, borderRadius: 4, background: "var(--border-2)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.8s ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 10, color: "var(--text-3)" }}>0 · benign</span>
        <span style={{ fontSize: 10, color: "var(--text-3)" }}>1 · pathogenic</span>
      </div>
    </div>
  );
}

function StructurePanel({ variant }: { variant: Variant }) {
  const [selectedPdb, setSelectedPdb] = useState(variant.pdb_ids[0] ?? '');

  const mapLen = 42;
  const domainStart = 712;
  const domainEnd = 979;
  const pct = Math.round(((variant.position - domainStart) / (domainEnd - domainStart)) * mapLen);
  const clampedPct = Math.max(0, Math.min(mapLen - 1, pct));
  const bar = "─".repeat(clampedPct) + "█" + "─".repeat(mapLen - clampedPct - 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>3D Structure</h3>
        {variant.pdb_ids.length > 1 && (
          <div style={{ display: "flex", gap: 4 }}>
            {variant.pdb_ids.map(pdb => (
              <button
                key={pdb}
                onClick={() => setSelectedPdb(pdb)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                  padding: "3px 9px", borderRadius: 5, cursor: "pointer", border: "1px solid",
                  color: selectedPdb === pdb ? "var(--text)" : "var(--text-3)",
                  background: selectedPdb === pdb ? "rgba(79,142,247,0.12)" : "transparent",
                  borderColor: selectedPdb === pdb ? "rgba(79,142,247,0.35)" : "var(--border)",
                  transition: "all 0.12s",
                }}
              >
                {pdb}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedPdb ? (
        <MolViewer
          pdbId={selectedPdb}
          mutationResidue={variant.position}
          mutationLabel={variant.common_name}
        />
      ) : (
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "28px 20px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--text-3)" }}>No PDB structure available for this variant.</p>
        </div>
      )}

      {/* Kinase domain linear map */}
      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 14 }}>
        <p style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          EGFR Kinase Domain (aa 712–979)
        </p>
        <pre className="mono" style={{ fontSize: 9.5, color: "var(--emerald-light)", overflow: "auto", lineHeight: 1.6, margin: 0 }}>
          {`[712${" ".repeat(Math.max(0, clampedPct - 4))}${variant.position}${" ".repeat(Math.max(0, mapLen - clampedPct - 4))}979]\n ${bar}`}
        </pre>
        <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 8 }}>
          aa {variant.position} · Exon {variant.exon}
          {selectedPdb && (
            <> · <a href={`https://www.rcsb.org/structure/${selectedPdb}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--sky-light)", textDecoration: "none" }}>{selectedPdb} on RCSB ↗</a></>
          )}
        </p>
      </div>
    </div>
  );
}

function PredictionPanel({ variant }: { variant: Variant }) {
  const typeColor = variant.type === "sensitizing"
    ? "var(--emerald-light)" : variant.type === "resistance"
    ? "var(--amber-light)" : "var(--sky-light)";
  const typeBg = variant.type === "sensitizing"
    ? "var(--emerald-dim)" : variant.type === "resistance"
    ? "var(--amber-dim)" : "var(--sky-dim)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Computational Predictions</h3>

      {variant.alphamissense_score !== null ? (
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 16 }}>
          <AlphaMissenseGauge score={variant.alphamissense_score} />
        </div>
      ) : (
        <div style={{ color: "var(--text-3)", fontSize: 13, padding: "12px 16px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8 }}>
          AlphaMissense score not available for this variant (insertion/deletion).
        </div>
      )}

      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "Exon", value: String(variant.exon), mono: false },
          { label: "AA Position", value: String(variant.position), mono: true },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-3)" }}>{row.label}</span>
            <span className={row.mono ? "mono" : ""} style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{row.value}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>Type</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", color: typeColor, background: typeBg, padding: "2px 8px", borderRadius: 4 }}>
            {variant.type.replace("_", " ")}
          </span>
        </div>
      </div>

      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 16 }}>
        <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>HGVS Notation</p>
        <p className="mono" style={{ fontSize: 11, color: "var(--text-2)", marginBottom: 6 }}>{variant.hgvs}</p>
        <p className="mono" style={{ fontSize: 11, color: "var(--emerald-light)" }}>{variant.hgvs_protein}</p>
      </div>
    </div>
  );
}

function EvidencePanel({ variant }: { variant: Variant }) {
  const sigColor: Record<string, string> = {
    Pathogenic: "var(--rose-light)",
    "Likely pathogenic": "var(--amber-light)",
    "Drug response": "var(--sky-light)",
    "Uncertain significance": "var(--text-3)",
    "Likely benign": "var(--emerald-light)",
    Benign: "var(--emerald-light)",
  };

  const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
    sensitive: { color: "var(--emerald-light)", bg: "var(--emerald-dim)", border: "rgba(5,150,105,0.22)" },
    resistant: { color: "var(--amber-light)", bg: "var(--amber-dim)", border: "rgba(217,119,6,0.22)" },
    partially_resistant: { color: "var(--sky-light)", bg: "var(--sky-dim)", border: "rgba(2,132,199,0.22)" },
  };

  const formatAF = (af: number | null) => {
    if (af === null) return "N/A";
    if (af < 0.001) return af.toExponential(1);
    return af.toString();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Clinical Evidence</h3>

      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>ClinVar Significance</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: sigColor[variant.clinical_significance] || "var(--text-2)" }}>{variant.clinical_significance}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>gnomAD AF</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--text-2)" }}>{formatAF(variant.gnomad_af)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>Tumor freq. (NSCLC)</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
            {variant.tumor_frequency_nsclc !== null ? `${(variant.tumor_frequency_nsclc * 100).toFixed(1)}%` : "N/A"}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>Open Targets Score</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--violet-light)" }}>
            {variant.open_targets_score !== null ? variant.open_targets_score.toFixed(2) : "N/A"}
          </span>
        </div>
      </div>

      {/* Drug table */}
      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Drug Responses</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Drug", "Gen", "IC50 (nM)", "Status"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-3)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variant.drugs.map((drug, idx) => {
                const ss = statusStyle[drug.status] || { color: "var(--text-2)", bg: "transparent", border: "var(--border)" };
                return (
                  <tr key={drug.name} style={{ borderBottom: idx < variant.drugs.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td style={{ padding: "9px 12px", fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{drug.name}</td>
                    <td style={{ padding: "9px 12px", fontSize: 12, color: "var(--text-3)" }}>{drug.generation !== null ? `Gen ${drug.generation}` : "—"}</td>
                    <td className="mono" style={{ padding: "9px 12px", fontSize: 12, color: "var(--text-2)" }}>{drug.ic50_nm !== null ? drug.ic50_nm : "N/A"}</td>
                    <td style={{ padding: "9px 12px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", color: ss.color, background: ss.bg, border: `1px solid ${ss.border}`, padding: "2px 8px", borderRadius: 99 }}>
                        {drug.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PubMed links */}
      {variant.pubmed_ids.length > 0 && (
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 16 }}>
          <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>PubMed References</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {variant.pubmed_ids.map((pmid) => (
              <a
                key={pmid}
                href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                style={{ fontSize: 11, color: "var(--sky-light)", background: "var(--sky-dim)", border: "1px solid rgba(2,132,199,0.2)", padding: "3px 8px", borderRadius: 4, textDecoration: "none" }}
              >
                PMID {pmid}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InterpretationPanel({ variant }: { variant: Variant }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Interpretation</h3>

      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 20 }}>
        <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8 }}>{variant.interpretation}</p>
      </div>

      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Structural Context</p>
        <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{variant.structure_note}</p>
      </div>

      <div style={{ background: "var(--amber-dim)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 8, padding: "12px 16px" }}>
        <p style={{ fontSize: 12, color: "var(--amber-light)", lineHeight: 1.6 }}>
          Research and educational use only. Not for clinical decision-making. Consult oncology literature and clinical databases for patient care decisions.
        </p>
      </div>
    </div>
  );
}

export default function FourPanelView({ variant }: Props) {
  const [activeTab, setActiveTab] = useState<Panel>("structure");

  return (
    <div>
      {/* Tab bar — horizontally scrollable on mobile */}
      <div style={{
        display: "flex", gap: 0, marginBottom: 20,
        borderBottom: "1px solid var(--border)",
        overflowX: "auto", scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}>
        {panelLabels.map((p) => (
          <button
            key={p.key}
            onClick={() => setActiveTab(p.key)}
            style={{
              padding: "10px 16px", background: "none", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0,
              color: activeTab === p.key ? "var(--text)" : "var(--text-3)",
              borderBottom: activeTab === p.key ? "2px solid var(--emerald)" : "2px solid transparent",
              transition: "all 0.12s",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Mobile: single panel */}
      <div className="flex md:hidden" style={{ flexDirection: "column" }}>
        {activeTab === "structure" && <StructurePanel variant={variant} />}
        {activeTab === "prediction" && <PredictionPanel variant={variant} />}
        {activeTab === "evidence" && <EvidencePanel variant={variant} />}
        {activeTab === "interpretation" && <InterpretationPanel variant={variant} />}
      </div>

      {/* Desktop: 2×2 grid */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          <div key="structure" className="card" style={{ padding: 24 }}><StructurePanel variant={variant} /></div>,
          <div key="prediction" className="card" style={{ padding: 24 }}><PredictionPanel variant={variant} /></div>,
          <div key="evidence" className="card" style={{ padding: 24, overflowY: "auto", maxHeight: 600 }}><EvidencePanel variant={variant} /></div>,
          <div key="interpretation" className="card" style={{ padding: 24 }}><InterpretationPanel variant={variant} /></div>,
        ]}
      </div>
    </div>
  );
}
