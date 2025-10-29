'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getFeaturedProjects } from '@/hooks/useProjects.js';
import { ProjectCard, SkeletonProjectCard } from './Card.jsx';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ──────────────────────────────────────────────── Custom Hook to Check if Screen is Large */
const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check if screen width is 1900px or larger
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1900);
    };

    // Check screen size on first load
    checkScreenSize();

    // Check screen size when window is resized
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener when component unmounts
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isLargeScreen;
};

// ──────────────────────────────────────────────── Custom Hook to Get Featured Projects */
const useFeaturedProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const isLargeScreen = useIsLargeScreen();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Show 8 projects on large screens, 6 on smaller screens
      const limit = isLargeScreen ? 8 : 6;
      const featured = getFeaturedProjects(limit);
      setProjects(featured);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isLargeScreen]);

  return { loading, projects };
};

// ──────────────────────────────────────────────── Navigation Button Component */
const NavButton = ({ type, mobile }) => (
  <button
    className={`${type}-btn btn-secondary rounded-lg translate-y-0 ${
      mobile ? 'py-1.5 px-3.5 md:hidden' : 'py-3 px-3.5'
    }`}
  >
    {type === 'prev' ? <FaArrowLeftLong className="size-4.5" /> : <FaArrowRightLong className="size-4.5" />}
  </button>
);

// ──────────────────────────────────────────────── Link to All Projects Page */
const ProjectLink = ({ className }) => (
  <Link href="/projects" className={`btn-primary rounded-xl text-center ${className}`}>
    View All Projects
  </Link>
);

// ──────────────────────────────────────────────── Featured Projects Slider Component */
export const ProjectsSlider = () => {
  const { loading, projects } = useFeaturedProjects();

  // ─── Show loading skeleton while projects are being loaded
  if (loading) {
    return (
      <>
        <div className="max-w-[360px] md:max-w-[750px] mx-auto md:grid md:grid-cols-2 md:gap-10">
          <SkeletonProjectCard />

          <span className="hidden md:inline">
            <SkeletonProjectCard />
          </span>
        </div>

        <div className="w-full h-32 md:h-24 flex-center md:items-end">
          <span className="size-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  // ─── Show error message if no projects found
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20">
        <h4 className="text-2xl text-gradient">Something went wrong!</h4>
        <p className="mt-2">I'm working on it — please try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* ─── Swiper Slider Configuration */}
      <Swiper
        className="max-w-[360px] md:max-w-[750px]"
        loop={true}
        grabCursor={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ prevEl: '.prev-btn', nextEl: '.next-btn' }}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ el: '.custom-pagination', clickable: true, dynamicBullets: true }}
        onTouchStart={(swiper) => swiper.autoplay.stop()}
        onTouchEnd={(swiper) => swiper.autoplay.start()}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
        }}
      >
        {/* ─── Display each project as a slide */}
        {projects.map((project) => (
          <SwiperSlide key={project._id} className="p-2">
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ─── Navigation Controls and Pagination */}
      <div className="mx-auto mt-3 md:mt-6 px-1.5 max-w-[360px] md:max-w-[750px] md:grid md:grid-cols-3 md:items-center">
        {/* ─── "View All Projects" button for desktop */}
        <ProjectLink className="mx-3 hidden md:block" />

        <div className="flex justify-between mx-auto md:mx-0 p-3 md:col-span-2">
          {/* ─── Mobile navigation buttons */}
          <NavButton type="prev" mobile />
          <div className="custom-pagination ml-[25%] mt-3 md:mt-3.5" />
          <NavButton type="next" mobile />

          {/* ─── Desktop navigation buttons */}
          <div className="hidden md:flex gap-6">
            <NavButton type="prev" />
            <NavButton type="next" />
          </div>
        </div>

        {/* ─── "View All Projects" button for mobile */}
        <ProjectLink className="mx-3 mt-6 md:hidden" />
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────── Featured Projects Grid Component */
export const ProjectsGrid = () => {
  const { loading, projects } = useFeaturedProjects();

  // ─── Show loading skeleton while projects are being loaded
  if (loading) {
    return (
      <div className="grid grid-cols-3 6xl:grid-cols-4 gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonProjectCard key={i} />
        ))}
        <span className="hidden 6xl:inline">
          <SkeletonProjectCard />
        </span>
        <span className="hidden 6xl:inline">
          <SkeletonProjectCard />
        </span>
      </div>
    );
  }

  // ─── Show error message if no projects found
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20">
        <h4 className="text-2xl text-gradient">Something went wrong!</h4>
        <p className="mt-2">I'm working on it — please try again later.</p>
      </div>
    );
  }

  // ─── Display projects in a grid layout
  return (
    <div className="grid grid-cols-3 6xl:grid-cols-4 gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};
