"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ThemeGlobeSelector } from "@/components/theme/ThemeGlobeSelector";
import { experienceFeatures } from "@/data/experienceFeatures";
import { themeOrder, themes, type ThemeId } from "@/data/themes";

type ThemeSelectorProps = {
  currentThemeId: ThemeId;
  open: boolean;
  canClose: boolean;
  onClose: () => void;
  onSelect: (themeId: ThemeId) => void;
};

export function ThemeSelector({ currentThemeId, open, canClose, onClose, onSelect }: ThemeSelectorProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && canClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canClose, onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] overflow-y-auto bg-ink/94 px-4 py-5 backdrop-blur-2xl sm:px-6 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-selector-title"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="pointer-events-none fixed inset-0 mesh-layer opacity-70" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-[calc(100svh-2.5rem)] w-full max-w-7xl flex-col justify-start py-3 sm:min-h-[calc(100svh-3rem)] sm:justify-center sm:py-0">
            {canClose ? (
              <button
                type="button"
                onClick={onClose}
                className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-white backdrop-blur-xl transition hover:border-electric/60 hover:bg-electric/10 sm:absolute sm:right-0 sm:top-0"
                aria-label="Close theme selector"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}

            <div className="max-w-3xl pr-12 sm:pr-0">
              <p className="mb-3 text-sm font-semibold text-electric">Engineering Journey</p>
              <h1 id="theme-selector-title" className="text-3xl font-semibold text-white sm:text-6xl">
                Choose Your Journey
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
                Explore my engineering journey through a world that matches your mood.
              </p>
            </div>

            {experienceFeatures.enableThemeGlobes ? (
              <ThemeGlobeSelector currentThemeId={currentThemeId} firstButtonRef={firstButtonRef} reducedMotion={Boolean(prefersReducedMotion)} onSelect={onSelect} />
            ) : (
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {themeOrder.map((themeId, index) => {
                  const theme = themes[themeId];
                  const selected = currentThemeId === themeId;

                  return (
                    <motion.button
                      ref={index === 0 ? firstButtonRef : undefined}
                      type="button"
                      key={theme.id}
                      onClick={() => onSelect(theme.id)}
                      className={`theme-card group min-h-[22rem] overflow-hidden rounded-lg p-4 text-left transition hover:-translate-y-1 focus:-translate-y-1 ${
                        selected ? "theme-card-active" : ""
                      }`}
                      aria-label={`Enter ${theme.name} journey`}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.045, ease: "easeOut" }}
                    >
                      <div className={`theme-preview ${theme.previewClass}`} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="relative z-10 mt-5">
                        <h2 className="text-2xl font-semibold text-white">{theme.name}</h2>
                        <p className="mt-3 min-h-24 text-sm leading-6 text-slate-300">{theme.description}</p>
                        <span className="mt-6 inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/[0.06] px-4 text-sm font-semibold text-white transition group-hover:border-electric/60 group-hover:bg-electric/10">
                          Enter Journey
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
