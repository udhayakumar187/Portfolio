"use client";

import { DesertCreatures } from "@/components/ambient/creatures/DesertCreatures";
import { OceanCreatures } from "@/components/ambient/creatures/OceanCreatures";
import { SpringCreatures } from "@/components/ambient/creatures/SpringCreatures";
import { WinterCreatures } from "@/components/ambient/creatures/WinterCreatures";
import { WoodsCreatures } from "@/components/ambient/creatures/WoodsCreatures";
import { experienceFeatures } from "@/data/experienceFeatures";
import { performanceConfig } from "@/data/performanceConfig";
import type { ThemeConfig } from "@/data/themes";

export type AmbientCreatureSetProps = {
  theme: ThemeConfig;
  reducedMotion: boolean;
  mobileMode: boolean;
  maxCreatures: number;
};

type AmbientCreaturesProps = {
  theme: ThemeConfig;
  reducedMotion: boolean;
  mobileMode: boolean;
};

export function AmbientCreatures({ theme, reducedMotion, mobileMode }: AmbientCreaturesProps) {
  const performanceMode = reducedMotion ? "reducedMotion" : mobileMode ? "mobile" : "desktop";
  const budget = performanceConfig[performanceMode];
  const enabled = experienceFeatures.enableAmbientCreatures && budget.enableCreatures;
  const maxCreatures = enabled ? budget.maxCreatures : 0;
  const props = { theme, reducedMotion, mobileMode, maxCreatures };

  if (!enabled || maxCreatures <= 0) {
    return null;
  }

  if (theme.creatures.type === "desert") {
    return <DesertCreatures {...props} />;
  }

  if (theme.creatures.type === "woods") {
    return <WoodsCreatures {...props} />;
  }

  if (theme.creatures.type === "ocean") {
    return <OceanCreatures {...props} />;
  }

  if (theme.creatures.type === "spring") {
    return <SpringCreatures {...props} />;
  }

  return <WinterCreatures {...props} />;
}
