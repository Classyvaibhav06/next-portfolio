"use client";

import { useEffect, useRef, useCallback } from "react";

export default function ShootingStars() {
  const svg1Ref = useRef<SVGSVGElement>(null);
  const svg2Ref = useRef<SVGSVGElement>(null);
  const svg3Ref = useRef<SVGSVGElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const NS = "http://www.w3.org/2000/svg";
    const heroSection = heroRef.current?.parentElement;
    if (!heroSection) return;

    let heroW = heroSection.offsetWidth;
    let heroH = heroSection.offsetHeight;
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        heroW = heroSection.offsetWidth;
        heroH = heroSection.offsetHeight;
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    function getRandomStartPoint() {
      const side = Math.floor(Math.random() * 4);
      const offset = Math.random() * Math.max(heroW, heroH);
      switch (side) {
        case 0: return { x: offset, y: 0, angle: 45 };
        case 1: return { x: heroW, y: offset, angle: 135 };
        case 2: return { x: offset, y: heroH, angle: 225 };
        case 3: return { x: 0, y: offset, angle: 315 };
        default: return { x: 0, y: 0, angle: 45 };
      }
    }

    class ShootingStarLayer {
      svg: SVGSVGElement;
      gradientId: string;
      minSpeed: number;
      maxSpeed: number;
      minDelay: number;
      maxDelay: number;
      starWidth: number;
      starHeight: number;
      star: { x: number; y: number; angle: number; scale: number; speed: number; distance: number } | null;
      rect: SVGRectElement | null;
      waiting: boolean;

      constructor(
        svg: SVGSVGElement,
        gradientId: string,
        options: { minSpeed?: number; maxSpeed?: number; minDelay?: number; maxDelay?: number } = {}
      ) {
        this.svg = svg;
        this.gradientId = gradientId;
        this.minSpeed = options.minSpeed || 10;
        this.maxSpeed = options.maxSpeed || 30;
        this.minDelay = options.minDelay || 1200;
        this.maxDelay = options.maxDelay || 4200;
        this.starWidth = 10;
        this.starHeight = 1;
        this.star = null;
        this.rect = null;
        this.waiting = false;
        this.spawnStar();
      }

      spawnStar() {
        this.waiting = false;
        const { x, y, angle } = getRandomStartPoint();
        this.star = {
          x,
          y,
          angle,
          scale: 1,
          speed: Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed,
          distance: 0,
        };
        if (this.rect?.parentNode) this.rect.parentNode.removeChild(this.rect);
        this.rect = document.createElementNS(NS, "rect");
        this.rect.setAttribute("fill", `url(#${this.gradientId})`);
        this.svg.appendChild(this.rect);
        this.updateRect();
      }

      updateRect() {
        if (!this.rect || !this.star) return;
        const s = this.star;
        const w = this.starWidth * s.scale;
        this.rect.setAttribute("x", String(s.x));
        this.rect.setAttribute("y", String(s.y));
        this.rect.setAttribute("width", String(w));
        this.rect.setAttribute("height", String(this.starHeight));
        this.rect.setAttribute(
          "transform",
          `rotate(${s.angle}, ${s.x + w / 2}, ${s.y + this.starHeight / 2})`
        );
      }

      tick() {
        if (!this.star || this.waiting) return;
        const s = this.star;
        s.x += s.speed * Math.cos((s.angle * Math.PI) / 180);
        s.y += s.speed * Math.sin((s.angle * Math.PI) / 180);
        s.distance += s.speed;
        s.scale = 1 + s.distance / 100;

        if (s.x < -20 || s.x > heroW + 20 || s.y < -20 || s.y > heroH + 20) {
          if (this.rect?.parentNode) this.rect.parentNode.removeChild(this.rect);
          this.star = null;
          this.rect = null;
          this.waiting = true;
          const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
          setTimeout(() => this.spawnStar(), delay);
          return;
        }
        this.updateRect();
      }
    }

    const layers: ShootingStarLayer[] = [];
    if (svg1Ref.current) {
      layers.push(
        new ShootingStarLayer(svg1Ref.current, "star-grad-1", {
          minSpeed: 15,
          maxSpeed: 35,
          minDelay: 1000,
          maxDelay: 3000,
        })
      );
    }
    if (svg2Ref.current) {
      layers.push(
        new ShootingStarLayer(svg2Ref.current, "star-grad-2", {
          minSpeed: 10,
          maxSpeed: 25,
          minDelay: 2000,
          maxDelay: 4000,
        })
      );
    }
    if (svg3Ref.current) {
      layers.push(
        new ShootingStarLayer(svg3Ref.current, "star-grad-3", {
          minSpeed: 20,
          maxSpeed: 40,
          minDelay: 1500,
          maxDelay: 3500,
        })
      );
    }

    let heroVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(heroSection);

    let animId: number;
    function animateAllStars() {
      if (heroVisible) {
        for (let i = 0; i < layers.length; i++) layers[i].tick();
      }
      animId = requestAnimationFrame(animateAllStars);
    }
    animId = requestAnimationFrame(animateAllStars);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={heroRef} className="shooting-stars-bg">
      <div className="radial-glow" />
      <div className="static-stars" />
      <svg ref={svg1Ref} className="shooting-star-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="star-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#2EB9DF", stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: "#9E00FF", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <svg ref={svg2Ref} className="shooting-star-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="star-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FFB800", stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: "#FF0099", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <svg ref={svg3Ref} className="shooting-star-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="star-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#00B8FF", stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: "#00FF9E", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
