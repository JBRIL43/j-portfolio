import type { Metadata } from "next";
import { Vision } from "@/components/portfolio/vision";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "Building products, communities, and businesses that create meaningful impact across Africa and beyond.",
};

export default function VisionPage() {
  return (
    <div className="pt-24">
      <Vision />
    </div>
  );
}
