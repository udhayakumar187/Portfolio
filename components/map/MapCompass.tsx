"use client";

import type { ThemeConfig } from "@/data/themes";

type MapCompassProps = {
  progress: number;
  theme: ThemeConfig;
};

export function MapCompass({ progress, theme }: MapCompassProps) {
  return (
    <div
      className="treasure-map__compass"
      style={{
        color: theme.mapStyle.primary,
        transform: `rotate(${progress * 22 - 8}deg)`
      }}
      aria-hidden="true"
    >
      <span />
      <span />
      <i />
    </div>
  );
}
