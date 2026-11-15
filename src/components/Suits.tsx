// The four card suits from the Azes logo, drawn as SVG.
// Spade and club in cream/gold; heart and diamond in the logo red.
const PATHS = {
  spade: 'M12 2.5c-2.2 3.4-7 6.2-7 10.1A3.9 3.9 0 0 0 11 15.9c-.3 2.1-1.2 3.7-2.6 5.1h7.2c-1.4-1.4-2.3-3-2.6-5.1a3.9 3.9 0 0 0 6-3.3c0-3.9-4.8-6.7-7-10.1Z',
  heart: 'M12 21s-8.5-5.6-8.5-11.2A4.6 4.6 0 0 1 12 7.2a4.6 4.6 0 0 1 8.5 2.6C20.5 15.4 12 21 12 21Z',
  club: 'M12 2.8a4 4 0 0 0-3.2 6.4 4 4 0 1 0 1.9 7c-.3 2-1.1 3.5-2.4 4.8h7.4c-1.3-1.3-2.1-2.8-2.4-4.8a4 4 0 1 0 1.9-7A4 4 0 0 0 12 2.8Z',
  diamond: 'M12 2.5 19 12l-7 9.5L5 12l7-9.5Z',
} as const;

export type SuitName = keyof typeof PATHS;
const RED: SuitName[] = ['heart', 'diamond'];

export function Suit({ name, className }: { name: SuitName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden className={className}>
      <path d={PATHS[name]} fill={RED.includes(name) ? 'var(--color-suit)' : 'currentColor'} />
    </svg>
  );
}

/** Gold hairline broken by the four suits: the site's section divider. */
export function SuitRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-gold ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="flex gap-2 text-[0.8rem] text-cream">
        {(['spade', 'heart', 'club', 'diamond'] as const).map((s) => <Suit key={s} name={s} />)}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}
