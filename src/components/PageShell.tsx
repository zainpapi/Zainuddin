import { Nav } from "@/components/Nav";
import { AuroraIntensity } from "@/components/AuroraIntensity";
import { PageFooter } from "@/components/PageFooter";

/** Standard shell for inner pages: nav + bg canvas + footer. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuroraIntensity />
      <Nav />
      <main id="main" className="relative z-10 min-h-[80vh]">
        {children}
      </main>
      <PageFooter />
    </>
  );
}
