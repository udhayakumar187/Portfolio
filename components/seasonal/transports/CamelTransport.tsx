"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";
import { AvatarFigure } from "@/components/seasonal/transports/AvatarFigure";
import { progressVelocity } from "@/components/seasonal/transports/transport-utils";

type CamelTransportProps = {
  theme: ThemeConfig;
  progressRef: { current: number };
  reducedMotion: boolean;
};

export function CamelTransport({ theme, progressRef, reducedMotion }: CamelTransportProps) {
  const camelRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const legRefs = useRef<THREE.Group[]>([]);
  const previousProgressRef = useRef(0);
  const motionRef = useRef(0);
  const phaseRef = useRef(0);

  useFrame((_, delta) => {
    const camel = camelRef.current;
    if (!camel) {
      return;
    }

    const velocity = progressVelocity(progressRef, previousProgressRef, delta);
    const motionTarget = !reducedMotion && velocity > 0.004 ? 1 : 0;
    motionRef.current = THREE.MathUtils.damp(motionRef.current, motionTarget, 7, delta);
    const motion = motionRef.current;

    if (reducedMotion) {
      camel.position.y = 0;
      camel.rotation.set(0, 0, 0);
      return;
    }

    phaseRef.current += delta * THREE.MathUtils.lerp(1.6, 5.2, motion);
    camel.position.y = Math.sin(phaseRef.current * 1.15) * 0.04 * motion;
    camel.rotation.z = Math.sin(phaseRef.current * 0.8) * 0.028 * motion;
    camel.rotation.x = Math.cos(phaseRef.current * 0.7) * 0.012 * motion;

    if (neckRef.current) {
      neckRef.current.rotation.x = -0.42 + Math.sin(phaseRef.current * 0.75) * 0.045 * motion;
    }

    legRefs.current.forEach((leg, index) => {
      const side = index % 2 === 0 ? 1 : -1;
      leg.rotation.x = Math.sin(phaseRef.current + side * Math.PI * 0.5) * 0.18 * motion;
    });
  });

  return (
    <group ref={camelRef} position={[0, 0.07, 0]}>
      <group>
        <mesh castShadow position={[0, 0.52, 0]}>
          <boxGeometry args={[0.72, 0.38, 1.28]} />
          <meshStandardMaterial color="#b98447" roughness={0.86} />
        </mesh>
        <mesh castShadow position={[0, 0.84, -0.12]} rotation={[0, 0, 0]}>
          <dodecahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial color="#c99555" roughness={0.88} />
        </mesh>
        <mesh castShadow position={[0, 0.78, 0.22]}>
          <boxGeometry args={[0.5, 0.12, 0.48]} />
          <meshStandardMaterial color="#5a3a25" roughness={0.8} />
        </mesh>
        <group ref={neckRef} position={[0, 0.68, 0.66]} rotation={[-0.42, 0, 0]}>
          <mesh castShadow position={[0, 0.18, 0.32]}>
            <cylinderGeometry args={[0.09, 0.12, 0.72, 6]} />
            <meshStandardMaterial color="#bd8749" roughness={0.86} />
          </mesh>
          <mesh castShadow position={[0, 0.43, 0.66]}>
            <boxGeometry args={[0.28, 0.2, 0.34]} />
            <meshStandardMaterial color="#c99555" roughness={0.82} />
          </mesh>
          <mesh castShadow position={[-0.1, 0.57, 0.58]} rotation={[0.3, 0, -0.3]}>
            <coneGeometry args={[0.045, 0.18, 5]} />
            <meshStandardMaterial color="#7a4b2d" roughness={0.8} />
          </mesh>
          <mesh castShadow position={[0.1, 0.57, 0.58]} rotation={[0.3, 0, 0.3]}>
            <coneGeometry args={[0.045, 0.18, 5]} />
            <meshStandardMaterial color="#7a4b2d" roughness={0.8} />
          </mesh>
        </group>
        {[
          [-0.24, 0.2, 0.42],
          [0.24, 0.2, 0.42],
          [-0.24, 0.2, -0.42],
          [0.24, 0.2, -0.42]
        ].map((position, index) => (
          <group
            key={`camel-leg-${index}`}
            ref={(node) => {
              if (node) {
                legRefs.current[index] = node;
              }
            }}
            position={position as [number, number, number]}
          >
            <mesh castShadow position={[0, -0.12, 0]}>
              <cylinderGeometry args={[0.045, 0.055, 0.62, 5]} />
              <meshStandardMaterial color="#a8743e" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0, -0.46, 0.06]}>
              <boxGeometry args={[0.12, 0.07, 0.2]} />
              <meshStandardMaterial color="#76502d" roughness={0.88} />
            </mesh>
          </group>
        ))}
        <mesh castShadow position={[0, 0.58, -0.76]} rotation={[-0.7, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.035, 0.58, 5]} />
          <meshStandardMaterial color="#76502d" roughness={0.86} />
        </mesh>
      </group>

      <group position={[0, 1.04, 0.1]} rotation={[0.02, 0, 0]}>
        <AvatarFigure scale={0.34} />
      </group>
      <mesh castShadow position={[0, 0.98, 0.2]}>
        <boxGeometry args={[0.48, 0.06, 0.42]} />
        <meshStandardMaterial color="#4b2f21" roughness={0.78} />
      </mesh>
      <pointLight position={[-0.18, 0.95, 0.38]} color={theme.scene.campLight} intensity={0.72} distance={2.4} />
    </group>
  );
}
