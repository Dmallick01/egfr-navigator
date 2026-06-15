'use client';

import { useState } from "react";

type Mode = "normal" | "constitutive";
type Pathway = "MAPK" | "PI3K" | "JAK-STAT" | "shared";

interface NodeInfo {
  id: string;
  label: string;
  sublabel?: string;
  description: string;
  detail: string;
  x: number;
  y: number;
  pathway: Pathway;
  drugTarget?: boolean;
}

const nodes: NodeInfo[] = [
  {
    id: "ligand",
    label: "EGF",
    sublabel: "Ligand",
    description: "Epidermal Growth Factor",
    detail: "EGF is the primary ligand for EGFR. In normal cells, EGF binding triggers receptor dimerization and kinase activation. Sensitizing EGFR mutations bypass ligand requirement entirely — the receptor fires constitutively without EGF. This is the fundamental oncogenic mechanism in EGFR-mutant NSCLC.",
    x: 50, y: 6,
    pathway: "shared",
  },
  {
    id: "egfr",
    label: "EGFR",
    sublabel: "Kinase",
    description: "Epidermal Growth Factor Receptor (ERBB1/HER1)",
    detail: "Receptor tyrosine kinase on the cell surface. Sensitizing mutations (L858R, Exon 19 del) lock EGFR in the ATP-bound, active conformation without ligand. T790M gatekeeper mutation stiffens the binding pocket. TKIs block ATP binding — Gen1 reversibly, Gen2 covalently at Cys797, Gen3 (osimertinib) selectively targeting T790M.",
    x: 50, y: 20,
    pathway: "shared",
    drugTarget: true,
  },
  {
    id: "ras",
    label: "RAS",
    sublabel: "GTPase",
    description: "RAS family small GTPase",
    detail: "Activated by GRB2/SOS adapter complex downstream of EGFR. GDP→GTP exchange activates RAS. Mutant KRAS/NRAS can bypass EGFR entirely — a critical acquired resistance mechanism. KRAS G12C (sotorasib, adagrasib) shows how orthogonal oncogene addiction can arise.",
    x: 28, y: 38,
    pathway: "MAPK",
  },
  {
    id: "pi3k",
    label: "PI3K",
    sublabel: "Lipid kinase",
    description: "Phosphoinositide 3-Kinase",
    detail: "Activated by EGFR phosphorylation and by RAS. Converts PIP2→PIP3 at the plasma membrane, recruiting PDK1 and AKT. The PI3K-AKT axis drives cell survival and anti-apoptotic signaling. PIK3CA mutations and PTEN loss are acquired resistance mechanisms to EGFR TKIs.",
    x: 72, y: 38,
    pathway: "PI3K",
  },
  {
    id: "jak",
    label: "JAK1/2",
    sublabel: "Kinase",
    description: "Janus Kinases 1 & 2",
    detail: "Can be activated downstream of EGFR and by cytokines. JAK-STAT signaling contributes to tumor cell survival, immune evasion, and bypass of EGFR inhibition. IL-6 paracrine signaling can activate JAK-STAT in TKI-resistant tumors.",
    x: 88, y: 38,
    pathway: "JAK-STAT",
  },
  {
    id: "raf",
    label: "RAF",
    sublabel: "Kinase",
    description: "RAF serine/threonine kinase",
    detail: "Activated by RAS-GTP binding. RAF→MEK→ERK is the canonical MAPK proliferative cascade. BRAF V600E mutations can bypass EGFR entirely. RAF inhibitors (vemurafenib) are used in BRAF-mutant cancers; BRAF amplification is a TKI resistance mechanism in EGFR-mutant NSCLC.",
    x: 28, y: 55,
    pathway: "MAPK",
  },
  {
    id: "akt",
    label: "AKT",
    sublabel: "Kinase",
    description: "Protein Kinase B (PKB/AKT)",
    detail: "Phosphorylated by PDK1 on Thr308 and by mTORC2 on Ser473. Central pro-survival node: phosphorylates BAD (anti-apoptotic), MDM2 (p53 suppression), and TSC2 (mTOR activation). AKT1 E17K amplification is a resistance mechanism to osimertinib.",
    x: 72, y: 55,
    pathway: "PI3K",
  },
  {
    id: "stat3",
    label: "STAT3",
    sublabel: "TF",
    description: "Signal Transducer & Activator of Transcription 3",
    detail: "Directly phosphorylated by activated EGFR and by JAK kinases. Dimerizes and translocates to nucleus, driving oncogene expression: BCL-XL, cyclin D1, c-Myc, VEGF. STAT3 is an emerging target for overcoming TKI resistance in combination strategies.",
    x: 88, y: 55,
    pathway: "JAK-STAT",
  },
  {
    id: "mek",
    label: "MEK",
    sublabel: "MEK1/2",
    description: "MAP Kinase Kinase (MEK1/2)",
    detail: "Phosphorylates ERK1/2 on Thr202/Tyr204. MEK is the convergence point of multiple upstream signals. MEK inhibitors (trametinib, cobimetinib) are used in BRAF-driven cancers and studied in combination with EGFR TKIs to overcome acquired resistance.",
    x: 28, y: 72,
    pathway: "MAPK",
  },
  {
    id: "mtor",
    label: "mTOR",
    sublabel: "mTORC1",
    description: "Mechanistic Target of Rapamycin Complex 1",
    detail: "Downstream of AKT via TSC2 phosphorylation. Controls ribosome biogenesis, protein synthesis (via S6K1 and 4E-BP1), and metabolism. Rapalogs (everolimus) studied in TKI-resistant NSCLC. mTORC1 reactivation is a feedback mechanism when upstream signaling is blocked.",
    x: 72, y: 72,
    pathway: "PI3K",
  },
  {
    id: "erk",
    label: "ERK1/2",
    sublabel: "MAPK",
    description: "Extracellular Signal-Regulated Kinases 1 & 2",
    detail: "Terminal kinases of the MAPK cascade. ERK translocates to the nucleus to phosphorylate transcription factors (ELK1, c-FOS, RSK) driving proliferative gene expression. ERK feedback phosphorylation of RAF and SOS creates oscillatory dynamics in signaling.",
    x: 28, y: 88,
    pathway: "MAPK",
  },
  {
    id: "nucleus",
    label: "Nucleus",
    sublabel: "Proliferation",
    description: "Cell Cycle Progression & Gene Expression",
    detail: "Convergence of all three pathways drives hallmarks of cancer: proliferation (MAPK→Myc), survival (PI3K→BCL-2), immune evasion (STAT3→PD-L1), and angiogenesis (AKT→HIF-1α→VEGF). EGFR TKIs suppress all three arms simultaneously, explaining their efficacy over single-pathway inhibitors.",
    x: 55, y: 97,
    pathway: "shared",
  },
];

