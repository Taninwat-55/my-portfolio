
// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  role: "Product Engineer",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    github: "https://github.com/Taninwat-55",
  },
};

// ─── HERO / ABOUT COPY ────────────────────────────────────────────────────────

export const siteContent = {
  availability: "Open to Product Engineer roles",

  heroIntro: "Taninwat Kaewpankan",
  heroLine: "Engineer. Builder. Thinker.",
  heroSubtitle: "Product engineer who ships end-to-end.",

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
      title: "Full-Stack Engineering",
      body: "I build end-to-end — React and Next.js on the front, Node.js, PostgreSQL, and Prisma on the back, AWS Lambda for background work, and AI pipelines where the product needs them. I don't stop at the UI boundary. I care about what ships, not just what compiles.",
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

  cvLink: "/assets/Taninwat_Kaewpankan_CV_Product.pdf",
  cvLabel: "Download Resume",

  heroHook: ["I take products from brief to live."],
  heroHookAccents: new Set(["brief", "live."]),
  heroPhilosophy:
    "I move from brief to shipped — fast, product-sharp, and sweating the right details.",
  techMarquee: [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "PostgreSQL", "Prisma", "AI SDK", "AWS Lambda",
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
      "Joined as a frontend developer at an early-stage AI startup, now an equity partner with a signed shareholder agreement. Took on a full navigation overhaul in React and Zustand, owned product discovery for a platform-wide UI/UX redesign, and shipped features continuously as the platform grew from early days to real clients. The product direction work landed in enterprise trials with Nordisk Film and DR.",
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
      ["Tailwind CSS", 3], ["HTML / CSS", 3], ["AI SDK", 2],
    ] as [string, number][],
  },
  {
    group: "Backend & Data",
    items: [
      ["Node.js", 2], ["PostgreSQL", 2], ["Prisma", 2],
      ["REST / WS", 2], ["AWS Lambda", 2],
    ] as [string, number][],
  },
  {
    group: "Craft & Tools",
    items: [
      ["Performance", 3], ["Git / GitHub", 3], ["Figma", 2],
      ["Analytics", 2], ["Accessibility", 2],
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
  links: { demo: string; code: string; docs?: string };
}

export const cases: CaseStudy[] = [
  {
    n: "01",
    tag: "AI SaaS",
    title: "MockMate",
    sub: "Paste a job description. Get a tailored interview. Get graded like a hiring panel would.",
    featured: true,
    images: [
      "/assets/mockmate/mockmate-landing.png",
      "/assets/mockmate/mockmate-dashboard.png",
      "/assets/mockmate/mockmate-feedback.png",
    ],
    overview:
      "A full-stack AI interview platform: paste a job description, answer tailored technical questions from an AI interviewer, and receive a structured graded report — built with Next.js, Google Gemini, Prisma, and AWS Lambda for background processing.",
    challenge:
      "Interview prep tools ask you to read, not do. The real problem was designing an AI pipeline that ingests any job description, generates role-specific technical questions, and grades answers the way a hiring panel would — with depth, clarity, and gap analysis — not just correct or incorrect.",
    stackWhy:
      "Next.js App Router for full-stack delivery in one repo. Google Gemini via the Vercel AI SDK for streaming question generation and answer grading. AWS Lambda for heavy grading jobs so the UI never blocks. Prisma for a typed data layer. PDF.js to parse uploaded resumes. PostHog to see where users drop off.",
    engineering:
      "Built an AI pipeline: JD upload → Gemini parses role requirements → generates targeted questions → streams answers → grading runs in AWS Lambda with structured Zod-validated output. Resume uploads are parsed with PDF.js and fed into the question-generation context so questions match the candidate's actual background.",
    metrics: [
      { v: "Live", k: "Product" },
      { v: "Gemini", k: "Interview engine" },
      { v: "Lambda", k: "Background grading" },
    ],
    stack: ["Next.js", "TypeScript", "AWS Lambda", "Shadcn/UI"],
    links: { demo: "https://mockmate.space/", code: "https://github.com/Taninwat-55/mockmate", docs: "https://github.com/Taninwat-55/mockmate/blob/main/docs/PRD.md" },
  },
  {
    n: "02",
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
      "Skills are claimed everywhere and verified nowhere. The product problem was making endorsements mean something. The technical problem was designing multi-role data isolation at the database layer — so the security model is a constraint, not a client-side hope.",
    stackWhy:
      "Supabase for RLS-based multi-role auth so security lives in the database, not the frontend. React and TypeScript on the front so the data model surfaces cleanly in the component tree. Next.js for SSR and SEO.",
    engineering:
      "Owned the product end-to-end: defined the two-role model (candidate and employer), designed RLS policies before writing a single line of UI, and shipped 8+ AI features on top of a security layer most side projects skip entirely.",
    metrics: [
      { v: "RLS", k: "Database security" },
      { v: "8+", k: "AI features" },
      { v: "100", k: "SEO score" },
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "Vitest"],
    links: { demo: "https://bevisly.com/", code: "https://github.com/Taninwat-55/Bevisly" },
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
      "No clean tool existed for tracking Bitcoin's real purchasing power across currencies in one place. The technical constraint was making a live-data UI stay responsive when price feeds update constantly — and keeping the conversion logic correct when the data model changed.",
    stackWhy:
      "React and Tailwind for the live UI; Vitest to pin the conversion logic so refactors can't silently break numbers users depend on. No heavyweight state library — co-located state was enough.",
    engineering:
      "Identified the product gap, scoped the feature set, and shipped it. Pushed all derived math into selectors so only cells with changed values re-render. The test suite runs against pure conversion functions so coverage is fast and the maths stays trusted across iterations.",
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
    tag: "Full Stack",
    title: "Cinema Booking",
    sub: "My first full-stack project — a complete booking system built with a team of students at Jensen.",
    featured: false,
    images: [
      "/assets/cinema/cinema-index.png",
      "/assets/cinema/cinema-movie-id.png",
      "/assets/cinema/cinema-seat.png",
    ],
    overview:
      "A team project from Jensen — full-stack cinema booking engine with React on the front and Node.js + PostgreSQL on the back. Covers the full flow: browse movies, pick a showing, select seats, confirm a booking, and manage it from a user account.",
    challenge:
      "The main learning challenge was keeping client and server in sync across a multi-step booking flow — seat availability, auth state, booking confirmation — without the project falling apart at the seams. For a first full-stack build, that coordination was the hard part.",
    stackWhy:
      "React for the UI, Node.js for the API, PostgreSQL for persistence. Structured around a clean model/controller/route separation so each layer stayed focused and testable in isolation.",
    engineering:
      "Built the full REST API from scratch: auth with role-based access (admin and user), seat selection tied to a specific showing, booking creation with confirmation number, history, and cancellation. My first time owning a server, a database schema, and a client simultaneously.",
    metrics: [
      { v: "PostgreSQL", k: "Database" },
      { v: "Auth", k: "Admin + user roles" },
      { v: "Full-stack", k: "React + Node.js" },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "REST API"],
    links: {
      demo: "https://cinema-booking-system-project.vercel.app",
      code: "https://github.com/Taninwat-55/cinema-booking-system-project",
    },
  },
  {
    n: "05",
    tag: "Commercial",
    title: "Racha Beauty",
    sub: "From zero web presence to 95+ Lighthouse and local search visibility.",
    featured: false,
    images: [
      "/assets/racha/Racha_img.webp",
      "/assets/racha/about-racha.webp",
      "/assets/racha/racha_services.webp",
      "/assets/racha/racha-contact.webp",
    ],
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

// ─── CHATBOT CONTEXT ──────────────────────────────────────────────────────────

export const chatbotContext = `
Taninwat is actively job searching as of June 2026. He just graduated from Jensen Yrkeshögskola's Frontend Developer program (May 2026) and is looking for his first professional role in tech — ideally a Product Engineer role — a position where he can own delivery end-to-end: shaping product direction, building the thing, and iterating on real feedback. He's comfortable going full-stack when the work calls for it.

He's based in Denmark and holds dual Thai-Swedish citizenship, so he can work anywhere in the EU/Schengen without visa complications. He's open to roles in Denmark, Sweden, or remote.

He's honest about where he stands: his degree is a vocational frontend program, not a CS degree, so he doesn't pretend to be a systems engineer. What he does bring is genuine project delivery experience — he's shipped real products (Bevisly — a skill-verification SaaS; MockMate — an AI interview platform; a commercial client site; a full-stack booking system), led an organisation as Head of Operations at Millennial Consulting, and holds a small equity stake at an early-stage AI startup (Trailr AI) as a partner.

He works best in environments where he can own something end-to-end, figure things out without constant hand-holding, and collaborate closely with a small team. He's not looking for the biggest company — he's looking for the right fit.

He's not currently receiving a salary from Trailr AI (equity-only until agreed milestones), so he's fully available for full-time employment in parallel.
`.trim();

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 98,
    title: "MockMate",
    category: "AI SaaS",
    description:
      "Paste a job description. Answer questions from an AI interviewer. Get graded like a real hiring panel would. Built full-stack with Next.js, Google Gemini, Prisma, and AWS Lambda — PDF resume parsing, structured AI grading, and PostHog to track where the product actually needs work.",
    tech: ["Next.js", "TypeScript", "Google Gemini", "Prisma", "AWS Lambda", "PostHog"],
    links: {
      demo: "https://mockmate.space/",
      code: "https://github.com/Taninwat-55/mockmate",
    },
    image: "/assets/mockmate/mockmate-landing.png",
  },
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
      code: "https://github.com/Taninwat-55/Bevisly",
    },
    image: "/assets/bevisly/Bevisly-Landing.webp",
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
    id: 1,
    title: "Cinema Booking System",
    category: "Full Stack",
    description:
      "My first full-stack team project at Jensen. Built a cinema booking engine — React on the front, Node.js and PostgreSQL on the back. Covers the complete flow: browse movies, pick a showing, select seats, confirm, and manage bookings from a user account. Role-based auth for both admin and regular users.",
    tech: ["React", "Node.js", "PostgreSQL", "REST API"],
    links: {
      demo: "https://cinema-booking-system-project.vercel.app",
      code: "https://github.com/Taninwat-55/cinema-booking-system-project",
    },
    image: "/assets/cinema/cinema-index.png",
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
    image: "/assets/racha/Racha_img.webp",
  },
];

