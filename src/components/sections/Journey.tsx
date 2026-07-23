"use client";

import { motion } from "framer-motion";
import { journey } from "@/data/site";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";

export function Journey() {
  return (
    <section id="journey" className="section relative">
      <div className="container-x">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="eyebrow mb-4"
        >
          Journey
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="display-2 mb-16 max-w-2xl"
        >
          Where I&apos;ve been, <span className="gradient-text">where I&apos;m going</span>.
        </motion.h2>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.18)}
          className="relative mx-auto max-w-3xl"
        >
          {/* center line */}
          <span
            aria-hidden
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-amber/25 to-transparent sm:left-1/2"
          />
          {journey.map((m, i) => (
            <motion.li
              key={m.year}
              variants={revealUp}
              className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0
                  ? "sm:ml-0 sm:pr-12 sm:text-right"
                  : "sm:ml-auto sm:pl-12"
              }`}
            >
              {/* node */}
              <span
                aria-hidden
                className={`absolute top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-amber ring-4 ring-amber/25 sm:top-2 ${
                  i % 2 === 0
                    ? "left-3 sm:left-auto sm:-right-[7px]"
                    : "left-3 sm:-left-[7px]"
                }`}
              />
              <div className="surface rounded-[var(--radius)] p-6">
                <div className="mono text-sm text-amber">{m.year}</div>
                <h3 className="mt-1 font-display text-lg text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-lo">
                  {m.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
