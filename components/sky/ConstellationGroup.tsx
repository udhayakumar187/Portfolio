"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { ActiveSectionId } from "@/hooks/useActiveSection";
import type { ConstellationGroupConfig } from "@/data/constellations";
import type { ThemeConfig } from "@/data/themes";

type ConstellationGroupProps = {
  activeSection: ActiveSectionId;
  group: ConstellationGroupConfig;
  reducedMotion: boolean;
  theme: ThemeConfig;
  visibilityRef?: MutableRefObject<number>;
};

function nodePosition(index: number, count: number, groupId: string) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  const radius = groupId === "ai" ? 1.34 : 1.02 + (index % 2) * 0.22;
  const x = Math.cos(angle) * radius + Math.sin(index * 1.7) * 0.12;
  const y = Math.sin(angle) * radius * 0.62 + Math.cos(index * 1.3) * 0.12;
  const z = Math.sin(index * 0.9) * 0.08;

  return new THREE.Vector3(x, y, z);
}

function colorForGroup(group: ConstellationGroupConfig, theme: ThemeConfig) {
  if (group.id === "ai") {
    return theme.constellation.highlight;
  }

  if (group.id === "healthcare" || group.id === "frontend") {
    return theme.constellation.secondary;
  }

  return theme.constellation.primary;
}

export function ConstellationGroup({ activeSection, group, reducedMotion, theme, visibilityRef }: ConstellationGroupProps) {
  const rootRef = useRef<THREE.Group>(null);
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null);
  const linesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const intensityRef = useRef(0.14);
  const color = colorForGroup(group, theme);

  const { edgePositions, nodePositions } = useMemo(() => {
    const positionMap = new Map<string, THREE.Vector3>();
    const nextNodePositions = new Float32Array(group.nodes.length * 3);

    group.nodes.forEach((node, index) => {
      const position = nodePosition(index, group.nodes.length, group.id);
      positionMap.set(node.id, position);
      nextNodePositions[index * 3] = position.x;
      nextNodePositions[index * 3 + 1] = position.y;
      nextNodePositions[index * 3 + 2] = position.z;
    });

    const nextEdgePositions = new Float32Array(group.edges.length * 2 * 3);
    group.edges.forEach(([from, to], edgeIndex) => {
      const fromPosition = positionMap.get(from) ?? new THREE.Vector3();
      const toPosition = positionMap.get(to) ?? new THREE.Vector3();
      const offset = edgeIndex * 6;

      nextEdgePositions[offset] = fromPosition.x;
      nextEdgePositions[offset + 1] = fromPosition.y;
      nextEdgePositions[offset + 2] = fromPosition.z;
      nextEdgePositions[offset + 3] = toPosition.x;
      nextEdgePositions[offset + 4] = toPosition.y;
      nextEdgePositions[offset + 5] = toPosition.z;
    });

    return { edgePositions: nextEdgePositions, nodePositions: nextNodePositions };
  }, [group.edges, group.id, group.nodes]);

  useFrame(({ clock }, delta) => {
    const sectionMatch = group.sectionRelevance.includes(activeSection);
    const aiDominant = group.id === "ai" && activeSection === "ai";
    const skillsOverview = activeSection === "skills";
    const contactCalm = activeSection === "contact";
    const targetIntensity = contactCalm ? 0.1 : aiDominant ? 1 : sectionMatch || skillsOverview ? 0.56 : 0.18;
    const damp = reducedMotion ? 1 : 1 - Math.exp(-delta * 3.8);
    const dayNightVisibility = visibilityRef?.current ?? 1;

    intensityRef.current = THREE.MathUtils.lerp(intensityRef.current, targetIntensity, damp);

    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.opacity = intensityRef.current * (aiDominant ? 0.9 : 0.68) * dayNightVisibility;
      pointsMaterialRef.current.size = (aiDominant ? 0.09 : 0.066) + intensityRef.current * 0.028;
    }

    if (linesMaterialRef.current) {
      linesMaterialRef.current.opacity = intensityRef.current * (aiDominant ? 0.52 : 0.3) * dayNightVisibility;
    }

    if (rootRef.current && !reducedMotion) {
      rootRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.08 + group.position[0]) * 0.025;
      rootRef.current.position.y = group.position[1] + Math.sin(clock.elapsedTime * 0.18 + group.scale) * 0.04;

      const aiScale = aiDominant ? 1.2 + Math.sin(clock.elapsedTime * 0.8) * 0.025 : 1;
      rootRef.current.scale.setScalar(group.scale * aiScale);
    }
  });

  return (
    <group ref={rootRef} position={group.position} scale={group.scale}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={linesMaterialRef}
          color={color}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMaterialRef}
          color={color}
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
