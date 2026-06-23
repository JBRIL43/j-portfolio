import type { Metadata } from "next";
import { Skills } from "@/components/portfolio/skills";

export const metadata: Metadata = {
  title: "Technical Skills",
  description:
    "An interactive look at the stack — frontend, backend, programming, and tools.",
};

export default function SkillsPage() {
  return (
    <div className="pt-24">
      <Skills />
    </div>
  );
}
