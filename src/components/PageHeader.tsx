"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { revealUp, viewportOnce } from "@/lib/motion";

/** Standard hero header used at the top of inner pages. */
export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <header className="container-x relative pb-10 pt-36 sm:pt-44">
      <motion.div initial="hidden" animate="show" variants={revealUp}>
        <Link
          href="/"
          className="link-underline mb-8 inline-flex items-center gap-1.5 text-sm text-ink-lo transition-colors hover:text-amber"
        >
          <Icon name="arrow" width={14} height={14} className="rotate-180" />
          Back to home
        </Link>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="show"
        variants={revealUp}
        className="eyebrow mb-5"
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        initial="hidden"
        animate="show"
        viewport={viewportOnce}
        variants={revealUp}
        className="display-1 max-w-4xl text-balance"
      >
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </motion.h1>

      {description && (
        <motion.p
          initial="hidden"
          animate="show"
          variants={revealUp}
          className="mt-6 max-w-2xl text-lg text-ink-mid"
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
