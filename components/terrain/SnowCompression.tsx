"use client";

import type { MutableRefObject } from "react";
import * as THREE from "three";
import { TerrainReactionField } from "@/components/terrain/TerrainReactionField";
import type { ThemeConfig } from "@/data/themes";

type SnowCompressionProps = {
  theme: ThemeConfig;
  positionRef: MutableRefObject<THREE.Vector3>;
  velocityRef: MutableRefObject<number>;
  maxReactions: number;
};

export function SnowCompression(props: SnowCompressionProps) {
  return <TerrainReactionField {...props} variant="snow" />;
}
