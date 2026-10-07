"use client";

import { useState } from "react";
import { MacDesktop } from "@/components/portfolio/mac-desktop";
import { StoryIntro } from "@/components/portfolio/story-intro";

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (entered) return <MacDesktop />;
  return <StoryIntro onEnter={() => setEntered(true)} />;
}
