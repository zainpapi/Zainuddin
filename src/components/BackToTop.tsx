"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";
import { Icon } from "@/components/Icon";

/** Floating button that appears after scrolling and returns to top. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.3, ease }}
          className="surface-raised fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-amber transition-colors hover:border-amber/50"
          aria-label="Back to top"
        >
          <Icon name="up" width={18} height={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
