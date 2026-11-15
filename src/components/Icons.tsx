// Authored icon set: 24px grid, 1.6 stroke, round caps. Decorative by default.
type P = { className?: string; title?: string };

function Svg({ className, title, children, fill = 'none' }: P & { children: React.ReactNode; fill?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const ExternalIcon = (p: P) => (
  <Svg {...p}><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>
);
export const ArrowDown = (p: P) => (<Svg {...p}><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></Svg>);
export const ChevronLeft = (p: P) => (<Svg {...p}><path d="m15 5-7 7 7 7" /></Svg>);
export const ChevronRight = (p: P) => (<Svg {...p}><path d="m9 5 7 7-7 7" /></Svg>);
export const ChevronDown = (p: P) => (<Svg {...p}><path d="m5 9 7 7 7-7" /></Svg>);
export const Close = (p: P) => (<Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>);
export const MenuIcon = (p: P) => (<Svg {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Svg>);
export const Clock = (p: P) => (<Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>);
export const Pin = (p: P) => (<Svg {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10" r="2.3" /></Svg>);
export const Card = (p: P) => (<Svg {...p}><rect x="3" y="6" width="18" height="12" rx="1.5" /><path d="M3 10h18M7 15h3" /></Svg>);
export const Zoom = (p: P) => (<Svg {...p}><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5M11 8.5v5M8.5 11h5" /></Svg>);
export const Star = (p: P) => (
  <Svg {...p} fill="currentColor"><path stroke="none" d="m12 3.2 2.6 5.5 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.4l6-.7L12 3.2Z" /></Svg>
);
export const Instagram = (p: P) => (
  <Svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></Svg>
);
export const WhatsApp = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6L4.5 19.5Z" />
    <path d="M9.2 8.6c.3-.6.6-.6.9-.6h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.8 1.3 1.6 2.2 2 .2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4 0 .4-.1 1.1-.6 1.5-.5.4-1.4.7-2.6.3a9 9 0 0 1-4.6-4.2c-.6-1.1-.4-2.2 0-2.8Z" fill="currentColor" stroke="none" />
  </Svg>
);
