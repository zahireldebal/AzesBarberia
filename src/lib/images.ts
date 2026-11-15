import manifest from '@/data/images.generated.json';

export type ImageEntry = { width: number; height: number; widths: number[] };
const IMAGES = manifest as Record<string, ImageEntry>;

export function imageEntry(name: string): ImageEntry {
  const e = IMAGES[name];
  if (!e) throw new Error(`Image "${name}" missing: run npm run images`);
  return e;
}

export function srcSet(name: string): string {
  return imageEntry(name).widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(', ');
}

export function largestSrc(name: string): string {
  const { widths } = imageEntry(name);
  return `/img/${name}-${widths[widths.length - 1]}.webp`;
}

/** A middle width as the fallback src. */
export function fallbackSrc(name: string): string {
  const { widths } = imageEntry(name);
  const w = widths.find((x) => x >= 768) ?? widths[widths.length - 1];
  return `/img/${name}-${w}.webp`;
}
