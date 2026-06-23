import type { Metadata } from "next";
import { BeyondCoding } from "@/components/portfolio/beyond-coding";

export const metadata: Metadata = {
  title: "Beyond Coding",
  description:
    "The habits that fuel the work — fitness, drawing, reading, technology exploration, personal growth, and Islamic values.",
};

export default function BeyondPage() {
  return (
    <div className="pt-24">
      <BeyondCoding />
    </div>
  );
}
