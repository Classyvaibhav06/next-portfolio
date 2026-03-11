"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface Project {
  title: string;
  description: string;
  icon: string;
  category: string;
  categoryLabel: string;
  stars: number;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Flying Modi Game",
    description:
      "Trending flying Modi game recreated with JavaScript. Fun browser-based game with smooth animations and interactive gameplay mechanics.",
    icon: "🎮",
    category: "web",
    categoryLabel: "GAME",
    stars: 2,
    tags: ["JavaScript", "HTML5", "Canvas", "Game Dev"],
    demoUrl: "https://modi-flyin.netlify.app/",
    imageUrl: "/brave_screenshot_modi-flyin.netlify.app.png",
    featured: true,
  },
  {
    title: "DSA with C++",
    description: "Daily DSA practice repository with C++ solutions and algorithms",
    icon: "💻",
    category: "oss",
    categoryLabel: "OSS",
    stars: 2,
    tags: ["C++", "Algorithms"],
    repoUrl: "https://github.com/Classyvaibhav06/dsa-with-cpp",
  },
  {
    title: "Notification Popup",
    description: "Clean and modern notification popup component",
    icon: "🔔",
    category: "web",
    categoryLabel: "UI/UX",
    stars: 1,
    tags: ["HTML", "CSS"],
    demoUrl: "https://github.com/Classyvaibhav06/notification_popup",
    repoUrl: "https://github.com/Classyvaibhav06/notification_popup",
  },
  {
    title: "Git Project Tools",
    description: "Git utilities and helper tools for developers",
    icon: "🔧",
    category: "web",
    categoryLabel: "WEB APP",
    stars: 1,
    tags: ["JavaScript", "Git"],
    repoUrl: "https://github.com/Classyvaibhav06/git-",
  },
  {
    title: "ST2 Project",
    description: "Web development project with modern HTML/CSS",
    icon: "🌐",
    category: "web",
    categoryLabel: "WEB",
    stars: 1,
    tags: ["HTML", "CSS"],
    demoUrl: "https://github.com/Classyvaibhav06/st2",
    repoUrl: "https://github.com/Classyvaibhav06/st2",
  },
  {
    title: "ST3 Project",
    description: "Another web development experiment",
    icon: "⚡",
    category: "web",
    categoryLabel: "WEB",
    stars: 1,
    tags: ["HTML", "JavaScript"],
    repoUrl: "https://github.com/Classyvaibhav06/st3",
  },
];

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
        <ScrollReveal variant="power-surge" duration={900}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-center">
            Featured <span className="text-yellow-400">Projects</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={150}>
          <p className="text-neutral-400 text-center mb-6 sm:mb-8 font-mono text-xs sm:text-sm">
            {"//"} Hover for details
          </p>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal variant="cyber-slide" delay={250}>
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

        <ScrollReveal variant="fade-up" duration={900} delay={350}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className={`project-card bg-neutral-900 rounded-md overflow-hidden group relative ${
                project.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className="frame-corner top-left" />
              <div className="frame-corner top-right" />
              <div className="frame-corner bottom-left" />
              <div className="frame-corner bottom-right" />

              <div
                className={`${
                  project.featured ? "aspect-video" : "aspect-video"
                } bg-gradient-to-br from-yellow-400/20 to-neutral-900 flex items-center justify-center relative overflow-hidden`}
              >
                <div className={`${project.featured ? "text-8xl" : "text-6xl"} opacity-20`}>
                  {project.icon}
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 sm:gap-4">
                  {project.imageUrl && (
                    <img
                      className="w-full z-[-1] absolute h-full object-cover"
                      src={project.imageUrl}
                      alt={project.title}
                    />
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-4 py-2 bg-yellow-400 text-black rounded text-sm font-semibold hover:bg-yellow-500 transition-all z-10"
                    >
                      {project.repoUrl && project.demoUrl !== project.repoUrl
                        ? "View Demo"
                        : "Demo"}
                    </a>
                  )}
                  {project.repoUrl && project.repoUrl !== project.demoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border border-yellow-400 text-yellow-400 rounded text-sm font-semibold z-10"
                    >
                      Code
                    </a>
                  )}
                  {!project.demoUrl && project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-yellow-400 text-black rounded text-sm font-semibold z-10"
                    >
                      View Repo
                    </a>
                  )}
                </div>
              </div>

              <div className={project.featured ? "p-6" : "p-4"}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    ★ {project.stars}
                  </span>
                </div>
                <h3
                  className={`${
                    project.featured ? "text-2xl" : "text-xl"
                  } font-bold mb-2 group-hover:text-yellow-400 transition-colors`}
                >
                  {project.title}
                </h3>
                <p className={`text-neutral-400 ${project.featured ? "mb-4" : "text-sm mb-3"}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-800 text-yellow-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
