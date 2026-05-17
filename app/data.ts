import { Layers, Compass, Code2 } from "lucide-react";

// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  role: "Frontend Developer & Product Engineer",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    github: "https://github.com/Taninwat-55",
  },
};

// ─── HERO / ABOUT COPY ────────────────────────────────────────────────────────

export const siteContent = {
  availability: "Open to Product Engineer & Technical PM Roles",
  heroIntro: "Hi, I'm Ice.",
  heroLine: "I make product decisions — then build the thing myself.",
  heroSubtitle:
    "I've led teams, scoped features, and shipped real software — end to end. Business background. Frontend skills. Product instinct.",
  aboutP1:
    "At Trailr.ai — an early-stage AI startup — I joined as a frontend developer and transitioned to equity partner with a signed shareholder agreement. I architected the navigation system in React and Zustand, bridged design vision with technical constraints during a full platform overhaul, and owned product decisions from scoping to shipping.",
  aboutP2:
    "I hold a Professional Bachelor in Frontend Development (2026) alongside a Master of Science in Business & Economics from Uppsala University. I build with React, Next.js, TypeScript, and Tailwind — and I care deeply about performance, accessibility, and user experience. A business background means I don't just build features; I understand why they matter.",
  cvLink: "/assets/(Website)Taninwat_Kaewpankan_CV.pdf",
  cvLabel: "Download Resume",
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────

export const skills = [
  {
    id: "builder",
    category: "Builder",
    icon: Code2,
    items: [
      { name: "React 19 & Next.js (App Router)" },
      { name: "TypeScript & Type-Safe APIs" },
      { name: "Vitest & Playwright E2E" },
      { name: "State Management (Zustand)" },
      { name: "CI/CD Pipelines (GitHub Actions)" },
    ],
  },
  {
    id: "strategist",
    category: "Strategist",
    icon: Compass,
    items: [
      { name: "Product Discovery & Research" },
      { name: "Technical Discovery & Scoping" },
      { name: "Agile & Cross-functional Alignment" },
      { name: "SEO & Performance Architecture" },
      { name: "Responsive Design (Mobile-First)" },
    ],
  },
  {
    id: "designer",
    category: "Designer",
    icon: Layers,
    items: [
      { name: "Figma & Prototyping" },
      { name: "Systemic Design (Design Systems)" },
      { name: "A11y (WCAG 2.1 Compliance)" },
      { name: "Motion Engineering (Framer)" },
      { name: "Tailwind CSS (Variable-based)" },
    ],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const experience = [
  {
    id: "work-trailr",
    type: "work",
    role: "Frontend Developer → Partner (Equity)",
    organization: "Trailr.ai (Remote)",
    period: "Sep 2025 - Present",
    description:
      "Grew from frontend developer to equity partner (signed shareholder agreement) at a pre-launch AI startup. Architected the navigation system using React & Zustand, bridged design specs and technical feasibility during a full platform overhaul, and made product and technical decisions with no senior dev oversight.",
  },
  {
    id: "edu-1",
    type: "education",
    role: "Professional Bachelor, Frontend Development",
    organization: "Jensen Yrkeshögskola",
    period: "2024 - 2026",
    description:
      "Specializing in modern web architecture, mastering React ecosystems, and performance optimization for scalable applications.",
  },
  {
    id: "work-1",
    type: "work",
    role: "Head of Organization (Volunteer)",
    organization: "Millennial Consulting",
    period: "2023 - 2025",
    description:
      "Progressed from Head of Operations to Head of the entire Organization. Managed simultaneous consulting project deliveries, coordinated cross-functional teams, owned the budget, and onboarded members into an organization with no formal playbook — figuring out processes as the org scaled.",
  },
  {
    id: "work-2",
    type: "work",
    role: "Business Development Intern",
    organization: "Spreadly (Remote)",
    period: "Jan 2023 - Mar 2023",
    description:
      "Supported business expansion through market research and data analysis. Developed an understanding of how product features map to customer value — a perspective that now informs how I prioritize technical work.",
  },
  {
    id: "edu-2",
    type: "education",
    role: "MSc in Business & Management",
    organization: "Uppsala University",
    period: "2022 - 2023",
    description:
      "Specialized in Entrepreneurship. Focused on turning creative concepts into viable business models through strategic planning.",
  },
  {
    id: "edu-3",
    type: "education",
    role: "BA in Game Design & Project Management",
    organization: "Uppsala University",
    period: "2019 - 2022",
    description:
      "Combined interactive system design with agile project management. Learned to manage user engagement mechanics and iterative development cycles.",
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 99,
    title: "Bevisly",
    category: "SaaS Platform",
    description:
      "Problem: Proving real skills online is broken — endorsements mean nothing without evidence. Decision: Build a platform where proof is structured and verifiable. Built full-stack with React, TypeScript, and Supabase — designed the PostgreSQL schema, implemented row-level security (RLS) for multi-role data isolation, and architected the submission and review flows end-to-end.",
    tech: [
      "Supabase RLS (Security)",
      "Role-Based Design",
      "React",
      "TypeScript",
      "PostgreSQL",
    ],
    links: {
      demo: "https://bevisly.com/",
      code: "",
    },
    image: "/assets/bevisly/Bevisly-Landing.webp",
  },
  {
    id: 1,
    title: "Cinema Booking System",
    category: "Full Stack",
    description:
      "A collaborative school project that went deeper than the brief. Built a full-stack booking engine with React on the frontend and Node.js/SQLite on the backend. The interesting challenge: solved double-booking by handling seat locking and concurrent-request validation at the data layer — not the UI — so data integrity holds regardless of what the client does.",
    tech: ["React", "Node.js", "SQLite", "REST API"],
    links: {
      demo: "https://cinema-booking-system-project.vercel.app",
      code: "https://github.com/Taninwat-55/cinema-booking-system-project",
    },
    image: "/assets/cinema-project-img.webp",
  },
  {
    id: 2,
    title: "Satoshi Standard",
    category: "FinTech",
    description:
      "Problem: No lightweight tool let Bitcoin holders track purchasing power across currencies in real time. Built a live FinTech dashboard with React and Tailwind, integrating a real-time price API. Wrote a full Vitest unit test suite to validate conversion logic, and optimized re-renders for smooth live updates.",
    tech: ["React", "Tailwind", "Vitest", "API Integration"],
    links: {
      demo: "https://www.satoshi-standard.xyz/",
      code: "https://github.com/Taninwat-55/Satoshi-Standard",
    },
    image: "/assets/satoshi-standard/satoshi-dashboard.webp",
  },
  {
    id: 3,
    title: "Racha Beauty & Wellness",
    category: "Commercial",
    description:
      "Problem: A local wellness business had no online presence. Solution: Built a fast, SEO-optimized website from scratch. Impact: Achieved 95+ Lighthouse scores and improved the business's visibility in local search results.",
    tech: ["Next.js", "SEO", "Analytics", "Tailwind"],
    links: {
      demo: "https://rachabeautywellness.com",
      code: "https://github.com/Taninwat-55/rachabeautywellness",
    },
    image: "/assets/Racha_img.webp",
  },
];

export const featuredProjects = projects.slice(0, 3);
