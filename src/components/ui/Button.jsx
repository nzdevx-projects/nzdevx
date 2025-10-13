'use client';

import { useRouter, usePathname } from 'next/navigation';
import { IoArrowBack, IoClose } from 'react-icons/io5';

/* ──────────────────────────────────────────────── Go Back Button Variants */
/* ─── "X" Icon Go Back Button. */
export const GoBackButtonX = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="flex-center size-8 rounded-full bg-secondary-card shadow group">
      <IoClose size={20} className="group-hover:rotate-90 transition-transform duration-200" />
    </button>
  );
};

/* ─── "ArrowLeft" Go Back Button. */
export const GoBackArrowButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-primary hover:scale-105 transition-transform duration-200 group"
    >
      <IoArrowBack size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
    </button>
  );
};

/* ─── "Arrow with text" Go Back Button. */
export const GoBackArrowTextButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="flex items-center gap-1.5 btn-primary group">
      <IoArrowBack size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
      <span className="text-sm font-bold">Go Back</span>
    </button>
  );
};
