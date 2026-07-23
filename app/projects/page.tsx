"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { OnyxCard } from "@/components/OnyxCard";
import { Icon } from "@/components/Icon";
import { projects } from "@/data/site";
import { revealUp, stagger } from "@/lib/motion";

export default function ProjectsPage() {
  // build unique stack filter list
  const filters = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.stack.includes(active)),
    [active],
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Selected Work"
        title="My"
        highlight="projects."
        description="Everything I've shipped — from a full AI-powered link-in-bio platform to fast, focused web tools. Filter by tech to see how I think across stacks."
      />

      <section className="container-x pb-20">
        {/* filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                active === f
                  ? "border-amber bg-amber text-bg-0"
                  : "border-line text-ink-mid hover:border-amber/40 hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial="hidden"
          animate="show"
          variants={stagger(0.08)}
          className="grid gap-5 md:grid-cols-2"
        >
          {filtered.map((p) => (
            <motion.div key={p.id} variants={revealUp}>
              <OnyxCard
                as="article"
                max={6}
                raised
                className="group flex h-full flex-col p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl">
                    <span className="text-amber">{p.name.charAt(0)}</span>
                    <span className="text-ink/30">{p.name.slice(1)}</span>
                  </span>
                  <span className="mono text-xs text-ink-dim">{p.year}</span>
                </div>

                <div className="mt-2 text-xs text-ink-lo">{p.role}</div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-mid">
                  {p.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className={`rounded-full border px-2.5 py-1 text-xs ${
                        s === active
                          ? "border-amber/40 bg-amber-soft text-amber"
                          : "border-amber/15 bg-amber-soft/50 text-ink-mid"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-amber"
                >
                  Visit live <Icon name="external" width={14} height={14} />
                </a>
              </OnyxCard>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-ink-dim">
            No projects with that tech yet — check back soon.
          </p>
        )}
      </section>
    </PageShell>
  );
}
