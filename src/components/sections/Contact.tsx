"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";
import { Icon } from "@/components/Icon";

export function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "opening" | "copied">(
    "idle",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = `Project inquiry from ${name}`;
    const body = `Hi Zain,\n\n${message}\n\nReply to: ${email}`;

    setFormStatus("opening");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setFormStatus("copied");
      window.setTimeout(() => setFormStatus("idle"), 2200);
    } catch {
      setFormStatus("idle");
    }
  }

  return (
    <section id="contact" className="section relative">
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.12)}
          className="surface-raised relative mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-lg)] p-10 text-center sm:p-16"
        >
          {/* amber glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,163,61,0.2), transparent 70%)",
            }}
          />

          <motion.p variants={revealUp} className="eyebrow relative mb-5">
            Contact
          </motion.p>
          <motion.h2
            variants={revealUp}
            className="display-2 relative text-balance"
          >
            Let&apos;s build{" "}
            <span className="gradient-text">something</span>.
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="relative mx-auto mt-5 max-w-md text-ink-mid"
          >
            Got an idea, a project, or just want to say hi? My inbox is always
            open.
          </motion.p>

          <motion.div
            variants={revealUp}
            className="relative mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg-0 transition-transform hover:scale-[1.03]"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="surface inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-amber/40"
            >
              {formStatus === "copied" ? "Email copied" : "Copy email"}
            </button>
            <a
              href={site.socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="surface inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-amber/40"
            >
              GitHub <Icon name="arrow" width={14} height={14} />
            </a>
          </motion.div>

          <motion.ul
            variants={revealUp}
            className="relative mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-lo"
          >
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-amber"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.form
            variants={revealUp}
            onSubmit={handleSubmit}
            className="relative mx-auto mt-12 grid max-w-xl gap-4 text-left"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs uppercase tracking-widest text-ink-lo">
                Name
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  placeholder="Your name"
                  className="rounded-xl border border-line bg-bg-1 px-4 py-3 text-sm normal-case tracking-normal text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-amber"
                />
              </label>
              <label className="grid gap-2 text-xs uppercase tracking-widest text-ink-lo">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-xl border border-line bg-bg-1 px-4 py-3 text-sm normal-case tracking-normal text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-amber"
                />
              </label>
            </div>
            <label className="grid gap-2 text-xs uppercase tracking-widest text-ink-lo">
              Project brief
              <textarea
                name="message"
                required
                minLength={10}
                rows={5}
                placeholder="What are you thinking about building?"
                className="resize-y rounded-xl border border-line bg-bg-1 px-4 py-3 text-sm normal-case tracking-normal text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-amber"
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-dim" aria-live="polite">
                {formStatus === "opening"
                  ? "Opening your email app..."
                  : formStatus === "copied"
                    ? "Email address copied to your clipboard."
                    : "You will review the draft before sending."}
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg-0 transition-transform hover:scale-[1.03]"
              >
                Build the email
              </button>
            </div>
          </motion.form>
        </motion.div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-ink-dim sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Built with Next.js, React
            Three Fiber &amp; a lot of curiosity.
          </p>
          <p className="text-xs">{site.location}</p>
        </footer>
      </div>
    </section>
  );
}
