import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Starfield({ count = 1400, radius = 70 }) {
  const starsRef = useRef();

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radiusOffset = radius * (0.55 + Math.random() * 0.45);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      values[index * 3] =
        radiusOffset * Math.sin(phi) * Math.cos(theta);

      values[index * 3 + 1] =
        radiusOffset * Math.sin(phi) * Math.sin(theta);

      values[index * 3 + 2] =
        radiusOffset * Math.cos(phi);
    }

    return values;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.006;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#dce6ff"
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.82}
        depthWrite={false}
      />
    </points>
  );
}