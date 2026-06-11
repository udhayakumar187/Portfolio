"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Stars } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useJourneyMotion } from "@/components/MotionProvider";
import { SeasonalEnvironment } from "@/components/seasonal/SeasonalEnvironment";
import { SeasonalParticles } from "@/components/seasonal/SeasonalParticles";
import { SeasonalTransport } from "@/components/seasonal/SeasonalTransport";
import { useTheme } from "@/components/ThemeProvider";
import type { ThemeConfig } from "@/data/themes";
import { clamp01 } from "@/lib/animation";

const checkpointPalette = ["#9adfff", "#67e8f9", "#7dd3fc", "#c4b5fd", "#a78bfa", "#e0f2fe"];

function makeJourneyCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5.4, 0.05, 7.2),
    new THREE.Vector3(-3.7, 0.07, 3.9),
    new THREE.Vector3(-1.5, 0.1, 1.2),
    new THREE.Vector3(1.6, 0.08, -1.2),
    new THREE.Vector3(3.8, 0.11, -4.3),
    new THREE.Vector3(5.2, 0.18, -7.1)
  ]);
}

function Aurora() {
  return (
    <group position={[0, 8.2, -12]} rotation={[-0.18, 0, 0]}>
      <Line
        points={[
          [-8, 0.2, 0],
          [-4, 1.2, 0],
          [0, 0.5, 0],
          [4, 1.35, 0],
          [8, 0.4, 0]
        ]}
        color="#67e8f9"
        lineWidth={2.2}
        transparent
        opacity={0.38}
      />
      <Line
        points={[
          [-7, -0.45, -0.2],
          [-2.8, 0.35, -0.2],
          [1.5, -0.1, -0.2],
          [6.6, 0.82, -0.2]
        ]}
        color="#a78bfa"
        lineWidth={3}
        transparent
        opacity={0.25}
      />
      <Line
        points={[
          [-6, -0.95, -0.4],
          [-1, -0.25, -0.4],
          [3.2, -0.8, -0.4],
          [7.4, -0.2, -0.4]
        ]}
        color="#e0f2fe"
        lineWidth={1.4}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

function Footprints({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const marks = useMemo(() => {
    return Array.from({ length: 22 }, (_, index) => {
      const point = curve.getPoint(0.05 + index * 0.04);
      const next = curve.getPoint(Math.min(0.98, 0.055 + index * 0.04));
      const direction = next.sub(point).normalize();
      const angle = Math.atan2(direction.x, direction.z);
      const side = index % 2 ? -0.13 : 0.13;
      return {
        position: [point.x + Math.cos(angle) * side, 0.017, point.z - Math.sin(angle) * side] as [number, number, number],
        rotation: [-Math.PI / 2, 0, -angle] as [number, number, number]
      };
    });
  }, [curve]);

  return (
    <>
      {marks.map((mark, index) => (
        <mesh key={index} position={mark.position} rotation={mark.rotation}>
          <circleGeometry args={[0.055, 10]} />
          <meshBasicMaterial color="#b8d7ea" transparent opacity={0.38} />
        </mesh>
      ))}
    </>
  );
}

function Campfire({ position, theme }: { position: [number, number, number]; theme: ThemeConfig }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const { prefersReducedMotion } = useJourneyMotion();

  useFrame(({ clock }) => {
    if (prefersReducedMotion) {
      return;
    }
    const pulse = 1 + Math.sin(clock.elapsedTime * 8) * 0.15;
    if (lightRef.current) {
      lightRef.current.intensity = 2.1 * pulse;
    }
    if (flameRef.current) {
      flameRef.current.scale.setScalar(0.9 + Math.sin(clock.elapsedTime * 9) * 0.08);
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.62, 0.72, 0.025, 24]} />
        <meshStandardMaterial color={theme.scene.campBase} roughness={0.68} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.08, 0.1]}>
        <cylinderGeometry args={[0.035, 0.035, 0.65, 6]} />
        <meshStandardMaterial color="#352a27" roughness={0.82} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 0.08, -0.1]}>
        <cylinderGeometry args={[0.035, 0.035, 0.65, 6]} />
        <meshStandardMaterial color="#352a27" roughness={0.82} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.38, 0]}>
        <coneGeometry args={[0.18, 0.54, 7]} />
        <meshStandardMaterial color="#ffc879" emissive="#ff7a1a" emissiveIntensity={1.95} roughness={0.42} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0.55, 0]} color={theme.scene.campLight} intensity={2.1} distance={5.8} />
    </group>
  );
}

