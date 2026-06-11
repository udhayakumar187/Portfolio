"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import type * as THREE from "three";

type AvatarFigureProps = {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
};

export function AvatarFigure({ scale = 0.42, position = [0, 0, 0], rotation = [0, 0, 0] }: AvatarFigureProps) {
  const { scene } = useGLTF("/models/ukm-avatar.glb");
  const avatar = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    avatar.traverse((child) => {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [avatar]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={avatar} />
    </group>
  );
}

useGLTF.preload("/models/ukm-avatar.glb");
