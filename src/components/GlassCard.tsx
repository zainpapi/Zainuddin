"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { usePrefersReducedMotion, useIsTouch } from "@/lib/hooks";

/**
 * A frosted-glass surface that tilts in 3D toward the cursor.
 * Falls back to a flat card on touch devices and reduced-motion.
 */
type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  /** tilt strength in degrees */
  max?: number;
  as?: "div" | "article" | "section" | "li";
  style?: MotionStyle;
};

export function GlassCard({
  children,
  className = "",
  max = 8,
  as = "div",
  style,
}: GlassCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const enabled = !reducedMotion && !isTouch;

  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 150,
    damping: 18,
  });
  const sheen = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(180px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.12), transparent 60%)`,
  );

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: enabled ? rotateX : 0,
        rotateY: enabled ? rotateY : 0,
        ...style,
      }}
      className={`glass relative overflow-hidden rounded-[var(--radius)] ${className}`}
    >
      {/* moving specular sheen follows the cursor */}
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: sheen,
          }}
        />
      )}
      {children}
    </MotionTag>
  );
}
