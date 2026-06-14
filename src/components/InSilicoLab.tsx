'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Variant, DrugEntry } from "@/lib/types";

interface Props {
  variants: Variant[];
}

const statusConfig = {
  sensitive: {
    color: "var(--emerald-light)",
    bg: "var(--emerald-dim)",
    border: "rgba(5,150,105,0.25)",
    leftBorder: "var(--emerald)",
    icon: "✓",
    label: "Sensitive",
  },
  resistant: {
    color: "var(--rose-light)",
    bg: "var(--rose-dim, rgba(190,18,60,0.10))",
    border: "rgba(190,18,60,0.25)",
    leftBorder: "var(--rose)",
    icon: "✗",
    label: "Resistant",
  },
  partially_resistant: {
    color: "var(--amber-light)",
    bg: "var(--amber-dim)",
    border: "rgba(217,119,6,0.25)",
    leftBorder: "var(--amber)",
    icon: "~",
    label: "Partially Resistant",
  },
};

export default function InSilicoLab({ variants }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedDrugName, setSelectedDrugName] = useState<string>("");

  const selectedVariant = useMemo(() => variants.find((v) => v.id === selectedVariantId) || null, [variants, selectedVariantId]);
  const availableDrugs: DrugEntry[] = useMemo(() => selectedVariant ? selectedVariant.drugs : [], [selectedVariant]);
  const selectedDrug: DrugEntry | null = useMemo(() => {
    if (!selectedVariant || !selectedDrugName) return null;
    return selectedVariant.drugs.find((d) => d.name === selectedDrugName) || null;
  }, [selectedVariant, selectedDrugName]);

  const handleVariantChange = (id: string) => {
    setSelectedVariantId(id);
    setSelectedDrugName("");
  };

  const typeColor = (type: string) => {
    if (type === "sensitizing") return "var(--emerald-light)";
    if (type === "resistance") return "var(--amber-light)";
    if (type === "exon20_insertion") return "var(--sky-light)";
    return "var(--text-3)";
  };

  const selectStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px",
    background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 8,
    color: "var(--text)", fontSize: 14, cursor: "pointer", appearance: "none",
    fontFamily: "var(--font-body)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.05em",
    color: "var(--text-3)", marginBottom: 8,
  };

  return (
    <div>
      {/* Disclaimer */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 24, fontSize: 12, color: "var(--text-3)" }}>
        Data-driven sandbox: predictions based on curated clinical/biochemical evidence. Not for clinical use.
      </div>

      {/* Selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div>
          <label htmlFor="variant-select" style={labelStyle}>Select Variant</label>
          <select id="variant-select" value={selectedVariantId} onChange={(e) => handleVariantChange(e.target.value)} style={selectStyle}>
            <option value="" style={{ background: "#0B0E17", color: "#4E566A" }}>— choose variant —</option>
            {variants.map((v) => (
              <option key={v.id} value={v.id} style={{ background: "#0B0E17", color: "#F1F5F9" }}>{v.common_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="drug-select" style={labelStyle}>Select Drug</label>
          <select
            id="drug-select"
            value={selectedDrugName}
            onChange={(e) => setSelectedDrugName(e.target.value)}
            disabled={!selectedVariantId}
            style={{ ...selectStyle, cursor: selectedVariantId ? "pointer" : "not-allowed", opacity: selectedVariantId ? 1 : 0.5 }}
          >
            <option value="" style={{ background: "#0B0E17", color: "#4E566A" }}>
              {selectedVariantId ? "— choose drug —" : "— select variant first —"}
            </option>
            {availableDrugs.map((d) => (
              <option key={d.name} value={d.name} style={{ background: "#0B0E17", color: "#F1F5F9" }}>
                {d.name}{d.generation ? ` (Gen ${d.generation})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Variant summary */}
      {selectedVariant && (
        <div className="card" style={{ padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="mono" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{selectedVariant.common_name}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: typeColor(selectedVariant.type), background: `${typeColor(selectedVariant.type)}18`, padding: "2px 8px", borderRadius: 4 }}>
              {selectedVariant.type.replace("_", " ")}
            </span>
          </div>
          <Link href={`/variant/${selectedVariant.id}`} style={{ fontSize: 12, fontWeight: 500, color: "var(--sky-light)", textDecoration: "none" }}>Full profile →</Link>
        </div>
      )}

      {/* Result */}
      {selectedDrug && selectedVariant && (
        <div
          key={`${selectedVariant.id}-${selectedDrug.name}`}
          className="animate-fade-in-up"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: `3px solid ${statusConfig[selectedDrug.status]?.leftBorder || "var(--border-2)"}`,
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, color: statusConfig[selectedDrug.status]?.color || "var(--text)" }}>
              {statusConfig[selectedDrug.status]?.label}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-2)" }}>
              {selectedVariant.common_name} + {selectedDrug.name}
            </div>
          </div>

          <div style={{ background: "var(--surface-2)", borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
            <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Mechanism</p>
            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>{selectedDrug.mechanism}</p>
          </div>

          {selectedDrug.ic50_nm !== null && (
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 2, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>IC50</p>
                <p className="mono" style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: statusConfig[selectedDrug.status]?.color || "var(--text)" }}>
                  {selectedDrug.ic50_nm} nM
                </p>
              </div>
              {selectedDrug.generation !== null && (
                <div>
                  <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 2, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Generation</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>{selectedDrug.generation}</p>
                </div>
              )}
            </div>
          )}

          {selectedDrug.note && (
            <div style={{ background: "var(--surface-2)", borderRadius: 6, padding: "10px 14px", fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>
              {selectedDrug.note}
            </div>
          )}
        </div>
      )}

      {/* Empty states */}
      {!selectedVariantId && (
        <div className="card" style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-3)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, marginBottom: 6, color: "var(--text-2)" }}>Select a variant and drug above</div>
          <div style={{ fontSize: 13 }}>Results are based on curated clinical and biochemical evidence.</div>
        </div>
      )}

      {selectedVariantId && !selectedDrugName && (
        <div className="card" style={{ padding: "28px 24px", textAlign: "center", color: "var(--text-3)", fontSize: 14 }}>
          Now select a drug to see the predicted response for{" "}
          <span className="mono" style={{ color: "var(--text)" }}>{selectedVariant?.common_name}</span>.
        </div>
      )}
    </div>
  );
}
