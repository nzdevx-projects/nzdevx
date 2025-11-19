import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';
import MainPageUI from '@/components/projects/MainPage.jsx';
import { PageBgEffects } from '@/components/ui/BgEffects.jsx';

export const metadata = {
  title: 'Portfolio Projects - Web Development Work & Case Studies',

  description:
    'Explore my portfolio of professional web development projects. See real examples of business websites, e-commerce stores, custom web applications, and responsive designs built with React, Next.js, and modern technologies. Each project showcases quality work that helps businesses grow.',

  keywords: [
    'React projects',
    'website examples',
    'Next.js projects',
    'developer projects',
    'full stack projects',
    'MERN stack projects',
    'e-commerce examples',
    'business website examples',
    'web development portfolio',
    'web development case studies',
    'responsive website examples',
    'modern web design portfolio',
  ],

  alternates: {
    canonical: '/projects',
  },

  openGraph: {
    title: 'Web Development Portfolio - Professional Projects by Nawaz | nzdevx.com',

    description:
      'Browse through professional web development projects including business websites, e-commerce stores, and custom applications. See real examples of quality work built with modern technologies.',

    url: 'https://nzdevx.com/projects',

    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Web Development Portfolio Projects',
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <div>
      {/* Header */}
      <div className="container">
        <div className="relative mt-26 mb-12 lg:mt-28 3xl:mt-29 6xl:mt-30 h-[260px] 3xl:h-[270px] 6xl:h-[280px] bg-secondary overflow-hidden flex-col-center text-center rounded-lg shadow">
          <PageBgEffects />

          <h1 className="text-gradient-1 text-5xl 3xl:text-[55px] 6xl:text-6xl">Projects</h1>

          <div className="mt-4 mx-auto px-0.5 space-x-2 text-[15px] 3xl:text-base 6xl:text-lg flex-center font-semibold lg-subtitle relative max-w-max">
            <Link href="/" className="text-gradient">
              Home
            </Link>

            <ChevronsRight className="text-tertiary mt-1 pointer-events-none size-5 3xl:size-[21px] 6xl:size-[23px]" />

            <span className="text-gradient-1">Projects Page</span>
          </div>
        </div>
      </div>

      <MainPageUI />
    </div>
  );
}
