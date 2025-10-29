import Link from 'next/link';
import Image from 'next/image';
import { FileText, Globe } from 'lucide-react';

/* ──────────────────────────────────────────────── Project Card UI. */
export const ProjectCard = ({ project }) => {
  return (
    <div className="card-animation">
      <div className="content bg-primary-card p-2 group project-card">
        <div>
          <div className="aspect-video relative">
            <Image
              src={`/projects/${project.image}`}
              alt={project.title}
              fill
              className="project-image object-cover rounded-t-lg object-top group-hover:object-bottom transition-all duration-[5000ms] ease-linear"
            />
          </div>

          <div className="p-5">
            <h3 className="text-gradient font-bold text-xl line-clamp-1">{project.title}</h3>

            <div className="flex items-center justify-start gap-2 mt-1">
              <span className="text-sm font-medium">Category</span> :
              <span className="text-primary font-semibold text-base line-clamp-1">{project.subcategory}</span>
            </div>

            <div className="flex items-center justify-start gap-2 mt-1">
              <span className="text-sm font-medium">Website Type</span> :
              <span className="text-primary font-semibold text-base line-clamp-1">{project.page}</span>
            </div>

            <p className="line-clamp-2 mt-1.5 mb-4 text-sm xs:text-[15px]">{project.shortDescription}</p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-300 dark:border-slate-600">
              <Link href={`/projects/${project._id}`} className="btn-primary py-2 text-xs">
                <FileText className="size-4 xs:hidden" />
                <span className="hidden xs:inline">View Details</span>
              </Link>
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-2 text-xs"
                >
                  <Globe className="size-4 xs:hidden" />
                  <span className="hidden xs:inline">Visit Site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────── Project Card Skeleton UI. */
export const SkeletonProjectCard = () => (
  <div className="card-animation">
    <div className="content bg-primary-card p-2 min-h-[380px]">
      <div className="w-full">
        {/* ─── Image skeleton with shimmer */}
        <div className="aspect-video rounded-t-lg mb-1 skeleton-fields" />
        <div className="p-5">
          {/* ─── Title with shimmer */}
          <div className="h-6 w-2/3 rounded mb-2 skeleton-fields" />

          {/* ─── Category section with shimmer */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-16 rounded skeleton-fields" />
            <div className="mb-[6px] opacity-40">:</div>
            <div className="h-5 w-28 rounded skeleton-fields" />
          </div>

          {/* ─── Website Pages section with shimmer */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-16 rounded skeleton-fields" />
            <div className="mb-[6px] opacity-40">:</div>
            <div className="h-5 w-28 rounded skeleton-fields" />
          </div>

          {/* ─── Description lines with shimmer */}
          <div className="h-4 w-full rounded mb-1.5 skeleton-fields" />
          <div className="h-4 w-5/6 rounded mb-4 skeleton-fields" />

          {/* ─── Action buttons with shimmer */}
          <div className="flex items-center justify-between gap-3 pt-4 mt-5 border-t border-gray-300 dark:border-slate-600">
            <div className="h-8 w-12 xs:w-28 rounded-lg skeleton-fields" />
            <div className="h-8 w-12 xs:w-28 rounded-lg skeleton-fields" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
