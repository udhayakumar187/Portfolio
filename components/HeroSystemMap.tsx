"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { label: "Clinical workflows", value: "ECG + virtual care", tone: "text-electric" },
  { label: "Cloud backbone", value: "AWS + messaging", tone: "text-mint" },
  { label: "Engineering loop", value: "AI-assisted delivery", tone: "text-violet-200" }
];

export function HeroSystemMap() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 z-0 mx-auto hidden h-[30rem] max-w-6xl overflow-hidden opacity-80 lg:block"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={prefersReducedMotion ? undefined : { opacity: 0.8, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <div className="absolute inset-x-6 bottom-10 h-56 rounded-lg border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_rgba(73,211,255,0.12)] backdrop-blur-sm sm:inset-x-10 lg:left-auto lg:right-4 lg:w-[38rem]">
        <div className="absolute inset-0 bg-grid-lines bg-[length:42px_42px] opacity-[0.12]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" />
        <div className="absolute inset-y-0 left-1/3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-y-0 left-2/3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute left-6 right-6 top-1/2 h-px bg-gradient-to-r from-electric/0 via-electric/40 to-mint/0" />

        <div className="relative grid h-full grid-cols-1 gap-3 p-4 sm:grid-cols-3">
          {nodes.map((node, index) => (
            <motion.div
              key={node.label}
              className="flex min-h-0 flex-col justify-between rounded-md border border-white/10 bg-ink/55 p-4"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45 + index * 0.1, ease: "easeOut" }}
            >
              <span className={`text-sm font-semibold ${node.tone}`}>{node.label}</span>
              <span className="text-xl font-semibold leading-7 text-white">{node.value}</span>
              <span className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-electric via-violet to-mint"
                  initial={prefersReducedMotion ? false : { x: "-100%" }}
                  animate={prefersReducedMotion ? undefined : { x: "0%" }}
                  transition={{ duration: 0.8, delay: 0.75 + index * 0.12, ease: "easeOut" }}
                />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
