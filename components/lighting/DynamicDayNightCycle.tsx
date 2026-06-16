"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { experienceFeatures } from "@/data/experienceFeatures";
import type { DayNightStop } from "@/data/dayNightThemes";
import type { ThemeConfig } from "@/data/themes";
import { useDayNightProgress } from "@/hooks/useDayNightProgress";
import { clamp01 } from "@/lib/animation";

type DynamicDayNightCycleProps = {
  theme: ThemeConfig;
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  constellationVisibilityRef?: MutableRefObject<number>;
};

const targetAmbient = new THREE.Color();
const targetDirectional = new THREE.Color();
const targetFog = new THREE.Color();
const targetGlow = new THREE.Color();
const targetSky = new THREE.Color();
const targetSun = new THREE.Color();
const toAmbient = new THREE.Color();
const toDirectional = new THREE.Color();
const toFog = new THREE.Color();
const toGlow = new THREE.Color();
const toSky = new THREE.Color();
const toSun = new THREE.Color();
const currentAmbient = new THREE.Color();
const currentDirectional = new THREE.Color();
const currentFog = new THREE.Color();
const currentGlow = new THREE.Color();
const currentSky = new THREE.Color();
const currentSun = new THREE.Color();

function blendStops(from: DayNightStop, to: DayNightStop, amount: number) {
  targetAmbient.set(from.ambient).lerp(toAmbient.set(to.ambient), amount);
  targetDirectional.set(from.directional).lerp(toDirectional.set(to.directional), amount);
  targetFog.set(from.fog).lerp(toFog.set(to.fog), amount);
  targetGlow.set(from.glow).lerp(toGlow.set(to.glow), amount);
  targetSky.set(from.sky).lerp(toSky.set(to.sky), amount);
  targetSun.set(from.sun).lerp(toSun.set(to.sun), amount);

  return {
    ambientIntensity: THREE.MathUtils.lerp(from.ambientIntensity, to.ambientIntensity, amount),
    directionalIntensity: THREE.MathUtils.lerp(from.directionalIntensity, to.directionalIntensity, amount),
    constellationOpacity: THREE.MathUtils.lerp(from.constellationOpacity, to.constellationOpacity, amount)
  };
}

export function DynamicDayNightCycle({ theme, progressRef, reducedMotion, constellationVisibilityRef }: DynamicDayNightCycleProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const fogRef = useRef<THREE.Fog>(null);
  const skyMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const { resolve } = useDayNightProgress(progressRef);

  useEffect(() => {
    const start = theme.dayNightPalette.night;
    currentAmbient.set(start.ambient);
    currentDirectional.set(start.directional);
    currentFog.set(start.fog);
    currentGlow.set(start.glow);
    currentSky.set(start.sky);
    currentSun.set(start.sun);
  }, [theme.dayNightPalette]);

  useFrame(({ clock }, delta) => {
    const blend = experienceFeatures.enableDayNightCycle
      ? resolve()
      : {
          from: "morning" as const,
          to: "morning" as const,
          amount: 0
        };
    const fromStop = theme.dayNightPalette[blend.from];
    const toStop = theme.dayNightPalette[blend.to];
    const stop = blendStops(fromStop, toStop, blend.amount);
    const damp = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.2);
    const progress = clamp01(progressRef.current);

    currentAmbient.lerp(targetAmbient, damp);
    currentDirectional.lerp(targetDirectional, damp);
    currentFog.lerp(targetFog, damp);
    currentGlow.lerp(targetGlow, damp);
    currentSky.lerp(targetSky, damp);
    currentSun.lerp(targetSun, damp);

    if (ambientRef.current) {
      ambientRef.current.color.copy(currentAmbient);
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, stop.ambientIntensity, damp);
    }

    if (directionalRef.current) {
      const orbit = progress * Math.PI * 1.22 - Math.PI * 0.18;
      directionalRef.current.color.copy(currentDirectional);
      directionalRef.current.intensity = THREE.MathUtils.lerp(directionalRef.current.intensity, stop.directionalIntensity, damp);
      directionalRef.current.position.set(Math.cos(orbit) * 6, 5.8 + Math.sin(orbit) * 4.2, 4.5 - progress * 3.2);
    }

    if (glowRef.current) {
      glowRef.current.color.copy(currentGlow);
      glowRef.current.intensity = THREE.MathUtils.lerp(glowRef.current.intensity, progress > 0.78 ? 1.9 : 1.1, damp);
    }

    if (fogRef.current) {
      fogRef.current.color.copy(currentFog);
      fogRef.current.near = THREE.MathUtils.lerp(fogRef.current.near, progress > 0.76 ? 7 : 8.5, damp);
      fogRef.current.far = THREE.MathUtils.lerp(fogRef.current.far, progress > 0.76 ? 32 : 28, damp);
    }

    if (skyMaterialRef.current) {
      skyMaterialRef.current.color.copy(currentSky);
      skyMaterialRef.current.opacity = THREE.MathUtils.lerp(skyMaterialRef.current.opacity, progress > 0.8 ? 0.42 : 0.34, damp);
    }

    if (sunRef.current) {
      const orbit = progress * Math.PI * 1.2 - Math.PI * 0.2;
      sunRef.current.position.set(Math.cos(orbit) * 11.5, 4.4 + Math.sin(orbit) * 6.6, -13);
      sunRef.current.scale.setScalar(0.55 + Math.sin(clock.elapsedTime * 0.22) * (reducedMotion ? 0 : 0.018));
      const material = sunRef.current.material;
      if (material instanceof THREE.MeshBasicMaterial) {
        material.color.copy(currentSun);
      }
    }

    if (constellationVisibilityRef) {
      constellationVisibilityRef.current = THREE.MathUtils.lerp(constellationVisibilityRef.current, stop.constellationOpacity, damp);
    }
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={[theme.dayNightPalette.night.fog, 8, 30]} />
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[58, 32, 16]} />
        <meshBasicMaterial ref={skyMaterialRef} color={theme.dayNightPalette.night.sky} transparent opacity={0.34} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <ambientLight ref={ambientRef} intensity={theme.dayNightPalette.night.ambientIntensity} color={theme.dayNightPalette.night.ambient} />
      <directionalLight ref={directionalRef} position={[-4.5, 9, 4]} intensity={1.1} color={theme.dayNightPalette.night.directional} castShadow />
      <pointLight ref={glowRef} position={[-4, 3, 5]} intensity={1.25} color={theme.dayNightPalette.night.glow} distance={12} />
      <mesh ref={sunRef} position={[-10, 4.2, -13]}>
        <sphereGeometry args={[0.42, 18, 12]} />
        <meshBasicMaterial color={theme.dayNightPalette.night.sun} transparent opacity={0.78} depthWrite={false} />
      </mesh>
    </>
  );
}
