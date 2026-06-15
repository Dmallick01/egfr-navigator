'use client';
import { useEffect, useRef } from 'react';

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Dmallick01/egfr-navigator');
    script.setAttribute('data-repo-id', 'placeholder-repo-id');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'placeholder-category-id');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return (
    <div style={{ marginTop: 48 }}>
      <div style={{
        height: 1, background: 'var(--border)', marginBottom: 32,
      }} />
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        color: 'var(--text-3)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 20,
      }}>
        Discussion
      </div>
      <div style={{
        background: 'rgba(79,142,247,0.04)',
        border: '1px solid rgba(79,142,247,0.12)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 16,
        fontSize: 12,
        color: 'var(--text-3)',
        fontFamily: 'var(--font-mono)',
      }}>
        Anonymous comments via GitHub Discussions. No account required to react; GitHub login required to comment.
      </div>
      <div ref={ref} />
    </div>
  );
}
