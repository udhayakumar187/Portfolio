"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { memo } from "react";
import { questProjects } from "@/data/projects";
import type { QuestProject } from "@/data/projects";

type QuestCardProps = {
  project: QuestProject;
  index: number;
  prefersReducedMotion: boolean | null;
};

const QuestCard = memo(function QuestCard({ project, index, prefersReducedMotion }: QuestCardProps) {
  return (
    <motion.article
      className="quest-card adventure-card group flex min-h-[30rem] flex-col rounded-lg p-6 motion-safe:hover:-translate-y-1"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
    >
      <div className="mb-7 flex items-center justify-between">
        <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1.5 text-xs font-semibold text-electric">
          Route {index + 1}
        </span>
        <ArrowUpRight className="h-5 w-5 text-slate-500 transition-colors group-hover:text-electric" aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-semibold leading-8 text-white">{project.title}</h3>
      <p className="mt-5 leading-7 text-slate-300">{project.description}</p>
      <dl className="mt-6 grid gap-4 text-sm leading-6 text-slate-200">
        <div>
          <dt className="font-semibold text-white">Impact</dt>
          <dd className="mt-1 text-slate-300">{project.impact}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Role</dt>
          <dd className="mt-1 text-slate-300">{project.role}</dd>
        </div>
      </dl>
      <div className="mt-auto flex flex-wrap gap-2 pt-7">
        {project.tech.map((item) => (
          <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
});

export function ProjectQuests() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-electric">Expedition Quests</p>
          <h2 id="work-title" className="text-3xl font-semibold text-white sm:text-5xl">
            Frost-lined mission cards from healthcare, cloud, and modernization work.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {questProjects.map((project, index) => (
            <QuestCard key={project.title} project={project} index={index} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
