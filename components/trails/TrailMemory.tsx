"use client";

import type { MutableRefObject } from "react";
import * as THREE from "three";
import { TrailDecal } from "@/components/trails/TrailDecal";
import { TrailParticles } from "@/components/trails/TrailParticles";
import { experienceFeatures } from "@/data/experienceFeatures";
import { performanceConfig } from "@/data/performanceConfig";
import type { ThemeConfig } from "@/data/themes";
import { useTrailEmitter } from "@/hooks/useTrailEmitter";

type TrailMemoryProps = {
  theme: ThemeConfig;
  positionRef: MutableRefObject<THREE.Vector3>;
  velocityRef: MutableRefObject<number>;
  reducedMotion: boolean;
  mobileMode: boolean;
};

export function TrailMemory({ theme, positionRef, velocityRef, reducedMotion, mobileMode }: TrailMemoryProps) {
  const performanceMode = reducedMotion ? "reducedMotion" : mobileMode ? "mobile" : "desktop";
  const budget = performanceConfig[performanceMode];
  const maxTrailItems = experienceFeatures.enableTrailMemory ? budget.maxTrailItems : 0;
  const maxTrailParticles = experienceFeatures.enableTrailMemory ? budget.maxTrailParticles : 0;
  const itemsRef = useTrailEmitter({
    theme,
    travelMode: theme.travelMode,
    positionRef,
    velocityRef,
    reducedMotion,
    mobileMode,
    maxItems: maxTrailItems
  });

  if (!experienceFeatures.enableTrailMemory || maxTrailItems <= 0) {
    return null;
  }

  return (
    <group renderOrder={2}>
      <TrailDecal theme={theme} itemsRef={itemsRef} maxItems={maxTrailItems} />
      {!reducedMotion ? <TrailParticles theme={theme} itemsRef={itemsRef} maxParticles={maxTrailParticles} /> : null}
    </group>
  );
}
