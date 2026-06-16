"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { AmbientCreatureSetProps } from "@/components/ambient/AmbientCreatures";

function CaravanCamel({ index, color }: { index: number; color: string }) {
  return (
    <group position={[index * 0.92, 0, Math.sin(index) * 0.08]} scale={0.36}>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.22]} />
        <meshStandardMaterial color={color} transparent opacity={0.34} roughness={0.84} />
      </mesh>
      <mesh position={[-0.16, 0.64, 0]}>
        <sphereGeometry args={[0.18, 7, 5]} />
        <meshStandardMaterial color={color} transparent opacity={0.32} />
      </mesh>
      <mesh position={[0.36, 0.64, 0]}>
        <sphereGeometry args={[0.16, 7, 5]} />
        <meshStandardMaterial color={color} transparent opacity={0.32} />
      </mesh>
      <mesh position={[0.55, 0.55, 0]}>
        <boxGeometry args={[0.18, 0.52, 0.16]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Caravan({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.position.x = -8 + ((clock.elapsedTime * 0.18) % 1) * 2.6;
  });

  return (
    <group ref={groupRef} position={[-8, 0.12, -8.8]} rotation={[0, 0.12, 0]}>
      {Array.from({ length: 4 }, (_, index) => (
        <CaravanCamel key={index} index={index} color={color} />
      ))}
    </group>
  );
}

function DesertBird({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const time = clock.elapsedTime * 0.3;
    groupRef.current.position.set(Math.sin(time) * 6.5, 4.2 + Math.sin(time * 2) * 0.22, -9.6 + Math.cos(time) * 0.8);
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.8) * 0.18;
  });

  return (
    <group ref={groupRef} position={[6, 4.2, -9.6]} scale={0.38}>
      <mesh rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.64, 0.035, 0.035]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.64, 0.035, 0.035]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function DustDevil({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = clock.elapsedTime * 0.45;
    groupRef.current.position.x = 6.8 + Math.sin(clock.elapsedTime * 0.23) * 0.5;
  });

  return (
    <group ref={groupRef} position={[6.8, 0.72, -7.2]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.018, 6, 28]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0.7]}>
        <torusGeometry args={[0.25, 0.014, 6, 28]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function DesertCreatures({ theme, maxCreatures }: AmbientCreatureSetProps) {
  return (
    <group>
      <Caravan color={theme.creatures.color} />
      {maxCreatures > 4 ? <DesertBird color={theme.creatures.accent} /> : null}
      {maxCreatures > 6 ? <DustDevil color={theme.creatures.color} /> : null}
    </group>
  );
}
