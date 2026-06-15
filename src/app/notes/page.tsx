'use client';
import { useState } from 'react';

type NoteEntry = {
  id: string;
  heading: string;
  content: string;
  tags?: string[];
};

type Section = {
  id: string;
  subject: string;
  color: string;
  description: string;
  entries: NoteEntry[];
};

const NOTES_DATA: Section[] = [
  {
    id: 'egfr-pharmacology',
    subject: 'EGFR & Drug Mechanisms',
    color: 'var(--helix)',
    description: 'Variant biology, TKI resistance, and PROTAC degraders',
    entries: [
      {
        id: 'protac-vs-tki',
        heading: 'Why PROTACs beat TKIs at C797S',
        content: `Osimertinib covalently binds Cys797 in the ATP pocket. C797S removes that cysteine — the drug has nothing to latch onto.

CFT8919 (C4 Therapeutics) works differently: one end binds EGFR, the other recruits CRBN (an E3 ubiquitin ligase). The ternary complex tags EGFR for proteasomal degradation. The kinase domain conformation doesn't matter because you're removing the protein entirely.

Key question I'm tracking: does degradation kinetics (DC50, Dmax) correlate with clinical response better than IC50 for TKIs?`,
        tags: ['PROTAC', 'C797S', 'CFT8919'],
      },
      {
        id: 't790m-timing',
        heading: 'T790M emergence timing',
        content: `T790M appears in ~50–60% of patients after 1st/2nd gen TKI failure, usually within 9–14 months. It's a gatekeeper mutation — steric hindrance in the ATP binding pocket blocks reversible inhibitors.

Osimertinib was designed specifically for this: irreversible covalent binding to Cys797 bypasses the gatekeeper. FLAURA showed PFS 18.9 vs 10.2 months (osimertinib vs 1st gen).

But C797S emerges on osimertinib in ~15–20% of cases. That's the current frontier.`,
        tags: ['T790M', 'Osimertinib', 'Resistance'],
      },
    ],
  },
  {
    id: 'research-questions',
    subject: 'Open Questions',
    color: 'var(--violet)',
    description: "Hypotheses I'm exploring across cardiac and oncology research",
    entries: [
      {
        id: 'ideas-scratch',
        heading: 'Active research threads',
        content: `Cardiac fibrosis (BCH Choudhury Lab):
- Which fibroblast subpopulations are most amenable to therapeutic targeting?
- Is there an EGFR/ErbB signaling component in cardiac fibrosis?
- Cross-tissue comparison: lung vs cardiac fibrosis at the transcriptomic level

EGFR outside NSCLC:
- Why don't kinase-domain mutations occur at the same frequency in CRC?
- Tissue-specific chromatin accessibility vs stem cell of origin?

Population genetics:
- East Asian EGFR mutation frequency — germline rs2227983 vs environmental (indoor air pollution)?

PROTAC design:
- CRBN vs VHL vs MDM2 — which E3 ligase is optimal for EGFR degradation in lung tissue?`,
        tags: ['Cardiac', 'EGFR', 'Hypotheses'],
      },
    ],
  },
];

