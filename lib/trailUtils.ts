import * as THREE from "three";
import type { ThemeConfig, TrailType } from "@/data/themes";

export type TrailItemType = "snow-footprint" | "camel-print" | "boat-wake" | "grass-press" | "petal-trail";

export type TrailItem = {
  id: number;
  position: THREE.Vector3;
  rotation: number;
  createdAt: number;
  lifetime: number;
  type: TrailItemType;
  strength: number;
};

const itemTypeByTrail: Record<TrailType, TrailItemType> = {
  "snow-footprints": "snow-footprint",
  "camel-prints": "camel-print",
  "boat-wake": "boat-wake",
  "crushed-grass": "grass-press",
  "petal-trail": "petal-trail"
};

export function createTrailPool(maxItems: number): TrailItem[] {
  return Array.from({ length: maxItems }, (_, index) => ({
    id: index,
    position: new THREE.Vector3(0, -50, 0),
    rotation: 0,
    createdAt: -100000,
    lifetime: 1,
    type: "snow-footprint",
    strength: 0
  }));
}

export function resolveTrailItemType(theme: ThemeConfig) {
  return itemTypeByTrail[theme.trail.type];
}

export function trailScaleForType(type: TrailItemType, strength: number) {
  const baseScale =
    type === "boat-wake" ? 1.18 : type === "camel-print" ? 0.34 : type === "grass-press" ? 0.42 : type === "petal-trail" ? 0.34 : 0.22;

  return baseScale * THREE.MathUtils.clamp(strength, 0.55, 1.45);
}

export function trailOpacityForAge(age: number, lifetime: number) {
  const normalizedAge = THREE.MathUtils.clamp(age / Math.max(1, lifetime), 0, 1);
  return Math.pow(1 - normalizedAge, 1.35);
}

export function trailEmitDistance(theme: ThemeConfig, mobileMode: boolean) {
  const baseDistance = theme.trail.type === "boat-wake" ? 0.24 : theme.trail.type === "petal-trail" ? 0.2 : 0.28;

  return mobileMode ? baseDistance * 1.45 : baseDistance;
}
