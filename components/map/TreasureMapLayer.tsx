"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { MapCompass } from "@/components/map/MapCompass";
import { MapCoordinates } from "@/components/map/MapCoordinates";
import { MapRouteLines } from "@/components/map/MapRouteLines";
import { QuestUnlocks } from "@/components/map/QuestUnlocks";
import { useJourneyMotion } from "@/components/MotionProvider";
import { useTheme } from "@/components/ThemeProvider";
import { experienceFeatures } from "@/data/experienceFeatures";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";

export function TreasureMapLayer() {
  const { theme } = useTheme();
  const { prefersReducedMotion } = useJourneyMotion();
  const { progress, activeSection, activeStop } = useJourneyProgress();
  const opacity = useMemo(() => {
    if (progress < 0.04) {
      return 0.18;
    }

    return Math.min(0.54, 0.22 + progress * 0.44);
  }, [progress]);

  if (!experienceFeatures.enableTreasureMap) {
    return null;
  }

  return (
    <div
      className={`treasure-map treasure-map--${theme.mapStyle.type}`}
      style={
        {
          "--map-primary": theme.mapStyle.primary,
          "--map-secondary": theme.mapStyle.secondary,
          "--map-glow": theme.mapStyle.glow,
          opacity
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <MapRouteLines progress={progress} theme={theme} reducedMotion={prefersReducedMotion} />
      <MapCoordinates progress={progress} theme={theme} />
      <QuestUnlocks activeSection={activeSection} activeStop={activeStop} theme={theme} />
      <MapCompass progress={progress} theme={theme} />
    </div>
  );
}
