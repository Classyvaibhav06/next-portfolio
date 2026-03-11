"use client";

import { useEffect, useRef } from "react";

const texts = [
  "Web Developer",
  "DSA with C++",
  "Tech Digger",
  "Problem Solver",
  "Open Source Contributor",
];

export default function TypingAnimation() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    function typeText() {
      if (!ref.current) return;
      const currentText = texts[textIndex];

      if (isDeleting) {
        ref.current.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        ref.current.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        timeout = setTimeout(() => {
          isDeleting = true;
          timeout = setTimeout(typeText, 50);
        }, 2000);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      const speed = isDeleting ? 50 : 100;
      timeout = setTimeout(typeText, speed);
    }

    timeout = setTimeout(typeText, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <span ref={ref} />
      <span className="animate-pulse-glow">|</span>
    </>
  );
}
