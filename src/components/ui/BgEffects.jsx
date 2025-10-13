/* ──────────────────────────────────────────────── Expanding Glow Rings. */
export const BgGlowRings = ({ className = '' }) => {
  return (
    <div className={`flex-center ${className}`}>
      {/* Expanding glow rings */}
      <span
        className="absolute size-32 rounded-full bg-cyan-500/30 dark:bg-cyan-400/25 animate-ping"
        style={{ animationDuration: '4s', animationDelay: '0s' }}
      />
      <span
        className="absolute size-48 rounded-full bg-teal-500/25 dark:bg-teal-400/20 animate-ping"
        style={{ animationDuration: '5s', animationDelay: '1s' }}
      />
      <span
        className="absolute size-64 rounded-full bg-cyan-600/20 dark:bg-cyan-300/15 animate-ping"
        style={{ animationDuration: '6s', animationDelay: '2s' }}
      />
      <span
        className="absolute size-80 rounded-full bg-teal-600/15 dark:bg-teal-300/12 animate-ping"
        style={{ animationDuration: '7s', animationDelay: '3s' }}
      />
      {/* Central glow */}
      <span
        className="absolute size-16 rounded-full bg-gradient-to-r from-cyan-500/70 to-teal-500/70 dark:from-cyan-400/60 dark:to-teal-400/60 blur-lg animate-pulse"
        style={{ animationDuration: '3s' }}
      />
    </div>
  );
};

/* ──────────────────────────────────────────────── Radar Circles. */
export const BgRadarCircles = ({ className = '' }) => {
  return (
    <div className={`${className} flex-center`}>
      {/* Enhanced radar sweep */}
      <div
        className="radar-sweep absolute size-48 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 270deg, rgba(6, 182, 212, 0.4) 300deg, rgba(6, 182, 212, 0.25) 330deg, transparent 360deg)',
        }}
      />
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle rounded-full size-1.5 absolute bg-cyan-500/70 dark:bg-cyan-400/60"
          style={{
            '--tx': `${Math.cos((i * Math.PI * 2) / 8) * 120}px`,
            '--ty': `${Math.sin((i * Math.PI * 2) / 8) * 120}px`,
            animationDelay: `${i * 0.75}s`,
          }}
        />
      ))}
      {/* Center glow puls - enhanced visibility */}
      <div className="absolute rounded-full size-4 blur-sm bg-cyan-500/50 dark:bg-cyan-400/40 transition-500" />
    </div>
  );
};
/* ──────────────────────────────────────────────── All Pages Header Bg Effects. */
export const PageBgEffects = () => {
  return (
    <div>
      <BgGlowRings className="hidden md:flex absolute bottom-0 left-0" />
      <BgGlowRings className="hidden md:flex absolute bottom-0 right-0" />

      <BgRadarCircles className="hidden 2xl:flex absolute top-1/2 left-[25%]" />
      <BgRadarCircles className="hidden 2xl:flex absolute top-1/2 right-[25%]" />
    </div>
  );
};

/* ──────────────────────────────────────────────── Not Found Page Bg Effects. */
export const NotFoundBgEffects = () => {
  return (
    <div>
      <BgGlowRings className="hidden sm:flex absolute top-0 left-0" />
      <BgGlowRings className="hidden sm:flex absolute top-0 right-0" />
      <BgGlowRings className="hidden sm:flex absolute bottom-0 left-0" />
      <BgGlowRings className="hidden sm:flex absolute bottom-0 right-0" />
    </div>
  );
};

