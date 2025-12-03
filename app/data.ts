import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Smartphone, 
  Terminal 
} from 'lucide-react';

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  role: "Frontend Engineer & Product Strategist",
  bio: "Bridging the gap between business strategy and engineering precision. I build scalable web applications with a focus on user experience and business viability.",
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
    category: "Frontend & UI",
    icon: Layout,
    items: [
      { name: "React (Next.js)", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "API Integration", level: 85 },
    ]
  },
  {
    category: "Systems & Tools",
    icon: Server,
    items: [
      { name: "Node.js", level: 75 },
      { name: "State (Zustand/Query)", level: 80 }, 
      { name: "Git & GitHub", level: 90 }, 
      { name: "Auth (JWT/NextAuth)", level: 70 },
    ]
  },
  {
    category: "Product Management",
    icon: Smartphone, 
    items: [
      { name: "Agile/Scrum Leadership", level: 90 },
      { name: "User Journey Mapping", level: 85 },
      { name: "Market Analysis", level: 80 },
      { name: "SEO & Performance", level: 85 },
    ]
  }
];

export const experience = [
  {
    id: "work-3",
    type: "work",
    role: "Frontend Developer Intern",
    organization: "Trailr.ai",
    period: "Sep 2025 - Dec 2025",
    description: "Spearheaded a complete UI/UX overhaul of the core AI video platform. Implemented complex navigation systems using React, Zustand, and React Query, bridging the gap between design vision and technical feasibility."
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
    description: "Directed consulting projects, managed stakeholder expectations, and ensured timely delivery of strategic solutions for clients."
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