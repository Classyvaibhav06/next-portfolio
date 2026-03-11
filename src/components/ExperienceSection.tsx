"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

interface Quest {
  title: string;
  company: string;
  period: string;
  status: "active" | "completed";
  xp: string;
  tier: "gold" | "silver" | "bronze";
  icon: string;
  items: string[];
  tags: string[];
  side: "left" | "right";
}

const quests: Quest[] = [
  {
    title: "Senior Full-Stack Developer",
    company: "@ TechCorp Solutions",
    period: "2023 — PRESENT",
    status: "active",
    xp: "+1200 XP",
    tier: "gold",
    icon: "⚡",
    items: [
      "Led team of 5 developers on enterprise platform",
      "Improved performance by 40% through optimization",
      "Architected microservices infrastructure",
    ],
    tags: ["React", "Node.js", "AWS"],
    side: "left",
  },
  {
    title: "Full-Stack Developer",
    company: "@ StartupHub Inc",
    period: "2021 — 2023",
    status: "completed",
    xp: "+900 XP",
    tier: "silver",
    icon: "🚀",
    items: [
      "Built MVP from scratch, gained 10K users",
      "Implemented real-time features with WebSockets",
      "Mentored 3 junior developers",
    ],
    tags: ["Vue.js", "Express", "MongoDB"],
    side: "right",
  },
  {
    title: "Frontend Developer",
    company: "@ Digital Agency Co",
    period: "2019 — 2021",
    status: "completed",
    xp: "+600 XP",
    tier: "bronze",
    icon: "💻",
    items: [
      "Developed 15+ client websites",
      "Specialized in animations and interactions",
      "Achieved 95+ Lighthouse scores",
    ],
    tags: ["React", "GSAP", "Sass"],
    side: "left",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const items = sectionRef.current?.querySelectorAll(".quest-card-wrapper");
    items?.forEach((item, index) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <ScrollReveal variant="matrix-decode" duration={700}>
            <div
              className="inline-block px-4 py-1.5 border border-yellow-400/30 rounded-full text-yellow-400 font-mono text-xs mb-4 tracking-widest"
              style={{ background: "rgba(250,204,21,0.05)" }}
            >
              ⚔️ QUEST LOG
            </div>
          </ScrollReveal>
          <ScrollReveal variant="hologram" duration={1000} delay={100}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 f1">
              The <span className="text-yellow-400">Grind</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={300}>
            <p className="text-neutral-500 font-mono text-xs sm:text-sm">
              {"//"} Level-up timeline &nbsp;|&nbsp;{" "}
              <span className="text-yellow-400">3 quests completed</span>
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline Spine */}
        <div
          className="hidden md:block absolute left-1/2 top-48 bottom-8 w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(250,204,21,0.15) 10%, rgba(250,204,21,0.3) 50%, rgba(250,204,21,0.15) 90%, transparent 100%)",
          }}
        >
          <div className="timeline-pulse-dot" />
        </div>

        {/* Quest Cards */}
        <div className="relative space-y-8 md:space-y-0">
          {quests.map((quest, i) => {
            const isLeft = quest.side === "left";
            const headerClass = `quest-header quest-header-${quest.tier}`;
            const glowClass = `quest-card-glow quest-${quest.tier}`;
            const nodeClass = `quest-node quest-node-${quest.tier}`;
            const isActive = quest.status === "active";

            return (
              <div
                key={i}
                className={`quest-card-wrapper md:flex md:items-center ${
                  isLeft ? "md:mb-20 mb-10" : "md:flex-row-reverse md:mb-20 mb-10"
                }`}
              >
                <div className={isLeft ? "md:w-1/2 md:pr-16 md:text-right" : "md:w-1/2 md:pl-16"}>
                  <div className="quest-card group" style={{ animationDelay: `${0.1 + i * 0.2}s` }}>
                    <div className={glowClass} />
                    <div className="quest-card-inner">
                      <div className={headerClass}>
                        <span className="quest-status">
                          {isActive ? "● ACTIVE" : "✓ COMPLETED"}
                        </span>
                        <span className="quest-xp">{quest.xp}</span>
                      </div>
                      <div className="p-5 sm:p-6">
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                          <span className={`quest-date-badge ${isActive ? "quest-date-active" : ""}`}>
                            {quest.period}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                          {quest.title}
                        </h3>
                        <p className="text-yellow-400/80 font-semibold text-sm mb-4 font-mono">
                          {quest.company}
                        </p>
                        <ul className="text-sm text-neutral-400 space-y-2 mb-5">
                          {quest.items.map((item, j) => (
                            <li
                              key={j}
                              className={`flex items-start gap-2 ${isLeft ? "md:justify-end" : ""}`}
                            >
                              {isLeft ? (
                                <>
                                  <span>{item}</span>
                                  <span className="text-yellow-400 text-xs mt-0.5 shrink-0">▸</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-neutral-500 text-xs mt-0.5 shrink-0">▸</span>
                                  <span>{item}</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                        <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                          {quest.tags.map((tag) => (
                            <span key={tag} className="quest-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={nodeClass}>
                    <span className="text-xl">{quest.icon}</span>
                  </div>
                </div>

                <div className="md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