/* ──────────────────────────────────────────────── Site Header Bg Effects. */
export const HeaderBgEffects = () => {
  return (
    <div>
      {/* Main glow */}
      <span className="absolute size-[15%] bottom-0 left-0 blur-3xl lg:hidden bg-cyan-600/80 dark:bg-cyan-400/60" />

      <div className="hidden sm:block lg:hidden">
        {/* Floating shapes */}
        <span className="absolute top-20 left-18 size-14 rounded-full animate-bounce bg-gradient-to-r from-cyan-500/90 to-teal-500/90 dark:from-cyan-400/80 dark:to-teal-400/80" />
        <span className="absolute size-14 bottom-15 right-18 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 dark:from-teal-400/80 dark:to-cyan-400/80 rounded-md animate-spin [animation-duration:4s]" />

        {/* Orbital elements */}
        <span className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-cyan-600/60 dark:bg-cyan-300/70 rounded-full animate-spin [animation-duration:20s] [transform-origin:0_-140px]" />
        <span className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-teal-600/70 dark:bg-teal-300/80 rounded-full [animation:spin_15s_linear_infinite_reverse] [transform-origin:0_-120px]" />
        <span className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-500/65 dark:bg-cyan-400/75 rounded-full animate-spin [animation-duration:18s] [transform-origin:0_140px]" />
        <span className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-teal-500/75 dark:bg-teal-400/85 rounded-full [animation:spin_22s_linear_infinite_reverse] [transform-origin:0_160px]" />

        {/* Vertical lines */}
        <span className="absolute top-0 right-4 w-0.5 h-28 bg-gradient-to-b from-teal-500/90 via-teal-500/60 to-transparent dark:from-teal-400/80 dark:via-teal-400/50 animate-pulse [animation-delay:0.3s] [animation-duration:2.8s]" />
        <span className="absolute top-0 right-12 w-0.5 h-32 bg-gradient-to-b from-cyan-600/90 via-cyan-600/60 to-transparent dark:from-cyan-400/80 dark:via-cyan-400/50 animate-pulse [animation-delay:0.8s] [animation-duration:3.2s]" />
        <span className="absolute top-0 right-20 w-0.5 h-24 bg-gradient-to-b from-teal-600/90 via-teal-600/60 to-transparent dark:from-teal-400/80 dark:via-teal-400/50 animate-pulse [animation-delay:1.3s] [animation-duration:2.3s]" />
        <span className="absolute top-0 right-28 w-0.5 h-40 bg-gradient-to-b from-cyan-500/90 via-cyan-500/60 to-transparent dark:from-cyan-300/80 dark:via-cyan-300/50 animate-pulse [animation-delay:1.8s] [animation-duration:4.2s]" />
      </div>

      {/* Radar circles */}
      <div className="absolute inset-0 flex-center lg:hidden">
        <span className="absolute size-32 border rounded-full animate-ping border-cyan-500/50 dark:border-cyan-400/40 [animation-duration:3s]" />
        <span className="absolute size-48 border rounded-full animate-ping border-teal-500/40 dark:border-teal-400/35 [animation-duration:4s] [animation-delay:0.5s]" />
        <span className="absolute size-64 border rounded-full animate-ping border-cyan-600/35 dark:border-cyan-300/30 [animation-duration:5s] [animation-delay:1s]" />
        <span className="absolute size-80 border rounded-full animate-ping border-teal-600/30 dark:border-teal-300/25 [animation-duration:6s] [animation-delay:1.5s]" />
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────── Home Section Bg Effects. */
export const HomeBgEffects = () => {
  return (
    <>
      <div className="hidden sm:block">
        {/*  */}
        <div className="size-18 absolute top-24 4xl:top-32 left-[8%] 4xl:left-8 flex-center">
          <span className="absolute size-12 rounded-[20%] border border-cyan-500 dark:border-cyan-400 animate-spin [animation-duration:25s]" />

          <span className="absolute size-7 rounded-[16%] border border-teal-500 dark:border-teal-400 [animation:spin_18s_linear_infinite_reverse]" />
        </div>

        {/*  */}
        <div>
          <div
            className="size-4 absolute top-28 4xl:top-30 right-[8%] lg:top-24 4xl:right-6 bg-gradient-to-br from-teal-500/90 to-cyan-400/90 dark:from-teal-400/80 dark:to-cyan-300/80 rounded-full"
            style={{ animation: 'mercury-drip 4.5s ease-out infinite', animationDelay: '2.2s' }}
          />
          <div
            className="size-6 absolute top-36 lg:top-30 4xl:top-36 right-[12%] 4xl:right-16 bg-gradient-to-r from-cyan-500/80 to-teal-400/80 dark:from-cyan-400/70 dark:to-teal-300/70 rounded-full"
            style={{ animation: 'mercury-drip 3s ease-out infinite', animationDelay: '0.5s' }}
          />
        </div>

        {/*  */}
        <div className="absolute top-[53%] right-[18%] lg:hidden 2xl:block 2xl:right-[47%]">
          <span className="absolute size-8 rounded-full border border-cyan-500/80 dark:border-cyan-200/80 animate-ping [animation-duration:2s]" />

          <span className="absolute size-12 rounded-full border border-teal-500/60 dark:border-teal-200/60 animate-ping [animation-duration:3s] [animation-delay:1.2s]" />
        </div>

        {/*  */}
        <span className="hidden 2xl:block size-[15%] absolute top-[49%] right-[37%] blur-[100px] bg-cyan-600/60 dark:bg-cyan-400/60" />

        {/*  */}
        <div
          className="size-16 absolute top-1/2 left-[8%] lg:top-[85%] lg:left-[88%] 4xl:left-[93%]"
          style={{
            background:
              'linear-gradient(45deg, rgba(20, 184, 166, 0.5) 0%, rgba(20, 184, 166, 0.2) 50%, rgba(6, 182, 212, 0.4) 100%)',
            clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
            animation: 'origami-fold 8s ease-in-out infinite reverse',
            animationDelay: '1s',
          }}
        ></div>

        {/*  */}
        <span className="lg:hidden size-[12%] absolute bottom-0 left-0 blur-3xl bg-cyan-600/80 dark:bg-cyan-400/60" />
        <span className="lg:hidden size-[12%] absolute bottom-0 right-0 blur-3xl bg-cyan-600/80 dark:bg-cyan-400/60" />

        {/*  */}
        <span className="hidden lg:block absolute bottom-10 4xl:bottom-14 left-[9%] 4xl:left-12 size-14 rounded-full animate-bounce bg-gradient-to-r from-cyan-500/90 to-teal-500/90 dark:from-cyan-400/80 dark:to-teal-400/80" />
      </div>
    </>
  );
};
