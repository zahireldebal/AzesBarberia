import { ExternalIcon } from './Icons';

type Props = {
  href: string;
  children: React.ReactNode;
  /** Visually hidden suffix telling screen readers it opens a new tab. */
  newTabLabel: string;
  className?: string;
  ariaLabel?: string;
};

/** Every link to Fresha: new tab, noopener, with a small "leaves the site" icon. */
export function BookLink({ href, children, newTabLabel, className = 'btn btn-gold', ariaLabel }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className} aria-label={ariaLabel ? `${ariaLabel} ${newTabLabel}` : undefined}>
      {children}
      <ExternalIcon className="size-[0.95em] shrink-0 opacity-75" />
      {ariaLabel ? null : <span className="sr-only"> {newTabLabel}</span>}
    </a>
  );
}
