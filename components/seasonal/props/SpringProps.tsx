import type { ThemeConfig } from "@/data/themes";

type Props = {
  theme: ThemeConfig;
};

const treePositions: [number, number, number][] = [
  [-6.2, 0, 4.4],
  [-4.6, 0, 1.6],
  [-3.0, 0, 5.3],
  [-1.3, 0, 3.1],
  [1.0, 0, 2.0],
  [3.0, 0, 0.4],
  [4.7, 0, -1.9],
  [5.9, 0, -3.7],
  [-3.5, 0, -2.0],
  [0.0, 0, -4.3],
  [2.4, 0, -6.2],
  [6.6, 0, 2.9]
];

const flowerPatches: [number, number, number][] = [
  [-4.2, 0.02, 4.8],
  [-1.8, 0.02, 3.2],
  [1.2, 0.02, 1.8],
  [3.8, 0.02, -1.6],
  [-0.8, 0.02, -4.2],
  [5.5, 0.02, 2.8],
  [-5.6, 0.02, -1.0],
  [2.8, 0.02, 4.6]
];

const ridgePositions: [number, number, number][] = [
  [-7.2, 0, -5.8],
  [-4.8, 0, -7.5],
  [-1.8, 0, -8.4],
  [1.8, 0, -8.0],
  [5.8, 0, -6.5],
  [7.4, 0, -4.2]
];

function BloomTree({ position, scale, theme }: Props & { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 0.72, 6]} />
        <meshStandardMaterial color={theme.scene.treeTrunk} roughness={0.88} />
      </mesh>
      <mesh castShadow position={[0, 0.96, 0]}>
        <dodecahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color={theme.scene.treeLayer} roughness={0.82} />
      </mesh>
      <mesh castShadow position={[-0.22, 1.1, 0.06]}>
        <sphereGeometry args={[0.18, 10, 8]} />
        <meshStandardMaterial color={theme.scene.treeCap} roughness={0.76} />
      </mesh>
      <mesh castShadow position={[0.24, 1.04, -0.1]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <meshStandardMaterial color={theme.scene.accent} roughness={0.76} />
      </mesh>
    </group>
  );
}

function FlowerPatch({ position, theme, index }: Props & { position: [number, number, number]; index: number }) {
  return (
    <group position={position}>
      {[0, 1, 2, 3, 4].map((flower) => {
        const angle = (flower / 5) * Math.PI * 2 + index * 0.35;
        const radius = 0.14 + (flower % 2) * 0.12;
        return (
          <mesh key={flower} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.055 + (flower % 2) * 0.018, 8]} />
            <meshBasicMaterial color={flower % 2 ? theme.scene.accent : theme.scene.secondary} transparent opacity={0.82} />
          </mesh>
        );
      })}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 16]} />
        <meshBasicMaterial color={theme.scene.treeCap} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function SpringProps({ theme }: Props) {
  return (
    <>
      <mesh position={[-5.8, 5.4, -9.8]}>
        <sphereGeometry args={[0.7, 18, 12]} />
        <meshBasicMaterial color={theme.scene.campLight} transparent opacity={0.5} />
      </mesh>
      {ridgePositions.map((position, index) => (
        <group key={`spring-ridge-${index}`} position={position} scale={[2.1 + index * 0.18, 1.8 + index * 0.14, 2.1 + index * 0.18]} rotation={[0, Math.PI / 4, 0]}>
          <mesh>
            <coneGeometry args={[1, 1.65, 5]} />
            <meshStandardMaterial color={index % 2 ? theme.scene.mountainB : theme.scene.mountainA} roughness={0.92} />
          </mesh>
          <mesh position={[0, 0.46, 0]} scale={[0.5, 0.3, 0.5]}>
            <coneGeometry args={[1, 1.08, 5]} />
            <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.8} />
          </mesh>
        </group>
      ))}
      {treePositions.map((position, index) => (
        <BloomTree key={`spring-tree-${index}`} position={position} scale={0.72 + (index % 4) * 0.15} theme={theme} />
      ))}
      {flowerPatches.map((position, index) => (
        <FlowerPatch key={`flower-patch-${index}`} position={position} index={index} theme={theme} />
      ))}
      {flowerPatches.slice(0, 5).map((position, index) => (
        <mesh key={`grass-mound-${index}`} castShadow position={[position[0] + 0.5, 0.08, position[2] - 0.35]} scale={[0.48, 0.2, 0.34]}>
          <sphereGeometry args={[1, 12, 6]} />
          <meshStandardMaterial color={theme.scene.treeBase} roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}
