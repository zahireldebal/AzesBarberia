'use client';

import { useState } from 'react';
import { MAPS_EMBED_URL } from '@/data/business';
import { Img } from './Img';
import { Pin } from './Icons';

/** Google Maps iframe loads only after the visitor asks for it; until then the façade stands in. */
export function MapEmbed({ label, note, title }: { label: string; note: string; title: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink-3 md:aspect-auto md:h-full md:min-h-[22rem]">
      {show ? (
        <iframe
          src={MAPS_EMBED_URL}
          title={title}
          className="absolute inset-0 size-full border-0 [filter:grayscale(1)_contrast(1.05)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="theme-dark group absolute inset-0 flex flex-col items-center justify-end gap-3 pb-8 text-cream"
        >
          {/* The corner itself, so the placeholder says "this is where we are"
              instead of looking like a map that failed to load. */}
          <Img
            name="fachada"
            alt=""
            sizes="(min-width: 768px) 560px, 92vw"
            className="absolute inset-0 size-full object-cover object-[50%_55%] transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_14_15/0.25)_0%,rgb(14_14_15/0.35)_45%,rgb(14_14_15/0.92)_100%)]" />
          <Pin className="relative text-4xl text-gold-hi transition-transform duration-300 group-hover:-translate-y-1" />
          <span className="btn btn-line btn-sm relative bg-ink/50">{label}</span>
          <span className="relative text-[0.8rem] text-cream/75">{note}</span>
        </button>
      )}
    </div>
  );
}
