'use client';

import { useState } from "react";
import Link from "next/link";
import type { ResistanceGraph, ResistanceNode, ResistanceEdge } from "@/lib/types";

interface Props { graph: ResistanceGraph; }

// ── Style maps ────────────────────────────────────────────────────────────────

const typeStyle: Record<string, { color: string; bg: string; border: string; shadow: string }> = {
  mutation: {
    color: '#FF8C42',
    bg: 'rgba(255,140,66,0.09)',
    border: 'rgba(255,140,66,0.30)',
    shadow: '0 0 18px rgba(255,140,66,0.14)',
  },
  drug: {
    color: '#4F8EF7',
    bg: 'rgba(79,142,247,0.09)',
    border: 'rgba(79,142,247,0.30)',
    shadow: '0 0 18px rgba(79,142,247,0.14)',
  },
  frontier: {
    color: '#9B59F5',
    bg: 'rgba(155,89,245,0.09)',
    border: 'rgba(155,89,245,0.30)',
    shadow: '0 0 22px rgba(155,89,245,0.18)',
  },
  outcome: {
    color: 'rgba(255,255,255,0.42)',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.12)',
    shadow: 'none',
  },
  start: {
    color: '#00C896',
    bg: 'rgba(0,200,150,0.09)',
    border: 'rgba(0,200,150,0.30)',
    shadow: '0 0 18px rgba(0,200,150,0.14)',
  },
};

const greenIds = new Set(['sensitizing', 'exon20_branch']);

function nodeS(node: ResistanceNode) {
  if (greenIds.has(node.id)) return typeStyle.start;
  return typeStyle[node.type] ?? typeStyle.outcome;
}

const triggerColor: Record<string, string> = {
  drug: '#4F8EF7',
  mutation: '#FF8C42',
  time: '#9B59F5',
};
const triggerBase: Record<string, string> = {
  drug: 'rgba(79,142,247',
  mutation: 'rgba(255,140,66',
  time: 'rgba(155,89,245',
};

// ── Lanes ─────────────────────────────────────────────────────────────────────

const lanes = [
  {
    label: '01 · Main arc — classic pathway',
    sub: '1st/2nd gen → T790M → osimertinib → C797S → PROTAC',
    ids: ['sensitizing', '1st2nd_gen', 't790m_acquired', '3rd_gen', 'c797s_acquired', 'degrader_frontier'],
  },
  {
    label: '02 · 1st-line path — direct osimertinib',
    sub: 'FLAURA preferred strategy',
    ids: ['sensitizing', 'first_line_osimertinib', 'c797s_firstline', 'degrader_frontier'],
  },
  {
    label: '03 · Exon 20 branch',
    sub: 'Insertion variants · bispecific antibody',
    ids: ['exon20_branch', 'amivantamab'],
  },
  {
    label: '04 · Off-target resistance',
    sub: 'MET amp / HER2 amp / bypass signalling',
    ids: ['3rd_gen', 'offtarget_resistance', '4th_gen_allosteric'],
  },
];

// ── Flow connector between two adjacent nodes ─────────────────────────────────

function Connector({ trigger, label }: { trigger: string; label: string }) {
  const color = triggerColor[trigger] ?? triggerColor.drug;
  const base = triggerBase[trigger] ?? triggerBase.drug;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 56, gap: 5 }}>
      {/* Track with animated flow dots */}
      <div style={{ position: 'relative', width: '100%', height: 16, display: 'flex', alignItems: 'center' }}>
        {/* Track line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '50%',
          height: 1,
          background: `linear-gradient(to right, ${base},0.08), ${base},0.55), ${base},0.08))`,
          transform: 'translateY(-50%)',
        }} />
        {/* Arrowhead */}
        <div style={{
          position: 'absolute', right: 1,
          width: 0, height: 0,
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: `6px solid ${color}`,
          opacity: 0.8,
        }} />
      </div>
      {/* Edge label */}
      <span style={{
        fontSize: 7.5,
        color: 'var(--text-3)',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
        lineHeight: 1.2,
        maxWidth: 54,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        letterSpacing: '0.01em',
      }}>
        {label}
      </span>
    </div>
  );
}

// ── Individual node card ──────────────────────────────────────────────────────

function NodeCard({
  node,
  isSelected,
  onToggle,
}: {
  node: ResistanceNode;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const s = nodeS(node);

  return (
    <button
      onClick={onToggle}
      style={{
        minWidth: 148,
        maxWidth: 188,
        flexShrink: 0,
        padding: '11px 13px',
        borderRadius: 9,
        border: `1px solid ${isSelected ? s.color : s.border}`,
        background: isSelected ? s.bg : 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isSelected
          ? `${s.shadow}, 0 4px 16px rgba(0,0,0,0.55)`
          : '0 1px 4px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.18s ease',
        position: 'relative',
        outline: 'none',
      }}
    >
      {/* Glow dot */}
      <div style={{
        width: 7, height: 7,
        borderRadius: '50%',
        background: s.color,
        boxShadow: `0 0 7px ${s.color}`,
        marginBottom: 8,
        flexShrink: 0,
      }} />
      {/* Type label */}
      <div style={{
        fontSize: 8.5,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: s.color,
        marginBottom: 5,
        fontFamily: 'var(--font-mono)',
        opacity: 0.85,
      }}>
        {node.type}
      </div>
      {/* Node label */}
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text)',
        lineHeight: 1.35,
        fontFamily: 'var(--font-heading)',
      }}>
        {node.label}
      </div>
    </button>
  );
}

