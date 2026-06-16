"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { AmbientCreatureSetProps } from "@/components/ambient/AmbientCreatures";

function Butterfly({ color, accent, index }: { color: string; accent: string; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const phase = clock.elapsedTime * 0.48 + index * 1.17;
    groupRef.current.position.set(-3.6 + index * 1.2 + Math.sin(phase) * 0.42, 1.1 + Math.sin(phase * 1.8) * 0.42, -4.4 + Math.cos(phase) * 0.9);
    groupRef.current.rotation.y = Math.sin(phase) * 0.44;

    const flap = Math.sin(clock.elapsedTime * 4 + index) * 0.4;
    if (leftWingRef.current && rightWingRef.current) {
      leftWingRef.current.rotation.y = 0.75 + flap;
      rightWingRef.current.rotation.y = -0.75 - flap;
    }
  });

  return (
    <group ref={groupRef} scale={0.24}>
      <mesh ref={leftWingRef} position={[-0.16, 0, 0]} rotation={[0, 0.75, 0]}>
        <circleGeometry args={[0.26, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.48} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={rightWingRef} position={[0.16, 0, 0]} rotation={[0, -0.75, 0]}>
        <circleGeometry args={[0.26, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.26} transparent opacity={0.42} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.05, 0.34, 0.05]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.22} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Bees({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.45) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[4.8, 1.05, -4.7]}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[Math.sin(index) * 0.62, Math.cos(index) * 0.18, index * 0.24]} scale={0.12}>
          <sphereGeometry args={[0.18, 8, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} transparent opacity={0.52} />
        </mesh>
      ))}
    </group>
  );
}

function SmallBird({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.elapsedTime * 0.25;
      groupRef.current.position.set(Math.sin(time) * 5.6, 4.8 + Math.sin(time * 2) * 0.3, -9.8);
    }
  });

  return (
    <group ref={groupRef} scale={0.28}>
      <mesh rotation={[0, 0, 0.65]}>
        <boxGeometry args={[0.52, 0.025, 0.025]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0, 0, -0.65]}>
        <boxGeometry args={[0.52, 0.025, 0.025]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

export function SpringCreatures({ theme, maxCreatures, mobileMode }: AmbientCreatureSetProps) {
  const butterflyCount = mobileMode ? Math.min(3, maxCreatures) : Math.min(6, maxCreatures);

  return (
    <group>
      {Array.from({ length: butterflyCount }, (_, index) => (
        <Butterfly key={index} color={theme.creatures.color} accent={theme.creatures.accent} index={index} />
      ))}
      {maxCreatures > 4 ? <Bees color={theme.creatures.accent} /> : null}
      {maxCreatures > 7 ? <SmallBird color={theme.creatures.color} /> : null}
    </group>
  );
}
