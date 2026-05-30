"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** stagger delay step, maps to data-d="1..4" */
  delay?: 1 | 2 | 3 | 4;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
};

/**
 * Scroll-reveal wrapper — mirrors the prototype's IntersectionObserver behaviour:
 * fades + lifts into place once in view, and shows instantly under reduced motion.
 */
export function Reveal({
  children,
  delay,
  className = "",
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setShown(true);
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`.trim()}
      {...(delay ? { "data-d": String(delay) } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}
