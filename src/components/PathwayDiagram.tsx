'use client';

import { useState } from "react";

type Mode = "normal" | "constitutive";

interface NodeInfo {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  pathway: "MAPK" | "PI3K" | "JAK-STAT" | "shared";
}

const nodes: NodeInfo[] = [
  { id: "ligand", label: "EGF Ligand", description: "Epidermal Growth Factor binds the EGFR extracellular domain. In normal signaling, ligand binding is required for EGFR activation. Mutations bypass this requirement.", x: 50, y: 5, pathway: "shared" },
  { id: "egfr", label: "EGFR", description: "Epidermal Growth Factor Receptor (ErbB1/HER1). Receptor tyrosine kinase. Sensitizing mutations (exon 19 del, L858R) lock EGFR in constitutively active conformation without ligand.", x: 50, y: 18, pathway: "shared" },
  { id: "ras", label: "RAS", description: "Small GTPase downstream of EGFR. Activated via GRB2/SOS adapter proteins. Key oncogene — mutant RAS can bypass EGFR entirely (mechanism of acquired resistance).", x: 30, y: 34, pathway: "MAPK" },
  { id: "pi3k", label: "PI3K", description: "Phosphoinositide 3-kinase. Activated by EGFR and RAS. Produces PIP3, activating AKT. The PI3K-AKT axis drives cell survival and anti-apoptotic signaling.", x: 70, y: 34, pathway: "PI3K" },
  { id: "jak", label: "JAK1/2", description: "Janus kinases. Can be activated by EGFR signaling indirectly. JAK-STAT pathway contributes to tumor cell survival and immune evasion.", x: 90, y: 34, pathway: "JAK-STAT" },
  { id: "raf", label: "RAF", description: "Serine/threonine kinase activated by RAS. RAF→MEK→ERK is the core MAPK cascade. BRAF mutations can bypass EGFR signaling (resistance mechanism).", x: 30, y: 52, pathway: "MAPK" },
  { id: "akt", label: "AKT", description: "Protein kinase B. Central node of PI3K pathway. Promotes cell survival, proliferation, protein synthesis via mTOR. AKT amplification can drive TKI resistance.", x: 70, y: 52, pathway: "PI3K" },
  { id: "stat3", label: "STAT3", description: "Signal Transducer and Activator of Transcription 3. Activated by JAK and directly by EGFR. Drives oncogene expression (BCL-XL, cyclin D1, c-Myc).", x: 90, y: 52, pathway: "JAK-STAT" },
  { id: "mek", label: "MEK", description: "MAP kinase kinase. Phosphorylates and activates ERK1/2. MEK inhibitors (trametinib) used in combination to overcome EGFR TKI resistance.", x: 30, y: 70, pathway: "MAPK" },
  { id: "mtor", label: "mTOR", description: "Mechanistic target of rapamycin. Downstream of AKT. Controls protein synthesis, cell growth, metabolism. mTOR inhibitors (everolimus) studied in TKI-resistant NSCLC.", x: 70, y: 70, pathway: "PI3K" },
  { id: "erk", label: "ERK1/2", description: "Extracellular signal-regulated kinases. End effectors of MAPK cascade. ERK translocates to nucleus, phosphorylates transcription factors driving proliferation.", x: 30, y: 87, pathway: "MAPK" },
  { id: "proliferation", label: "Proliferation", description: "Net output: cell division, survival, migration, angiogenesis. All three EGFR downstream pathways converge on these cancer hallmarks.", x: 60, y: 94, pathway: "shared" },
];

const edges: Array<{ from: string; to: string; normalOnly?: boolean }> = [
  { from: "ligand", to: "egfr", normalOnly: true },
  { from: "egfr", to: "ras" },
  { from: "egfr", to: "pi3k" },
  { from: "egfr", to: "jak" },
  { from: "ras", to: "raf" },
  { from: "ras", to: "pi3k" },
  { from: "pi3k", to: "akt" },
  { from: "jak", to: "stat3" },
  { from: "raf", to: "mek" },
  { from: "akt", to: "mtor" },
  { from: "mek", to: "erk" },
  { from: "erk", to: "proliferation" },
  { from: "mtor", to: "proliferation" },
  { from: "stat3", to: "proliferation" },
];

const pathwayColors: Record<string, string> = {
  MAPK: "var(--sky-light)",
  PI3K: "var(--emerald-light)",
  "JAK-STAT": "var(--violet-light)",
  shared: "var(--text-2)",
};

const pathwayHex: Record<string, string> = {
  MAPK: "#38BDF8",
  PI3K: "#34D399",
  "JAK-STAT": "#A78BFA",
  shared: "#8892A4",
};

