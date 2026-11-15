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

// Marks JS as available before first paint (so scroll reveals never hide
// content without JS), then reveals .reveal elements as they enter the viewport.
const REVEAL = `document.documentElement.classList.add('js');
addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.12});
els.forEach(function(e){io.observe(e)})});`;

export function Shell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${cinzel.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
