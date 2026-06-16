"use client";

import type { MutableRefObject } from "react";
import * as THREE from "three";
import { TerrainReactionField } from "@/components/terrain/TerrainReactionField";
import type { ThemeConfig } from "@/data/themes";

type SandDisturbanceProps = {
  theme: ThemeConfig;
  positionRef: MutableRefObject<THREE.Vector3>;
  velocityRef: MutableRefObject<number>;
  maxReactions: number;
};

export function SandDisturbance(props: SandDisturbanceProps) {
  return <TerrainReactionField {...props} variant="sand" />;
}
