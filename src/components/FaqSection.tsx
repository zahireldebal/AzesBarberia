import type { Dict } from '@/i18n/es';
import { FAQ } from '@/data/faq';
import type { Lang } from '@/data/business';
import { ChevronDown } from './Icons';
import { SectionHead } from './SectionHead';

/** Native <details>: keyboard and screen-reader friendly with no JS. */
export function FaqSection({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <section id="preguntas" className="section bg-ink-2" aria-labelledby="preguntas-title">
      <div className="wrap">
        <SectionHead id="preguntas-title" title={t.faq.title} />
        <div className="reveal mx-auto mt-12 max-w-3xl border-t border-line">
          {FAQ.map((f) => (
            <details key={f.q.es} className="faq group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q[lang]}
                <ChevronDown className="shrink-0 text-xl text-gold transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="max-w-[65ch] pb-6 text-muted">{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
