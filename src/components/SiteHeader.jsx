'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HeaderBgEffects } from './ui/BgEffects.jsx';
import { ThemeToggleButton } from '../hooks/useTheme.jsx';

// ─── Navigation menu links
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact', path: '/contact' },
];

const SiteHeader = () => {
  const pathname = usePathname();

  const [isNavActive, setNavActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // ─── Set up desktop detection and scroll behavior
  useEffect(() => {
    // ─── Check if screen is desktop size (960px or wider)
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 960);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    // ─── Hide header when scrolling down, show when scrolling up
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 150);
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 150);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ─── Prevent scrolling on mobile when menu is open
  useEffect(() => {
    if (!isDesktop) {
      document.body.style.overflow = isNavActive ? 'hidden' : 'auto';
    }
  }, [isNavActive, isDesktop]);

  return (
    <header
      className={`bg-secondary w-full fixed top-0 right-0 z-50 py-3 lg:py-4 6xl:py-4.5 transition-500
        ${isScrolled ? 'shadow-primary' : ''}
        ${isHidden ? 'translate-y-[-80px]' : ''}`}
    >
      <div className="container flex items-center justify-between gap-2.5">
        {/* ─── Site Logo */}
        <div className="inline-flex">
          <Link href="/" className="text-gradient font-nunito relative z-50 text-2xl 3xl:text-[27px] 6xl:text-3xl">
            NzDevx.
          </Link>
        </div>

        <ThemeToggleButton />

        {/* ─── Mobile Menu Toggle Button (Hamburger Icon) */}
        <button
          onClick={() => setNavActive(!isNavActive)}
          className={`relative z-50 lg:hidden ${isNavActive ? 'rotate-[-45deg]' : 'rotate-[-55deg]'}`}
        >
          <span
            className={`block bg-gradient rounded-full ml-auto w-2.5  h-[3px]
              ${isNavActive ? 'my-0.5 rotate-90 translate-x-[-5px]' : 'my-1'}`}
          />
          <span className="block bg-gradient rounded-full w-5 h-[3px]" />
          <span
            className={`block bg-gradient rounded-full w-2.5 h-[3px]
              ${isNavActive ? 'my-0.5 rotate-90 translate-x-[5px]' : 'my-1'}`}
          />
        </button>

        {/* ─── Navigation Menu */}
        <nav
          className={`bg-secondary size-full lg:size-auto fixed left-0 lg:static grid place-items-center transition-all duration-700 lg:visible lg:transition-none lg:bg-transparent overflow-hidden z-40
          ${isDesktop ? '' : 'ease-[cubic-bezier(0.71,0.01,0.24,0.99)]'}
          ${!isDesktop && !isNavActive ? 'top-full invisible delay-500' : 'top-0 visible'}`}
        >
          <ul
            className="flex flex-col items-center lg:flex-row lg:gap-8 "
            onClick={() => !isDesktop && setNavActive(false)}
          >
            {/* ─── Background Effects for Navigation */}
            <HeaderBgEffects />

            {/* ─── Navigation Links */}
            {NAV_LINKS.map(({ name, path }) => (
              <li key={name} className="py-5 px-10 lg:p-0 rounded-lg overflow-hidden">
                <Link
                  href={path}
                  className={`nav-links text-gradient font-nunito font-bold relative rounded-lg px-2 lg:px-1.5 text-2xl lg:text-base 3xl:text-lg 6xl:text-[19px] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:rounded-full before:w-0 before:h-[3px] hover:before:w-full transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,2)] lg:duration-500 lg:translate-y-0 before:content-[""] 
                  ${!isDesktop && !isNavActive ? 'translate-y-12' : 'translate-y-0 delay-500'} 
                  ${pathname === path ? 'before:w-full' : 'before:w-0'}`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
