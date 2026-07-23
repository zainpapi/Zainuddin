"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";

const stats = [
  { k: "9th grade", v: "Self-taught dev" },
  { k: "Quetta, PK", v: "Based & building" },
  { k: "5+ ships", v: "Live projects" },
];

export function Statement() {
  return (
    <section id="about" className="section relative">
      <div className="container-x">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="eyebrow mb-8"
        >
          About
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={revealUp}
          className="display-2 max-w-4xl text-balance"
        >
          I build{" "}
          <span className="gradient-text">interactive web experiences</span> —
          fast, beautiful, and unmistakably human.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.15, 0.2)}
          className="mt-14 grid gap-5 md:grid-cols-[1.4fr_1fr]"
        >
          <motion.div variants={revealUp} className="surface rounded-[var(--radius)] p-8">
            <p className="text-lg leading-relaxed text-ink-mid">
              I&apos;m {site.name.split(" ")[0]} — a {`9th-grade`} aspiring
              developer and skilled copywriter from {site.location}. I care about
              the small things: the easing of a transition, the weight of a
              headline, the focus ring on a button. My work lives where{" "}
              <span className="text-ink">code meets craft</span>.
            </p>
            <p className="mt-5 leading-relaxed text-ink-lo">
              From shipping a full AI-powered link-in-bio platform to crafting
              clean copy and UI, I&apos;m learning out loud and building things
              people actually want to use.
            </p>
          </motion.div>

          <motion.ul
            variants={revealUp}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1"
          >
            {stats.map((s) => (
              <li
                key={s.k}
                className="surface group rounded-[var(--radius)] p-5 transition-colors hover:bg-bg-3"
              >
                <div className="font-display text-2xl text-ink">{s.k}</div>
                <div className="mt-1 text-sm text-ink-lo">{s.v}</div>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
