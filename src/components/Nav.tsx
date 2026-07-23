"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/site";
import { ease } from "@/lib/motion";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    window.queueMicrotask(() => setOpen(false));
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "surface-raised" : "border border-transparent"
        }`}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-ink"
        >
          <span className="gradient-text">ZU</span>
          <span className="text-ink-dim">.dev</span>
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            const isHash = l.href.startsWith("#");
            const Comp = isHash ? "a" : Link;
            return (
              <li key={l.href}>
                <Comp
                  {...(isHash ? { href: l.href } : { href: l.href })}
                  className={`link-underline text-sm transition-colors ${
                    active
                      ? "text-amber"
                      : "text-ink-mid hover:text-ink"
                  }`}
                >
                  {l.label}
                </Comp>
              </li>
            );
          })}
        </ul>

        <Link
          href="/#contact"
          className="ring-amber hidden rounded-full bg-amber-soft px-4 py-2 text-sm font-medium text-amber transition-colors hover:bg-amber/20 sm:inline-block"
        >
          Get in touch
        </Link>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="surface flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-4 bg-ink transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-ink transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-ink transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="surface-raised absolute left-4 right-4 top-[4.5rem] space-y-1 rounded-2xl p-3 md:hidden"
          >
            {navLinks.map((l) => {
              const isHash = l.href.startsWith("#");
              const Comp = isHash ? "a" : Link;
              return (
                <li key={l.href}>
                  <Comp
                    {...(isHash ? { href: l.href } : { href: l.href })}
                    className={`block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-amber-soft ${
                      isActive(l.href)
                        ? "text-amber"
                        : "text-ink-mid hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Comp>
                </li>
              );
            })}
            <li className="px-4 pt-2 text-xs text-ink-dim">
              Quetta, Pakistan
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
