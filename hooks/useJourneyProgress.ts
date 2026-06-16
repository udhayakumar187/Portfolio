"use client";

import { useEffect, useState } from "react";
import { useJourneyMotion } from "@/components/MotionProvider";
import { useActiveSection, type ActiveSectionId } from "@/hooks/useActiveSection";
import { clamp01 } from "@/lib/animation";

export type JourneyProgressSnapshot = {
  progress: number;
  activeSection: ActiveSectionId;
  activeStop: number;
};

export function useJourneyProgress() {
  const { progressRef, activeStop } = useJourneyMotion();
  const activeSection = useActiveSection();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let previousProgress = -1;

    const syncProgress = () => {
      const nextProgress = clamp01(progressRef.current);

      if (Math.abs(nextProgress - previousProgress) > 0.012) {
        previousProgress = nextProgress;
        setProgress(nextProgress);
      }

      frame = window.requestAnimationFrame(syncProgress);
    };

    frame = window.requestAnimationFrame(syncProgress);

    return () => window.cancelAnimationFrame(frame);
  }, [progressRef]);

  return {
    progress,
    activeSection,
    activeStop
  } satisfies JourneyProgressSnapshot;
}
