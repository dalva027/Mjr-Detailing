import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view. Returns a ref to attach and a
 * boolean that flips to true the first time the element intersects the viewport
 * (then stays true — the reveal is one-shot, it won't re-hide on scroll-up).
 *
 * Respects `prefers-reduced-motion`: such users get the revealed state
 * immediately, with no transform animation.
 */
export function useInView<T extends Element = HTMLDivElement>(
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px"
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
