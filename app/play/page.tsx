"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { OnyxCard } from "@/components/OnyxCard";
import { usePrefersReducedMotion, useIsTouch } from "@/lib/hooks";

/* ---------------- Interactive particle swarm ---------------- */
const SWARM_COUNT = 60;

function seededValue(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function Swarm({
  color,
  spread,
  targetIndex,
  active,
  reducedMotion,
  onCollect,
}: {
  color: string;
  spread: number;
  targetIndex: number;
  active: boolean;
  reducedMotion: boolean;
  onCollect: (index: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // pre-compute base positions
  const bases = useMemo(
    () =>
      Array.from({ length: SWARM_COUNT }, (_, index) => {
        const r = spread * (0.4 + seededValue(index, 1) * 0.6);
        const theta = seededValue(index, 2) * Math.PI * 2;
        const phi = Math.acos(2 * seededValue(index, 3) - 1);
        return new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
      }),
    [spread],
  );
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.12, 0), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.6,
      }),
    [color],
  );
  const targetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fff4d6",
        emissive: color,
        emissiveIntensity: 2.4,
        roughness: 0.2,
        metalness: 0.7,
      }),
    [color],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const base = bases[i];
      const m = child as THREE.Mesh;
      const motion = reducedMotion ? 0.04 : 0.3;
      m.position.set(
        base.x + Math.sin(t * 0.6 + i) * motion,
        base.y + Math.cos(t * 0.5 + i) * motion,
        base.z + Math.sin(t * 0.4 + i * 0.5) * motion,
      );
      m.rotation.x = (reducedMotion ? 0.03 : 0.2) * t + i;
      m.rotation.y = (reducedMotion ? 0.02 : 0.15) * t + i;
    });
    groupRef.current.rotation.y = reducedMotion ? 0 : t * 0.1;
    if (!reducedMotion) {
      groupRef.current.rotation.y +=
        (state.pointer.x * 0.5 - groupRef.current.rotation.y) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {bases.map((_, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={active && i === targetIndex ? targetMaterial : material}
          scale={active && i === targetIndex ? 1.35 : 1}
          onPointerDown={(event) => {
            event.stopPropagation();
            onCollect(i);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "crosshair";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        />
      ))}
    </group>
  );
}

/* ---------------- The interactive playground ---------------- */
function Playground({
  color,
  spread,
  targetIndex,
  active,
  reducedMotion,
  onCollect,
}: {
  color: string;
  spread: number;
  targetIndex: number;
  active: boolean;
  reducedMotion: boolean;
  onCollect: (index: number) => void;
}) {
  return (
    <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line grain">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <color attach="background" args={["#0b0b0d"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={25} color={color} />
        <Suspense fallback={null}>
          <Float
            speed={reducedMotion ? 0.1 : 1.4}
            rotationIntensity={reducedMotion ? 0.04 : 0.4}
            floatIntensity={reducedMotion ? 0.08 : 0.8}
          >
            <Swarm
              color={color}
              spread={spread}
              targetIndex={targetIndex}
              active={active}
              reducedMotion={reducedMotion}
              onCollect={onCollect}
            />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-4 mono text-xs text-ink-dim">
        move your cursor — the swarm reacts
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function PlayPage() {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const [color, setColor] = useState("#e8a33d");
  const [spread, setSpread] = useState(3);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [active, setActive] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0);

  const goal = 10;

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setActive(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  function startRound() {
    setScore(0);
    setMisses(0);
    setTimeLeft(45);
    setTargetIndex(Math.floor(Math.random() * SWARM_COUNT));
    setActive(true);
  }

  function collect(index: number) {
    if (!active) return;
    if (index !== targetIndex) {
      setMisses((current) => current + 1);
      return;
    }

    setScore((current) => {
      const nextScore = current + 1;
      if (nextScore >= goal) setActive(false);
      return nextScore;
    });
    setTargetIndex((current) => {
      let next = Math.floor(Math.random() * SWARM_COUNT);
      while (next === current) next = Math.floor(Math.random() * SWARM_COUNT);
      return next;
    });
  }

  const presets = [
    { name: "Amber", c: "#e8a33d" },
    { name: "Cyan", c: "#22d3ee" },
    { name: "Violet", c: "#a78bfa" },
    { name: "Lime", c: "#a3e635" },
    { name: "Rose", c: "#fb7185" },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Playground"
        title="Things I"
        highlight="play with."
        description="A little interactive experiment. Tweak the controls and watch the swarm respond. This is where I learn by messing around."
      />

      <section className="container-x pb-24">
        <Playground
          color={color}
          spread={spread}
          targetIndex={targetIndex}
          active={active}
          reducedMotion={reducedMotion}
          onCollect={collect}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div
            className="surface flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[var(--radius)] px-5 py-4"
            aria-live="polite"
          >
            <div>
              <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-dim">
                Signal hunt
              </div>
              <div className="mt-1 font-display text-xl text-ink">
                {score} <span className="text-ink-dim">/ {goal} found</span>
              </div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div className="mono text-xs text-ink-lo">
              {active ? `${timeLeft}s remaining` : score >= goal ? "Round clear" : "Ready when you are"}
            </div>
            <div className="mono text-xs text-ink-dim">misses {misses}</div>
          </div>
          <button
            type="button"
            onClick={startRound}
            className="ring-amber rounded-full bg-amber px-6 py-3 text-sm font-semibold text-[#17120a] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {active ? "Restart hunt" : score >= goal ? "Play again" : "Start hunt"}
          </button>
        </div>

        {/* Controls */}
        <OnyxCard raised className="mt-6 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-lo">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.c}
                    type="button"
                    onClick={() => setColor(p.c)}
                    aria-label={`${p.name} color`}
                    className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      color === p.c ? "border-white" : "border-transparent"
                    }`}
                    style={{ backgroundColor: p.c }}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 sm:max-w-xs">
              <label
                htmlFor="spread"
                className="mb-2 block text-xs uppercase tracking-widest text-ink-lo"
              >
                Spread — {spread.toFixed(1)}
              </label>
              <input
                id="spread"
                type="range"
                min={1.5}
                max={5}
                step={0.1}
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-bg-3 accent-amber"
              />
            </div>
          </div>

          {reducedMotion && (
            <p className="mt-4 text-xs text-ink-dim">
              Reduced motion is on — the swarm stays calm.
            </p>
          )}
          {isTouch && (
            <p className="mt-4 text-xs text-ink-dim">
              Tip: drag on the canvas to influence the swarm.
            </p>
          )}
        </OnyxCard>

        {/* Notes */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <OnyxCard className="p-6">
            <div className="mono text-xs text-amber">01 / Stack</div>
            <p className="mt-2 text-sm text-ink-lo">
              React Three Fiber + Three.js, all procedural. No external models.
            </p>
          </OnyxCard>
          <OnyxCard className="p-6">
            <div className="mono text-xs text-amber">02 / Idea</div>
            <p className="mt-2 text-sm text-ink-lo">
              Find the bright signal crystals before the clock runs out. Click
              or tap the highlighted shard to score.
            </p>
          </OnyxCard>
          <OnyxCard className="p-6">
            <div className="mono text-xs text-amber">03 / Next</div>
            <p className="mt-2 text-sm text-ink-lo">
              The scene stays lightweight with shared geometry, adaptive pixel
              density, and calm motion when your device asks for it.
            </p>
          </OnyxCard>
        </div>
      </section>
    </PageShell>
  );
}