// ── Lane row ──────────────────────────────────────────────────────────────────

function Lane({
  label, sub, ids, nodeMap, edgeMap, selectedId, onToggle,
}: {
  label: string;
  sub: string;
  ids: string[];
  nodeMap: Record<string, ResistanceNode>;
  edgeMap: Map<string, ResistanceEdge>;
  selectedId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      {/* Lane header */}
      <div style={{ marginBottom: 10 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          color: 'var(--text-3)',
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9.5,
          color: 'var(--text-3)',
          marginLeft: 10,
        }}>
          {sub}
        </span>
      </div>

      {/* Track row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        overflowX: 'auto',
        paddingBottom: 6,
        paddingTop: 2,
        scrollbarWidth: 'none',
      }}>
        {ids.map((nodeId, i) => {
          const node = nodeMap[nodeId];
          if (!node) return null;
          const edge = edgeMap.get(`${ids[i]}:${ids[i + 1]}`);
          const isLast = i === ids.length - 1;

          return (
            <div key={nodeId} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <NodeCard
                node={node}
                isSelected={selectedId === nodeId}
                onToggle={() => onToggle(nodeId)}
              />
              {!isLast && (
                <Connector
                  trigger={edge?.trigger ?? 'drug'}
                  label={edge?.label ?? ''}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Detail panel for selected node ────────────────────────────────────────────

function DetailPanel({
  node,
  allEdges,
  nodeMap,
  onNavigate,
  onClose,
}: {
  node: ResistanceNode;
  allEdges: ResistanceEdge[];
  nodeMap: Record<string, ResistanceNode>;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const s = nodeS(node);
  const related = allEdges.filter(e => e.from === node.id || e.to === node.id);

  return (
    <div style={{
      marginTop: 24,
      background: 'rgba(255,255,255,0.97)',
      border: `1px solid ${s.border}`,
      borderRadius: 12,
      padding: 22,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: s.shadow,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}`, flexShrink: 0 }} />
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: s.color }}>
              {node.type}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            {node.label}
          </h2>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', fontSize: 14, padding: 4, flexShrink: 0 }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 16 }}>{node.description}</p>

      {/* Variant chips */}
      {node.variant_ids.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
            Related variants
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {node.variant_ids.map(vid => (
              <Link
                key={vid}
                href={`/variant/${vid}`}
                style={{
                  fontSize: 11, fontWeight: 500,
                  color: s.color,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  padding: '3px 10px', borderRadius: 5,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {vid} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Connections */}
      {related.length > 0 && (
        <div>
          <p style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
            Connections
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {related.map((edge, i) => {
              const other = edge.from === node.id ? edge.to : edge.from;
              const dir = edge.from === node.id ? '→' : '←';
              const otherNode = nodeMap[other];
              const ec = triggerColor[edge.trigger] ?? '#4F8EF7';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <span style={{ color: ec, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11 }}>{dir}</span>
                  <button
                    onClick={() => onNavigate(other)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(79,142,247,0.85)', fontSize: 12, fontWeight: 500, padding: 0, textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 3 }}
                  >
                    {otherNode?.label ?? other}
                  </button>
                  <span style={{ color: 'var(--text-3)', fontSize: 11 }}>{edge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 28 }}>
      {[
        { label: 'Sensitizing mutation', color: '#00C896' },
        { label: 'Drug / therapy', color: '#4F8EF7' },
        { label: 'Resistance mutation', color: '#FF8C42' },
        { label: 'Frontier', color: '#9B59F5' },
        { label: 'Outcome', color: 'var(--text-3)' },
      ].map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color, flexShrink: 0 }} />
          <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{item.label}</span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 20, height: 1, background: 'rgba(79,142,247,0.5)' }} />
          <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>drug</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 20, height: 1, background: 'rgba(255,140,66,0.5)' }} />
          <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>resistance</span>
        </div>
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export default function ResistanceTimeline({ graph }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>('sensitizing');

  const nodeMap = Object.fromEntries(graph.nodes.map(n => [n.id, n]));

  const edgeMap = new Map<string, ResistanceEdge>();
  graph.edges.forEach(e => edgeMap.set(`${e.from}:${e.to}`, e));

  const selectedNode = selectedId ? nodeMap[selectedId] ?? null : null;

  function toggle(id: string) {
    setSelectedId(prev => (prev === id ? null : id));
  }

  return (
    <div>
      <Legend />

      {lanes.map(lane => (
        <Lane
          key={lane.label}
          label={lane.label}
          sub={lane.sub}
          ids={lane.ids}
          nodeMap={nodeMap}
          edgeMap={edgeMap}
          selectedId={selectedId}
          onToggle={toggle}
        />
      ))}

      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          allEdges={graph.edges}
          nodeMap={nodeMap}
          onNavigate={toggle}
          onClose={() => setSelectedId(null)}
        />
      )}

      <style>{`
        /* hide scrollbars in lane rows */
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
