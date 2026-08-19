import {
  Dumbbell,
  Pencil,
  BookOpen,
  Telescope,
  TrendingUp,
  Moon,
  type LucideIcon,
} from "lucide-react";

export type Interest = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const interests: Interest[] = [
  {
    icon: Dumbbell,
    title: "Fitness",
    description:
      "Training discipline that carries into every line of code and every decision.",
  },
  {
    icon: Pencil,
    title: "Drawing",
    description:
      "Sketching ideas before they become products — design starts on paper.",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description:
      "Books on technology, psychology, and faith that sharpen how I think.",
  },
  {
    icon: Telescope,
    title: "Technology Exploration",
    description:
      "Tinkering with new tools and frameworks to stay ahead of the curve.",
  },
  {
    icon: TrendingUp,
    title: "Personal Growth",
    description:
      "Building habits and systems to compound into a better version of me.",
  },
  {
    icon: Moon,
    title: "Islamic Values & Discipline",
    description:
      "Faith grounds my purpose, discipline, and how I lead and serve others.",
  },
];
