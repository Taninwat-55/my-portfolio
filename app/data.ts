
// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  role: "Frontend & Product Engineer",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    github: "https://github.com/Taninwat-55",
  },
};

// ─── HERO / ABOUT COPY ────────────────────────────────────────────────────────

export const siteContent = {
  availability: "Open to Frontend & Product roles",

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

  heroHook: ["I make complex systems feel calm, fast & human."],
  heroHookAccents: new Set(["calm,", "fast", "human."]),
  heroPhilosophy:
    "I build fast, accessible interfaces — and care about the details that make them feel right.",
  techMarquee: [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "Node.js", "Accessibility", "Performance", "Design Systems",
  ],
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

// ─── SKILLS ───────────────────────────────────────────────────────────────────

export const skills = [
  {
    group: "Frontend",
    items: [
      ["React", 3], ["Next.js", 3], ["TypeScript", 3],
      ["Tailwind CSS", 3], ["HTML / CSS", 3], ["Framer Motion", 2],
    ] as [string, number][],
  },
  {
    group: "Backend & Data",
    items: [
      ["Node.js", 2], ["Express", 2], ["PostgreSQL", 2],
      ["REST / WS", 2], ["Prisma", 2],
    ] as [string, number][],
  },
  {
    group: "Craft & Tools",
    items: [
      ["Accessibility", 3], ["Performance", 3], ["Git / GitHub", 3],
      ["Figma", 2], ["Testing", 2],
    ] as [string, number][],
  },
];

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────

export interface CaseStudy {
  n: string;
  tag: string;
  title: string;
  sub: string;
  featured: boolean;
  images: string[];  // 1–3 screenshots; tiled automatically
  overview: string;
  challenge: string;
  stackWhy: string;
  engineering: string;
  metrics: { v: string; k: string }[];
  stack: string[];
  links: { demo: string; code: string };
}

export const cases: CaseStudy[] = [
  {
    n: "01",
    tag: "SaaS Platform",
    title: "Bevisly",
    sub: "Turn skill claims into structured, verifiable proof.",
    featured: true,
    images: [
      "/assets/bevisly/Bevisly-Landing.webp",
      "/assets/bevisly/bevisly-candidate.webp",
      "/assets/bevisly/bevisly-employer-kanban.webp",
    ],
    overview:
      "A platform where skill claims come with structured, verifiable proof — built full-stack with Supabase, PostgreSQL, and a row-level security model designed for multi-role data isolation.",
    challenge:
      "Endorsements online mean nothing without evidence. The hard part wasn't the UI — it was designing multi-role data isolation at the database layer so no client-side logic could ever compromise it.",
    stackWhy:
      "Supabase for RLS-based multi-role auth so security lives in the database, not the frontend. React and TypeScript on the front so the data model surfaces cleanly in the component tree. Next.js for SSR and SEO.",
    engineering:
      "Designed the RLS policies before writing a single line of UI — security-first, components second. Kept re-renders tight with co-located state and minimal prop drilling.",
    metrics: [
      { v: "RLS", k: "Database security" },
      { v: "8+", k: "AI features" },
      { v: "100", k: "SEO score" },
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "Vitest"],
    links: { demo: "https://bevisly.com/", code: "https://github.com/Taninwat-55/Bevisly" },
  },
  {
    n: "02",
    tag: "Full Stack",
    title: "Cinema Booking",
    sub: "A booking engine where data integrity holds regardless of the client.",
    featured: false,
    images: ["/assets/cinema-project-img.webp"],
    overview:
      "Full-stack cinema booking engine — React on the front, Node.js and SQLite on the back. The architecture centres on seat locking handled at the data layer, not the UI.",
    challenge:
      "Concurrent seat reservation is a classic race condition. Any client-side locking approach fails under load — the lock has to live in the database. Most student projects skip this entirely.",
    stackWhy:
      "Node.js and SQLite for lightweight transactions; React for a seat-map UI that had to be fast and visually precise; a clean REST boundary so the backend stays testable in isolation.",
    engineering:
      "Implemented optimistic concurrency control in SQLite — a transaction checks seat availability and locks atomically, so two simultaneous bookings for the same seat cannot both succeed.",
    metrics: [
      { v: "0", k: "Race conditions" },
      { v: "100%", k: "Data integrity" },
      { v: "60fps", k: "Seat map render" },
    ],
    stack: ["React", "Node.js", "SQLite", "REST API"],
    links: {
      demo: "https://cinema-booking-system-project.vercel.app",
      code: "https://github.com/Taninwat-55/cinema-booking-system-project",
    },
  },
  {
    n: "03",
    tag: "FinTech",
    title: "Satoshi Standard",
    sub: "Live Bitcoin purchasing-power dashboard across every major currency.",
    featured: true,
    images: [
      "/assets/satoshi-standard/satoshi-dashboard.webp",
      "/assets/satoshi-standard/Dashboard.webp",
      "/assets/satoshi-standard/Address_watcher.webp",
    ],
    overview:
      "Real-time dashboard tracking Bitcoin purchasing power across currencies. Live price API with a full Vitest unit-test suite covering all conversion logic.",
    challenge:
      "Real-time price feeds cause constant re-renders across the entire component tree. The UI had to stay smooth while data was always moving — and the maths had to stay correct when I refactored.",
    stackWhy:
      "React and Tailwind for the live UI; Vitest to pin the conversion logic so refactors can't silently break numbers users depend on. No heavyweight state library — co-located state was enough.",
    engineering:
      "Pushed all derived math into selectors; only cells with changed values re-render. The test suite runs against pure conversion functions, not the UI, so coverage is fast and reliable.",
    metrics: [
      { v: "3", k: "Price APIs" },
      { v: "Groq AI", k: "Streaming chat" },
      { v: "Vitest", k: "Test suite" },
    ],
    stack: ["React", "TypeScript", "Tailwind", "Vitest", "API Integration"],
    links: {
      demo: "https://www.satoshi-standard.xyz/",
      code: "https://github.com/Taninwat-55/Satoshi-Standard",
    },
  },
  {
    n: "04",
    tag: "Commercial",
    title: "Racha Beauty",
    sub: "From zero web presence to 95+ Lighthouse and local search visibility.",
    featured: false,
    images: ["/assets/Racha_img.webp"],
    overview:
      "A local wellness business had no online presence. I built one from scratch — fast, clean, SEO-optimised with Next.js and measurable improvement in local search rankings.",
    challenge:
      "Small local businesses rarely have a budget for ongoing maintenance, so the site had to be fast out of the box with no CDN tuning, no ops team, and zero ongoing technical overhead.",
    stackWhy:
      "Next.js for server-rendering and automatic image optimisation; Tailwind for a design system the client could understand visually; structured data markup so Google reads the business correctly.",
    engineering:
      "Scored 95+ across all Lighthouse categories on first deploy. Used next/image throughout, structured data for local business schema, and a zero-JavaScript-for-content approach.",
    metrics: [
      { v: "95+", k: "Lighthouse score" },
      { v: "#1", k: "Local search rank" },
      { v: "0", k: "JS for content" },
    ],
    stack: ["Next.js", "Tailwind", "SEO", "Analytics", "Schema.org"],
    links: {
      demo: "https://rachabeautywellness.com",
      code: "https://github.com/Taninwat-55/rachabeautywellness",
    },
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

