"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { ThemeConfig, TravelMode } from "@/data/themes";
import { BicycleTransport } from "@/components/seasonal/transports/BicycleTransport";
import { BoatTransport } from "@/components/seasonal/transports/BoatTransport";
import { CamelTransport } from "@/components/seasonal/transports/CamelTransport";
import { WalkingTransport } from "@/components/seasonal/transports/WalkingTransport";
import { dampAngle } from "@/components/seasonal/transports/transport-utils";

type SeasonalTransportProps = {
  theme: ThemeConfig;
  positionRef: { current: THREE.Vector3 };
  directionRef: { current: THREE.Vector3 };
  progressRef: { current: number };
  reducedMotion: boolean;
};

const transportForwardOffsets: Record<TravelMode, number> = {
  walk: 0,
  camel: 0,
  boat: 0,
  bicycle: 0
};

export function SeasonalTransport({ theme, positionRef, directionRef, progressRef, reducedMotion }: SeasonalTransportProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetPositionRef = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    targetPositionRef.current.copy(positionRef.current);
    const followLag = reducedMotion ? 1 : 1 - Math.exp(-delta * 8);
    const targetRotation = Math.atan2(directionRef.current.x, directionRef.current.z) + transportForwardOffsets[theme.travelMode];

    group.position.lerp(targetPositionRef.current, followLag);
    group.rotation.y = reducedMotion ? targetRotation : dampAngle(group.rotation.y, targetRotation, 10, delta);
  });

  return (
    <group ref={groupRef} position={[-5.4, 0.05, 7.2]}>
      {theme.travelMode === "camel" ? (
        <CamelTransport theme={theme} progressRef={progressRef} reducedMotion={reducedMotion} />
      ) : theme.travelMode === "boat" ? (
        <BoatTransport theme={theme} progressRef={progressRef} reducedMotion={reducedMotion} />
      ) : theme.travelMode === "bicycle" ? (
        <BicycleTransport theme={theme} progressRef={progressRef} reducedMotion={reducedMotion} />
      ) : (
        <WalkingTransport theme={theme} progressRef={progressRef} reducedMotion={reducedMotion} />
      )}
    </group>
  );
}
