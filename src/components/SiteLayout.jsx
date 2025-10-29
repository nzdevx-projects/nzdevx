'use client';

import { Toaster } from 'sonner';
import { usePathname } from 'next/navigation';
import { AppProviders } from '@/hooks/providers.js';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const isFullPage = pathname?.startsWith('/projects/') || pathname?.startsWith('/reviews/');

  return (
    <AppProviders>
      {!isFullPage && <SiteHeader />}
      <main className={isFullPage ? 'min-h-dvh' : ''}>{children}</main>
      {!isFullPage && <SiteFooter />}

      <Toaster position="top-right" expand={true} closeButton richColors />
    </AppProviders>
  );
}
