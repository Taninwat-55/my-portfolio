
// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  // The site brands itself around the nickname, so anything that talks to
  // visitors needs to know the two names are one person.
  nickname: "Ice",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/taninwat-k-ice2539/",
    github: "https://github.com/Taninwat-55",
  },
};

/**
 * Where /services enquiries are delivered.
 *
 * Deliberately a separate name from personalInfo.email even though the value is
 * currently identical: one is the address shown to visitors, the other is where
 * a form submission is routed. They are different concerns and will diverge the
 * moment enquiries should stop landing in a personal inbox.
 *
 * Before changing this to something like hello@taninwatkaewpankan.xyz: verifying
 * a domain in Resend authorises SENDING from that domain, it does not create a
 * mailbox. Pointing this at an address with no inbound mail, forwarding rule or
 * mailbox behind it would drop every enquiry silently, with the form still
 * reporting success. Set up receiving first, send a test, then change this line.
 */
export const enquiryInbox = personalInfo.email;

// ─── SITE CONTENT ─────────────────────────────────────────────────────────────
// Single flat identity: Frontend Engineer & Project Coordinator.
// Frontend leads because that is where the depth actually is. Full-stack and
// product work are real too; whatIDo below is where the honest detail about
// relative depth lives, rather than hedging every label.

export const siteContent = {
  roleLabel: "Frontend Engineer & Project Coordinator",
  // Bottom-corner blocks in the hero. The hero composition puts the scrolling
  // name in the middle and everything else in the corners, so these lines carry
  // the whole "who / what / where" job on the first screen.
  heroCorners: {
    left: [
      "Frontend Engineer",
      "Full-stack builder",
      "Project Coordinator",
    ],
    right: { status: "Open to work", place: "Copenhagen, Denmark" },
  },
  // One general CV. Role-tailored versions get sent directly, not offered here —
  // a visitor picking between three versions is a visitor guessing at the identity.
  // Singular, not an array: there was only ever one entry, and both call sites
  // were working around the list rather than using it.
  cv: { label: "Download CV", href: "/assets/Taninwat_Kaewpankan_CV.pdf" },

  aboutStory: [
    "I moved to Sweden at 16 with no Swedish and no plan. I learned the language, rebuilt my grades, and worked every job that would have me. Cleaning, waiting tables, running a food truck, bartending, sorting packages through the night.",
    "Somewhere between the food truck and the night shifts, I decided I wanted more.",
    "Before Uppsala, there was York, England. I moved there alone, fully by choice, for the first time in my life. Eight months of living completely independently, pushing my English further, figuring out who I was when nobody knew me or had any expectations of me. I had planned to study there. Brexit made it complicated. Uppsala said yes. So I followed.",
    "Uppsala University, one of Scandinavia's oldest. Not where I expected to end up, but I stopped questioning where life was sending me. Three years studying how interactive systems get designed and how projects actually get shipped. The most valuable thing wasn't any specific course. It was wearing the PM hat on real team projects, learning what it actually costs to take something from an idea to a finished thing. Then a Master's in Entrepreneurship, because building was the only thing I ever kept coming back to.",
    "Denmark wasn't the plan. But life pointed there, and I've learned not to argue with that. A new country, again. The same familiar question: what do I make of this? I found Millennial Consulting, joined the operations team, adapted quickly to how things worked, and eventually grew into leading the organization.",
    "I wanted to become a more complete builder, someone who understands technical constraints, not just concepts. So I enrolled in a Higher Vocational Diploma in Frontend Development at Jensen, which led me into an internship at Trailr AI. After graduating, I stayed on part-time as an early team member with equity warrants. I graduated from Jensen in May 2026.",
    "I'm in Copenhagen now. Still building. Still the same person who walked into Sweden without the language, just with a few more tools.",
  ],

  // Anchored along the bottom of the About section, echoing the hero corners.
  // Every value here traces to aboutStory or the CV — nothing is inferred.
  aboutFacts: [
    { label: "Path", value: "Thailand → Sweden → England → Denmark" },
    { label: "Languages", value: "Thai, Swedish, English, Danish" },
    { label: "Based", value: "Copenhagen since 2023 · EU citizen" },
  ],

  // Scroll-revealed paragraph in the About section.
  aboutAnimated:
    "Here is how I work. I write a clear spec, break it into small steps, then check the result myself. That is different from prompting an AI and hoping. I use AI to move faster, but the product thinking and the final review are mine. I like small teams that want to move fast and ship things that actually matter. Let's build something together.",

  whatIDo: [
    {
      title: "Frontend Engineering",
      body: "React, Next.js, and TypeScript are where I am strongest and where I would want to be judged. Accessible, responsive interfaces, and the parts that never show up in a screenshot: keyboard paths, reduced-motion, Lighthouse budgets, and what the page does on a slow connection.",
    },
    {
      title: "Full-Stack Development",
      body: "I can take a feature the whole way — Node.js, Express, and PostgreSQL, data model to API to UI — and I have shipped it. The backend is the newer half of my toolkit, so I scope it honestly: I will own the slice end to end, and I will tell you where I would want review rather than guess in silence.",
    },
    {
      title: "Product Decisions",
      body: "Starting from the problem, not the feature list. What gets built, what gets cut, and why, then validated by prototyping and shipping. At Trailr that meant scoping a full redesign to what the existing backend could support, cutting features rather than forcing rewrites.",
    },
    {
      title: "Project Coordination & Delivery",
      body: "Scoping, prioritization, stakeholder alignment, and actually landing the work. At Millennial Consulting I moved up over four cycles, from Operations Assistant to Operations Manager to Head of Organization, helping coordinate and deliver around 20 client projects with no full-time staff.",
    },
    // The fifth block exists because the four above are all about working
    // inside someone else's organisation. This is the one where the commercial
    // side is mine too — quoting, pricing, handover. It is also the only honest
    // home for Webflow: putting a visual builder inside "Frontend Engineering"
    // would dilute the React/TypeScript claim that block is there to make.
    {
      title: "Client Work",
      body: "Taking a paying client from the first call to handover: working out what they actually need, quoting a fixed price, building it, and leaving them owning the result. I build in Webflow or in code, and I pick based on how the client wants to live with the site rather than which is faster for me. Racha Beauty has run since launch without maintenance.",
    },
  ],

  // The one place the recruiter page acknowledges freelance. Deliberately quiet:
  // stated as evidence of range, not as a second job hunt running in parallel.
  freelanceBand: {
    eyebrow: "Freelance",
    line: "I also take on a small number of client projects — websites and web app frontends for small businesses and startups.",
    cta: "See what I offer",
  },
};

// ─── CV ───────────────────────────────────────────────────────────────────────
// Mirrors the downloadable PDF one-to-one so the page and the file can't drift.
// If the PDF changes, change this too.

export interface CvEntry {
  org: string;
  role: string;
  period: string;
  place: string;
  bullets: string[];
}

