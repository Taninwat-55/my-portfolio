
// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  role: "Software Engineer",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    github: "https://github.com/Taninwat-55",
  },
};

// ─── HERO / ABOUT COPY ────────────────────────────────────────────────────────

export const siteContent = {
  availability: "Open to Software Engineering Roles in Copenhagen",

  heroIntro: "Taninwat Kaewpankan",
  heroLine: "Engineer. Builder. Thinker.",
  heroSubtitle: "Software engineer who builds with product in mind.",

  aboutStory: [
    "I moved to Sweden at 16 with no Swedish and no plan. I learned the language, rebuilt my grades, and worked every job that would have me — cleaning, waiting tables, running a food truck, bartending, sorting packages through the night.",
    "Somewhere between the food truck and the night shifts, I decided I wanted more.",
    "Before Uppsala, there was York, England. I moved there alone — fully by choice, for the first time in my life. Eight months of living completely independently, pushing my English further, figuring out who I was when nobody knew me or had any expectations of me. I had planned to study there. Brexit made it complicated. Uppsala said yes. So I followed.",
    "Uppsala University — one of Scandinavia's oldest. Not where I expected to end up, but I stopped questioning where life was sending me. Three years studying how interactive systems get designed and how projects actually get shipped. The most valuable thing wasn't any specific course — it was wearing the PM hat on real team projects, learning what it actually costs to take something from an idea to a finished thing. Then a Master's in Entrepreneurship. Because building was the only thing I ever kept coming back to.",
    "Denmark wasn't the plan. But life pointed there, and I've learned not to argue with that. A new country, again. The same familiar question: what do I make of this? I found Millennial Consulting — joined the operations team, adapted quickly to how things worked, and eventually grew into leading the organization.",
    "I wanted to become a more complete builder — someone who understands technical constraints, not just concepts. So I enrolled in a two-year professional program in frontend development at Jensen, which led me into an internship at Trailr AI. A few months later, I became an equity partner. I graduated from Jensen in May 2026.",
    "I'm in Copenhagen now. Still building. Still the same person who walked into Sweden without the language — just with a few more tools.",
  ],

  whatIDo: [
    {
      title: "Frontend Engineering",
      body: "I build interfaces with React, TypeScript, and Next.js — from architecture decisions to the details that make something feel right to use. I'm comfortable going full-stack when the work calls for it: Node.js backends, REST APIs, PostgreSQL schemas and data layer logic. I care about what ships, not just what compiles.",
    },
    {
      title: "Product & Design Thinking",
      body: "I work well in the space between engineering and product. I can read a brief, ask why, push back when something doesn't add up, and still deliver. Understanding the problem usually changes how I build the solution.",
    },
    {
      title: "Startup & AI-Native",
      body: "I've never needed a playbook to get started. I use AI tools as a core part of how I work — not as a buzzword, but because it makes me faster and sharper. I move quickly, ask questions when stuck, and care more about shipping than perfecting.",
    },
  ],

  contactHeading: "Let's talk.",
  contactBody:
    "If something here caught your attention — a project, a role, or just curiosity — I'd love to hear from you. No formal process needed. Just send an email and we'll go from there.",

  cvLink: "/assets/Taninwat_Kaewpankan_CV_Frontend.pdf",
  cvLabel: "Download Resume",
};

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const experience = [
  {
    id: "work-trailr",
    type: "work",
    role: "Frontend Developer → Equity Partner",
    organization: "Trailr.ai (Remote)",
    period: "Sep 2025 – Present",
    description:
      "Joined as a frontend developer at an early-stage AI startup, now an equity partner with a signed shareholder agreement. Took on a full navigation overhaul in React and Zustand, owned product discovery for a platform-wide UI/UX redesign, and shipped features continuously as the platform grew from early days to having real clients.",
  },
  {
    id: "edu-1",
    type: "education",
    role: "Professional Program, Frontend Development",
    organization: "Jensen Yrkeshögskola",
    period: "2024 – 2026",
    description:
      "A two-year professional program in frontend engineering — React, TypeScript, Next.js, testing, and performance. Graduated May 2026. Gave me the foundation to go deeper on my own.",
  },
  {
    id: "work-1",
    type: "work",
    role: "Head of Organization (Volunteer)",
    organization: "Millennial Consulting",
    period: "2023 – 2025",
    description:
      "Joined with no formal onboarding. Grew from Head of Operations to leading the organization — managing consulting deliveries, coordinating teams, owning the budget, and building processes for an org that was figuring itself out as it grew.",
  },
  {
    id: "work-2",
    type: "work",
    role: "Business Development Intern",
    organization: "Spreadly (Remote)",
    period: "Jan 2023 – Mar 2023",
    description:
      "Researched target companies and competitors, built tailored outreach materials for each prospect, and joined weekly strategy sessions with the founding team. An early look at how a startup operates before it finds its footing.",
  },
  {
    id: "edu-2",
    type: "education",
    role: "MSc, Business & Management",
    organization: "Uppsala University",
    period: "2022 – 2023",
    description:
      "One year focused on entrepreneurship and strategy at one of Scandinavia's most prestigious universities. Reinforced how I think about products — not just whether they can be built, but whether they should be.",
  },
  {
    id: "edu-3",
    type: "education",
    role: "BA, Game Design & Project Management",
    organization: "Uppsala University",
    period: "2019 – 2022",
    description:
      "Three years studying interactive system design and how projects actually get shipped. The most valuable part was wearing the PM hat on real team projects — where good process is what separates a demo from a product.",
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 99,
    title: "Bevisly",
    category: "SaaS Platform",
    description:
      "Endorsements online mean nothing without evidence. I built Bevisly to fix that — a platform where skill claims come with structured, verifiable proof. Full-stack: React and TypeScript on the front, Supabase and PostgreSQL on the back, with row-level security I designed to handle multi-role data isolation.",
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
      "A school project that went further than it needed to. Built a full-stack cinema booking engine — React on the front, Node.js and SQLite on the back. The part I'm most proud of: seat locking and concurrent-request validation handled at the data layer, not the UI. Data integrity holds regardless of what the client does.",
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
      "No lightweight tool existed for tracking Bitcoin purchasing power across currencies in real time. So I built one — a live dashboard in React and Tailwind, pulling from a real-time price API. Wrote a full Vitest unit test suite to validate conversion logic and kept re-renders smooth under live updates.",
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
      "A local wellness business had no online presence. I built them one from scratch — fast, clean, SEO-optimized with Next.js. Ended up with 95+ Lighthouse scores and measurable improvement in local search visibility.",
    tech: ["Next.js", "SEO", "Analytics", "Tailwind"],
    links: {
      demo: "https://rachabeautywellness.com",
      code: "https://github.com/Taninwat-55/rachabeautywellness",
    },
    image: "/assets/Racha_img.webp",
  },
];

