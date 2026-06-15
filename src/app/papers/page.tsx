'use client';
import { useState, useMemo } from 'react';
import papersData from '@/data/research-papers.json';

type Paper = typeof papersData[number];

const CATEGORIES = Array.from(new Set(papersData.map((p) => p.category)));
const IMPORTANCE_ORDER: Record<string, number> = { landmark: 0, pivotal: 1, review: 2, research: 3, personal: 4 };

const IMPORTANCE_STYLE: Record<string, { bg: string; border: string; color: string; label: string }> = {
  landmark: { bg: 'rgba(26,86,219,0.08)', border: 'rgba(26,86,219,0.25)', color: 'var(--helix)', label: 'Landmark' },
  pivotal:  { bg: 'rgba(4,120,87,0.08)',  border: 'rgba(4,120,87,0.25)',  color: 'var(--emerald)', label: 'Pivotal Trial' },
  review:   { bg: 'rgba(109,40,217,0.08)', border: 'rgba(109,40,217,0.25)', color: 'var(--violet)', label: 'Review' },
  research: { bg: 'rgba(180,83,9,0.08)', border: 'rgba(180,83,9,0.25)', color: 'var(--amber)', label: 'Research' },
  personal: { bg: 'rgba(4,120,87,0.08)',  border: 'rgba(4,120,87,0.25)',  color: 'var(--emerald)', label: 'Personal' },
};

function ImportanceBadge({ type }: { type: string }) {
  const s = IMPORTANCE_STYLE[type] ?? IMPORTANCE_STYLE.research;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 8px', borderRadius: 4, background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontFamily: 'var(--font-mono)' }}>
      {s.label}
    </span>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  const [expanded, setExpanded] = useState(false);
  const [noteText, setNoteText] = useState(paper.dibakarNotes || '');
  const [noteSaved, setNoteSaved] = useState(false);

  function saveNote() {
    localStorage.setItem(`paper-note-${paper.id}`, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  const savedNote = typeof window !== 'undefined' ? localStorage.getItem(`paper-note-${paper.id}`) ?? noteText : noteText;

  return (
    <article style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s' }}>
      {/* Card header */}
      <div style={{ padding: '18px 20px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <ImportanceBadge type={paper.importance} />
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>{paper.year}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {paper.openAccess && (
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: 'rgba(4,120,87,0.08)', border: '1px solid rgba(4,120,87,0.2)', color: 'var(--emerald)', letterSpacing: '0.06em' }}>
                OPEN ACCESS
              </span>
            )}
          </div>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text)', lineHeight: 1.4, marginBottom: 6 }}>
          {paper.title}
        </h2>

        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: 10 }}>
          {paper.authors.join(', ')} · <em>{paper.journal}</em>
        </p>

        {/* Key finding callout */}
        {paper.keyFinding && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderLeft: '3px solid var(--helix)', borderRadius: 6, padding: '8px 12px', marginBottom: 10 }}>
            <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--helix)', fontWeight: 700, display: 'block', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Key Finding</span>
              {paper.keyFinding}
            </p>
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
          {paper.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '2px 7px', borderRadius: 4, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions row */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={paper.pubmedUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--helix)', textDecoration: 'none', padding: '5px 12px', borderRadius: 5, background: 'rgba(26,86,219,0.07)', border: '1px solid rgba(26,86,219,0.18)' }}>
            PubMed ↗
          </a>
          {paper.pdfUrl && (
            <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--emerald)', textDecoration: 'none', padding: '5px 12px', borderRadius: 5, background: 'rgba(4,120,87,0.07)', border: '1px solid rgba(4,120,87,0.18)' }}>
              Free PDF ↓
            </a>
          )}
          <button onClick={() => setExpanded(!expanded)}
            style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', background: 'transparent', border: '1px solid var(--border)', padding: '5px 12px', borderRadius: 5, cursor: 'pointer' }}>
            {expanded ? 'Hide notes ↑' : 'My notes ↓'}
          </button>
          {paper.pmid && (
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginLeft: 'auto' }}>
              PMID {paper.pmid}
            </span>
          )}
        </div>
      </div>

      {/* Notes panel */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', background: 'var(--bg)' }}>
          <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Abstract
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 18 }}>{paper.abstract}</p>

          <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--violet)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            My Notes &amp; Thoughts
          </p>
          <textarea
            defaultValue={savedNote}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add your notes, thoughts, or key takeaways about this paper…"
            style={{
              width: '100%', minHeight: 100, padding: '10px 12px',
              fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text)',
              background: '#fff', border: '1px solid var(--border)', borderRadius: 6,
              resize: 'vertical', lineHeight: 1.6, outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button onClick={saveNote}
              style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: noteSaved ? 'var(--emerald)' : 'var(--helix)', background: noteSaved ? 'rgba(4,120,87,0.08)' : 'rgba(26,86,219,0.08)', border: `1px solid ${noteSaved ? 'rgba(4,120,87,0.2)' : 'rgba(26,86,219,0.2)'}`, padding: '6px 16px', borderRadius: 5, cursor: 'pointer', transition: 'all 0.2s' }}>
              {noteSaved ? '✓ Saved' : 'Save note'}
            </button>
          </div>
          <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginTop: 6 }}>
            Notes saved locally in your browser. To make permanent, add to the JSON file and redeploy.
          </p>
        </div>
      )}
    </article>
  );
}

