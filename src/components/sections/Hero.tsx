"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/data/site";
import { ease } from "@/lib/motion";
import { ScrollHint } from "@/components/ScrollHint";
import { SplitText } from "@/components/SplitText";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-6"
    >
      <div className="container-x grid items-center gap-10 py-24 sm:gap-16 lg:grid-cols-[1fr_1.1fr]">
        {/* Text side */}
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="ring-amber mb-7 inline-flex items-center gap-2 rounded-full bg-amber-soft px-4 py-1.5 text-xs text-amber"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            Available for collaborations
          </motion.span>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease, delay: 0.15 }}
            className="display-1"
          >
            <SplitText
              text="Zain Uddin"
              className="gradient-text"
              delay={0.25}
              stagger={0.045}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="mt-7 max-w-xl text-balance text-lg text-ink-mid sm:text-xl"
          >
            {site.positioning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="inline-flex items-center rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg-0 transition-transform hover:scale-[1.03]"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="surface inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-amber/40"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="mt-12 flex items-center gap-3 text-xs text-ink-dim"
          >
            <span>{site.role}</span>
            <span className="h-1 w-1 rounded-full bg-ink-dim" />
            <span>{site.location}</span>
          </motion.div>
        </div>

        {/* Photo side — your portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.3, ease, delay: 0.25 }}
          className="relative"
        >
          <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] border border-line grain lg:ml-auto">
            <Image
              src="/zain.png"
              alt="Zain Uddin — portrait"
              fill
              priority
              sizes="(max-width: 640px) 85vw, 45vw"
              className="object-cover object-top"
            />
            {/* warm gradient overlay at bottom for text readability if needed */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-0/80 to-transparent"
            />
          </div>
          {/* amber glow behind photo */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-12 -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(232,163,61,0.12), transparent 60%)",
            }}
          />
        </motion.div>
      </div>

      <ScrollHint />
    </section>
  );
}
