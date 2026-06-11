"use client";

import { ArrowDown, FileText, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";

export function HeroScene() {
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center pt-28">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/50 to-ink/85 lg:bg-gradient-to-r lg:from-ink/86 lg:via-ink/44 lg:to-transparent"
        aria-hidden="true"
      />
      <div className="section-shell relative z-10">
        <motion.div
          className="max-w-4xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
            <MapPin className="h-4 w-4 text-mint" aria-hidden="true" />
            <span>{profile.location}</span>
            <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
            <span>{theme.name} Base Camp</span>
          </div>

          <p className="mb-4 text-base font-semibold text-electric sm:text-lg">{profile.name}</p>
          <h1 id="hero-title" className="max-w-5xl text-4xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{profile.headline}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Full-stack software technologist building scalable healthcare platforms, distributed systems,
            cloud-native applications, and AI-assisted engineering workflows.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#experience"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft-glow transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden="true" />
              Start Journey
            </a>
            <a
              href="/Resume_udhayaKumar_ind.pdf"
              download
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              View Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-mint/60 hover:bg-mint/10"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
