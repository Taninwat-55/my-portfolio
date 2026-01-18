import {
  Layout,
  Server,
  BrainCircuit,
} from 'lucide-react';

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  role: "Product Manager | Product Engineer",
  bio: "Master of Science in Business & Economics. I bridge the gap between business strategy, user needs, and engineering precision. I don't just build software; I solve human problems by aligning stakeholder vision with technical feasibility.",
  location: "Copenhagen, Denmark",
  availability: "Open to Work",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    github: "https://github.com/Taninwat-55",
  }
};

export const skills = [
  {
    category: "Product Strategy",
    icon: BrainCircuit,
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

export const experience = [
  {
    id: "work-trailr",
    type: "work",
    role: "Product Engineer Intern",
    organization: "Trailr.ai (Remote)",
    period: "Sep 2025 - Dec 2025",
    description: "Pivotal role in an early-stage AI startup. Authored Research Kickoff Docs to align the CEO and engineering team. Managed the product roadmap by navigating technical constraints—specifically refactoring ambitious UI designs into viable MVP features to ensure timely delivery."
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
    description: "Led cross-functional consulting projects by managing stakeholder expectations across diverse client portfolios. Drove strategic delivery by aligning team capabilities with business objectives, ensuring on-time project completion."
  },
  {
    id: "work-2",
    type: "work",
    role: "Business Development Intern",
    organization: "Spreadly (Remote)",
    period: "Jan 2023 - Mar 2023",
    description: "Conducted market analysis to identify growth opportunities and developed sales materials to drive business expansion."
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

export const projects = [
  {
    id: 99,
    title: "Bevisly",
    category: "SaaS Platform",
    description: "A proof-based hiring platform designed to eliminate resume bias. I architected a role-based system (Candidate/Employer/Admin) using Supabase RLS for security and React for a seamless UI. It features real-time task tracking and a drag-and-drop Kanban board for talent management.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind"],
    links: {
      demo: "https://bevisly.com/",
      code: "https://github.com/Taninwat-55/bevis-mvp",
    },
    image: "/assets/bevisly.png"
  },
  {
    id: 1,
    title: "Cinema Booking System",
    category: "Full Stack",
    description: "A complex booking engine handling real-time seat availability and state management. Solves the 'double-booking' problem using robust backend logic.",
    tech: ["React", "Node.js", "SQLite", "REST API"],
    links: {
      demo: "https://cinema-booking-system-project.vercel.app",
      code: "https://github.com/Taninwat-55/cinema-booking-system-project",
    },
    image: "/assets/cinema-project-img.png"
  },
  {
    id: 2,
    title: "Satoshi Standard",
    category: "FinTech",
    description: "A financial dashboard conceptualizing purchasing power in Bitcoin (Sats). Features real-time price feeds via CoinGecko API and dynamic currency conversion.",
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
    description: "A production website for a real business client. Achieved 95+ Lighthouse scores for SEO and Accessibility, directly improving local search visibility.",
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