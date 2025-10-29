'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// ──────────────────────────────────────────────── Custom FAQ Component */
export const CustomFaq = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const faqRef = useRef(null);
  const contentRef = useRef(null);

  // ─── Close FAQ when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ─── Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      ref={faqRef}
      className={`custom-select border-primary rounded-xl overflow-hidden shadow transition-300 hover:shadow-primary
        ${isOpen ? 'ring-1 ring-cyan-600 dark:ring-cyan-400' : ''}`}
    >
      {/* ─── FAQ Question Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 bg-primary hover:bg-secondary transition-300 flex items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-primary pr-6 4xl:text-lg font-semibold transition-300">{faq.question}</h3>
        <div
          className={`text-tertiary flex-shrink-0 transition-transform duration-300 ease-in-out
          ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <ChevronDown strokeWidth={2.5} className="size-5 4xl:size-5.5" />
        </div>
      </button>

      {/* ─── FAQ Answer */}
      <div
        className={`overflow-hidden bg-secondary border-t border-cyan-500 dark:border-slate-500 transition-500
        ${isOpen ? 'opacity-100' : 'opacity-0 h-0'}`}
        style={{ height: `${contentHeight}px` }}
      >
        <div
          ref={contentRef}
          className={`p-5 transition-300 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
          style={{
            transitionDelay: isOpen ? '150ms' : '0ms',
          }}
        >
          <p className="text-tertiary text-[15px] 4xl:text-base">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};
