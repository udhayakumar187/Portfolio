"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/profile";

export function ProjectShowcase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-lines bg-[length:64px_64px] opacity-[0.08]" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold text-electric">Featured Work</p>
            <h2 id="work-title" className="text-3xl font-semibold text-white sm:text-5xl">
              Case-study style snapshots across platforms, messaging, and modernization.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            High-level portfolio summaries that preserve confidentiality while still showing ownership,
            technical scope, and impact.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <motion.article
                key={project.title}
                className="glass-panel group flex min-h-[31rem] flex-col overflow-hidden rounded-lg p-6 transition hover:-translate-y-1 hover:border-electric/45 hover:shadow-violet-glow"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
                whileHover={prefersReducedMotion ? undefined : { rotateX: 1.5, rotateY: -1.5 }}
              >
                <div className="relative mb-8 h-36 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
                  <div className="absolute inset-0 mesh-layer opacity-70" aria-hidden="true" />
                  <svg
                    className="absolute inset-0 h-full w-full opacity-80"
                    viewBox="0 0 420 180"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 122 C98 54 160 138 230 72 C292 14 336 86 392 42"
                      stroke="url(#projectLine)"
                      strokeWidth="2"
                    />
                    <path
                      d="M32 146 C114 104 156 170 226 126 C300 82 338 132 390 96"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1"
                    />
                    <defs>
                      <linearGradient id="projectLine" x1="0" x2="1" y1="0" y2="0">
                        <stop stopColor="#49D3FF" />
                        <stop offset="0.55" stopColor="#8B5CF6" />
                        <stop offset="1" stopColor="#7CF7D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-md border border-white/15 bg-ink/70 text-electric">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold leading-8 text-white">{project.title}</h3>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-electric"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-5 leading-7 text-slate-300">{project.description}</p>
                <p className="mt-5 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-200">
                  <span className="font-semibold text-white">Impact:</span> {project.impact}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
