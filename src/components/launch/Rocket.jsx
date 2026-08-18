import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ROCKET_PATH = "/models/rocket.glb";

export function Rocket({ phase, destination }) {
  const rocketRef = useRef();
  const modelRef = useRef();

  const { scene } = useGLTF(ROCKET_PATH);

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = new THREE.Vector3();

    box.getCenter(center);
    modelRef.current.position.sub(center);
  }, [scene]);

  useFrame((state, delta) => {
    if (!rocketRef.current) return;

    const elapsed = state.clock.getElapsedTime();

    if (phase === "idle" || phase === "countdown") {
      rocketRef.current.position.set(
        Math.sin(elapsed * 0.8) * 0.08,
        Math.sin(elapsed * 1.6) * 0.12,
        0,
      );

      rocketRef.current.rotation.z =
        Math.sin(elapsed * 1.1) * 0.05;

      return;
    }

    if (phase === "launching") {
      rocketRef.current.position.y += delta * 8;
      rocketRef.current.rotation.z *= 0.88;
      return;
    }

    if (phase === "travelling") {
      rocketRef.current.position.set(0, -15, 0);
      return;
    }

    if (phase === "orbiting" && destination) {
      const orbitRadius = destination.size + 0.85;
      const orbitAngle = elapsed * 0.7;

      rocketRef.current.position.set(
        Math.cos(orbitAngle) * orbitRadius,
        Math.sin(orbitAngle * 1.4) * 0.25,
        Math.sin(orbitAngle) * orbitRadius,
      );

      rocketRef.current.rotation.set(
        0,
        -orbitAngle + Math.PI / 2,
        Math.sin(orbitAngle) * 0.15,
      );
    }
  });

  return (
    <group ref={rocketRef} scale={0.75}>
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(ROCKET_PATH);