const edges: Array<{ from: string; to: string; normalOnly?: boolean; pathway?: Pathway }> = [
  { from: "ligand", to: "egfr", normalOnly: true, pathway: "shared" },
  { from: "egfr", to: "ras", pathway: "MAPK" },
  { from: "egfr", to: "pi3k", pathway: "PI3K" },
  { from: "egfr", to: "jak", pathway: "JAK-STAT" },
  { from: "ras", to: "raf", pathway: "MAPK" },
  { from: "ras", to: "pi3k", pathway: "PI3K" },
  { from: "pi3k", to: "akt", pathway: "PI3K" },
  { from: "jak", to: "stat3", pathway: "JAK-STAT" },
  { from: "raf", to: "mek", pathway: "MAPK" },
  { from: "akt", to: "mtor", pathway: "PI3K" },
  { from: "mek", to: "erk", pathway: "MAPK" },
  { from: "erk", to: "nucleus", pathway: "MAPK" },
  { from: "mtor", to: "nucleus", pathway: "PI3K" },
  { from: "stat3", to: "nucleus", pathway: "JAK-STAT" },
];

const pathwayMeta: Record<Pathway, { color: string; hex: string; name: string; desc: string }> = {
  MAPK:      { color: "var(--helix)",   hex: "#4F8EF7", name: "RAS-MAPK",   desc: "Proliferation cascade" },
  PI3K:      { color: "var(--emerald)", hex: "#00C896", name: "PI3K-AKT",   desc: "Survival axis" },
  "JAK-STAT":{ color: "var(--violet)",  hex: "#9B59F5", name: "JAK-STAT",   desc: "Immune & survival" },
  shared:    { color: "var(--text-2)",  hex: "#7D8BAB", name: "Shared",     desc: "Common nodes" },
};