export const cvData = {
  title: "Frontend Engineer & Project Coordinator",
  summary:
    "Frontend engineer who also runs the delivery. React, Next.js, and TypeScript are my depth, most recently at Trailr AI, where I owned a full platform redesign scoped to what the existing backend could support. I work full-stack too — Node.js, Express, and PostgreSQL — and I am clear that the backend is the newer half of my toolkit. Before Trailr, four cycles at Millennial Consulting, growing from Operations Assistant to Head of Organization and coordinating ~20 client engagements with no full-time staff. Building the thing and running the delivery are the same job to me.",

  // Four technical groups mirroring the PDF, plus the operations group the PDF
  // has no room for. A one-page CV has to cut; the page does not.
  skills: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],
    },
    {
      label: "Frontend",
      items: [
        "React",
        "Next.js",
        "TailwindCSS",
        "Zustand",
        "Redux",
        "Responsive Design",
        "Accessibility (WCAG)",
      ],
    },
    {
      label: "Backend & Databases",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "PostgreSQL",
        "Authentication & Authorization (JWT/OAuth)",
      ],
    },
    {
      label: "Tools & AI",
      items: [
        "Git/GitHub",
        "Vitest",
        "CI/CD (GitHub Actions)",
        "Claude Code",
        "AI Prototyping",
        "Webflow",
        "Framer",
      ],
    },
    {
      label: "Operations & Product",
      items: [
        "Client Relations",
        "Recruitment & Onboarding",
        "Requirements Gathering",
        "Process Design",
        "Stakeholder Communication",
        "Agile / Scrum",
        "Cross-functional Collaboration",
      ],
    },
  ],

  experience: [
    {
      org: "Trailr AI",
      role: "Frontend Developer (Intern → Part-time)",
      period: "Sep 2025 – Present",
      place: "Remote, Denmark",
      bullets: [
        "Working within an existing React + Zustand codebase, I took on a full overhaul of the platform's navigation UI, reworking state connections and wiring components to fit new design requirements.",
        "Most work arrived as rough briefs with no formal specs; I'd interpret the intent, flag feasibility gaps early, and work toward components that matched what the team had in mind.",
        "Collaborated across a small remote team where product, design, and engineering often overlapped.",
        "The platform secured enterprise trials with Nordisk Film and DR during this period.",
      ],
    },
    {
      org: "Millennial Consulting",
      role: "Operations Assistant → Operations Manager → Head of Organization (Volunteer)",
      period: "Sep 2023 – May 2025",
      place: "Copenhagen, Denmark",
      bullets: [
        "20+ client engagements across 4 cycles, 90%+ satisfaction each time.",
        "~5 projects and over 25 student consultants per cycle.",
        "Partner workshops with Deloitte, Accenture, EY-Parthenon, PwC, BearingPoint, and Round.",
        "Kept every cycle fully staffed in an all-volunteer organisation where anyone could walk away at any time, owning recruitment, onboarding, and staffing teams to projects, with no full-time staff to fall back on.",
      ],
    },
  ] satisfies CvEntry[],

  projects: [
    {
      org: "Bevisly",
      role: "Personal Project (React, TypeScript, Tailwind, Supabase, Vitest)",
      period: "Aug 2025 – Present",
      place: "Copenhagen, Denmark",
      bullets: [
        "Built a full hiring platform alone: employers post roles, candidates prove skills with real tasks, AI grades the work and drafts job listings.",
        "Designed both sides of the product, the employer flow and the candidate flow, so I know what each side needs to trust the process.",
      ],
    },
    {
      org: "MockMate",
      role: "Personal Project (Next.js, Neon PostgreSQL + Prisma, Tailwind)",
      period: "May 2026 – Present",
      place: "Copenhagen, Denmark",
      bullets: [
        "Built an AI interview practice tool where candidates rehearse real interviews and get feedback, born from my own job search.",
        "Designed a two-pass evaluation flow: the live interview stays conversational, while a separate grading pass reads only summarized notes, not the raw answers, keeping scores consistent and closing a prompt injection risk.",
        "Developed structured feedback scoring so each answer is graded on technical accuracy, clarity, and problem-solving, with one strength, one weakness, and one concrete tip per area.",
      ],
    },
  ] satisfies CvEntry[],

  education: [
    {
      school: "Uppsala University",
      degree: "BA in Game Design and Project Management",
      period: "Aug 2019 – Jun 2022",
      place: "Uppsala, Sweden",
    },
    {
      school: "Uppsala University",
      degree: "MSc in Business and Management — Entrepreneurship",
      period: "Aug 2022 – Jun 2023",
      place: "Uppsala, Sweden",
    },
    {
      school: "Jensen Yrkeshögskola",
      degree: "Higher Vocational Diploma in Frontend Development (2-year program)",
      period: "Aug 2024 – May 2026",
      place: "Malmö, Sweden",
    },
  ],

  additional: [
    { label: "Certificates", value: "Google Project Management Certificate" },
    {
      label: "Languages",
      value: "Thai (Native), English (Fluent), Swedish (Fluent), Danish (Beginner)",
    },
    {
      label: "Work authorization",
      value: "EU citizen — full right to work in Denmark and across the EU",
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
      "Joined as a frontend intern at an early-stage AI startup. After graduating, continued part-time with equity warrants. Led the redesign of the platform's UI/UX: benchmarked direct and indirect competitors, synthesized findings into a design direction, and scoped the work to what the existing backend could support, cutting features rather than forcing backend changes. Took on a full navigation overhaul in React and Zustand. The platform secured enterprise trials with Nordisk Film and DR during this period.",
  },
  {
    id: "edu-1",
    type: "education",
    role: "Higher Vocational Diploma in Frontend Development (2-year program)",
    organization: "Jensen Yrkeshögskola",
    period: "2024 – 2026",
    description:
      "A Higher Vocational Diploma in Frontend Development (2-year program). React, TypeScript, Next.js, testing, and performance. Graduated May 2026. Gave me the foundation to go deeper on my own.",
  },
  {
    id: "work-1",
    type: "work",
    role: "Head of Organization (Volunteer)",
    organization: "Millennial Consulting",
    period: "2023 – 2025",
    description:
      "Grew across four cycles from Operations Assistant to Operations Manager to Head of Organization, coordinating around five simultaneous client projects per cycle with no full-time staff. Introduced a hybrid Agile/waterfall process: fixed milestones for clients, flexible mentor sessions for teams. Ran it in parallel until it proved itself, then saw it adopted org-wide. Coordinated partner-firm workshops (Deloitte, Accenture, EY-Parthenon, PwC, BearingPoint, Round) and staffed teams to projects.",
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
      "One year focused on entrepreneurship and strategy at one of Scandinavia's most prestigious universities. Reinforced how I think about products, not just whether they can be built, but whether they should be.",
  },
  {
    id: "edu-3",
    type: "education",
    role: "BA, Game Design & Project Management",
    organization: "Uppsala University",
    period: "2019 – 2022",
    description:
      "Three years studying interactive system design and how projects actually get shipped. The most valuable part was wearing the PM hat on real team projects, where good process is what separates a demo from a product.",
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
    sub: "Coordinating a 25+ consultant student consultancy across simultaneous client projects.",
    images: [
      "/assets/millennial/Millennial_Spring2025.webp",
      "/assets/millennial/Millennial_Fall2024.webp",
      "/assets/millennial/spring2025_ice-break.webp",
      "/assets/millennial/fall2024_hot-seat.webp",
    ],
    overview:
      "A student-run strategy consultancy under the non-profit Station in Copenhagen, delivering pro-bono projects to real startups in 8-week cycles. Across four cycles I grew from Operations Assistant to Operations Manager to Head of Organization.",
    challenge:
      "Every 8-week cycle ran 5–6 client projects and 25+ consultants in parallel, with no full-time staff and volunteers who could walk away at any time. The hard part was never a single project. It was keeping simultaneous engagements, student teams, partner firms, and clients aligned and delivering on time, in an org where authority was earned, not assigned.",
    stackWhy:
      "Process over tooling. Lightweight structure the volunteers would actually adopt, partner-firm workshops to level the teams up, and a willingness to absorb whatever role went vacant.",
    engineering:
      "Spent my first two cycles as an Operations Assistant learning how delivery actually worked, then led operations as Operations Manager, and ran the whole organization in my final cycle. I built the student project booklet every cycle, collecting and summarizing client details, scope, mentors and contacts from BD and HR. I introduced a hybrid Agile/waterfall process: fixed milestones clients could rely on, flexible mentor sessions so teams could pivot on feedback. I ran it in parallel until it earned its place and was adopted org-wide, and added a lightweight Scrum and Kanban setup so the org could track activities and internal files. When leadership turnover was high I onboarded new HR people myself with no head in place, redistributed work, and kept the cycles running. In the final cycle I took over budget tracking and adjustments under Station's monthly limit after the finance lead left, and handled two client dissatisfaction cases by finding the communication gap and escalating when it needed escalating. I staffed teams of 25+ consultants across 5–6 parallel projects, coordinated partner-firm workshops (Deloitte, Accenture, EY-Parthenon, PwC, BearingPoint, Round), and led by enablement rather than micromanagement.",
    metrics: [
      { v: "5–6", k: "Clients / cycle (parallel)" },
      { v: "4 cycles", k: "Member → Head of Org" },
      { v: "Org-wide", k: "Process I introduced" },
    ],
    stack: [
      "Agile / Scrum / Kanban",
      "Stakeholder Management",
      "Team Staffing",
      "Workshop Facilitation",
      "Process Design",
      "Budget Tracking",
    ],
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
      "An early-stage AI video platform that secured enterprise trials with Nordisk Film and DR. I joined as a frontend intern and, after graduating, continued part-time with equity warrants, owning the product side of a full UI/UX redesign.",
    challenge:
      "The platform had grown feature-first and the UX had drifted. Most requests arrived as rough briefs with no formal specs. The real constraint: improve the product meaningfully without forcing backend changes a small team couldn't afford. The job was deciding what was worth building against what the existing backend could actually support.",
    stackWhy:
      "Product judgment over raw output. Competitor research to find the gaps, ruthless scoping to ship within real constraints.",
    engineering:
      "Benchmarked direct and indirect competitors, synthesized the findings into a single design direction, and scoped ruthlessly to the backend's limits, cutting features rather than forcing rewrites. When the navigation proved convoluted, I led a click-reduction overhaul, pulling Settings and Feedback out of the primary workspace so screening and building stayed front and centre. After the Nordisk Film pitch surfaced a need to make the AI less of a black box, I pushed for a thinking UI that streams the model's reasoning word by word, trading a flashy result for the transparency enterprise clients actually trust. Throughout, I worked directly with the founder and engineers to sequence what shipped.",
    metrics: [
      { v: "Nordisk Film · DR", k: "Enterprise trials" },
      { v: "Full redesign", k: "Scoped to backend" },
      { v: "Nav overhaul", k: "Shipped" },
    ],
    stack: ["Competitive Research", "Product Scoping", "UI/UX Direction", "React"],
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
      "A platform where skill claims come with structured, verifiable proof. Built full-stack with Supabase, PostgreSQL, and a row-level security model designed for multi-role data isolation.",
    challenge:
      "Skills are claimed everywhere and verified nowhere. The product problem was making endorsements mean something. The technical problem was designing multi-role data isolation at the database layer, so the security model is a constraint, not a client-side hope.",
    stackWhy:
      "Supabase for RLS-based multi-role auth so security lives in the database, not the frontend. React and TypeScript on the front so the data model surfaces cleanly in the component tree. Next.js for SSR and SEO.",
    engineering:
      "I owned the product end to end. I defined the two-role model, candidate and employer, and made one call early: enforce access with database-level row security instead of application-level checks. Why it matters: if those checks lived in the frontend or API, one missed guard would leak another role's data, and I would be trusting every future feature to remember the rule. Pushing it into the database means the rule holds even when the UI is wrong. I designed those policies before writing any UI, then shipped 8+ AI features on top of a security layer most side projects skip. I also designed the Employer Responsibility Score and Candidate Reliability Score to make ghosting visible and costly, an incentive-design decision, not a feature request.",
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
      "A full-stack AI interview platform. Paste a job description, answer tailored technical questions from an AI interviewer, and receive a structured graded report. Built with Next.js, Google Gemini, Prisma, and AWS Lambda for background processing.",
    challenge:
      "Interview prep tools ask you to read, not do. The real problem was designing an AI pipeline that ingests any job description, generates role-specific technical questions, and grades answers the way a hiring panel would, with depth, clarity, and gap analysis, not just correct or incorrect.",
    stackWhy:
      "Next.js App Router for full-stack delivery in one repo. Google Gemini via the Vercel AI SDK for streaming question generation and answer grading. AWS Lambda for heavy grading jobs so the UI never blocks. Prisma for a typed data layer. PDF.js to parse uploaded resumes. PostHog to see where users drop off.",
    engineering:
      "Built an AI pipeline: JD upload, Gemini parses role requirements, generates targeted questions, streams answers, and grading runs in AWS Lambda with structured Zod-validated output. Two decisions worth calling out. First, I split the AI into two separate flows, a live interview conversation and a separate grading pass. If I had merged them into one prompt, the feedback came out inconsistent, because the model was doing two jobs at once. Second, answers persist to the database before any AI runs. If a Gemini or Lambda call fails, the user's work is still there instead of vanishing mid-interview.",
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
      "No clean tool existed for tracking Bitcoin's real purchasing power across currencies in one place. The technical constraint was making a live-data UI stay responsive when price feeds update constantly, and keeping the conversion logic correct when the data model changed.",
    stackWhy:
      "React and Tailwind for the live UI. Vitest to pin the conversion logic so refactors can't silently break numbers users depend on. No heavyweight state library, co-located state was enough.",
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
    sub: "My first full-stack project, a complete booking system built with a team of students at Jensen.",
    images: [
      "/assets/cinema/cinema-index.webp",
      "/assets/cinema/cinema-movie-id.webp",
      "/assets/cinema/cinema-seat.webp",
    ],
    overview:
      "A team project from Jensen: full-stack cinema booking engine with React on the front and Node.js plus PostgreSQL on the back. Covers the full flow: browse movies, pick a showing, select seats, confirm a booking, and manage it from a user account.",
    challenge:
      "The main learning challenge was keeping client and server in sync across a multi-step booking flow: seat availability, auth state, booking confirmation, without the project falling apart at the seams. For a first full-stack build, that coordination was the hard part.",
    stackWhy:
      "React for the UI, Node.js for the API, PostgreSQL for persistence. Structured around a clean model/controller/route separation so each layer stayed focused and testable in isolation.",
    engineering:
      "Built the full REST API from scratch: auth with role-based access (admin and user), seat selection tied to a specific showing, booking creation with confirmation number, history, and cancellation. My first time owning a server, a database schema, and a client at the same time.",
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
    tag: "Client Work",
    title: "Racha Beauty",
    sub: "A paying client's first website: 95+ Lighthouse, Danish-language, no maintenance budget.",
    images: [
      "/assets/racha/racha-landing.webp",
      "/assets/racha/racha-services.webp",
      "/assets/racha/racha-about.webp",
      "/assets/racha/racha-contact.webp",
    ],
    overview:
      "A wellness studio in Næstved had no website at all, just a Facebook page. I built their first one: a Danish-language site covering treatments, prices, a gallery and an enquiry form. My first paid client project.",
    challenge:
      "A small local business has no budget for ongoing maintenance and nobody to call when something breaks. The site had to be fast on first deploy, cheap to host, and keep working without me — especially the contact form, since that is the only channel enquiries arrive through.",
    stackWhy:
      "React with Vite for a fast build and a small bundle. React Router for the Danish URLs the client wanted (/behandlinger, /kontakt). Tailwind so she could react to something visual instead of a spec. react-helmet-async for per-page titles and descriptions.",
    engineering:
      "95+ Lighthouse on first deploy. Every route is code-split with lazy() and Suspense behind a loader, all imagery is WebP, and an ErrorBoundary stops one failure from blanking the site. The contact form posts to Web3Forms and falls back to a Google Form if that request fails — on a site with no backend, a dropped enquiry is a lost customer.",
    metrics: [
      { v: "95+", k: "Lighthouse score" },
      { v: "First", k: "Paid client project" },
      { v: "2 paths", k: "Contact form fallback" },
    ],
    stack: ["React", "Vite", "React Router", "Tailwind", "Web3Forms", "Schema.org"],
    links: {
      demo: "https://rachabeautywellness.com",
      code: "https://github.com/Taninwat-55/rachabeautywellness",
    },
  },
];

