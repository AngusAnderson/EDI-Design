import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { CartoonEarth } from "./cartoonEarth";
import { Starfield } from "./starfield";
import { Moon } from "./moon";
import "./hero.css";

import { Navbar } from "../navbar/navbar";

function Scene() {
  const { viewport } = useThree();

  const isMobile = viewport.width < 7;

  const earthPosition = isMobile
    ? [0.7, -0.25, 0]
    : [2.1, 0.05, 0];

  const earthScale = isMobile ? 0.72 : 1.05;

  return (
    <>
      <ambientLight intensity={1.3} />

      <directionalLight
        position={[5, 4, 5]}
        intensity={2.5}
        color="#ffffff"
      />

      <pointLight
        position={[-4, 1, -3]}
        intensity={1.1}
        color="#587cff"
      />

      <Starfield />

      <CartoonEarth
        position={earthPosition}
        scale={earthScale}
        rotationSpeed={0.14}
      />

        <Moon
        earthPosition={earthPosition}
        distance={2.1}
        scale={0.03}
        orbitSpeed={0.18}
        rotationSpeed={0.2}
        />

      <OrbitControls
        enableDamping
        dampingFactor={0.07}
        enablePan={false}
        autoRotate={false}
        minDistance={4}
        maxDistance={9}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
        target={earthPosition}
      />
    </>
  );
}

export function Hero() {
  return (
    <section className="hero">

      <Navbar />

      <Canvas
        className="hero__canvas"
        camera={{
          position: [2.1, 0.2, 6.2],
          fov: 47,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="hero__overlay">
        <p className="hero__eyebrow">Explore Worlds Beyond</p>

        <h1 className="hero__title">
          Edinburgh
          <span> Spaceport & Aerodrome</span>
        </h1>

        <p className="hero__description">
          A gateway for terrestrial journeys & orbital adventures
        </p>

        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href="#explore">
            Beyond Earth
          </a>

          <a className="hero__button hero__button--secondary" href="#about">
            Across Earth
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