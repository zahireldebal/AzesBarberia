import manifest from '@/data/images.generated.json';

type Entry = { width: number; height: number; widths: number[] };
const IMAGES = manifest as Record<string, Entry>;

export function imageEntry(name: string): Entry {
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

/** Picks a middle width as the fallback src. */
function fallbackSrc(name: string): string {
  const { widths } = imageEntry(name);
  const w = widths.find((x) => x >= 768) ?? widths[widths.length - 1];
  return `/img/${name}-${w}.webp`;
}

type Props = {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

export function Img({ name, alt, sizes, className, priority, style }: Props) {
  const { width, height } = imageEntry(name);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fallbackSrc(name)}
      srcSet={srcSet(name)}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}