// ─── SERVICES ─────────────────────────────────────────────────────────────────
// The /services page speaks to a different visitor than the homepage does: a
// business owner deciding whether to spend money, not a recruiter deciding
// whether to book a call. Everything here is framed as an outcome and a
// deliverable, never as a skill — whatIDo above already covers skills, for the
// other audience. If a bullet here could move into whatIDo unedited, it is
// written for the wrong reader.
//
// Every price appears exactly once, here. The page, the JSON-LD, and the
// chatbot's grounding all read from these strings rather than restating them,
// because a chatbot confidently quoting a price that changed three months ago
// is the worst possible outcome of this page existing.

export interface ServiceOffer {
  id: string; // doubles as the in-page anchor: /services#website
  n: string;
  name: string;
  tagline: string; // one sentence, set in italic serif
  forWho: string;
  includes: string[]; // deliverables, not activities
  priceRange: string; // always a range, never a single figure
  priceNote?: string;
  timeline: string;
  /**
   * Everything below applies to offer 01 only.
   *
   * Two things forced this shape. First, a price defined purely by page count
   * invites the obvious question "so what am I actually paying for?" — a
   * template shop will do five pages for 3.000 kr, and the honest answer is
   * that the pages are not the work. includedInEvery is that answer, stated
   * before anyone has to ask for it.
   *
   * Second, Webflow and a coded build genuinely do not cost the same to make,
   * and pretending otherwise to keep the page tidy would be a lie the client
   * pays for. Webflow is structurally quicker — no deploy pipeline, no build
   * config, a visual CMS out of the box — so it is priced lower to build and
   * higher to keep. Coded is the reverse. Showing both, with the five-year
   * total, is the only way a non-technical buyer can choose on fit rather than
   * on whichever number is smaller today.
   */
  includedInEvery?: { label: string; body: string; items: string[] };
  tracks?: {
    id: string;
    name: string;
    oneLiner: string;
    bestFor: string;
    rungs: { scope: string; detail: string; price: string; timeline: string }[];
    runningCost: string;
    editing: string;
  }[];
}

