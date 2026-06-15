import Link from "next/link";

export default function AboutPage() {
  const sectionDivider: React.CSSProperties = {
    height: "1px",
    background: "var(--border)",
    margin: "56px 0",
  };

  const eyebrow: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "var(--text-3)",
    fontFamily: "var(--font-mono)",
    marginBottom: "8px",
  };

  const sectionHeading: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--text)",
    letterSpacing: "-0.025em",
    lineHeight: 1.2,
    marginBottom: "8px",
  };

  const sectionDescription: React.CSSProperties = {
    fontSize: "16px",
    color: "var(--text-2)",
    lineHeight: 1.65,
    marginBottom: "0",
  };

  const card: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "24px",
  };

  const timelineItem = (
    date: string,
    color: string,
    title: string,
    institution: string,
    description: string,
    tags?: string[],
    isLast?: boolean
  ) => (
    <div style={{ display: "flex", gap: "20px", paddingBottom: isLast ? "0" : "32px", position: "relative" }}>
      <div style={{ minWidth: "88px", paddingTop: "3px", flexShrink: 0 }}>
        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color, fontWeight: 600, letterSpacing: "0.02em" }}>
          {date}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, marginTop: "5px", flexShrink: 0 }} />
        {!isLast && <div style={{ width: "1px", flex: 1, background: "var(--border)", marginTop: "6px" }} />}
      </div>
      <div style={{ paddingBottom: "4px", minWidth: 0 }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--text)", marginBottom: "4px", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-3)", marginBottom: "10px" }}>
          {institution}
        </p>
        <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.65, marginBottom: tags ? "12px" : "0" }}>
          {description}
        </p>
        {tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tags.map(t => (
              <span key={t} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "2px 8px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-3)" }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const dot = (color: string) => (
    <span style={{ display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "7px" }} />
  );

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* ── Hero block ── */}
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "0", flexWrap: "wrap" }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--helix) 0%, var(--violet) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "22px", color: "#FFFFFF", letterSpacing: "-0.02em" }}>DM</span>
        </div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "6px" }}>
            Dibakar Mallick
          </h1>
          <p style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-2)", marginBottom: "4px" }}>
            Medical &amp; Molecular Biology · Clinical Research · Oncology
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-3)", fontFamily: "var(--font-mono)", marginBottom: "14px" }}>
            MCPHS University · Boston, MA · F-1 OPT
          </p>
          <p style={{ fontSize: "15px", color: "var(--text-2)", lineHeight: 1.65, maxWidth: "520px" }}>
            Undergraduate researcher at the intersection of clinical oncology, cardiac biology, and computational data science.
            I built{" "}
            <Link href="/lab" style={{ color: "var(--helix)", textDecoration: "none" }}>EGFR Navigator</Link>
            {" "}to explore resistance mechanisms in EGFR-mutant lung cancer — from T790M gatekeeper mutations to PROTAC degraders.
            Also working on transcriptomic drivers of cardiac fibrosis at BCH.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
            {[
              { label: "mallick.dibakar247@gmail.com", href: "mailto:mallick.dibakar247@gmail.com", color: "var(--helix)" },
              { label: "857-693-8037", href: "tel:8576938037", color: "var(--text-3)" },
              { label: "github.com/Dmallick01", href: "https://github.com/Dmallick01", color: "var(--violet)" },
            ].map(({ label, href, color }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color, textDecoration: "none", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "5px", padding: "4px 10px" }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={sectionDivider} />

      {/* ── Featured Project ── */}
      <section>
        <p style={eyebrow}>Featured Project</p>
        <h2 style={sectionHeading}>EGFR Navigator</h2>
        <p style={{ ...sectionDescription, marginBottom: "24px" }}>
          An interactive research reference I designed and built — covering EGFR variant biology,
          resistance mechanisms, and the drug pipeline from gefitinib to PROTAC degraders.
        </p>

        <div style={{ ...card, marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" }}>
            {[
              { label: "10 variants", desc: "Curated with AlphaMissense, ClinVar, and drug IC50 data" },
              { label: "20 drugs", desc: "Gen 1–4 TKIs, bispecifics, ADCs, and PROTAC degraders" },
              { label: "8 databases", desc: "gnomAD, ChEMBL, PubMed, ClinicalTrials.gov, and more" },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p style={{ fontSize: "15px", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--text)", marginBottom: "4px" }}>{label}</p>
                <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
            {["Next.js", "TypeScript", "3Dmol.js", "AlphaMissense", "ChEMBL", "Cursor", "Vercel"].map(t => (
              <span key={t} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "3px 10px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-2)" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <Link href="/lab" style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#fff", background: "var(--text)", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", fontWeight: 600 }}>
              Try the lab →
            </Link>
            <Link href="/variant/C797S" style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--helix)", border: "1px solid rgba(26,86,219,0.2)", padding: "8px 16px", borderRadius: "6px", textDecoration: "none" }}>
              C797S variant →
            </Link>
            <a href="https://github.com/Dmallick01/egfr-navigator" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-2)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: "6px", textDecoration: "none" }}>
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Education ── */}
      <section>
        <p style={eyebrow}>Education</p>
        <h2 style={sectionHeading}>Academic Training</h2>

        <div style={{ ...card, display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "rgba(26,86,219,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L2 6.5L10 11L18 6.5L10 2Z" stroke="var(--helix)" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M4 8v5.5c0 1.5 2.7 3 6 3s6-1.5 6-3V8" stroke="var(--helix)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4px", marginBottom: "6px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--text)" }}>
                B.S. Medical &amp; Molecular Biology
              </h3>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--helix)", fontWeight: 600 }}>Aug 2022 – May 2026</span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-2)", marginBottom: "8px" }}>
              MCPHS University (Massachusetts College of Pharmacy and Health Sciences) · Boston, MA
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {["GPA: 3.65", "Pre-Medical Track", "Biostatistics (R)", "cGMP Manufacturing", "Organic Chemistry", "Pharmacology"].map(t => (
                <span key={t} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "2px 8px", borderRadius: "4px", background: "rgba(26,86,219,0.07)", border: "1px solid rgba(26,86,219,0.15)", color: "var(--helix)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Research Experience ── */}
      <section>
        <p style={eyebrow}>Research Experience</p>
        <h2 style={sectionHeading}>Positions &amp; Projects</h2>
        <p style={{ ...sectionDescription, marginBottom: "32px" }}>
          Research positions across clinical oncology, cardiac biology, and biotech manufacturing.
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {timelineItem(
            "2024 – Present",
            "var(--helix)",
            "Research Intern — Cardiac Fibrosis Transcriptomics",
            "BCH Choudhury Lab · Boston Children's Hospital / Harvard Medical School",
            "Analyzing single-cell and bulk RNA-seq datasets to characterize transcriptomic drivers of cardiac fibrosis. Work involves differential expression analysis, pathway enrichment, and integration of multi-omics data in the Choudhury laboratory at BCH/HMS.",
            ["scRNA-seq", "Bulk RNA-seq", "R / Bioconductor", "DESeq2", "Gene Ontology", "Pathway Enrichment"]
          )}
          {timelineItem(
            "2023 – 2025",
            "var(--violet)",
            "Clinical Research Intern",
            "Beth Israel Deaconess Medical Center · Division of Pulmonary & Critical Care",
            "Contributed to two major clinical studies. The EMERGE Trial evaluated clinical outcomes in ARDS patients with PICS. The PANDORA Study (published 2025, Ann Am Thorac Soc) investigated ICU delirium and patient-reported outcomes — work contributed to the co-authored publication (PMID 40758474).",
            ["EMERGE Trial", "PANDORA Study", "ARDS / PICS", "ICU Delirium", "REDCap", "CONSORT", "GCP"]
          )}
          {timelineItem(
            "2022 – 2023",
            "var(--emerald)",
            "LEAS Program Trainee — cGMP Biomanufacturing",
            "LabCentral · Cambridge, MA",
            "Completed the Laboratory and Entrepreneurship Accelerating Science (LEAS) program with intensive cGMP training. Gained hands-on experience in aseptic technique, cell culture under cGMP conditions, quality control documentation, and regulatory compliance in a biotech incubator environment.",
            ["cGMP", "Aseptic Technique", "Cell Culture", "QC Documentation", "SOP Compliance", "Biotech Incubator"],
            true
          )}
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Publications ── */}
      <section>
        <p style={eyebrow}>Publications</p>
        <h2 style={sectionHeading}>Peer-Reviewed Output</h2>
        <p style={{ ...sectionDescription, marginBottom: "24px" }}>
          Peer-reviewed research published in 2025.
        </p>

        <div style={{ ...card, position: "relative" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "7px", background: "rgba(26,86,219,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="var(--helix)" strokeWidth="1.3"/>
                <path d="M5.5 5.5h5M5.5 7.5h5M5.5 9.5h3" stroke="var(--helix)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--helix)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Ann Am Thorac Soc · 2025 · PMID 40758474
                </p>
                <a href="https://pubmed.ncbi.nlm.nih.gov/40758474" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-3)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: "4px", padding: "2px 8px" }}>
                  PubMed ↗
                </a>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", lineHeight: 1.5, marginBottom: "8px" }}>
                PANDORA Study: Patient-Reported Outcomes and ICU Delirium in Critical Illness Survivors
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.65 }}>
                Co-author. Annals of the American Thoracic Society (2025). The PANDORA study evaluated long-term patient-reported outcomes, delirium burden, and post-intensive care syndrome in ICU survivors at Beth Israel Deaconess Medical Center.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Presentations ── */}
      <section>
        <p style={eyebrow}>Presentations</p>
        <h2 style={sectionHeading}>Conference &amp; Symposium Activity</h2>
        <p style={{ ...sectionDescription, marginBottom: "24px" }}>
          Research presentations at academic conferences, 2023–2026.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            {
              year: "2026",
              title: "MCPHS Capstone Research Day — Oral Presentation",
              venue: "MCPHS University · Boston, MA",
              color: "var(--helix)",
            },
            {
              year: "2024",
              title: "38th Annual Pain Research Conference — Research Poster",
              venue: "Beth Israel Deaconess Medical Center · Boston, MA",
              color: "var(--violet)",
            },
            {
              year: "2023",
              title: "MCPHS Capstone Research Day — Research Poster",
              venue: "MCPHS University · Boston, MA",
              color: "var(--emerald)",
            },
          ].map(({ year, title, venue, color }) => (
            <div key={year + title} style={{ ...card, display: "flex", gap: "16px", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontFamily: "var(--font-mono)", fontWeight: 700, color, minWidth: "36px", flexShrink: 0 }}>{year}</span>
              <div style={{ width: "1px", height: "32px", background: "var(--border)", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>{title}</p>
                <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-3)" }}>{venue}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Skills ── */}
      <section>
        <p style={eyebrow}>Capabilities</p>
        <h2 style={sectionHeading}>Skills &amp; Methods</h2>
        <p style={{ ...sectionDescription, marginBottom: "28px" }}>
          Laboratory, clinical, computational, and analytical methods across three years of research.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {/* Molecular Biology */}
          <div style={card}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--helix)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
              Molecular Biology
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                "PCR, qRT-PCR, gel electrophoresis",
                "Western blot, SDS-PAGE",
                "Cell culture (mammalian, cGMP)",
                "ELISA, flow cytometry",
                "Plasmid cloning, transformation",
                "Aseptic technique",
              ].map(s => (
                <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--text-2)", lineHeight: 1.5 }}>
                  {dot("var(--helix)")}
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Research */}
          <div style={card}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--violet)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
              Clinical Research
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                "GCP-certified (CITI)",
                "REDCap data management",
                "CONSORT / STROBE reporting",
                "Patient chart abstraction",
                "IRB protocol support",
                "Survey design & validation",
              ].map(s => (
                <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--text-2)", lineHeight: 1.5 }}>
                  {dot("var(--violet)")}
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Data & Computational */}
          <div style={card}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--emerald)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
              Data &amp; Computational
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                "R (DESeq2, ggplot2, survival)",
                "Python (pandas, scipy, matplotlib)",
                "JavaScript / TypeScript / Next.js",
                "AI-assisted development (Cursor, Claude)",
                "AlphaMissense, AlphaFold (interpretation)",
                "PubMed, ChEMBL, gnomAD, cBioPortal",
              ].map(s => (
                <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--text-2)", lineHeight: 1.5 }}>
                  {dot("var(--emerald)")}
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Analytical Chemistry */}
          <div style={card}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
              Analytical Chemistry
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                "HPLC / UV-Vis spectroscopy",
                "NMR spectroscopy (interpretation)",
                "Titrations & gravimetric analysis",
                "Mass spectrometry (interpretation)",
                "Fluorescence microscopy",
                "Pharmacokinetics & ADMET analysis",
              ].map(s => (
                <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--text-2)", lineHeight: 1.5 }}>
                  {dot("var(--amber)")}
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Leadership ── */}
      <section>
        <p style={eyebrow}>Leadership</p>
        <h2 style={sectionHeading}>Campus &amp; Community</h2>
        <p style={{ ...sectionDescription, marginBottom: "28px" }}>
          Student organization leadership, advocacy, and community service.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            {
              role: "President",
              org: "FASCO — Future American Society of Clinical Oncology",
              period: "2023 – 2024",
              description: "Led student chapter, organized oncology-focused events, mentoring sessions, and scientific programming at MCPHS.",
              color: "var(--helix)",
            },
            {
              role: "Vice President",
              org: "Bangladeshi Student Association — MCPHS",
              period: "2024",
              description: "Co-organized cultural events, fostered community among South Asian and international students.",
              color: "var(--violet)",
            },
            {
              role: "Organizer",
              org: "Muddy Water Initiatives",
              period: "Ongoing",
              description: "Community health outreach and advocacy initiative connecting underserved communities with health education resources.",
              color: "var(--emerald)",
            },
          ].map(({ role, org, period, description, color }) => (
            <div key={org} style={{ ...card, display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, marginTop: "7px", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>
                    {role} · <span style={{ fontWeight: 500, color: "var(--text-2)" }}>{org}</span>
                  </p>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color, fontWeight: 600 }}>{period}</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.6 }}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <div style={sectionDivider} />

      {/* ── Languages ── */}
      <section>
        <p style={eyebrow}>Languages</p>
        <h2 style={sectionHeading}>Communication</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
          {[
            { lang: "English", level: "Fluent", color: "var(--helix)" },
            { lang: "Bengali", level: "Native", color: "var(--emerald)" },
            { lang: "Hindi", level: "Conversational", color: "var(--amber)" },
          ].map(({ lang, level, color }) => (
            <div key={lang} style={{ ...card, display: "flex", alignItems: "center", gap: "12px", padding: "14px 20px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color }} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{lang}</span>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-3)" }}>{level}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Data Sources ── */}
      <section>
        <p style={eyebrow}>Data Sources</p>
        <h2 style={sectionHeading}>Databases &amp; Credits</h2>
        <p style={{ ...sectionDescription, marginBottom: "28px" }}>
          This site draws on data from publicly available scientific databases.
        </p>

        <div style={{ ...card, display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            "ClinicalTrials.gov",
            "PubMed / NCBI",
            "ChEMBL",
            "ClinVar",
            "gnomAD",
            "cBioPortal",
            "Open Targets",
            "AlphaMissense (DeepMind)",
            "PubChem",
          ].map((source) => (
            <span key={source} style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: "var(--font-mono)", fontWeight: 500, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text-2)" }}>
              {source}
            </span>
          ))}
        </div>
      </section>

      <div style={sectionDivider} />

      {/* ── Contact ── */}
      <section>
        <p style={eyebrow}>Contact</p>
        <h2 style={sectionHeading}>Get in Touch</h2>
        <p style={{ ...sectionDescription, marginBottom: "28px" }}>
          Graduate program inquiries, research collaborations, and translational science discussions welcome.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ ...card, display: "flex", alignItems: "center", gap: "14px", flex: "1", minWidth: "200px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(26,86,219,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="var(--helix)" strokeWidth="1.3"/>
                <path d="M1 5.5L8 9.5L15 5.5" stroke="var(--helix)" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>Email</p>
              <a href="mailto:mallick.dibakar247@gmail.com" style={{ fontSize: "13px", color: "var(--helix)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
                mallick.dibakar247@gmail.com
              </a>
            </div>
          </div>

          <div style={{ ...card, display: "flex", alignItems: "center", gap: "14px", flex: "1", minWidth: "200px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(109,40,217,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2.01 5.73 4.8 6.66.35.06.48-.15.48-.34v-1.19c-1.95.42-2.36-.95-2.36-.95-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.62 1.07 1.64.76 2.04.58.06-.45.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.93.72A6.7 6.7 0 0 1 8 4.8c.6 0 1.2.08 1.76.24 1.34-.91 1.93-.72 1.93-.72.38.96.14 1.67.07 1.85.45.49.72 1.11.72 1.88 0 2.7-1.64 3.29-3.2 3.47.25.22.48.65.48 1.31v1.94c0 .19.13.4.48.34A7.005 7.005 0 0 0 15 8c0-3.87-3.13-7-7-7Z" fill="var(--violet)"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>GitHub</p>
              <a href="https://github.com/Dmallick01" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "var(--helix)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
                Dmallick01
              </a>
            </div>
          </div>

          <div style={{ ...card, display: "flex", alignItems: "center", gap: "14px", flex: "1", minWidth: "200px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(4,120,87,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3.25 4 9 4 9s4-5.75 4-9c0-2.21-1.79-4-4-4Z" stroke="var(--emerald)" strokeWidth="1.3"/>
                <circle cx="8" cy="5.5" r="1.5" stroke="var(--emerald)" strokeWidth="1.3"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>Location</p>
              <p style={{ fontSize: "13px", color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>Dorchester, Boston MA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
