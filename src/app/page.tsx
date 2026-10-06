"use client";

import { Hero } from "@/components/portfolio/hero";
import { HomeExplore } from "@/components/portfolio/home-explore";
import { Journey } from "@/components/portfolio/journey";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <HomeExplore />
    </>
  );
}
