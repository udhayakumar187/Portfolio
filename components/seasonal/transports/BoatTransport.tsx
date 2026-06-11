"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";
import { AvatarFigure } from "@/components/seasonal/transports/AvatarFigure";
import { progressVelocity } from "@/components/seasonal/transports/transport-utils";

type BoatTransportProps = {
  theme: ThemeConfig;
  progressRef: { current: number };
  reducedMotion: boolean;
};

export function BoatTransport({ theme, progressRef, reducedMotion }: BoatTransportProps) {
  const boatRef = useRef<THREE.Group>(null);
  const previousProgressRef = useRef(0);
  const motionRef = useRef(0);
  const phaseRef = useRef(0);

  useFrame((_, delta) => {
    const boat = boatRef.current;
    if (!boat) {
      return;
    }

    const velocity = progressVelocity(progressRef, previousProgressRef, delta);
    const motionTarget = !reducedMotion && velocity > 0.003 ? 1 : 0.32;
    motionRef.current = THREE.MathUtils.damp(motionRef.current, motionTarget, 4.8, delta);
    const motion = motionRef.current;

    if (reducedMotion) {
      boat.position.y = 0.1;
      boat.rotation.set(0, 0, 0);
      return;
    }

    phaseRef.current += delta * 1.7;
    boat.position.y = 0.1 + Math.sin(phaseRef.current) * 0.05 * motion;
    boat.rotation.x = Math.sin(phaseRef.current * 0.72) * 0.035 * motion;
    boat.rotation.z = Math.cos(phaseRef.current * 0.92) * 0.045 * motion;
  });

  return (
    <group ref={boatRef}>
      <group position={[0, 0.16, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[0.92, 0.28, 1.66]} />
          <meshStandardMaterial color="#6a3f2a" roughness={0.76} metalness={0.02} />
        </mesh>
        <mesh castShadow position={[0, 0.08, 0.92]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.47, 0.36, 5]} />
          <meshStandardMaterial color="#7a4a2e" roughness={0.78} />
        </mesh>
        <mesh castShadow position={[0, 0.08, -0.92]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.47, 0.36, 5]} />
          <meshStandardMaterial color="#4f3226" roughness={0.78} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.58, 0.08, 0.72]} />
          <meshStandardMaterial color="#123847" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, 0.54, -0.16]}>
          <cylinderGeometry args={[0.022, 0.026, 1.35, 6]} />
          <meshStandardMaterial color="#e5fbff" roughness={0.55} />
        </mesh>
        <mesh castShadow position={[0, 0.84, -0.08]} rotation={[0, 0.1, 0]}>
          <coneGeometry args={[0.38, 0.84, 3]} />
          <meshStandardMaterial color={theme.scene.pathCore} roughness={0.52} transparent opacity={0.9} />
        </mesh>
      </group>

      <group position={[0, 0.58, 0.05]}>
        <AvatarFigure scale={0.34} rotation={[0, 0, 0]} />
      </group>

      <Line points={[[-0.28, 0.03, -0.82], [-0.56, 0.02, -1.34], [-0.82, 0.02, -1.84]]} color={theme.scene.pathGlow} lineWidth={1.2} transparent opacity={0.42} />
      <Line points={[[0.28, 0.03, -0.82], [0.56, 0.02, -1.34], [0.82, 0.02, -1.84]]} color={theme.scene.pathGlow} lineWidth={1.2} transparent opacity={0.42} />
      <pointLight position={[0, 0.68, 0.26]} color={theme.scene.campLight} intensity={0.5} distance={2.2} />
    </group>
  );
}
