import type { Metadata } from "next";
import { Journey } from "@/components/portfolio/journey";

export const metadata: Metadata = {
  title: "My Journey",
  description:
    "From a first PC to a BSc in Information Systems at Hawassa University — the real story, milestone by milestone.",
};

export default function JourneyPage() {
  return (
    <div className="pt-24">
      <Journey />
    </div>
  );
}
