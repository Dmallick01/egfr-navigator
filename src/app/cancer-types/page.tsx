export const metadata = {
  title: "EGFR Alterations Across Cancer Types | EGFR Navigator",
  description:
    "Comprehensive landscape of EGFR mutations, amplifications, and overexpression across all cancer histologies — from NSCLC to GBM, HNSCC, CRC, and rare emerging contexts.",
};

// ─── Data ───────────────────────────────────────────────────────────────────

type CancerRow = {
  name: string;
  shortName: string;
  alterationType: string;
  frequency: string;
  keyDrugs: string;
  stars: 1 | 2 | 3;
  notes: string;
};

const primaryCancers: CancerRow[] = [
  {
    name: "Non-Small Cell Lung Cancer (Adenocarcinoma)",
    shortName: "NSCLC",
    alterationType: "Kinase domain mutation",
    frequency: "10–15% US; 30–40% East Asian",
    keyDrugs: "Gefitinib, Erlotinib, Afatinib, Osimertinib, CFT8919",
    stars: 3,
    notes:
      "L858R (41%) + Exon 19 del (45%) = ~85% of sensitizing mutations. T790M acquired resistance in 50–60% after 1st/2nd gen TKI. C797S follows osimertinib.",
  },
  {
    name: "Glioblastoma (GBM)",
    shortName: "GBM",
    alterationType: "Amplification / EGFRvIII deletion",
    frequency: "EGFRvIII in 45–50% of GBM",
    keyDrugs: "Rindopepimut (vaccine, failed Ph3), Depatux-m",
    stars: 2,
    notes:
      "EGFRvIII is a classical exon 2–7 deletion mutant — NOT a kinase domain mutation. Primary resistance to TKIs. Anti-EGFRvIII strategies under investigation.",
  },
  {
    name: "Head & Neck Squamous Cell Carcinoma",
    shortName: "HNSCC",
    alterationType: "Overexpression (protein level)",
    frequency: "EGFR overexpression 80–90%",
    keyDrugs: "Cetuximab (anti-EGFR mAb), Panitumumab",
    stars: 2,
    notes:
      "No sensitizing kinase mutations (unlike NSCLC). Cetuximab approved with platinum-based chemo or as monotherapy. TKIs not effective in this histology.",
  },
  {
    name: "Colorectal Cancer",
    shortName: "CRC",
    alterationType: "Overexpression / copy number gain",
    frequency: "EGFR overexpression ~80%; kinase mut rare (<1%)",
    keyDrugs: "Cetuximab, Panitumumab (KRAS/NRAS WT only)",
    stars: 2,
    notes:
      "Anti-EGFR antibodies work — but ONLY in KRAS/NRAS wild-type tumors. Sensitizing EGFR kinase mutations are rare unlike NSCLC. RAS mutation = primary resistance to cetuximab.",
  },
];

const secondaryCancers: CancerRow[] = [
  {
    name: "Pancreatic Ductal Adenocarcinoma",
    shortName: "PDAC",
    alterationType: "Overexpression",
    frequency: "EGFR expression ~70%; sensitizing mut rare",
    keyDrugs: "Erlotinib + Gemcitabine (modest OS benefit)",
    stars: 1,
    notes:
      "Only FDA-approved combination with erlotinib. OS benefit ~2 weeks. KRAS mutations dominate PDAC biology — EGFR is a minor player.",
  },
  {
    name: "Breast Cancer (ERBB2/HER2)",
    shortName: "Breast / HER2",
    alterationType: "HER2 amplification (ERBB2 paralog)",
    frequency: "HER2+ ~15–20% of breast cancers",
    keyDrugs: "Trastuzumab, Pertuzumab, T-DM1, Lapatinib (EGFR/HER2 dual)",
    stars: 2,
    notes:
      "ERBB2 (HER2) is in the same receptor family as EGFR (ERBB1). Lapatinib inhibits both EGFR and HER2. True EGFR kinase mutations are rare in breast cancer.",
  },
  {
    name: "Bladder / Urothelial Cancer",
    shortName: "Bladder",
    alterationType: "Overexpression / amplification",
    frequency: "EGFR overexpression ~40%; ERBB2 amp ~10%",
    keyDrugs: "Anti-EGFR approaches in trials; no approved EGFR-specific agent",
    stars: 1,
    notes:
      "EGFR expression correlates with poor prognosis. FGFR3 alterations more dominant. ERBB2 amplification leads to use of HER2-targeted therapies.",
  },
  {
    name: "Gastric / Esophageal Cancer",
    shortName: "Gastric / GEJ",
    alterationType: "ERBB2 (HER2) amplification",
    frequency: "HER2+ ~15–20% gastric; higher in GEJ",
    keyDrugs: "Trastuzumab + chemo (ToGA trial), T-DM1, Trastuzumab deruxtecan",
    stars: 2,
    notes:
      "ERBB2/HER2 amplification is the primary EGFR-family alteration. EGFR overexpression present but EGFR-targeted therapy not approved. Anti-EGFR Abs not effective without biomarker selection.",
  },
  {
    name: "Ovarian Cancer",
    shortName: "Ovarian",
    alterationType: "Amplification / overexpression",
    frequency: "EGFR amplification ~10–15%",
    keyDrugs: "Gefitinib (trials); no approved EGFR agent",
    stars: 1,
    notes:
      "Small subset with EGFR amplification. Clinical benefit from EGFR inhibition has been limited in unselected populations. BRCA and HRD are primary biomarkers.",
  },
];

