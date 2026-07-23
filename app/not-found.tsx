import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-5">Error 404</p>
      <h1 className="display-1">
        <span className="gradient-text">Lost in space.</span>
      </h1>
      <p className="mt-6 max-w-md text-ink-mid">
        The page you&apos;re looking for drifted off orbit. Let&apos;s get you
        back to familiar ground.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg-0 transition-transform hover:scale-[1.03]"
        >
          <Icon name="arrow" width={14} height={14} className="rotate-180" />
          Back home
        </Link>
        <Link
          href="/projects"
          className="surface inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-amber/40"
        >
          See my work
        </Link>
      </div>
    </main>
  );
}
