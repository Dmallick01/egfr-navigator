'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Variant, DrugEntry } from "@/lib/types";
import MolViewer, { type HoverAtomInfo } from "@/components/MolViewer";

// ─── Structural knowledge base ────────────────────────────────────────────────

const DOMAIN_START = 695;
const DOMAIN_END = 979;

const REGIONS = [
  {
    name: 'P-loop', short: 'P-loop', start: 695, end: 700, color: '#60A5FA',
    fact: 'Glycine-rich loop that positions ATP α-phosphate for transfer. G719X (exon 18) is an activating mutation in this region.',
  },
  {
    name: 'αC-helix', short: 'αC', start: 724, end: 742, color: '#A78BFA',
    fact: 'Regulatory helix that rotates inward to activate the kinase. The E738–K745 salt bridge is required for the catalytically active conformation.',
  },
  {
    name: 'Hinge', short: 'Hinge', start: 748, end: 756, color: '#34D399',
    fact: 'Backbone NH/C=O of M749 and M793 donate and accept hydrogen bonds from ALL approved EGFR TKIs — the pharmacophoric anchor of the ATP binding site.',
  },
  {
    name: 'Gatekeeper', short: 'T790', start: 788, end: 792, color: '#FBBF24',
    fact: 'T790M mutation adds methionine bulk, sterically excluding erlotinib and gefitinib from the hydrophobic back pocket. Osimertinib (Gen 3) was designed to accommodate the larger methionine.',
  },
  {
    name: 'Cys797 loop', short: 'C797', start: 794, end: 800, color: '#F97316',
    fact: 'C797 is the nucleophilic cysteine targeted by Gen 2 (afatinib, dacomitinib) and Gen 3 (osimertinib) irreversible TKIs. C797S mutation abolishes covalent bond formation.',
  },
  {
    name: 'DFG motif', short: 'DFG', start: 855, end: 857, color: '#FB923C',
    fact: 'D855 coordinates Mg²⁺ for ATP catalytic phosphotransfer. DFG-in = active kinase; DFG-out = inactive conformation with allosteric back pocket exposed.',
  },
  {
    name: 'Activation loop', short: 'A-loop', start: 858, end: 877, color: '#FDA4AF',
    fact: 'L858R (exon 21) disrupts autoinhibitory contacts between the A-loop and αC-helix, locking EGFR in a constitutively active state. Y869 phosphorylation further stabilizes active conformation.',
  },
];

// Key contacts from published crystal structures (conservative, well-documented)
const DRUG_CONTACTS: Record<string, number[]> = {
  'Erlotinib':    [742, 745, 749, 751, 788, 790, 793],
  'Gefitinib':    [742, 745, 749, 751, 788, 790, 793],
  'Afatinib':     [742, 745, 749, 751, 788, 790, 793, 797],
  'Dacomitinib':  [742, 745, 749, 751, 788, 790, 793, 797],
  'Osimertinib':  [742, 745, 749, 751, 790, 793, 797],
  'Mobocertinib': [742, 745, 749, 751, 790, 793, 797],
  'Amivantamab':  [],
  'CFT8919':      [790, 858],
};

const DRUG_POCKET: Record<string, { pocket: string; covalent: boolean; target?: string }> = {
  'Erlotinib':    { pocket: 'ATP-competitive · front pocket', covalent: false },
  'Gefitinib':    { pocket: 'ATP-competitive · front pocket', covalent: false },
  'Afatinib':     { pocket: 'ATP-competitive + covalent bond', covalent: true, target: 'C797' },
  'Dacomitinib':  { pocket: 'ATP-competitive + covalent bond', covalent: true, target: 'C797' },
  'Osimertinib':  { pocket: 'ATP-competitive + covalent bond', covalent: true, target: 'C797' },
  'Mobocertinib': { pocket: 'ATP-competitive · exon 20 pocket', covalent: true, target: 'C797' },
  'Amivantamab':  { pocket: 'Extracellular domain III + MET', covalent: false },
  'CFT8919':      { pocket: 'Allosteric · αC-helix / A-loop', covalent: false },
};

