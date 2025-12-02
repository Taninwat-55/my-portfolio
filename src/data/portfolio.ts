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
    category: "Core Stack",
    items: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 75 },
      { name: "Next.js", level: 60 },
      { name: "Tailwind CSS", level: 95 },
    ]
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Node.js", level: 70 },
      { name: "PostgreSQL", level: 60 },
      { name: "REST API Design", level: 85 },
    ]
  },
  {
    category: "Product & Business",
    items: [
      { name: "Agile/Scrum", level: 90 },
      { name: "Project Management", level: 85 },
      { name: "Market Analysis", level: 80 },
    ]
  }
];

export const experience = [
  {
    id: "edu-1",
    type: "education",
    role: "Professional Bachelor, Frontend Development",
    organization: "Jensen Yrkeshögskola",
    period: "2024 - 2026",
    description: "Specializing in modern web architecture, performance optimization, and scalable frontend systems (React/Next.js)."
  },
  {
    id: "edu-2",
    type: "education",
    role: "MSc in Business & Management",
    organization: "Uppsala University",
    period: "2022 - 2023",
    description: "Focus on Entrepreneurship. Mastered the art of turning creative ideas into viable business models."
  },
  {
    id: "work-1",
    type: "work",
    role: "Head of Millennial Consulting",
    organization: "Volunteer Leadership",
    period: "2023 - 2025",
    description: "Directed consulting projects, managing stakeholder expectations and ensuring timely delivery of strategic solutions."
  }
];

export const projects = [
  {
    id: 1,
    title: "Cinema Booking System",
    shortDescription: "A full-stack booking engine with real-time seat management.",
    fullDescription: "Built a comprehensive booking system handling complex state management for seat selection. Focused on preventing double-bookings and ensuring data consistency.",
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
    shortDescription: "FinTech dashboard visualizing Bitcoin purchasing power.",
    fullDescription: "A conceptual financial tool that reprices everyday goods in Satoshis. Demonstrates API integration and real-time data visualization.",
    tech: ["React", "Tailwind", "Vitest", "CoinGecko API"],
    links: {
      demo: "https://www.satoshi-standard.xyz/",
      code: "https://github.com/Taninwat-55/Satoshi-Standard",
    },
    image: "/assets/satoshi-standard.webp"
  },
  {
    id: 3,
    title: "Racha Beauty",
    shortDescription: "High-performance business website with 95+ SEO score.",
    fullDescription: "Delivered a commercial website for a real-world client. Optimized for local SEO, load speed (LCP < 1.2s), and mobile responsiveness.",
    tech: ["React", "SEO", "Analytics"],
    links: {
      demo: "https://rachabeautywellness.com",
      code: "https://github.com/Taninwat-55/rachabeautywellness",
    },
    image: "/assets/Racha_img.webp"
  }
];