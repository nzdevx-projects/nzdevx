import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Mail, Check, Circle, Globe } from 'lucide-react';
import { ProjectsSlider } from '@/components/projects/Featured.jsx';
import LivePreviewTrigger from '@/components/projects/LivePreview.jsx';
import { getProjectById, getAllProjects } from '@/hooks/useProjects.js';
import { GoBackArrowButton, GoBackButtonX } from '@/components/ui/Button.jsx';

/* ─── Generate static params for all projects (build-time optimization) ─── */
export async function generateStaticParams() {
  const allProjects = getAllProjects();

  return allProjects.map((project) => ({
    id: project._id,
  }));
}

/* ─── Generate dynamic metadata for SEO ─── */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found - Portfolio',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

/* ──────────────────────────────────────────────── Project Detail Page Component. */
const ProjectDetailPage = async ({ params }) => {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* container div */}
      <div className="px-[5%] md:px-10 pb-10 mx-auto md:max-w-[830px]">
        {/* Header */}
        <div className="flex justify-between bg-secondary p-3 mt-4 mb-8 rounded-xl shadow">
          <h3 className="text-gradient-1 text-2xl">Project Details</h3>

          <GoBackButtonX />
        </div>

        {/* Hero Section - Project image and main action buttons  */}
        <div className="bg-secondary shadow rounded-xl mb-10 group project-card">
          <div className="p-3 flex justify-between items-center border-b border-cyan-500 dark:border-slate-500">
            <GoBackArrowButton />

            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Circle key={i} strokeWidth={1.5} className="size-4.5 text-primary" />
              ))}
            </div>
          </div>

          {/* Project Image Display */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={`/projects/${project.image}`}
              alt={project.title}
              fill
              className="project-image object-cover object-top group-hover:object-bottom transition-all duration-[5000ms] ease-linear"
              priority
            />
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-between gap-2 p-3 border-t-2 border-cyan-500 dark:border-slate-500">
            <Link href="/contact" className="flex-center gap-2 btn-primary py-2.5 3xl:py-3 px-3 3xl:px-4">
              <Mail strokeWidth={2.5} className="size-4.5 xs:hidden sm:inline" />
              <span className="hidden xs:inline">Contact Me</span>
            </Link>

            <span className="md:hidden">
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-center gap-2 btn-primary py-2.5 3xl:py-3 px-3 3xl:px-4"
              >
                <Globe strokeWidth={2.5} className="size-4.5 xs:hidden sm:inline" />
                <span className="hidden xs:inline">Visit Site</span>
              </a>
            </span>

            <span className="hidden md:inline-block">
              <LivePreviewTrigger url={project.websiteUrl} />
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="">
          {/* Project Description Section */}
          <div className="space-y-10">
            <div className="bg-secondary shadow rounded-xl p-4">
              <h1 className="text-gradient-1 text-3xl mb-4">{project.title}</h1>

              <p className="leading-relaxed">{project.detailedDescription}</p>

              {/* Show additional description only if it exists */}
              {project.additionalDescription && <p className="leading-relaxed mt-5">{project.additionalDescription}</p>}
            </div>

            {/* Key Features Section - Conditionally rendered */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="bg-secondary shadow rounded-xl p-4">
                <h3 className="text-primary text-2xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      {/* Check icon for each feature */}
                      <div className="bg-primary rounded-full shadow p-1 mt-1">
                        <Check className="text-tertiary size-3" strokeWidth={2.5} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Information */}
          <div className="space-y-10 mt-10">
            {/* Project Meta Information */}
            <div className="bg-secondary shadow rounded-xl p-4">
              <h3 className="text-primary text-2xl font-bold mb-3">Project Info</h3>
              <div className="space-y-3 sm:flex sm:flex-wrap sm:justify-between sm:gap-10">
                <div className="xs:flex xs:flex-wrap xs:gap-2 sm:block">
                  <span className="text-sm">Project Name:</span>
                  <p className="text-tertiary">{project.title}</p>
                </div>
                <div className="xs:flex xs:flex-wrap xs:gap-2 sm:block">
                  <span className="text-sm">Category:</span>
                  <p className="text-tertiary">{project.category}</p>
                </div>
                <div className="xs:flex xs:flex-wrap xs:gap-2 sm:block">
                  <span className="text-sm">Subcategory:</span>
                  <p className="text-tertiary">{project.subcategory}</p>
                </div>
                <div className="xs:flex xs:flex-wrap xs:gap-2 sm:block">
                  <span className="text-sm">Website Type:</span>
                  <p className="text-tertiary">{project.page}</p>
                </div>

                {/* Website link - only shown if URL exists */}
                {project.websiteUrl && (
                  <div className="xs:flex xs:flex-wrap xs:gap-2 sm:block">
                    <span className="text-sm">Website:</span>
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Live Site
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Call to Action for Similar Work */}
            <div className="bg-secondary shadow rounded-xl p-4 sm:flex sm:items-center sm:justify-around sm:gap-10 sm:flex-wrap">
              <div>
                <h3 className="text-lg font-semibold text-gradient-1 mb-2">Interested in Similar Work?</h3>
                <p className="text-sm mb-7 sm:mb-0">Let's discuss your project and bring your ideas to life.</p>
              </div>
              <Link href="/contact" className="flex-center space-x-2 btn-primary py-2.5 text-sm sm:max-w-max">
                <Mail size={14} strokeWidth={3} />
                <span>Get In Touch</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Projects Slider Section */}
        <div className="text-center mb-10 mt-20">
          <h2 className="text-gradient-1 my-2.5 text-4xl">More Projects</h2>
          <p>Check out these other amazing projects from my portfolio</p>
        </div>

        <ProjectsSlider />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
