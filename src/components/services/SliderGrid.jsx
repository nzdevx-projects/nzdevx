'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import serviceInfo from '@/data/services.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ServiceCard, SkeletonServiceCard } from './Card.jsx';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

// ──────────────────────────────────────────────── Custom Hook to Get Services */
const UseServices = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const featured = serviceInfo.services || [];
      setServices(featured);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { loading, services };
};

// ──────────────────────────────────────────────── Services Slider Component */
// ─── Navigation button component for slider
const NavButton = ({ type }) => (
  <button className={`${type}-s-btn btn-secondary rounded-lg translate-y-0 px-4`}>
    {type === 'prev' ? <FaAnglesLeft className="size-4.5" /> : <FaAnglesRight className="size-4.5" />}
  </button>
);

export const ServicesSlider = () => {
  const { loading, services } = UseServices();

  // ─── Show loading skeleton while services are being loaded
  if (loading) {
    return (
      <>
        <div className="mx-auto max-w-[360px] md:max-w-[750px] md:grid md:grid-cols-2 md:gap-10">
          <SkeletonServiceCard />

          <span className="hidden md:inline">
            <SkeletonServiceCard />
          </span>
        </div>

        <div className="w-full h-32 flex-center">
          <span className="size-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  // ─── Show error message if no services found
  if (!services || services.length === 0) {
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
        className="service-slider mx-auto max-w-[360px] md:max-w-[750px]"
        loop={true}
        grabCursor={true}
        modules={[Navigation, Scrollbar, Autoplay]}
        navigation={{ prevEl: '.prev-s-btn', nextEl: '.next-s-btn' }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        scrollbar={{ draggable: true }}
        onTouchStart={(swiper) => swiper.autoplay.stop()}
        onTouchEnd={(swiper) => swiper.autoplay.start()}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
        }}
      >
        {/* ─── Display each service as a slide */}
        {services.map((service) => (
          <SwiperSlide key={service._id} className="p-2 pb-8">
            <ServiceCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ─── Navigation Controls */}
      <div className="mx-auto max-w-[360px] md:max-w-[750px] px-4 mt-6 gap-y-6 flex flex-wrap items-center justify-between">
        <Link href="/services" className="btn-primary rounded-xl text-center">
          Services & Faqs
        </Link>
        <div className="flex items-center gap-5">
          <NavButton type="prev" />
          <NavButton type="next" />
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────── Services Grid Component */
export const ServicesGrid = () => {
  const pathname = usePathname();
  const isServicesPage = pathname === '/services';

  const { loading, services } = UseServices();

  // ─── Show loading skeleton while services are being loaded
  if (loading) {
    return (
      <div
        className={`
        ${
          isServicesPage
            ? 'max-w-[340px] md:max-w-[735px] 2xl:max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-10 2xl:gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10'
            : 'grid grid-cols-3 gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10'
        }`}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonServiceCard key={i} />
        ))}
      </div>
    );
  }

  // ─── Show error message if no services found
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-20">
        <h4 className="text-2xl text-gradient">Something went wrong!</h4>
        <p className="mt-2">I'm working on it — please try again later.</p>
      </div>
    );
  }

  // ─── Display services in a grid layout
  return (
    <div
      className={`
        ${
          isServicesPage
            ? 'max-w-[340px] md:max-w-[735px] 2xl:max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-10 2xl:gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10'
            : 'grid grid-cols-3 gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10'
        }`}
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};
