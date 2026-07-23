"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/** Animated "scroll" affordance for the hero. */
export function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1, ease }}
      className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2"
      aria-hidden
    >
      <div className="flex flex-col items-center gap-2">
        <span className="mono text-[0.65rem] tracking-widest text-ink-dim uppercase">Scroll</span>
        <div className="surface flex h-9 w-5 items-start justify-center rounded-full p-1">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease }}
            className="h-1.5 w-1.5 rounded-full bg-amber"
          />
        </div>
      </div>
    </motion.div>
  );
}
