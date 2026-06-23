import type { Metadata } from "next";
import { WhatIDo } from "@/components/portfolio/what-i-do";

export const metadata: Metadata = {
  title: "What I Do",
  description:
    "Six disciplines — web development, UI/UX design, community leadership, content creation, social media strategy, and AI-assisted development.",
};

export default function WorkPage() {
  return (
    <div className="pt-24">
      <WhatIDo />
    </div>
  );
}
