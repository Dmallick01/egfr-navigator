import drugData from "@/data/drug-pipeline.json";
import type { DrugPipelineEntry } from "@/lib/types";
import DrugPipelineView from "@/components/DrugPipelineView";

const drugs = drugData as DrugPipelineEntry[];

export default function DrugsPage() {
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
          Therapeutics
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
          Drug Pipeline & Mechanism
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-2)", maxWidth: "600px", lineHeight: 1.6 }}>
          Every EGFR-targeted therapy from first approved TKI to frontier PROTAC degraders —
          mechanism, approval status, and clinical context.
        </p>
      </div>
      <DrugPipelineView drugs={drugs} />
    </div>
  );
}
