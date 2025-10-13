import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';
import MainPageUI from '@/components/services/MainPage';
import { PageBgEffects } from '@/components/ui/BgEffects.jsx';

export const metadata = {
  title: 'Web Development Services - Professional Website Solutions & Pricing',
  description:
    'Professional web development services for your business. I offer website development, e-commerce stores, CMS development, website redesign, design to website conversion, and ongoing maintenance. Fast, secure, and mobile-friendly solutions with clear pricing and guaranteed results.',
  keywords: [
    // Service-specific keywords
    'web development services',
    'website development services',
    'e-commerce development services',
    'online store development',
    'CMS development services',
    'WordPress development',
    'Shopify development',
    'website redesign services',
    'website maintenance services',
    'Figma to website',
    'PSD to website',

    // Problem-solving keywords
    'need a website for my business',
    'build online store',
    'create business website',
    'website for restaurant',
    'portfolio website service',
    'modern website design service',

    // Pricing keywords
    'affordable web development',
    'professional website cost',
    'web development pricing',
    'custom website price',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Professional Web Development Services - Custom Solutions for Your Business',
    description:
      'Comprehensive web development services including custom websites, e-commerce stores, CMS development, and maintenance. Fast, secure, and mobile-friendly solutions that help your business grow.',
    url: 'https://nzdevx.com/services',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Web Development Services',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <div className="container">
        <div className="relative mt-26 mb-12 lg:mt-28 3xl:mt-29 6xl:mt-30 h-[260px] 3xl:h-[270px] 6xl:h-[280px] bg-secondary overflow-hidden flex-col-center text-center rounded-lg shadow">
          <PageBgEffects />

          <h1 className="text-gradient-1 text-5xl 3xl:text-[55px] 6xl:text-6xl">Services</h1>

          <div className="mt-4 mx-auto px-0.5 space-x-2 text-[15px] 3xl:text-base 6xl:text-lg flex-center font-semibold lg-subtitle relative max-w-max">
            <Link href="/" className="text-gradient">
              Home
            </Link>

            <ChevronsRight className="text-tertiary mt-1 pointer-events-none size-5 3xl:size-[21px] 6xl:size-[23px]" />

            <span className="text-gradient-1">Services Page</span>
          </div>
        </div>
      </div>

      <MainPageUI />
    </div>
  );
}
