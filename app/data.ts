import {
  Layout,
  Server,
  Target,
} from 'lucide-react';
import { PortfolioMode } from './context/ModeContext';

// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  role: "Product Manager | Product Engineer",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    github: "https://github.com/Taninwat-55",
  }
};

// ─── MODE-SPECIFIC CONTENT ────────────────────────────────────────────────────

export const modeContent = {
  pm: {
    availability: "Open to Product Manager Roles",
    heroLine1: "Turning user insight",
    heroLine2: "into products",
    heroAccent: "people actually want.",
    heroSubtitle:
      'I am Taninwat \u201cIce\u201d Kaewpankan \u2014 an aspiring Product Manager with a Master\u2019s in Business & Economics. I combine structured product thinking with hands-on technical knowledge to bridge the gap between user needs and engineering reality.',
    aboutP1:
      "I come from a business background \u2014 I studied entrepreneurship and spent years figuring out how products succeed in the market. I\u2019ve led cross-functional consulting projects, conducted market analysis, and worked directly with stakeholders to align strategy with execution.",
    aboutP2:
      "I have a Master of Science in Business & Economics and a Bachelor in Game Design & Project Management from Uppsala University. I also learned to code \u2014 not to become a developer, but to become a better PM. Being able to read code, understand technical constraints, and prototype ideas makes me a stronger product partner for any engineering team.",
    cvLink: "/assets/(PM) Taninwat-Kaewpankan-CV.pdf",
    cvLabel: "Download PM Resume",
  },
  dev: {
    availability: "Open to Frontend Developer Roles",
    heroLine1: "Building fast, accessible",
    heroLine2: "interfaces with a",
    heroAccent: "product mindset.",
    heroSubtitle:
      'I am Taninwat \u201cIce\u201d Kaewpankan \u2014 a Frontend Developer with a Master\u2019s in Business & Economics. I ship real products using React and TypeScript, and I bring business context to every technical decision I make.',
    aboutP1:
      "I started from a business background, but I was drawn to the craft of building. I completed a Frontend Developer internship at Trailr.ai \u2014 an early-stage AI startup \u2014 where I architected the navigation system using React and Zustand, and bridged design vision with technical constraints during a full platform overhaul.",
    aboutP2:
      "I hold a Professional Bachelor in Frontend Development (in progress) alongside a Master of Science in Business & Economics from Uppsala University. I build with React, Next.js, TypeScript, and Tailwind \u2014 and I care deeply about performance, accessibility, and user experience. Having a business background means I don\u2019t just build features; I understand why they matter.",
    cvLink: "/assets/(frontend) Taninwat-Kaewpankan-CV.pdf",
    cvLabel: "Download Dev Resume",
  },
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    id: "product",
    category: "Product Strategy",
    icon: Target,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/20",
    items: [
      { name: "Product Discovery" },
      { name: "User Interviewing" },
      { name: "Stakeholder Alignment" },
      { name: "Agile Leadership" },
      { name: "User Journey Mapping" },
      { name: "Market Analysis" },
      { name: "Unit Economics" },
    ]
  },
  {
    id: "frontend",
    category: "Technical Literacy & Frontend",
    icon: Layout,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/20",
    items: [
      { name: "React (Next.js)" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "API Integration" },
      { name: "Responsive Design" },
    ]
  },
  {
    id: "backend",
    category: "Systems & Backend",
    icon: Server,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/20",
    items: [
      { name: "Node.js (Express.js)" },
      { name: "PostgreSQL" },
      { name: "Git & CI/CD" },
      { name: "Authentication" },
      { name: "State Management" },
    ]
  }
];

