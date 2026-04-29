"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "@/data/projects";
import Link from "next/link";
import { Star } from "lucide-react";

const filters = [
  { label: "All", value: "all" },
  { label: "Web Apps", value: "web" },
  { label: "UI/UX", value: "ui" },
  { label: "Open Source", value: "oss" },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <section id="projects" className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="stitch-reveal" duration={1000}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-center">
            Featured <span className="text-yellow-400">Projects</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="minimal-reveal" delay={150}>
          <p className="text-neutral-400 text-center mb-6 sm:mb-8 font-mono text-xs sm:text-sm">
            {"//"} Click for details
          </p>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal variant="minimal-reveal" delay={250}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors ${
                activeFilter === f.value
                  ? "bg-yellow-400 text-black"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        </ScrollReveal>

        <ScrollReveal variant="stitch-reveal" duration={1000} delay={350} stagger={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className={`project-card bg-neutral-900 rounded-md overflow-hidden group relative cursor-pointer block ${
                  project.featured ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                {/* Frame Corners - Achievement Style */}
                {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => {
                  const translate = {
                    "top-left": "translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
                    "top-right": "-translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
                    "bottom-left": "translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
                    "bottom-right": "-translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0",
                  }[pos as "top-left" | "top-right" | "bottom-left" | "bottom-right"];
                  return (
                    <div
                      key={pos}
                      className={`frame-corner ${pos} opacity-0 ${translate} group-hover:opacity-100 transition-all duration-300 z-20`}
                    />
                  );
                })}

                <div
                  className={`${
                    project.featured ? "aspect-video" : "aspect-video"
                  } bg-gradient-to-br from-yellow-400/20 to-neutral-900 flex items-center justify-center relative overflow-hidden transition-colors duration-300 group-hover:bg-neutral-800`}
                >
                  {/* Decorative Blob */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-500" />
                  
                  <div className={`${project.featured ? "text-8xl" : "text-6xl"} opacity-20 transition-all duration-500 group-hover:rotate-[360deg] group-hover:opacity-40 group-hover:scale-110 flex items-center justify-center`}>
                    <Icon size={project.featured ? 80 : 48} className="text-yellow-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 sm:gap-4 z-10">
                    {project.imageUrl && (
                      <img
                        className="w-full z-[-1] absolute h-full object-cover"
                        src={project.imageUrl}
                        alt={project.title}
                      />
                    )}
                    <span className="px-4 py-2 bg-yellow-400 text-black rounded text-sm font-bold uppercase tracking-wider scale-90 group-hover:scale-100 transition-all duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                <div className={project.featured ? "p-6" : "p-4"}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-yellow-400/10 text-yellow-400/60 rounded border border-yellow-400/20 group-hover:bg-yellow-400/20 group-hover:text-yellow-400 group-hover:border-yellow-400/40 transition-all">
                      {project.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-500 font-mono group-hover:text-yellow-400/60 transition-colors">
                      <Star size={10} /> {project.stars}
                    </span>
                  </div>
                  <h3
                    className={`${
                      project.featured ? "text-2xl" : "text-xl"
                    } font-bold mb-2 group-hover:text-yellow-400 transition-colors`}
                  >
                    {project.title}
                  </h3>
                  <p className={`text-neutral-400 transition-colors group-hover:text-neutral-300 ${project.featured ? "mb-4" : "text-sm mb-3"}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800 group-hover:border-yellow-400/20 transition-colors">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-neutral-800 text-neutral-500 text-[10px] rounded font-mono group-hover:text-yellow-400/80 group-hover:bg-yellow-400/5 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}

