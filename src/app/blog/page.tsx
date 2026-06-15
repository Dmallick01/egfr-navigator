'use client';
import { useState } from 'react';
import Link from 'next/link';

const posts = [
  {
    slug: 'gefitinib-to-protac',
    title: 'From Gefitinib to PROTAC: 20 Years of EGFR Drug Evolution',
    date: '2026-06-01',
    excerpt:
      'Twenty years of EGFR drug development in NSCLC — from the IPASS trial showing gefitinib works only in mutant tumors, through T790M gatekeeper resistance and osimertinib\'s covalent fix, to PROTAC degraders that remove the protein instead of blocking the active site.',
    tags: ['History', 'PROTAC', 'Drug Development'],
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/9/98/126-EpidermalGrowthFactor_EGFR.png',
    thumbAlt: 'EGF binding to EGFR receptor diagram',
  },
  {
    slug: 'c797s-protein-degraders',
    title: 'Why C797S Is the Key to Understanding Protein Degraders',
    date: '2026-05-15',
    excerpt:
      'C797S defeats osimertinib by removing the cysteine it covalently binds. That single substitution is also the clearest argument for protein degraders — CFT8919 recruits CRBN to ubiquitinate EGFR regardless of active-site mutations.',
    tags: ['C797S', 'PROTAC', 'Mechanism'],
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Osimertinib.svg',
    thumbAlt: 'Chemical structure of osimertinib',
  },
  {
    slug: 'building-egfr-navigator',
    title: 'Building EGFR Navigator: Integrating 8 Public Databases',
    date: '2026-04-20',
    excerpt:
      'Behind EGFR Navigator are eight public databases: ClinicalTrials.gov, PubMed, ChEMBL, ClinVar, gnomAD, cBioPortal, Open Targets, and AlphaMissense. This post walks through how each database contributes — from variant frequencies and drug IC50 values to computational pathogenicity predictions and clinical trial identifiers — and the design decisions behind the curated data layer.',
    tags: ['Technical', 'Databases', 'Design'],
    thumb: 'https://upload.wikimedia.org/wikipedia/commons/5/50/EGFR_signaling_pathway.svg',
    thumbAlt: 'EGFR signaling pathway diagram',
  },
];

const ALL_TAGS = Array.from(new Set(posts.flatMap((p) => p.tags)));

const TAG_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  History:          { bg: 'rgba(79,142,247,0.10)',  border: 'rgba(79,142,247,0.25)',  text: 'var(--helix)'   },
  PROTAC:           { bg: 'rgba(155,89,245,0.10)',  border: 'rgba(155,89,245,0.25)',  text: 'var(--violet)'  },
  'Drug Development':{ bg: 'rgba(0,200,150,0.10)',  border: 'rgba(0,200,150,0.25)',   text: 'var(--emerald)' },
  C797S:            { bg: 'rgba(255,140,66,0.10)',  border: 'rgba(255,140,66,0.25)',  text: 'var(--amber)'   },
  Mechanism:        { bg: 'rgba(155,89,245,0.10)',  border: 'rgba(155,89,245,0.25)',  text: 'var(--violet)'  },
  Technical:        { bg: 'rgba(79,142,247,0.10)',  border: 'rgba(79,142,247,0.25)',  text: 'var(--helix)'   },
  Databases:        { bg: 'rgba(0,200,150,0.10)',   border: 'rgba(0,200,150,0.25)',   text: 'var(--emerald)' },
  Design:           { bg: 'rgba(255,140,66,0.10)',  border: 'rgba(255,140,66,0.25)',  text: 'var(--amber)'   },
};

const DEFAULT_TAG_STYLE = { bg: 'var(--surface-2)', border: 'var(--border)', text: 'var(--text-3)' };

function TagPill({
  tag,
  active,
  onClick,
}: {
  tag: string;
  active: boolean;
  onClick: () => void;
}) {
  const style = TAG_COLORS[tag] ?? DEFAULT_TAG_STYLE;
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: active ? style.text : 'var(--text-3)',
        background: active ? style.bg : 'transparent',
        border: `1px solid ${active ? style.border : 'var(--border)'}`,
        padding: '4px 12px',
        borderRadius: 20,
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.15s',
        outline: 'none',
      }}
    >
      {tag}
    </button>
  );
}

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--text-3)', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 10,
        }}>
          Research Blog
        </div>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 32, fontWeight: 700,
          color: 'var(--text)', letterSpacing: '-0.02em',
          marginBottom: 12,
        }}>
          Articles
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.65, maxWidth: 560 }}>
          Notes on EGFR biology, drug mechanisms, and how I built this site.
        </p>
      </div>

      {/* Tag filter pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--text-3)', letterSpacing: '0.06em',
          textTransform: 'uppercase', marginRight: 4,
        }}>
          Filter:
        </span>
        <button
          onClick={() => setActiveTag(null)}
          style={{
            fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.5px',
            color: activeTag === null ? 'var(--text)' : 'var(--text-3)',
            background: activeTag === null ? 'rgba(255,255,255,0.07)' : 'transparent',
            border: `1px solid ${activeTag === null ? 'var(--border-2)' : 'var(--border)'}`,
            padding: '4px 12px', borderRadius: 20,
            cursor: 'pointer', fontFamily: 'var(--font-mono)',
            transition: 'all 0.15s', outline: 'none',
          }}
        >
          All
        </button>
        {ALL_TAGS.map((tag) => (
          <TagPill
            key={tag}
            tag={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

      {/* Post cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.length === 0 && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--text-3)', padding: '24px 0',
          }}>
            No posts matching this filter.
          </div>
        )}
        {filtered.map((post) => (
          <article
            key={post.slug}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
          >
            {/* Thumbnail */}
            {post.thumb && (
              <div style={{ height: 180, background: '#f3f5f8', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumb}
                  alt={post.thumbAlt ?? post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px', boxSizing: 'border-box' }}
                />
              </div>
            )}

            <div style={{ padding: '22px 24px 20px' }}>
              {/* Meta row */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8,
              }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {post.tags.map((tag) => {
                    const s = TAG_COLORS[tag] ?? DEFAULT_TAG_STYLE;
                    return (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10, fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '0.5px',
                          color: s.text, background: s.bg,
                          border: `1px solid ${s.border}`,
                          padding: '2px 9px', borderRadius: 4,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 19, fontWeight: 700,
                color: 'var(--text)', letterSpacing: '-0.02em',
                lineHeight: 1.3, marginBottom: 10,
              }}>
                {post.title}
              </h2>

              <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.72, marginBottom: 18 }}>
                {post.excerpt.slice(0, 180)}…
              </p>

              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 600,
                  color: 'var(--helix)',
                  background: 'rgba(26,86,219,0.07)',
                  border: '1px solid rgba(26,86,219,0.18)',
                  padding: '7px 16px', borderRadius: 6,
                  textDecoration: 'none', fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.02em',
                }}
              >
                Read post →
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
