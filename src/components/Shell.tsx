import localFont from 'next/font/local';
import '@/app/globals.css';

// Self-hosted variable fonts (OFL, latin subset incl. á é í ó ú ñ ¿) so the
// build never depends on reaching Google Fonts. Licenses in src/fonts/.
const cinzel = localFont({
  src: '../fonts/cinzel-latin-variable.woff2',
  weight: '400 900',
  variable: '--font-cinzel',
  display: 'swap',
});
const manrope = localFont({
  src: '../fonts/manrope-latin-variable.woff2',
  weight: '200 800',
  variable: '--font-manrope',
  display: 'swap',
});

// Runs before first paint. Marks JS as available (content is never hidden
// without JS) and drives the page's small motion layer:
// - .reveal elements fade in as they enter the viewport;
// - img.fx-img resolve from a blur once loaded (and on error, so none stay blurred);
// - --scroll (0..1) feeds the top progress bar, --sy (px, hero range only) the hero parallax;
// - --mx/--my on .spot elements place the gold light under the pointer.
// Scroll and pointer work is batched into one requestAnimationFrame.
const MOTION = `(function(){var d=document,h=d.documentElement;h.classList.add('js');
var ticking=false;function frame(){ticking=false;var y=scrollY,max=h.scrollHeight-innerHeight;
h.style.setProperty('--scroll',max>0?(y/max).toFixed(4):'0');if(y<innerHeight*1.3)h.style.setProperty('--sy',y.toFixed(1));}
addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
addEventListener('pointermove',function(e){var el=e.target&&e.target.closest&&e.target.closest('.spot');if(!el)return;var r=el.getBoundingClientRect();
el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
addEventListener('DOMContentLoaded',function(){frame();
d.querySelectorAll('img.fx-img').forEach(function(img){function done(){img.classList.add('is-loaded')}
if(img.complete&&img.naturalWidth)done();else{img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true})}});
var els=d.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.12});
els.forEach(function(e){io.observe(e)})})})();`;

export function Shell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    // The inline MOTION script adds `js` and CSS vars to <html> before React
    // hydrates; that mismatch is intentional, so React must not report it.
    <html lang={lang} className={`${cinzel.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION }} />
      </head>
      <body>
        {/* gold bars: page-load sweep, then scroll progress */}
        <div className="progress progress-load" aria-hidden />
        <div className="progress progress-scroll" aria-hidden />
        {children}
      </body>
    </html>
  );
}
