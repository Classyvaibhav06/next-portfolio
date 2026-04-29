"use client";

import { useParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronLeft, Globe, GitHub as Github, Star, Zap, Code2, Award } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push("/#projects")}
            className="text-yellow-400 flex items-center gap-2 mx-auto hover:underline"
          >
            <ChevronLeft size={20} /> Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const Icon = project.icon;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black pb-20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="matrix-decode">
            <div className="flex items-center gap-3 text-yellow-400 font-mono text-xs mb-6 uppercase tracking-[0.3em]">
              <span className="px-2 py-0.5 border border-yellow-400/30 rounded">{project.categoryLabel}</span>
              <span className="flex items-center gap-1">
                <Star size={12} fill="currentColor" /> {project.stars} Stars
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="hologram" delay={200}>
            <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-none">
              {project.title}
              {project.subtitle && (
                <span className="block text-2xl sm:text-3xl text-neutral-500 font-normal mt-2">
                  {project.subtitle}
                </span>
              )}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={400}>
            <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed mb-12">
              {project.fullDescription}
            </p>
          </ScrollReveal>

          {project.imageUrl && (
            <ScrollReveal variant="minimal-reveal" delay={600} className="relative group rounded-xl overflow-hidden border border-neutral-800 aspect-video mb-20 shadow-[0_0_50px_rgba(250,204,21,0.05)]">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
               <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </ScrollReveal>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              {/* Achievements/Features */}
              {project.achievements && (
                <section>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Award className="text-yellow-400" /> Key Achievements
                  </h2>
                  <div className="space-y-6">
                    {project.achievements.map((achievement, idx) => (
                      <ScrollReveal key={idx} variant="stitch-reveal" delay={idx * 100}>
                        <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg group hover:border-yellow-400/30 transition-colors">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                            {achievement.title}
                          </h3>
                          <p className="text-neutral-400 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-12">
              {/* Tech Stack */}
              {project.techStack && (
                <section>
                   <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Code2 size={16} /> Technologies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded text-xs border border-neutral-700 hover:border-yellow-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Quick Info */}
              <section className="p-6 border border-neutral-800 rounded-xl bg-gradient-to-br from-neutral-900 to-black">
                <h3 className="text-sm font-bold mb-4 text-yellow-400 uppercase tracking-wider">Project Intel</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status</span>
                    <span className="text-green-400">● Live</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Tier</span>
                    <span className="text-neutral-200">Legendary</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Type</span>
                    <span className="text-neutral-200">{project.categoryLabel}</span>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-neutral-800">
                   {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-lg hover:bg-yellow-400 transition-all mb-3"
                      >
                        <Globe size={18} /> Launch Project
                      </a>
                   )}
                   {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-800 text-white font-bold rounded-lg hover:bg-neutral-700 transition-all"
                      >
                        <Github size={18} /> Source Code
                      </a>
                   )}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