function Checkpoint({
  position,
  index,
  active,
  current,
  reducedMotion,
  theme
}: {
  position: THREE.Vector3;
  index: number;
  active: boolean;
  current: boolean;
  reducedMotion: boolean;
  theme: ThemeConfig;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const color = active ? theme.scene.accent : checkpointPalette[index % checkpointPalette.length];

  useEffect(() => {
    if (!ringRef.current || current) {
      return;
    }

    const scale = active ? 1 : 0.9;
    ringRef.current.rotation.z = index * 0.32;
    ringRef.current.scale.set(scale, scale, scale);
  }, [active, current, index]);

  useFrame(({ clock }) => {
    if (ringRef.current && current) {
      ringRef.current.rotation.z = reducedMotion ? index * 0.32 : clock.elapsedTime * 0.28 + index;
      const scale = reducedMotion ? 1.08 : 1.1 + Math.sin(clock.elapsedTime * 2.4) * 0.045;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.62, 0.78, 0.04, 24]} />
        <meshStandardMaterial color={active ? theme.scene.pathCore : theme.scene.terrainOverlay} emissive={active ? theme.scene.accent : theme.scene.fog} emissiveIntensity={active ? 0.4 : 0.08} roughness={0.64} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.018, 8, 40]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1.8 : 0.45} />
      </mesh>
      <mesh position={[0, 0.42, 0]} rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.23, 0]} />
        <meshStandardMaterial color={theme.scene.pathCore} emissive={color} emissiveIntensity={active ? 1.25 : 0.28} roughness={0.24} metalness={0.18} transparent opacity={0.96} />
      </mesh>
      <pointLight color={color} intensity={current ? 1.35 : active ? 0.34 : 0.18} distance={current ? 4.8 : active ? 2.4 : 1.8} />
      {index === 1 ? (
        <group position={[0.55, 0.12, -0.15]} rotation={[0, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 0.12, 0.34]} />
            <meshStandardMaterial color={theme.scene.terrainOverlay} roughness={0.58} metalness={0.08} />
          </mesh>
          <mesh position={[-0.42, -0.18, 0]}>
            <boxGeometry args={[0.12, 0.34, 0.22]} />
            <meshStandardMaterial color={theme.scene.mountainB} roughness={0.66} />
          </mesh>
          <mesh position={[0.42, -0.18, 0]}>
            <boxGeometry args={[0.12, 0.34, 0.22]} />
            <meshStandardMaterial color={theme.scene.mountainB} roughness={0.66} />
          </mesh>
        </group>
      ) : null}
      {index === 3 ? (
        <group position={[0.58, 0.32, 0.15]} rotation={[0, -0.6, 0]}>
          <mesh>
            <cylinderGeometry args={[0.24, 0.32, 0.75, 8]} />
            <meshStandardMaterial color={theme.scene.mountainA} roughness={0.42} metalness={0.18} />
          </mesh>
          <mesh position={[0, 0.48, 0]}>
            <sphereGeometry args={[0.24, 12, 8]} />
            <meshStandardMaterial color={theme.scene.pathCore} emissive={theme.scene.accent} emissiveIntensity={0.7} transparent opacity={0.88} />
          </mesh>
        </group>
      ) : null}
      {index === 4 ? (
        <group position={[0.72, 0.58, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.035, 12, 48]} />
            <meshStandardMaterial color={theme.scene.secondary} emissive={theme.scene.secondary} emissiveIntensity={1.45} />
          </mesh>
          <mesh position={[0, 0, -0.02]}>
            <icosahedronGeometry args={[0.24, 0]} />
            <meshStandardMaterial color={theme.scene.pathCore} emissive={theme.scene.accent} emissiveIntensity={0.55} transparent opacity={0.78} />
          </mesh>
        </group>
      ) : null}
    </group>
  );
}