const drugAnnotations = [
  { y: 14, label: "Gen1/2/3 TKIs", sublabel: "block ATP pocket", color: "#4F8EF7" },
  { y: 14, label: "Amivantamab", sublabel: "EGFR+MET antibody", color: "#9B59F5", right: true },
];

export default function PathwayDiagram() {
  const [mode, setMode] = useState<Mode>("normal");
  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const isActive = (nodeId: string) => {
    if (mode === "constitutive") return nodeId !== "ligand";
    return true;
  };

  const getNodeFill = (node: NodeInfo) => {
    if (!isActive(node.id)) return "rgba(220,228,240,0.60)";
    if (node.id === "egfr" && mode === "constitutive") return "rgba(255,140,66,0.12)";
    if (node.id === "nucleus") return "rgba(15,23,42,0.08)";
    return "rgba(255,255,255,0.88)";
  };

  const getNodeStroke = (node: NodeInfo) => {
    if (!isActive(node.id)) return "rgba(15,23,42,0.10)";
    if (node.id === "egfr" && mode === "constitutive") return "#FF8C42";
    if (selectedNode?.id === node.id) return pathwayMeta[node.pathway].hex;
    return `${pathwayMeta[node.pathway].hex}60`;
  };

  const getNodeTextFill = (node: NodeInfo) => {
    if (!isActive(node.id)) return "rgba(120,140,170,0.7)";
    if (node.id === "egfr" && mode === "constitutive") return "#FF8C42";
    if (selectedNode?.id === node.id) return "#E8EDF8";
    return pathwayMeta[node.pathway].hex;
  };

  const getEdgeActive = (edge: typeof edges[0]) =>
    !(edge.normalOnly && mode === "constitutive") && isActive(edge.from) && isActive(edge.to);

  return (
    <div>
      {/* Mode toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24, borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: 11, color: "var(--text-3)", marginRight: 16, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Signaling mode
        </span>
        {(["normal", "constitutive"] as Mode[]).map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "10px 16px", background: "none", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 600,
            color: mode === m ? "var(--text)" : "var(--text-3)",
            borderBottom: mode === m
              ? `2px solid ${m === "normal" ? "var(--emerald)" : "var(--amber)"}`
              : "2px solid transparent",
            transition: "color 0.15s, border-color 0.15s",
            letterSpacing: "-0.01em",
          }}>
            {m === "normal" ? "Normal — Ligand-Dependent" : "Constitutive — Mutant EGFR"}
          </button>
        ))}
      </div>

      {/* Context banner */}
      <div style={{
        padding: "10px 16px", borderRadius: 8, marginBottom: 20, fontSize: 12.5,
        lineHeight: 1.65, fontFamily: "var(--font-mono)",
        ...(mode === "constitutive"
          ? { background: "rgba(255,140,66,0.06)", border: "1px solid rgba(255,140,66,0.20)", color: "rgba(255,140,66,0.85)" }
          : { background: "rgba(0,200,150,0.05)", border: "1px solid rgba(0,200,150,0.18)", color: "rgba(0,200,150,0.8)" }
        ),
      }}>
        {mode === "constitutive"
          ? "Constitutive: L858R or Exon 19 del locks EGFR in the active conformation. Ligand is irrelevant. RAS-MAPK, PI3K-AKT, and JAK-STAT all fire continuously → uncontrolled proliferation."
          : "Normal: EGF ligand binds → EGFR dimerizes → kinase activates → controlled downstream signaling. Transient, regulated growth response."}
      </div>

      {/* Pathway legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
        {(Object.entries(pathwayMeta) as [Pathway, typeof pathwayMeta[Pathway]][])
          .filter(([k]) => k !== "shared")
          .map(([pathway, meta]) => (
          <div key={pathway} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 2, borderRadius: 2, background: meta.hex }} />
            <div>
              <span style={{ fontSize: 11, color: meta.hex, fontFamily: "var(--font-mono)", fontWeight: 600 }}>{meta.name}</span>
              <span style={{ fontSize: 10, color: "var(--text-3)", marginLeft: 6 }}>{meta.desc}</span>
            </div>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 10, color: "var(--text-3)", fontFamily: "var(--font-mono)", alignSelf: "center" }}>
          Click any node for details
        </div>
      </div>

      <div className="pathway-grid">
        {/* SVG diagram */}
        <div style={{
          background: "rgba(248,250,252,0.98)", border: "1px solid var(--border)",
          borderRadius: 13, padding: "20px 12px", overflow: "hidden",
          position: "relative",
        }}>
          {/* Drug intervention label */}
          <div style={{
            position: "absolute", top: 52, left: 12, right: 12,
            display: "flex", justifyContent: "space-between", pointerEvents: "none",
          }}>
            <div style={{
              fontSize: 9, fontFamily: "var(--font-mono)", color: "rgba(79,142,247,0.80)",
              background: "rgba(255,255,255,0.92)", padding: "2px 6px", borderRadius: 4,
              border: "1px solid rgba(79,142,247,0.15)",
            }}>
              ← TKI block
            </div>
            <div style={{
              fontSize: 9, fontFamily: "var(--font-mono)", color: "rgba(155,89,245,0.80)",
              background: "rgba(255,255,255,0.92)", padding: "2px 6px", borderRadius: 4,
              border: "1px solid rgba(155,89,245,0.15)",
            }}>
              Amivantamab →
            </div>
          </div>

          <svg viewBox="0 0 100 107" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <marker id="arrow-mapk" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill={`${pathwayMeta.MAPK.hex}70`} />
              </marker>
              <marker id="arrow-pi3k" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill={`${pathwayMeta.PI3K.hex}70`} />
              </marker>
              <marker id="arrow-jakstat" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill={`${pathwayMeta["JAK-STAT"].hex}70`} />
              </marker>
              <marker id="arrow-shared" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="rgba(125,139,171,0.5)" />
              </marker>
              {mode === "constitutive" && (
                <filter id="egfr-glow">
                  <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              )}
            </defs>

            {/* Edges */}
            {edges.map((edge, i) => {
              const fn = nodeMap[edge.from];
              const tn = nodeMap[edge.to];
              if (!fn || !tn) return null;
              const active = getEdgeActive(edge);
              const p = edge.pathway || fn.pathway as Pathway;
              const hex = pathwayMeta[p]?.hex || "#8892A4";
              const markerId = `arrow-${p === "JAK-STAT" ? "jakstat" : p === "MAPK" ? "mapk" : p === "PI3K" ? "pi3k" : "shared"}`;
              const dy = 3.5;
              return (
                <line key={i}
                  x1={fn.x} y1={fn.y + dy}
                  x2={tn.x} y2={tn.y - dy}
                  stroke={active ? hex : "rgba(255,255,255,0.06)"}
                  strokeWidth={active ? 0.55 : 0.4}
                  strokeOpacity={active ? 0.7 : 1}
                  strokeDasharray={active ? "none" : "1.2 1.2"}
                  markerEnd={active ? `url(#${markerId})` : undefined}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const active = isActive(node.id);
              const isSelected = selectedNode?.id === node.id;
              const isEGFRConstitutive = node.id === "egfr" && mode === "constitutive";
              const w = node.id === "nucleus" ? 26 : 20;
              const h = 7;
              return (
                <g key={node.id}
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  style={{ cursor: "pointer" }}
                  filter={isEGFRConstitutive ? "url(#egfr-glow)" : undefined}
                >
                  <rect
                    x={node.x - w / 2} y={node.y - h / 2}
                    width={w} height={h} rx={2}
                    fill={getNodeFill(node)}
                    stroke={getNodeStroke(node)}
                    strokeWidth={isSelected ? 0.9 : isEGFRConstitutive ? 0.8 : 0.5}
                  />
                  {/* Drug target indicator */}
                  {node.drugTarget && (
                    <circle cx={node.x + w / 2 - 1.5} cy={node.y - h / 2 + 1.5} r={1.2}
                      fill="rgba(79,142,247,0.8)" opacity={active ? 1 : 0.3} />
                  )}
                  <text x={node.x} y={node.y - 0.6}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={getNodeTextFill(node)}
                    fontSize="2.4" fontWeight={isSelected || isEGFRConstitutive ? "700" : "500"}
                    opacity={active ? 1 : 0.3}
                  >{node.label}</text>
                  <text x={node.x} y={node.y + 1.8}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={active ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.1)"}
                    fontSize="1.8"
                  >{node.sublabel}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {selectedNode ? (
            <div style={{
              background: "var(--surface)", border: `1px solid ${pathwayMeta[selectedNode.pathway].hex}30`,
              borderLeft: `3px solid ${pathwayMeta[selectedNode.pathway].hex}`,
              borderRadius: 12, padding: 20,
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: pathwayMeta[selectedNode.pathway].hex, marginBottom: 8 }}>
                {selectedNode.pathway} pathway
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4, letterSpacing: "-0.02em" }}>
                {selectedNode.label}
              </h3>
              <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)", marginBottom: 14 }}>
                {selectedNode.description}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.75 }}>
                {selectedNode.detail}
              </p>
              {selectedNode.drugTarget && (
                <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(79,142,247,0.07)", border: "1px solid rgba(79,142,247,0.18)", borderRadius: 6, fontSize: 11, color: "var(--helix)", fontFamily: "var(--font-mono)" }}>
                  Drug target: Gen1–3 TKIs + amivantamab act here
                </div>
              )}
              {!isActive(selectedNode.id) && (
                <div style={{ marginTop: 12, padding: "8px 12px", background: "var(--surface-2)", borderRadius: 6, fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  Inactive in constitutive mode — ligand requirement bypassed
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Pathway overview
              </div>
              {(Object.entries(pathwayMeta) as [Pathway, typeof pathwayMeta[Pathway]][])
                .filter(([k]) => k !== "shared")
                .map(([p, meta]) => (
                <div key={p} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 16, height: 2, background: meta.hex, borderRadius: 2 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: meta.hex, fontFamily: "var(--font-mono)" }}>{meta.name}</span>
                  </div>
                  <p style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.6 }}>
                    {p === "MAPK" && "RAS→RAF→MEK→ERK drives cell cycle progression and proliferation. KRAS/BRAF mutations bypass EGFR here — common TKI resistance mechanism."}
                    {p === "PI3K" && "PI3K→AKT→mTOR promotes cell survival, inhibits apoptosis. PIK3CA mutations and PTEN loss can reactivate this axis despite EGFR blockade."}
                    {p === "JAK-STAT" && "JAK→STAT3 drives immune evasion and bypass survival signaling. IL-6 from the tumor microenvironment can reactivate STAT3 in TKI-resistant cells."}
                  </p>
                </div>
              ))}
              <p style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.55 }}>
                Click any node in the diagram to explore its biology and resistance relevance.
              </p>
            </div>
          )}

          {/* Mode-specific resistance note */}
          {mode === "constitutive" && (
            <div style={{
              background: "rgba(255,140,66,0.06)", border: "1px solid rgba(255,140,66,0.18)",
              borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--amber)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Resistance cascade
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.65 }}>
                After TKI pressure, tumors acquire <strong style={{ color: "var(--amber)" }}>secondary bypass</strong>: MET amplification, KRAS mutation, PIK3CA, BRAF — all reactivate downstream signaling without needing EGFR.
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes egfr-pulse { 0%,100% { opacity:0.8; } 50% { opacity:1; } }
      `}</style>
    </div>
  );
}
