import type { Metadata } from "next";
import { Testimonials } from "@/components/portfolio/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Words from mentors, teammates, and clients — with more coming soon.",
};

export default function TestimonialsPage() {
  return (
    <div className="pt-24">
      <Testimonials />
    </div>
  );
}
