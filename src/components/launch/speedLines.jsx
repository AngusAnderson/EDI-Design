import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SpeedLines({ active }) {
  const linesRef = useRef();

  const lines = useMemo(() => {
    return Array.from({ length: 95 }, (_, index) => {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 12;
      const z = -Math.random() * 35;
      const length = 0.8 + Math.random() * 3;

      return {
        id: index,
        position: [x, y, z],
        scale: [0.015, length, 0.015],
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!linesRef.current || !active) return;

    linesRef.current.children.forEach((line) => {
      line.position.z += delta * 32;

      if (line.position.z > 3) {
        line.position.z = -35;
      }
    });
  });

  if (!active) return null;

  return (
    <group ref={linesRef}>
      {lines.map((line) => (
        <mesh
          key={line.id}
          position={line.position}
          scale={line.scale}
          rotation={[0, 0, Math.PI / 2]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#9bb6ff"
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}