'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface Props {
  pdbId: string;
  mutationResidue: number;
  mutationLabel: string;
}

// Minimal 3Dmol type surface
interface Mol3DViewer {
  addModel(data: string, format: string): unknown;
  setStyle(sel: object, style: object): void;
  addStyle(sel: object, style: object): void;
  zoomTo(sel?: object, animDuration?: number): void;
  zoom(factor: number, animDuration?: number): void;
  render(): void;
  spin(axis: string, speed?: number): void;
  stopAnimate(): void;
  clear(): void;
}

declare global {
  interface Window {
    $3Dmol?: {
      createViewer(el: HTMLElement, opts: object): Mol3DViewer;
    };
  }
}

type Status = 'waiting' | 'loading' | 'ready' | 'error';

export default function MolViewer({ pdbId, mutationResidue, mutationLabel }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Mol3DViewer | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [status, setStatus] = useState<Status>('waiting');
  const [spinning, setSpinning] = useState(true);
  // Track whether the 3Dmol script has loaded (persists across PDB switches)
  const scriptLoadedRef = useRef(false);

  function startViewer(currentPdbId: string, currentResidue: number) {
    if (!containerRef.current || !window.$3Dmol) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setStatus('loading');
    setSpinning(true);

    // Stop & clear previous viewer
    try { viewerRef.current?.stopAnimate(); } catch { /* */ }
    containerRef.current.innerHTML = '';

    let alive = true;

    fetch(`/api/pdb?id=${currentPdbId}`, { signal: ctrl.signal })
      .then(r => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.text();
      })
      .then(pdbData => {
        if (!alive || !containerRef.current || !window.$3Dmol) return;

        const viewer = window.$3Dmol.createViewer(containerRef.current, {
          backgroundColor: '#040C20',
          antialias: true,
        });
        viewerRef.current = viewer;

        viewer.addModel(pdbData, 'pdb');

        // Full chain — cartoon, N→C rainbow
        viewer.setStyle({}, { cartoon: { color: 'spectrum', opacity: 0.90 } });

        // Mutation residue — amber sphere
        viewer.addStyle(
          { resi: currentResidue },
          { sphere: { color: '#FF8C42', radius: 1.5, opacity: 0.95 } }
        );

        // Ligands/cofactors (skip water) — emerald sticks + small spheres
        viewer.addStyle(
          { hetflag: true },
          { stick: { colorscheme: 'greenCarbon', radius: 0.22 } }
        );

        // Zoom to mutation, light zoom-in, then slow spin
        viewer.zoomTo({ resi: currentResidue }, 600);
        viewer.zoom(0.80, 600);
        viewer.render();
        viewer.spin('y', 0.6);

        if (alive) setStatus('ready');
      })
      .catch(() => {
        if (!alive || ctrl.signal.aborted) return;
        setStatus('error');
      });

    return () => {
      alive = false;
      ctrl.abort();
    };
  }

  // Runs when pdbId/mutationResidue change AND script is already loaded
  useEffect(() => {
    if (!scriptLoadedRef.current) return; // script not ready yet
    const cleanup = startViewer(pdbId, mutationResidue);
    return () => {
      cleanup?.();
      try { viewerRef.current?.stopAnimate(); } catch { /* */ }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdbId, mutationResidue]);

  // Fires once when the 3Dmol <Script> tag loads
  function handleScriptLoad() {
    scriptLoadedRef.current = true;
    startViewer(pdbId, mutationResidue);
  }

  function toggleSpin() {
    if (!viewerRef.current) return;
    if (spinning) {
      viewerRef.current.stopAnimate();
    } else {
      viewerRef.current.spin('y', 0.6);
    }
    setSpinning(s => !s);
  }

  function resetView() {
    if (!viewerRef.current) return;
    viewerRef.current.zoomTo({ resi: mutationResidue }, 400);
    viewerRef.current.zoom(0.80, 400);
    viewerRef.current.render();
  }

  return (
    <>
      <Script
        src="https://3dmol.org/build/3Dmol-min.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(79,142,247,0.16)', background: '#040C20', userSelect: 'none' }}>
        {/* 3Dmol render target */}
        <div
          ref={containerRef}
          style={{ width: '100%', height: 340, position: 'relative', display: 'block' }}
        />

        {/* Loading / error overlay */}
        {(status === 'waiting' || status === 'loading') && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(4,12,32,0.88)', gap: 14,
          }}>
            <div style={{
              width: 30, height: 30,
              border: '2px solid rgba(79,142,247,0.25)',
              borderTopColor: 'rgba(79,142,247,0.85)',
              borderRadius: '50%',
              animation: 'mol-spin 0.8s linear infinite',
            }} />
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              {status === 'waiting' ? 'Loading 3Dmol.js…' : `Fetching ${pdbId} from RCSB…`}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(4,12,32,0.88)', gap: 10,
          }}>
            <p style={{ fontSize: 12, color: 'rgba(255,100,100,0.8)', fontFamily: 'var(--font-mono)' }}>
              Could not load {pdbId}
            </p>
            <a
              href={`https://www.rcsb.org/structure/${pdbId}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'rgba(79,142,247,0.75)', textDecoration: 'none' }}
            >
              Open on RCSB ↗
            </a>
          </div>
        )}

        {/* Mutation label — top left */}
        {status === 'ready' && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: 'rgba(4,12,32,0.72)',
            border: '1px solid rgba(255,140,66,0.30)',
            borderRadius: 5,
            padding: '4px 9px',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF8C42', display: 'inline-block', boxShadow: '0 0 6px rgba(255,140,66,0.7)', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,140,66,0.92)', fontWeight: 600 }}>{mutationLabel}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>· {pdbId}</span>
          </div>
        )}

        {/* Controls — bottom right */}
        {status === 'ready' && (
          <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 5 }}>
            <button
              onClick={resetView}
              style={{
                fontSize: 10, fontFamily: 'var(--font-mono)',
                color: 'rgba(255,255,255,0.45)',
                background: 'rgba(4,12,32,0.68)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 4, padding: '3px 8px', cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              ⌖ center
            </button>
            <button
              onClick={toggleSpin}
              style={{
                fontSize: 10, fontFamily: 'var(--font-mono)',
                color: spinning ? 'rgba(79,142,247,0.8)' : 'rgba(255,255,255,0.45)',
                background: 'rgba(4,12,32,0.68)',
                border: `1px solid ${spinning ? 'rgba(79,142,247,0.25)' : 'rgba(255,255,255,0.10)'}`,
                borderRadius: 4, padding: '3px 8px', cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              {spinning ? '⏸ pause' : '▶ spin'}
            </button>
          </div>
        )}

        {/* Legend — bottom left */}
        {status === 'ready' && (
          <div style={{
            position: 'absolute', bottom: 10, left: 10,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(4,12,32,0.68)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 5, padding: '4px 9px',
            backdropFilter: 'blur(8px)',
          }}>
            {[
              { color: 'rgba(0,200,150,0.85)', label: 'ligand' },
              { color: '#FF8C42', label: 'mutation' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes mol-spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
