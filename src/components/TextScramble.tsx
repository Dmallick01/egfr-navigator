'use client';
import { useEffect, useRef, useState } from 'react';

const CHARS = 'ATCG01ATCGATCG!?#%@$&*';

interface Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  tag?: 'h1' | 'h2' | 'span' | 'p';
}

export default function TextScramble({ text, delay = 0, duration = 1200, className, style, tag: Tag = 'span' }: Props) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    let started = false;
    let animFrame: number;

    const timeout = setTimeout(() => {
      started = true;
    }, delay);

    const animate = (time: number) => {
      if (!started) { animFrame = requestAnimationFrame(animate); return; }
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const revealedCount = Math.floor(progress * text.length);
      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { result += ' '; continue; }
        if (text[i] === '\n') { result += '\n'; continue; }
        if (i < revealedCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(result);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    animFrame = requestAnimationFrame(animate);
    rafRef.current = animFrame;
    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, duration]);

  // suppress unused warning
  void frameRef.current;
  void rafRef.current;

  return <Tag className={className} style={style}>{display || text}</Tag>;
}