const rareCancers: CancerRow[] = [
  {
    name: "Thyroid Cancer",
    shortName: "Thyroid",
    alterationType: "Rare EGFR mutation / overexpression",
    frequency: "EGFR mutations <5%; RET/BRAF dominant",
    keyDrugs: "No EGFR-targeted approved; RET/BRAF inhibitors first-line",
    stars: 1,
    notes:
      "RET fusions (papillary) and BRAF V600E are dominant drivers. EGFR plays a minor supportive role. Sorafenib/lenvatinib (multikinase) have some EGFR activity incidentally.",
  },
  {
    name: "Malignant Mesothelioma",
    shortName: "Mesothelioma",
    alterationType: "EGFR expression (no kinase mut)",
    frequency: "EGFR expression ~50%; mutations rare",
    keyDrugs: "Gefitinib (trials, no benefit); Pembrolizumab now preferred",
    stars: 1,
    notes:
      "EGFR expression without sensitizing kinase mutations. TKI trials showed no benefit. NF2/BAP1 are dominant tumor suppressor alterations. Not an EGFR-driven tumor.",
  },
  {
    name: "Cervical Cancer",
    shortName: "Cervical",
    alterationType: "Overexpression",
    frequency: "EGFR overexpression ~50–75%",
    keyDrugs: "No approved EGFR agent; HPV-targeted therapies",
    stars: 1,
    notes:
      "HPV-driven oncogenesis dominates. EGFR overexpression without kinase mutations. PIK3CA alterations common. EGFR inhibition not established as therapeutic strategy.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Stars({ n }: { n: 1 | 2 | 3 }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        letterSpacing: 1,
        color:
          n === 3
            ? "var(--helix)"
            : n === 2
            ? "var(--emerald)"
            : "var(--text-3)",
      }}
    >
      {n >= 1 ? "★" : "☆"}
      {n >= 2 ? "★" : "☆"}
      {n >= 3 ? "★" : "☆"}
    </span>
  );
}

function BadgeTier({ tier }: { tier: "primary" | "secondary" | "rare" }) {
  const map = {
    primary: {
      bg: "rgba(79,142,247,0.13)",
      border: "rgba(79,142,247,0.30)",
      color: "var(--helix)",
      label: "PRIMARY",
    },
    secondary: {
      bg: "rgba(0,200,150,0.10)",
      border: "rgba(0,200,150,0.25)",
      color: "var(--emerald)",
      label: "SECONDARY",
    },
    rare: {
      bg: "rgba(66,79,114,0.18)",
      border: "rgba(66,79,114,0.35)",
      color: "var(--text-3)",
      label: "RARE",
    },
  };
  const s = map[tier];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontSize: 9,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
      }}
    >
      {s.label}
    </span>
  );
}

