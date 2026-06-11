"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { ParticleType } from "@/data/themes";

type SeasonalParticlesProps = {
  type: ParticleType;
  color: string;
  emissive?: string;
  reducedMotion: boolean;
};

function seededNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123;
  return value - Math.floor(value);
}

function particleCount(type: ParticleType, reducedMotion: boolean) {
  if (reducedMotion) {
    return 0;
  }

  const mobile = typeof window !== "undefined" && window.innerWidth < 720;
  const counts: Record<ParticleType, number> = {
    snow: mobile ? 210 : 500,
    dust: mobile ? 140 : 300,
    fireflies: mobile ? 64 : 140,
    mist: mobile ? 120 : 250,
    petals: mobile ? 120 : 280
  };

  return counts[type];
}

export function SeasonalParticles({ type, color, emissive, reducedMotion }: SeasonalParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = useMemo(() => particleCount(type, reducedMotion), [reducedMotion, type]);

  const { positions, speeds, phases, sizes } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3);
    const nextSpeeds = new Float32Array(count);
    const nextPhases = new Float32Array(count);
    const nextSizes = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      nextPositions[i * 3] = (seededNoise(i * 5 + 1) - 0.5) * 24;
      nextPositions[i * 3 + 1] = seededNoise(i * 5 + 2) * 11 + 1.2;
      nextPositions[i * 3 + 2] = (seededNoise(i * 5 + 3) - 0.5) * 22;
      nextSpeeds[i] = 0.18 + seededNoise(i * 5 + 4) * 0.62;
      nextPhases[i] = seededNoise(i * 5 + 5) * Math.PI * 2;
      nextSizes[i] = 0.65 + seededNoise(i * 5 + 6) * 0.9;
    }

    return { positions: nextPositions, speeds: nextSpeeds, phases: nextPhases, sizes: nextSizes };
  }, [count]);

  useFrame(({ clock }, delta) => {
    const points = pointsRef.current;
    if (!points || count === 0) {
      return;
    }

    const positionAttribute = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = positionAttribute.array as Float32Array;
    const elapsed = clock.elapsedTime;

    for (let i = 0; i < count; i += 1) {
      const xIndex = i * 3;
      const speed = speeds[i] * sizes[i];

      if (type === "fireflies") {
        array[xIndex] += Math.sin(elapsed * 0.7 + phases[i]) * 0.004;
        array[xIndex + 1] += Math.cos(elapsed * 0.8 + phases[i]) * 0.003;
        array[xIndex + 2] += Math.cos(elapsed * 0.5 + phases[i]) * 0.003;
      } else if (type === "dust" || type === "mist") {
        array[xIndex] += (0.015 + Math.sin(elapsed * 0.35 + phases[i]) * 0.004) * sizes[i];
        array[xIndex + 1] += Math.sin(elapsed * 0.45 + phases[i]) * 0.002;
        array[xIndex + 2] += Math.cos(elapsed * 0.4 + phases[i]) * 0.003;
      } else if (type === "petals") {
        array[xIndex] += Math.sin(elapsed * 0.5 + phases[i]) * 0.007;
        array[xIndex + 1] -= speed * delta * 0.55;
        array[xIndex + 2] += (0.006 + Math.cos(elapsed * 0.4 + phases[i]) * 0.004) * sizes[i];
      } else {
        array[xIndex] += Math.sin(elapsed * 0.45 + phases[i]) * 0.0035;
        array[xIndex + 1] -= speed * delta;
        array[xIndex + 2] += Math.cos(elapsed * 0.35 + phases[i]) * 0.0025;
      }

      const shouldResetFall = array[xIndex + 1] < -0.08;
      const shouldResetDrift = array[xIndex] > 12.5 || array[xIndex + 2] > 11.5;

      if (shouldResetFall || shouldResetDrift) {
        const resetSeed = Math.floor(elapsed * 10) + i * 13;
        array[xIndex] = (seededNoise(resetSeed + 1) - 0.5) * 24;
        array[xIndex + 1] = type === "fireflies" ? 0.8 + seededNoise(resetSeed + 2) * 4.5 : 9 + seededNoise(resetSeed + 2) * 5;
        array[xIndex + 2] = (seededNoise(resetSeed + 3) - 0.5) * 22;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  if (count === 0) {
    return null;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={type === "fireflies" ? 0.065 : type === "dust" || type === "mist" ? 0.05 : 0.045}
        color={color}
        sizeAttenuation
        transparent
        opacity={type === "fireflies" ? 0.82 : 0.68}
        depthWrite={false}
        blending={emissive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}
