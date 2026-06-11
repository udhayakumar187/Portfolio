import * as THREE from "three";
import type { ThemeConfig } from "@/data/themes";

type Props = {
  theme: ThemeConfig;
};

const treePositions: [number, number, number][] = [
  [-6.4, 0, 4.5],
  [-4.9, 0, 1.4],
  [-3.1, 0, 5.2],
  [-1.5, 0, 3.2],
  [0.7, 0, 2.1],
  [2.8, 0, 0.5],
  [4.2, 0, -1.9],
  [5.8, 0, -3.9],
  [-3.9, 0, -1.8],
  [-0.4, 0, -4.5],
  [2.0, 0, -6.5],
  [6.4, 0, 1.1],
  [7.0, 0, 3.4]
];

const ridgePositions: [number, number, number][] = [
  [-7.4, 0, -5.4],
  [-4.8, 0, -7.6],
  [-1.6, 0, -8.6],
  [1.8, 0, -8.4],
  [5.6, 0, -6.8],
  [7.4, 0, -4.4]
];

const logPositions: [number, number, number][] = [
  [-3.6, 0.12, 2.7],
  [1.4, 0.12, 1.5],
  [4.8, 0.12, -1.1],
  [-1.8, 0.12, -4.7]
];

function WoodlandTree({ position, scale, theme }: Props & { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 0.68, 6]} />
        <meshStandardMaterial color={theme.scene.treeTrunk} roughness={0.9} />
      </mesh>
      {[0.72, 1.08, 1.42].map((height, index) => (
        <mesh key={height} castShadow position={[0, height, 0]}>
          <coneGeometry args={[0.56 - index * 0.09, 0.78 - index * 0.06, 7]} />
          <meshStandardMaterial color={index === 2 ? theme.scene.treeCap : index === 1 ? theme.scene.treeLayer : theme.scene.treeBase} roughness={0.86} />
        </mesh>
      ))}
    </group>
  );
}

function GreenRidge({ position, scale, color, theme }: Props & { position: [number, number, number]; scale: [number, number, number]; color: string }) {
  return (
    <group position={position} scale={scale} rotation={[0, Math.PI / 4, 0]}>
      <mesh>
        <coneGeometry args={[1, 1.7, 5]} />
        <meshStandardMaterial color={color} roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.48, 0]} scale={[0.48, 0.32, 0.48]}>
        <coneGeometry args={[1, 1.1, 5]} />
        <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.78} />
      </mesh>
    </group>
  );
}

export function WoodsProps({ theme }: Props) {
  return (
    <>
      {ridgePositions.map((position, index) => (
        <GreenRidge
          key={`woods-ridge-${index}`}
          position={position}
          scale={[2.2 + index * 0.2, 2.0 + index * 0.16, 2.2 + index * 0.2]}
          color={index % 2 ? theme.scene.mountainB : theme.scene.mountainA}
          theme={theme}
        />
      ))}
      {treePositions.map((position, index) => (
        <WoodlandTree key={`woods-tree-${index}`} position={position} scale={0.72 + (index % 4) * 0.16} theme={theme} />
      ))}
      {logPositions.map((position, index) => (
        <group key={`woods-log-${index}`} position={position} rotation={[0, index * 0.72, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.11, 0.13, 0.96, 8]} />
            <meshStandardMaterial color="#5a3a24" roughness={0.86} />
          </mesh>
          <mesh position={[0, 0, 0.5]}>
            <circleGeometry args={[0.12, 8]} />
            <meshBasicMaterial color="#b88350" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {treePositions.slice(0, 7).map((position, index) => (
        <mesh key={`woods-bush-${index}`} castShadow position={[position[0] + 0.45, 0.14, position[2] - 0.35]} scale={0.38 + (index % 3) * 0.1}>
          <dodecahedronGeometry args={[0.36, 0]} />
          <meshStandardMaterial color={theme.scene.treeCap} roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}