function TableSection({
  title,
  subtitle,
  tier,
  rows,
  accentColor,
}: {
  title: string;
  subtitle: string;
  tier: "primary" | "secondary" | "rare";
  rows: CancerRow[];
  accentColor: string;
}) {
  return (
    <div style={{ marginBottom: 48 }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 16,
          paddingBottom: 14,
          borderBottom: `1px solid ${accentColor}22`,
        }}
      >
        <div style={{ width: 3, height: 32, borderRadius: 2, background: accentColor, flexShrink: 0 }} />
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 19, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 2 }}>
            {title}
          </h2>
          <p style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Scrollable table wrapper */}
      <div className="cancer-table-scroll">
        <div className="cancer-table-inner">
          {/* Column headers */}
          <div
            className="cancer-col-header"
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr 130px 1fr 60px",
              gap: 12,
              padding: "7px 16px",
              background: "rgba(15,23,42,0.03)",
              borderRadius: "7px 7px 0 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {["Cancer Type", "Alteration", "Frequency", "Key Drugs", "Clinical"].map((h) => (
              <span key={h} style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.09em", fontWeight: 600 }}>
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div className="glass" style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
            {rows.map((row, i) => (
              <div
                key={row.shortName}
                className="cancer-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr 130px 1fr 60px",
                  gap: 12,
                  padding: "14px 16px",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "start",
                }}
              >
                {/* Cancer name */}
                <div>
                  <span className="cancer-row-label" style={{ display: "none" }}>Cancer Type</span>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 5 }}>
                    {row.shortName}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--text-3)", lineHeight: 1.4 }}>
                    {row.name.replace(row.shortName + " ", "").replace(row.shortName, "").trim() || row.name}
                  </div>
                  <div style={{ marginTop: 6 }}><BadgeTier tier={tier} /></div>
                </div>

                {/* Alteration */}
                <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.5 }}>
                  <span className="cancer-row-label" style={{ display: "none" }}>Alteration</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: accentColor, display: "block", marginBottom: 4 }}>
                    {row.alterationType}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.55 }}>{row.notes}</span>
                </div>

                {/* Frequency */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", lineHeight: 1.55 }}>
                  <span className="cancer-row-label" style={{ display: "none" }}>Frequency</span>
                  {row.frequency}
                </div>

                {/* Key drugs */}
                <div style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>
                  <span className="cancer-row-label" style={{ display: "none" }}>Key Drugs</span>
                  {row.keyDrugs}
                </div>

                {/* Stars */}
                <div>
                  <span className="cancer-row-label" style={{ display: "none" }}>Clinical</span>
                  <Stars n={row.stars} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CancerTypesPage() {
  return (
    <div
      className="cancer-page-wrap"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "55px 34px 144px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 55 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-3)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          EGFR Mutation Landscape
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.03em",
            marginBottom: 18,
            lineHeight: 1.08,
          }}
        >
          EGFR Alterations Across Cancer Types
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-2)",
            lineHeight: 1.75,
            maxWidth: 680,
            borderLeft: "2px solid rgba(79,142,247,0.28)",
            paddingLeft: 16,
          }}
        >
          EGFR is altered across many cancer histologies — but the nature of
          the alteration, the clinical relevance, and the therapeutic strategy
          differ dramatically between tumor types. This database maps the full
          landscape: from the kinase-domain sensitizing mutations that define
          NSCLC pharmacogenomics, to overexpression-driven strategies in
          colorectal and head/neck cancers.
        </p>
      </div>

      {/* Legend */}
      <div
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          padding: "12px 20px",
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "var(--text-3)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Legend
        </span>
        {[
          { badge: "primary" as const, desc: "EGFR is a dominant therapeutic target" },
          { badge: "secondary" as const, desc: "EGFR/ERBB family role; other drivers dominant" },
          { badge: "rare" as const, desc: "EGFR expressed; kinase mutations rare or absent" },
        ].map(({ badge, desc }) => (
          <div
            key={badge}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <BadgeTier tier={badge} />
            <span style={{ fontSize: 11, color: "var(--text-2)" }}>{desc}</span>
          </div>
        ))}
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "var(--text-3)",
            }}
          >
            Clinical importance:
          </span>
          {([3, 2, 1] as (1 | 2 | 3)[]).map((n) => (
            <Stars key={n} n={n} />
          ))}
        </div>
      </div>

      {/* Section 1 — Primary */}
      <TableSection
        title="Primary Cancers"
        subtitle="Histologies where EGFR alterations are a dominant therapeutic target"
        tier="primary"
        rows={primaryCancers}
        accentColor="var(--helix)"
      />

      {/* Section 2 — Secondary */}
      <TableSection
        title="Secondary / ERBB Family Context"
        subtitle="EGFR or ERBB2/HER2 play a role; other oncogenic drivers typically dominate"
        tier="secondary"
        rows={secondaryCancers}
        accentColor="var(--emerald)"
      />

      {/* Section 3 — Rare/Emerging */}
      <TableSection
        title="Rare / Emerging Context"
        subtitle="EGFR expressed or occasionally mutated; not an established therapeutic target"
        tier="rare"
        rows={rareCancers}
        accentColor="var(--text-3)"
      />

      {/* Summary callout */}
      <div
        className="glass"
        style={{
          padding: "28px 32px",
          borderLeft: "3px solid var(--helix)",
          marginTop: 16,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--helix)",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Key Distinction
        </div>
        <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.72, maxWidth: 740 }}>
          The critical distinction in EGFR oncology is between{" "}
          <strong style={{ color: "var(--text)" }}>kinase-domain sensitizing mutations</strong> (found
          in NSCLC) — where TKIs directly inhibit the constitutively active kinase — versus{" "}
          <strong style={{ color: "var(--text)" }}>receptor overexpression</strong> (HNSCC, CRC,
          pancreatic) where anti-EGFR antibodies like cetuximab block extracellular ligand
          binding. The pharmacogenomics are fundamentally different. NSCLC TKI resistance
          pathways (T790M, C797S, MET amp) are specific to kinase-domain mutations and do
          not apply to overexpression-driven contexts.
        </p>
      </div>
    </div>
  );
}
