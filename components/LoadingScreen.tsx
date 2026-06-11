"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), prefersReducedMotion ? 350 : 1150);
    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-ink"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="loader-snow" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="sr-only">Loading {theme.name.toLowerCase()} engineering journey</span>
          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              className="relative grid h-24 w-24 place-items-center rounded-full border border-white/20 bg-white/[0.045] shadow-soft-glow backdrop-blur-xl"
              initial={prefersReducedMotion ? false : { scale: 0.92, opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                initial={prefersReducedMotion ? false : { rotate: -90 }}
                animate={prefersReducedMotion ? undefined : { rotate: 270 }}
                transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
              >
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(231,250,255,0.1)" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#loaderGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? false : { pathLength: 0 }}
                  animate={prefersReducedMotion ? undefined : { pathLength: 1 }}
                  transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
                />
                <defs>
                  <linearGradient id="loaderGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#E7FAFF" />
                    <stop offset="52%" stopColor="#8EEAFF" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </motion.svg>
              <span className="text-xl font-semibold text-white drop-shadow-[0_0_14px_rgba(142,234,255,0.55)]">
                {profile.initials}
              </span>
            </motion.div>
            <motion.div
              className="h-px w-48 overflow-hidden bg-white/12"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-white via-electric to-violet"
                initial={prefersReducedMotion ? false : { x: "-100%" }}
                animate={prefersReducedMotion ? undefined : { x: "100%" }}
                transition={{ duration: 1.05, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.p
              className="text-sm font-medium text-slate-300"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
            >
              Preparing {theme.name.toLowerCase()} trail...
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
