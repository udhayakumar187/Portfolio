"use client";

import { ArrowDown, MapPin, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { HeroSystemMap } from "@/components/HeroSystemMap";
import { heroSignals, profile } from "@/data/profile";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32"
    >
      <AnimatedBackground />
      <HeroSystemMap />
      <div className="section-shell relative z-10">
        <motion.div
          className="mx-auto max-w-6xl text-center lg:text-left"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 backdrop-blur">
            <MapPin className="h-4 w-4 text-mint" aria-hidden="true" />
            <span>{profile.location}</span>
            <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
            <span>HealthTech systems engineer</span>
          </div>

          <p className="mb-4 text-base font-semibold text-electric sm:text-lg">{profile.name}</p>
          <h1
            id="hero-title"
            className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.06] text-white sm:text-6xl lg:mx-0 lg:text-7xl"
          >
            <span className="text-gradient">{profile.headline}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl lg:mx-0">
            {profile.subtext}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#experience"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft-glow transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden="true" />
              View Experience
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10"
            >
              <Send className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              Contact Me
            </a>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
            {heroSignals.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: "easeOut" }}
                >
                  <Icon className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
