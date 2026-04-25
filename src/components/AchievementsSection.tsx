"use client";

import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { Trophy, Zap, GraduationCap, Star, Rocket, Lightbulb, Users, BarChart, LucideIcon } from "lucide-react";

interface Achievement {
  icon: LucideIcon;
  title: string;
  description: string;
  year: string;
}

const achievements: Achievement[] = [
  { icon: Trophy, title: "First Commit", description: "Pushed code to prod", year: "2019" },
  { icon: Zap, title: "100 Day Streak", description: "Committed every day", year: "2022" },
  { icon: GraduationCap, title: "Certified Pro", description: "Solutions Architect", year: "2023" },
  { icon: Star, title: "OSS Hero", description: "500+ contributions", year: "2024" },
  { icon: Rocket, title: "Shipped Prod", description: "10+ Projects launched", year: "2023" },
  { icon: Lightbulb, title: "Innovation", description: "Best hackathon idea", year: "2022" },
  { icon: Users, title: "Team Leader", description: "Managed dev team of 5", year: "2023" },
  { icon: BarChart, title: "Performance", description: "98+ Lighthouse scores", year: "2024" },
];

function AchievementBox({ ach }: { ach: Achievement }) {
  const Icon = ach.icon;
  const corners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;
  
  return (
    <div className="achievement-box group cursor-pointer w-full h-full">
      {/* Frame Corners */}
      {corners.map((pos) => {
        const translateMap = {
          "top-left": "translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
          "top-right": "-translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
          "bottom-left": "translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
          "bottom-right": "-translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
        };
        const translate = translateMap[pos];
        return (
          <div
            key={pos}
            className={`frame-corner ${pos} opacity-0 ${translate} group-hover:opacity-100 transition-all duration-300`}
          />
        );
      })}

      <div className="ach-inner group-hover:bg-[#141414] transition-colors duration-300 relative overflow-hidden h-full flex flex-col">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-500" />
        <div className="ach-icon bg-neutral-900 border border-neutral-800 group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all duration-500 group-hover:rotate-[225deg]">
          <div className="flex items-center justify-center filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 -rotate-[45deg] group-hover:-rotate-[225deg]">
            <Icon size={32} className="text-yellow-400" />
          </div>
        </div>
        <div className="mt-4 text-center z-10 w-full relative">
          <h3 className="font-bold text-xs sm:text-sm text-white font-mono tracking-wide uppercase mb-2 group-hover:text-yellow-400 transition-colors">
            {ach.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-neutral-500 font-mono">{ach.description}</p>
        </div>
        <div className="mt-auto pt-4 w-full flex justify-between items-center border-t border-neutral-800/50 group-hover:border-yellow-400/30 transition-colors duration-300 relative z-10">
          <span className="text-[9px] sm:text-[10px] text-neutral-600 font-mono tracking-widest">
            UNLOCKED
          </span>
          <span className="text-[10px] sm:text-xs text-yellow-400 font-mono opacity-50 group-hover:opacity-100">
            {ach.year}
          </span>
        </div>
      </div>
    </div>
  );
}


export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="achievements" className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <ScrollReveal variant="stitch-reveal" duration={1000}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-center">
            <span className="text-yellow-400">Achievements</span> Unlocked
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="minimal-reveal" delay={200}>
          <p className="text-neutral-400 text-center mb-8 sm:mb-12 font-mono text-xs sm:text-sm">
            {"//"} Click to view details
          </p>
        </ScrollReveal>

        <ScrollReveal
          variant="stitch-reveal"
          stagger={80}
          delay={300}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {achievements.map((ach) => (
            <AchievementBox key={ach.title} ach={ach} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
