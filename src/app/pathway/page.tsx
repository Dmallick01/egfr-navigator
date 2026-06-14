import PathwayDiagram from "@/components/PathwayDiagram";

export default function PathwayPage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: "28px" }}>
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
          Signaling Biology
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
          EGFR Signaling Pathway
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-2)", maxWidth: "600px", lineHeight: 1.6 }}>
          Toggle between normal (ligand-activated) and constitutive (mutation-driven) signaling
          modes. Click any node to learn more.
        </p>
      </div>
      <PathwayDiagram />
    </div>
  );
}
