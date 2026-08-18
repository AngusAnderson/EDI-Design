import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/earth-cartoon.glb";

export function CartoonEarth({
  scale = 1.05,
  position = [1.4, 0, 0],
  rotationSpeed = 0.14,
  animationName = "Animación",
}) {
  const rotationRef = useRef();
  const modelRef = useRef();

  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, modelRef);

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = new THREE.Vector3();

    box.getCenter(center);
    modelRef.current.position.sub(center);
  }, [scene]);

  useEffect(() => {
    const availableNames = Object.keys(actions);

    const action =
      actions[animationName] ??
      actions[availableNames[0]];

    if (!action) {
      console.warn("No playable animation action was found.");
      return;
    }

    action.reset().fadeIn(0.35).play();

    return () => {
      action.fadeOut(0.35);
      action.stop();
    };
  }, [actions, animationName]);

  useFrame((_, delta) => {
    if (rotationRef.current) {
      rotationRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group
      ref={rotationRef}
      position={position}
      scale={scale}
    >
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);