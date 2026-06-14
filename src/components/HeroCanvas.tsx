'use client';
import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const phi = 1.618033988749895;

    // Fibonacci spiral parameters
    function fibSpiral(c: CanvasRenderingContext2D, cx: number, cy: number, t: number, opacity: number) {
      c.save();
      c.translate(cx, cy);
      c.rotate(t * 0.00008);
      c.strokeStyle = `rgba(79, 142, 247, ${opacity})`;
      c.lineWidth = 0.8;
      c.beginPath();
      for (let i = 0; i < 500; i++) {
        const angle = i * 0.12;
        const r = 4 * Math.pow(phi, angle / (2 * Math.PI));
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        if (r > 380) break;
        if (i === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.stroke();
      c.restore();
    }

    // DNA double helix
    function drawDNA(c: CanvasRenderingContext2D, x: number, t: number, _w: number, h: number) {
      const turns = 6;
      const amplitude = 28;
      const frequency = (2 * Math.PI * turns) / h;
      const phase = t * 0.0012;

      // Backbone strand 1
      c.beginPath();
      c.strokeStyle = 'rgba(79,142,247,0.45)';
      c.lineWidth = 2.5;
      c.lineCap = 'round';
      for (let y = 0; y < h; y += 2) {
        const xOff = Math.sin(frequency * y + phase) * amplitude;
        if (y === 0) c.moveTo(x + xOff, y);
        else c.lineTo(x + xOff, y);
      }
      c.stroke();

      // Backbone strand 2
      c.beginPath();
      c.strokeStyle = 'rgba(0,200,150,0.40)';
      c.lineWidth = 2.5;
      for (let y = 0; y < h; y += 2) {
        const xOff = Math.sin(frequency * y + phase + Math.PI) * amplitude;
        if (y === 0) c.moveTo(x + xOff, y);
        else c.lineTo(x + xOff, y);
      }
      c.stroke();

      // Base pairs — every 1/10 turn
      const basePairSpacing = h / (turns * 10);
      for (let i = 0; i < turns * 10; i++) {
        const y = i * basePairSpacing;
        const x1 = x + Math.sin(frequency * y + phase) * amplitude;
        const x2 = x + Math.sin(frequency * y + phase + Math.PI) * amplitude;
        const alpha = 0.18 + 0.12 * Math.sin(frequency * y + phase);
        c.beginPath();
        c.strokeStyle = `rgba(255,209,102,${alpha})`;
        c.lineWidth = 1;
        c.moveTo(x1, y);
        c.lineTo(x2, y);
        c.stroke();

        // Nodes at strand ends
        c.fillStyle = `rgba(79,142,247,${alpha * 1.8})`;
        c.beginPath();
        c.arc(x1, y, 2.5, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = `rgba(0,200,150,${alpha * 1.8})`;
        c.beginPath();
        c.arc(x2, y, 2.5, 0, Math.PI * 2);
        c.fill();
      }
    }

    // Alpha helix ribbon
    function drawHelix(
      c: CanvasRenderingContext2D,
      cx: number, cy: number,
      angle: number, length: number,
      color: string, t: number, tOffset: number
    ) {
      c.save();
      c.translate(cx, cy);
      c.rotate(angle + t * 0.00025 + tOffset);

      // Front ribbon
      c.beginPath();
      c.strokeStyle = color;
      c.lineWidth = 3.5;
      c.lineCap = 'round';
      for (let i = 0; i < length; i++) {
        const xi = i - length / 2;
        const yi = Math.sin(i * 0.20 + t * 0.0018) * 14;
        if (i === 0) c.moveTo(xi, yi);
        else c.lineTo(xi, yi);
      }
      c.stroke();

      // Back ribbon
      const backColor = color.replace(/[\d.]+\)$/, '0.15)');
      c.beginPath();
      c.strokeStyle = backColor;
      c.lineWidth = 2;
      for (let i = 0; i < length; i++) {
        const xi = i - length / 2;
        const yi = Math.sin(i * 0.20 + t * 0.0018 + Math.PI) * 14;
        if (i === 0) c.moveTo(xi, yi);
        else c.lineTo(xi, yi);
      }
      c.stroke();

      // H-bond rungs
      const rungColor = color.replace(/[\d.]+\)$/, '0.10)');
      c.strokeStyle = rungColor;
      c.lineWidth = 0.8;
      for (let i = 0; i < length; i += 7) {
        const xi = i - length / 2;
        const y1 = Math.sin(i * 0.20 + t * 0.0018) * 14;
        const y2 = Math.sin(i * 0.20 + t * 0.0018 + Math.PI) * 14;
        c.beginPath();
        c.moveTo(xi, y1);
        c.lineTo(xi, y2);
        c.stroke();
      }
      c.restore();
    }

    // Floating atom particles on fibonacci positions
    function drawParticles(c: CanvasRenderingContext2D, cx: number, cy: number, t: number) {
      const goldenAngle = Math.PI * 2 * (2 - phi); // ~137.5°
      const count = 55; // Fibonacci number
      for (let i = 0; i < count; i++) {
        const r = 8 * Math.sqrt(i + 1);
        const angle = i * goldenAngle + t * 0.0003;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle) * 0.618; // squish by 1/phi for perspective
        const size = 1 + (i % 3) * 0.5;
        const opacity = 0.08 + (i / count) * 0.12;
        c.fillStyle = `rgba(79,142,247,${opacity})`;
        c.beginPath();
        c.arc(px, py, size, 0, Math.PI * 2);
        c.fill();
      }
    }

    function draw(t: number) {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Ambient gradient
      const grad = ctx.createRadialGradient(w * 0.65, h * 0.45, 0, w * 0.65, h * 0.45, w * 0.6);
      grad.addColorStop(0, 'rgba(79,142,247,0.05)');
      grad.addColorStop(0.5, 'rgba(155,89,245,0.03)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Second glow near top-right
      const grad2 = ctx.createRadialGradient(w * 0.85, h * 0.15, 0, w * 0.85, h * 0.15, w * 0.35);
      grad2.addColorStop(0, 'rgba(0,200,150,0.04)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Fibonacci spiral (right side, very subtle)
      fibSpiral(ctx, w * 0.72, h * 0.50, t, 0.045);

      // DNA helix — right edge
      drawDNA(ctx, w * 0.88, t, 55, h);

      // Fibonacci-positioned alpha helices (golden angle arrangement around center-right)
      const hcx = w * 0.62, hcy = h * 0.45;
      const helices = [
        { r: 144, angle: 0.0, len: 110, color: 'rgba(79,142,247,0.50)',  tOff: 0 },
        { r: 89,  angle: 2.4, len: 89,  color: 'rgba(0,200,150,0.42)',   tOff: 1.0 },
        { r: 144, angle: 4.0, len: 100, color: 'rgba(155,89,245,0.38)',  tOff: 2.1 },
        { r: 55,  angle: 1.2, len: 70,  color: 'rgba(255,209,102,0.35)', tOff: 0.7 },
      ];
      helices.forEach(({ r, angle, len, color, tOff }) => {
        const hx = hcx + r * Math.cos(angle + t * 0.00015);
        const hy = hcy + r * Math.sin(angle + t * 0.00015) * 0.618;
        drawHelix(ctx, hx, hy, angle, len, color, t, tOff);
      });

      // Fibonacci atom cloud around center of helix arrangement
      drawParticles(ctx, hcx, hcy, t);

      // Soft vignette on left third (protect text legibility)
      const vignette = ctx.createLinearGradient(0, 0, w * 0.55, 0);
      vignette.addColorStop(0, 'rgba(4,12,32,0.92)');
      vignette.addColorStop(0.4, 'rgba(4,12,32,0.65)');
      vignette.addColorStop(1, 'transparent');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Bottom fade into page
      const bottomFade = ctx.createLinearGradient(0, h * 0.72, 0, h);
      bottomFade.addColorStop(0, 'transparent');
      bottomFade.addColorStop(1, 'rgba(4,12,32,0.92)');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
