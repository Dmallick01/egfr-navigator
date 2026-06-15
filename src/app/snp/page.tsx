export const metadata = {
  title: "EGFR SNPs & Pharmacogenomics | EGFR Navigator",
  description:
    "Deep research page on EGFR single nucleotide polymorphisms — functional germline variants, pharmacogenomic SNPs in CYP enzymes, population-frequency differences, and gnomAD context.",
};

// ─── Data ───────────────────────────────────────────────────────────────────

type FunctionalSNP = {
  rsId: string;
  location: string;
  alleleChange: string;
  populationAF: string;
  afFrequency: "rare" | "low" | "common";
  functionalEffect: string;
  drugImpact: string;
};

const functionalSNPs: FunctionalSNP[] = [
  {
    rsId: "rs2227983",
    location: "Exon 13, codon 497",
    alleleChange: "Arg→Lys (R497K)",
    populationAF: "~30% (AF varies: higher in Asian pop.)",
    afFrequency: "common",
    functionalEffect:
      "Reduces EGF binding affinity. R497K in the extracellular domain slightly reduces ligand binding, which may alter downstream signaling intensity.",
    drugImpact:
      "Associated with reduced TKI response in some studies. May modify EGFR kinase activation threshold. Studied as a modifier in NSCLC pharmacogenomics.",
  },
  {
    rsId: "rs712829",
    location: "Intron 1 — CA dinucleotide repeat",
    alleleChange: "CA repeat length polymorphism",
    populationAF: "Repeat length varies widely across populations",
    afFrequency: "common",
    functionalEffect:
      "Affects EGFR transcription level. Longer repeat → lower EGFR expression. Shorter repeat → higher expression. Acts as a promoter-region regulatory element.",
    drugImpact:
      "Longer repeats (≥16 CA repeats) correlate with lower EGFR expression and potentially better outcomes with cetuximab in HNSCC and CRC. Used as a predictive biomarker in some studies.",
  },
  {
    rsId: "rs4947478",
    location: "Intron 7",
    alleleChange: "C>T intronic variant",
    populationAF: "AF varies: ~15–40% across populations",
    afFrequency: "low",
    functionalEffect:
      "Common intronic SNP. May affect splicing efficiency or mRNA stability. Studied as a cancer risk modifier in lung and head/neck cancers.",
    drugImpact:
      "Investigated as a prognostic modifier in EGFR-mutant NSCLC cohorts. No direct functional impact on kinase domain established.",
  },
  {
    rsId: "rs11543848",
    location: "Exon 13, codon 521",
    alleleChange: "Arg→Lys (R521K)",
    populationAF: "~5–10%",
    afFrequency: "low",
    functionalEffect:
      "Another functional variant in the extracellular domain near R497K. Further reduces EGF binding. Studied in combination with rs2227983 for cumulative effect on receptor activity.",
    drugImpact:
      "Modest association with cetuximab response in HNSCC. Functional impact less well-characterized than R497K.",
  },
  {
    rsId: "rs1050171",
    location: "Exon 20, codon 787",
    alleleChange: "Gln→Gln synonymous (Q787Q)",
    populationAF: "~30–35% (relatively common)",
    afFrequency: "common",
    functionalEffect:
      "Synonymous coding variant — same amino acid. However, located near a splice site and may affect exon 20 splicing efficiency. Synonymous variants can alter mRNA folding and translation rates.",
    drugImpact:
      "Located in kinase domain exon 20 — the same exon that harbors resistance insertions. No direct TKI resistance role, but studied as background variant in EGFR sequencing panels.",
  },
  {
    rsId: "T790M (germline)",
    location: "Exon 20, codon 790",
    alleleChange: "Thr→Met (T790M) — rarely germline",
    populationAF: "gnomAD AF ≈ very rare (mostly somatic; germline <0.001%)",
    afFrequency: "rare",
    functionalEffect:
      "T790M as a germline SNP causes hereditary predisposition to lung cancer. Rare families carry germline T790M with strong lung cancer risk, particularly in never-smokers. Unlike somatic T790M (acquired after TKI), germline T790M is present in all cells from birth.",
    drugImpact:
      "Germline T790M does NOT confer innate TKI resistance in the same way as somatic T790M. These patients may still respond to osimertinib. Genetic counseling essential. Distinguish from somatic T790M by testing non-tumor tissue.",
  },
];

type PharmacogenomicSNP = {
  gene: string;
  variant: string;
  rsId: string;
  frequency: string;
  effect: string;
  drugRelevance: string;
};

