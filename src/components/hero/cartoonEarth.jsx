
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function CartoonEarth({
  earthColor = "#2266ff",
  cloudColor = "#ffffff",
  rotationSpeed = 0.002,
  cloudSpeed = 0.003,
  radius = 1,
}) {
  const earthRef = useRef();
  const cloudRef = useRef();

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += cloudSpeed;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshToonMaterial color={earthColor} />
      </mesh>

      <mesh ref={cloudRef}>
        <sphereGeometry args={[radius * 1.02, 64, 64]} />
        <meshToonMaterial
          color={cloudColor}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius * 1.04, 64, 64]} />
        <meshBasicMaterial
          color="#001133"
          side={THREE.BackSide}
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}