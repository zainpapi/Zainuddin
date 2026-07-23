import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { OnyxCard } from "@/components/OnyxCard";
import { Icon, type IconName } from "@/components/Icon";
import { site, journey, skills, services } from "@/data/site";
import { Faq } from "@/components/sections/Faq";

export const metadata = {
  title: "About — Zain Uddin",
  description:
    "9th-grade self-taught front-end developer and copywriter from Quetta, Pakistan.",
};

const principles = [
  {
    title: "Ship, then refine",
    body: "Done and live beats perfect and private. I get things out, then iterate based on real use.",
  },
  {
    title: "Taste compounds",
    body: "The easing curve, the kerning, the empty state — small choices stack into something that feels intentional.",
  },
  {
    title: "Words are UX",
    body: "A clear headline does more than a clever one. I write copy that helps people decide.",
  },
  {
    title: "Learn in public",
    body: "I share what I build and what I break. Feedback is the fastest teacher I have.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="The human behind"
        highlight="the code."
      />

      <section className="container-x pb-16">
        {/* Bio + portrait */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          <OnyxCard raised className="p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-ink-mid">
              I&apos;m {site.name} — a 9th-grade aspiring developer and skilled
              copywriter based in {site.location}. I started with plain HTML,
              CSS, and JavaScript, and I&apos;ve been hooked ever since on the
              feeling of shipping something real.
            </p>
            <p className="mt-5 leading-relaxed text-ink-lo">
              These days I work mostly in Next.js and React, with detours into
              real-time 3D (Three.js / R3F), animation (GSAP, Framer Motion),
              and the occasional backend (Supabase). My biggest ship so far is{" "}
              <span className="text-ink">INSTANT.</span> — a full link-in-bio
              platform with AI theming and real analytics, 81+ features, all
              free.
            </p>
            <p className="mt-5 leading-relaxed text-ink-lo">
              I care about the small things: the easing of a transition, the
              weight of a headline, the focus ring on a button. I believe code
              and craft aren&apos;t separate disciplines — they&apos;re two ends
              of the same goal: making something people want to use.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6 text-sm">
              <a
                href={site.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-amber"
              >
                GitHub
              </a>
              <span className="text-ink-dim">·</span>
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-amber"
              >
                {site.email}
              </a>
              <span className="text-ink-dim">·</span>
              <span className="text-ink-lo">{site.location}</span>
            </div>
          </OnyxCard>

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line grain">
            <Image
              src="/zain.png"
              alt="Zain Uddin — portrait"
              fill
              priority
              sizes="(max-width: 640px) 90vw, 35vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="container-x pb-16">
        <p className="eyebrow mb-4">Principles</p>
        <h2 className="display-2 mb-10 max-w-2xl">
          How I <span className="gradient-text">think</span>.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <OnyxCard key={p.title} className="p-7">
              <h3 className="font-display text-lg text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-lo">
                {p.body}
              </p>
            </OnyxCard>
          ))}
        </div>
      </section>

      {/* Skills full */}
      <section className="container-x pb-16">
        <p className="eyebrow mb-4">Skills</p>
        <h2 className="display-2 mb-10 max-w-2xl">
          The <span className="gradient-text">toolkit</span>.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <OnyxCard key={s.id} className="h-full p-6">
              <div
                aria-hidden
                className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-soft text-amber ring-1 ring-amber/20"
              >
                <Icon name={s.icon as IconName} width={20} height={20} />
              </div>
              <h3 className="font-display text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-lo">{s.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.skills.map((sk) => (
                  <li
                    key={sk}
                    className="rounded-full border border-amber/15 bg-amber-soft/50 px-2.5 py-1 text-xs text-ink-mid"
                  >
                    {sk}
                  </li>
                ))}
              </ul>
            </OnyxCard>
          ))}
        </div>
      </section>

      {/* Journey timeline */}
      <section className="container-x pb-16">
        <p className="eyebrow mb-4">Journey</p>
        <h2 className="display-2 mb-10 max-w-2xl">
          The <span className="gradient-text">timeline</span>.
        </h2>
        <ol className="relative space-y-6 border-l border-amber/25 pl-8">
          {journey.map((m) => (
            <li key={m.year} className="relative">
              <span
                aria-hidden
                className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-amber ring-4 ring-amber/25"
              />
              <OnyxCard className="p-6">
                <div className="mono text-sm text-amber">{m.year}</div>
                <h3 className="mt-1 font-display text-lg text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-lo">
                  {m.detail}
                </p>
              </OnyxCard>
            </li>
          ))}
        </ol>
      </section>

      {/* Services */}
      <section className="container-x pb-16">
        <p className="eyebrow mb-4">Services</p>
        <h2 className="display-2 mb-10 max-w-2xl">
          What I can <span className="gradient-text">do for you</span>.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <OnyxCard key={s.id} className="h-full p-6">
              <div
                aria-hidden
                className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-soft text-amber ring-1 ring-amber/20"
              >
                <Icon name={s.icon as IconName} width={20} height={20} />
              </div>
              <h3 className="font-display text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-lo">{s.blurb}</p>
            </OnyxCard>
          ))}
        </div>
      </section>

      <Faq />
    </PageShell>
  );
}