const pharmaSnps: PharmacogenomicSNP[] = [
  {
    gene: "CYP3A4",
    variant: "CYP3A4*22",
    rsId: "rs35599367",
    frequency: "~5–7% (Caucasian)",
    effect:
      "Reduced CYP3A4 enzyme activity. Decreased hepatic metabolism of CYP3A4 substrates.",
    drugRelevance:
      "Osimertinib, gefitinib, erlotinib are all CYP3A4 substrates. *22 carriers have higher drug exposure → increased toxicity risk (diarrhea, rash, hepatotoxicity). Dose reduction may be warranted.",
  },
  {
    gene: "CYP3A5",
    variant: "CYP3A5*3",
    rsId: "rs776746",
    frequency: "~85–90% Caucasian; ~30% in African populations",
    effect:
      "Loss-of-function splice variant. CYP3A5*3/*3 homozygotes = non-expressors; cannot produce functional CYP3A5 protein.",
    drugRelevance:
      "Affects afatinib and osimertinib metabolism. Non-expressors (most Caucasians) rely entirely on CYP3A4. Expressors (common in African/South Asian populations) have additional CYP3A5 metabolic capacity → lower drug levels.",
  },
  {
    gene: "ABCG2",
    variant: "Q141K / 421C>A",
    rsId: "rs2231142",
    frequency: "~35% in East Asian; ~10% Caucasian",
    effect:
      "Reduced ABCG2 efflux transporter activity. ABCG2 normally pumps drugs out of enterocytes and into bile.",
    drugRelevance:
      "Affects gefitinib oral bioavailability. Carriers have reduced intestinal efflux → higher plasma gefitinib exposure. Higher in East Asian populations — coincides with the same populations that have higher EGFR mutation rates. Compound effect on pharmacokinetics.",
  },
  {
    gene: "UGT1A",
    variant: "UGT1A1*28 / TA7",
    rsId: "rs4148323 (related)",
    frequency: "~10–15% homozygous in Caucasian",
    effect:
      "Reduced UGT1A1 glucuronidation activity. Similar to irinotecan toxicity risk in oncology.",
    drugRelevance:
      "Erlotinib undergoes partial glucuronidation via UGT1A. Reduced activity may increase erlotinib exposure and dermatologic toxicity. Less well-characterized than CYP3A4 effects but clinically relevant for erlotinib dosing in patients with Gilbert syndrome.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: "var(--text-3)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {label}
    </div>
  );
}

function AfBadge({ freq }: { freq: "rare" | "low" | "common" }) {
  const map = {
    rare: { bg: "rgba(66,79,114,0.18)", border: "rgba(66,79,114,0.30)", color: "var(--text-3)", label: "RARE" },
    low: { bg: "rgba(255,140,66,0.10)", border: "rgba(255,140,66,0.25)", color: "var(--amber)", label: "LOW AF" },
    common: { bg: "rgba(0,200,150,0.10)", border: "rgba(0,200,150,0.25)", color: "var(--emerald)", label: "COMMON" },
  };
  const s = map[freq];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 7px",
        borderRadius: 4,
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontSize: 9,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: "0.09em",
      }}
    >
      {s.label}
    </span>
  );
}

