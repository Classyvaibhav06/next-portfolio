"use client";

import ShootingStars from "./ShootingStars";
import TypingAnimation from "./TypingAnimation";

export default function HeroSection() {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Vaibhav-Ghoshi-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-0 sm:pt-2 px-4 overflow-hidden"
    >
      <ShootingStars />

      <div className="max-w-7xl mx-auto text-center w-full relative z-10">
        <div
          className="text-yellow-400 text-xs sm:text-sm font-mono mb-4 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          {"//"} Welcome to my digital realm
        </div>

        <h1
          className="text-4xl sm:text-7xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 opacity-0 animate-slide-up leading-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
          style={{ animationDelay: "0.4s" }}
        >
          <span>Hi, I&apos;m</span>
          <span
            className="font-pixelify f1 text-yellow-400 name-pattern-effect"
            data-shadow="Vaibhav Ghoshi"
          >
            Vaibhav Ghoshi
          </span>
        </h1>

        <div
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-400 mb-6 sm:mb-8 font-mono opacity-0 animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <TypingAnimation />
        </div>

        <p
          className="text-sm sm:text-base lg:text-lg text-neutral-400 mb-6 sm:mb-8 max-w-2xl mx-auto opacity-0 animate-slide-up px-4"
          style={{ animationDelay: "0.8s" }}
        >
          Web developer & DSA enthusiast with C++. Curious minded, open for
          collaboration and freelancing in development. Tech digger at heart 🚀
        </p>

        <div
          className="flex items-center justify-center gap-2 mb-8 sm:mb-12 opacity-0 animate-slide-up"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse-glow" />
          <span className="text-yellow-400 font-mono text-xs sm:text-sm">
            Status: Available for Hire
          </span>
        </div>

        <div
          className="flex flex-wrap gap-3 sm:gap-4 justify-center opacity-0 animate-slide-up px-4"
          style={{ animationDelay: "1.2s" }}
        >
          <a href="#projects" className="btn btn-primary">
            <span className="btn-corner tl" />
            <span className="btn-corner tr" />
            <span className="btn-corner bl" />
            <span className="btn-corner br" />
            <span className="btn-label">⚡ View My Work</span>
          </a>
          <button onClick={handleDownloadCV} className="btn btn-outline">
            <span className="btn-corner tl" />
            <span className="btn-corner tr" />
            <span className="btn-corner bl" />
            <span className="btn-corner br" />
            <span className="btn-label">📄 Download CV</span>
          </button>
          <a href="#contact" className="btn btn-ghost">
            <span className="btn-corner tl" />
            <span className="btn-corner tr" />
            <span className="btn-corner bl" />
            <span className="btn-corner br" />
            <span className="btn-label">💬 Let&apos;s Connect</span>
          </a>
        </div>

        <div className="absolute scroll-to transform -translate-x-1/3 animate-bounce-subtle hidden sm:block">
          <div className="text-yellow-400 text-xs sm:text-sm font-mono mb-2">
            Scroll to explore
          </div>
          <svg
            className="w-6 h-6 mx-auto text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
