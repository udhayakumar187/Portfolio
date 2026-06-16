"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { AmbientCreatureSetProps } from "@/components/ambient/AmbientCreatures";

function Deer({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = -0.52 + Math.sin(clock.elapsedTime * 0.5) * 0.08;
    groupRef.current.position.y = 0.12 + Math.sin(clock.elapsedTime * 0.65) * 0.025;
  });

  return (
    <group ref={groupRef} position={[7.2, 0.12, -7.7]} rotation={[0, -0.52, 0]} scale={0.48}>
      <mesh position={[0, 0.48, 0]}>
        <boxGeometry args={[0.82, 0.28, 0.22]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} roughness={0.72} />
      </mesh>
      <mesh position={[0.5, 0.72, 0]}>
        <sphereGeometry args={[0.18, 7, 5]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0.62, 0.94, 0.08]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.04, 0.36, 0.035]} />
        <meshStandardMaterial color={color} transparent opacity={0.28} />
      </mesh>
      <mesh position={[0.62, 0.94, -0.08]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.04, 0.36, 0.035]} />
        <meshStandardMaterial color={color} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function Fireflies({ color, count }: { color: string; count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!pointsRef.current) {
      return;
    }

    const positionAttribute = pointsRef.current.geometry.getAttribute("position");
    const positions = positionAttribute.array as Float32Array;

    for (let index = 0; index < count; index += 1) {
      const base = index * 3;
      const phase = index * 1.37 + clock.elapsedTime * 0.55;
      positions[base] = 3.8 + Math.sin(phase) * (1.1 + (index % 3) * 0.32);
      positions[base + 1] = 1.1 + Math.sin(phase * 1.7) * 0.55;
      positions[base + 2] = -5.4 + Math.cos(phase * 0.9) * (0.9 + (index % 4) * 0.18);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(count * 3), 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.05} transparent opacity={0.72} depthWrite={false} />
    </points>
  );
}

function TreeBirds({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[-6.2, 3.9, -8.6]} scale={0.28}>
      {[0, 1, 2].map((index) => (
        <group key={index} position={[index * 0.75, Math.sin(index) * 0.2, Math.cos(index) * 0.18]}>
          <mesh rotation={[0, 0, 0.7]}>
            <boxGeometry args={[0.52, 0.025, 0.025]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} transparent opacity={0.44} />
          </mesh>
          <mesh rotation={[0, 0, -0.7]}>
            <boxGeometry args={[0.52, 0.025, 0.025]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} transparent opacity={0.44} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function WoodsCreatures({ theme, maxCreatures, mobileMode }: AmbientCreatureSetProps) {
  return (
    <group>
      <Deer color={theme.creatures.color} />
      <Fireflies color={theme.creatures.accent} count={mobileMode ? Math.min(6, maxCreatures) : Math.min(14, maxCreatures)} />
      {maxCreatures > 8 ? <TreeBirds color={theme.creatures.color} /> : null}
    </group>
  );
}
