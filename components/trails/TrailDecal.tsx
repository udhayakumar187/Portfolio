"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";
import { trailOpacityForAge, trailScaleForType, type TrailItem } from "@/lib/trailUtils";

type TrailDecalProps = {
  theme: ThemeConfig;
  itemsRef: MutableRefObject<TrailItem[]>;
  maxItems: number;
};

const matrix = new THREE.Matrix4();
const quaternion = new THREE.Quaternion();
const euler = new THREE.Euler();
const scale = new THREE.Vector3();
const color = new THREE.Color();
const fadeColor = new THREE.Color("#030711");

export function TrailDecal({ theme, itemsRef, maxItems }: TrailDecalProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    if (theme.trail.type === "boat-wake") {
      return new THREE.RingGeometry(0.18, 0.3, 24);
    }

    if (theme.trail.type === "camel-prints") {
      return new THREE.CircleGeometry(0.16, 12);
    }

    return new THREE.CircleGeometry(0.18, 14);
  }, [theme.trail.type]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    const now = clock.elapsedTime * 1000;

    itemsRef.current.forEach((item, index) => {
      const age = now - item.createdAt;
      const opacity = trailOpacityForAge(age, item.lifetime);
      const active = age >= 0 && age <= item.lifetime && item.strength > 0.01;
      const baseScale = active ? trailScaleForType(item.type, item.strength) : 0.001;
      const wakeGrowth = item.type === "boat-wake" ? 0.68 + (age / Math.max(1, item.lifetime)) * 1.75 : 1;
      const stretch = item.type === "camel-print" ? 1.55 : item.type === "grass-press" ? 1.8 : item.type === "petal-trail" ? 0.86 : 1;

      euler.set(-Math.PI / 2, 0, -item.rotation);
      quaternion.setFromEuler(euler);
      scale.set(baseScale * stretch * wakeGrowth * opacity, baseScale * wakeGrowth * opacity, 1);
      matrix.compose(item.position, quaternion, scale);
      mesh.setMatrixAt(index, matrix);
      color.set(theme.trail.color).lerp(fadeColor, 1 - opacity * 0.82);
      mesh.setColorAt(index, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, maxItems]} frustumCulled={false}>
      <meshBasicMaterial color={theme.trail.color} transparent opacity={theme.trail.type === "boat-wake" ? 0.28 : 0.34} depthWrite={false} vertexColors />
    </instancedMesh>
  );
}
