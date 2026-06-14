import variantsData from "@/data/curated-variants.json";
import type { Variant } from "@/lib/types";
import InSilicoLab from "@/components/InSilicoLab";

const variants = variantsData as Variant[];

export default function LabPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
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
          Interactive Sandbox
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
          In Silico Lab
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-2)", maxWidth: "600px", lineHeight: 1.6 }}>
          Select a variant and drug to explore predicted drug response based on curated clinical and
          biochemical evidence.
        </p>
      </div>

      <InSilicoLab variants={variants} />
    </div>
  );
}
