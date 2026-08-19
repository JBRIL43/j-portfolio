export type SkillCategory = {
  id: string;
  label: string;
  description: string;
  skills: { name: string; level: number; note: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Crafting interfaces users love to live in.",
    skills: [
      { name: "React", level: 88, note: "Component architecture & hooks" },
      { name: "Next.js", level: 85, note: "App Router, SSR, ISR" },
      { name: "JavaScript", level: 90, note: "Modern ES, async patterns" },
      { name: "HTML", level: 92, note: "Semantic & accessible" },
      { name: "CSS", level: 88, note: "Layout, animations" },
      { name: "Tailwind", level: 90, note: "Design-token systems" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs and data layers that hold it all together.",
    skills: [
      { name: "Node.js", level: 80, note: "REST & real-time services" },
      { name: "MongoDB", level: 78, note: "Schema design & queries" },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    description: "Languages that shaped how I think.",
    skills: [
      { name: "Java", level: 75, note: "OOP & DSA foundations" },
      { name: "Python", level: 80, note: "Automation & scripting" },
      { name: "C++", level: 70, note: "Systems thinking" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    description: "The kit I reach for every day.",
    skills: [
      { name: "Git", level: 85, note: "Version control & flow" },
      { name: "Linux", level: 78, note: "CLI & dev environments" },
      { name: "Figma", level: 88, note: "Design & prototyping" },
      { name: "Canva", level: 86, note: "Graphics & social media design" },
    ],
  },
];