export function getSkills(mode: PortfolioMode) {
  if (mode === "pm") {
    return [
      skillGroups.find(s => s.id === "product")!,
      skillGroups.find(s => s.id === "frontend")!,
      skillGroups.find(s => s.id === "backend")!,
    ];
  } else {
    return [
      skillGroups.find(s => s.id === "frontend")!,
      skillGroups.find(s => s.id === "backend")!,
      skillGroups.find(s => s.id === "product")!,
    ];
  }
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const experience = [
  {
    id: "work-trailr",
    type: "work",
    role: "Frontend Developer Intern",
    organization: "Trailr.ai (Remote)",
    period: "Sep 2025 - Dec 2025",
    description_pm: "Embedded in an early-stage AI startup to translate design vision into a working product. Collaborated closely with the founding team to understand product constraints, prioritize features under tight timelines, and ensure the platform's UX matched the intended user experience during a complete overhaul.",
    description_dev: "Built core UI features for an early-stage AI startup (pre-launch). Architected the navigation system using React & Zustand, implemented complex state flows, and resolved the gap between design specs and technical feasibility during a complete platform overhaul."
  },
  {
    id: "edu-1",
    type: "education",
    role: "Professional Bachelor, Frontend Development",
    organization: "Jensen Yrkeshögskola",
    period: "2024 - 2026",
    description: "Specializing in modern web architecture, mastering React ecosystems, and performance optimization for scalable applications."
  },
  {
    id: "work-1",
    type: "work",
    role: "Head of Millennial Consulting (Volunteer)",
    organization: "Volunteer Leadership",
    period: "2023 - 2025",
    description_pm: "Led cross-functional consulting projects end-to-end — from scoping client needs to delivering strategic recommendations. Managed stakeholder expectations across diverse portfolios, facilitated alignment between teams with conflicting priorities, and drove on-time delivery through structured project planning.",
    description_dev: "Managed the delivery of multiple consulting projects simultaneously, coordinating cross-functional teams and keeping work on track against defined milestones. Developed strong habits around scope management, clear documentation, and communicating technical trade-offs to non-technical stakeholders."
  },
  {
    id: "work-2",
    type: "work",
    role: "Business Development Intern",
    organization: "Spreadly (Remote)",
    period: "Jan 2023 - Mar 2023",
    description_pm: "Conducted market analysis to identify growth opportunities, mapped competitive positioning, and developed sales materials that translated product value into clear business outcomes for prospective clients.",
    description_dev: "Supported business expansion through market research and data analysis. Developed an understanding of how product features map to customer value — a perspective that now informs how I prioritize technical work."
  },
  {
    id: "edu-2",
    type: "education",
    role: "MSc in Business & Management",
    organization: "Uppsala University",
    period: "2022 - 2023",
    description: "Specialized in Entrepreneurship. Focused on turning creative concepts into viable business models through strategic planning."
  },
  {
    id: "edu-3",
    type: "education",
    role: "BA in Game Design & Project Management",
    organization: "Uppsala University",
    period: "2019 - 2022",
    description: "Combined interactive system design with agile project management. Learned to manage user engagement mechanics and iterative development cycles."
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 99,
    title: "Bevisly",
    category: "SaaS Platform",
    description_pm: "Identified a core hiring market problem: resumes can't verify real skill. Designed a proof-based hiring platform where candidates complete actual tasks instead of submitting CVs. Defined the role-based product model (Employer/Candidate), the verification flow, and the value proposition that makes traditional CVs obsolete.",
    description_dev: "Built a full-stack SaaS platform from scratch using React, TypeScript, and Supabase. Implemented row-level security (RLS) policies for multi-role data isolation, designed the PostgreSQL schema, and architected the proof submission and review flows end-to-end.",
    tech: ["Supabase RLS (Security)", "Role-Based Design", "React", "TypeScript", "PostgreSQL"],
    links: {
      demo: "https://bevisly.com/",
      code: "https://github.com/Taninwat-55/bevis-mvp",
    },
    image: "/assets/bevisly.webp"
  },
  {
    id: 1,
    title: "Cinema Booking System",
    category: "Full Stack",
    description_pm: "Solved a real concurrency problem in booking UX: two users selecting the same seat simultaneously. Defined the locking logic and validation rules that prevent double-booking, and designed a seat selection experience that feels smooth and trustworthy even under race conditions.",
    description_dev: "Built a full-stack booking engine with real-time seat locking using React on the frontend and Node.js/SQLite on the backend. Implemented backend validation to handle concurrent requests and prevent double-booking at the data layer, not just the UI.",
    tech: ["React", "Node.js", "SQLite", "REST API"],
    links: {
      demo: "https://cinema-booking-system-project.vercel.app",
      code: "https://github.com/Taninwat-55/cinema-booking-system-project",
    },
    image: "/assets/cinema-project-img.webp"
  },
  {
    id: 2,
    title: "Satoshi Standard",
    category: "FinTech",
    description_pm: "Spotted a user insight: most people can't intuitively grasp Bitcoin's value in everyday terms. Designed a dashboard that reframes purchasing power through Satoshis — the smallest Bitcoin unit — making an abstract concept tangible and engaging for a non-technical audience.",
    description_dev: "Built a live FinTech dashboard with React and Tailwind, integrating a real-time Bitcoin price API. Wrote a full unit test suite with Vitest to validate price conversion logic, and optimized the UI for fast re-renders on live data updates.",
    tech: ["React", "Tailwind", "Vitest", "API Integration"],
    links: {
      demo: "https://www.satoshi-standard.xyz/",
      code: "https://github.com/Taninwat-55/Satoshi-Standard",
    },
    image: "/assets/satoshi-standard.webp"
  },
  {
    id: 3,
    title: "Racha Beauty & Wellness",
    category: "Commercial",
    description: "Problem: A local wellness business had no online presence. Solution: Built a fast, SEO-optimized website from scratch. Impact: Achieved 95+ Lighthouse scores and improved the business's visibility in local search results.",
    tech: ["Next.js", "SEO", "Analytics", "Tailwind"],
    links: {
      demo: "https://rachabeautywellness.com",
      code: "https://github.com/Taninwat-55/rachabeautywellness",
    },
    image: "/assets/Racha_img.webp"
  },
  {
    id: 4,
    title: "Forum Web Application",
    category: "Community",
    description: "A scalable discussion platform featuring full CRUD capabilities. Focused on database schema design and user-generated content flows.",
    tech: ["React", "Express.js", "SQLite", "CRUD"],
    links: {
      demo: "https://forum-app-project-react.vercel.app",
      code: "https://github.com/Taninwat-55/Forum-App-Project-React",
    },
    image: "/assets/Forum-img.webp"
  },
  {
    id: 5,
    title: "Voyager Travel Planner",
    category: "Productivity",
    description: "A travel logistics tool simplifying itinerary creation. Focuses on intuitive UX for managing complex schedules and location data.",
    tech: ["React", "Tailwind", "REST API"],
    links: {
      demo: "#",
      code: "https://github.com/Taninwat-55/travel-planner-voyager",
    },
    image: "/assets/travel-plan.webp"
  },
  {
    id: 6,
    title: "Product List & Cart",
    category: "E-Commerce",
    description: "A pixel-perfect implementation of shopping cart logic. Handles state persistence and complex array manipulations for cart updates.",
    tech: ["JavaScript", "CSS", "HTML"],
    links: {
      demo: "https://taninwat-55.github.io/Product-list-with-cart/",
      code: "https://github.com/Taninwat-55/Product-list-with-cart",
    },
    image: "/assets/Product-list-with-cart-img.webp"
  },
  {
    id: 7,
    title: "Interactive Sign-Up",
    category: "CRO",
    description: "A conversion-optimized form focusing on client-side validation and error handling to reduce user drop-off rates.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: {
      demo: "https://taninwat-55.github.io/Intro-component-with-sign-up-form/",
      code: "https://github.com/Taninwat-55/Intro-component-with-sign-up-form",
    },
    image: "/assets/sign-up-form-project.webp"
  },
  {
    id: 8,
    title: "Trafiklab Transit App",
    category: "Public Data",
    description: "Real-time public transport dashboard integrating with the Trafiklab API. Visualizes complex transit data for end-users.",
    tech: ["React", "TypeScript", "Tailwind"],
    links: {
      demo: "https://react-trafiklab-app.vercel.app",
      code: "https://github.com/Taninwat-55/react-trafiklab-app",
    },
    image: "/assets/Trafiklab-app-img.webp"
  },
];

export const featuredProjects = projects.slice(0, 3);