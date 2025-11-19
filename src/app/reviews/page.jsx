// src/app/reviews/page.js

import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';
import MainPageUI from '@/components/reviews/MainPage.jsx';
import { PageBgEffects } from '@/components/ui/BgEffects.jsx';
import ShareExperienceButton from '@/components/reviews/SmallUI.jsx';

export const metadata = {
  title: 'Client Reviews & Testimonials – Feedback for Nawaz',

  description:
    'Read honest reviews and testimonials from satisfied clients. See what business owners say about working with me on their websites. Real feedback about web development services, project results, communication, and customer support from clients worldwide.',

  keywords: [
    'web developer reviews',
    'client testimonials',
    'website developer feedback',
    'customer reviews',
    'web development testimonials',
    'satisfied clients',
    'developer ratings',
    'project feedback',
    'client success stories',
    'trusted web developer',
    'reliable developer reviews',
  ],

  alternates: {
    canonical: '/reviews',
  },

  openGraph: {
    title: 'Client Reviews - What Customers Say About My Web Development Services',
    description:
      'Read authentic reviews from satisfied clients. See real feedback about web development projects, communication, results, and customer service from businesses worldwide.',
    url: 'https://nzdevx.com/reviews',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Client Reviews and Testimonials',
      },
    ],
  },
};

export default function ReviewsPage() {
  return (
    <div>
      {/* Header */}
      <div className="container">
        <div className="relative mt-26 mb-12 lg:mt-28 3xl:mt-29 6xl:mt-30 h-[270px] 3xl:h-[280px] 6xl:h-[290px] bg-secondary overflow-hidden flex-col-center text-center rounded-lg shadow">
          <PageBgEffects />

          <h1 className="text-gradient-1 text-5xl 3xl:text-[55px] 6xl:text-6xl">Reviews</h1>

          <div className="mt-4 mx-auto px-0.5 space-x-2 text-[15px] 3xl:text-base 6xl:text-lg flex-center font-semibold lg-subtitle relative max-w-max">
            <Link href="/" className="text-gradient">
              Home
            </Link>

            <ChevronsRight className="text-tertiary mt-1 pointer-events-none size-5 3xl:size-[21px] 6xl:size-[23px]" />

            <span className="text-gradient-1">Reviews Page</span>
          </div>

          <div className="w-full flex-center mt-6">
            <ShareExperienceButton className="!px-4.5 !py-3.5 !text-sm" />
          </div>
        </div>
      </div>

      <MainPageUI />
    </div>
  );
}
