"use client";

import type { MutableRefObject } from "react";
import * as THREE from "three";
import { GrassBendField } from "@/components/terrain/GrassBendField";
import { SandDisturbance } from "@/components/terrain/SandDisturbance";
import { SnowCompression } from "@/components/terrain/SnowCompression";
import { SpringBloomTrail } from "@/components/terrain/SpringBloomTrail";
import { WaterRipples } from "@/components/terrain/WaterRipples";
import { experienceFeatures } from "@/data/experienceFeatures";
import { performanceConfig } from "@/data/performanceConfig";
import type { ThemeConfig } from "@/data/themes";

type LivingTerrainProps = {
  theme: ThemeConfig;
  positionRef: MutableRefObject<THREE.Vector3>;
  velocityRef: MutableRefObject<number>;
  reducedMotion: boolean;
  mobileMode: boolean;
};

export function LivingTerrain({ theme, positionRef, velocityRef, reducedMotion, mobileMode }: LivingTerrainProps) {
  const performanceMode = reducedMotion ? "reducedMotion" : mobileMode ? "mobile" : "desktop";
  const budget = performanceConfig[performanceMode];
  const enabled = experienceFeatures.enableLivingTerrain && budget.enableLivingTerrain;
  const maxReactions = enabled ? budget.maxTerrainReactions : 0;
  const commonProps = {
    theme,
    positionRef,
    velocityRef,
    maxReactions
  };

  if (!enabled || maxReactions <= 0) {
    return null;
  }

  if (theme.livingTerrain.type === "sand-disturbance") {
    return <SandDisturbance {...commonProps} />;
  }

  if (theme.livingTerrain.type === "grass-bend") {
    return <GrassBendField {...commonProps} />;
  }

  if (theme.livingTerrain.type === "water-ripples") {
    return <WaterRipples {...commonProps} />;
  }

  if (theme.livingTerrain.type === "flower-bloom") {
    return <SpringBloomTrail {...commonProps} />;
  }

  return <SnowCompression {...commonProps} />;
}
