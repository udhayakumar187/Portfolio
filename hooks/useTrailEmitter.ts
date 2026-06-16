"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { ThemeConfig, TravelMode } from "@/data/themes";
import { createTrailPool, resolveTrailItemType, trailEmitDistance, type TrailItem } from "@/lib/trailUtils";

type UseTrailEmitterOptions = {
  theme: ThemeConfig;
  travelMode: TravelMode;
  positionRef: MutableRefObject<THREE.Vector3>;
  velocityRef: MutableRefObject<number>;
  reducedMotion: boolean;
  mobileMode: boolean;
  maxItems: number;
};

const hiddenPosition = new THREE.Vector3(0, -50, 0);

export function useTrailEmitter({
  theme,
  travelMode,
  positionRef,
  velocityRef,
  reducedMotion,
  mobileMode,
  maxItems
}: UseTrailEmitterOptions) {
  const itemsRef = useRef<TrailItem[]>(createTrailPool(maxItems));
  const cursorRef = useRef(0);
  const stepSideRef = useRef(1);
  const lastPositionRef = useRef(new THREE.Vector3());
  const hasLastPositionRef = useRef(false);
  const directionRef = useRef(new THREE.Vector3(0, 0, -1));
  const emitPositionRef = useRef(new THREE.Vector3());

  useEffect(() => {
    itemsRef.current = createTrailPool(maxItems);
    cursorRef.current = 0;
    stepSideRef.current = 1;
    hasLastPositionRef.current = false;
  }, [maxItems, theme.id]);

  useFrame(({ clock }) => {
    if (maxItems <= 0) {
      return;
    }

    const currentPosition = positionRef.current;

    if (!hasLastPositionRef.current) {
      lastPositionRef.current.copy(currentPosition);
      hasLastPositionRef.current = true;
      return;
    }

    const distance = currentPosition.distanceTo(lastPositionRef.current);
    const minimumDistance = trailEmitDistance(theme, mobileMode);

    if (distance < minimumDistance && !(reducedMotion && cursorRef.current === 0)) {
      return;
    }

    const now = clock.elapsedTime * 1000;
    const strength = reducedMotion ? 0.28 : THREE.MathUtils.clamp(0.58 + velocityRef.current * 0.88 + distance * 1.6, 0.46, 1.48);
    const item = itemsRef.current[cursorRef.current];

    directionRef.current.copy(currentPosition).sub(lastPositionRef.current);
    if (directionRef.current.lengthSq() < 0.0001) {
      directionRef.current.set(0, 0, -1);
    } else {
      directionRef.current.normalize();
    }

    const rotation = Math.atan2(directionRef.current.x, directionRef.current.z);
    emitPositionRef.current.copy(currentPosition);
    stepSideRef.current *= -1;

    if (theme.trail.type === "boat-wake") {
      emitPositionRef.current.addScaledVector(directionRef.current, -0.5);
      emitPositionRef.current.y = -0.02;
    } else if (theme.trail.type === "petal-trail") {
      emitPositionRef.current.addScaledVector(directionRef.current, -0.22);
      emitPositionRef.current.x += stepSideRef.current * 0.08;
      emitPositionRef.current.y = 0.02;
    } else if (travelMode === "camel") {
      emitPositionRef.current.x += Math.cos(rotation) * stepSideRef.current * 0.2;
      emitPositionRef.current.z -= Math.sin(rotation) * stepSideRef.current * 0.2;
      emitPositionRef.current.y = 0.006;
    } else {
      emitPositionRef.current.x += Math.cos(rotation) * stepSideRef.current * 0.12;
      emitPositionRef.current.z -= Math.sin(rotation) * stepSideRef.current * 0.12;
      emitPositionRef.current.y = 0.006;
    }

    item.position.copy(emitPositionRef.current);
    item.rotation = rotation;
    item.createdAt = now;
    item.lifetime = reducedMotion ? Math.min(theme.trail.lifetimeMs, 2400) : theme.trail.lifetimeMs;
    item.type = resolveTrailItemType(theme);
    item.strength = strength;

    cursorRef.current = (cursorRef.current + 1) % maxItems;
    lastPositionRef.current.copy(currentPosition);
  });

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => item.position.copy(hiddenPosition));
    };
  }, []);

  return itemsRef;
}