function AdventureWorld() {
  const { progressRef, activeStop, prefersReducedMotion } = useJourneyMotion();
  const { theme } = useTheme();
  const curve = useMemo(() => makeJourneyCurve(), []);
  const curvePoints = useMemo(() => curve.getPoints(160), [curve]);
  const [visibleProgress, setVisibleProgress] = useState(0.02);
  const smoothProgressRef = useRef(0);
  const visibleProgressRef = useRef(0.02);
  const characterTargetRef = useRef(curve.getPointAt(0));
  const nextPointRef = useRef(curve.getPointAt(0.012));
  const directionRef = useRef(new THREE.Vector3(0, 0, -1));
  const cameraTargetRef = useRef(new THREE.Vector3(-4.8, 5.6, 14));
  const lookAtTargetRef = useRef(new THREE.Vector3(-5.4, 0.8, 6.4));
  const desiredLookAtRef = useRef(new THREE.Vector3());
  const visiblePoints = useMemo(() => {
    const safeProgress = Number.isFinite(visibleProgress) ? clamp01(visibleProgress) : 0.02;
    const count = Math.max(2, Math.floor(160 * safeProgress));
    return curve.getPoints(count);
  }, [curve, visibleProgress]);
  const checkpoints = useMemo(() => [0.02, 0.2, 0.4, 0.6, 0.79, 0.98].map((t) => curve.getPoint(t)), [curve]);

  useFrame(({ camera, clock }, delta) => {
    const targetProgress = clamp01(progressRef.current);
    smoothProgressRef.current = prefersReducedMotion
      ? targetProgress
      : THREE.MathUtils.damp(smoothProgressRef.current, targetProgress, 5.8, delta);

    const pathProgress = Math.min(Number.isFinite(smoothProgressRef.current) ? smoothProgressRef.current : 0.02, 0.98);
    const nextVisibleProgress =
      pathProgress >= 0.965 ? 0.98 : pathProgress <= 0.025 ? 0.02 : Math.round(pathProgress / 0.018) * 0.018;

    if (Math.abs(nextVisibleProgress - visibleProgressRef.current) > 0.001) {
      visibleProgressRef.current = nextVisibleProgress;
      setVisibleProgress(nextVisibleProgress);
    }

    curve.getPointAt(pathProgress, characterTargetRef.current);
    curve.getPointAt(Math.min(1, pathProgress + 0.012), nextPointRef.current);
    directionRef.current.copy(nextPointRef.current).sub(characterTargetRef.current).normalize();

    const heroDrift = prefersReducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.22) * 0.14;
    cameraTargetRef.current.set(
      characterTargetRef.current.x + 0.55 + heroDrift,
      5.7 - pathProgress * 1.1,
      characterTargetRef.current.z + 8.4
    );
    desiredLookAtRef.current.set(
      characterTargetRef.current.x,
      characterTargetRef.current.y + 0.75,
      characterTargetRef.current.z - 0.8
    );

    const cameraLag = prefersReducedMotion ? 1 : 1 - Math.exp(-delta * 4.2);
    const lookLag = prefersReducedMotion ? 1 : 1 - Math.exp(-delta * 5.4);
    camera.position.lerp(cameraTargetRef.current, cameraLag);
    lookAtTargetRef.current.lerp(desiredLookAtRef.current, lookLag);
    camera.lookAt(lookAtTargetRef.current);
  });

  return (
    <>
      <fog attach="fog" args={[theme.scene.fog, 8, 30]} />
      <ambientLight intensity={0.52} color={theme.scene.ambient} />
      <directionalLight position={[-4.5, 9, 4]} intensity={1.35} color={theme.scene.directional} castShadow />
      <pointLight position={[-4, 3, 5]} intensity={1.55} color={theme.scene.accent} distance={12} />
      <Stars radius={55} depth={22} count={prefersReducedMotion ? 80 : theme.id === "desert" ? 320 : 460} factor={3.2} fade speed={0.15} />
      {theme.id === "winter" || theme.id === "ocean" ? <Aurora /> : null}
      <SeasonalParticles
        type={theme.scene.particle}
        color={theme.scene.particleColor}
        emissive={theme.scene.particleEmissive}
        reducedMotion={prefersReducedMotion}
      />

      <SeasonalEnvironment theme={theme} reducedMotion={prefersReducedMotion} />

      <Line points={curvePoints} color={theme.scene.pathBase} lineWidth={5.2} transparent opacity={0.56} />
      <Line points={curvePoints} color="#07101f" lineWidth={2.4} transparent opacity={0.4} />
      <Line points={curvePoints} color={theme.scene.pathGlow} lineWidth={1.2} transparent opacity={0.36} />
      <Line points={visiblePoints} color={theme.scene.pathCore} lineWidth={3} />
      {theme.environmentType === "winter" ? <Footprints curve={curve} /> : null}

      <Campfire position={[-5.6, 0.03, 7.5]} theme={theme} />
      <SeasonalTransport
        theme={theme}
        positionRef={characterTargetRef}
        directionRef={directionRef}
        progressRef={smoothProgressRef}
        reducedMotion={prefersReducedMotion}
      />

      {checkpoints.map((point, index) => (
        <Checkpoint
          key={index}
          position={point.clone().add(new THREE.Vector3(index === 0 ? -0.4 : 0.35, 0.08, index === 5 ? -0.3 : 0.2))}
          index={index}
          active={activeStop >= index}
          current={activeStop === index}
          reducedMotion={prefersReducedMotion}
          theme={theme}
        />
      ))}
    </>
  );
}

function CanvasFallback({ theme }: { theme: ThemeConfig }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 50% 20%, ${theme.scene.pathGlow}, transparent 34%), linear-gradient(180deg, ${theme.scene.background}, var(--background))`
      }}
    />
  );
}

export function AdventureCanvas() {
  const { theme } = useTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${theme.scene.background}, var(--background))`
        }}
      />
      <Suspense fallback={<CanvasFallback theme={theme} />}>
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 1.5]}
          camera={{ position: [-4.8, 5.6, 14], fov: 44, near: 0.1, far: 80 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="h-full w-full"
        >
          <AdventureWorld />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,transparent_0%,rgba(7,16,31,0.2)_43%,rgba(3,5,17,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
