import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { CartoonEarth } from "./cartoonEarth";
import { Starfield } from "./starfield";
import "./hero.css";

function Scene({ autoOrbit = true }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (autoOrbit && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />

      <directionalLight
        position={[5, 3, 5]}
        intensity={1.2}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.4}
        minDistance={3}
        maxDistance={12}
      />

      <Starfield />

      <group ref={groupRef}>
        <CartoonEarth
          earthColor="#2a70ff"
          cloudColor="#e6f0ff"
          rotationSpeed={0.002}
          cloudSpeed={0.003}
          radius={1}
        />
      </group>
    </>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <Canvas
        className="hero__canvas"
        camera={{ position: [0, 1.2, 6], fov: 50 }}
        dpr={[1, 2]}
      >
        <Scene autoOrbit />
      </Canvas>

      <div className="hero__overlay">
        <p className="hero__eyebrow">Explore the world</p>

        <h1 className="hero__title">
          A planet in
          <span> motion.</span>
        </h1>

        <p className="hero__description">
          A stylised interactive Earth, floating through a procedural field of
          stars.
        </p>

        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href="#explore">
            Explore Earth
          </a>

          <a className="hero__button hero__button--secondary" href="#about">
            Learn more
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  );
}