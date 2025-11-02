'use client';

import { Toaster } from 'sonner';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { AppProviders } from '@/hooks/providers.js';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const isFullPage = pathname?.startsWith('/projects/') || pathname?.startsWith('/reviews/');

  return (
    <AppProviders>
      {!isFullPage && <SiteHeader />}
      <main className={isFullPage ? 'min-h-dvh' : ''}>{children}</main>
      {!isFullPage && <SiteFooter />}

      <Toaster position="top-right" expand={true} closeButton richColors />
      <GoogleAnalytics trackPageViews gaMeasurementId="G-L9P3J53N1Q" />

      <a
        href="https://wa.me/923038965727"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg animate-ripple hover:scale-110 transition-transform duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={26} />
      </a>
    </AppProviders>
  );
}
