"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { stableActiveIndexFromProgress } from "@/lib/animation";

type MotionContextValue = {
  progressRef: MutableRefObject<number>;
  scrollVelocityRef: MutableRefObject<number>;
  normalizedScrollVelocityRef: MutableRefObject<number>;
  activeStop: number;
  prefersReducedMotion: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  progressRef: { current: 0 },
  scrollVelocityRef: { current: 0 },
  normalizedScrollVelocityRef: { current: 0 },
  activeStop: 0,
  prefersReducedMotion: false
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const progressRef = useRef(0);
  const activeStopRef = useRef(0);
  const { velocityRef: scrollVelocityRef, normalizedVelocityRef: normalizedScrollVelocityRef } = useScrollVelocity();
  const [activeStop, setActiveStop] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setPrefersReducedMotion(motionQuery.matches);
    syncMotion();
    motionQuery.addEventListener("change", syncMotion);

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      progressRef.current = nextProgress;
      const nextActiveStop = stableActiveIndexFromProgress(nextProgress, 6, activeStopRef.current);

      if (nextActiveStop !== activeStopRef.current) {
        activeStopRef.current = nextActiveStop;
        setActiveStop(nextActiveStop);
      }
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      motionQuery.removeEventListener("change", syncMotion);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      progressRef,
      scrollVelocityRef,
      normalizedScrollVelocityRef,
      activeStop,
      prefersReducedMotion
    }),
    [activeStop, normalizedScrollVelocityRef, prefersReducedMotion, scrollVelocityRef]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useJourneyMotion() {
  return useContext(MotionContext);
}
