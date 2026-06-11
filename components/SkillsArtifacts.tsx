"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { skillGroups } from "@/data/skills";
import type { SkillGroup } from "@/data/skills";

type SkillArtifactCardProps = {
  group: SkillGroup;
  index: number;
  prefersReducedMotion: boolean | null;
};

const SkillArtifactCard = memo(function SkillArtifactCard({ group, index, prefersReducedMotion }: SkillArtifactCardProps) {
  return (
    <motion.article
      className="skill-card adventure-card group min-h-72 rounded-lg p-6"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.45, delay: index * 0.035, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4">
        <div className="artifact-orb" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-mint">{group.artifact}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{group.category}</h3>
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="relative rounded-full border border-white/15 bg-white/[0.055] px-3 py-2 text-sm text-slate-200 transition-colors hover:border-mint/60 hover:bg-mint/10 hover:text-white"
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.article>
  );
});

export function SkillsArtifacts() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-electric">Skills as Collectibles</p>
          <h2 id="skills-title" className="text-3xl font-semibold text-white sm:text-5xl">
            Frosted artifacts gathered across the trail.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Each crystal marks a practical toolkit used across production healthcare, cloud, frontend,
            distributed systems, testing, and AI engineering work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillArtifactCard key={group.category} group={group} index={index} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
