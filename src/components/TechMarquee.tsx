"use client";

import { motion } from "framer-motion";

const techs = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Three.js",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "Supabase",
  "HTML5",
  "CSS3",
  "Node.js",
];

export function TechMarquee() {
  // double the list for seamless loop
  const items = [...techs, ...techs];

  return (
    <section className="overflow-hidden border-y border-line py-5">
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          },
        }}
      >
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex shrink-0 items-center gap-3 text-sm text-ink-dim"
          >
            <span className="h-1 w-1 rounded-full bg-amber/60" aria-hidden />
            {t}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
