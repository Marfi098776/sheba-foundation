"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  className,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      queueMicrotask(() => {
        setIsVisible(true);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin]);

  const delayClass =
    delay === 80
      ? "scroll-reveal-delay-1"
      : delay === 160
      ? "scroll-reveal-delay-2"
      : delay === 240
      ? "scroll-reveal-delay-3"
      : delay === 320
      ? "scroll-reveal-delay-4"
      : "";

  return (
    <div
      ref={elementRef}
      className={cn("scroll-reveal", delayClass, isVisible && "is-visible", className)}
    >
      {children}
    </div>
  );
}