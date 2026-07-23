"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/site";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";
import { OnyxCard } from "@/components/OnyxCard";
import { Icon, type IconName } from "@/components/Icon";

export function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="container-x">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="eyebrow mb-4"
            >
              Skills
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="display-2 max-w-2xl"
            >
              A toolkit for <span className="gradient-text">building &amp; shaping</span> the web.
            </motion.h2>
          </div>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={revealUp}
            className="max-w-xs text-sm text-ink-lo"
          >
            Four clusters, one goal: turn ideas into interfaces that feel
            effortless.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.12)}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((s) => (
            <motion.div key={s.id} variants={revealUp} className="group">
              <OnyxCard
                as="article"
                max={10}
                className="h-full p-6 transition-shadow duration-500 group-hover:shadow-[var(--shadow-amber)]"
              >
                <div
                  aria-hidden
                  className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-soft text-amber ring-1 ring-amber/20"
                >
                  <Icon name={s.icon as IconName} width={20} height={20} />
                </div>

                <h3 className="font-display text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-lo">
                  {s.blurb}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-amber/15 bg-amber-soft/50 px-2.5 py-1 text-xs text-ink-mid"
                    >
                      {skill}
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
