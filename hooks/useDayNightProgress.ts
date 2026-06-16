"use client";

import { useMemo } from "react";
import type { MutableRefObject } from "react";
import type { DayNightPhase } from "@/data/dayNightThemes";
import { clamp01 } from "@/lib/animation";

export type DayNightBlend = {
  from: DayNightPhase;
  to: DayNightPhase;
  amount: number;
};

const stops: Array<{ phase: DayNightPhase; at: number }> = [
  { phase: "night", at: 0 },
  { phase: "dawn", at: 0.18 },
  { phase: "morning", at: 0.38 },
  { phase: "goldenHour", at: 0.64 },
  { phase: "cosmic", at: 0.82 },
  { phase: "sunrise", at: 1 }
];

export function resolveDayNightBlend(progress: number): DayNightBlend {
  const safeProgress = clamp01(progress);

  for (let index = 0; index < stops.length - 1; index += 1) {
    const fromStop = stops[index];
    const toStop = stops[index + 1];

    if (safeProgress <= toStop.at) {
      const range = Math.max(0.001, toStop.at - fromStop.at);
      return {
        from: fromStop.phase,
        to: toStop.phase,
        amount: clamp01((safeProgress - fromStop.at) / range)
      };
    }
  }

  return {
    from: "sunrise",
    to: "sunrise",
    amount: 1
  };
}

export function useDayNightProgress(progressRef: MutableRefObject<number>) {
  return useMemo(
    () => ({
      progressRef,
      resolve: () => resolveDayNightBlend(progressRef.current)
    }),
    [progressRef]
  );
}
