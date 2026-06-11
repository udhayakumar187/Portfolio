import type { ThemeConfig } from "@/data/themes";

type Props = {
  theme: ThemeConfig;
};

const cactusPositions: [number, number, number][] = [
  [-6.0, 0, 3.8],
  [-3.4, 0, 5.3],
  [-1.1, 0, 2.8],
  [2.7, 0, 0.5],
  [4.8, 0, -2.7],
  [-2.6, 0, -4.8],
  [6.4, 0, 2.2]
];

const dunePositions: [number, number, number][] = [
  [-7.2, -0.06, -5.4],
  [-3.8, -0.08, -7.6],
  [0.4, -0.06, -8.2],
  [4.6, -0.08, -6.5],
  [7.2, -0.06, -3.7],
  [-5.2, -0.08, 6.2]
];

const rockPositions: [number, number, number][] = [
  [-4.4, 0.08, 3.4],
  [-0.7, 0.08, 4.7],
  [2.8, 0.08, 1.1],
  [5.4, 0.08, -2.5],
  [-2.2, 0.08, -5.2],
  [6.6, 0.08, 4.0]
];

function Cactus({ position, scale, theme }: Props & { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1.04, 7]} />
        <meshStandardMaterial color={theme.scene.treeBase} roughness={0.86} />
      </mesh>
      <mesh castShadow position={[0.18, 0.58, 0]} rotation={[0, 0, -0.72]}>
        <cylinderGeometry args={[0.04, 0.052, 0.44, 7]} />
        <meshStandardMaterial color={theme.scene.treeLayer} roughness={0.86} />
      </mesh>
      <mesh castShadow position={[-0.18, 0.7, 0]} rotation={[0, 0, 0.72]}>
        <cylinderGeometry args={[0.04, 0.052, 0.46, 7]} />
        <meshStandardMaterial color={theme.scene.treeLayer} roughness={0.86} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.9} />
      </mesh>
    </group>
  );
}

function DryShrub({ position, theme }: Props & { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} castShadow position={[0, 0.1, 0]} rotation={[0.8, (index * Math.PI * 2) / 3, 0.28]}>
          <cylinderGeometry args={[0.012, 0.018, 0.62, 5]} />
          <meshStandardMaterial color={theme.scene.treeCap} roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

export function DesertProps({ theme }: Props) {
  return (
    <>
      <mesh position={[5.8, 5.6, -10.2]}>
        <sphereGeometry args={[0.74, 18, 12]} />
        <meshBasicMaterial color={theme.scene.campLight} transparent opacity={0.72} />
      </mesh>
      {dunePositions.map((position, index) => (
        <mesh key={`dune-${index}`} receiveShadow position={position} scale={[2.2 + index * 0.14, 0.28, 1.2 + (index % 3) * 0.18]}>
          <sphereGeometry args={[1, 16, 8]} />
          <meshStandardMaterial color={index % 2 ? theme.scene.terrain : theme.scene.terrainOverlay} roughness={0.96} />
        </mesh>
      ))}
      {cactusPositions.map((position, index) => (
        <Cactus key={`cactus-${index}`} position={position} scale={0.78 + (index % 3) * 0.2} theme={theme} />
      ))}
      {rockPositions.map((position, index) => (
        <group key={`desert-rock-${index}`} position={position} scale={0.58 + (index % 3) * 0.16}>
          <mesh castShadow rotation={[0.12, index * 0.6, 0.18]}>
            <dodecahedronGeometry args={[0.36, 0]} />
            <meshStandardMaterial color={theme.scene.mountainCap} roughness={0.9} metalness={0.02} />
          </mesh>
          {index % 2 === 0 ? <DryShrub position={[0.42, 0, -0.1]} theme={theme} /> : null}
        </group>
      ))}
    </>
  );
}
