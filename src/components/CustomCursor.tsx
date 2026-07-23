"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "@/lib/hooks";

/**
 * Custom cursor — small amber dot + larger follower ring.
 * Hidden on touch devices (uses a pointer check).
 * Scales up when hovering interactive elements.
 */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 500, damping: 28 });
  const sy = useSpring(my, { stiffness: 500, damping: 28 });
  const fx = useSpring(mx, { stiffness: 150, damping: 15 });
  const fy = useSpring(my, { stiffness: 150, damping: 15 });

  // track hover on interactive elements for scale
  const hovering = useMotionValue(0);
  const scale = useSpring(hovering, { stiffness: 300, damping: 20 });
  const dotScale = useMotionValue(1);

  useEffect(() => {
    if (isTouch) return;

    function onMove(e: MouseEvent) {
      mx.set(e.clientX);
      my.set(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const t = (e.target as HTMLElement);
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]',
      );
      hovering.set(interactive ? 1 : 0);
    }

    function onLeave() {
      hovering.set(0);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch, mx, my, hovering]);

  if (isTouch) return null;

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {/* follower ring */}
      <motion.div
        className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/40"
        style={{ left: fx, top: fy, scale }}
      />
      {/* dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber"
        style={{ left: sx, top: sy, scale: dotScale }}
      />
    </div>
  );
}
