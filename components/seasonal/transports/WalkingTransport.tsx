"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";
import { AvatarFigure } from "@/components/seasonal/transports/AvatarFigure";
import { progressVelocity } from "@/components/seasonal/transports/transport-utils";

type WalkingTransportProps = {
  theme: ThemeConfig;
  progressRef: { current: number };
  reducedMotion: boolean;
};

export function WalkingTransport({ theme, progressRef, reducedMotion }: WalkingTransportProps) {
  const visualRef = useRef<THREE.Group>(null);
  const previousProgressRef = useRef(0);
  const walkFactorRef = useRef(0);
  const phaseRef = useRef(0);

  useFrame((_, delta) => {
    const visual = visualRef.current;
    if (!visual) {
      return;
    }

    const velocity = progressVelocity(progressRef, previousProgressRef, delta);
    const walkTarget = !reducedMotion && velocity > 0.006 ? 1 : 0;
    walkFactorRef.current = THREE.MathUtils.damp(walkFactorRef.current, walkTarget, 8, delta);
    const walkFactor = walkFactorRef.current;

    if (reducedMotion) {
      visual.position.y = 0;
      visual.rotation.set(0, 0, 0);
      return;
    }

    phaseRef.current += delta * THREE.MathUtils.lerp(2.2, 7.2, walkFactor);
    visual.position.y = Math.sin(phaseRef.current) * 0.045 * walkFactor;
    visual.rotation.x = Math.cos(phaseRef.current) * 0.018 * walkFactor;
    visual.rotation.z = Math.sin(phaseRef.current * 0.85) * 0.038 * walkFactor;
  });

  const isWoods = theme.environmentType === "woods";

  return (
    <group ref={visualRef}>
      <AvatarFigure />
      <mesh castShadow position={[0, 0.62, -0.15]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.28, 0.42, 0.12]} />
        <meshStandardMaterial color={isWoods ? "#25331e" : "#273449"} roughness={0.78} />
      </mesh>
      {isWoods ? (
        <mesh castShadow position={[-0.34, 0.52, 0.12]} rotation={[0.24, 0, -0.22]}>
          <cylinderGeometry args={[0.018, 0.026, 1.15, 6]} />
          <meshStandardMaterial color="#6b4a2b" roughness={0.82} />
        </mesh>
      ) : null}
      <mesh castShadow position={[-0.22, 0.42, 0.18]}>
        <sphereGeometry args={[0.075, 10, 8]} />
        <meshStandardMaterial
          color={theme.environmentType === "winter" ? "#ffd98a" : theme.scene.campLight}
          emissive={theme.scene.campLight}
          emissiveIntensity={1.25}
          roughness={0.36}
        />
      </mesh>
      <pointLight position={[-0.24, 0.42, 0.2]} color={theme.scene.campLight} intensity={1.05} distance={2.6} />
      <pointLight position={[0, 0.86, 0.24]} color={theme.scene.accent} intensity={0.34} distance={2.4} />
    </group>
  );
}
