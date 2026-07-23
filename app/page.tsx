import { Nav } from "@/components/Nav";
import { Loader } from "@/components/Loader";
import { AuroraIntensity } from "@/components/AuroraIntensity";
import { TechMarquee } from "@/components/TechMarquee";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Journey } from "@/components/sections/Journey";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <AuroraIntensity />
      <Nav />

      <main id="main" className="relative z-10">
        <Hero />
        <Statement />
        <TechMarquee />
        <Services />
        <Skills />
        <Projects />
        <Testimonials />
        <Journey />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
