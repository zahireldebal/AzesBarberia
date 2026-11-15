import { Shell } from '@/components/Shell';
import { buildMetadata } from '@/lib/metadata';
import es from '@/i18n/es';

export { viewport } from '@/lib/metadata';
export const metadata = buildMetadata(es);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="es">{children}</Shell>;
}
