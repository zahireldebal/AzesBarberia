'use client';

import { useEffect, useRef, useState } from 'react';
import { imageEntry, srcSet, fallbackSrc } from '@/lib/images';

// Helpers re-exported for client components; server components import them from '@/lib/images'.
export { imageEntry, srcSet, largestSrc } from '@/lib/images';

type Props = {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

/**
 * Responsive WebP image that resolves from a blur once loaded (`fx-img`).
 * Loaded state lives in React so re-renders never put the blur back; the
 * inline script in Shell.tsx marks images that finish before hydration.
 */
export function Img({ name, alt, sizes, className = '', priority, style }: Props) {
  const { width, height } = imageEntry(name);
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth) setLoaded(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={fallbackSrc(name)}
      srcSet={srcSet(name)}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={`fx-img ${loaded ? 'is-loaded' : ''} ${className}`}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
    />
  );
}
