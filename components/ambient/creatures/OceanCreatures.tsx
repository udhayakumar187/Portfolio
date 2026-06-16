"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { AmbientCreatureSetProps } from "@/components/ambient/AmbientCreatures";

const matrix = new THREE.Matrix4();
const quaternion = new THREE.Quaternion();
const euler = new THREE.Euler(-Math.PI / 2, 0, 0);
const scale = new THREE.Vector3();
const position = new THREE.Vector3();

function Seagulls({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const time = clock.elapsedTime * 0.34;
    groupRef.current.position.set(Math.sin(time) * 7, 4.6 + Math.sin(time * 1.7) * 0.28, -9.4 + Math.cos(time) * 0.9);
  });

  return (
    <group ref={groupRef} position={[5.5, 4.6, -9.4]} scale={0.34}>
      {[0, 1, 2].map((index) => (
        <group key={index} position={[index * 0.8, Math.sin(index) * 0.18, Math.cos(index) * 0.16]}>
          <mesh rotation={[0, 0, 0.62]}>
            <boxGeometry args={[0.58, 0.025, 0.025]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} transparent opacity={0.48} />
          </mesh>
          <mesh rotation={[0, 0, -0.62]}>
            <boxGeometry args={[0.58, 0.025, 0.025]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} transparent opacity={0.48} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FishShadows({ color, count }: { color: string; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.CircleGeometry(0.18, 12), []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    for (let index = 0; index < count; index += 1) {
      const phase = clock.elapsedTime * 0.28 + index * 1.4;
      const x = -4.8 + ((index * 1.55 + clock.elapsedTime * 0.16) % 9.6);
      const z = -1.2 + Math.sin(phase) * 2.8;
      euler.z = Math.sin(phase) * 0.8;
      quaternion.setFromEuler(euler);
      scale.set(0.7 + (index % 3) * 0.18, 0.18, 1);
      position.set(x, -0.028, z);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(index, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshBasicMaterial color={color} transparent opacity={0.16} depthWrite={false} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function DistantWhale({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = -0.02 + Math.sin(clock.elapsedTime * 0.34) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[-7, -0.02, -7.6]} scale={0.42}>
      <mesh rotation={[-Math.PI / 2, 0, -0.15]}>
        <circleGeometry args={[0.72, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh position={[0.66, 0, 0]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <coneGeometry args={[0.24, 0.6, 3]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function OceanCreatures({ theme, maxCreatures, mobileMode }: AmbientCreatureSetProps) {
  return (
    <group>
      <Seagulls color={theme.creatures.color} />
      <FishShadows color={theme.creatures.accent} count={mobileMode ? Math.min(4, maxCreatures) : Math.min(9, maxCreatures)} />
      {maxCreatures > 10 ? <DistantWhale color={theme.creatures.color} /> : null}
    </group>
  );
}
