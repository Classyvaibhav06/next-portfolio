"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX,
      dotY = mouseY;
    let ringX = mouseX,
      ringY = mouseY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animId = requestAnimationFrame(animate);

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .skill-card, .project-card, .achievement-box"
    );
    const handleEnter = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
    };
    const handleLeave = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
