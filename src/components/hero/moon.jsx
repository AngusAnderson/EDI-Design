import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const MODEL_PATH = "/models/low_poly_moon.glb";

export function Moon({
  earthPosition = [2.1, 0.05, 0],
  distance = 2.05,
  scale = 0.28,
  orbitSpeed = 0.18,
  rotationSpeed = 0.2,
}) {
  const orbitRef = useRef();
  const moonRef = useRef();

  const { scene } = useGLTF(MODEL_PATH);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * orbitSpeed;
    }

    if (moonRef.current) {
      moonRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={orbitRef} position={earthPosition}>
      <group ref={moonRef} position={[distance, 0, 0]} scale={scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);