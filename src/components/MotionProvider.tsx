'use client';

import { LazyMotion } from 'framer-motion';

// Animation features load after first paint, keeping them off the critical path.
const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures} strict>{children}</LazyMotion>;
}
