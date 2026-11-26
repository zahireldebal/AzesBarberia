'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/i18n/es';
import { BookLink } from './BookLink';
import { Close, MenuIcon } from './Icons';
import { SuitRule } from './Suits';
import { FlagBR, FlagUS, FlagUY } from './Flags';
import { localePath } from '@/data/business';

type Props = { t: Dict; bookHref: string; homeHref: string };

/** Language switcher entries: code, native name, hreflang, flag. */
const LANG_LINKS = [
  ['es', 'Español', 'es', FlagUY],
  ['en', 'English', 'en', FlagUS],
  ['pt', 'Português', 'pt-BR', FlagBR],
] as const;

export function Header({ t, bookHref, homeHref }: Props) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Same order as the sections on the page. On desktop the list is split
  // around the centred logo: three links left, two right.
  const links = [
    ['#equipo', t.nav.team],
    ['#productos', t.nav.products],
    ['#opiniones', t.reviews.title],
    ['#local', t.nav.location],
    ['#preguntas', t.nav.faq],
  ] as const;
  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);
  const navLink = (href: string, label: string) => (
    <li key={href}>
      <a href={href} className="nav-link py-3 text-cream/85 no-underline transition-colors hover:text-gold-hi">{label}</a>
    </li>
  );

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu: lock scroll, ESC closes, focus moves in and returns to the button.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a, button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    const btn = menuButton.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-cream focus:px-4 focus:py-3 focus:text-ink">
        {t.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height,backdrop-filter] duration-300 ease-[var(--ease-out-expo)] ${
          compact
            ? 'h-16 bg-ink/85 shadow-[0_1px_0_var(--color-line),0_10px_30px_-14px_rgb(0_0_0/0.18)] backdrop-blur-md backdrop-saturate-150 lg:h-[4.5rem]'
            : 'theme-dark h-20 bg-gradient-to-b from-ink/85 to-transparent lg:h-24'
        }`}
      >
        {/* Three columns with equal side tracks keep the logo truly centred. */}
        <div className="wrap grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: menu button (phones/tablets) or the first three links (desktop) */}
          <div className="flex items-center justify-start">
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="-ml-2 inline-flex size-11 items-center justify-center text-2xl text-cream lg:hidden"
            >
              <MenuIcon />
              <span className="sr-only">{t.nav.menu}</span>
            </button>
            <nav aria-label={t.nav.menu} className="hidden lg:block">
              <ul className="flex items-center gap-8 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">
                {leftLinks.map(([href, label]) => navLink(href, label))}
              </ul>
            </nav>
          </div>

          {/* Centre: the logo */}
          <a href={homeHref} className="block justify-self-center" aria-label="Azes Barbería">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={compact ? '/img/logo-dark-320.webp' : '/img/logo-light-320.webp'}
              alt=""
              width={320}
              height={278}
              className={`w-auto ${compact ? '' : 'drop-shadow-[0_2px_10px_rgb(0_0_0/0.6)]'} transition-[height] duration-300 ease-[var(--ease-out-expo)] ${
                compact ? 'h-11 lg:h-12' : 'h-14 lg:h-[4.5rem]'
              }`}
            />
          </a>

          {/* Right: last two links, language and booking */}
          <div className="flex items-center justify-end gap-2 lg:gap-8">
            <nav aria-label={t.nav.menuMore} className="hidden lg:block">
              <ul className="flex items-center gap-8 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">
                {rightLinks.map(([href, label]) => navLink(href, label))}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              {/* One flag per language; the active one is full opacity with a gold outline */}
              <ul className="flex items-center" aria-label={t.nav.langSwitchLabel}>
                {LANG_LINKS.map(([code, name, hreflang, Flag]) => {
                  const active = t.lang === code;
                  return (
                    <li key={code}>
                      <a
                        href={localePath(code)}
                        hrefLang={hreflang}
                        lang={hreflang}
                        title={name}
                        aria-label={name}
                        aria-current={active ? 'true' : undefined}
                        className={`group inline-flex min-h-11 min-w-9 items-center justify-center px-1 transition-opacity ${active ? 'opacity-100' : 'opacity-45 hover:opacity-90 focus-visible:opacity-100'}`}
                      >
                        <span className={`block overflow-hidden rounded-[3px] ${active ? 'ring-1 ring-gold-hi ring-offset-2 ring-offset-ink' : ''}`}>
                          <Flag className="block h-[15px] w-[22px]" />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <BookLink href={bookHref} newTabLabel={t.book.newTab} className="btn btn-gold btn-sm hidden sm:inline-flex">
                {t.book.short}
              </BookLink>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movil"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-4 pb-8 pt-4 lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-12 items-center justify-end">
              <button type="button" onClick={() => setOpen(false)} className="inline-flex size-11 items-center justify-center text-2xl">
                <Close />
                <span className="sr-only">{t.nav.close}</span>
              </button>
            </div>
            <nav aria-label={t.nav.menu} className="mt-6 flex-1">
              <ul className="space-y-1">
                {links.map(([href, label], i) => (
                  <m.li
                    key={href}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-3xl uppercase tracking-[0.08em] text-cream no-underline"
                    >
                      {label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <SuitRule className="mb-6" />
            <BookLink href={bookHref} newTabLabel={t.book.newTab} className="btn btn-gold w-full">
              {t.book.primary}
            </BookLink>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