export default function NotesPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  const [localNotes, setLocalNotes] = useState<Record<string, string>>({});
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  function toggleEntry(id: string) {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function saveLocalNote(entryId: string, text: string) {
    localStorage.setItem(`note-entry-${entryId}`, text);
    setSavedIds((prev) => new Set(prev).add(entryId));
    setTimeout(() => setSavedIds((prev) => { const n = new Set(prev); n.delete(entryId); return n; }), 2000);
  }

  const sections = activeSection ? NOTES_DATA.filter((s) => s.id === activeSection) : NOTES_DATA;
  const totalEntries = NOTES_DATA.reduce((sum, s) => sum + s.entries.length, 0);

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 20px 100px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Research Log
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
          Notes
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.65, maxWidth: 560 }}>
          {totalEntries} entries on EGFR pharmacology and open research questions. Browser annotations save locally.
        </p>
      </div>

      {/* Subject tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        <button
          onClick={() => setActiveSection(null)}
          style={{ fontSize: 12, fontFamily: 'var(--font-mono)', padding: '6px 14px', borderRadius: 7, border: '1px solid var(--border)', cursor: 'pointer', background: !activeSection ? 'var(--text)' : 'transparent', color: !activeSection ? '#fff' : 'var(--text-3)', transition: 'all 0.15s' }}>
          All
        </button>
        {NOTES_DATA.map((sec) => (
          <button key={sec.id}
            onClick={() => setActiveSection(activeSection === sec.id ? null : sec.id)}
            style={{ fontSize: 12, fontFamily: 'var(--font-mono)', padding: '6px 14px', borderRadius: 7, border: `1px solid ${activeSection === sec.id ? sec.color : 'var(--border)'}`, cursor: 'pointer', background: activeSection === sec.id ? sec.color : 'transparent', color: activeSection === sec.id ? '#fff' : 'var(--text-3)', transition: 'all 0.15s' }}>
            {sec.subject}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {sections.map((section) => (
          <div key={section.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, paddingBottom: 12, borderBottom: `2px solid ${section.color}22` }}>
              <div style={{ width: 3, height: 28, borderRadius: 2, background: section.color, flexShrink: 0 }} />
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 2 }}>
                  {section.subject}
                </h2>
                <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>{section.description}</p>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>
                {section.entries.length} {section.entries.length === 1 ? 'note' : 'notes'}
              </span>
            </div>

            {section.entries.length === 0 ? (
              <div style={{ padding: '20px 18px', background: '#fff', border: '1px solid var(--border)', borderRadius: 9, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)' }}>
                No entries yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.entries.map((entry) => {
                  const open = expandedEntries.has(entry.id);
                  const localNote = localNotes[entry.id] ?? (typeof window !== 'undefined' ? localStorage.getItem(`note-entry-${entry.id}`) ?? '' : '');
                  return (
                    <div key={entry.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 9, overflow: 'hidden' }}>
                      <button
                        onClick={() => toggleEntry(entry.id)}
                        style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: section.color, flexShrink: 0 }} />
                          <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--text)', margin: 0 }}>{entry.heading}</h3>
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                          {entry.tags?.map((t) => (
                            <span key={t} style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '1px 6px', borderRadius: 3, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>{t}</span>
                          ))}
                          <span style={{ fontSize: 14, color: 'var(--text-3)', marginLeft: 4 }}>{open ? '↑' : '↓'}</span>
                        </div>
                      </button>

                      {open && (
                        <div style={{ borderTop: '1px solid var(--border)', padding: '16px 18px', background: 'var(--bg)' }}>
                          <pre style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', lineHeight: 1.75, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0, marginBottom: 20 }}>
                            {entry.content}
                          </pre>
                          <div>
                            <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--violet)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                              Annotations
                            </p>
                            <textarea
                              defaultValue={localNote}
                              onChange={(e) => setLocalNotes((prev) => ({ ...prev, [entry.id]: e.target.value }))}
                              placeholder="Add annotations, connections, or questions…"
                              style={{ width: '100%', minHeight: 80, padding: '9px 12px', fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text)', background: '#fff', border: '1px solid var(--border)', borderRadius: 6, resize: 'vertical', lineHeight: 1.6, outline: 'none', boxSizing: 'border-box' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                              <button
                                onClick={() => saveLocalNote(entry.id, localNotes[entry.id] ?? localNote)}
                                style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: savedIds.has(entry.id) ? 'var(--emerald)' : 'var(--violet)', background: savedIds.has(entry.id) ? 'rgba(4,120,87,0.08)' : 'rgba(109,40,217,0.08)', border: `1px solid ${savedIds.has(entry.id) ? 'rgba(4,120,87,0.2)' : 'rgba(109,40,217,0.2)'}`, padding: '5px 14px', borderRadius: 5, cursor: 'pointer' }}>
                                {savedIds.has(entry.id) ? '✓ Saved' : 'Save'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
