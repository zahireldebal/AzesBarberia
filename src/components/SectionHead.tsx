import { SuitRule } from './Suits';

type Props = { id: string; title: string; intro?: string; align?: 'center' | 'left' };

export function SectionHead({ id, title, intro, align = 'center' }: Props) {
  const center = align === 'center';
  return (
    <header className={`reveal ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      <h2 id={id} className="h-section">{title}</h2>
      <SuitRule className={`mt-5 ${center ? 'mx-auto max-w-xs' : 'max-w-xs'}`} />
      {intro ? <p className={`mt-5 max-w-2xl text-muted ${center ? 'mx-auto' : ''}`}>{intro}</p> : null}
    </header>
  );
}

export function formatPrice(n: number, locale: string): string {
  return `$U ${n.toLocaleString(locale)}`;
}
