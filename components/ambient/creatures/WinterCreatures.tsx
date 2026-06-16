"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { AmbientCreatureSetProps } from "@/components/ambient/AmbientCreatures";

function Owl({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const wingLeftRef = useRef<THREE.Mesh>(null);
  const wingRightRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const time = clock.elapsedTime * 0.22;
    groupRef.current.position.set(Math.sin(time) * 7.5, 5.4 + Math.sin(time * 1.6) * 0.38, -10.5 + Math.cos(time) * 1.1);
    groupRef.current.rotation.y = Math.sin(time) * 0.4;

    if (wingLeftRef.current && wingRightRef.current) {
      const wingBeat = Math.sin(clock.elapsedTime * 2.2) * 0.22;
      wingLeftRef.current.rotation.z = 0.32 + wingBeat;
      wingRightRef.current.rotation.z = -0.32 - wingBeat;
    }
  });

  return (
    <group ref={groupRef} position={[-7, 5.5, -11]} scale={0.42}>
      <mesh>
        <sphereGeometry args={[0.32, 8, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.42} roughness={0.55} transparent opacity={0.72} />
      </mesh>
      <mesh ref={wingLeftRef} position={[-0.38, 0, 0]} rotation={[0, 0, 0.32]}>
        <coneGeometry args={[0.18, 0.78, 3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.58} />
      </mesh>
      <mesh ref={wingRightRef} position={[0.38, 0, 0]} rotation={[0, 0, -0.32]}>
        <coneGeometry args={[0.18, 0.78, 3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.58} />
      </mesh>
    </group>
  );
}

function FoxSilhouette({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const drift = Math.sin(clock.elapsedTime * 0.32);
    groupRef.current.position.x = -7.4 + drift * 0.55;
    groupRef.current.rotation.y = 0.48 + drift * 0.08;
  });

  return (
    <group ref={groupRef} position={[-7.4, 0.14, -7.8]} rotation={[0, 0.48, 0]} scale={0.46}>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.48, 8, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.34} transparent opacity={0.36} />
      </mesh>
      <mesh position={[0.52, 0.34, 0.02]}>
        <coneGeometry args={[0.24, 0.42, 4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.34} />
      </mesh>
      <mesh position={[-0.62, 0.36, -0.04]} rotation={[0, 0, -0.82]}>
        <coneGeometry args={[0.18, 0.86, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.38} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

export function WinterCreatures({ theme, maxCreatures }: AmbientCreatureSetProps) {
  if (maxCreatures < 2) {
    return null;
  }

  return (
    <group>
      <Owl color={theme.creatures.color} />
      <FoxSilhouette color={theme.creatures.accent} />
    </group>
  );
}
