"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";

type SeasonalTerrainProps = {
  theme: ThemeConfig;
  reducedMotion: boolean;
  scrollVelocityRef?: MutableRefObject<number>;
};

function OceanWater({ theme, reducedMotion, scrollVelocityRef }: SeasonalTerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || reducedMotion) {
      return;
    }

    const velocity = scrollVelocityRef?.current ?? 0;
    meshRef.current.position.y = -0.065 + Math.sin(clock.elapsedTime * (0.7 + velocity * 0.5)) * (0.012 + velocity * 0.018);
    meshRef.current.rotation.z = Math.sin(clock.elapsedTime * (0.18 + velocity * 0.16)) * (0.01 + velocity * 0.012);
  });

  if (theme.environmentType !== "ocean") {
    return null;
  }

  return (
    <>
      <mesh ref={meshRef} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.065, -1.2]}>
        <planeGeometry args={[38, 38, 16, 16]} />
        <meshStandardMaterial color={theme.scene.terrain} transparent opacity={0.48} roughness={0.28} metalness={0.08} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.038, 0]}>
        <ringGeometry args={[2.2, 10.8, 72]} />
        <meshBasicMaterial color={theme.scene.pathGlow} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

export function SeasonalTerrain({ theme, reducedMotion, scrollVelocityRef }: SeasonalTerrainProps) {
  const isOcean = theme.environmentType === "ocean";

  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, isOcean ? -0.11 : -0.06, 0]}>
        <planeGeometry args={[34, 34, 16, 16]} />
        <meshStandardMaterial color={theme.scene.terrain} roughness={0.86} metalness={isOcean ? 0.08 : 0.02} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, isOcean ? -0.098 : -0.052, 0]}>
        <planeGeometry args={[34, 34, 16, 16]} />
        <meshStandardMaterial color={theme.scene.terrainOverlay} transparent opacity={isOcean ? 0.24 : 0.13} roughness={0.7} />
      </mesh>
      <OceanWater theme={theme} reducedMotion={reducedMotion} scrollVelocityRef={scrollVelocityRef} />
    </>
  );
}
