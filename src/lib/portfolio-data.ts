import {
  Code2,
  Palette,
  Users,
  PenTool,
  Share2,
  Sparkles,
  Dumbbell,
  Pencil,
  BookOpen,
  Telescope,
  TrendingUp,
  Moon,
  Megaphone,
  HeartHandshake,
  ShieldCheck,
  Layers,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Peak Craft", href: "#peak-craft" },
  { label: "Skills", href: "#skills" },
  { label: "Beyond", href: "#beyond" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" },
];

export type JourneyStep = {
  year: string;
  title: string;
  description: string;
  tag: string;
};

export const journey: JourneyStep[] = [
  {
    year: "2019",
    title: "Discovering Technology",
    description:
      "Curiosity sparked by a single computer. I started tearing apart how apps and websites worked, spending late nights reading about how the internet was built.",
    tag: "Origin",
  },
  {
    year: "2021",
    title: "Learning to Program",
    description:
      "Took my first real steps into code with Python and Java. The moment a program responded to my logic, I knew this was the craft I wanted to master.",
    tag: "Foundations",
  },
  {
    year: "2022",
    title: "Joining Peak Craft",
    description:
      "Enrolled at Hawassa University for Information Systems and found Peak Craft — a tech community that felt like home. I began contributing as a member and designer.",
    tag: "Community",
  },
  {
    year: "2023",
    title: "Becoming PR Head",
    description:
      "Promoted to Head of Public Relations at Peak Craft. I led event promotion, brand identity, and cross-team collaboration that grew our reach across campus.",
    tag: "Leadership",
  },
  {
    year: "2024",
    title: "Building Web Applications",
    description:
      "Shipped real products with React, Next.js, and Node.js — turning designs into fast, accessible experiences. Started blending design sensibility with engineering rigor.",
    tag: "Craft",
  },
  {
    year: "Now",
    title: "Exploring AI & Entrepreneurship",
    description:
      "Exploring AI-assisted development and the foundations of building a company. Studying how products, communities, and businesses create lasting impact across Africa.",
    tag: "Frontier",
  },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Production-grade web apps with React, Next.js, and Node — fast, accessible, and built to scale.",
    highlights: ["React & Next.js", "API design", "Performance"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Interfaces that feel inevitable. From wireframes to pixel-perfect systems in Figma.",
    highlights: ["Design systems", "Prototyping", "Accessibility"],
  },
  {
    icon: Users,
    title: "Community Leadership",
    description:
      "Growing tech communities through events, mentorship, and a strong shared culture.",
    highlights: ["Event design", "Mentorship", "Culture"],
  },
  {
    icon: PenTool,
    title: "Content Creation",
    description:
      "Crafting stories, visuals, and technical content that move people to action.",
    highlights: ["Storytelling", "Visuals", "Writing"],
  },
  {
    icon: Share2,
    title: "Social Media Strategy",
    description:
      "Positioning brands and communities with campaigns that actually convert attention into trust.",
    highlights: ["Campaigns", "Brand voice", "Analytics"],
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Development",
    description:
      "Using AI as a force multiplier — shipping faster, learning deeper, building smarter.",
    highlights: ["Prompt design", "Tooling", "Automation"],
  },
];

export type ProjectCategory = "Web" | "Community" | "Design" | "AI";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: string;
  metrics: { label: string; value: string }[];
  accent: string; // gradient classes
  year: string;
  // Optional real product screenshots + live links (when available)
  screenshots?: { src: string; alt: string; caption: string }[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "pcic-management-system",
    name: "PCIC Management System",
    category: "Web",
    tagline: "The operating system for Peak Craft — live at pcic.tech.",
    problem:
      "Peak Craft's events, members, attendance, and disciplinary records were tracked across spreadsheets and group chats. Admins had no single source of truth, making engagement tracking and accountability inconsistent.",
    solution:
      "Designed and built PCIC — a full management system with a role-based dashboard, event + attendance tracking, member management with status & strikes, decisions, compliance, and career modules. Live and in use by the Peak Craft leadership team.",
    tech: ["Next.js", "React", "Tailwind", "Node.js", "MongoDB"],
    impact:
      "Replaced scattered spreadsheets with one trusted platform — giving Peak Craft's leadership real-time visibility into 27+ members, events, attendance, and accountability, all under one branded system at pcic.tech.",
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Members managed", value: "27+" },
      { label: "Active rate", value: "81%" },
    ],
    accent: "from-blue-500/30 via-cyan-400/10 to-transparent",
    year: "2025",
    featured: true,
    liveUrl: "https://pcic.tech",
    screenshots: [
      {
        src: "/projects/pcic-dashboard.png",
        alt: "PCIC Management System dashboard overview",
        caption: "Dashboard — real-time overview of events, members, and compliance.",
      },
      {
        src: "/projects/pcic-events.png",
        alt: "PCIC Events management page",
        caption: "Events — create and track community events and attendance.",
      },
      {
        src: "/projects/pcic-members.png",
        alt: "PCIC Members management page with table",
        caption: "Members — manage status, batches, domains, and accountability.",
      },
    ],
  },
  {
    id: "hu-student-debt-system",
    name: "HU Student Debt System",
    category: "Web",
    tagline:
      "A cost-sharing debt platform for Hawassa University — web admin + Flutter student app.",
    problem:
      "Under Ethiopian Council of Ministers Regulation No. 447/2024, Hawassa University students must repay a portion of tuition, boarding, and food costs after graduation. The university had no system to track obligations, collect payments, or clear graduates for withdrawal — it was all manual paperwork and spreadsheets.",
    solution:
      "Built a full student debt management platform with three surfaces: a React admin dashboard (payment review, student & graduate management, cost configuration, ERCA tax export, withdrawal approvals, Fayda national-ID verification, finance reports), a Flutter student mobile app (debt overview, cost-sharing statements with PDF export, Chapa online payment + receipt upload, push notifications, multi-stage withdrawal workflow), and a Node.js/Express backend tying it all together.",
    tech: ["React", "Flutter", "Node.js", "Express", "MongoDB", "Firebase"],
    impact:
      "Digitized the entire cost-sharing lifecycle — from obligation tracking to payment collection to graduate clearance — replacing manual paperwork with one trusted system for both students and finance staff across Hawassa University.",
    metrics: [
      { label: "Surfaces", value: "3" },
      { label: "Regulation", value: "No. 447/2024" },
      { label: "Payments", value: "Chapa + receipts" },
    ],
    accent: "from-emerald-400/25 via-blue-400/10 to-transparent",
    year: "2025",
    featured: true,
    liveUrl: "https://github.com/jibrilnuredin",
    screenshots: [
      {
        src: "/projects/debt-admin-dashboard.png",
        alt: "HU Student Debt System admin dashboard with collections and outstanding debt",
        caption:
          "Admin dashboard — total collections, outstanding debt, and quick actions for finance staff.",
      },
      {
        src: "/projects/debt-admin-login.png",
        alt: "HU Student Debt System admin login page",
        caption:
          "Admin login — role-based access for finance, registrar, and department staff.",
      },
      {
        src: "/projects/debt-mobile-dashboard.png",
        alt: "Student mobile app dashboard showing remaining debt and payment history",
        caption:
          "Student app — remaining debt, payment status, and transaction history at a glance.",
      },
      {
        src: "/projects/debt-mobile-payment.png",
        alt: "Student mobile app make a payment screen with payment plan and method options",
        caption:
          "Student app — make a payment by plan (advance/semester/full year) via Chapa or receipt upload.",
      },
    ],
  },
  {
    id: "libraryhub",
    name: "LibraryHub",
    category: "Web",
    tagline:
      "A static multi-page bookstore — browse, buy, or rent 32 books. Live on GitHub Pages.",
    problem:
      "Book lovers needed a simple, fast way to browse, purchase, and rent books online without the friction of outdated library systems — and without requiring a backend or paid hosting.",
    solution:
      "Built LibraryHub as a fully static, multi-page bookstore web app in HTML, CSS, and vanilla ES6 JavaScript. Features a 32-book catalog across multiple genres, a dual buy/rent pricing model, search + genre filtering, a shopping cart with quantity and total calculation, client-side User/Admin authentication, featured books on the home page, and About/Contact pages. Data lives in a static JS file (no backend), deployed to GitHub Pages with a GitHub Actions CI/CD pipeline and HTTPS by default.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)", "Font Awesome", "GitHub Actions"],
    impact:
      "Shipped a complete, production-deployed e-commerce-style web app with zero backend costs — automated CI/CD means every push goes live instantly. A clean demonstration of frontend fundamentals done well.",
    metrics: [
      { label: "Books", value: "32" },
      { label: "Model", value: "Buy or Rent" },
      { label: "Hosting", value: "GitHub Pages" },
    ],
    accent: "from-amber-400/30 via-orange-400/10 to-transparent",
    year: "2024",
    featured: true,
    liveUrl: "https://jbril43.github.io/bookstore/",
    repoUrl: "https://github.com/JBRIL43/bookstore",
    screenshots: [
      {
        src: "/projects/libraryhub-hero.png",
        alt: "LibraryHub bookstore landing page with bookshelf hero background",
        caption:
          "Landing page — library-themed hero inviting readers to browse, buy, or rent.",
      },
    ],
  },
  {
    id: "campus-event-suite",
    name: "Campus Event Promo Suite",
    category: "Design",
    tagline: "A reusable design system for event promotion.",
    problem:
      "Every event needed fresh promotional visuals, but there was no consistent identity — campaigns took days and looked disjointed.",
    solution:
      "Built a modular Figma design system and template library for posters, social posts, and tickets, enabling fast, on-brand promotion by any team member.",
    tech: ["Figma", "Design Systems", "Branding"],
    impact:
      "Reduced promo turnaround from days to hours while establishing a recognizable Peak Craft visual identity across every channel.",
    metrics: [
      { label: "Promo speed", value: "10× faster" },
      { label: "Templates", value: "40+" },
    ],
    accent: "from-violet-500/30 via-blue-400/10 to-transparent",
    year: "2024",
  },
  {
    id: "study-companion",
    name: "Study Companion App",
    category: "AI",
    tagline: "An AI-assisted study tool for students.",
    problem:
      "Students struggled to organize notes, generate practice questions, and stay on top of coursework across many subjects.",
    solution:
      "Built an AI-assisted study companion that turns notes into flashcards, summaries, and practice questions — with a focused, distraction-free interface.",
    tech: ["Next.js", "OpenAI", "Node.js", "Tailwind"],
    impact:
      "A personal exploration of AI-assisted product building that deepened my understanding of LLM tooling and student-centric UX.",
    metrics: [
      { label: "Subjects", value: "Multi" },
      { label: "Mode", value: "Prototype" },
    ],
    accent: "from-emerald-400/25 via-blue-400/10 to-transparent",
    year: "2025",
  },
  {
    id: "portfolio-engine",
    name: "Personal Portfolio Engine",
    category: "Web",
    tagline: "A premium, animated personal brand site.",
    problem:
      "Most developer portfolios look the same — a list of skills with no story. I wanted mine to communicate vision, craft, and leadership.",
    solution:
      "Designed and engineered a dark, glassmorphic portfolio with animated storytelling, interactive skills, and project filtering — built for speed and SEO.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    impact:
      "A living case study in design systems, micro-interactions, and performance-first frontend engineering.",
    metrics: [
      { label: "Lighthouse", value: "95+" },
      { label: "Sections", value: "10" },
    ],
    accent: "from-blue-500/30 via-indigo-400/10 to-transparent",
    year: "2025",
  },
  {
    id: "brand-system",
    name: "Peak Craft Brand System",
    category: "Community",
    tagline: "Identity, voice, and guidelines for a community.",
    problem:
      "As Peak Craft grew, the brand became inconsistent across teams, events, and social platforms.",
    solution:
      "Defined the brand voice, color system, typography, and usage guidelines — then rolled them out across design and communications.",
    tech: ["Branding", "Figma", "Strategy"],
    impact:
      "Created a cohesive identity that made Peak Craft instantly recognizable and easier for new collaborators to represent.",
    metrics: [
      { label: "Guidelines", value: "Full" },
      { label: "Adoption", value: "Org-wide" },
    ],
    accent: "from-amber-400/25 via-blue-400/10 to-transparent",
    year: "2023",
  },
  {
    id: "dev-notes",
    name: "DevNotes — Learning in Public",
    category: "Design",
    tagline: "A content series documenting the craft.",
    problem:
      "Knowledge learned in isolation fades. I wanted to reinforce learning and help others starting out.",
    solution:
      "Created a content series breaking down web dev, design, and community-building concepts into clear, visual posts and threads.",
    tech: ["Content", "Visuals", "Writing"],
    impact:
      "Turned personal learning into shared value — growing an audience and sharpening my own understanding along the way.",
    metrics: [
      { label: "Posts", value: "50+" },
      { label: "Reach", value: "Growing" },
    ],
    accent: "from-rose-400/25 via-blue-400/10 to-transparent",
    year: "2024",
  },
];

