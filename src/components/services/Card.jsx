'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoArrowForward } from 'react-icons/io5';

/* ──────────────────────────────────────────────── Service Card UI. */
export const ServiceCard = ({ service }) => {
  const pathname = usePathname();
  const isServicesPage = pathname === '/services';

  return (
    <div className="card-animation">
      <div
        className={`content p-2 group
        ${isServicesPage ? 'bg-primary-card' : 'bg-secondary-card'}`}
      >
        <div className="p-4 flex flex-col justify-between min-h-[260px]">
          <div>
            {/* Service Icon */}
            <div className="flex justify-between items-center">
              <div className="dual-color-icon aspect-square relative size-14 rounded-lg mb-4">
                <div
                  className="w-full h-full p-2 bg-gradient-to-br from-cyan-600 to-teal-500 dark:from-cyan-500 dark:to-teal-300 rounded-lg transition-all duration-300"
                  style={{
                    maskImage: `url(${service.icon})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${service.icon})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>

              <Link
                href={isServicesPage ? '/' : '/services'}
                className={`p-2 rounded-full mb-4 transition-300 shadow-xs
                ${isServicesPage ? 'bg-primary' : 'bg-secondary'}`}
              >
                <IoArrowForward className="service-arrow size-7 text-teal-500 dark:text-teal-300" />
              </Link>
            </div>

            <h3 className="text-primary font-bold text-2xl mb-3">{service.title}</h3>
            <p className="text-sm xs:text-[15px] 6xl:text-base">{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────── Service Card Skeleton UI. */
export const SkeletonServiceCard = () => {
  const pathname = usePathname();
  const isServicesPage = pathname === '/services';

  return (
    <div className="card-animation animate-pulse">
      <div
        className={`content p-2 group min-h-[260px]
        ${isServicesPage ? 'bg-primary-card' : 'bg-secondary-card'}`}
      >
        <div className="p-4 flex flex-col justify-between min-h-[260px] w-full">
          <div>
            {/* ─── Top row: Icon + Arrow */}
            <div className="flex justify-between items-center mb-4">
              <div className="aspect-square size-14 rounded-lg skeleton-fields" />
              <div className="size-10 rounded-full skeleton-fields" />
            </div>

            {/* ─── Title */}
            <div className="h-6 w-2/3 rounded mb-3 skeleton-fields" />

            {/* ─── Description lines */}
            <div className="h-4 w-full rounded mb-2 skeleton-fields" />
            <div className="h-4 w-full rounded mb-2 skeleton-fields" />
            <div className="h-4 w-full rounded mb-2 skeleton-fields" />
            <div className="h-4 w-full rounded mb-2 skeleton-fields" />
            <div className="h-4 w-5/6 rounded skeleton-fields" />
          </div>
        </div>
      </div>
    </div>
  );
};
