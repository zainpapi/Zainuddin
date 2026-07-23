import Link from "next/link";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

/** Shared footer for all pages. */
export function PageFooter() {
  return (
    <footer className="container-x relative z-10 mt-10 border-t border-line py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-ink"
        >
          <span className="gradient-text">ZU</span>
          <span className="text-ink-dim">.dev</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-lo">
          <Link href="/" className="link-underline hover:text-amber">Home</Link>
          <Link href="/about" className="link-underline hover:text-amber">About</Link>
          <Link href="/projects" className="link-underline hover:text-amber">Work</Link>
          <Link href="/play" className="link-underline hover:text-amber">Play</Link>
          <a
            href={`mailto:${site.email}`}
            className="link-underline hover:text-amber"
          >
            Email
          </a>
        </nav>

        <a
          href={site.socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-ink-lo hover:text-amber"
        >
          GitHub <Icon name="external" width={13} height={13} />
        </a>
      </div>
      <p className="mt-8 text-center text-xs text-ink-dim sm:text-left">
        &copy; {new Date().getFullYear()} {site.name}. Built with Next.js &amp; React Three Fiber.
      </p>
    </footer>
  );
}