export default function SNPPage() {
  return (
    <div
      className="snp-page-wrap"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "55px 34px 144px",
      }}
    >
      {/* ─── HEADER ─── */}
      <div style={{ marginBottom: 55 }}>
        <SectionEyebrow label="Germline Genomics · Pharmacogenomics · Population Genetics" />
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
          EGFR SNPs & Pharmacogenomics
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
          The EGFR resistance story is usually told through somatic mutations —
          L858R, T790M, C797S. But germline SNPs shape the background on which
          those somatic events occur: modifying receptor expression, altering
          drug metabolism, and explaining why East Asian patients have a
          fundamentally different EGFR mutation frequency than Western cohorts.
        </p>
      </div>

      {/* ─── INTRO: SNP vs Somatic ─── */}
      <section style={{ marginBottom: 55 }}>
        <SectionEyebrow label="Concepts" />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          SNP vs. Somatic Mutation — The Fundamental Distinction
        </h2>
        <div
          className="snp-2col"
          style={{ marginBottom: 24 }}
        >
          {[
            {
              title: "Germline SNP",
              color: "var(--emerald)",
              points: [
                "Present in every cell of the body from birth",
                "Inherited from parents — passes to offspring",
                "Allele frequency tracked in population databases (gnomAD, 1000 Genomes)",
                "Typically benign or low-penetrance risk modifiers",
                "Detected in blood/saliva (constitutional DNA)",
                "NOT the driver of cancer — background genetic context",
              ],
            },
            {
              title: "Somatic Mutation",
              color: "var(--amber)",
              points: [
                "Acquired in a single cell during a person's lifetime",
                "Present only in the tumor (and its clonal descendants)",
                "AF in gnomAD ≈ 0 (not heritable population variants)",
                "Can be driver mutations (L858R, T790M) or passengers",
                "Detected in tumor tissue or ctDNA",
                "The primary subject of EGFR resistance pharmacology",
              ],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="glass"
              style={{ padding: "20px 24px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: card.color,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                {card.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {card.points.map((p) => (
                  <li
                    key={p}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                      marginBottom: 8,
                      fontSize: 12.5,
                      color: "var(--text-2)",
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      style={{
                        color: card.color,
                        flexShrink: 0,
                        marginTop: 1,
                        fontSize: 10,
                      }}
                    >
                      ▸
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, maxWidth: 760 }}>
          Germline EGFR SNPs affect three things clinically:{" "}
          <strong style={{ color: "var(--text)" }}>
            (1) baseline receptor expression levels
          </strong>{" "}
          that influence tumor biology and drug target abundance,{" "}
          <strong style={{ color: "var(--text)" }}>
            (2) drug metabolism enzyme activity
          </strong>{" "}
          that determines plasma TKI concentrations and toxicity thresholds, and{" "}
          <strong style={{ color: "var(--text)" }}>
            (3) rare hereditary cancer predisposition
          </strong>{" "}
          (germline T790M families). Population databases like gnomAD are the
          essential reference for distinguishing these from somatic drivers.
        </p>
      </section>

      {/* ─── SECTION 1: Functional EGFR SNPs Table ─── */}
      <section style={{ marginBottom: 55 }}>
        <SectionEyebrow label="Section 01 — Functional Variants" />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          EGFR Germline SNPs — Functional Variants
        </h2>

        {/* Scrollable table */}
        <div className="table-scroll">
          <div className="table-scroll-inner" style={{ minWidth: 680 }}>
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "140px 130px 140px 1fr 1fr",
                gap: 12,
                padding: "8px 16px",
                background: "rgba(15,23,42,0.03)",
                borderRadius: "7px 7px 0 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {["SNP ID", "Position", "Allele Change / Pop. AF", "Functional Effect", "Drug Impact"].map((h) => (
                <span key={h} style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.09em", fontWeight: 600 }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Table rows */}
            <div className="glass" style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              {functionalSNPs.map((snp, i) => (
                <div
                  key={snp.rsId}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 130px 140px 1fr 1fr",
                    gap: 12,
                    padding: "14px 16px",
                    borderBottom: i < functionalSNPs.length - 1 ? "1px solid var(--border)" : "none",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 700, color: "var(--helix)", marginBottom: 6 }}>
                      {snp.rsId}
                    </div>
                    <AfBadge freq={snp.afFrequency} />
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-2)", lineHeight: 1.5 }}>
                    {snp.location}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)", marginBottom: 4 }}>
                      {snp.alleleChange}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", lineHeight: 1.5 }}>
                      {snp.populationAF}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>{snp.functionalEffect}</div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>{snp.drugImpact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Pharmacogenomic SNPs ─── */}
      <section style={{ marginBottom: 55 }}>
        <SectionEyebrow label="Section 02 — Drug Metabolism" />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: 14,
          }}
        >
          Pharmacogenomic SNPs — TKI Drug Metabolism
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, maxWidth: 720, marginBottom: 24 }}>
          EGFR TKIs are primarily metabolized by CYP3A4/CYP3A5 enzymes and
          excreted via ABCG2 efflux transporters. Germline SNPs in these genes
          create pharmacokinetic variability — the same dose can produce 2–5×
          different plasma concentrations in different patients, with direct
          consequences for efficacy and toxicity.
        </p>

        <div className="snp-2col">
          {pharmaSnps.map((snp) => (
            <div
              key={snp.rsId}
              className="glass"
              style={{ padding: "20px 22px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--violet)",
                      marginBottom: 2,
                    }}
                  >
                    {snp.gene}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text-2)",
                    }}
                  >
                    {snp.variant}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text-3)",
                    background: "rgba(155,89,245,0.08)",
                    border: "1px solid rgba(155,89,245,0.18)",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}
                >
                  {snp.rsId}
                </span>
              </div>
              <div
                style={{
                  paddingTop: 10,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 4,
                  }}
                >
                  Population freq.
                </div>
                <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 10, fontFamily: "var(--font-mono)" }}>
                  {snp.frequency}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 4,
                  }}
                >
                  Enzyme effect
                </div>
                <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 10 }}>
                  {snp.effect}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    color: "var(--violet)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 4,
                  }}
                >
                  TKI relevance
                </div>
                <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>
                  {snp.drugRelevance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 3: Population Differences ─── */}
      <section style={{ marginBottom: 55 }}>
        <SectionEyebrow label="Section 03 — Population Epidemiology" />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          Population Differences in EGFR Mutation Frequency
        </h2>

        {/* Amber callout */}
        <div
          style={{
            padding: "22px 28px",
            borderRadius: 10,
            background: "rgba(255,140,66,0.07)",
            border: "1px solid rgba(255,140,66,0.22)",
            borderLeft: "3px solid var(--amber)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--amber)",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              marginBottom: 10,
            }}
          >
            Population Context — Critical for EGFR Trial Interpretation
          </div>
          <div className="snp-stats-2col">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "var(--amber)",
                  letterSpacing: "-0.03em",
                  marginBottom: 4,
                }}
              >
                30–40%
              </div>
              <div style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 600, marginBottom: 3 }}>
                East Asian patients
              </div>
              <div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.6 }}>
                Sensitizing EGFR mutations in NSCLC adenocarcinoma. Nearly universal in never-smoking East Asian women with lung adenocarcinoma.
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "var(--text-2)",
                  letterSpacing: "-0.03em",
                  marginBottom: 4,
                }}
              >
                10–15%
              </div>
              <div style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 600, marginBottom: 3 }}>
                Western / Caucasian patients
              </div>
              <div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.6 }}>
                Sensitizing EGFR mutations in NSCLC. Strongly enriched in never-smoker adenocarcinoma but lower baseline frequency.
              </div>
            </div>
          </div>
        </div>

        <div className="snp-2col">
          {[
            {
              title: "Never-Smoker Association",
              color: "var(--emerald)",
              content:
                "EGFR sensitizing mutations (L858R, exon 19 del) are strongly associated with never-smoking adenocarcinoma. Smoking causes different oncogenic drivers (KRAS, TP53). This explains why EGFR-mutant NSCLC disproportionately affects never-smoking women, particularly in East Asia.",
            },
            {
              title: "Germline Context: rs2227983",
              color: "var(--helix)",
              content:
                "The germline SNP rs2227983 (R497K, exon 13) is more common in Asian populations. It modifies EGFR signaling sensitivity — possibly creating a germline background that, in concert with environmental exposures (indoor air pollution, cooking fumes), predisposes the EGFR gene locus to somatic sensitizing mutations. This is an active research area.",
            },
            {
              title: "ABCG2 421C>A Compound Effect",
              color: "var(--violet)",
              content:
                "The ABCG2 efflux transporter SNP (rs2231142) is 3-4× more common in East Asian populations. This increases oral gefitinib bioavailability in this population group. The same patients who more commonly carry EGFR sensitizing mutations also carry pharmacokinetic SNPs that increase TKI exposure — a compounding effect that partly explains superior outcomes in East Asian gefitinib trials.",
            },
            {
              title: "Clinical Trial Generalizability",
              color: "var(--amber)",
              content:
                "Early gefitinib trials (ISEL, BR.21) failed in Western populations but succeeded in East Asian cohorts — not because of drug efficacy differences, but because of patient selection. This led to the mandatory EGFR mutation testing before TKI initiation. The population frequency difference means Western trials need larger enrollment to capture enough EGFR-mutant patients for statistical power.",
            },
          ].map((card) => (
            <div key={card.title} className="glass" style={{ padding: "20px 22px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  color: card.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {card.title}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.7 }}>
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4: gnomAD Context ─── */}
      <section style={{ marginBottom: 55 }}>
        <SectionEyebrow label="Section 04 — Population Database" />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          gnomAD Context — Distinguishing Somatic Drivers from Germline Variants
        </h2>

        {/* Blue callout */}
        <div
          style={{
            padding: "22px 28px",
            borderRadius: 10,
            background: "rgba(79,142,247,0.07)",
            border: "1px solid rgba(79,142,247,0.22)",
            borderLeft: "3px solid var(--helix)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--helix)",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              marginBottom: 10,
            }}
          >
            gnomAD Reference — Genome Aggregation Database (Broad Institute)
          </div>
          <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.72, maxWidth: 720 }}>
            gnomAD aggregates germline whole-exome and whole-genome sequencing
            data from ~800,000 individuals across diverse populations. A variant
            present in gnomAD at allele frequency &gt;0.1% is almost certainly a
            benign germline polymorphism — not a somatic cancer driver. Variants
            with gnomAD AF ≈ 0 that appear in tumors are likely somatic
            acquired mutations. This distinction is fundamental for interpreting
            clinical sequencing reports.
          </p>
        </div>

        {/* gnomAD reference table */}
        <div className="table-scroll">
          <div className="table-scroll-inner" style={{ minWidth: 560 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr 120px 1fr",
                gap: 12,
                padding: "8px 16px",
                background: "rgba(15,23,42,0.03)",
                borderRadius: "7px 7px 0 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {["Variant", "Clinical Role", "gnomAD AF", "Interpretation"].map((h) => (
                <span key={h} style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.09em", fontWeight: 600 }}>
                  {h}
                </span>
              ))}
            </div>
            <div className="glass" style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              {[
                { variant: "L858R", role: "Primary sensitizing mutation (~41% of EGFR-mutant NSCLC)", af: "≈ 0", afColor: "var(--emerald)", interpretation: "Somatic driver. Not in germline population. Acquired in lung cells under oncogenic pressure. Respond to TKIs." },
                { variant: "Exon 19 del", role: "Primary sensitizing mutation (~45% of EGFR-mutant NSCLC)", af: "≈ 0", afColor: "var(--emerald)", interpretation: "Somatic driver (in-frame deletion). Not a germline SNP. No population frequency in gnomAD." },
                { variant: "T790M", role: "Acquired resistance mutation (50–60% after 1st/2nd gen TKI)", af: "Very rare (<0.001%)", afColor: "var(--amber)", interpretation: "Primarily somatic. Rare germline families exist (hereditary lung cancer). If gnomAD AF ≈ 0 in tumor — somatic. Germline T790M: test blood DNA." },
                { variant: "C797S", role: "Osimertinib resistance — abolishes covalent binding", af: "≈ 0", afColor: "var(--emerald)", interpretation: "Acquired resistance mutation. Not germline. Appears after osimertinib pressure specifically." },
                { variant: "R497K (rs2227983)", role: "Germline functional SNP — extracellular domain", af: "~30% (common)", afColor: "var(--text-3)", interpretation: "Benign germline variant. High gnomAD AF confirms germline origin. Not a somatic driver. Risk modifier, not cancer-causing." },
                { variant: "Q787Q (rs1050171)", role: "Synonymous germline SNP — exon 20", af: "~30–35% (common)", afColor: "var(--text-3)", interpretation: "Benign germline variant. Confirmed by high gnomAD AF. Will appear in tumor sequencing as background — should NOT be misinterpreted as a somatic resistance mutation." },
              ].map((row, i, arr) => (
                <div key={row.variant} style={{ display: "grid", gridTemplateColumns: "130px 1fr 120px 1fr", gap: 12, padding: "13px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", alignItems: "start" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{row.variant}</div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>{row.role}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: row.afColor, fontWeight: 600 }}>{row.af}</div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>{row.interpretation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Research Notes ─── */}
      <section style={{ marginBottom: 0 }}>
        <SectionEyebrow label="Section 05 — Research Notes" />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          Why SNPs Matter Beyond the Kinase Mutations
        </h2>
        <div
          className="glass"
          style={{ padding: "28px 32px", borderLeft: "3px solid var(--violet)" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--violet)",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              marginBottom: 16,
            }}
          >
            Personal Research Perspective
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: 760,
            }}
          >
            {[
              "The kinase mutations (L858R, T790M, C797S) get all the attention — and rightly so. They are the direct pharmacological targets and resistance mechanisms. But they do not exist in a vacuum. The germline genomic background determines what drug concentrations the patient can tolerate (CYP3A4/ABCG2 SNPs), how strongly the EGFR receptor is expressed in the first place (Intron 1 CA repeat, rs2227983), and whether the patient belongs to a population group where EGFR mutations are 3× more common (East Asian epidemiology).",
              "The gnomAD framework is what makes this coherent. Once you understand that a common germline variant (AF 30%) in gnomAD is not a cancer driver, and that a somatic mutation with AF ≈ 0 in gnomAD IS a driver, you can read any clinical sequencing report with clarity. The confusion between germline SNPs and somatic mutations is a real clinical problem — particularly for variants like T790M, which can be both.",
              "Population differences in EGFR mutation frequency are a striking example of how germline background and environmental exposure interact with somatic oncogenesis. The rs2227983 / ABCG2 421C>A compound effect in East Asian populations is almost certainly part of the explanation, but the full story involves indoor air pollution, cooking fume exposure, hormonal factors, and possibly lung stem cell biology. It is a reminder that EGFR resistance pharmacology is embedded in a much larger genomic and epidemiologic context.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 13.5,
                  color: "var(--text-2)",
                  lineHeight: 1.78,
                  margin: 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
