"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";

export type TerrainReactionVariant = "snow" | "sand" | "grass" | "water" | "spring";

type TerrainReaction = {
  position: THREE.Vector3;
  rotation: number;
  createdAt: number;
  lifetime: number;
  strength: number;
};

type TerrainReactionFieldProps = {
  theme: ThemeConfig;
  variant: TerrainReactionVariant;
  positionRef: MutableRefObject<THREE.Vector3>;
  velocityRef: MutableRefObject<number>;
  maxReactions: number;
};

const matrix = new THREE.Matrix4();
const quaternion = new THREE.Quaternion();
const euler = new THREE.Euler();
const scale = new THREE.Vector3();
const color = new THREE.Color();
const fadeColor = new THREE.Color("#020711");
const direction = new THREE.Vector3();
const emitPosition = new THREE.Vector3();

function createReactionPool(maxReactions: number) {
  return Array.from({ length: maxReactions }, () => ({
    position: new THREE.Vector3(0, -50, 0),
    rotation: 0,
    createdAt: -100000,
    lifetime: 1,
    strength: 0
  }));
}

function reactionGeometry(variant: TerrainReactionVariant) {
  if (variant === "water") {
    return new THREE.RingGeometry(0.12, 0.24, 28);
  }

  if (variant === "grass") {
    return new THREE.PlaneGeometry(0.22, 0.62, 1, 1);
  }

  if (variant === "spring") {
    return new THREE.CircleGeometry(0.2, 6);
  }

  return new THREE.CircleGeometry(0.18, 16);
}

function reactionDistance(variant: TerrainReactionVariant) {
  return variant === "water" ? 0.18 : variant === "grass" ? 0.26 : 0.22;
}

function reactionLifetime(variant: TerrainReactionVariant) {
  return variant === "water" ? 3000 : variant === "spring" ? 3600 : variant === "grass" ? 2700 : 2400;
}

function reactionY(variant: TerrainReactionVariant) {
  return variant === "water" ? -0.008 : 0.012;
}

export function TerrainReactionField({ theme, variant, positionRef, velocityRef, maxReactions }: TerrainReactionFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reactionsRef = useRef<TerrainReaction[]>(createReactionPool(maxReactions));
  const cursorRef = useRef(0);
  const lastPositionRef = useRef(new THREE.Vector3());
  const hasLastPositionRef = useRef(false);
  const geometry = useMemo(() => reactionGeometry(variant), [variant]);

  useEffect(() => {
    reactionsRef.current = createReactionPool(maxReactions);
    cursorRef.current = 0;
    hasLastPositionRef.current = false;
  }, [maxReactions, theme.id, variant]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;

    if (!mesh || maxReactions <= 0) {
      return;
    }

    const currentPosition = positionRef.current;

    if (!hasLastPositionRef.current) {
      lastPositionRef.current.copy(currentPosition);
      hasLastPositionRef.current = true;
    }

    const moved = currentPosition.distanceTo(lastPositionRef.current);
    if (moved > reactionDistance(variant)) {
      direction.copy(currentPosition).sub(lastPositionRef.current);
      if (direction.lengthSq() < 0.0001) {
        direction.set(0, 0, -1);
      } else {
        direction.normalize();
      }

      const reaction = reactionsRef.current[cursorRef.current];
      const rotation = Math.atan2(direction.x, direction.z);
      emitPosition.copy(currentPosition).addScaledVector(direction, variant === "water" ? -0.35 : -0.08);
      emitPosition.y = reactionY(variant);

      reaction.position.copy(emitPosition);
      reaction.rotation = rotation;
      reaction.createdAt = clock.elapsedTime * 1000;
      reaction.lifetime = reactionLifetime(variant);
      reaction.strength = THREE.MathUtils.clamp(0.58 + velocityRef.current * 1.15, 0.42, 1.55);

      cursorRef.current = (cursorRef.current + 1) % maxReactions;
      lastPositionRef.current.copy(currentPosition);
    }

    const now = clock.elapsedTime * 1000;
    reactionsRef.current.forEach((reaction, index) => {
      const age = now - reaction.createdAt;
      const normalizedAge = THREE.MathUtils.clamp(age / reaction.lifetime, 0, 1);
      const fade = age >= 0 && age <= reaction.lifetime ? Math.pow(1 - normalizedAge, 1.4) : 0;
      const grow = variant === "water" ? 0.8 + normalizedAge * 2.2 : variant === "spring" ? 0.65 + normalizedAge * 0.55 : 1;
      const base = (variant === "grass" ? 0.72 : variant === "water" ? 0.9 : 0.44) * reaction.strength * grow * fade;

      euler.set(-Math.PI / 2, 0, -reaction.rotation);
      quaternion.setFromEuler(euler);
      scale.set(variant === "grass" ? base * 0.34 : base, variant === "grass" ? base : base * 0.72, 1);
      matrix.compose(reaction.position, quaternion, scale);
      mesh.setMatrixAt(index, matrix);
      color.set(variant === "spring" ? theme.livingTerrain.accent : theme.livingTerrain.color).lerp(fadeColor, 1 - fade * 0.86);
      mesh.setColorAt(index, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  });

  if (maxReactions <= 0) {
    return null;
  }

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, maxReactions]} frustumCulled={false}>
      <meshBasicMaterial
        color={theme.livingTerrain.color}
        transparent
        opacity={variant === "water" ? 0.2 : variant === "spring" ? 0.28 : 0.24}
        depthWrite={false}
        side={THREE.DoubleSide}
        vertexColors
      />
    </instancedMesh>
  );
}