export const projectFilters: (ProjectCategory | "All")[] = [
  "All",
  "Web",
  "Design",
  "AI",
  "Community",
];

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
    ],
  },
];

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

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Jibril brings a rare combination of design sensibility, engineering focus, and genuine care for people. He makes everyone around him better.",
    name: "Mentor",
    role: "Tech Community Lead",
    initials: "MN",
  },
  {
    quote:
      "He turned our scattered promotions into a system. Events finally looked like they belonged to one professional brand.",
    name: "Teammate",
    role: "Peak Craft Events",
    initials: "TM",
  },
  {
    quote:
      "Disciplined, curious, and quietly ambitious. Jibril doesn't just participate in a community — he elevates it.",
    name: "Collaborator",
    role: "Designer & Developer",
    initials: "CL",
  },
];

export const socials = {
  linkedin: "https://www.linkedin.com/in/jibril-nuredin",
  github: "https://github.com/jibrilnuredin",
  email: "mailto:jibril.nuredin@example.com",
  // Live product links
  pcic: "https://pcic.tech",
  peakProjects: "https://pcic.tech/peak-projects",
};

export const visionStats = [
  { label: "Focus", value: "Africa & beyond" },
  { label: "Mission", value: "Products · Communities · Businesses" },
  { label: "Horizon", value: "Long-term impact" },
];
