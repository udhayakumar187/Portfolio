"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";
import { AvatarFigure } from "@/components/seasonal/transports/AvatarFigure";
import { progressVelocity } from "@/components/seasonal/transports/transport-utils";

type BicycleTransportProps = {
  theme: ThemeConfig;
  progressRef: { current: number };
  reducedMotion: boolean;
};

export function BicycleTransport({ theme, progressRef, reducedMotion }: BicycleTransportProps) {
  const bikeRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Mesh[]>([]);
  const previousProgressRef = useRef(0);
  const motionRef = useRef(0);
  const phaseRef = useRef(0);

  useFrame((_, delta) => {
    const bike = bikeRef.current;
    if (!bike) {
      return;
    }

    const velocity = progressVelocity(progressRef, previousProgressRef, delta);
    const motionTarget = !reducedMotion && velocity > 0.004 ? 1 : 0;
    motionRef.current = THREE.MathUtils.damp(motionRef.current, motionTarget, 7, delta);
    const motion = motionRef.current;

    if (reducedMotion) {
      bike.position.y = 0;
      bike.rotation.set(0, 0, 0);
      return;
    }

    phaseRef.current += delta * THREE.MathUtils.lerp(1.4, 6.4, motion);
    bike.position.y = Math.sin(phaseRef.current * 1.1) * 0.025 * motion;
    bike.rotation.z = Math.sin(phaseRef.current * 0.8) * 0.025 * motion;
    wheelRefs.current.forEach((wheel) => {
      wheel.rotation.x -= delta * THREE.MathUtils.lerp(0.4, 8.5, motion);
    });
  });

  return (
    <group ref={bikeRef}>
      <group position={[0, 0.28, 0]}>
        {[-0.48, 0.48].map((z, index) => (
          <mesh
            key={`bike-wheel-${index}`}
            ref={(node) => {
              if (node) {
                wheelRefs.current[index] = node;
              }
            }}
            castShadow
            position={[0, 0.18, z]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <torusGeometry args={[0.24, 0.018, 8, 28]} />
            <meshStandardMaterial color="#17211c" roughness={0.58} metalness={0.12} />
          </mesh>
        ))}
        <Line
          points={[
            [0, 0.18, -0.48],
            [0, 0.58, -0.05],
            [0, 0.18, 0.48],
            [0, 0.5, 0.25],
            [0, 0.58, -0.05],
            [0, 0.5, 0.25],
            [0, 0.18, -0.48]
          ]}
          color={theme.scene.accent}
          lineWidth={2}
        />
        <mesh castShadow position={[0, 0.66, -0.08]}>
          <boxGeometry args={[0.22, 0.055, 0.16]} />
          <meshStandardMaterial color="#263124" roughness={0.72} />
        </mesh>
        <mesh castShadow position={[0, 0.72, 0.35]} rotation={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.02, 0.48, 6]} />
          <meshStandardMaterial color="#23352c" roughness={0.64} metalness={0.1} />
        </mesh>
        <mesh castShadow position={[0, 0.9, 0.5]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.016, 0.016, 0.48, 6]} />
          <meshStandardMaterial color="#23352c" roughness={0.64} metalness={0.1} />
        </mesh>
      </group>
      <group position={[0, 0.96, -0.05]} rotation={[-0.05, 0, 0]}>
        <AvatarFigure scale={0.34} />
      </group>
      <pointLight position={[-0.18, 0.68, 0.34]} color={theme.scene.campLight} intensity={0.48} distance={2.1} />
    </group>
  );
}