export default function PathwayDiagram() {
  const [mode, setMode] = useState<Mode>("normal");
  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const isActive = (nodeId: string): boolean => {
    if (mode === "constitutive") return nodeId !== "ligand";
    return true;
  };

  const getNodeColor = (node: NodeInfo): string => {
    if (!isActive(node.id)) return "#4E566A";
    if (node.id === "egfr" && mode === "constitutive") return "#FCD34D";
    return pathwayHex[node.pathway] || "#8892A4";
  };

  const getEdgeActive = (edge: { from: string; to: string; normalOnly?: boolean }) => {
    if (edge.normalOnly && mode === "constitutive") return false;
    return isActive(edge.from) && isActive(edge.to);
  };

  const viewW = 100;
  const viewH = 105;

  return (
    <div>
      {/* Mode toggle — underline style */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid var(--border)", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--text-3)", marginRight: 12, fontWeight: 500 }}>Signaling mode</span>
        {(["normal", "constitutive"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "8px 14px", background: "none", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 500,
              color: mode === m ? "var(--text)" : "var(--text-3)",
              borderBottom: mode === m
                ? `2px solid ${m === "normal" ? "var(--emerald)" : "var(--amber)"}`
                : "2px solid transparent",
              transition: "all 0.12s",
            }}
          >
            {m === "normal" ? "Normal" : "Constitutive"}
          </button>
        ))}
      </div>

      {mode === "constitutive" && (
        <div style={{ background: "var(--amber-dim)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "var(--amber-light)" }}>
          Constitutive mode: EGFR is always-on (no ligand required). Downstream cascades fire continuously, driving uncontrolled proliferation.
        </div>
      )}

      {/* Pathway legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(pathwayColors).filter(([k]) => k !== "shared").map(([pathway, color]) => (
          <div key={pathway} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 2, borderRadius: 2, background: color }} />
            <span style={{ fontSize: 11, color: "var(--text-3)" }}>{pathway}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* SVG diagram */}
        <div style={{ flex: 1, minWidth: 280, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, overflow: "hidden" }}>
          <svg viewBox={`0 0 ${viewW} ${viewH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="3" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.15)" />
              </marker>
            </defs>
            {/* Edges */}
            {edges.map((edge, i) => {
              const fromNode = nodeMap[edge.from];
              const toNode = nodeMap[edge.to];
              if (!fromNode || !toNode) return null;
              const active = getEdgeActive(edge);
              const color = active ? pathwayHex[fromNode.pathway] || "#8892A4" : "rgba(255,255,255,0.08)";
              return (
                <line
                  key={i}
                  x1={fromNode.x} y1={fromNode.y + 3}
                  x2={toNode.x} y2={toNode.y - 3}
                  stroke={color}
                  strokeWidth="0.6"
                  strokeOpacity={active ? 0.6 : 1}
                  strokeDasharray={active ? "none" : "1.5 1.5"}
                />
              );
            })}
            {/* Nodes */}
            {nodes.map((node) => {
              const active = isActive(node.id);
              const nodeColor = getNodeColor(node);
              const isSelected = selectedNode?.id === node.id;
              return (
                <g key={node.id} onClick={() => setSelectedNode(isSelected ? null : node)} style={{ cursor: "pointer" }}>
                  <rect
                    x={node.x - 9} y={node.y - 3} width={18} height={6} rx={1.5}
                    fill={active && isSelected ? `${nodeColor}20` : "#111520"}
                    stroke={nodeColor}
                    strokeWidth={isSelected ? 0.8 : 0.5}
                    strokeOpacity={active ? 1 : 0.25}
                  />
                  <text
                    x={node.x} y={node.y + 1.2}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={nodeColor}
                    fontSize="2.6"
                    fontWeight={isSelected ? "600" : "400"}
                    opacity={active ? 1 : 0.35}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        <div style={{ width: 280, flexShrink: 0 }}>
          {selectedNode ? (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: pathwayColors[selectedNode.pathway], marginBottom: 6 }}>
                {selectedNode.pathway} Pathway
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
                {selectedNode.label}
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{selectedNode.description}</p>
              {!isActive(selectedNode.id) && (
                <div style={{ marginTop: 12, padding: "8px 12px", background: "var(--surface-2)", borderRadius: 6, fontSize: 12, color: "var(--text-3)" }}>
                  Inactive in {mode} mode
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, color: "var(--text-3)", fontSize: 13, lineHeight: 1.6 }}>
              <p style={{ marginBottom: 12 }}>Click any node in the diagram to learn about that signaling component.</p>
              <p>{mode === "constitutive" ? "Constitutive mode shows signaling with an EGFR activating mutation — no ligand required." : "Normal mode shows ligand-dependent EGFR activation."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
