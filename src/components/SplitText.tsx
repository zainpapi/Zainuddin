"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

/**
 * Splits text into per-character spans that animate in with a stagger.
 * Good for hero headlines. Uses aria-label for accessibility and hides
 * the visual spans from screen readers.
 */
export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}): ReactNode {
  const chars = Array.from(text);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden className="inline">
        {chars.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: "0.5em", rotateX: -40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.7,
              ease,
              delay: delay + i * stagger,
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
