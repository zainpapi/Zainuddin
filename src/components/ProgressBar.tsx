"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/** Thin amber progress bar fixed to the very top of the viewport. */
export function ProgressBar() {
  const [pct, setPct] = useState(0);
  const scaleX = useSpring(0, { stiffness: 120, damping: 30 });

  useEffect(() => {
    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      setPct(max > 0 ? window.scrollY / max : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    scaleX.set(pct);
  }, [pct, scaleX]);

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-amber"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
