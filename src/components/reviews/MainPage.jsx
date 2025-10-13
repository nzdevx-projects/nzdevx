'use client';

import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useReviews } from '@/hooks/useReviews.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReviewCard, SkeletonReviewCard } from './Card.jsx';

// ──────────────────────────────────────────────── Main Reviews Page UI Component */
export default function MainPageUI() {
  const { loading, reviews } = useReviews();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 12;

  // ─── Calculate pagination directly from reviews
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  // ─── Handle page change and scroll to top
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);

    const reviewsSection = document.getElementById('reviews-grid');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ─── Reset to first page when reviews change
  const resetCurrentPage = () => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0);
    }
  };

  // Reset page when reviews update
  useState(() => {
    resetCurrentPage();
  }, [reviews.length, totalPages, currentPage]);

  // ─── Show loading skeleton grid
  if (loading) {
    return (
      <div id="reviews-grid" className="min-h-max">
        <div className="container">
          <div className="max-w-[340px] md:max-w-[735px] 2xl:max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 6xl:grid-cols-4 gap-6 md:gap-10 2xl:gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonReviewCard key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="reviews-grid" className="min-h-max">
      <div className="container">
        {/* ─── Reviews Grid */}
        <div className="max-w-[340px] md:max-w-[735px] 2xl:max-w-full mx-auto grid md:items-end grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 6xl:grid-cols-4 gap-6 md:gap-10 2xl:gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
          {currentReviews.map((review, index) => (
            <ReviewCard key={review._id || review.id || `review-${startIndex + index}`} review={review} />
          ))}
        </div>

        {/* ─── Pagination Component */}
        <PaginationComponent pageCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────── Pagination Component */
const PaginationComponent = ({ pageCount, currentPage, onPageChange }) => {
  // ─── Don't show pagination if only one page
  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center my-16">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        forcePage={currentPage}
        containerClassName="flex items-center gap-x-2 p-1 bg-primary rounded-md shadow-secondary overflow-hidden cursor-pointer"
        pageClassName="bg-primary-card rounded-md"
        pageLinkClassName="px-3 py-1.5 rounded-md text-sm"
        activeClassName="bg-tertiary text-white"
        activeLinkClassName="bg-tertiary text-white"
        previousLabel={<ChevronLeft size={20} className="pointer-events-none" />}
        nextLabel={<ChevronRight size={20} className="pointer-events-none" />}
        previousLinkClassName="btn-primary px-3 py-1.5 rounded-md hover:-translate-y-0"
        nextLinkClassName="btn-primary px-3 py-1.5 rounded-md hover:-translate-y-0"
        disabledClassName="opacity-50 cursor-not-allowed hover:translate-0"
        disabledLinkClassName="cursor-not-allowed hover:translate-0"
        breakLabel="..."
        breakClassName="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400"
      />
    </div>
  );
};
