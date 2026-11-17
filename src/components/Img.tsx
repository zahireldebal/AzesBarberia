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
  /** Blur-in on load. Off for images that move with user input (the compare slider). */
  fx?: boolean;
};

/**
 * Responsive WebP image that resolves from a blur once loaded (`fx-img`).
 * Loaded state lives in React so re-renders never put the blur back; the
 * inline script in Shell.tsx marks images that finish before hydration.
 */
export function Img({ name, alt, sizes, className = '', priority, style, fx = true }: Props) {
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
      className={`${fx ? 'fx-img' : ''} ${loaded ? 'is-loaded' : ''} ${className}`}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      // Shell.tsx's inline script may add `is-loaded` before hydration (cached images).
      suppressHydrationWarning
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
    />
  );
}