export const services = {
  intro: {
    eyebrow: "Freelance & Client Work",
    title: "Services",
    // "Selected" and "a few at a time" carry the positioning. Nothing in this
    // block should read as availability anxiety — that is the whole reason
    // freelance lives on its own page instead of next to "Open to work".
    lead: "I take on a small number of selected client projects alongside my product work.",
    body: "I build websites and web interfaces for businesses that need the thing to work, load fast, and keep working after I hand it over. Fixed scope, fixed price, agreed before anything starts. If I am not the right person for what you need, I will tell you on the first call.",
    chips: [
      "Copenhagen · remote across the EU",
      "Dansk · English · Svenska",
      "Fixed scope, fixed price",
      "A few projects at a time",
    ],
  },

  // Qualification before price. The "notFit" list is not modesty — it is the
  // clearest signal available that the work is chosen rather than accepted.
  audience: {
    fit: [
      "You run a small business with no website, or one you would rather people did not find.",
      "You have a product and need a frontend built on an API that already exists.",
      "Your site works but is slow, dated, or invisible on Google.",
      "You want one person who is accountable, not an agency with a project manager between you and the work.",
      "You want to own the result outright when it is finished.",
    ],
    notFit: [
      "You need a native iOS or Android app.",
      "You need a large backend or data platform built from nothing.",
      "You want the cheapest possible option — a template builder will serve you better.",
      "You need someone on call around the clock after launch.",
    ],
  },

  offers: [
    {
      id: "website",
      n: "01",
      name: "Small-Business Website",
      tagline: "The site your business should already have — fast, findable, and yours.",
      forWho: "Salons, studios, clinics, trades, and one-person businesses in Denmark and Sweden.",
      includes: [
        "Three to six pages, structured around what customers actually come looking for",
        "Built in Danish, English or Swedish, including the page addresses",
        "An enquiry form that reaches your inbox, with a second path so a message is never silently lost",
        "Mobile-first, because that is where nearly all of your visitors are",
        "Search basics set up so you can be found by name and by service",
        "Compressed imagery and a performance budget, so it loads on a phone on mobile data",
        "Hosting and domain set up in your name, not mine",
        "One round of revisions, and a walkthrough so you can edit the text yourself",
      ],
      includedInEvery: {
        label: "In every build, either way",
        body: "This is the part that separates a real site from a 3.000-kroner template job, and it is why the starting price is what it is. None of it is an upsell — it is in the price whichever way we build.",
        items: [
          "Search setup that actually works: page titles and descriptions written per page, a sitemap, structured data, and your Google Business profile connected — so you turn up when someone searches your town and your service, not just your name",
          "Built mobile-first and checked at real phone widths, because that is where nearly all of your visitors are",
          "A performance budget: compressed images, minimal scripts, and a site that opens fast on mobile data rather than on your office wifi",
          "Accessibility basics — keyboard navigation, readable contrast, labelled forms — which is both the right thing and increasingly a legal expectation",
          "An enquiry form that reaches your inbox, with a second delivery path so a lost message never costs you a customer",
          "Analytics, so you can see how many people found you and what they clicked",
          "Domain and hosting registered in your name, and a walkthrough at handover so nothing depends on me afterwards",
        ],
      },
      tracks: [
        {
          id: "webflow",
          name: "Webflow",
          oneLiner: "Pay less to build, a little every month to keep.",
          bestFor:
            "You want to change your own prices, photos and opening hours without calling anyone.",
          rungs: [
            {
              scope: "1–3 pages",
              detail: "A one-pager or simple presence: who you are, what you offer, how to reach you.",
              // Was 4.500. Danish freelancers start a simple site around 5.000,
              // so a floor below that does not read as good value — it reads as
              // inexperience, which is the opposite of what the number is for.
              price: "5.500 – 8.000 DKK",
              timeline: "4–7 days",
            },
            {
              scope: "4–8 pages",
              detail: "A full site: services, prices, gallery, about, and an enquiry form.",
              price: "9.000 – 15.000 DKK",
              timeline: "1.5–2.5 weeks",
            },
            {
              scope: "Add-ons",
              detail: "A second language, online booking, or a blog you post to yourself.",
              price: "+ 2.500 – 6.000 DKK",
              timeline: "+ 2–4 days each",
            },
          ],
          runningCost: "≈ 1.250 – 2.050 kr / year",
          editing: "Everything, visually",
        },
        {
          id: "coded",
          name: "Coded from scratch",
          oneLiner: "Pay more to build, almost nothing to keep.",
          bestFor:
            "You will rarely touch it once it is live, and you would rather not pay a subscription forever.",
          rungs: [
            {
              scope: "1–3 pages",
              detail: "The same site, hand-built: faster, lighter, and no platform underneath it.",
              price: "6.500 – 9.500 DKK",
              timeline: "1–2 weeks",
            },
            {
              scope: "4–8 pages",
              detail: "A full site with custom behaviour that a page builder cannot do cleanly.",
              price: "12.000 – 20.000 DKK",
              timeline: "2–3 weeks",
            },
            {
              scope: "Add-ons",
              detail: "A second language, online booking, or a blog you post to yourself.",
              price: "+ 3.000 – 8.000 DKK",
              timeline: "+ 3–5 days each",
            },
          ],
          runningCost: "≈ 100 – 1.600 kr / year",
          editing: "Text and images, not layout",
        },
      ],
      priceRange: "From 5.500 DKK",
      priceNote: "Webflow starts at 5.500, hand-coded at 6.500. No VAT is added — I am under the Danish registration threshold, so the figure you see is the figure you pay. It is fixed in writing before we start, and domain, hosting and any platform fee are billed to you directly rather than through me.",
      timeline: "4 days – 3 weeks",
    },
    {
      id: "app-frontend",
      n: "02",
      name: "Web App Frontend",
      tagline: "You have an API, a design, or a founder's sketch. I build the interface on top of it.",
      forWho: "Startups and product teams that need frontend capacity, not a whole agency.",
      includes: [
        "React, Next.js and TypeScript, built into your repository and your workflow",
        "A component set your team can keep building on after I am gone",
        "Wired to the API you already have — I scope to what your backend supports rather than asking you to change it",
        "Loading, empty and error states designed, not left to chance",
        "Keyboard paths, screen-reader labels and reduced-motion handled as part of the build",
        "Reviewed pull requests, so nothing lands that your team has not seen",
      ],
      priceRange: "4.800 DKK / day",
      priceNote: "Roughly 24.000 DKK a week. Quoted as a fixed project price wherever the scope is clear enough to fix.",
      timeline: "3–8 weeks, or ongoing part-time",
    },
    {
      id: "rescue",
      n: "03",
      name: "Redesign & Performance Rescue",
      tagline: "The site exists. It is slow, dated, or invisible. I fix it without starting over.",
      forWho: "Businesses with a site that works but is quietly losing them enquiries.",
      includes: [
        "A written audit — speed, mobile, accessibility and search basics, in plain language",
        "A prioritised list of fixes with what each one is actually worth, so you can stop at any point",
        "A visual refresh on the structure you already have",
        "Image, font and bundle work, usually where most of the speed is hiding",
        "Before-and-after numbers, measured the same way both times",
        "An honest call on rebuilding: if starting over is cheaper than repairing, I will say so and tell you why",
      ],
      priceRange: "8.000 – 16.000 DKK",
      priceNote: "The audit can be bought on its own for 3.500 DKK if you would rather take the fixes elsewhere.",
      timeline: "1–3 weeks",
    },
  ] satisfies ServiceOffer[],

  // Framing only. Every number and screenshot on the page is read from
  // cases[id === "racha"] at render time, so this section cannot drift from the
  // case study and cannot grow a metric that is not already in this file.
  // ── Client quote ────────────────────────────────────────────────────────
  // Deliberately null, and it must STAY null until the client has read the
  // exact words and said yes to them in writing.
  //
  // "Write whatever you like and I'll back it up if anyone asks" is not that.
  // It is permission to draft, not approval of a specific sentence, and a quote
  // published on that basis is a fabricated testimonial no matter how kindly it
  // was offered. Draft it, send it, get a reply agreeing to it, keep the reply,
  // then fill this in.
  //
  // To publish: set this object with { text, author, role, approvedOn }. The
  // page renders the block only when it is non-null, so there is nothing to
  // uncomment and nothing that can leak out half-finished.
  testimonial: null as null | {
    text: string;
    author: string;
    role: string;
    /** ISO date the client approved these exact words. */
    approvedOn: string;
  },

  proof: {
    caseId: "racha",
    // Headline states an outcome, not a superlative. The previous version —
    // "the first website a Næstved wellness studio ever had" — reads as a claim
    // about every wellness studio in the town, which is both false and
    // impossible to check. What is actually true is narrower: this client had
    // only a Facebook page, and the body below says so. On a page whose whole
    // argument is that the prices and claims are honest, an inflated line here
    // costs more than it wins.
    headline:
      "Her customers can now see every treatment and price without messaging first.",
    body: "Racha had a Facebook page and nothing else. I built her a Danish-language site covering treatments, prices, a gallery and an enquiry form. She has no budget for maintenance and nobody to call when something breaks, so the site was built to keep running without me — and it has.",
    // Retitles the case study's metric keys for a non-technical reader. The
    // values are untouched; only the wording changes.
    plainLabels: {
      "Lighthouse score": "Google speed score, on day one",
      "Paid client project": "First paying client",
      "Contact form fallback": "Backup routes, so no enquiry is lost",
    } as Record<string, string>,
  },

  // Two lists that mostly do not appear on freelancer sites, for opposite
  // reasons. The first is what the client physically walks away owning, which
  // matters because "who actually holds the domain" is where small businesses
  // get trapped by their previous developer. The second is what is NOT in the
  // price — and that one prevents the single most common scope blow-up in small
  // web projects, which is a client assuming their developer will write their
  // copy and take their photos. Saying it here costs one section and saves an
  // argument in week two.
  handover: {
    eyebrow: "What You End Up With",
    title: "Yours, not mine",
    lead: "At handover everything is in your name and nothing depends on me. If you want to hand the whole site to another developer next year, there is nothing to untangle and nothing to ask me for.",
    youGet: [
      "The live site on your own domain",
      "The domain registered in your name, with the login",
      "The hosting or Webflow account in your name — you can remove my access entirely",
      "The source: a code repository you own, or the Webflow project transferred to your account",
      "A short screen recording walking you through editing your own text and images",
      "Google Business profile connected and Search Console set up, so you can see what people search to find you",
      "The written scope, so what was agreed is on paper rather than in memory",
    ],
    notIncludedLabel: "Not in the price",
    notIncludedLead: "Said plainly so it is never a surprise halfway through. Most of these I can point you to someone good for.",
    notIncluded: [
      {
        item: "Writing your content",
        detail: "I will structure it, edit it, and tell you what each page needs — but the words about your own business should come from you or a copywriter. It is the most common thing that delays a project.",
      },
      {
        item: "Professional photography",
        detail: "A site is only as good as its pictures. Phone photos in good light are often fine; if you need a photographer, budget for one separately.",
      },
      {
        item: "Logo and brand identity",
        detail: "I design around the brand you already have. Creating one from nothing is a different job.",
      },
      {
        item: "Ongoing SEO or advertising",
        detail: "I set the foundations so you can be found, and that is included. Running campaigns month to month is somebody else's speciality, not mine.",
      },
      {
        item: "Legal wording",
        detail: "I put the privacy page, cookie notice and structure in place. The actual wording should be checked by someone qualified — I am not.",
      },
    ],
  },

  // What the site costs to KEEP, not to build. Almost nobody publishes this,
  // which is exactly why it earns trust: the running cost is the thing a small
  // business gets surprised by a year later, and the honest comparison is the
  // strongest argument that the build choice is being made for the client's
  // benefit rather than for whichever tool is quicker to work in.
  //
  // Figures are approximate and in DKK per year. Webflow's own site plans are
  // priced in USD and moved in May 2026 (Premium replaced CMS/Business), so
  // these are stated as "around" rather than to the krone, and the page says so.
  runningCosts: {
    eyebrow: "After Launch",
    title: "What it costs to keep",
    lead: "The build is a one-off. This is what you pay every year afterwards, and it depends on which way we build it.",
    note: "Approximate, in DKK per year, and billed to you directly rather than through me — I do not mark up other people's invoices. Webflow prices in dollars and changed its plans in May 2026, so treat that column as a close estimate rather than a quote.",
    rows: [
      {
        label: "Platform fee",
        webflow: "≈ 1.150 – 1.950 kr",
        coded: "0 kr",
        why: "Webflow charges a monthly site plan: around 1.150 kr a year on Basic and 1.950 kr on Premium if you pay annually, and roughly half again as much if you pay month to month. A hand-coded site has no platform underneath it, so there is nothing to subscribe to.",
      },
      {
        label: "Hosting",
        webflow: "Included",
        coded: "0 – 1.500 kr",
        why: "Included in Webflow's plan. For a coded site, a marketing site this size fits inside the free tier at Netlify or Vercel — but that is a company's free tier, not a promise, so if it ever changes or you would rather sit on a Danish webhotel, budget 500 – 1.500 kr a year.",
      },
      {
        label: "Domain",
        webflow: "≈ 100 kr",
        coded: "≈ 100 kr",
        why: "A .dk domain, the same either way, registered in your name and not mine.",
      },
      {
        label: "Editing it yourself",
        webflow: "Included",
        coded: "Text yes, layout no",
        why: "Webflow gives you a visual editor. On a coded site you can change text and images, but a new section means calling a developer.",
      },
    ],
    // Build price plus five years of running cost. Worth publishing because the
    // cheaper build is not the cheaper site, and a client comparing only the
    // first number is being quietly misled by every quote they will receive.
    fiveYear: {
      label: "Five years, all in",
      note: "Build price plus five years of platform, hosting and domain. Same site, both ways.",
      rows: [
        { scope: "1–3 page site", webflow: "11.500 – 18.500 kr", coded: "7.000 – 17.500 kr" },
        { scope: "4–8 page site", webflow: "15.000 – 25.500 kr", coded: "12.500 – 28.000 kr" },
      ],
    },
    verdict:
      "Over five years the two land close together, and that is the point: choose on how you want to live with the site, not on which number is smaller on day one. If you want to change your own prices, photos and opening hours, Webflow earns its subscription back the first handful of times you do it instead of asking me. If the site will mostly sit still once it is up, hand-coded costs less to own and there is no monthly bill at all. On a small site that never changes, coded is clearly the cheaper way to own it.",
  },

  cta: {
    eyebrow: "Next Step",
    title: "Tell me about it",
    body: "A few lines about the business and what you need is enough to start. If it is not a fit, I will say so and point you somewhere better.",
    fallback: "Rather just write to me?",
  },
};

