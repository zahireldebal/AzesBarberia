import { Shell } from '@/components/Shell';
import { buildMetadata } from '@/lib/metadata';
import pt from '@/i18n/pt';

export { viewport } from '@/lib/metadata';
export const metadata = buildMetadata(pt);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="pt-BR">{children}</Shell>;
}
