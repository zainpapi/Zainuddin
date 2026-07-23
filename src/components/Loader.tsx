"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

/** Full-screen loader shown until first paint is ready. */
export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-bg-0"
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-2xl"
          >
            <span className="gradient-text">ZU</span>
            <span className="text-ink-dim">.dev</span>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease }}
            className="mt-4 h-px w-40 origin-left bg-gradient-to-r from-indigo via-violet to-teal"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
