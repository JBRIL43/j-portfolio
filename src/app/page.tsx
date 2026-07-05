"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/portfolio/loading-screen";
import { Hero } from "@/components/portfolio/hero";
import { StoryDrawer } from "@/components/portfolio/story-drawer";
import { HomeExplore } from "@/components/portfolio/home-explore";

// Dynamically import 3D with SSR disabled
const Portfolio3D = dynamic(
  () =>
    import("@/components/portfolio/3d/experience").then(
      (mod) => mod.Portfolio3D,
    ),
  { ssr: false, loading: () => null },
);

export default function Home() {
  const [is3DMode, setIs3DMode] = useState(false);
  const [show3D, setShow3D] = useState(false);

  // Check device capabilities on mount
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hasWebGL =
      typeof window !== "undefined" && !!window.WebGLRenderingContext;

    // Enable 3D only on capable devices
    const can3D = !isMobile && !prefersReducedMotion && hasWebGL;
    setIs3DMode(can3D);

    if (can3D) {
      // Auto-show 3D after a brief delay
      const timer = setTimeout(() => setShow3D(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle scroll to update section based on scroll position
  const handleScroll = () => {
    // This is handled in the 3D component
  };

  if (!is3DMode) {
    return (
      <>
        <LoadingScreen />
        <Hero />
        <StoryDrawer />
        <HomeExplore />
      </>
    );
  }

  // Show 3D experience
  if (is3DMode && show3D) {
    return (
      <>
        {/* Loading screen first */}
        <LoadingScreen />

        {/* 3D Canvas Background */}
        <div className="fixed inset-0 z-0">
          <Portfolio3D />
        </div>

        {/* Scrollable height for the 3D experience */}
        <div
          className="relative z-10"
          style={{ height: "600vh" }}
          onScroll={handleScroll}
        >
          {/* Each section is 100vh for scrolling */}
          <div className="h-screen" data-section="hero" />
          <div className="h-screen" data-section="about" />
          <div className="h-screen" data-section="projects" />
          <div className="h-screen" data-section="skills" />
          <div className="h-screen" data-section="peakcraft" />
          <div className="h-screen" data-section="contact" />
        </div>

        {/* Navigation indicators */}
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
          {["Hero", "About", "Projects", "Skills", "PeakCraft", "Contact"].map(
            (label, i) => (
              <button
                key={label}
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight * i,
                    behavior: "smooth",
                  });
                }}
                className="group relative w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-[oklch(0.62_0.2_255)] transition-all"
                aria-label={`Go to ${label}`}
              >
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-[10px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {label}
                </span>
              </button>
            ),
          )}
        </nav>

        {/* Scroll progress bar */}
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-50">
          <div
            className="h-full bg-gradient-to-r from-[oklch(0.62_0.2_255)] to-[oklch(0.78_0.16_220)] transition-all duration-150"
            id="scroll-progress"
          />
        </div>

        {/* 2D Version Link */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShow3D(false);
            setIs3DMode(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed top-4 right-4 z-50 glass px-4 py-2 rounded-full text-xs text-white/70 hover:text-white transition-colors"
        >
          Switch to 2D
        </a>

        {/* Scroll listener to update progress bar */}
        <ScrollProgress />
      </>
    );
  }

  // Default 2D experience
  return (
    <>
      <LoadingScreen />
      <Hero />
      <StoryDrawer />
      <HomeExplore />
    </>
  );
}

// Scroll progress component
function ScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const progressBar = document.getElementById("scroll-progress");
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
