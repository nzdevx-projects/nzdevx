'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { StarRating } from './SmallUI.jsx';
import { FaQuoteRight } from 'react-icons/fa';

/* ──────────────────────────────────────────────── Review Card UI. */
export function ReviewCard({ review }) {
  const { image, name, profession, feedback, rating } = review;

  return (
    <div className="card-animation">
      <div className="content custom-title-text-parent bg-primary-card p-6 group min-h-[310px] !justify-between">
        <div className="flex items-center w-full gap-5 mb-5">
          <div className="relative size-20 min-w-20 rounded-xl overflow-hidden border-4 border-primary">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
          <div>
            <div className="custom-title text-primary text-xl max-h-[1.5em] group-hover:max-h-[500px] transition-all duration-900 ease overflow-hidden">
              <h4 className="title-info line-clamp-1 group-hover:line-clamp-none">{name}</h4>
            </div>

            <div className="custom-title font-medium text-[15px] max-h-[1.5em] group-hover:max-h-[500px] transition-all duration-900 ease overflow-hidden">
              <p className="title-info line-clamp-1 group-hover:line-clamp-none">{profession}</p>
            </div>
          </div>
        </div>

        <div className="custom-text leading-relaxed mb-5 max-h-[6.5em] group-hover:max-h-[1500px] transition-all duration-1900 ease overflow-hidden">
          <p className="text-info line-clamp-4 group-hover:line-clamp-none">{feedback}</p>
        </div>

        <div className="w-full flex items-center justify-between">
          <StarRating rating={rating} readonly={true} />
          <FaQuoteRight className="size-10 text-tertiary" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────── Review Card Skeleton UI. */
export const SkeletonReviewCard = () => {
  return (
    <div className="card-animation">
      <div className="content bg-secondary-card p-8 min-h-[280px]">
        <div className="flex items-center w-full mb-4">
          {/* ─── Avatar */}
          <div className="relative size-18 rounded-xl overflow-hidden border-4 border-gray-200 dark:border-slate-700 skeleton-fields" />

          {/* ─── Name and profession */}
          <div className="ml-4 flex flex-col justify-center flex-grow">
            <div className="h-5 w-2/3 mb-2 rounded skeleton-fields" />
            <div className="h-4 w-1/2 rounded skeleton-fields" />
          </div>
        </div>

        {/* ─── Feedback text skeleton */}
        <div className="space-y-2 mb-4 w-full">
          <div className="h-4 w-full rounded skeleton-fields" />
          <div className="h-4 w-full rounded skeleton-fields" />
          <div className="h-4 w-full rounded skeleton-fields" />
          <div className="h-4 w-5/6 rounded skeleton-fields" />
        </div>

        {/* ─── Star rating and quote icon */}
        <div className="flex items-center justify-between w-full mt-auto">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="size-5 mr-1.5 rounded skeleton-fields" />
            ))}
          </div>
          <div className="size-10 rounded skeleton-fields" />
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────── Review Form Skeleton UI. */
export function ReviewFormSkeleton({ onClose }) {
  return (
    <div className="fixed inset-0 bg-primary flex-center z-50 p-4">
      <div className="bg-secondary rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-primary">
        {/* ─── Modal Header */}
        <div className="mb-7 flex items-start justify-between">
          <div className="skeleton-fields rounded-md h-8 w-40 sm:w-60"></div>
          <button onClick={onClose} className="flex-center size-7 rounded-full bg-secondary-card shadow group">
            <X strokeWidth={3} size={16} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* ─── Form Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            {/* ─── Profile Image Section */}
            <div className="space-y-5">
              <div className="flex items-end space-x-5">
                {/* Image Preview */}
                <div className="flex-shrink-0">
                  <div className="skeleton-fields w-20 h-20 rounded-xl border-4 border-gray-200 dark:border-slate-700"></div>
                </div>
                {/* Toggle Buttons */}
                <div className="flex space-x-5 mb-1">
                  <div className="skeleton-fields rounded-md h-8 w-16"></div>
                  <div className="skeleton-fields rounded-md h-8 w-12"></div>
                </div>
              </div>
              {/* Input Field */}
              <div className="skeleton-fields rounded-md h-12 w-full"></div>
            </div>

            {/* ─── Name Field */}
            <div>
              <div className="skeleton-fields rounded-md h-12 w-full"></div>
            </div>

            {/* ─── Profession Field */}
            <div>
              <div className="skeleton-fields rounded-md h-12 w-full"></div>
            </div>

            {/* ─── Rating Field */}
            <div>
              <div className="w-full gap-y-3 gap-x-6 p-3 skeleton-fields flex flex-wrap items-center rounded-md">
                <div className="skeleton-fields rounded-md h-6 w-32 border border-gray-300/50 dark:border-slate-800/50"></div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="skeleton-fields w-5 h-5 rounded-sm border border-gray-300/50 dark:border-slate-800/50"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Feedback Field */}
            <div>
              <div className="skeleton-fields rounded-md h-32 w-full"></div>
              {/* Dropdown Template */}
              <div className="mt-3">
                <div className="skeleton-fields rounded-md h-12 w-full"></div>
              </div>
            </div>
          </div>

          {/* ─── Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="skeleton-fields rounded-md h-12 w-20"></div>
            <div className="skeleton-fields rounded-md h-12 w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