// The buyer's real fear is handing over money and then not knowing what is
// happening. Each step therefore carries a duration and a concrete artefact,
// not just a verb.
export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  youGet: string;
  duration: string;
}

export const servicesProcess: ProcessStep[] = [
  {
    n: "01",
    title: "Call",
    body: "Thirty minutes, no charge, no pitch. You describe the business and what you need. I ask the awkward questions early and tell you honestly whether I am the right person.",
    youGet: "A straight yes or no, on the call.",
    duration: "30 min",
  },
  {
    n: "02",
    title: "Scope",
    body: "I write down exactly what is included, what it costs, and when it will be finished. The price is fixed at this point. If I cannot scope something confidently, I say so instead of padding the estimate.",
    youGet: "A written scope and a fixed price.",
    duration: "2–3 days",
  },
  {
    n: "03",
    title: "Build",
    body: "You get a live preview link from the first day, so you can watch it take shape rather than waiting for a reveal. One round of revisions is already in the price.",
    youGet: "A preview link, updated as I go.",
    duration: "1–8 weeks",
  },
  {
    n: "04",
    title: "Handover",
    body: "The code, the domain and the hosting all end up in your name. I walk you through updating the text yourself, and I stay reachable for fixes after launch.",
    youGet: "Everything in your name, plus a walkthrough.",
    duration: "1 day",
  },
];

