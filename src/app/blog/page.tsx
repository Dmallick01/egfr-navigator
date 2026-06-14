import Link from "next/link";

const posts = [
  {
    slug: "gefitinib-to-protac",
    title: "From Gefitinib to PROTAC: 20 Years of EGFR Drug Evolution",
    date: "2026-06-01",
    excerpt:
      "The history of EGFR-targeted therapy in NSCLC is a masterclass in translational oncology. From the serendipitous discovery that gefitinib worked specifically in EGFR-mutant tumors, through the gatekeeper T790M problem and osimertinib's covalent solution, to the PROTAC revolution that renders active-site mutations irrelevant — two decades of drug development compressed into one story.",
    tags: ["History", "PROTAC", "Drug Development"],
  },
  {
    slug: "c797s-protein-degraders",
    title: "Why C797S Is the Key to Understanding Protein Degraders",
    date: "2026-05-15",
    excerpt:
      "C797S is a single amino acid substitution that defeats osimertinib — and it's also the clearest explanation of why protein degraders (PROTACs) represent a paradigm shift. This post unpacks the molecular logic: why covalent inhibitors need Cys797, how C797S abolishes that requirement, and how a bifunctional degrader like CFT8919 sidesteps the active-site problem entirely.",
    tags: ["C797S", "PROTAC", "Mechanism"],
  },
  {
    slug: "building-egfr-navigator",
    title: "Building EGFR Navigator: Integrating 8 Public Databases",
    date: "2026-04-20",
    excerpt:
      "Behind EGFR Navigator are eight public databases: ClinicalTrials.gov, PubMed, ChEMBL, ClinVar, gnomAD, cBioPortal, Open Targets, and AlphaMissense. This post walks through how each database contributes — from variant frequencies and drug IC50 values to computational pathogenicity predictions and clinical trial identifiers — and the design decisions behind the curated data layer.",
    tags: ["Technical", "Databases", "Design"],
  },
];

export default function BlogPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: "36px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--text-3)",
            marginBottom: "8px",
          }}
        >
          Research Blog
        </p>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: "-0.5px",
            marginBottom: "10px",
          }}
        >
          Articles
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-2)", lineHeight: 1.6 }}>
          Deep dives into EGFR biology, drug development history, and the science behind EGFR
          Navigator.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "28px",
              transition: "border-color 0.15s",
            }}
          >
            {/* Tags */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-3)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: "-0.3px",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </h2>

            <p
              style={{
                fontSize: "12px",
                color: "var(--text-3)",
                marginBottom: "12px",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "var(--text-2)",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              {post.excerpt}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--helix)",
                background: "var(--helix-dim)",
                border: "1px solid var(--border)",
                padding: "6px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              Read post →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
