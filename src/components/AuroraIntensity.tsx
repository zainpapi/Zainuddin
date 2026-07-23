"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BackgroundCanvas = dynamic(
  () => import("@/three/BackgroundCanvas").then((m) => m.BackgroundCanvas),
  { ssr: false },
);

/**
 * Wraps the WebGL background and cranks the aurora intensity up as the
 * user approaches the Contact section, for a subtle finale.
 */
export function AuroraIntensity() {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      // ramp up in the last 25% of the page
      setIntensity(p > 0.75 ? (p - 0.75) / 0.25 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <BackgroundCanvas intensity={intensity} />;
}
