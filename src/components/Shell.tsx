import { Cinzel, Manrope } from 'next/font/google';
import '@/app/globals.css';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-cinzel', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-manrope', display: 'swap' });

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
