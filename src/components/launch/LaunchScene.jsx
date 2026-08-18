import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { Starfield } from "../hero/starfield";
import { SpeedLines } from "./speedLines";

const ROCKET_PATH = "/models/rocket.glb";

function Rocket({ phase, destination }) {
  const rocketRef = useRef();
  const modelRef = useRef();

  const { scene } = useGLTF(ROCKET_PATH);

  useEffect(() => {
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
    <group ref={rocketRef} scale={0.1}>
      <group 
        ref={modelRef}
        rotation={[0,0, -Math.PI / 2]}
      >
        <primitive object={scene} />
      </group>
    </group>
  );
}

function DestinationPlanet({ destination }) {
  const planetRef = useRef();

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={planetRef}>
      <mesh>
        <sphereGeometry args={[destination.size, 64, 64]} />
        <meshStandardMaterial
          color={destination.color}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      <mesh scale={1.04}>
        <sphereGeometry args={[destination.size, 64, 64]} />
        <meshBasicMaterial
          color={destination.ringColor}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function CameraDirector({ phase, destination }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (phase === "idle" || phase === "countdown") {
      camera.position.lerp(
        new THREE.Vector3(0, 0.1, 7),
        delta * 2,
      );

      camera.lookAt(0, 0, 0);
      return;
    }

    if (phase === "launching") {
      const shake = 0.045;

      camera.position.set(
        (Math.random() - 0.5) * shake,
        0.1 + (Math.random() - 0.5) * shake,
        7 + (Math.random() - 0.5) * shake,
      );

      camera.lookAt(0, 1, 0);
      return;
    }

    if (phase === "travelling") {
      camera.position.lerp(
        new THREE.Vector3(0, 0, 5),
        delta * 1.5,
      );

      camera.lookAt(0, 0, -8);
      return;
    }

    if (phase === "orbiting" && destination) {
      camera.position.lerp(
        new THREE.Vector3(0, 0.4, 6),
        delta * 1.5,
      );

      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

function PhaseController({ phase, onPhaseChange }) {
  useEffect(() => {
    if (phase !== "countdown") return undefined;

    const timer = window.setTimeout(() => {
      onPhaseChange("launching");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (phase !== "launching") return undefined;

    const timer = window.setTimeout(() => {
      onPhaseChange("travelling");
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (phase !== "travelling") return undefined;

    const timer = window.setTimeout(() => {
      onPhaseChange("orbiting");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [phase, onPhaseChange]);

  return null;
}

export function LaunchScene({
  phase,
  destination,
  onPhaseChange,
}) {
  return (
    <>
      <color attach="background" args={["#050710"]} />

      <ambientLight intensity={0.75} />

      <directionalLight
        position={[4, 5, 4]}
        intensity={2.2}
        color="#ffffff"
      />

      <pointLight
        position={[0, -1, 2]}
        intensity={phase === "launching" ? 10 : 2}
        color="#ff764f"
        distance={8}
      />

      <Starfield count={1800} radius={75} />

      <SpeedLines active={phase === "travelling"} />

      {phase === "orbiting" && destination && (
        <DestinationPlanet destination={destination} />
      )}

      <Rocket
        phase={phase}
        destination={destination}
      />

      <CameraDirector
        phase={phase}
        destination={destination}
      />

      <PhaseController
        phase={phase}
        onPhaseChange={onPhaseChange}
      />
    </>
  );
}

useGLTF.preload(ROCKET_PATH);