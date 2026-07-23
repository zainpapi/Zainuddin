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
 * Solid onyx surface card that tilts in 3D toward the cursor.
 * No backdrop-blur — zero performance cost from CSS filters.
 */
type OnyxCardProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  raised?: boolean;
  as?: "div" | "article" | "section" | "li";
  style?: MotionStyle;
};

export function OnyxCard({
  children,
  className = "",
  max = 7,
  raised = false,
  as = "div",
  style,
}: OnyxCardProps) {
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
      className={`surface relative overflow-hidden rounded-[var(--radius)] transition-shadow duration-500 ${
        raised ? "surface-raised" : ""
      } ${className}`}
    >
      {children}
    </MotionTag>
  );
}
