import Link from 'next/link';
import { CustomFaq } from './SmallUI.jsx';
import services from '@/data/services.json';
import { ServicesGrid } from '@/components/services/SliderGrid';

export default function MainPageUI() {
  return (
    <main>
      {/* ──────────────────────────────────────────────── Services Grid Section */}
      <section>
        <div className="container pb-20 xl:pb-24">
          <ServicesGrid />
        </div>
      </section>

      {/* ──────────────────────────────────────────────── Services Process Section */}
      <section className="bg-secondary">
        <div className="container py-20">
          {/* ─── Section Header */}
          <div className="text-center mb-10 3xl:mb-14 6xl:mb-16">
            <h2 className="text-gradient-1 mb-2.5 text-4xl">How I Work With You</h2>
            <p>A simple step-by-step process to give you great results</p>
          </div>

          {/* ─── Process Steps Grid */}
          <div className="mx-auto md:max-w-[735px] 2xl:max-w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-10 2xl:gap-6 3xl:gap-10">
            {services.process.map((step, index) => (
              <div key={index}>
                <div className="p-4 bg-primary border-primary rounded-xl shadow hover:shadow-lg transition-300 hover:-translate-y-1 hover:border-transparent">
                  <div className="mb-4 flex items-center">
                    {/* ─── Step Number */}
                    <span className="bg-secondary text-primary flex-center rounded-full shadow size-7 font-bold mr-4">
                      {index + 1}
                    </span>

                    {/* ─── Step Title */}
                    <h3 className="text-xl font-bold text-gradient-1">{step.title}</h3>
                  </div>

                  {/* ─── Step Description */}
                  <p className="text-sm sm:text-[15px]">
                    {step.hasFiverrLink ? (
                      <>
                        Your website work begins after 25% advance payment or through{' '}
                        <a
                          href="https://www.fiverr.com/nawazdev/design-and-develop-responsive-full-stack-websites-for-your-business"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-semibold hover:underline inline-flex"
                        >
                          Fiverr
                        </a>{' '}
                        for secure hiring and peace of mind.
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── Services FAQs Section */}
      <section className="py-20">
        <div className="container 4xl:!px-[1%] 6xl:!px-0">
          {/* ─── Section Header */}
          <div className="text-center mb-10 3xl:mb-14 6xl:mb-16">
            <h2 className="text-gradient-1 mb-2.5 text-4xl">Frequently Asked Questions</h2>
            <p> Find answers to common questions about my web development services</p>
          </div>

          {/* ─── FAQs for small screens (single column) */}
          <div className="mx-auto max-w-[735px] space-y-6 2xl:hidden">
            {services.faqs.map((faq, index) => (
              <CustomFaq key={faq.id} faq={faq} index={index} />
            ))}
          </div>

          {/* ─── FAQs for large screens (two columns) */}
          <div className="hidden 2xl:grid 2xl:grid-cols-2 gap-6 6xl:gap-8">
            {[0, 1].map((colIndex) => (
              <div key={colIndex} className="space-y-6 6xl:space-y-8">
                {services.faqs.slice(colIndex * 7, (colIndex + 1) * 7).map((faq, index) => (
                  <CustomFaq key={faq.id} faq={faq} index={colIndex * 7 + index} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── Call to Action Section */}
      <section className="pb-20 pt-5">
        <div className="container 4xl:!px-[1%] 6xl:!px-0">
          <div className="p-8 mx-auto max-w-[735px] 2xl:max-w-full 2xl:flex 2xl:justify-between 2xl:items-center text-center 2xl:text-left hover:shadow-xl rounded-2xl bg-secondary border-primary transition-300">
            <div>
              <h2 className="text-gradient-1 font-bold text-2xl mb-3">Ready to Build Your Website?</h2>
              <p className="text-[15px] mb-8 2xl:mb-0">
                Let's talk about your project and create the perfect website for your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="btn-primary py-3.5 px-4.5 6xl:text-[15px]">
                Start Your Project
              </Link>
              <Link href="/projects" className="btn-secondary py-3.5 px-4.5 6xl:text-[15px]">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
