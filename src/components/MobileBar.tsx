'use client';

import { useEffect, useState } from 'react';
import type { Dict } from '@/i18n/es';
import { whatsappUrl } from '@/data/business';
import { BookLink } from './BookLink';
import { WhatsApp } from './Icons';

/**
 * Fixed bottom bar on phones: booking always one thumb away.
 * It slides in once the hero (which has its own booking button) scrolls away.
 */
export function MobileBar({ t, bookHref }: { t: Dict; bookHref: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-12px_rgb(0_0_0/0.8)] transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      inert={!show}
    >
      <div className="flex gap-3">
        <BookLink href={bookHref} newTabLabel={t.book.newTab} className="btn btn-gold flex-1">{t.book.primary}</BookLink>
        <a
          href={whatsappUrl(t.whatsappHello)}
          target="_blank"
          rel="noopener"
          className="btn btn-line w-12 shrink-0 px-0 text-xl"
        >
          <WhatsApp />
          <span className="sr-only">{t.whatsappFab}</span>
        </a>
      </div>
    </div>
  );
}
