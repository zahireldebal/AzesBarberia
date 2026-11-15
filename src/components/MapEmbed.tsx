'use client';

import { useState } from 'react';
import { MAPS_EMBED_URL } from '@/data/business';
import { Pin } from './Icons';

/** Google Maps iframe loads only after the visitor asks for it. */
export function MapEmbed({ label, note, title }: { label: string; note: string; title: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink-3 md:aspect-auto md:h-full md:min-h-[22rem]">
      {show ? (
        <iframe
          src={MAPS_EMBED_URL}
          title={title}
          className="absolute inset-0 size-full border-0 [filter:grayscale(0.6)_contrast(1.05)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_45%,#232227,#141416_70%)] text-cream"
        >
          {/* Street grid hint drawn in SVG */}
          <svg aria-hidden className="absolute inset-0 size-full opacity-[0.18]" preserveAspectRatio="none" viewBox="0 0 400 300">
            <g stroke="#c9a46c" strokeWidth="1" fill="none">
              {[40, 100, 160, 220, 280].map((y) => <path key={y} d={`M0 ${y} L400 ${y - 18}`} />)}
              {[60, 140, 220, 300, 380].map((x) => <path key={x} d={`M${x} 0 L${x - 30} 300`} />)}
            </g>
          </svg>
          <Pin className="relative text-4xl text-gold-hi transition-transform duration-300 group-hover:-translate-y-1" />
          <span className="btn btn-line btn-sm relative">{label}</span>
          <span className="relative text-[0.8rem] text-muted">{note}</span>
        </button>
      )}
    </div>
  );
}
