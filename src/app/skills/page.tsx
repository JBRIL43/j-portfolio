import type { Metadata } from "next";
import { SkillsInteractive } from "@/components/portfolio/skills-interactive";

export const metadata: Metadata = {
  title: "Technical Skills",
  description:
    "An interactive look at the stack — frontend, backend, programming, and tools.",
};

export default function SkillsPage() {
  return (
    <div className="pt-24">
      <SkillsInteractive />
    </div>
  );
}
