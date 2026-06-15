import Link from "next/link";
import variantsData from "@/data/curated-variants.json";
import type { Variant } from "@/lib/types";
import FourPanelView from "@/components/FourPanelView";

const variants = variantsData as Variant[];

export async function generateStaticParams() {
  return variants.map((v) => ({ id: v.id }));
}

export default async function VariantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const variant = variants.find((v) => v.id === id);

  if (!variant) {
    return (
      <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
        <div className="card" style={{ padding: "48px 32px" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>
            Variant not found
          </h1>
          <p style={{ color: "var(--text-2)", marginBottom: 24 }}>
            <span className="mono" style={{ color: "var(--amber-light)" }}>{id}</span>{" "}is not in the curated variant set.
          </p>
          <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 20 }}>
            Available variants: {variants.map((v) => v.id).join(", ")}
          </p>
          <Link href="/" style={{ fontSize: 14, color: "var(--emerald-light)", textDecoration: "none", fontWeight: 500 }}>← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="variant-page-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 13, color: "var(--text-3)" }}>
        <Link href="/" style={{ color: "var(--text-3)", textDecoration: "none", transition: "color 0.12s" }}>Home</Link>
        <span style={{ color: "var(--border-2)" }}>/</span>
        <Link href="/variant/L858R" style={{ color: "var(--text-3)", textDecoration: "none" }}>Variants</Link>
        <span style={{ color: "var(--border-2)" }}>/</span>
        <span className="mono" style={{ color: "var(--text-2)", fontWeight: 500 }}>{variant.common_name}</span>
      </nav>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 700, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.02em" }}>
            {variant.common_name}
          </h1>
          <p className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>{variant.hgvs_protein}</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>EGFR · Exon {variant.exon} · {variant.type}</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--emerald-light)", background: "var(--emerald-dim)", border: "1px solid rgba(5,150,105,0.2)", padding: "3px 10px", borderRadius: 99 }}>
            Cached · Research use only
          </span>
        </div>
      </div>

      <FourPanelView variant={variant} />
    </div>
  );
}
