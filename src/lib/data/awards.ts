import {
  Award,
  Trophy,
  Medal,
  BadgeCheck,
  Verified,
  GraduationCap,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type AwardItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: "award" | "certification" | "recognition";
  description: string;
  icon: LucideIcon;
  credentialUrl?: string;
  image?: string;
};

export const awards: AwardItem[] = [
  {
    id: "cursor-hackathon",
    title: "Cursor Hackathon — Addis Ababa 2025",
    issuer: "Cursor (Ambassador: Alpha Llencho)",
    year: "2025",
    type: "award",
    description:
      "Certificate of Achievement for competing in the Cursor Hackathon in Addis Ababa — building with AI-assisted development tooling under time pressure.",
    icon: Trophy,
    image: "/projects/certs/cursor-hackathon.png",
  },
  {
    id: "udemy-pr-management",
    title: "Professional Diploma in PR Management",
    issuer: "Udemy",
    year: "2024",
    type: "certification",
    description:
      "Completed a professional diploma covering public relations strategy, PR management, brand communication, and media relations.",
    icon: BadgeCheck,
    image: "/projects/certs/udemy-pr-management.png",
  },
  {
    id: "udemy-ux-figma",
    title: "UX App Design with Figma",
    issuer: "Udemy",
    year: "2024",
    type: "certification",
    description:
      "Learned user experience and UI design with Figma — covering design systems, prototyping, and user-centered interface design.",
    icon: BadgeCheck,
    image: "/projects/certs/udemy-ux-figma.png",
  },
  {
    id: "simplilearn-data-science",
    title: "Data Science — Certificate of Completion",
    issuer: "Simplilearn",
    year: "2024",
    type: "certification",
    description:
      "Completed Simplilearn's Data Science program covering data analysis, visualization, and foundational machine learning concepts.",
    icon: Verified,
    image: "/projects/certs/simplilearn-data-science.png",
  },
  {
    id: "alx-virtual-assistant",
    title: "ALX Virtual Assistant — Certificate of Achievement",
    issuer: "ALX (Learning)",
    year: "2024",
    type: "certification",
    description:
      "Completed the ALX Virtual Assistants program — building skills in digital assistance, communication, and remote professional support.",
    icon: GraduationCap,
    image: "/projects/certs/alx-virtual-assistant.png",
  },
  {
    id: "yeep-tech-week",
    title: "YEEP — Tech & Business Week",
    issuer: "Hawassa University · DEVENTURE Association",
    year: "2025",
    type: "certification",
    description:
      "Certificate of Participation in the Young Entrepreneur Exchange Project (YEEP) Tech and Business Week, 23–29 April 2025.",
    icon: GraduationCap,
    image: "/projects/certs/yeep-tech-week.jpg",
  },
  {
    id: "hu-british-council",
    title: "Hawassa University × British Council × EU",
    issuer: "Hawassa University · British Council · European Union",
    year: "2024",
    type: "certification",
    description:
      "Certificate awarded through a Hawassa University partnership program with the British Council and the European Union.",
    icon: GraduationCap,
    image: "/projects/certs/hu-british-council.jpg",
  },
  {
    id: "hu-participation",
    title: "Hawassa University — Certificate of Participation",
    issuer: "Hawassa University",
    year: "2024",
    type: "certification",
    description:
      "Certificate of Participation awarded by Hawassa University for active involvement in a university program.",
    icon: GraduationCap,
    image: "/projects/certs/hu-participation.jpg",
  },
  {
    id: "peakcraft-code-crafter",
    title: "Code Crafter — Certificate of Completion",
    issuer: "Peak Craft Informatics Community Club",
    year: "2023",
    type: "certification",
    description:
      "Completed the Peak Craft Code Crafters track — building foundational programming and software development skills.",
    icon: BadgeCheck,
    image: "/projects/certs/peakcraft-code-crafter.png",
  },
  {
    id: "peakcraft-data-science",
    title: "Data Science — Certificate of Completion",
    issuer: "Peak Craft Informatics Community Club",
    year: "2024",
    type: "certification",
    description:
      "Completed the Peak Craft Data Science program — covering data fundamentals and analysis within the community's track.",
    icon: BadgeCheck,
    image: "/projects/certs/peakcraft-data-science.png",
  },
  {
    id: "peakcraft-public-relation",
    title: "Public Relations — Certificate of Achievement",
    issuer: "Peak Craft Informatics Community Club",
    year: "2023",
    type: "recognition",
    description:
      "Recognized for outstanding contributions to public relations and communications within the Peak Craft community.",
    icon: Medal,
    image: "/projects/certs/peakcraft-public-relation.png",
  },
  {
    id: "peakcraft-adviser",
    title: "Adviser — Certificate of Achievement",
    issuer: "Peak Craft Informatics Community Club",
    year: "2024",
    type: "recognition",
    description:
      "Recognized for serving as an adviser within the Peak Craft community — mentoring and guiding members.",
    icon: Medal,
    image: "/projects/certs/peakcraft-adviser.png",
  },
  {
    id: "peakcraft-achievement",
    title: "Peak Craft — Certificate of Achievement",
    issuer: "Peak Craft Informatics Community Club",
    year: "2023",
    type: "recognition",
    description:
      "Certificate of Achievement awarded by Peak Craft for distinguished contributions to the community.",
    icon: Award,
    image: "/projects/certs/peakcraft-achievement.jpg",
  },
  {
    id: "rotaract-leadership",
    title: "Leadership & Team Building — Certificate of Appreciation",
    issuer: "Rotaract Club of Hawassa",
    year: "2024",
    type: "recognition",
    description:
      "Recognized by the Rotaract Club of Hawassa for participation and contribution to leadership and team-building initiatives.",
    icon: Award,
    image: "/projects/certs/rotaract-leadership.png",
  },
  {
    id: "rotaract-peace-building",
    title: "Peace Building & Conflict Prevention — Certificate of Appreciation",
    issuer: "Rotaract Club of Hawassa",
    year: "2024",
    type: "recognition",
    description:
      "Recognized by the Rotaract Club of Hawassa for contributions to peace-building and conflict-prevention efforts.",
    icon: Award,
    image: "/projects/certs/rotaract-peace-building.png",
  },
  {
    id: "lake-hawassa-volunteer",
    title: "Volunteer — Lake Hawassa Half Marathon 2025",
    issuer: "2025 Lake Hawassa Half Marathon",
    year: "2025",
    type: "recognition",
    description:
      "Volunteer certificate for supporting the 2025 Lake Hawassa Half Marathon — contributing to a community sporting event.",
    icon: HeartHandshake,
    image: "/projects/certs/lake-hawassa-volunteer.png",
  },
];
