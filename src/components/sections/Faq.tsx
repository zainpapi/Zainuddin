"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/site";
import { revealUp, stagger, viewportOnce, ease } from "@/lib/motion";
import { Icon } from "@/components/Icon";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section relative">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="eyebrow mb-4"
            >
              FAQ
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="display-2"
            >
              Questions,{" "}
              <span className="gradient-text">answered</span>.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={revealUp}
              className="mt-5 max-w-sm text-sm text-ink-lo"
            >
              Still curious about something? The contact form below is always
              open.
            </motion.p>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger(0.1)}
            className="space-y-3"
          >
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.li key={f.q} variants={revealUp}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="surface flex w-full items-center justify-between gap-4 rounded-[var(--radius)] px-6 py-5 text-left transition-colors hover:border-amber/30"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-ink">{f.q}</span>
                    <span className="shrink-0 text-amber">
                      <Icon
                        name={isOpen ? "minus" : "plus"}
                        width={18}
                        height={18}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 pt-3 text-sm leading-relaxed text-ink-lo">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
