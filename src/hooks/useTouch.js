'use client';

// src/app/hooks/useTouch.jsx

import { useEffect, useCallback, useRef } from 'react';

const useTouchHandler = () => {
  const elementsWithListeners = useRef(new Set());

  // ─── CSS selectors for elements that should have touch functionality
  const defaultSelectors =
    '.nav-links, .btn-primary, .btn-secondary, .bg-primary-card, .bg-secondary-card, .card-animation, .custom-title-text-parent, .project-card';

  // ─── Add 'touch' class when touch or mouse press starts
  const addTouch = useCallback((e) => e.currentTarget.classList.add('touch'), []);

  // ─── Remove 'touch' class when touch or mouse press ends
  const removeTouch = useCallback((e) => e.currentTarget.classList.remove('touch'), []);

  // ─── Safety check to remove 'touch' class if still present
  const checkAndRemove = useCallback((e) => {
    const target = e.currentTarget;
    if (target.classList.contains('touch')) target.classList.remove('touch');
  }, []);

  // ─── Attach touch and mouse event listeners to an element
  const attachListeners = useCallback(
    (el) => {
      if (elementsWithListeners.current.has(el)) return;

      ['touchstart', 'touchend', 'touchcancel'].forEach((event, i) =>
        el.addEventListener(event, i === 0 ? addTouch : removeTouch, { passive: true })
      );

      ['mousedown', 'mouseup', 'mouseleave'].forEach((event, i) =>
        el.addEventListener(event, i === 0 ? addTouch : i === 1 ? removeTouch : checkAndRemove)
      );

      elementsWithListeners.current.add(el);
    },
    [addTouch, removeTouch, checkAndRemove]
  );

  // ─── Remove all event listeners from an element
  const removeListeners = useCallback(
    (el) => {
      if (!elementsWithListeners.current.has(el)) return;

      ['touchstart', 'touchend', 'touchcancel'].forEach((event, i) =>
        el.removeEventListener(event, i === 0 ? addTouch : removeTouch)
      );

      ['mousedown', 'mouseup', 'mouseleave'].forEach((event, i) =>
        el.removeEventListener(event, i === 0 ? addTouch : i === 1 ? removeTouch : checkAndRemove)
      );

      elementsWithListeners.current.delete(el);
    },
    [addTouch, removeTouch, checkAndRemove]
  );

  // ─── Scan DOM for elements matching selectors and attach listeners
  const scan = useCallback(() => {
    if (typeof window === 'undefined') return;
    document.querySelectorAll(defaultSelectors).forEach(attachListeners);
  }, [attachListeners]);

  // ─── Initialize listeners and watch for new elements in DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;

    scan();

    // ─── Watch for new elements being added to DOM
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'childList' && m.addedNodes.length)) scan();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const currentElements = elementsWithListeners.current;

    // ─── Cleanup: remove all listeners when component unmounts
    return () => {
      observer.disconnect();
      Array.from(currentElements).forEach(removeListeners);
    };
  }, [scan, removeListeners]);

  // ─── Return methods for manual control
  return { refresh: scan, addElement: attachListeners, removeElement: removeListeners };
};

export default useTouchHandler;
