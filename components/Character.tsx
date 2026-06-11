"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type CharacterProps = {
  positionRef: { current: THREE.Vector3 };
  directionRef: { current: THREE.Vector3 };
  progressRef: { current: number };
  reducedMotion: boolean;
};

const AVATAR_FORWARD_OFFSET = 0;
const AVATAR_SCALE = 0.42;

function dampAngle(current: number, target: number, lambda: number, delta: number) {
  const angleDelta = THREE.MathUtils.euclideanModulo(target - current + Math.PI, Math.PI * 2) - Math.PI;
  return current + angleDelta * (1 - Math.exp(-lambda * delta));
}

export function Character({ positionRef, directionRef, progressRef, reducedMotion }: CharacterProps) {
  const { scene } = useGLTF("/models/ukm-avatar.glb");
  const avatar = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const avatarGroupRef = useRef<THREE.Group>(null);
  const targetPositionRef = useRef(new THREE.Vector3());
  const previousProgressRef = useRef(0);
  const walkingFactorRef = useRef(0);
  const walkPhase = useRef(0);

  useEffect(() => {
    avatar.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [avatar]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const position = positionRef.current;
    const direction = directionRef.current;
    const progress = progressRef.current;
    const velocity = delta > 0 ? Math.abs(progress - previousProgressRef.current) / delta : 0;
    const walkingTarget = !reducedMotion && velocity > 0.006 ? 1 : 0;
    walkingFactorRef.current = THREE.MathUtils.damp(walkingFactorRef.current, walkingTarget, 8, delta);
    previousProgressRef.current = progress;

    const followLag = reducedMotion ? 1 : 1 - Math.exp(-delta * 8);
    const targetRotation = Math.atan2(direction.x, direction.z);
    const walkFactor = walkingFactorRef.current;
    const bob = Math.sin(walkPhase.current) * 0.045 * walkFactor;

    targetPositionRef.current.copy(position);
    targetPositionRef.current.y += bob;

    group.position.lerp(targetPositionRef.current, followLag);
    group.rotation.y = reducedMotion ? targetRotation : dampAngle(group.rotation.y, targetRotation, 10, delta);

    if (!reducedMotion) {
      walkPhase.current += delta * THREE.MathUtils.lerp(2.2, 7.2, walkFactor);
      if (avatarGroupRef.current) {
        avatarGroupRef.current.rotation.x = Math.cos(walkPhase.current) * 0.018 * walkFactor;
        avatarGroupRef.current.rotation.z = Math.sin(walkPhase.current * 0.85) * 0.038 * walkFactor;
      }
    } else if (avatarGroupRef.current) {
      avatarGroupRef.current.rotation.x = 0;
      avatarGroupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef} position={[-5.4, 0.05, 7.2]}>
      <group ref={avatarGroupRef} scale={AVATAR_SCALE} rotation={[0, AVATAR_FORWARD_OFFSET, 0]}>
        <primitive object={avatar} />
      </group>
      <pointLight position={[-0.24, 0.38, 0.2]} color="#ffd27d" intensity={1.1} distance={2.6} />
      <pointLight position={[0, 0.86, 0.24]} color="#9beafe" intensity={0.45} distance={2.4} />
    </group>
  );
}

useGLTF.preload("/models/ukm-avatar.glb");
