import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";

type Props = {
  theme: ThemeConfig;
};

const islandPositions: [number, number, number][] = [
  [-6.8, -0.02, 4.2],
  [-4.6, -0.02, 1.4],
  [-2.2, -0.02, 5.6],
  [2.2, -0.02, 0.5],
  [5.7, -0.02, -3.3],
  [-1.0, -0.02, -5.3],
  [6.7, -0.02, 2.4]
];

const cliffPositions: [number, number, number][] = [
  [-7.4, 0, -5.5],
  [-4.8, 0, -7.4],
  [-1.8, 0, -8.5],
  [2.3, 0, -8.1],
  [5.7, 0, -6.4],
  [7.5, 0, -4.1]
];

const buoyPositions: [number, number, number][] = [
  [-3.6, 0.12, 3.2],
  [0.9, 0.12, 2.0],
  [4.5, 0.12, -1.2],
  [-2.2, 0.12, -4.6]
];

function CoastalRock({ position, scale, theme }: Props & { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.14, 0]} rotation={[0.12, 0.2, 0]}>
        <dodecahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.88} metalness={0.06} />
      </mesh>
      <mesh castShadow position={[0.3, 0.34, -0.06]} rotation={[0, 0.45, 0]}>
        <coneGeometry args={[0.2, 0.58, 6]} />
        <meshStandardMaterial color={theme.scene.treeBase} roughness={0.76} />
      </mesh>
    </group>
  );
}

function Buoy({ position, theme }: Props & { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.11, 0.14, 0.36, 10]} />
        <meshStandardMaterial color={theme.scene.accent} roughness={0.54} />
      </mesh>
      <mesh castShadow position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.12, 10, 8]} />
        <meshStandardMaterial color={theme.scene.pathCore} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.23, 18]} />
        <meshBasicMaterial color={theme.scene.pathGlow} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Driftwood({ position, rotation, theme }: Props & { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.055, 0.075, 0.88, 7]} />
        <meshStandardMaterial color="#6d4935" roughness={0.86} />
      </mesh>
      <mesh castShadow position={[0.28, 0.04, 0.16]} rotation={[0.5, 0, 0.8]}>
        <cylinderGeometry args={[0.025, 0.035, 0.46, 6]} />
        <meshStandardMaterial color="#7b5741" roughness={0.86} />
      </mesh>
      <pointLight position={[0, 0.24, 0]} color={theme.scene.pathGlow} intensity={0.16} distance={1.8} />
    </group>
  );
}

export function OceanProps({ theme }: Props) {
  return (
    <>
      {cliffPositions.map((position, index) => (
        <group key={`ocean-cliff-${index}`} position={position} scale={[2.2 + index * 0.2, 1.8 + index * 0.14, 2.1 + index * 0.18]} rotation={[0, Math.PI / 4, 0]}>
          <mesh>
            <coneGeometry args={[1, 1.7, 5]} />
            <meshStandardMaterial color={index % 2 ? theme.scene.mountainB : theme.scene.mountainA} roughness={0.9} metalness={0.04} />
          </mesh>
          <mesh position={[0, 0.42, 0]} scale={[0.5, 0.28, 0.5]}>
            <coneGeometry args={[1, 1.0, 5]} />
            <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.78} />
          </mesh>
        </group>
      ))}
      {islandPositions.map((position, index) => (
        <CoastalRock key={`coastal-rock-${index}`} position={position} scale={0.72 + (index % 4) * 0.18} theme={theme} />
      ))}
      {buoyPositions.map((position, index) => (
        <Buoy key={`buoy-${index}`} position={position} theme={theme} />
      ))}
      <Driftwood position={[-4.2, 0.12, 4.8]} rotation={[0, 0.6, Math.PI / 2]} theme={theme} />
      <Driftwood position={[3.6, 0.12, -2.2]} rotation={[0, -0.8, Math.PI / 2]} theme={theme} />
      {[[-0.8, 0.08, 4.6], [5.4, 0.08, 1.0], [-2.8, 0.08, -3.6]].map((position, index) => (
        <group key={`coral-${index}`} position={position as [number, number, number]}>
          {[0, 1, 2].map((branch) => (
            <mesh key={branch} castShadow position={[branch * 0.1 - 0.1, 0.16 + branch * 0.05, 0]} rotation={[0.2, branch * 0.7, 0.4]}>
              <cylinderGeometry args={[0.025, 0.04, 0.42, 6]} />
              <meshStandardMaterial color={branch % 2 ? theme.scene.secondary : theme.scene.accent} roughness={0.68} />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );
}
