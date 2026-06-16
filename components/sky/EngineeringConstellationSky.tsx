"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { ConstellationGroup } from "@/components/sky/ConstellationGroup";
import { constellationGroups } from "@/data/constellations";
import type { ActiveSectionId } from "@/hooks/useActiveSection";
import type { ThemeConfig } from "@/data/themes";

type EngineeringConstellationSkyProps = {
  activeSection: ActiveSectionId;
  reducedMotion: boolean;
  theme: ThemeConfig;
  visibilityRef?: MutableRefObject<number>;
};

export function EngineeringConstellationSky({ activeSection, reducedMotion, theme, visibilityRef }: EngineeringConstellationSkyProps) {
  const rootRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!rootRef.current || reducedMotion) {
      return;
    }

    rootRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.045) * 0.035;
    rootRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.035) * 0.012;
  });

  return (
    <group ref={rootRef} renderOrder={-1}>
      {constellationGroups.map((group) => (
        <ConstellationGroup
          key={group.id}
          activeSection={activeSection}
          group={group}
          reducedMotion={reducedMotion}
          theme={theme}
          visibilityRef={visibilityRef}
        />
      ))}
    </group>
  );
}
