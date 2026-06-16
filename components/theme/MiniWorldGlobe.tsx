"use client";

import { GlobePreviewScene } from "@/components/theme/GlobePreviewScene";
import type { ThemeConfig } from "@/data/themes";

type MiniWorldGlobeProps = {
  theme: ThemeConfig;
  reducedMotion: boolean;
};

export function MiniWorldGlobe({ theme, reducedMotion }: MiniWorldGlobeProps) {
  return (
    <div className={reducedMotion ? "mini-world-globe mini-world-globe--reduced" : "mini-world-globe"}>
      <div className="mini-world-globe__halo" aria-hidden="true" />
      <div className="mini-world-globe__shell">
        <GlobePreviewScene theme={theme} />
      </div>
      <div className="mini-world-globe__base" aria-hidden="true" />
    </div>
  );
}
