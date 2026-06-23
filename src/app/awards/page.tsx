import type { Metadata } from "next";
import { Awards } from "@/components/portfolio/awards";

export const metadata: Metadata = {
  title: "Awards & Certifications",
  description:
    "A growing collection of certifications, awards, and formal recognition earned through study, community work, and real projects.",
};

export default function AwardsPage() {
  return (
    <div className="pt-24">
      <Awards />
    </div>
  );
}
