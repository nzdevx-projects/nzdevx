'use client';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);

  const text = 'NzDevx.com';
  const letterDelay = 150;
  const pauseAfterComplete = 1200;
  const exitDuration = 1000;

  useEffect(() => {
    let letterTimer;
    let exitTimer;
    let unmountTimer;
    let logoTimer;
    let currentLetter = 0;

    // Show logo first with a slight delay
    logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 200);

    // Start revealing letters after logo appears
    const revealNextLetter = () => {
      if (currentLetter < text.length) {
        setVisibleLetters(currentLetter + 1);
        currentLetter++;
        letterTimer = setTimeout(revealNextLetter, letterDelay);
      } else {
        exitTimer = setTimeout(() => {
          setIsExiting(true);
          unmountTimer = setTimeout(() => {
            setMounted(false);
          }, exitDuration);
        }, pauseAfterComplete);
      }
    };

    // Start letter animation after logo is visible
    setTimeout(revealNextLetter, 600);

    return () => {
      if (letterTimer) clearTimeout(letterTimer);
      if (exitTimer) clearTimeout(exitTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
      if (logoTimer) clearTimeout(logoTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`h-screen fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950 transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Logo with cool entrance effect */}
        <div
          className={`transition-all duration-1000 ${
            logoVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'
          } ${isExiting ? 'animate-logo-exit' : ''}`}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            {/* Animated ring around logo */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 blur-xl transition-all duration-1000 ${
                logoVisible ? 'opacity-30 scale-110' : 'opacity-0 scale-50'
              }`}
            />

            {/* Logo image - Replace with your actual logo path */}
            <img
              src="logo.png"
              alt="Logo"
              className="relative w-full h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Text animation */}
        <div className="relative">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-nunito">
            {text.split('').map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${
                  index < visibleLetters ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                } ${isExiting ? 'animate-letter-exit' : ''}`}
                style={{
                  animationDelay: isExiting ? `${index * 50}ms` : '0ms',
                  background: 'linear-gradient(135deg, #0891b2 0%, #14b8a6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Animated underline */}
          <div
            className={`h-1 bg-gradient-to-r from-cyan-600 to-teal-500 dark:from-cyan-500 dark:to-teal-400 rounded-full mt-2 transition-all duration-700 ${
              visibleLetters === text.length ? 'w-full opacity-100' : 'w-0 opacity-0'
            } ${isExiting ? 'animate-underline-exit' : ''}`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-exit {
          to {
            transform: scale(0.5) rotate(180deg);
            opacity: 0;
          }
        }
        .animate-logo-exit {
          animation: logo-exit 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
