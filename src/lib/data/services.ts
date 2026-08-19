import {
  Code2,
  Palette,
  Users,
  PenTool,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
  /** Longer-form bullet points shown in the "more details" dialog. */
  details: string[];
  /** Tech / tools used within this discipline. */
  tools?: string[];
};

export const services: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Production-grade web apps with React, Next.js, and Node — fast, accessible, and built to scale.",
    highlights: ["React & Next.js", "API design", "Performance"],
    details: [
      "Architect and ship full-stack web applications end-to-end — from database schema to polished UI.",
      "Build modern frontends with React, Next.js (App Router), and TypeScript, with SSR/ISR for speed and SEO.",
      "Design REST APIs and backend services with Node.js and Express, backed by MongoDB and Prisma.",
      "Obsess over performance: Core Web Vitals, code-splitting, caching, and accessibility built in from day one.",
      "Shipped real products: PCIC Management System, HU Student Debt System, Stock Management System, LibraryHub.",
    ],
    tools: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Prisma", "Tailwind"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Interfaces that feel inevitable. From wireframes to pixel-perfect systems in Figma.",
    highlights: ["Design systems", "Prototyping", "Accessibility"],
    details: [
      "Translate ideas into wireframes, prototypes, and pixel-perfect interfaces in Figma.",
      "Build reusable design systems with consistent tokens, components, and documentation.",
      "Apply user-centered design principles — research-informed layouts, clear hierarchy, and intuitive flows.",
      "Ensure accessibility (contrast, keyboard nav, semantic structure) across every screen.",
      "Certified in UX App Design with Figma (Udemy) and applied it across Peak Craft branding and project UIs.",
    ],
    tools: ["Figma", "Design Systems", "Prototyping", "Accessibility", "Canva"],
  },
  {
    icon: Users,
    title: "Community Leadership",
    description:
      "Growing tech communities through events, mentorship, and a strong shared culture.",
    highlights: ["Event design", "Mentorship", "Culture"],
    details: [
      "Lead and grow university tech communities through events, mentorship, and shared culture.",
      "Served as Head of Public Relations at Peak Craft — managing brand, events, and cross-team collaboration.",
      "Design and run community events (Huawei ICT Academy sessions, meet-and-greets, workshops).",
      "Mentor newer members and advise tracks (Code Crafters, Cyber Crew, Turing Tribe, Pixel Peeps).",
      "Turn scattered groups into a cohesive movement with one clear story and identity.",
    ],
    tools: ["Event design", "Mentorship", "Brand management", "Cross-team collaboration", "Canva"],
  },
  {
    icon: PenTool,
    title: "Content Creation",
    description:
      "Crafting stories, visuals, and technical content that move people to action.",
    highlights: ["Storytelling", "Visuals", "Writing"],
    details: [
      "Craft stories, visuals, and technical content that move people to action.",
      "Break down web dev, design, and community-building concepts into clear, visual posts and threads.",
      "Design promotional graphics, posters, and recognition materials (Peak Craft event suite).",
      "Building DevNotes — a learning-in-public content series with YouTube + Telegram channels coming soon.",
      "Blend design sensibility with clear writing to make complex ideas accessible.",
    ],
    tools: ["Writing", "Visual design", "Canva", "Figma", "Storytelling"],
  },
  {
    icon: Share2,
    title: "Social Media Strategy",
    description:
      "Positioning brands and communities with campaigns that actually convert attention into trust.",
    highlights: ["Campaigns", "Brand voice", "Analytics"],
    details: [
      "Position brands and communities with campaigns that convert attention into trust.",
      "Manage social media presence for Peak Craft — planning, scheduling, and analyzing engagement.",
      "Define a consistent brand voice across platforms and coordinate cross-team promotion.",
      "Use analytics to iterate: track reach, engagement, and conversion to improve every campaign.",
      "Hold a Professional Diploma in Public Relations and PR Management (Udemy) applied in practice.",
    ],
    tools: ["Social media management", "Campaign planning", "Analytics", "Brand voice", "PR", "Canva"],
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Development",
    description:
      "Using AI as a force multiplier — shipping faster, learning deeper, building smarter.",
    highlights: ["Prompt design", "Tooling", "Automation"],
    details: [
      "Use AI as a force multiplier — shipping faster, learning deeper, building smarter.",
      "Design effective prompts and workflows that integrate LLMs into real development cycles.",
      "Build AI-assisted features (chat, search, content generation) into web and mobile products.",
      "Automate repetitive tasks — boilerplate, tests, docs — to focus on higher-leverage work.",
      "Competed in the Cursor Hackathon Addis Ababa 2025, building with AI-assisted tooling under time pressure.",
    ],
    tools: ["Prompt design", "LLM integration", "Cursor", "Automation", "AI tooling"],
  },
];
