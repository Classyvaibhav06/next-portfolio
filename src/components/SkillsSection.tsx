"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

interface SkillData {
  name: string;
  icon: string;
  rank: "gold" | "silver" | "bronze";
  power: number;
  description: string;
}

const skills: SkillData[] = [
  { name: "C++", icon: "⚡", rank: "gold", power: 95, description: "DSA & competitive programming" },
  { name: "JavaScript", icon: "🟨", rank: "gold", power: 92, description: "Modern ES6+ & web development" },
  { name: "React", icon: "⚛️", rank: "silver", power: 88, description: "Component-based architecture" },
  { name: "Node.js", icon: "🟢", rank: "silver", power: 85, description: "Backend & server-side development" },
  { name: "HTML5", icon: "🌐", rank: "gold", power: 95, description: "Semantic markup & accessibility" },
  { name: "Tailwind CSS", icon: "🎨", rank: "gold", power: 90, description: "Utility-first CSS framework" },
  { name: "MongoDB", icon: "🍃", rank: "bronze", power: 80, description: "NoSQL database management" },
  { name: "Bootstrap", icon: "🅱️", rank: "silver", power: 85, description: "Responsive web design" },
];

const rankLabels = { gold: "★ GOLD", silver: "◆ SILVER", bronze: "● BRONZE" };
const rankClasses = { gold: "rank-gold", silver: "rank-silver", bronze: "rank-bronze" };
const barClasses = { gold: "glow-gold", silver: "glow-silver", bronze: "glow-bronze" };
const textClasses = { gold: "text-yellow-400", silver: "text-neutral-300", bronze: "text-amber-500" };

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll<HTMLDivElement>(".bar-fill");
            bars.forEach((bar) => {
              const targetWidth = bar.getAttribute("data-width");
              if (targetWidth) bar.style.width = targetWidth;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll(".skill-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-0 sm:py-0 px-4">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <ScrollReveal variant="stitch-reveal" duration={1000}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-center f1">
            <span className="text-yellow-400">Skill</span> Deck
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="minimal-reveal" delay={200}>
          <p className="text-neutral-400 text-center mb-8 sm:mb-12 font-mono text-xs sm:text-sm">
            {"//"} Hover to reveal pixel glow
          </p>
        </ScrollReveal>

        <ScrollReveal
          variant="stitch-reveal"
          stagger={80}
          delay={300}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card p-5 relative overflow-hidden">
              <div className={`absolute top-3 right-3 rank-badge ${rankClasses[skill.rank]}`}>
                {rankLabels[skill.rank]}
              </div>
              <div className="skill-icon mb-4">{skill.icon}</div>
              <h3 className="text-lg font-bold mb-1 text-white">{skill.name}</h3>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>PWR</span>
                  <span className={textClasses[skill.rank]}>{skill.power}/100</span>
                </div>
                <div className="skill-progress-bar h-2.5">
                  <div
                    className={`bar-fill ${barClasses[skill.rank]}`}
                    data-width={`${skill.power}%`}
                  />
                </div>
              </div>
              <p className="text-xs text-neutral-500">{skill.description}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
