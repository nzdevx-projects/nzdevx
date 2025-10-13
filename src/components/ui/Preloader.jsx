'use client';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);

  const text = 'NzDevx.com';
  const letterDelay = 150; // ms between each letter
  const pauseAfterComplete = 1200; // ms pause after all letters shown
  const exitDuration = 1000; // ms for exit animation

  useEffect(() => {
    // Prevent any premature removal
    let letterTimer;
    let exitTimer;
    let unmountTimer;
    let currentLetter = 0;

    // Reveal letters one by one
    const revealNextLetter = () => {
      if (currentLetter < text.length) {
        setVisibleLetters(currentLetter + 1);
        currentLetter++;
        letterTimer = setTimeout(revealNextLetter, letterDelay);
      } else {
        // All letters shown, start exit sequence
        exitTimer = setTimeout(() => {
          setIsExiting(true);

          // Unmount after exit animation completes
          unmountTimer = setTimeout(() => {
            setMounted(false);
          }, exitDuration);
        }, pauseAfterComplete);
      }
    };

    // Start the animation
    revealNextLetter();

    // Cleanup
    return () => {
      if (letterTimer) clearTimeout(letterTimer);
      if (exitTimer) clearTimeout(exitTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
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
  );
}
