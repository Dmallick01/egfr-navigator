import graphData from "@/data/resistance-graph.json";
import type { ResistanceGraph } from "@/lib/types";
import ResistanceTimeline from "@/components/ResistanceTimeline";

const graph = graphData as ResistanceGraph;

export default function TimelinePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
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
          Interactive Map
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
          Resistance Timeline
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-2)", maxWidth: "600px", lineHeight: 1.6 }}>
          Follow the evolutionary arc of EGFR-mutant NSCLC treatment: from sensitizing mutations
          through each generation of TKIs, resistance mechanisms, and frontier protein degraders.
          Click any node to explore.
        </p>
      </div>

      <ResistanceTimeline graph={graph} />
    </div>
  );
}
