import SiteLayout from '../components/SiteLayout.jsx';
import Preloader from '@/components/ui/Preloader.jsx';
import { Roboto, Nunito } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './utilities.css';
import './globals.css';

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

const nunito = Nunito({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
});

export const metadata = {
  title: {
    default: 'Professional Web Developer for Modern Business Websites',
    template: '%s | Professional Web Developer',
  },

  description:
    'Hire a skilled Professional Web Developer with 4+ years of experience creating modern, high-performing, and conversion-focused websites for global businesses. I build fast, secure, mobile-friendly websites that help companies stand out and grow online.',

  keywords: [
    // Primary Keywords
    'Web Developer',
    'Nawaz Developer',
    'Dynamic Website',
    'Hire Web Developer',
    'Website Development',
    'Freelance Developer',
    'Full Stack Developer',
    'Fast Website Builder',
    'Responsive Web Design',
    'Custom Website Builder',
    'Mobile-Friendly Websites',
    'Modern Website Development',
    'Professional Website Design',
    'Professional Web Development',

    // Technology Keywords
    'React Developer',
    'Next.js Developer',
    'MERN Stack Developer',
    'JavaScript Developer',
    'HTML CSS Developer',
    'Frontend Developer',
    'Backend Developer',

    // Service Keywords - E-Commerce Store
    'Secure Online Shop',
    'Online Store Builder',
    'E-commerce Development',
    'E-commerce Website Design',

    // Service Keywords - CMS Development
    'CMS Development',
    'Shopify Development',
    'WordPress Development',
    'Easy Website Management',

    // Service Keywords - Design to Website
    'PSD to HTML',
    'Design to Code',
    'Figma to Website',
    'Sketch to Website',
    'Adobe XD to Website',
    'Pixel Perfect Website',

    // Service Keywords - Website Redesign
    'Website Redesign',
    'Update Old Website',
    'Make Website Modern',
    'Improve Website Speed',
    'Improve Website Design',

    // Service Keywords - Website Maintenance
    'Website Support',
    'Website Management',
    'Website Monitoring',
    'Website Maintenance',
    'Ongoing Website Support',

    // Platform-Specific Keywords
    'Upwork Developer',
    'Fiverr Web Developer',
    'Remote Web Developer',
    'Hire Developer Online',

    // Problem-Solving Keywords
    'SEO Optimization',
    'Speed Up Website',
    'Fix Broken Website',
    'Website Not Working',
    'Mobile Responsive Fix',
    'Improve Website Loading',
    'Cross-Browser Compatible',
    'Accessibility Compliant Website',
  ],

  authors: [{ name: 'Nawaz', url: 'https://nzdevx.com' }],
  creator: 'Nawaz',
  publisher: 'Nawaz',

  metadataBase: new URL('https://nzdevx.com'),

  alternates: {
    canonical: 'https://nzdevx.com/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nzdevx.com',
    siteName: 'Professional Web Developer',
    title: 'View My Work and Contact Me Easily',
    description:
      'Modern, fast, and business-focused website development for global clients. Expert Web Developer with 4+ years of experience delivering secure, responsive, and conversion-optimized websites.',
    images: [
      {
        url: 'https://nzdevx.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Professional Web Developer Portfolio',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@nawaz_dev',
    creator: '@nawaz_dev',
    title: 'View My Work and Contact Me Easily',
    description:
      'Professional Web Developer crafting modern, fast, and conversion-focused websites for businesses worldwide.',
    images: ['/logo.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: 'Welcome Back!',
            subtitle: 'Sign in required to update your experience',
          },
        },
        signUp: {
          start: {
            title: 'Create Account',
            subtitle: 'Account required to share your experience',
          },
        },
      }}
    >
      <html lang="en" suppressHydrationWarning className={`${roboto.variable} ${nunito.variable}`}>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          (function() {
            const theme = localStorage.getItem('theme');
            const isDark = theme === 'dark' || 
              (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (isDark) document.documentElement.classList.add('dark');
          })();
        `,
            }}
          />
        </head>

        <body className="transition-500 bg-primary text-secondary select-none">
          <Preloader />
          <SiteLayout>{children}</SiteLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
