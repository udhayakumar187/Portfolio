"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";
import { trailOpacityForAge, type TrailItem } from "@/lib/trailUtils";

type TrailParticlesProps = {
  theme: ThemeConfig;
  itemsRef: MutableRefObject<TrailItem[]>;
  maxParticles: number;
};

const particleColor = new THREE.Color();
const darkColor = new THREE.Color("#030711");

function particleOffset(index: number, phase: number, spread: number) {
  const angle = index * 2.399963 + phase;
  const radius = ((index % 7) / 7) * spread;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(phase + index) * 0.06 + phase * 0.08,
    z: Math.sin(angle) * radius
  };
}

export function TrailParticles({ theme, itemsRef, maxParticles }: TrailParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = Math.max(0, maxParticles);

  useFrame(({ clock }) => {
    if (!pointsRef.current || maxParticles <= 0 || theme.trail.type === "crushed-grass") {
      return;
    }

    const now = clock.elapsedTime * 1000;
    const items = itemsRef.current;
    const spread = theme.trail.type === "boat-wake" ? 0.72 : theme.trail.type === "petal-trail" ? 0.5 : 0.34;
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.getAttribute("position");
    const colorAttribute = geometry.getAttribute("color");
    const positions = positionAttribute.array as Float32Array;
    const colors = colorAttribute.array as Float32Array;

    for (let index = 0; index < maxParticles; index += 1) {
      const item = items[index % items.length];
      const age = now - item.createdAt;
      const opacity = age >= 0 && age <= item.lifetime ? trailOpacityForAge(age, item.lifetime) : 0;
      const phase = THREE.MathUtils.clamp(age / Math.max(1, item.lifetime), 0, 1);
      const offset = particleOffset(index, phase * 3.4, spread * item.strength);
      const itemIndex = index * 3;

      positions[itemIndex] = item.position.x + offset.x;
      positions[itemIndex + 1] = item.position.y + 0.04 + offset.y;
      positions[itemIndex + 2] = item.position.z + offset.z;

      particleColor.set(theme.trail.particleColor).lerp(darkColor, 1 - opacity * 0.9);
      colors[itemIndex] = particleColor.r;
      colors[itemIndex + 1] = particleColor.g;
      colors[itemIndex + 2] = particleColor.b;
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  });

  if (maxParticles <= 0) {
    return null;
  }

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(particleCount * 3), 3]} />
        <bufferAttribute attach="attributes-color" args={[new Float32Array(particleCount * 3), 3]} />
      </bufferGeometry>
      <pointsMaterial size={theme.trail.type === "boat-wake" ? 0.045 : 0.035} transparent opacity={0.52} depthWrite={false} vertexColors />
    </points>
  );
}