export default function PapersPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeImportance, setActiveImportance] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = [...papersData] as Paper[];
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (activeImportance) list = list.filter((p) => p.importance === activeImportance);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.authors.join(' ').toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.keyFinding?.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => (IMPORTANCE_ORDER[a.importance] ?? 9) - (IMPORTANCE_ORDER[b.importance] ?? 9));
  }, [activeCategory, activeImportance, query]);

  const openAccessCount = papersData.filter((p) => p.openAccess).length;

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '48px 20px 100px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Research Library
        </p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 14 }}>
          Papers &amp; Literature
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 620, marginBottom: 20 }}>
          Curated research papers in EGFR biology, lung cancer pharmacology, cardiac fibrosis, and clinical research. {openAccessCount} of {papersData.length} papers are open-access with free PDFs. Click any card to expand the abstract and add personal notes.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Total papers', value: papersData.length },
            { label: 'Open access', value: openAccessCount, color: 'var(--emerald)' },
            { label: 'Categories', value: CATEGORIES.length },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ padding: '10px 16px', background: '#fff', border: '1px solid var(--border)', borderRadius: 8 }}>
              <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
              <p style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-heading)', color: color ?? 'var(--text)', letterSpacing: '-0.02em' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title, author, tag, or finding…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '9px 14px', fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text)', background: '#fff', border: '1px solid var(--border)', borderRadius: 7, outline: 'none', boxSizing: 'border-box' }}
        />

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category:</span>
          {['All', ...CATEGORIES].map((cat) => (
            <button key={cat}
              onClick={() => setActiveCategory(cat === 'All' ? null : cat)}
              style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 99,
                border: '1px solid var(--border)', cursor: 'pointer',
                background: (cat === 'All' && !activeCategory) || activeCategory === cat ? 'var(--helix)' : 'transparent',
                color: (cat === 'All' && !activeCategory) || activeCategory === cat ? '#fff' : 'var(--text-3)',
                transition: 'all 0.15s',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Importance pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Type:</span>
          {['All', 'landmark', 'pivotal', 'review', 'research', 'personal'].map((imp) => {
            const s = IMPORTANCE_STYLE[imp] ?? { bg: 'transparent', border: 'var(--border)', color: 'var(--text-3)', label: 'All' };
            const isActive = (imp === 'All' && !activeImportance) || activeImportance === imp;
            return (
              <button key={imp}
                onClick={() => setActiveImportance(imp === 'All' ? null : imp)}
                style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 99, cursor: 'pointer',
                  background: isActive ? (imp === 'All' ? 'var(--text)' : s.bg) : 'transparent',
                  border: `1px solid ${isActive ? (imp === 'All' ? 'var(--text)' : s.border) : 'var(--border)'}`,
                  color: isActive ? (imp === 'All' ? '#fff' : s.color) : 'var(--text-3)',
                  transition: 'all 0.15s',
                }}>
                {imp === 'All' ? 'All types' : s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

      {/* Results count */}
      <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: 16 }}>
        {filtered.length} paper{filtered.length !== 1 ? 's' : ''} {activeCategory || activeImportance || query ? '(filtered)' : ''}
      </p>

      {/* Paper cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((paper) => (
          <PaperCard key={paper.id} paper={paper as Paper} />
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '48px 0', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-3)' }}>
            No papers match your filter.
          </div>
        )}
      </div>

    </div>
  );
}
