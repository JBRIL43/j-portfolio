import type { Metadata } from "next";
import { Contact } from "@/components/portfolio/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project, a community idea, or just want to connect? My inbox is always open.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Contact />
    </div>
  );
}
