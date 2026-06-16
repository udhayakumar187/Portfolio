"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PortalParticles } from "@/components/transitions/PortalParticles";
import type { ActiveThemeTransition } from "@/lib/themeTransition";

type SeasonPortalTransitionProps = {
  transition: ActiveThemeTransition | null;
};

export function SeasonPortalTransition({ transition }: SeasonPortalTransitionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <AnimatePresence>
      {transition ? (
        <motion.div
          key={transition.id}
          className={`pointer-events-none fixed inset-0 z-[120] overflow-hidden season-portal season-portal--${transition.toTheme.portalTransition.type}`}
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.18 : 0.24, ease: "easeOut" }}
          style={{
            background: `radial-gradient(circle at 50% 52%, ${transition.toTheme.portalTransition.colors[0]}55, transparent 24%), linear-gradient(135deg, ${transition.fromTheme.scene.background}ee, ${transition.toTheme.scene.background}f5 58%, var(--background))`
          }}
        >
          <span className="sr-only">Changing journey theme to {transition.toTheme.name}</span>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: prefersReducedMotion ? 0.42 : 0.92 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : transition.durationMs / 1000 }}
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 0 16%, ${transition.toTheme.portalTransition.colors[1]}44 17% 18%, transparent 24%), conic-gradient(from 0deg, transparent, ${transition.toTheme.portalTransition.colors[1]}44, ${transition.toTheme.portalTransition.colors[2]}33, transparent)`
            }}
          />
          {!prefersReducedMotion ? (
            <>
              <PortalParticles
                colors={transition.toTheme.portalTransition.colors}
                duration={transition.durationMs / 1000}
                particleType={transition.toTheme.portalTransition.particleType}
                reducedMotion={prefersReducedMotion}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[44vmin] w-[44vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{ opacity: [0, 0.82, 0.3], scale: [0.3, 1.32, 2.7], rotate: 220 }}
                exit={{ opacity: 0, scale: 3 }}
                transition={{ duration: transition.durationMs / 1000, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  boxShadow: `0 0 70px ${transition.toTheme.portalTransition.colors[1]}88, inset 0 0 50px ${transition.toTheme.portalTransition.colors[0]}44`
                }}
              />
              <motion.div
                className="absolute inset-x-0 top-1/2 h-28 -translate-y-1/2 blur-2xl"
                initial={{ opacity: 0, scaleX: 0.4 }}
                animate={{ opacity: [0, 0.38, 0], scaleX: [0.4, 1.18, 1.45] }}
                transition={{ duration: transition.durationMs / 1000, ease: "easeInOut" }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${transition.toTheme.portalTransition.colors[1]}66, transparent)`
                }}
              />
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
