import { Shell } from '@/components/Shell';
import { buildMetadata } from '@/lib/metadata';
import en from '@/i18n/en';

export { viewport } from '@/lib/metadata';
export const metadata = buildMetadata(en);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>;
}
