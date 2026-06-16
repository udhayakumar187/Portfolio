"use client";

import type { MutableRefObject } from "react";
import * as THREE from "three";
import { TerrainReactionField } from "@/components/terrain/TerrainReactionField";
import type { ThemeConfig } from "@/data/themes";

type SpringBloomTrailProps = {
  theme: ThemeConfig;
  positionRef: MutableRefObject<THREE.Vector3>;
  velocityRef: MutableRefObject<number>;
  maxReactions: number;
};

export function SpringBloomTrail(props: SpringBloomTrailProps) {
  return <TerrainReactionField {...props} variant="spring" />;
}
