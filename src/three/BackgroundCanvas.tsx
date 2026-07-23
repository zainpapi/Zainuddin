"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import { GlassObjects } from "./GlassObjects";
import { AuroraShader } from "./AuroraShader";
import { ParticleField } from "./ParticleField";
import { ParallaxRig } from "./ParallaxRig";
import { usePrefersReducedMotion, useIsTouch } from "@/lib/hooks";

type Props = {
  intensity?: number;
};

/**
 * The fixed, full-viewport background WebGL canvas.
 * NO postprocessing (bloom/vignette removed for performance).
 * NO transmission material (replaced with cheap shader blob).
 */
export function BackgroundCanvas({ intensity = 0 }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 7], fov: 38 }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["#0b0b0d"]} />
        <fog attach="fog" args={["#0b0b0d", 9, 18]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[5, 6, 4]} intensity={20} color="#e8a33d" />
        <pointLight position={[-6, -2, 2]} intensity={12} color="#c97f1e" />

        <Suspense fallback={null}>
          <AuroraShader intensity={intensity} />

          <ParallaxRig strength={reducedMotion ? 0 : 0.5}>
            <GlassObjects />
            {!isTouch && !reducedMotion && <ParticleField count={120} />}
          </ParallaxRig>

          <Preload all />
        </Suspense>

        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
