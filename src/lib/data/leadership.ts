import {
  Megaphone,
  Palette,
  HeartHandshake,
  ShieldCheck,
  Layers,
  type LucideIcon,
} from "lucide-react";

export type Leadership = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const leadershipPillars: Leadership[] = [
  {
    icon: Megaphone,
    title: "Event Promotion",
    description:
      "Designed and shipped promotion campaigns that filled rooms and grew attendance for every Peak Craft event.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Owned the visual identity — posters, social, and tickets — giving the community a recognizable, premium look.",
  },
  {
    icon: HeartHandshake,
    title: "Community Engagement",
    description:
      "Built genuine connections with members, mentors, and partners that turned a club into a movement.",
  },
  {
    icon: ShieldCheck,
    title: "Brand Management",
    description:
      "Protected and evolved the Peak Craft brand across teams, platforms, and touchpoints.",
  },
  {
    icon: Layers,
    title: "Cross-Team Collaboration",
    description:
      "Aligned PR with design, dev, and events teams to ship coherent, high-quality experiences.",
  },
];

export const leadershipStats = [
  { label: "Role", value: "Head of PR" },
  { label: "Org", value: "Peak Craft" },
  { label: "Events supported", value: "30+" },
  { label: "Reach", value: "500+ students" },
];
