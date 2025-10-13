import { GoBackArrowTextButton } from '@/components/ui/Button.jsx';
import { NotFoundBgEffects } from '@/components/ui/BgEffects';

export default function NotFound() {
  return (
    <section className="px-6 text-center relative h-screen flex-col-center bg-primary overflow-hidden">
      <NotFoundBgEffects />

      {/* Error Code */}
      <h1 className="text-gradient text-7xl md:text-8xl drop-shadow-md">404</h1>

      {/* Message */}
      <h2 className="mt-3 sm:mt-2 text-[26px] md:text-[34px] text-primary">Oops! This page could not be found.</h2>

      <p className="mt-4 sm:mt-2 text-[15px] md:text-base max-w-[528px] md:max-w-[560px]">
        The page you're looking for might have been moved, deleted, or never existed. Don't worry though - let's get you
        back on track to find what you need!
      </p>

      {/* Button */}
      <div className="mt-7 sm:mt-10">
        <GoBackArrowTextButton />
      </div>
    </section>
  );
}
