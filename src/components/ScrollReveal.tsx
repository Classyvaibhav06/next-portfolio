"use client";

import { useEffect, useRef, ReactNode } from "react";
import type { ElementType } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "glitch-in"
  | "hologram"
  | "cyber-slide"
  | "data-stream"
  | "matrix-decode"
  | "power-surge"
  | "warp-in"
  | "scale-rotate"
  | "split-reveal"
  | "stitch-reveal"
  | "glass-reveal"
  | "minimal-reveal";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  stagger?: number; // stagger delay between children
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.15,
  once = true,
  className = "",
  stagger = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply initial state
    el.classList.add("sr-hidden", `sr-${variant}`);
    el.style.setProperty("--sr-delay", `${delay}ms`);
    el.style.setProperty("--sr-duration", `${duration}ms`);

    // If stagger, apply stagger delays to direct children
    if (stagger > 0) {
      const children = el.querySelectorAll(":scope > *");
      children.forEach((child, i) => {
        (child as HTMLElement).style.setProperty(
          "--sr-child-delay",
          `${delay + i * stagger}ms`
        );
        (child as HTMLElement).classList.add("sr-stagger-child");
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("sr-visible");
            el.classList.remove("sr-hidden");
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove("sr-visible");
            el.classList.add("sr-hidden");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, delay, duration, threshold, once, stagger]);

  return (
    <Tag ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </Tag>
  );
}

/* ---- Section Divider with data-stream line ---- */
export function SectionDivider({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("divider-active");
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="section-divider-wrap">
      <div className="section-divider-line" />
      {label && (
        <span className="section-divider-label font-mono">{label}</span>
      )}
      <div className="section-divider-line" />
    </div>
  );
}

/* ---- Parallax floating element ---- */
export function ParallaxFloat({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const viewCenter = window.innerHeight / 2;
          const offset = (center - viewCenter) * speed;
          el.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`parallax-float ${className}`}>
      {children}
    </div>
  );
}

/* ---- Counting number animation ---- */
export function CountUp({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.current) {
            counted.current = true;
            let start = 0;
            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              start = Math.floor(eased * target);
              el.textContent = `${prefix}${start}${suffix}`;
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