// Per-residue annotations from structural biology literature
const RESIDUE_FACTS: Record<number, { role: string; fact: string }> = {
  719: { role: 'G719 · P-loop', fact: 'G719X mutations (exon 18) constitutively activate EGFR by disrupting P-loop autoinhibitory contacts. Afatinib outperforms erlotinib/gefitinib at this site.' },
  738: { role: 'E738 · αC-helix', fact: 'Forms the E738–K745 ionic salt bridge essential for stabilizing the active kinase conformation. αC-helix inward rotation closes this bridge.' },
  742: { role: 'M742 · αC-helix', fact: 'Hydrophobic contact for the adenine ring of ATP and several TKIs. Sits at the C-terminal end of the regulatory αC-helix.' },
  745: { role: 'K745 · Catalytic lysine', fact: 'Coordinates ATP α/β-phosphates for phosphotransfer. Universally conserved across protein kinases — loss of this residue abolishes catalytic activity.' },
  748: { role: 'E748 · Hinge', fact: 'Hinge entry residue — backbone carbonyl accepts hydrogen bonds from inhibitor NH groups entering the ATP cavity.' },
  749: { role: 'M749 · Hinge (key contact)', fact: 'Backbone NH donates a critical hydrogen bond to ALL approved EGFR TKIs. This single interaction is pharmacophoric — any ATP-site drug must engage M749.' },
  751: { role: 'C751 · Hinge', fact: 'Backbone hydrogen bond partner found in many TKI crystal structures. Part of the β4-strand hinge segment.' },
  768: { role: 'S768 · C-lobe', fact: 'S768I (exon 20) is an uncommon activating mutation. Afatinib and osimertinib are clinically active; combination approaches are being explored.' },
  788: { role: 'L788 · Back pocket', fact: 'Hydrophobic back pocket residue flanking the gatekeeper T790. Contributes to the selectivity filter for bulky inhibitors.' },
  790: { role: 'T790 · Gatekeeper', fact: 'T790M is the most common mechanism of acquired resistance to Gen 1/2 TKIs (found in ~60% of resistance biopsies). Methionine adds van der Waals bulk that sterically excludes erlotinib and gefitinib. Osimertinib was engineered to fit the larger methionine without clash.' },
  793: { role: 'M793 · Hinge (C-terminal)', fact: 'Backbone carbonyl contacts amine groups of most TKIs via hydrogen bond — a conserved interaction across the hinge region.' },
  797: { role: 'C797 · Covalent site', fact: 'Nucleophilic cysteine attacked by the acrylamide warhead of irreversible Gen 2 and Gen 3 TKIs. C797S substitution abolishes covalent bond formation and is a major clinical resistance mechanism to osimertinib (triple mutant: del19 + T790M + C797S).' },
  855: { role: 'D855 · DFG-Asp', fact: 'Coordinates Mg²⁺ ion for ATP phosphotransfer. Among the most conserved residues across all protein kinases. DFG → in/out conformational switch regulates activity.' },
  856: { role: 'F856 · DFG-Phe', fact: 'Phenylalanine flips between DFG-in (active) and DFG-out (inactive) conformations. DFG-out exposes the allosteric back pocket targeted by type II inhibitors.' },
  858: { role: 'L858 · Activation loop', fact: 'L858R (exon 21) is the most prevalent EGFR mutation in NSCLC (~45% of sensitizing mutations). Arginine breaks hydrophobic contacts that normally hold the A-loop in its autoinhibited pose, constitutively activating kinase.' },
  861: { role: 'L861 · Activation loop', fact: 'L861Q (exon 21) is an uncommon sensitizing mutation. Afatinib is preferred; osimertinib is also effective.' },
  869: { role: 'Y869 · A-loop phosphosite', fact: 'Trans-autophosphorylation of Y869 locks the activation loop in the active-open conformation, amplifying kinase activity.' },
};

