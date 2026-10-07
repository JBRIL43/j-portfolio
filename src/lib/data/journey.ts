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
      "My journey started with my first PC in 2022. Curiosity quickly turned into experimentation — learning how websites and apps worked, breaking things, fixing them, and eventually building my own.",
    tag: "Origin",
  },
  {
    year: "2022",
    title: "Finding My Path at University",
    description:
      "I went to university looking for a career that suited me and found Information Systems at Hawassa University. My first language was C++ — hard, with zero coding experience. I learned to break problems down, debug, and keep trying, and discovered I enjoyed building things more than just studying them.",
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
