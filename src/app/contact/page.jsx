import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';
import MainPageUI from '@/components/contact/MainPage.jsx';
import { PageBgEffects } from '@/components/ui/BgEffects.jsx';

export const metadata = {
  title: 'Contact - Get Free Quote for Your Website Project',

  description:
    "Get in touch to discuss your website project. Free consultation and quote available. I respond within 24 hours. Whether you need a new website, online store, or website redesign, let's talk about how I can help your business grow online.",

  keywords: [
    'contact web developer',
    'hire web developer',
    'get website quote',
    'free website consultation',
    'website project inquiry',
    'discuss website project',
    'request website quote',
    'contact developer',
    'hire professional developer',
    'get in touch developer',
  ],

  alternates: {
    canonical: '/contact',
  },

  openGraph: {
    title: 'Contact Nawaz - Get Free Quote for Your Website',
    description:
      "Ready to start your website project? Contact me for a free consultation and quote. Fast response within 24 hours. Let's discuss how I can help your business grow online.",
    url: 'https://nzdevx.com/contact',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Contact - Get Your Website Quote',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <div className="container">
        <div className="relative mt-26 mb-12 lg:mt-28 3xl:mt-29 6xl:mt-30 h-[260px] 3xl:h-[270px] 6xl:h-[280px] bg-secondary overflow-hidden flex-col-center text-center rounded-lg shadow">
          <PageBgEffects />

          <h1 className="text-gradient-1 text-5xl 3xl:text-[55px] 6xl:text-6xl">Contact</h1>

          <div className="mt-4 mx-auto px-0.5 space-x-2 text-[15px] 3xl:text-base 6xl:text-lg flex-center font-semibold lg-subtitle relative max-w-max">
            <Link href="/" className="text-gradient">
              Home
            </Link>

            <ChevronsRight className="text-tertiary mt-1 pointer-events-none size-5 3xl:size-[21px] 6xl:size-[23px]" />

            <span className="text-gradient-1">Contact Page</span>
          </div>
        </div>
      </div>

      <MainPageUI />
    </div>
  );
}