function getRegionForResidue(resi: number) {
  return REGIONS.find(r => resi >= r.start && resi <= r.end) ?? null;
}

function getDrugContacts(drugName: string): number[] {
  return DRUG_CONTACTS[drugName] ?? [];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KinaseDomainStrip({
  mutationResidue,
  drugContacts,
  hoveredResidue,
}: {
  mutationResidue: number;
  drugContacts: number[];
  hoveredResidue: number | null;
}) {
  const W = 900;
  const H = 80;
  const BAR_Y = 32;
  const BAR_H = 10;

  const px = (resi: number) => ((resi - DOMAIN_START) / (DOMAIN_END - DOMAIN_START)) * W;

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-3)' }}>
          Kinase domain map · residues {DOMAIN_START}–{DOMAIN_END}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {[
            { color: '#FF8C42', label: 'mutation' },
            { color: '#34D399', label: 'drug contact' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.30)', fontFamily: 'var(--font-mono)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block', overflow: 'visible' }}>
        {/* Base rail */}
        <rect x={0} y={BAR_Y} width={W} height={BAR_H} rx={3} fill="rgba(255,255,255,0.05)" />

        {/* Structural region segments */}
        {REGIONS.map(r => (
          <g key={r.name}>
            <rect
              x={px(r.start)} y={BAR_Y}
              width={Math.max(6, px(r.end + 1) - px(r.start))}
              height={BAR_H}
              rx={2}
              fill={r.color}
              opacity={0.65}
            />
            <text
              x={(px(r.start) + px(r.end)) / 2} y={58}
              textAnchor="middle"
              fill="rgba(255,255,255,0.30)"
              fontSize={8}
              fontFamily="monospace"
            >
              {r.short}
            </text>
          </g>
        ))}

        {/* Drug contact residue markers */}
        {drugContacts.map(resi => (
          <circle
            key={`dc-${resi}`}
            cx={px(resi)}
            cy={BAR_Y - 6}
            r={3.5}
            fill="#34D399"
            opacity={0.85}
          />
        ))}

        {/* Mutation marker — triangle above bar */}
        {mutationResidue >= DOMAIN_START && mutationResidue <= DOMAIN_END && (
          <polygon
            points={`${px(mutationResidue)},${BAR_Y - 14} ${px(mutationResidue) - 6},${BAR_Y - 2} ${px(mutationResidue) + 6},${BAR_Y - 2}`}
            fill="#FF8C42"
          />
        )}

        {/* Hovered residue crosshair */}
        {hoveredResidue !== null && hoveredResidue >= DOMAIN_START && hoveredResidue <= DOMAIN_END && (
          <line
            x1={px(hoveredResidue)} y1={0}
            x2={px(hoveredResidue)} y2={H}
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={1}
            strokeDasharray="3,2"
          />
        )}

        {/* Axis endpoints */}
        <text x={0} y={72} fill="rgba(255,255,255,0.20)" fontSize={8} fontFamily="monospace">{DOMAIN_START}</text>
        <text x={W} y={72} fill="rgba(255,255,255,0.20)" fontSize={8} fontFamily="monospace" textAnchor="end">{DOMAIN_END}</text>
      </svg>
    </div>
  );
}

function ResidueInfoPanel({ atom, drugContacts }: { atom: HoverAtomInfo | null; drugContacts: number[] }) {
  if (!atom) {
    return (
      <div style={{
        padding: '10px 14px',
        fontSize: 12,
        color: 'var(--text-3)',
        textAlign: 'center',
        fontStyle: 'italic',
      }}>
        Hover any atom in the 3D structure to explore residue function
      </div>
    );
  }

  const region = getRegionForResidue(atom.resi);
  const facts = RESIDUE_FACTS[atom.resi];
  const isContact = drugContacts.includes(atom.resi);
  const threeToOne: Record<string, string> = {
    ALA:'A',ARG:'R',ASN:'N',ASP:'D',CYS:'C',GLN:'Q',GLU:'E',GLY:'G',HIS:'H',
    ILE:'I',LEU:'L',LYS:'K',MET:'M',PHE:'F',PRO:'P',SER:'S',THR:'T',TRP:'W',
    TYR:'Y',VAL:'V',
  };
  const oneLetter = threeToOne[atom.resn.toUpperCase()] ?? '?';

  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 14px' }}>
      {/* Residue badge */}
      <div style={{
        flexShrink: 0,
        width: 56, height: 56,
        borderRadius: 8,
        background: region ? `${region.color}18` : 'rgba(255,255,255,0.05)',
        border: `1px solid ${region ? region.color + '40' : 'rgba(255,255,255,0.10)'}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: region?.color ?? 'var(--text)', lineHeight: 1 }}>
          {oneLetter}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>
          {atom.resi}
        </span>
      </div>

      {/* Context */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
            {atom.resn} {atom.resi}
          </span>
          {region && (
            <span style={{
              fontSize: 10, fontWeight: 500,
              color: region.color,
              background: `${region.color}18`,
              border: `1px solid ${region.color}35`,
              padding: '1px 7px', borderRadius: 4,
            }}>
              {region.name}
            </span>
          )}
          {isContact && (
            <span style={{
              fontSize: 10, fontWeight: 500,
              color: '#34D399',
              background: 'rgba(52,211,153,0.12)',
              border: '1px solid rgba(52,211,153,0.30)',
              padding: '1px 7px', borderRadius: 4,
            }}>
              drug contact
            </span>
          )}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>
          {facts?.fact ?? region?.fact ?? 'EGFR kinase domain residue.'}
        </p>
      </div>
    </div>
  );
}

function StructureContextPanel({ drug }: { drug: DrugEntry }) {
  const pocket = DRUG_POCKET[drug.name];
  const contacts = getDrugContacts(drug.name);
  if (!pocket) return null;

  return (
    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
          Binding pocket
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{pocket.pocket}</p>
      </div>

      {pocket.covalent && pocket.target && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(249,115,22,0.10)', border: '1px solid rgba(249,115,22,0.25)',
          borderRadius: 5, padding: '4px 10px', alignSelf: 'flex-start',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: '#F97316', fontWeight: 500 }}>
            Covalent bond → {pocket.target}
          </span>
        </div>
      )}

      {contacts.length > 0 && (
        <div>
          <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Key contact residues
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {contacts.map(resi => {
              const region = getRegionForResidue(resi);
              const label = RESIDUE_FACTS[resi]?.role.split(' · ')[0] ?? `Res ${resi}`;
              return (
                <span key={resi} style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: region?.color ?? 'var(--text-2)',
                  background: region ? `${region.color}12` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${region ? region.color + '30' : 'rgba(255,255,255,0.10)'}`,
                  borderRadius: 4, padding: '2px 7px',
                }}>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Status config ─────────────────────────────────────────────────────────────

const statusConfig = {
  sensitive: {
    color: "var(--emerald-light)",
    bg: "var(--emerald-dim)",
    border: "rgba(5,150,105,0.25)",
    leftBorder: "var(--emerald)",
    icon: "✓",
    label: "Sensitive",
  },
  resistant: {
    color: "var(--rose-light)",
    bg: "var(--rose-dim, rgba(190,18,60,0.10))",
    border: "rgba(190,18,60,0.25)",
    leftBorder: "var(--rose)",
    icon: "✗",
    label: "Resistant",
  },
  partially_resistant: {
    color: "var(--amber-light)",
    bg: "var(--amber-dim)",
    border: "rgba(217,119,6,0.25)",
    leftBorder: "var(--amber)",
    icon: "~",
    label: "Partially Resistant",
  },
};

// ─── Main component ────────────────────────────────────────────────────────────

interface Props {
  variants: Variant[];
}

export default function InSilicoLab({ variants }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedDrugName, setSelectedDrugName] = useState<string>("");
  const [hoveredAtom, setHoveredAtom] = useState<HoverAtomInfo | null>(null);
  const [manualPdbId, setManualPdbId] = useState<string>("");

  const selectedVariant = useMemo(() => variants.find((v) => v.id === selectedVariantId) || null, [variants, selectedVariantId]);
  const availableDrugs: DrugEntry[] = useMemo(() => selectedVariant ? selectedVariant.drugs : [], [selectedVariant]);
  const selectedDrug: DrugEntry | null = useMemo(() => {
    if (!selectedVariant || !selectedDrugName) return null;
    return selectedVariant.drugs.find((d) => d.name === selectedDrugName) || null;
  }, [selectedVariant, selectedDrugName]);

  const effectivePdbId = useMemo(
    () => manualPdbId || selectedVariant?.pdb_ids[0] || "",
    [manualPdbId, selectedVariant]
  );

  const drugContacts = useMemo(
    () => selectedDrug ? getDrugContacts(selectedDrug.name) : [],
    [selectedDrug]
  );

  const handleVariantChange = (id: string) => {
    setSelectedVariantId(id);
    setSelectedDrugName("");
    setManualPdbId("");
    setHoveredAtom(null);
  };

  const typeColor = (type: string) => {
    if (type === "sensitizing") return "var(--emerald-light)";
    if (type === "resistance") return "var(--amber-light)";
    if (type === "exon20_insertion") return "var(--sky-light)";
    return "var(--text-3)";
  };

  const selectStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px",
    background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 8,
    color: "var(--text)", fontSize: 14, cursor: "pointer", appearance: "none",
    fontFamily: "var(--font-body)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.05em",
    color: "var(--text-3)", marginBottom: 8,
  };

  const hasPdb = selectedVariant && selectedVariant.pdb_ids.length > 0;

  return (
    <div>
      {/* Disclaimer */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 24, fontSize: 12, color: "var(--text-3)" }}>
        Data-driven sandbox: predictions based on curated clinical/biochemical evidence. Not for clinical use.
      </div>

      {/* Selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div>
          <label htmlFor="variant-select" style={labelStyle}>Select Variant</label>
          <select id="variant-select" value={selectedVariantId} onChange={(e) => handleVariantChange(e.target.value)} style={selectStyle}>
            <option value="" style={{ background: "#0B0E17", color: "#4E566A" }}>— choose variant —</option>
            {variants.map((v) => (
              <option key={v.id} value={v.id} style={{ background: "#0B0E17", color: "#F1F5F9" }}>{v.common_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="drug-select" style={labelStyle}>Select Drug</label>
          <select
            id="drug-select"
            value={selectedDrugName}
            onChange={(e) => setSelectedDrugName(e.target.value)}
            disabled={!selectedVariantId}
            style={{ ...selectStyle, cursor: selectedVariantId ? "pointer" : "not-allowed", opacity: selectedVariantId ? 1 : 0.5 }}
          >
            <option value="" style={{ background: "#0B0E17", color: "#4E566A" }}>
              {selectedVariantId ? "— choose drug —" : "— select variant first —"}
            </option>
            {availableDrugs.map((d) => (
              <option key={d.name} value={d.name} style={{ background: "#0B0E17", color: "#F1F5F9" }}>
                {d.name}{d.generation ? ` (Gen ${d.generation})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Variant summary */}
      {selectedVariant && (
        <div className="card" style={{ padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="mono" style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{selectedVariant.common_name}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: typeColor(selectedVariant.type), background: `${typeColor(selectedVariant.type)}18`, padding: "2px 8px", borderRadius: 4 }}>
              {selectedVariant.type.replace("_", " ")}
            </span>
          </div>
          <Link href={`/variant/${selectedVariant.id}`} style={{ fontSize: 12, fontWeight: 500, color: "var(--sky-light)", textDecoration: "none" }}>Full profile →</Link>
        </div>
      )}

      {/* Drug response card */}
      {selectedDrug && selectedVariant && (
        <div
          key={`${selectedVariant.id}-${selectedDrug.name}`}
          className="animate-fade-in-up"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: `3px solid ${statusConfig[selectedDrug.status]?.leftBorder || "var(--border-2)"}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, color: statusConfig[selectedDrug.status]?.color || "var(--text)" }}>
              {statusConfig[selectedDrug.status]?.label}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-2)" }}>
              {selectedVariant.common_name} + {selectedDrug.name}
            </div>
          </div>

          <div style={{ background: "var(--surface-2)", borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
            <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Mechanism</p>
            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>{selectedDrug.mechanism}</p>
          </div>

          {selectedDrug.ic50_nm !== null && (
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 2, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>IC50</p>
                <p className="mono" style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: statusConfig[selectedDrug.status]?.color || "var(--text)" }}>
                  {selectedDrug.ic50_nm} nM
                </p>
              </div>
              {selectedDrug.generation !== null && (
                <div>
                  <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 2, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Generation</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>{selectedDrug.generation}</p>
                </div>
              )}
            </div>
          )}

          {selectedDrug.note && (
            <div style={{ background: "var(--surface-2)", borderRadius: 6, padding: "10px 14px", fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>
              {selectedDrug.note}
            </div>
          )}
        </div>
      )}

      {/* ── 3D Structure Section ─────────────────────────────────────────── */}
      {selectedDrug && selectedVariant && hasPdb && (
        <div className="animate-fade-in-up">
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-3)' }}>
                Crystal Structure · 3D Explorer
              </span>
              {selectedVariant.pdb_ids.length > 1 ? (
                <select
                  value={effectivePdbId}
                  onChange={e => { setManualPdbId(e.target.value); setHoveredAtom(null); }}
                  style={{
                    fontSize: 11, background: 'var(--surface-2)', border: '1px solid var(--border-2)',
                    borderRadius: 4, padding: '2px 6px', color: 'var(--text-2)', cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {selectedVariant.pdb_ids.map(id => (
                    <option key={id} value={id} style={{ background: '#0B0E17' }}>{id}</option>
                  ))}
                </select>
              ) : (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
                  {effectivePdbId}
                </span>
              )}
            </div>
            <a
              href={`https://www.rcsb.org/structure/${effectivePdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: 'var(--sky-light)', textDecoration: 'none' }}
            >
              RCSB ↗
            </a>
          </div>

          {/* 3Dmol viewer */}
          <MolViewer
            pdbId={effectivePdbId}
            mutationResidue={selectedVariant.position}
            mutationLabel={selectedVariant.common_name}
            onAtomHover={setHoveredAtom}
          />

          {/* Two-column layout: hover panel + context panel */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginTop: 12,
          }}>
            {/* Hover residue info */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              minHeight: 96,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <ResidueInfoPanel atom={hoveredAtom} drugContacts={drugContacts} />
            </div>

            {/* Structural context */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
            }}>
              <StructureContextPanel drug={selectedDrug} />
            </div>
          </div>

          {/* Kinase domain sequence map */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 16px',
            marginTop: 12,
          }}>
            <KinaseDomainStrip
              mutationResidue={selectedVariant.position}
              drugContacts={drugContacts}
              hoveredResidue={hoveredAtom?.resi ?? null}
            />
          </div>
        </div>
      )}

      {/* Empty states */}
      {!selectedVariantId && (
        <div className="card" style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-3)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, marginBottom: 6, color: "var(--text-2)" }}>Select a variant and drug above</div>
          <div style={{ fontSize: 13 }}>Results are based on curated clinical and biochemical evidence.</div>
        </div>
      )}

      {selectedVariantId && !selectedDrugName && (
        <div className="card" style={{ padding: "28px 24px", textAlign: "center", color: "var(--text-3)", fontSize: 14 }}>
          Now select a drug to see the predicted response for{" "}
          <span className="mono" style={{ color: "var(--text)" }}>{selectedVariant?.common_name}</span>.
        </div>
      )}
    </div>
  );
}