// Four questions, answered the way they would be answered on the phone. Every
// claim traces to cases[racha] or cvData — nothing here is aspirational.
export interface FaqItem {
  q: string;
  a: string;
}

export const servicesFaq: FaqItem[] = [
  // Deliberately first. "What does a website cost" is the single highest-intent
  // thing anyone types, and answering it with a real number — rather than
  // "it depends" — is what gets a page quoted by search and AI assistants.
  {
    q: "What does a website actually cost?",
    a: `It depends on how many pages and which way we build it, so both are published rather than quoted on request. In Webflow, a one-pager or simple three-page site is ${services.offers[0].tracks![0].rungs[0].price} and a full four-to-eight page site is ${services.offers[0].tracks![0].rungs[1].price}. Hand-coded, the same two are ${services.offers[0].tracks![1].rungs[0].price} and ${services.offers[0].tracks![1].rungs[1].price} — more to build, but almost nothing to run afterwards. Fixing an existing site is ${services.offers[2].priceRange}, and frontend work on a web app is ${services.offers[1].priceRange}. The exact number is fixed in writing before any work starts, and no VAT is added on top — I am under the Danish registration threshold, so the price you are quoted is the price you pay. For context, a simple site from a Danish freelancer or agency typically runs 5.000 to 25.000 kroner before moms, so this sits at the lower half of the market.`,
  },
  {
    q: "Why not just get a site for 3.000 kroner?",
    a: "You can, and for some businesses that is genuinely the right call — if you need a placeholder page and nothing more, a template builder will do it cheaper than I will. What you usually do not get at that price is the part that makes the site earn its money: search setup written per page so you turn up when someone searches your town and your service, a performance budget so it opens fast on mobile data, accessibility basics, an enquiry form with a backup delivery path, and analytics so you can tell whether any of it is working. That work is the same amount of work whether the site has three pages or eight, which is why the starting price is where it is. If your budget is firmly under 5.000, say so in the enquiry form — I will tell you honestly whether to spend it with me or somewhere else.",
  },
  {
    q: "What is the real difference in cost between Webflow and coded?",
    a: `Webflow is cheaper to build and costs a little every month. Hand-coded is more to build and costs almost nothing to keep. Concretely, on a four-to-eight page site: Webflow is ${services.offers[0].tracks![0].rungs[1].price} to build plus roughly 1.250 to 2.050 kroner a year, and coded is ${services.offers[0].tracks![1].rungs[1].price} to build plus roughly 100 to 1.600 kroner a year. Over five years that is about 15.000 to 25.500 against 12.500 to 28.000 — close enough that the money should not decide it. What should decide it is whether you want to edit the site yourself. If yes, Webflow. If it will mostly sit still once it is live, coded.`,
  },
  // Deliberately a FAQ rather than a line on the offer card. To the buyer this
  // page is written for, "React · Next.js · TypeScript" is noise, and jargon in
  // the money section reads as "this will be complicated and I will not
  // understand it". Collapsed, it costs the non-technical reader nothing and is
  // there instantly for anyone checking whether they would be locked in.
  {
    q: "What do you build it with, and could another developer take it over?",
    a: "Hand-coded sites are built with React and Next.js in TypeScript, styled with Tailwind CSS, and hosted on Netlify or Vercel. Forms go through a service like Resend so messages reach you even though there is no server to maintain. If we build in Webflow instead, the site lives in Webflow and there is no code to hand over at all. The part that actually matters: these are mainstream tools, not anything invented here. Any React developer can open the repository and continue, which is deliberate — you should be able to replace me without replacing your website. Racha Beauty's site is React and Tailwind, and the full stack for every project I have built is listed on its case study page.",
  },
  {
    q: "Do I have to pay a monthly fee for Webflow?",
    a: "Only if we build it in Webflow, and you pay it directly rather than through me — I do not mark up other people's invoices. A Webflow site plan is roughly 1.150 to 1.950 kroner a year and covers hosting, security and the visual editor. A coded site has no platform fee. Its hosting fits inside the free tier at Netlify or Vercel for a site this size, though I will not pretend a company's free tier is a guarantee: if it changes, or you would rather sit on a Danish webhotel, that is 500 to 1.500 kroner a year. Either way the domain is about 100 kroner, in your name.",
  },
  {
    q: "Can I update the website myself afterwards?",
    a: "Yes, and that is partly what decides how it gets built. If editing it yourself matters to you, I build it in Webflow, where you can change text, prices and images from a visual editor without touching code. If you would rather have maximum speed, custom features and no monthly platform fee, I code it from scratch and hand you a simple way to edit the text. Either way you get a walkthrough at handover, and either way you are not locked into paying me for small changes.",
  },
  {
    q: "Do you only work with clients in Copenhagen?",
    a: "No. I am based in Copenhagen and happy to meet in person anywhere in the greater Copenhagen area, but most of the work happens remotely and I take clients across Denmark, Sweden, and the rest of the EU. Racha Beauty is in Næstved and that project ran almost entirely remotely. If we never meet in person, nothing about the result changes.",
  },
  {
    q: "Do you maintain the site afterwards?",
    a: "Not by default, and that is deliberate. I build sites that do not need a monthly retainer to keep working — Racha Beauty's site has run since launch without anyone touching it. If you do want ongoing changes, we agree an hourly rate or a small block of hours per month, and you can stop whenever you like.",
  },
  {
    q: "Which languages can you work in?",
    a: "I build in Danish, English and Swedish. Racha Beauty's site is entirely Danish, down to the page addresses. My own spoken Danish is still improving, so we can run the project itself in English or Swedish and still ship a fully Danish site — the language of the meetings and the language of the website are two different things.",
  },
  {
    q: "How long does it actually take?",
    a: "A small-business site is usually two to three weeks, a rescue one to three, an app frontend three to eight. Those are real numbers, not best cases. The most common delay is not the build — it is waiting on text and photos from you, which is why the scope says exactly what I need from you and when.",
  },
  {
    q: "Who owns the code?",
    a: "You do, completely. The code lives in a repository in your name, on hosting in your name, with the domain in your name. If you want to hand the whole thing to another developer next year, there is nothing to untangle and nothing you need to ask me for.",
  },
];

