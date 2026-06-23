import type { Metadata } from "next";
import { PeakCraft } from "@/components/portfolio/peak-craft";

export const metadata: Metadata = {
  title: "Peak Craft Leadership",
  description:
    "How I led the voice of a tech community as Head of Public Relations at Peak Craft — event promotion, branding, and community engagement.",
};

export default function PeakCraftPage() {
  return (
    <div className="pt-24">
      <PeakCraft />
    </div>
  );
}
