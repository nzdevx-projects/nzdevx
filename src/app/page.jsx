import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircleDashed } from 'lucide-react';
import { HomeBgEffects, BgGlowRings } from '@/components/ui/BgEffects.jsx';
import { ProjectsSlider, ProjectsGrid } from '@/components/projects/Featured.jsx';
import { ServicesSlider, ServicesGrid } from '@/components/services/SliderGrid.jsx';
import { ReviewsSlider, ReviewsGrid } from '@/components/reviews/SliderGrid.jsx';
import ShareExperienceButton from '@/components/reviews/SmallUI.jsx';

export default function HomePage() {
  return (
    <main>
      {/* ──────────────────────────────────────────────── Home Section. */}
      <section>
        <div className="container relative overflow-hidden pt-32 sm:pt-36 lg:pt-56 3xl:pt-65 6xl:pt-72 pb-20 lg:pb-36 3xl:pb-50 6xl:pb-60">
          <HomeBgEffects />

          <div className="flex flex-col items-center gap-y-20 gap-x-16 lg:flex-row-reverse lg:justify-between">
            {/* ─── Hero Image */}
            <div className="hero-image flex-center relative overflow-hidden rounded-full aspect-square p-[3px] 3xl:p-[3.5px] 6xl:p-[4px]  w-[88%] 3xl:w-full max-w-[315px] 3xl:max-w-[350px] 6xl:max-w-[380px]">
              <div className="bg-primary flex-center overflow-hidden rounded-full size-full transition-500 z-10">
                <Image src="/nawaz.png" alt="nawaz profile" fill className="transform translate-y-5 object-cover" />
              </div>
            </div>

            {/* ─── Home Content */}
            <div className="sm:text-center lg:text-left">
              <h4 className="text-tertiary font-black sm:font-extrabold text-base 3xl:text-lg 6xl:text-xl">
                Hello<i className="pl-1 text-gradient">Everyone</i>!
              </h4>

              <h1 className="text-primary mt-2 text-5xl 3xl:text-6xl 6xl:text-[65px]">
                I'm<i className="text-gradient pl-1">Nawaz</i>
              </h1>

              <h4 className="text-primary font-roboto font-medium mt-2.5 text-lg 3xl:text-xl 6xl:text-[22px]">
                Full-Stack Website Developer
              </h4>

              <p className="mt-3 3xl:text-[17px] 6xl:text-lg max-w-[500px] sm:max-w-[600px] lg:max-w-[485px] 6xl:max-w-[530px]">
                I design and develop user-friendly web solutions that are fast, responsive, secure, and work seamlessly
                across all devices. I transform your ideas into reality with clean, efficient code.
              </p>

              <div className="flex flex-wrap gap-6 mt-8 3xl:mt-9 6xl:mt-10 sm:justify-center lg:justify-start">
                <Link href="/contact" className="btn-primary rounded-full">
                  Let's Work Together
                </Link>
                <Link href="#projects" className="btn-secondary rounded-full">
                  See My Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── About Section. */}
      <section className="bg-secondary relative">
        <div className="py-20 container">
          {/* ─── About Header */}
          <div className="text-center mb-10 3xl:mb-14 6xl:mb-16">
            <h4 className="subtitle text-primary relative max-w-max mx-auto px-0.5 3xl:text-lg 6xl:text-xl">
              About Me
            </h4>
            <h2 className="text-gradient-1 my-2.5 text-4xl 3xl:text-5xl 6xl:text-[55px]">Why Hire Me?</h2>
          </div>

          {/* ─── About Content */}
          <div className="mx-3 text-center grid gap-8 md:grid-cols-2 3xl:gap-16">
            {/* MY JOURNEY */}
            <div className="about card-animation">
              <div className="content bg-secondary-card py-7 px-5">
                <h3 className="text-primary mb-3 text-2xl 3xl:text-[28px] 6xl:text-[33px]">My Journey</h3>

                <p className="font-medium text-sm md:text-[15px] 3xl:text-base 6xl:text-[17px]">
                  I have over 4 years of professional experience in web development. I work with modern technologies
                  like HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, Express.js, MongoDB, Next.js, and many other
                  advanced tools. I am passionate about learning new skills and staying updated with the latest web
                  development trends to create innovative and reliable solutions for my clients worldwide.
                </p>
              </div>
            </div>

            {/* MY EXPERTISE */}
            <div className="about card-animation">
              <div className="content bg-secondary-card py-7 px-5">
                <h3 className="text-primary mb-3 text-2xl 3xl:text-[28px] 6xl:text-[33px]">My Expertise</h3>

                <p className="font-medium text-sm md:text-[15px] 3xl:text-base 6xl:text-[17px]">
                  I build fast, mobile-friendly, and responsive websites for many different types of businesses. This
                  includes business services, online stores, company websites, personal portfolios, restaurant sites,
                  event pages, blogs, and many more industries. I focus on understanding each client's unique needs and
                  requirements to create websites that help grow their business and engage customers effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── Projects Section. */}
      <section id="projects" className="py-20 relative">
        <div className="container">
          {/* ─── Projects Header */}
          <div className="text-center 2xl:text-left mb-10 3xl:mb-14 6xl:mb-16 2xl:flex 2xl:items-center 2xl:justify-between">
            <div>
              <h4 className="subtitle text-primary relative max-w-max mx-auto 2xl:mx-0 px-0.5 3xl:text-lg 6xl:text-xl">
                My Projects
              </h4>
              <h2 className="text-gradient-1 my-2.5 text-4xl 3xl:text-5xl 6xl:text-[55px]">My Recent Work</h2>
            </div>

            <Link href="/projects" className="btn-primary hidden max-w-max 2xl:flex gap-2 group">
              View All Projects
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* ─── Projects Content */}
          <div className="min-h-[630px] md:min-h-[580px] 2xl:min-h-[888px]">
            <div className="2xl:hidden">
              <ProjectsSlider />
            </div>
            <div className="hidden 2xl:grid">
              <ProjectsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── Services Section. */}
      <section id="services" className="py-20 relative bg-secondary">
        <div className="container">
          {/* ─── Services Header */}
          <div className="text-center 2xl:text-left mb-10 3xl:mb-14 6xl:mb-16 2xl:flex 2xl:items-center 2xl:justify-between">
            <div>
              <h4 className="subtitle text-primary relative max-w-max mx-auto 2xl:mx-0 px-0.5 3xl:text-lg 6xl:text-xl">
                My Services
              </h4>
              <h2 className="text-gradient-1 my-2.5 text-4xl 3xl:text-5xl 6xl:text-[55px]">Services I Offer</h2>
            </div>

            <Link href="/services" className="btn-primary hidden max-w-max 2xl:flex gap-2 group">
              Services & Faqs
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* ─── Services Content */}
          <div className="min-h-[430px] 2xl:min-h-[630px]">
            <div className="2xl:hidden">
              <ServicesSlider />
            </div>
            <div className="hidden 2xl:grid">
              <ServicesGrid />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── Reviews Section. */}
      <section className="py-20">
        <div className="container">
          {/* ─── Reviews Header */}
          <div className="text-center mb-10 3xl:mb-14 6xl:mb-16">
            <div>
              <h4 className="subtitle text-primary relative max-w-max mx-auto px-0.5 3xl:text-lg 6xl:text-xl">
                Client Reviews
              </h4>
              <h2 className="text-gradient-1 my-2.5 text-4xl 3xl:text-5xl 6xl:text-[55px]">What Clients Say</h2>
            </div>

            <div className="flex-center flex-wrap gap-4 sm:gap-8 mt-5 6xl:mt-8">
              <ShareExperienceButton />

              <Link href="/reviews" className="btn-secondary flex gap-2 group">
                View All Reviews
                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* ─── Reviews Content */}
          <div className="min-h-[385px] 2xl:min-h-[670px]">
            <div className="2xl:hidden">
              <ReviewsSlider />
            </div>
            <div className="hidden 2xl:grid">
              <ReviewsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── Call to Action Section. */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-primary  border-primary shadow-lg p-8 md:p-12">
            <BgGlowRings className="hidden md:flex absolute bottom-0 left-0" />
            <BgGlowRings className="hidden md:flex absolute bottom-0 right-0" />

            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-gradient-1 mb-2.5 text-4xl 3xl:text-5xl 6xl:text-[55px]">
                  Ready to Start Your Project?
                </h2>
                <p className="mb-10 mx-auto 3xl:text-lg 6xl:text-xl max-w-[525px] 3xl:max-w-[600px] 6xl:max-w-[700px]">
                  Let's work together to bring your ideas to life. I'm here to help you build a website that grows your
                  business.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/contact" className="btn-primary max-w-max mx-auto sm:mx-0 flex gap-2 group">
                    Get In Touch
                    <MessageCircleDashed
                      size={18}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    />
                  </Link>

                  <Link href="/projects" className="btn-secondary max-w-max mx-auto sm:mx-0 flex gap-2 group">
                    View My Work
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
