// Inline SVG flags for the language switcher (emoji flags render as letters on Windows).

export function FlagUY({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 18" className={className} aria-hidden>
      <rect width="27" height="18" fill="#fff" />
      {[2, 6, 10, 14].map((y) => <rect key={y} y={y} width="27" height="2" fill="#0038A8" />)}
      <rect width="10" height="10" fill="#fff" />
      <g transform="translate(5 5)" fill="#FCD116" stroke="#7B3F00" strokeWidth="0.25">
        <polygon points="0,-4.2 0.9,-1.6 3,-3 1.6,-0.9 4.2,0 1.6,0.9 3,3 0.9,1.6 0,4.2 -0.9,1.6 -3,3 -1.6,0.9 -4.2,0 -1.6,-0.9 -3,-3 -0.9,-1.6" />
        <circle r="1.7" />
      </g>
    </svg>
  );
}

export function FlagBR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden>
      <rect width="20" height="14" fill="#009C3B" />
      <polygon points="10,1.7 18.3,7 10,12.3 1.7,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="3.5" fill="#002776" />
      <path d="M6.6 6.2 Q10 5.3 13.4 7.4" fill="none" stroke="#fff" strokeWidth="0.55" />
    </svg>
  );
}

export function FlagUS({ className }: { className?: string }) {
  const stars: [number, number][] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < (r % 2 ? 5 : 6); c++) stars.push([1.2 + c * 2 + (r % 2), 1.1 + r * 1.9]);
  return (
    <svg viewBox="0 0 26 13" className={className} aria-hidden>
      <rect width="26" height="13" fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => <rect key={i} y={i * 2} width="26" height="1" fill="#B22234" />)}
      <rect width="11.4" height="7" fill="#3C3B6E" />
      {stars.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.38" fill="#fff" />)}
    </svg>
  );
}
