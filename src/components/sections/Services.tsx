"use client";

import { motion } from "framer-motion";
import { services } from "@/data/site";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";
import { OnyxCard } from "@/components/OnyxCard";
import { Icon, type IconName } from "@/components/Icon";

export function Services() {
  return (
    <section id="services" className="section relative">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="eyebrow mb-4"
          >
            What I Do
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="display-2"
          >
            Four ways I can{" "}
            <span className="gradient-text">help you ship</span>.
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, i) => (
            <motion.div key={s.id} variants={revealUp} className="group">
              <OnyxCard
                as="article"
                max={8}
                raised
                className="flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between">
                  <div
                    aria-hidden
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-soft text-amber ring-1 ring-amber/20"
                  >
                    <Icon name={s.icon as IconName} width={22} height={22} />
                  </div>
                  <span className="mono text-xs text-ink-dim">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-lo">
                  {s.blurb}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-xs text-ink-mid"
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-amber"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </OnyxCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
