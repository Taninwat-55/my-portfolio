import { Layout, Server, Target } from "lucide-react";

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
  availability: "Open to Frontend Developer Roles",
  heroIntro: "Hi, I'm Taninwat.",
  heroLine: "I build fast, accessible interfaces with a product mindset.",
  heroSubtitle:
    "Frontend Developer with a Master's in Business & Economics. I ship real products with React and TypeScript, and I bring business context to every technical decision I make.",
  aboutP1:
    "I started from a business background, but I was drawn to the craft of building. I completed a Frontend Developer internship at Trailr.ai — an early-stage AI startup — where I architected the navigation system using React and Zustand, and bridged design vision with technical constraints during a full platform overhaul.",
  aboutP2:
    "I hold a Professional Bachelor in Frontend Development (in progress) alongside a Master of Science in Business & Economics from Uppsala University. I build with React, Next.js, TypeScript, and Tailwind — and I care deeply about performance, accessibility, and user experience. Having a business background means I don't just build features; I understand why they matter.",
  cvLink: "/assets/(frontend) Taninwat-Kaewpankan-CV.pdf",
  cvLabel: "Download Resume",
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────

export const skills = [
  {
    id: "frontend",
    category: "Technical Literacy & Frontend",
    icon: Layout,
    items: [
      { name: "React (Next.js)" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "API Integration" },
      { name: "Responsive Design" },
    ],
  },
  {
    id: "backend",
    category: "Systems & Backend",
    icon: Server,
    items: [
      { name: "Node.js (Express.js)" },
      { name: "PostgreSQL" },
      { name: "Git & CI/CD" },
      { name: "Authentication" },
      { name: "State Management" },
    ],
  },
  {
    id: "product",
    category: "Product Strategy",
    icon: Target,
    items: [
      { name: "Product Discovery" },
      { name: "User Interviewing" },
      { name: "Stakeholder Alignment" },
      { name: "Agile Leadership" },
      { name: "User Journey Mapping" },
      { name: "Market Analysis" },
      { name: "Unit Economics" },
    ],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const experience = [
  {
    id: "work-trailr",
    type: "work",
    role: "Frontend Developer Intern",
    organization: "Trailr.ai (Remote)",
    period: "Sep 2025 - Dec 2025",
    description:
      "Built core UI features for an early-stage AI startup (pre-launch). Architected the navigation system using React & Zustand, implemented complex state flows, and resolved the gap between design specs and technical feasibility during a complete platform overhaul.",
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
    role: "Head of Millennial Consulting (Volunteer)",
    organization: "Volunteer Leadership",
    period: "2023 - 2025",
    description:
      "Managed the delivery of multiple consulting projects simultaneously, coordinating cross-functional teams and keeping work on track against defined milestones. Developed strong habits around scope management, clear documentation, and communicating technical trade-offs to non-technical stakeholders.",
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
      "Built a full-stack SaaS platform from scratch using React, TypeScript, and Supabase. Implemented row-level security (RLS) policies for multi-role data isolation, designed the PostgreSQL schema, and architected the proof submission and review flows end-to-end.",
    tech: ["Supabase RLS (Security)", "Role-Based Design", "React", "TypeScript", "PostgreSQL"],
    links: {
      demo: "https://bevisly.com/",
      code: "https://github.com/Taninwat-55/bevis-mvp",
    },
    image: "/assets/bevisly.webp",
  },
  {
    id: 1,
    title: "Cinema Booking System",
    category: "Full Stack",
    description:
      "Built a full-stack booking engine with real-time seat locking using React on the frontend and Node.js/SQLite on the backend. Implemented backend validation to handle concurrent requests and prevent double-booking at the data layer, not just the UI.",
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
      "Built a live FinTech dashboard with React and Tailwind, integrating a real-time Bitcoin price API. Wrote a full unit test suite with Vitest to validate price conversion logic, and optimized the UI for fast re-renders on live data updates.",
    tech: ["React", "Tailwind", "Vitest", "API Integration"],
    links: {
      demo: "https://www.satoshi-standard.xyz/",
      code: "https://github.com/Taninwat-55/Satoshi-Standard",
    },
    image: "/assets/satoshi-standard.webp",
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
  {
    id: 4,
    title: "Forum Web Application",
    category: "Community",
    description:
      "A scalable discussion platform featuring full CRUD capabilities. Focused on database schema design and user-generated content flows.",
    tech: ["React", "Express.js", "SQLite", "CRUD"],
    links: {
      demo: "https://forum-app-project-react.vercel.app",
      code: "https://github.com/Taninwat-55/Forum-App-Project-React",
    },
    image: "/assets/Forum-img.webp",
  },
  {
    id: 5,
    title: "Voyager Travel Planner",
    category: "Productivity",
    description:
      "A travel logistics tool simplifying itinerary creation. Focuses on intuitive UX for managing complex schedules and location data.",
    tech: ["React", "Tailwind", "REST API"],
    links: {
      demo: "#",
      code: "https://github.com/Taninwat-55/travel-planner-voyager",
    },
    image: "/assets/travel-plan.webp",
  },
  {
    id: 6,
    title: "Product List & Cart",
    category: "E-Commerce",
    description:
      "A pixel-perfect implementation of shopping cart logic. Handles state persistence and complex array manipulations for cart updates.",
    tech: ["JavaScript", "CSS", "HTML"],
    links: {
      demo: "https://taninwat-55.github.io/Product-list-with-cart/",
      code: "https://github.com/Taninwat-55/Product-list-with-cart",
    },
    image: "/assets/Product-list-with-cart-img.webp",
  },
  {
    id: 7,
    title: "Interactive Sign-Up",
    category: "CRO",
    description:
      "A conversion-optimized form focusing on client-side validation and error handling to reduce user drop-off rates.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: {
      demo: "https://taninwat-55.github.io/Intro-component-with-sign-up-form/",
      code: "https://github.com/Taninwat-55/Intro-component-with-sign-up-form",
    },
    image: "/assets/sign-up-form-project.webp",
  },
  {
    id: 8,
    title: "Trafiklab Transit App",
    category: "Public Data",
    description:
      "Real-time public transport dashboard integrating with the Trafiklab API. Visualizes complex transit data for end-users.",
    tech: ["React", "TypeScript", "Tailwind"],
    links: {
      demo: "https://react-trafiklab-app.vercel.app",
      code: "https://github.com/Taninwat-55/react-trafiklab-app",
    },
    image: "/assets/Trafiklab-app-img.webp",
  },
];

export const featuredProjects = projects.slice(0, 3);
