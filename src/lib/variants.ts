import variantsData from '@/data/curated-variants.json';
import type { Variant } from '@/lib/types';

export const VARIANTS = variantsData as Variant[];

export const VARIANT_CHIPS = VARIANTS.map((v) => ({
  id: v.id,
  label: v.id.includes('exon') ? v.common_name.split('(')[0].trim() : v.id,
  sub:
    v.type === 'sensitizing'
      ? `~${Math.round((v.tumor_frequency_nsclc ?? 0) * 100)}% NSCLC`
      : v.type === 'resistance'
        ? 'Acquired resistance'
        : 'Exon 20 insertion',
  type: v.type,
}));

export const typeColor: Record<string, { c: string; bg: string; border: string }> = {
  sensitizing: { c: 'var(--emerald)', bg: 'var(--emerald-dim)', border: 'rgba(4,120,87,0.20)' },
  resistance: { c: 'var(--amber)', bg: 'var(--amber-dim)', border: 'rgba(180,83,9,0.20)' },
  exon20_insertion: { c: 'var(--helix)', bg: 'var(--helix-dim)', border: 'rgba(26,86,219,0.20)' },
};
