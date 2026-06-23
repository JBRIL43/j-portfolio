import type { Metadata } from "next";
import { Projects } from "@/components/portfolio/projects";

export const metadata: Metadata = {
  title: "Featured Projects",
  description:
    "Real, shipped products — PCIC Management System, HU Student Debt System, LibraryHub, Stock Management System, IoT Campus Fault Reporting App, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <Projects />
    </div>
  );
}
