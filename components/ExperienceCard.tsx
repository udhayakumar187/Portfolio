"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { JourneyExperience } from "@/data/experiences";

type ExperienceCardProps = {
  experience: JourneyExperience;
  index: number;
  active: boolean;
};

export function ExperienceCard({ experience, index, active }: ExperienceCardProps) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <motion.article
        className={`adventure-card relative overflow-hidden rounded-lg p-6 sm:p-8 ${
          active ? "border-electric/65 shadow-soft-glow" : ""
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 38 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" />
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-mint">{experience.locationTheme}</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">{experience.company}</h3>
            <p className="mt-2 text-lg text-slate-300">{experience.role}</p>
          </div>
          <div className="rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-sm font-medium text-slate-200">
            {experience.duration}
          </div>
        </div>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200">{experience.story}</p>

        <div className="mt-7 flex flex-wrap gap-2">
          {experience.tech.slice(0, 10).map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-slate-200">
              {item}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-electric/50 bg-electric/10 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-electric/20"
        >
          Explore Details
        </button>

        <span className="absolute bottom-5 right-6 text-6xl font-semibold text-white/[0.035]" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.article>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/88 p-4 backdrop-blur-xl sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${experience.id}-modal-title`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setOpen(false);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-3xl rounded-lg border border-white/15 bg-[#07111d] p-6 shadow-2xl sm:p-8"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold text-electric">{experience.locationTheme}</p>
                  <h4 id={`${experience.id}-modal-title`} className="mt-2 text-3xl font-semibold text-white">
                    {experience.role}
                  </h4>
                  <p className="mt-2 text-slate-300">
                    {experience.company} · {experience.duration}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white transition hover:bg-white/10"
                  aria-label="Close details"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-6 leading-8 text-slate-300">{experience.story}</p>
              <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-300">
                {experience.contributions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-2">
                {experience.tech.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
