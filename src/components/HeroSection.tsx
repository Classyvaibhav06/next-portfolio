"use client";

import ShootingStars from "./ShootingStars";
import TypingAnimation from "./TypingAnimation";
import ScrollReveal from "./ScrollReveal";
import { Zap, FileText, MessageSquare, Rocket } from "lucide-react";

export default function HeroSection() {

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-0 sm:pt-2 px-4 overflow-hidden"
    >
      <ShootingStars />

      <div className="max-w-7xl mx-auto text-center w-full relative z-10">
        <ScrollReveal variant="minimal-reveal" delay={200}>
          <div className="text-yellow-400 text-xs sm:text-sm font-mono mb-4">
            {"//"} Welcome to my digital realm
          </div>
        </ScrollReveal>

        <ScrollReveal variant="stitch-reveal" delay={400} duration={1000}>
          <h1 className="text-4xl sm:text-7xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>Hi, I&apos;m</span>
            <span
              className="font-pixelify f1 text-yellow-400 name-pattern-effect"
              data-shadow="Vaibhav Ghoshi"
            >
              Vaibhav Ghoshi
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="minimal-reveal" delay={600}>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-400 mb-6 sm:mb-8 font-mono">
            <TypingAnimation />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="minimal-reveal" delay={800}>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Web developer & DSA enthusiast with C++. Curious minded, open for
            collaboration and freelancing in development. Tech digger at heart <Rocket size={20} className="text-white-400 inline-block align-middle ml-1" />
          </p>
        </ScrollReveal>

        <ScrollReveal variant="minimal-reveal" delay={1000}>
          <div className="flex items-center justify-center gap-2 mb-8 sm:mb-12">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse-glow" />
            <span className="text-yellow-400 font-mono text-xs sm:text-sm">
              Status: Available for Hire
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal
          variant="stitch-reveal"
          delay={1200}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center px-4"
        >
          <a href="#projects" className="btn btn-primary">
            <span className="btn-corner tl" />
            <span className="btn-corner tr" />
            <span className="btn-corner bl" />
            <span className="btn-corner br" />
            <span className="btn-label flex items-center gap-2">
              <Zap size={16} /> View My Work
            </span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <span className="btn-corner tl" />
            <span className="btn-corner tr" />
            <span className="btn-corner bl" />
            <span className="btn-corner br" />
            <span className="btn-label flex items-center gap-2">
              <FileText size={16} /> Download CV
            </span>
          </a>
          <a href="#contact" className="btn btn-ghost">
            <span className="btn-corner tl" />
            <span className="btn-corner tr" />
            <span className="btn-corner bl" />
            <span className="btn-corner br" />
            <span className="btn-label flex items-center gap-2">
              <MessageSquare size={16} /> Let&apos;s Connect
            </span>
          </a>
        </ScrollReveal>

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

