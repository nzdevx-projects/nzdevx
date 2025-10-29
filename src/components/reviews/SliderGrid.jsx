'use client';

import { useReviews } from '@/hooks/useReviews.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useRef } from 'react';
import { ReviewCard, SkeletonReviewCard } from './Card.jsx';
import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ──────────────────────────────────────────────── Custom Hook for Check Large Screen */
const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isLargeScreen;
};

// ──────────────────────────────────────────────── Reviews Slider Component */
// ─── Navigation button component for slider
const NavButton = ({ type }) => (
  <button className={`${type}-r-btn text-primary hover:scale-105`}>
    {type === 'prev' ? <CgArrowLongLeft className="size-9" /> : <CgArrowLongRight className="size-9" />}
  </button>
);

export const ReviewsSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { loading, reviews } = useReviews();
  const paginationRef = useRef(null);

  // ─── Show loading skeleton while fetching reviews
  if (loading) {
    return (
      <>
        <div className="mx-auto max-w-[350px] md:max-w-[760px] md:grid md:grid-cols-2 md:gap-10">
          <SkeletonReviewCard />

          <span className="hidden md:inline">
            <SkeletonReviewCard />
          </span>
        </div>

        <div className="w-full h-16 flex-center items-end">
          <span className="size-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  // ─── Show error message if no reviews found
  if (!reviews || reviews.length === 0) {
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
        className="review-slider mx-auto max-w-[350px] md:max-w-[760px]"
        loop={true}
        grabCursor={true}
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{ prevEl: '.prev-r-btn', nextEl: '.next-r-btn' }}
        pagination={{
          type: 'fraction',
          el: '.swiper-pagination-fraction',
          formatFractionCurrent: (number) => `${number}`,
          formatFractionTotal: (number) => `${number}`,
        }}
        autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          if (paginationRef.current) {
            swiper.pagination.el = paginationRef.current;
            swiper.pagination.init();
            swiper.pagination.update();
          }
        }}
        onTouchStart={(swiper) => swiper.autoplay.stop()}
        onTouchEnd={(swiper) => swiper.autoplay.start()}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
        }}
      >
        {/* ─── Display each reviews as a slide */}
        {reviews.slice(0, 9).map((review) => (
          <SwiperSlide key={review.id || review._id} className="p-2">
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ─── Navigation and Pagination Controls */}
      <div className="px-5 mt-2 mx-auto max-w-[350px] md:max-w-[760px] flex items-center justify-between">
        <div className="flex items-center gap-5">
          <NavButton type="prev" />
          <NavButton type="next" />
        </div>
        <div ref={paginationRef} className="swiper-pagination-fraction text-primary font-semibold !w-auto"></div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────── Reviews Grid Component */
export const ReviewsGrid = () => {
  const { loading, reviews } = useReviews();
  const isLargeScreen = useIsLargeScreen();
  const limit = isLargeScreen ? 8 : 6;

  // ─── Show loading skeleton while fetching reviews
  if (loading) {
    return (
      <div className="grid grid-cols-3 6xl:grid-cols-4 gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonReviewCard key={i} />
        ))}
        <span className="hidden 6xl:inline">
          <SkeletonReviewCard />
        </span>
        <span className="hidden 6xl:inline">
          <SkeletonReviewCard />
        </span>
      </div>
    );
  }

  // ─── Show error message if no reviews found
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-20">
        <h4 className="text-2xl text-gradient">Something went wrong!</h4>
        <p className="mt-2">I'm working on it — please try again later.</p>
      </div>
    );
  }

  // ─── Display reviews in a grid layout
  return (
    <div className="grid items-end grid-cols-3 6xl:grid-cols-4 gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
      {reviews.slice(0, limit).map((review) => (
        <ReviewCard key={review.id || review._id} review={review} />
      ))}
    </div>
  );
};
