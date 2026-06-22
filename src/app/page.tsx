import { LoadingScreen } from "@/components/portfolio/loading-screen";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Journey } from "@/components/portfolio/journey";
import { WhatIDo } from "@/components/portfolio/what-i-do";
import { Projects } from "@/components/portfolio/projects";
import { PeakCraft } from "@/components/portfolio/peak-craft";
import { Skills } from "@/components/portfolio/skills";
import { BeyondCoding } from "@/components/portfolio/beyond-coding";
import { Awards } from "@/components/portfolio/awards";
import { Vision } from "@/components/portfolio/vision";
import { Testimonials } from "@/components/portfolio/testimonials";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { ParticleField } from "@/components/portfolio/particle-field";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Global cursor-reactive particle background (behind all sections) */}
      <ParticleField />
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Journey />
        <WhatIDo />
        <Projects />
        <PeakCraft />
        <Skills />
        <BeyondCoding />
        <Awards />
        <Vision />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
