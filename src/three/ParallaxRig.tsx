"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Wraps children and applies a subtle parallax driven by the pointer
 * and overall page scroll. Keeps the scene feeling three-dimensional
 * without ever being distracting.
 */
export function ParallaxRig({
  children,
  strength = 0.6,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const current = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!group.current) return;

    // pointer (-1..1)
    target.current.set(
      (state.pointer.x || 0) * strength,
      (state.pointer.y || 0) * strength,
    );

    // smoothed follow
    const lerp = Math.min(1, delta * 2.2);
    current.current.x += (target.current.x - current.current.x) * lerp;
    current.current.y += (target.current.y - current.current.y) * lerp;

    // scroll-driven vertical drift (read from body scroll fraction)
    const sc =
      typeof window !== "undefined"
        ? window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
        : 0;

    group.current.rotation.y = current.current.x * 0.18;
    group.current.rotation.x = -current.current.y * 0.14 + sc * 0.25;
    group.current.position.y = -current.current.y * 0.25;
  });

  return <group ref={group}>{children}</group>;
}
