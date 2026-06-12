
// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    github: "https://github.com/Taninwat-55",
  },
};

// ─── SITE CONTENT ─────────────────────────────────────────────────────────────
// Single flat identity: Product Engineer & Project Coordinator.

export const siteContent = {
  roleLabel: "Product Engineer & Project Coordinator",
  availability: "Open to product engineer & junior frontend roles",
  heroTagline:
    "a product engineer driven by shipping things that actually matter",
  cvLink: "/assets/Taninwat_Kaewpankan_CV_Product.pdf",
  cvLabel: "Download Resume",

  aboutStory: [
    "I moved to Sweden at 16 with no Swedish and no plan. I learned the language, rebuilt my grades, and worked every job that would have me — cleaning, waiting tables, running a food truck, bartending, sorting packages through the night.",
    "Somewhere between the food truck and the night shifts, I decided I wanted more.",
    "Before Uppsala, there was York, England. I moved there alone — fully by choice, for the first time in my life. Eight months of living completely independently, pushing my English further, figuring out who I was when nobody knew me or had any expectations of me. I had planned to study there. Brexit made it complicated. Uppsala said yes. So I followed.",
    "Uppsala University — one of Scandinavia's oldest. Not where I expected to end up, but I stopped questioning where life was sending me. Three years studying how interactive systems get designed and how projects actually get shipped. The most valuable thing wasn't any specific course — it was wearing the PM hat on real team projects, learning what it actually costs to take something from an idea to a finished thing. Then a Master's in Entrepreneurship. Because building was the only thing I ever kept coming back to.",
    "Denmark wasn't the plan. But life pointed there, and I've learned not to argue with that. A new country, again. The same familiar question: what do I make of this? I found Millennial Consulting — joined the operations team, adapted quickly to how things worked, and eventually grew into leading the organization.",
    "I wanted to become a more complete builder — someone who understands technical constraints, not just concepts. So I enrolled in a Higher Vocational Diploma in Frontend Development at Jensen, which led me into an internship at Trailr AI. After graduating, I stayed on part-time as an early team member with equity warrants. I graduated from Jensen in May 2026.",
    "I'm in Copenhagen now. Still building. Still the same person who walked into Sweden without the language — just with a few more tools.",
  ],

  // Scroll-revealed paragraph in the About section.
  aboutAnimated:
    "I build and coordinate digital products — shaping what to build, shipping the frontend myself, and keeping delivery on track. I love working with small teams that want to move fast and ship things that actually matter. Let's build something incredible together!",

  whatIDo: [
    {
      title: "Product Management & Coordination",
      body: "Keeping work moving end-to-end — scoping, prioritization, stakeholder alignment, and delivery. At Millennial Consulting I progressed rapidly over four cycles: starting in operations, advancing to Operations Manager, and ultimately serving as Head of Organization — helping coordinate and deliver around 20 client projects with no full-time staff.",
    },
    {
      title: "Frontend Development",
      body: "Building fast, accessible web products with React, Next.js, and TypeScript. I care about what ships and how it actually feels — not just whether it compiles.",
    },
    {
      title: "Product",
      body: "Starting from the problem, not the feature list. I own product decisions — what to build, what to cut, and why — then validate them by prototyping and shipping.",
    },
    {
      title: "AI-Native",
      body: "Using AI as a core part of how I work: the product thinking is mine, AI accelerates implementation, and everything that ships gets reviewed. It means I can move fast without cutting corners.",
    },
    {
      title: "Web Design & Development",
      body: "Building modern, user-friendly websites that attract visitors and turn them into customers through clean design and strong layouts.",
    },
  ],
};

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const experience = [
  {
    id: "work-trailr",
    type: "work",
    role: "Frontend Developer → Product Engineer (part-time)",
    organization: "Trailr.ai (Remote)",
    period: "Sep 2025 – Present",
    description:
      "Joined as a frontend intern at an early-stage AI startup; after graduating, continued part-time with equity warrants. Led the redesign of the platform's UI/UX — benchmarked direct and indirect competitors, synthesized findings into a design direction, and scoped the work to what the existing backend could support, cutting features rather than forcing backend changes. Took on a full navigation overhaul in React and Zustand. The platform secured enterprise trials with Nordisk Film and DR during this period.",
  },
  {
    id: "edu-1",
    type: "education",
    role: "Higher Vocational Diploma in Frontend Development (2-year program)",
    organization: "Jensen Yrkeshögskola",
    period: "2024 – 2026",
    description:
      "A Higher Vocational Diploma in Frontend Development (2-year program) — React, TypeScript, Next.js, testing, and performance. Graduated May 2026. Gave me the foundation to go deeper on my own.",
  },
  {
    id: "work-1",
    type: "work",
    role: "Head of Organization (Volunteer)",
    organization: "Millennial Consulting",
    period: "2023 – 2025",
    description:
      "Grew across four cycles from operations team member to Operations Manager to Head of Organization, coordinating around five simultaneous client projects per cycle with no full-time staff. Introduced a hybrid Agile/waterfall process — fixed milestones for clients, flexible mentor sessions for teams — ran it in parallel until it proved itself, and saw it adopted org-wide. Coordinated partner-firm workshops (PwC, BearingPoint, EY-Parthenon, Round) and staffed teams to projects.",
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

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string;
  n: string;
  tag: string;
  title: string;
  sub: string;
  images: string[];
  overview: string;
  challenge: string;
  stackWhy: string;
  engineering: string;
  metrics: { v: string; k: string }[];
  stack: string[];
  links: { demo: string; code: string; docs?: string; demoLabel?: string };
}

export const cases: CaseStudy[] = [
  {
    id: "millennial",
    n: "01",
    tag: "Management",
    title: "Millennial Consulting",
    sub: "Coordinating a 25-consultant student consultancy across simultaneous client projects.",
    images: [
      "/assets/millennial/Millennial_Fall2024.webp",
      "/assets/millennial/Millennial_Spring2025.webp",
      "/assets/millennial/spring2025_ice-break.webp",
      "/assets/millennial/fall2024_hot-seat.webp",
    ],
    overview:
      "A student-run strategy consultancy under the non-profit Station in Copenhagen, delivering pro-bono projects to real startups in 8-week cycles. Across four cycles I grew from operations team member to Operations Manager to Head of Organization.",
    challenge:
      "Every 8-week cycle ran ~5 client projects and 25–28 consultants in parallel — with no full-time staff and volunteers who could walk away at any time. The hard part was never a single project; it was keeping simultaneous engagements, student teams, partner firms, and clients aligned and delivering on time, in an org where authority was earned, not assigned.",
    stackWhy:
      "Process over tooling — lightweight structure the volunteers would actually adopt, plus partner-firm workshops to level the teams up.",
    engineering:
      "Spent my first two cycles as an operations team member learning how delivery actually worked, then led operations as Operations Manager, and ran the whole organization in my final cycle. I introduced a hybrid Agile/waterfall process — fixed milestones clients could rely on, flexible mentor sessions so teams could pivot on feedback — and ran it in parallel until it earned its place and was adopted org-wide. I staffed teams to projects, coordinated partner-firm workshops (PwC, BearingPoint, EY-Parthenon, Round), and led by enablement rather than micromanagement.",
    metrics: [
      { v: "5", k: "Clients / cycle (parallel)" },
      { v: "4 cycles", k: "Member → Head of Org" },
      { v: "Org-wide", k: "Process I introduced" },
    ],
    stack: ["Agile / Scrum", "Stakeholder Management", "Team Staffing", "Workshop Facilitation", "Process Design"],
    links: {
      demo: "https://www.millennialconsulting.dk",
      code: "",
      demoLabel: "Visit website",
    },
  },
  {
    id: "trailr",
    n: "02",
    tag: "Product",
    title: "Trailr AI",
    sub: "Leading a platform redesign at an early-stage AI video startup.",
    images: [
      "/assets/trailr/trailr-hero.webp",
      "/assets/trailr/trailr-clip-generator.webp",
      "/assets/trailr/trailr-screening-room.webp",
      "/assets/trailr/trailr-story-builder.webp",
    ],
    overview:
      "An early-stage AI video platform that secured enterprise trials with Nordisk Film and DR. I joined as a frontend intern and, after graduating, continued part-time with equity warrants — owning the product side of a full UI/UX redesign.",
    challenge:
      "The platform had grown feature-first and the UX had drifted. The real constraint: improve the product meaningfully without forcing backend changes a small team couldn't afford. The job was deciding what was worth building against what the existing backend could actually support.",
    stackWhy:
      "Product judgment over raw output — competitor research to find the gaps, ruthless scoping to ship within real constraints.",
    engineering:
      "Benchmarked direct and indirect competitors, synthesized the findings into a single design direction, and scoped ruthlessly to the backend's limits — cutting features rather than forcing rewrites. When the navigation proved convoluted, I led a 'click-reduction' overhaul — pulling Settings and Feedback out of the primary workspace so screening and building stayed front-and-centre. After the Nordisk Film pitch surfaced a need to make the AI less of a black box, I pushed for a 'thinking' UI that streams the model's reasoning word-by-word — trading a flashy result for the transparency enterprise clients actually trust. Throughout, I worked directly with the founder and engineers to sequence what shipped.",
    metrics: [
      { v: "Nordisk Film · DR", k: "Enterprise trials" },
      { v: "Full redesign", k: "Scoped to backend" },
      { v: "Nav overhaul", k: "Shipped" },
    ],
    stack: ["Competitive Research", "Product Scoping", "UI/UX Direction", "React", "Zustand"],
    links: {
      demo: "https://trailr.ai",
      code: "",
      demoLabel: "Visit Trailr",
    },
  },
  {
    id: "bevisly",
    n: "03",
    tag: "Full-Stack",
    title: "Bevisly",
    sub: "Turn skill claims into structured, verifiable proof.",
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
      "Owned the product end-to-end: defined the two-role model (candidate and employer), chose database-level row security over application-level checks, and designed those policies before writing UI, then shipped 8+ AI features on top of a security layer most side projects skip entirely. Designed the Employer Responsibility Score and Candidate Reliability Score to make ghosting visible and costly — an incentive-design decision, not a feature request.",
    metrics: [
      { v: "RLS", k: "Database security" },
      { v: "8+", k: "AI features" },
      { v: "100", k: "SEO score" },
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "Vitest"],
    links: { demo: "https://bevisly.com/", code: "https://github.com/Taninwat-55/Bevisly" },
  },
  {
    id: "mockmate",
    n: "04",
    tag: "Full-Stack",
    title: "MockMate",
    sub: "Paste a job description. Get a tailored interview. Get graded like a hiring panel would.",
    images: [
      "/assets/mockmate/mockmate-landing.webp",
      "/assets/mockmate/mockmate-dashboard.webp",
      "/assets/mockmate/mockmate-feedback.webp",
    ],
    overview:
      "A full-stack AI interview platform: paste a job description, answer tailored technical questions from an AI interviewer, and receive a structured graded report — built with Next.js, Google Gemini, Prisma, and AWS Lambda for background processing.",
    challenge:
      "Interview prep tools ask you to read, not do. The real problem was designing an AI pipeline that ingests any job description, generates role-specific technical questions, and grades answers the way a hiring panel would — with depth, clarity, and gap analysis — not just correct or incorrect.",
    stackWhy:
      "Next.js App Router for full-stack delivery in one repo. Google Gemini via the Vercel AI SDK for streaming question generation and answer grading. AWS Lambda for heavy grading jobs so the UI never blocks. Prisma for a typed data layer. PDF.js to parse uploaded resumes. PostHog to see where users drop off.",
    engineering:
      "Built an AI pipeline: JD upload → Gemini parses role requirements → generates targeted questions → streams answers → grading runs in AWS Lambda with structured Zod-validated output. Deliberately separated the AI into two flows — a live interview conversation and a separate grading pass — because mixing them made feedback inconsistent. Answers persist before AI processing, so a failed call never loses work.",
    metrics: [
      { v: "Live", k: "Product" },
      { v: "Gemini", k: "Interview engine" },
      { v: "Lambda", k: "Background grading" },
    ],
    stack: ["Next.js", "TypeScript", "AWS Lambda", "Shadcn/UI"],
    links: { demo: "https://mockmate.space/", code: "https://github.com/Taninwat-55/mockmate", docs: "https://github.com/Taninwat-55/mockmate/blob/main/docs/PRD.md" },
  },
  {
    id: "satoshi",
    n: "05",
    tag: "FinTech",
    title: "Satoshi Standard",
    sub: "Live Bitcoin purchasing-power dashboard across every major currency.",
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
    id: "cinema",
    n: "06",
    tag: "Full-Stack",
    title: "Cinema Booking",
    sub: "My first full-stack project — a complete booking system built with a team of students at Jensen.",
    images: [
      "/assets/cinema/cinema-index.webp",
      "/assets/cinema/cinema-movie-id.webp",
      "/assets/cinema/cinema-seat.webp",
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
    id: "racha",
    n: "07",
    tag: "Commercial",
    title: "Racha Beauty",
    sub: "From zero web presence to 95+ Lighthouse and local search visibility.",
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

// ─── HOMEPAGE PROJECT CARDS ───────────────────────────────────────────────────
// The 4 sticky-stacking cards in the Projects section.

export interface ProjectCard {
  number: string;
  title: string;
  category: string;
  buttonLabel: string;
  href: string;
  external: boolean;
  images: [string, string, string]; // [col1-top, col1-bottom, col2-tall]
}

export const projectCards: ProjectCard[] = [
  {
    number: "01",
    title: "Millennial Consulting",
    category: "Management",
    buttonLabel: "View Case",
    href: "/cases/millennial",
    external: false,
    images: [
      "/assets/millennial/Millennial_Spring2025.webp",
      "/assets/millennial/fall2024_hot-seat.webp",
      "/assets/millennial/Millennial_Fall2024.webp",
    ],
  },
  {
    number: "02",
    title: "Trailr AI",
    category: "Product",
    buttonLabel: "View Case",
    href: "/cases/trailr",
    external: false,
    images: [
      "/assets/trailr/trailr-hero.webp",
      "/assets/trailr/trailr-clip-generator.webp",
      "/assets/trailr/trailr-screening-room.webp",
    ],
  },
  {
    number: "03",
    title: "Bevisly",
    category: "Full-Stack",
    buttonLabel: "Live Demo",
    href: "https://bevisly.com",
    external: true,
    images: [
      "/assets/bevisly/Bevisly-Landing.webp",
      "/assets/bevisly/bevisly-employer-kanban.webp",
      "/assets/bevisly/bevisly-candidate.webp",
    ],
  },
  {
    number: "04",
    title: "MockMate",
    category: "Full-Stack",
    buttonLabel: "Live Demo",
    href: "https://mockmate.space",
    external: true,
    images: [
      "/assets/mockmate/mockmate-landing.webp",
      "/assets/mockmate/mockmate-dashboard.webp",
      "/assets/mockmate/mockmate-feedback.webp",
    ],
  },
];

// ─── MARQUEE IMAGES ───────────────────────────────────────────────────────────

export const marqueeImages = [
  "/assets/mockmate/mockmate-landing.webp",
  "/assets/trailr/trailr-story-builder.webp",
  "/assets/bevisly/Bevisly-Landing.webp",
  "/assets/satoshi-standard/satoshi-dashboard.webp",
  "/assets/trailr/trailr-screening-room.webp",
  "/assets/mockmate/mockmate-dashboard.webp",
  "/assets/millennial/Millennial_Spring2025.webp",
  "/assets/bevisly/bevisly-employer-kanban.webp",
];

// ─── CHATBOT CONTEXT ──────────────────────────────────────────────────────────

export const chatbotContext = `
Taninwat is actively job searching as of June 2026. He just earned his Higher Vocational Diploma in Frontend Development (2-year program) from Jensen Yrkeshögskola (May 2026) and is looking for his first professional role in tech — primarily product engineer, junior frontend developer, or product-adjacent roles at small companies. He wants a position where he can own delivery end-to-end: shaping product direction, building the thing, and iterating on real feedback. He's comfortable going full-stack when the work calls for it.

He's based in Denmark and holds dual Thai-Swedish citizenship, so he can work anywhere in the EU/Schengen without visa complications. He's open to roles in Denmark, Sweden, or remote.

He's honest about where he stands: his degree is a vocational frontend program, not a CS degree, so he doesn't pretend to be a systems engineer. What he does bring is genuine project delivery experience — he's shipped real products (Bevisly — a skill-verification SaaS; MockMate — an AI interview platform; a commercial client site; a full-stack booking system), led an organisation as Head of Organization at Millennial Consulting, and holds equity warrants at an early-stage AI startup (Trailr AI), where he contributes part-time.

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
    image: "/assets/mockmate/mockmate-landing.webp",
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
    image: "/assets/cinema/cinema-index.webp",
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
