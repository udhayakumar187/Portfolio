"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillClusters } from "@/data/profile";

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-electric">Skills</p>
          <h2 id="skills-title" className="text-3xl font-semibold text-white sm:text-5xl">
            Deep technical range without losing delivery focus.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillClusters.map((cluster, index) => {
            const Icon = cluster.icon;

            return (
              <motion.article
                key={cluster.name}
                className="glass-panel group min-h-72 rounded-lg p-6 transition hover:-translate-y-1 hover:border-electric/45 hover:shadow-soft-glow"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.04, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-electric/10 text-electric transition group-hover:bg-electric group-hover:text-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-white">{cluster.name}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cluster.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-200 transition hover:border-mint/55 hover:bg-mint/10 hover:text-white"
                    >
                      {skill}
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
