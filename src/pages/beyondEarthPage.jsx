import { Suspense, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { Navbar } from "../components/navbar/navbar";
import { DestinationSelector } from "../components/launch/destinationSelector";
import { LaunchScene } from "../components/launch/LaunchScene";
import { destinations } from "../components/launch/destinationData";

import "../components/launch/launchScene.css";

export function BeyondEarthPage() {
  const [selectedDestination, setSelectedDestination] =
    useState(null);

  const [phase, setPhase] = useState("idle");

  const handlePhaseChange = useCallback((nextPhase) => {
    setPhase(nextPhase);
  }, []);

  function handleDestinationSelect(destination) {
    if (phase !== "idle") return;

    setSelectedDestination(destination);
    setPhase("countdown");
  }

  function resetJourney() {
    setSelectedDestination(null);
    setPhase("idle");
  }

  return (
    <main className="launch-page">
      <Navbar />

      <Canvas
        className="launch-page__canvas"
        camera={{
          position: [0, 0.1, 7],
          fov: 48,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <LaunchScene
            phase={phase}
            destination={selectedDestination}
            onPhaseChange={handlePhaseChange}
          />
        </Suspense>
      </Canvas>

      <section className="launch-page__content">
        {phase === "idle" && (
          <>
            <p className="launch-page__eyebrow">
              Spaceport control
            </p>

            <h1 className="launch-page__title">
              Choose your
              <span> destination.</span>
            </h1>

            <p className="launch-page__description">
              Board the EDI orbital service and select your next world.
            </p>

            <DestinationSelector
              destinations={destinations}
              onSelect={handleDestinationSelect}
            />
          </>
        )}

        {phase === "countdown" && selectedDestination && (
          <div className="launch-page__status">
            <p className="launch-page__eyebrow">
              Launch sequence initiated
            </p>

            <h1 className="launch-page__title">
              Departing for
              <span> {selectedDestination.name}.</span>
            </h1>

            <p className="launch-page__description">
              Calibrating navigation and preparing orbital departure.
            </p>
          </div>
        )}

        {phase === "launching" && (
          <div className="launch-page__status">
            <p className="launch-page__eyebrow">
              Departure in progress
            </p>

            <h1 className="launch-page__title">
              Hold
              <span> tight.</span>
            </h1>
          </div>
        )}

        {phase === "travelling" && (
          <div className="launch-page__status">
            <p className="launch-page__eyebrow">
              In transit
            </p>

            <h1 className="launch-page__title">
              Crossing
              <span> the void.</span>
            </h1>
          </div>
        )}

        {phase === "orbiting" && selectedDestination && (
          <article className="launch-page__destination-info">
            <p className="launch-page__eyebrow">
              Arrival confirmed
            </p>

            <h1 className="launch-page__title">
              Welcome to
              <span> {selectedDestination.name}.</span>
            </h1>

            <p className="launch-page__description">
              {selectedDestination.description}
            </p>

            <dl className="launch-page__facts">
              <div>
                <dt>Service</dt>
                <dd>{selectedDestination.type}</dd>
              </div>

              <div>
                <dt>Journey time</dt>
                <dd>{selectedDestination.journey}</dd>
              </div>

              <div>
                <dt>From</dt>
                <dd>{selectedDestination.price}</dd>
              </div>
            </dl>

            <button
              className="launch-page__reset"
              type="button"
              onClick={resetJourney}
            >
              Choose another destination
            </button>
          </article>
        )}
      </section>
    </main>
  );
}