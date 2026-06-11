import type { ThemeConfig } from "@/data/themes";

type Props = {
  theme: ThemeConfig;
};

const treePositions = [
  [-6.3, 0, 4.2],
  [-4.8, 0, 1.7],
  [-3.0, 0, 5.4],
  [-1.4, 0, 3.4],
  [0.8, 0, 2.2],
  [2.7, 0, 0.7],
  [4.4, 0, -1.8],
  [5.7, 0, -3.6],
  [-3.8, 0, -1.8],
  [-0.2, 0, -4.4],
  [2.0, 0, -6.4],
  [6.2, 0, 1.1],
  [7.0, 0, 3.6]
] as const;

const mountainPositions = [
  [-7.4, 0, -5.5],
  [-5.2, 0, -7.5],
  [-2.2, 0, -8.7],
  [1.6, 0, -8.6],
  [5.8, 0, -6.8],
  [7.4, 0, -4.4]
] as const;

const iceRocks = [
  [-4.2, 0.06, 5.2],
  [-1.6, 0.05, 4.1],
  [3.2, 0.05, 1.3],
  [5.8, 0.05, -2.4],
  [-2.6, 0.05, -5.7]
] as const;

function SnowPine({ position, scale, theme }: Props & { position: readonly [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.055, 0.08, 0.58, 5]} />
        <meshStandardMaterial color={theme.scene.treeTrunk} roughness={0.9} />
      </mesh>
      {[0.58, 0.94, 1.28].map((height, index) => (
        <group key={height}>
          <mesh castShadow position={[0, height, 0]}>
            <coneGeometry args={[0.5 - index * 0.1, 0.72 - index * 0.08, 6]} />
            <meshStandardMaterial color={index === 0 ? theme.scene.treeBase : theme.scene.treeLayer} roughness={0.86} />
          </mesh>
          <mesh castShadow position={[0, height + 0.24, 0]}>
            <coneGeometry args={[0.36 - index * 0.075, 0.26, 6]} />
            <meshStandardMaterial color={theme.scene.treeCap} roughness={0.72} metalness={0.02} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SnowMountain({ position, scale, color, theme }: Props & { position: readonly [number, number, number]; scale: [number, number, number]; color: string }) {
  return (
    <group position={position} scale={scale} rotation={[0, Math.PI / 4, 0]}>
      <mesh>
        <coneGeometry args={[1, 1.8, 4]} />
        <meshStandardMaterial color={color} roughness={0.93} metalness={0.03} />
      </mesh>
      <mesh position={[0, 0.56, 0]} scale={[0.48, 0.42, 0.48]}>
        <coneGeometry args={[1, 1.4, 4]} />
        <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.75} />
      </mesh>
    </group>
  );
}

export function WinterProps({ theme }: Props) {
  return (
    <>
      {mountainPositions.map((position, index) => (
        <SnowMountain
          key={`winter-mountain-${index}`}
          position={position}
          scale={[2.4 + index * 0.22, 2.2 + index * 0.18, 2.4 + index * 0.22]}
          color={index % 2 ? theme.scene.mountainB : theme.scene.mountainA}
          theme={theme}
        />
      ))}
      {treePositions.map((position, index) => (
        <SnowPine key={`winter-pine-${index}`} position={position} scale={0.72 + (index % 4) * 0.16} theme={theme} />
      ))}
      {iceRocks.map((position, index) => (
        <group key={`ice-rock-${index}`} position={position} scale={0.58 + (index % 3) * 0.16}>
          <mesh castShadow rotation={[0.2, index * 0.45, 0.1]}>
            <dodecahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.68} metalness={0.04} />
          </mesh>
          <mesh castShadow position={[0.22, 0.18, -0.08]} rotation={[0.15, 0.4, 0]}>
            <octahedronGeometry args={[0.17, 0]} />
            <meshStandardMaterial color={theme.scene.pathGlow} transparent opacity={0.74} roughness={0.28} metalness={0.08} />
          </mesh>
        </group>
      ))}
    </>
  );
}
