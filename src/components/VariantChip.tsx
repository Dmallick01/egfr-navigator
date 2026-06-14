'use client';

import Link from "next/link";

interface VariantChipProps {
  id: string;
  label: string;
  type: "sensitizing" | "resistance" | "exon20_insertion" | "uncommon";
}

export default function VariantChip({ id, label, type }: VariantChipProps) {
  const colorMap = {
    sensitizing: { color: "var(--emerald-light)", bg: "var(--emerald-dim)", border: "rgba(5,150,105,0.22)" },
    resistance: { color: "var(--amber-light)", bg: "var(--amber-dim)", border: "rgba(217,119,6,0.22)" },
    exon20_insertion: { color: "var(--sky-light)", bg: "var(--sky-dim)", border: "rgba(2,132,199,0.22)" },
    uncommon: { color: "var(--text-2)", bg: "var(--surface-2)", border: "var(--border-2)" },
  };

  const typeLabel = {
    sensitizing: "sensitizing",
    resistance: "resistance",
    exon20_insertion: "exon 20",
    uncommon: "uncommon",
  };

  const c = colorMap[type];

  return (
    <Link
      href={`/variant/${id}`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 14px", borderRadius: 8,
        border: `1px solid ${c.border}`, background: c.bg,
        textDecoration: "none", transition: "all 0.15s",
      }}
    >
      <span className="mono" style={{ fontWeight: 600, fontSize: 13, color: c.color }}>{label}</span>
      <span style={{ fontSize: 10, fontWeight: 500, color: c.color, background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {typeLabel[type]}
      </span>
    </Link>
  );
}
