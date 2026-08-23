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
  // Optional "coming soon" channels (rendered as disabled CTAs with a badge)
  channels?: { label: string; href: string; icon: "youtube" | "telegram"; status?: "coming-soon" }[];
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
    liveUrl: "https://github.com/JBRIL43",
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
    id: "inventory-management",
    name: "Stock Management System",
    category: "Web",
    tagline:
      "A full inventory platform — track stock in/out, revenue, profit, and low-stock alerts.",
    problem:
      "Small businesses track stock movements, revenue, and profit across spreadsheets that don't scale — making it easy to lose sight of low-stock items, miscount inventory, and miss revenue insights until it's too late.",
    solution:
      "Built a Stock Management System web app with a role-based admin dashboard: real-time metrics (total items, stock IN/OUT, revenue, profit, low-stock alerts under 5 units), a searchable stock-balance table with status indicators, Stock IN / Stock OUT / Balance / Revenue / Items modules, exportable reports, and printable views. Source-controlled on GitHub for collaboration and deployment.",
    tech: ["React", "Node.js", "MongoDB", "JavaScript"],
    impact:
      "Gives administrators one live view of inventory health — turning scattered spreadsheets into a single source of truth for stock levels, movements, and financials.",
    metrics: [
      { label: "Items tracked", value: "37" },
      { label: "Revenue", value: "546,300" },
      { label: "Stock moves", value: "IN / OUT" },
    ],
    accent: "from-cyan-400/25 via-blue-400/10 to-transparent",
    year: "2025",
    featured: true,
    liveUrl: "https://github.com/JBRIL43/inventory_management",
    repoUrl: "https://github.com/JBRIL43/inventory_management",
    screenshots: [
      {
        src: "/projects/inventory-dashboard.png",
        alt: "Stock Management System admin dashboard with metrics and stock balance table",
        caption:
          "Dashboard — total items, stock IN/OUT, revenue, profit, low-stock alerts, and a live stock-balance table.",
      },
    ],
  },
  {
    id: "fault-reporting-app",
    name: "IoT Campus Fault Reporting App",
    category: "Web",
    tagline:
      "A Flutter + Supabase app for Hawassa University's IoT campus — report faults with photos, GPS, and SMS alerts.",
    problem:
      "On a university campus, faults like leaks and outages often go unreported or take too long to reach maintenance. Students had no fast, low-friction way to flag issues with evidence and location, so fixes stalled.",
    solution:
      "Built a cross-platform Flutter app for Hawassa University's IoT campus that lets students report faults with minimal input: decentralized reporting open to all students, photo upload with secure storage, GPS/map integration (OpenStreetMap + Geolocator with manual common names + coordinates), and Twilio SMS notifications to maintenance with map links. Backed by Supabase for database, storage, and auth, with validation, rate limiting, and API abstraction for security. Shipped as a student MVP over 9 weeks with IoT-focused expansion plans.",
    tech: ["Flutter", "Dart", "Supabase", "OpenStreetMap", "Twilio"],
    impact:
      "Cut the gap between a fault happening and maintenance knowing about it — students can report a leak or outage in seconds with a photo and exact location, and maintenance gets an SMS with a map link instantly.",
    metrics: [
      { label: "Timeline", value: "9-week MVP" },
      { label: "Platform", value: "Cross-platform" },
      { label: "Alerts", value: "Twilio SMS" },
    ],
    accent: "from-teal-400/25 via-blue-400/10 to-transparent",
    year: "2025",
    featured: true,
    liveUrl: "https://github.com/JBRIL43/FaultReportingApp",
    repoUrl: "https://github.com/JBRIL43/FaultReportingApp",
    screenshots: [
      {
        src: "/projects/fault-report-form.png",
        alt: "Fault reporting app report fault form with phone, description, photo and location fields",
        caption:
          "Report a fault — minimal-input form with phone, description, photo, and location.",
      },
      {
        src: "/projects/fault-report-gps.png",
        alt: "Fault reporting app report fault form with photo attached and GPS location set",
        caption:
          "Photo + GPS set — a report ready to submit with evidence and coordinates.",
      },
      {
        src: "/projects/fault-confirm-location.png",
        alt: "Fault reporting app confirm location screen showing coordinates and details",
        caption:
          "Confirm location — review coordinates, description, and contact before submission.",
      },
      {
        src: "/projects/fault-submitted.png",
        alt: "Fault reporting app report submitted confirmation with tracking ID",
        caption:
          "Report submitted — confirmation with a tracking ID and next steps for the student.",
      },
    ],
  },
  {
    id: "brand-system",
    name: "Peak Craft Brand System",
    category: "Community",
    tagline:
      "Identity, voice, and guidelines for a tech community — crown, peaks, and a bold color system.",
    problem:
      "As Peak Craft grew, the brand became inconsistent across teams, events, and social platforms — there was no single emblem, color palette, or voice tying everything together.",
    solution:
      "Defined the Peak Craft brand from the ground up: a crown-and-peaks emblem symbolizing mastery and ambition, a vibrant color system (deep blues and purples for the mountains, bright oranges and reds for the peaks, gold for the crown), bold typography, and usage guidelines — then rolled them out across design and communications.",
    tech: ["Branding", "Figma", "Strategy", "Design System"],
    impact:
      "Created a cohesive identity that made Peak Craft instantly recognizable and easier for new collaborators to represent across every touchpoint.",
    metrics: [
      { label: "Guidelines", value: "Full" },
      { label: "Adoption", value: "Org-wide" },
      { label: "Colors", value: "Blue · Orange · Gold" },
    ],
    accent: "from-orange-400/25 via-blue-500/10 to-transparent",
    year: "2023",
    featured: true,
    screenshots: [
      {
        src: "/projects/peakcraft-emblem.png",
        alt: "Peak Craft brand emblem with mountains, crown, and Peak Craft wordmark",
        caption:
          "Brand emblem — layered mountain peaks, a golden crown, and the Peak Craft wordmark in bold orange.",
      },
      {
        src: "/projects/peakcraft-crown.png",
        alt: "Peak Craft crown symbol on a red-orange-to-blue gradient background",
        caption:
          "Crown mark — the brand's geometric crown symbol on its signature red→orange→blue gradient.",
      },
    ],
  },
  {
    id: "dev-notes",
    name: "DevNotes — Learning in Public",
    category: "Design",
    tagline:
      "A content series & community for devs learning in public — YouTube + Telegram coming soon.",
    problem:
      "Knowledge learned in isolation fades, and most tutorial content skips the messy, real process of actually learning. I wanted to reinforce my own learning while helping others starting out — and to build a community around it.",
    solution:
      "Building DevNotes as a content series and community that breaks down web dev, design, and community-building concepts into clear, visual posts and threads. Launching alongside a YouTube channel (long-form walkthroughs and breakdowns) and a Telegram channel (daily notes, threads, and discussion) so learners can follow along in real time.",
    tech: ["Content", "Visuals", "Writing", "Community"],
    impact:
      "Turning personal learning into shared value — soon across video and chat, so the audience can learn alongside me rather than after the fact.",
    metrics: [
      { label: "Posts", value: "50+" },
      { label: "YouTube", value: "Coming soon" },
      { label: "Telegram", value: "Coming soon" },
    ],
    accent: "from-rose-400/25 via-red-400/10 to-transparent",
    year: "2024",
    featured: true,
    channels: [
      {
        label: "YouTube Channel",
        href: "#",
        icon: "youtube",
        status: "coming-soon",
      },
      {
        label: "Telegram Channel",
        href: "#",
        icon: "telegram",
        status: "coming-soon",
      },
    ],
  },
];

export const projectFilters: (ProjectCategory | "All")[] = [
  "All",
  "Web",
  "Design",
  "AI",
  "Community",
];
