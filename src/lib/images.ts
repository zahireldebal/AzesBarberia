import manifest from '@/data/images.generated.json';

/** v: content hash, added to the URL because /img/* is cached as immutable (see scripts/version-images.mjs). */
export type ImageEntry = { width: number; height: number; widths: number[]; v?: string };
const IMAGES = manifest as Record<string, ImageEntry>;

export function imageEntry(name: string): ImageEntry {
  const e = IMAGES[name];
  if (!e) throw new Error(`Image "${name}" missing: run npm run images`);
  return e;
}

const url = (name: string, w: number) => {
  const { v } = imageEntry(name);
  return `/img/${name}-${w}.webp${v ? `?v=${v}` : ''}`;
};

export function srcSet(name: string): string {
  return imageEntry(name).widths.map((w) => `${url(name, w)} ${w}w`).join(', ');
}

export function largestSrc(name: string): string {
  const { widths } = imageEntry(name);
  return url(name, widths[widths.length - 1]);
}

/** A middle width as the fallback src. */
export function fallbackSrc(name: string): string {
  const { widths } = imageEntry(name);
  const w = widths.find((x) => x >= 768) ?? widths[widths.length - 1];
  return url(name, w);
}
