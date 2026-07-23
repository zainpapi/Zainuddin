"use client";

import { motion } from "framer-motion";
import { stats, testimonials } from "@/data/site";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";
import { StatCounter } from "@/components/StatCounter";

export function Testimonials() {
  return (
    <section id="proof" className="section relative">
      <div className="container-x">
        {/* Animated stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mb-20 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={revealUp}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-14 max-w-2xl">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="eyebrow mb-4"
          >
            Kind Words
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="display-2"
          >
            What people{" "}
            <span className="gradient-text">say</span>.
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.12)}
          className="grid gap-5 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={revealUp}
              className="surface relative rounded-[var(--radius)] p-7"
            >
              <span
                aria-hidden
                className="font-display absolute right-6 top-3 text-6xl leading-none text-amber/15"
              >
                &rdquo;
              </span>
              <blockquote className="relative text-ink-mid">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-soft font-display text-sm text-amber"
                >
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">
                    {t.name}
                  </span>
                  <span className="block text-xs text-ink-dim">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
