"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/site";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";
import { OnyxCard } from "@/components/OnyxCard";
import { Icon } from "@/components/Icon";

const accentMap: Record<Project["accent"], { glow: string; text: string }> = {
  indigo: { glow: "rgba(232,163,61,0.25)", text: "text-amber" },
  violet: { glow: "rgba(232,163,61,0.25)", text: "text-amber" },
  teal: { glow: "rgba(232,163,61,0.2)", text: "text-amber" },
};

export function Projects() {
  return (
    <section id="work" className="section relative">
      <div className="container-x">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="eyebrow mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="display-2 max-w-2xl"
            >
              Things I&apos;ve{" "}
              <span className="gradient-text">shipped</span>.
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.14)}
          className="space-y-6"
        >
          {projects.map((p, i) => {
            const a = accentMap[p.accent];
            const flip = i % 2 === 1;
            return (
              <motion.div key={p.id} variants={revealUp}>
                <OnyxCard
                  as="article"
                  max={5}
                  className="group grid items-stretch overflow-hidden rounded-[var(--radius)] md:grid-cols-2"
                >
                  {/* Visual side */}
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.name} (live site, opens in new tab)`}
                    className={`relative flex min-h-[220px] items-center justify-center overflow-hidden p-10 md:min-h-[280px] ${
                      flip ? "md:order-2" : ""
                    }`}
                    style={{
                      background: `radial-gradient(120% 100% at 30% 20%, ${a.glow}, transparent 60%), linear-gradient(135deg, rgba(232,163,61,0.04), transparent)`,
                    }}
                  >
                    <span className="font-display relative text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
                      <span className={a.text}>{p.name.charAt(0)}</span>
                      <span className="text-ink/25">{p.name.slice(1)}</span>
                    </span>
                    <span className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-bg-0/60 px-3 py-1 text-xs text-ink-mid opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Visit <Icon name="arrow" width={13} height={13} />
                    </span>
                  </a>

                  {/* Text side */}
                  <div className="flex flex-col justify-center gap-4 border-t border-line p-7 sm:p-9 md:border-l md:border-t-0">
                    <div className="flex items-center gap-3 text-xs text-ink-lo">
                      <span>{p.year}</span>
                      <span className="h-1 w-1 rounded-full bg-ink-dim" />
                      <span>{p.role}</span>
                    </div>
                    <h3 className="font-display text-2xl text-ink sm:text-3xl">
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-mid">
                      {p.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {p.stack.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-amber/15 bg-amber-soft/50 px-2.5 py-1 text-xs text-ink-mid"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-amber"
                    >
                      View live project <Icon name="arrow" width={14} height={14} />
                    </a>
                  </div>
                </OnyxCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