// The select values are an API contract: app/lib/services-enquiry.ts turns them
// into the server-side allowlist, so the rendered <option> values and what the
// endpoint accepts cannot drift apart. Labels are safe to reword. Values are not.
export const servicesEnquiryOptions = {
  projectType: [
    { value: "small-business-site", label: "A website for my business" },
    { value: "web-app-frontend", label: "A web app frontend build" },
    { value: "redesign-rescue", label: "Redesign / make my site faster" },
    { value: "something-else", label: "Something else" },
  ],
  // Bands straddle the published prices rather than mirroring them: a visitor
  // who has to pick the exact band an offer sits in learns nothing, and one
  // whose budget is below the floor should be able to say so honestly.
  budget: [
    { value: "under-10k", label: "Under 10.000 DKK" },
    { value: "10k-25k", label: "10.000 – 25.000 DKK" },
    { value: "25k-50k", label: "25.000 – 50.000 DKK" },
    { value: "50k-plus", label: "50.000 DKK +" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  timeline: [
    { value: "asap", label: "As soon as possible" },
    { value: "1-3-months", label: "In the next 1–3 months" },
    { value: "later", label: "Later this year" },
    { value: "exploring", label: "Just exploring" },
  ],
} as const;

// ─── HOMEPAGE PROJECT CARDS ───────────────────────────────────────────────────
// The sticky-stacking cards in the Projects section.

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
    number: "02",
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
    number: "03",
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
  {
    number: "04",
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
    number: "05",
    title: "Racha Beauty",
    category: "Client Work",
    buttonLabel: "View Case",
    href: "/cases/racha",
    external: false,
    images: [
      "/assets/racha/racha-landing.webp",
      "/assets/racha/racha-services.webp",
      "/assets/racha/racha-about.webp",
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
Taninwat is actively job searching as of July 2026. He recently earned his Higher Vocational Diploma in Frontend Development (2-year program) from Jensen Yrkeshögskola (May 2026). He targets frontend engineering roles first, and is equally open to product engineer or full-stack roles at small companies where he can own delivery end to end: shaping product direction, building the thing, and iterating on real feedback. Frontend is his depth — React, Next.js, TypeScript. He works full-stack too (Node.js, Express, PostgreSQL) and is straightforward that the backend is the newer half of his toolkit rather than overselling it.

He's based in Denmark and holds dual Thai-Swedish citizenship, so he can work anywhere in the EU/Schengen without visa complications. He's open to roles in Denmark, Sweden, or remote.

He's honest about where he stands. His degree is a vocational frontend program, not a CS degree, so he doesn't pretend to be a systems engineer. What he brings is genuine delivery and operations experience. He led an organisation as Head of Organization at Millennial Consulting, coordinating around five client projects per cycle with no full-time staff. He has shipped real products (Bevisly, a skill-verification SaaS; MockMate, an AI interview platform; a commercial client site; a full-stack booking system), and holds equity warrants at an early-stage AI startup, Trailr AI, where he contributes part-time.

He works best where he can own something end to end, figure things out without constant hand-holding, and collaborate closely with a small team. He's not looking for the biggest company, he's looking for the right fit.

He's not currently receiving a salary from Trailr AI (equity-only until agreed milestones), so he's fully available for full-time employment in parallel.
`.trim();

// Grounding for when the visitor is a potential client rather than a recruiter.
// Prices are interpolated from services.offers rather than retyped: the chatbot
// is the surface most likely to be quoting a figure months after it changed, so
// it must be structurally impossible for it to hold its own copy of one.
export const servicesContext = `
Alongside looking for employment, Ice takes on a small number of freelance client projects for small businesses, startups, and solo founders. The services page is https://taninwatkaewpankan.xyz/services and the enquiry form on it is how a conversation starts.

What he takes on:
${services.offers
  .map((o) => `- ${o.name} (${o.priceRange}, typically ${o.timeline}): ${o.tagline} ${o.forWho}`)
  .join("\n")}

Proof: rachabeautywellness.com, a Danish-language site he built end to end for a wellness studio in Næstved that had only a Facebook page. 95+ Lighthouse on first deploy, and it has run since launch without maintenance.

A small-business website is priced by build method, because the two genuinely differ. You may quote these figures — they are published on the services page:
${services.offers[0]
  .tracks!.map(
    (t) =>
      `- ${t.name}: ${t.rungs[0].price} for ${t.rungs[0].scope}, ${t.rungs[1].price} for ${t.rungs[1].scope}. Then ${t.runningCost} to run. Best if: ${t.bestFor}`
  )
  .join("\n")}
Over five years the two land close together, so the honest advice is to choose on whether the client wants to edit the site themselves (Webflow) or wants it to sit still and cost almost nothing to keep (coded) — not on the build price alone.

Every build, either way, includes per-page search setup and Google Business connection, mobile-first construction, a performance budget, accessibility basics, an enquiry form with a backup delivery path, analytics, and domain and hosting in the client's name. If someone asks why it is not 3.000 kroner, that list is the answer: a template shop skips it, and it is the part that makes the site actually get found and convert.

Note that his shipped client work to date is coded rather than Webflow — do not claim Webflow case studies until there are some.

How he works: a short call, then a written scope with a fixed price and a delivery date before any work starts. Fixed scope, not open-ended hourly billing. He does the work himself — there is no agency and no handoff to someone else. The code, domain and hosting all end up in the client's name.

What he does not take on: native iOS/Android apps, ongoing SEO or marketing retainers, and large backend-heavy platforms built from nothing.

VAT: no moms is added to any of these figures. He is under the Danish 50.000 kr registration threshold, so a quoted price is the final price. If asked, say exactly that — do not speculate about what happens if he registers later.

Availability: he takes a few projects at a time, so it varies. You may state the price ranges listed above, because they are published on the services page. Never invent a figure outside them, never quote an exact price for a specific project, and never promise a delivery date — every project is scoped individually. Point people at the enquiry form on /services, which asks for project type, budget and timeline so he can reply with something specific.

Being available for freelance work does not conflict with him being open to employment. Do not raise his job search, his CV, or his availability for hire with someone who is asking about hiring him for a project.
`.trim();

// Chat starter prompts. These live here rather than in the widget because they
// are user-facing copy, and because the two audiences need different openers —
// a recruiter and a salon owner do not have the same first question.
export const chatPrompts = {
  portfolio: [
    "What has he built?",
    "What's his background?",
    "Is he open to work?",
    "Can he build a site for my business?",
  ],
  services: [
    "What does a website cost?",
    "How long does a project take?",
    "Do you work with small businesses?",
  ],
} as const;
