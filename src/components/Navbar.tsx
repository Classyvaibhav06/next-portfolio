"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const xpBarRef = useRef<HTMLDivElement>(null);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPos =
          (target as HTMLElement).offsetTop - offset;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* XP Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-800 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-yellow-400 font-bold text-base sm:text-lg font-mono">
              LVL <span>24</span>
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-neutral-400">
              Full-Stack Developer
            </div>
          </div>

          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
            <div className="relative h-2 sm:h-3 bg-neutral-800 rounded-full overflow-hidden">
              <div
                ref={xpBarRef}
                className="absolute h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-1000"
                style={{ width: "68%" }}
              />
            </div>
            <div className="text-xs text-neutral-400 mt-1 font-mono text-right">
              3420 / 5000 XP
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <nav className="hidden sm:flex gap-5 lg:gap-7 items-center">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className="bracket-l">«</span>
                  <span className="link-text">{item.label}</span>
                  <span className="bracket-r">»</span>
                  <span className="active-dot" />
                </a>
              ))}
            </nav>

            {/* Avatar Badge */}
            <div className="relative group cursor-pointer inline-flex items-center justify-center">
              <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)] transition-transform duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110 group-active:scale-95 bg-neutral-800">
                <img
                  className="aspect-square h-full w-full object-cover"
                  src="/ezgif.com-gif-maker.gif"
                  alt="vaibhav"
                />
              </div>
              <div className="absolute vaibhav-name top-full right-0 sm:left-1/2 sm:-translate-x-1/2 mt-4 z-50 whitespace-nowrap rounded-md bg-yellow-400 text-black font-black uppercase tracking-widest text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-yellow-500 pointer-events-none opacity-0 -translate-y-[15px] blur-[4px] transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:opacity-100 group-hover:translate-y-[0px] group-hover:blur-none">
                VAIBHAV
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden text-yellow-400 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-16 right-0 bottom-0 w-64 bg-neutral-900 border-l border-yellow-400 z-40 sm:hidden ${
          mobileOpen ? "active" : ""
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link mobile-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              › {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
