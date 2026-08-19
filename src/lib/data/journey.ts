export type JourneyStep = {
  year: string;
  title: string;
  description: string;
  tag: string;
  /** Optional supporting photo for the milestone. */
  image?: string;
};

export const journey: JourneyStep[] = [
  {
    year: "2022",
    title: "Discovering Technology",
    description:
      "My journey started when I got my first PC. I began exploring everything — tearing apart how apps and websites worked, spending late nights figuring out how technology actually fits together.",
    tag: "Origin",
  },
  {
    year: "2022",
    title: "Finding My Path at University",
    description:
      "I went to university to find a career that suited me and got into Information Systems at Hawassa University. I took my first programming language, C++ — it was difficult because it was my first time ever encountering code.",
    tag: "Foundations",
  },
  {
    year: "2023",
    title: "Joining Peak Craft",
    description:
      "I joined Peak Craft — a community built to support students with practical skills rather than just the theory we learn in university. A place to actually apply what we were studying.",
    tag: "Community",
  },
  {
    year: "2023",
    title: "Becoming PR Lead",
    description:
      "In the same year I became the PR Lead of Peak Craft. I promoted the club, designed event posters, shaped the branding, and helped put every Peak Craft event in front of the right people.",
    tag: "Leadership",
  },
  {
    year: "2024",
    title: "Exploring Departments & Shipping Real Projects",
    description:
      "I explored a lot of departments at Peak Craft and picked up skills in Data Science, some understanding of cyber and networking, and most of all learned the real craft of shipping websites, apps, and real projects — then started blending it all with my PR skills.",
    tag: "Craft",
  },
  {
    year: "2025",
    title: "Building My Final Year Project",
    description:
      "I built an app for my final year project for graduation — putting everything I'd learned about shipping real products into one capstone that proved the craft had stuck.",
    tag: "Capstone",
  },
  {
    year: "2026",
    title: "Graduated — BSc, Information Systems",
    description:
      "On June 27, 2026 I graduated with a BSc degree in Information Systems from Hawassa University. Now I'm exploring the world of technology even more — finding work that feeds both my curiosity and my stomach.",
    tag: "Graduation",
  },
];
