
// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Taninwat Kaewpankan",
  // The site brands itself around the nickname, so anything that talks to
  // visitors needs to know the two names are one person.
  nickname: "Ice",
  location: "Copenhagen, Denmark",
  email: "taninwat.kaewpankan@gmail.com",
  // The registered business (a PMV, not moms-registered). Name and CVR are
  // shown in the stack's footer; the address stays off the site by choice.
  business: { name: "Ice's Stack v/Taninwat Kaewpankan", cvr: "46871537" },
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
// One searchable job title (roleLabel). whatIDo below is where the honest detail
// about relative depth lives, rather than hedging every label.

export const siteContent = {
  /**
   * The job title. Stays a job title on purpose: it feeds schema.org
   * Person.jobTitle in layout.tsx and services/page.tsx, the chatbot's system
   * prompt, and the /cv page heading.
   *
   * ONE searchable title, not a hybrid. It was "Frontend Engineer & Project
   * Coordinator", which is accurate but unsearchable — recruiters and ATS filters
   * never query a slash title, and a hybrid reads as not having decided. The
   * coordination half has not been dropped, it has moved one line down into
   * cvData.summary, where a human reads it and it becomes range rather than
   * indecision. The same rule keeps design out of the title: postings ask for it
   * in the description (about 10 in 69), never in the title.
   *
   * "Full-stack Engineer" since 2026-10-04, replacing "Frontend Developer". Ice
   * collected 104 Danish and Swedish postings (The Hub, LinkedIn, Jobindex,
   * Jobnet). The frontend-only ones he could realistically get: 0 of 10, every
   * one blocked by fluent Danish or 3+ years. Full-stack or generalist ones: 4
   * clear and 4 borderline, and 8 of those 10 titles say "Engineer". No posting
   * said "Design Engineer" or "developer & designer". Bevisly (Postgres RLS) and
   * MockMate (Prisma, an AI grading pipeline) are what make the claim defensible.
   *
   * NOT "Web Developer", despite that being the freelance word. Denmark files both
   * under the same DISCO-08 code, so the work is identical on paper — but
   * frontend-udvikler runs a median around 51.900 kr/month against a webudvikler
   * starting near 31.500 and reaching only ~42.250 after ten years. Same job,
   * roughly 20k a month of anchoring. "Web developer" lives on /services, in
   * its description and Danish keywords, for the audience that searches for it.
   */
  roleLabel: "Full-stack Engineer",
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
    "I wanted to become a more complete builder, someone who understands technical constraints, not just concepts. So I enrolled in a Higher Vocational Diploma in Frontend Development at Jensen, which led me into an internship at Trailr AI. After graduating, I stayed on part-time as an early team member. I graduated from Jensen in May 2026.",
    "I'm in Copenhagen now. Still building. Still the same person who walked into Sweden without the language, just with a few more tools.",
  ],

  // The About letter's letterhead on the clock homepage. Every value here traces
  // to aboutStory or the CV — nothing is inferred. Now and Before lead because
  // they are the positioning ("an engineer who has run things"), which the
  // story only reaches in its fifth and sixth paragraphs.
  aboutFacts: [
    { label: "Now", value: "Frontend and UI/UX at Trailr AI, part-time" },
    // An arrow, like Path: "Assistant to Head of" alone read as one title.
    {
      label: "Before",
      value: "Operations Assistant → Head of Organization, Millennial Consulting",
    },
    { label: "Languages", value: "Thai, Swedish, English, Danish" },
    { label: "Based", value: "Copenhagen since 2023 · EU citizen" },
    { label: "Path", value: "Thailand → Sweden → England → Denmark" },
  ],

  // Written for the old homepage's About section and moved rather than deleted.
  // Renders on /cv, where "how does he actually work" is the question being asked.
  howIWork:
    "Here is how I work. I write a clear spec, break it into small steps, then check the result myself. That is different from prompting an AI and hoping. I use AI to move faster, but the product thinking and the final review are mine. I like small teams that want to move fast and ship things that actually matter.",

  whatIDo: [
    {
      title: "Frontend Engineering",
      body: "React, Next.js, and TypeScript are where I am strongest and where I would want to be judged. Accessible, responsive interfaces, and the parts that never show up in a screenshot: keyboard paths, reduced-motion, Lighthouse budgets, and what the page does on a slow connection.",
    },
    {
      title: "Full-Stack Development",
      body: "I can take a feature the whole way, from the data model through the API to the UI, in Node.js, Express and PostgreSQL, and I have shipped it. The backend is the newer half of my toolkit, so I scope it honestly: I will own the slice end to end, and I will tell you where I would want review rather than guess in silence.",
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
    // side is mine too: quoting, pricing, handover. Client sites are coded,
    // not built in a visual builder (decided 2026-10-11), so this block no
    // longer offers Webflow. It left the CV skills too on 2026-10-14, as a weak
    // signal for engineering roles.
    {
      title: "Client Work",
      body: "Taking a paying client from the first call to handover: working out what they actually need, quoting a fixed price, building it, and leaving them owning the result. I code every client site by hand, so it is fast, easy to find on Google, and has no platform fee to pay each year. Racha Beauty has run since launch without maintenance.",
    },
  ],

};

// ─── ABOUT ────────────────────────────────────────────────────────────────────
// The /about page (2026-10-25, replacing the Stack's Engineer card). The story,
// facts and "what I do" blocks live in siteContent; this is only the page's
// own lines.
export const aboutPage = {
  lead: "Full-stack engineer in Copenhagen. TypeScript from the interface to the database.",
  description:
    "Ice (Taninwat Kaewpankan), full-stack engineer in Copenhagen: React, Next.js, TypeScript, Node.js and PostgreSQL. Product engineer at Trailr AI; before that, Head of Organization at Millennial Consulting.",
  stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  cv: { label: "Read my CV", href: "/cv" },
  pdf: { label: "Download the PDF", href: "/assets/Taninwat_Kaewpankan_CV.pdf" },
  // The public MCP server (app/mcp/route.ts), documented where a technical
  // reader looks for it.
  mcp: {
    title: "For AI assistants",
    body: "This site runs a public MCP server. Connect it to Claude or any MCP client and ask about my projects, services and CV directly. It is read-only and answers from the same data as these pages.",
    command: "claude mcp add --transport http ice https://taninwatkaewpankan.xyz/mcp",
    tools: "Tools: get_profile, list_projects, get_case, get_services, get_cv, get_contact.",
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
  // roleLabel itself, not a copy of it: the CV said "Frontend Developer" here
  // after the site had moved on. See the note on roleLabel for why it is a
  // single searchable title rather than a hybrid.
  title: siteContent.roleLabel,
  summary:
    "I build web apps, mostly with React, Next.js and TypeScript. At Trailr AI, an early-stage AI startup, I work part-time on the frontend and UI/UX, and I led a redesign of the platform within what the existing backend could support. In my own projects I build the backend too, with Node.js, PostgreSQL and Supabase, including AI features on Gemini where a person keeps the final say. Before that, I spent four cycles at Millennial Consulting, going from Operations Assistant to Head of Organization and coordinating around 20 client projects with no full-time staff. I like building things, and I like getting them shipped.",

  // Four technical groups mirroring the PDF, plus the operations group the PDF
  // has no room for. A one-page CV has to cut; the page does not.
  skills: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "SQL", "HTML5", "CSS3"],
    },
    {
      label: "Frontend",
      items: [
        "Next.js (Server Components, Server Actions)",
        "React",
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
        "PostgreSQL (schema design, migrations, indexes, row-level security)",
        "Supabase",
        "Prisma",
        "Authentication & Authorization (JWT/OAuth)",
      ],
    },
    {
      label: "Tools & AI",
      items: [
        "Agentic coding (Claude Code, custom review agents)",
        "Git/GitHub",
        "Vitest",
        "CI/CD (GitHub Actions)",
        "Vercel",
        "Figma",
        "LLM integration (Gemini)",
      ],
    },
    {
      label: "Operations & Product",
      items: [
        "Product Development",
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
        "Part of a small remote team where product, design and engineering overlap, working on the trailer report, the back office and the platform's tools in React and TypeScript.",
        "A full overhaul of the navigation UI inside an existing Zustand codebase, reworking state connections and wiring components to new design requirements.",
        "A shared side-panel layout across tools like Story Builder and Screening Room, so each new tool starts from the same structure.",
        "Most work arrives as rough briefs with no formal specs, so the job is reading the intent, flagging feasibility gaps early and checking with the backend team before building.",
        "The platform is in enterprise trials with two major Danish media companies.",
      ],
    },
    {
      org: "Millennial Consulting",
      role: "Operations Assistant → Operations Manager → Head of Organization (Volunteer)",
      period: "Sep 2023 – May 2025",
      place: "Copenhagen, Denmark",
      bullets: [
        "20+ client engagements across 4 cycles, with 90%+ client satisfaction each time.",
        "Around 5 projects and 25+ student consultants per cycle, all volunteers, with recruitment, onboarding and team staffing as my responsibility.",
        "A hybrid Agile and waterfall process of my design, with fixed milestones for clients and flexible mentor sessions for teams, later adopted across the organisation.",
        "Partner workshops with Deloitte, Accenture, EY-Parthenon, PwC, BearingPoint and Round.",
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
        "A hiring platform built solo, where candidates prove their skills with real tasks instead of CVs, with separate flows for candidates, employers and admins.",
        "63 PostgreSQL migrations so far, covering row-level security per role, triggers and SQL scoring functions, with the schema changed step by step as the product moved.",
        "AI grades used to feed the public score employers see. A rewrite in October 2026 made that score count employer judgement only and kept the Gemini grade as private feedback for the candidate, in line with the EU AI Act.",
      ],
    },
    {
      org: "MockMate",
      role: "Personal Project (Next.js 16, Server Actions, Neon PostgreSQL, Prisma)",
      period: "May 2026 – Present",
      place: "Copenhagen, Denmark",
      bullets: [
        "An AI interview practice tool where candidates rehearse real interviews and get feedback, born from my own job search.",
        "Evaluation runs in two passes. The live interview stays conversational, while a separate grading pass reads only summarized notes, not the raw answers, which keeps scores consistent and closes a prompt injection risk.",
        "Each answer is scored on technical accuracy, clarity and problem solving, with one strength, one weakness and one concrete tip per area.",
        "Composite indexes chosen for the real query paths, for example the cleanup job that finds stale interview sessions.",
      ],
    },
  ] satisfies CvEntry[],

  education: [
    {
      school: "Jensen Yrkeshögskola",
      degree: "Higher Vocational Education Diploma, Frontend Developer (2-year program), passed with distinction in 8 of 12 courses",
      period: "Aug 2024 – May 2026",
      place: "Malmö, Sweden",
    },
    {
      school: "Uppsala University",
      degree: "Master of Social Science (one year, 60 credits), Entrepreneurship",
      period: "Aug 2022 – Jun 2023",
      place: "Uppsala, Sweden",
    },
    {
      school: "Uppsala University",
      degree: "Bachelor of Arts, Game Design",
      period: "Aug 2019 – Jun 2022",
      place: "Uppsala, Sweden",
    },
  ],

  additional: [
    { label: "Certificates", value: "Google Project Management Certificate" },
    {
      label: "Languages",
      value: "Thai (Native), English (Fluent), Swedish (Fluent), Danish (Basic)",
    },
    {
      label: "Work authorization",
      value: "EU citizen with full right to work in Denmark and across the EU, no sponsorship needed",
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
      "Joined as a frontend intern at an early-stage AI startup. After graduating, continued part-time. Led the redesign of the platform's UI/UX: benchmarked direct and indirect competitors, synthesized findings into a design direction, and scoped the work to what the existing backend could support, cutting features rather than forcing backend changes. Took on a full navigation overhaul in React and Zustand. The platform secured enterprise trials with two major Danish media companies during this period.",
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
    role: "Master of Social Science, Entrepreneurship",
    organization: "Uppsala University",
    period: "2022 – 2023",
    description:
      "One year focused on entrepreneurship and strategy at one of Scandinavia's most prestigious universities. Reinforced how I think about products, not just whether they can be built, but whether they should be.",
  },
  {
    id: "edu-3",
    type: "education",
    role: "BA, Game Design",
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
  /**
   * What kind of build it is, in plain words: frontend only, full-stack, or
   * not software. The chatbot reads this; without it, it saw "Full-stack
   * Engineer" plus a React stack and called Racha, a static site with no
   * backend, "full-stack" (2026-10-18).
   */
  scope: string;
  /**
   * The case page's facts (2026-10-25). Taken from cvData where the CV has
   * the project, so the two never disagree; otherwise the year is when the
   * project's GitHub repo was created (Racha 2025-06, Satoshi 2025-08, Lumina
   * and Saep 2026-08). Optional: the page shows only what is set.
   */
  role?: string;
  year?: string;
  /**
   * "The Making" (2026-10-26): how the case got from the ask to the result,
   * one stage at a time. Real material only: Ice's own brief, sketches and
   * in-progress screenshots (public/assets/<case>/making/). Leave it out and
   * the case page shows no Making section. Never frame a stage as "AI wrote
   * this" (Ice, 2026-10-25).
   */
  making?: { label: string; text: string; image?: string; alt?: string; video?: string; poster?: string }[];
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
  /**
   * A concept piece, not client or product work: no real business behind it.
   * Marked on the front of its print on /work, where the "this is my work"
   * impression forms; its `sub` says it again in the first words.
   */
  concept?: boolean;
  /**
   * A concept's place in the Showroom: what a site like it would cost a real
   * business. Priced by scope, never by style: a rung of the website ladder
   * plus add-ons, all looked up by conceptPrice(), so no figure is typed here.
   */
  showroom?: {
    business: string;
    style: string;
    rung: 0 | 1;
    addOns: AddOnId[];
    gets: string[];
  };
}

export const cases: CaseStudy[] = [
  {
    id: "millennial",
    n: "01",
    tag: "Management",
    scope: "Not a software project: operations and people leadership at a volunteer consulting organization.",
    role: "Operations Assistant → Operations Manager → Head of Organization (volunteer)",
    year: "2023 – 2025",
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
    scope: "Frontend and product work on an existing platform. Ice owned the UI/UX redesign and the React frontend; the backend belongs to the team and was not his.",
    role: "Frontend Developer (intern → part-time)",
    year: "2025 – now",
    // The Making (Ice, 2026-10-26). Both screens rebuilt locally from the repo:
    // ec34e09 (10 Sep 2025, the last commit before Ice's first) and ff541d6
    // (19 Oct 2026), same Aliens demo project. Tommy is fine with showing the
    // old version. Never name a client project in these.
    making: [
      {
        label: "Brief",
        text: "My program required an internship and I could not find one. Trailr AI had no open frontend role, so I emailed the CEO and asked whether they would take a frontend student. They did.",
      },
      {
        label: "Before, September 2025",
        text: "Story Builder the week before my first commit: the platform as I found it.",
        image: "/assets/trailr/making/before-story-builder.webp",
        alt: "Trailr AI's Story Builder in September 2025: a file tree on the left, a chat box and clip cards on top, and a blue timeline of four clips below.",
      },
      {
        label: "Before and after",
        text: "The same project in Story Builder, September 2025 and October 2026. I led the redesign of the platform's UI.",
        video: "/assets/trailr/making/before-after.mp4",
        poster: "/assets/trailr/making/before-after-poster.jpg",
      },
    ],
    title: "Trailr AI",
    sub: "Leading a platform redesign at an early-stage AI video startup.",
    images: [
      "/assets/trailr/trailr-hero.webp",
      "/assets/trailr/trailr-clip-generator.webp",
      "/assets/trailr/trailr-screening-room.webp",
      "/assets/trailr/trailr-story-builder.webp",
    ],
    overview:
      "An early-stage AI video platform that secured enterprise trials with two major Danish media companies. I joined as a frontend intern and, after graduating, continued part-time, owning the product side of a full UI/UX redesign.",
    challenge:
      "The platform had grown feature-first and the UX had drifted. Most requests arrived as rough briefs with no formal specs. The real constraint: improve the product meaningfully without forcing backend changes a small team couldn't afford. The job was deciding what was worth building against what the existing backend could actually support.",
    stackWhy:
      "Product judgment over raw output. Competitor research to find the gaps, ruthless scoping to ship within real constraints.",
    engineering:
      "Benchmarked direct and indirect competitors, synthesized the findings into a single design direction, and scoped ruthlessly to the backend's limits, cutting features rather than forcing rewrites. When the navigation proved convoluted, I led a click-reduction overhaul, pulling Settings and Feedback out of the primary workspace so screening and building stayed front and centre. After a client pitch surfaced a need to make the AI less of a black box, I pushed for a thinking UI that streams the model's reasoning word by word, trading a flashy result for the transparency enterprise clients actually trust. Throughout, I worked directly with the founder and engineers to sequence what shipped.",
    metrics: [
      { v: "Danish media", k: "Enterprise trials" },
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
    scope: "Full-stack: a React frontend on Supabase (Postgres with row-level security, auth and storage).",
    role: "Personal project, built solo",
    year: "2025 – now",
    // The Making (Ice, 2026-10-26): the first version rebuilt from commit
    // 5d00537 (9 Nov 2025). Bevisly is becoming a freelance platform; update
    // this case when that ships (board-personal.md).
    making: [
      {
        label: "Brief",
        text: "I was applying for frontend jobs and getting rejected before anyone saw my work. So I started building a place to prove skills instead of claiming them: you complete a real task, it stays on your profile, recruiters rate it, and you decide whether it is public. Even after a rejection, the proof stays.",
      },
      {
        label: "First version, November 2025",
        text: "Still called Bevis, with one promise on the front page: proof replaces promise.",
        image: "/assets/bevisly/making/first-version.webp",
        alt: "Bevis in November 2025: a dark hero reading 'Proof replaces promise. Fair, fast, and verifiable hiring for emerging talent', with a job search box.",
      },
      {
        label: "Turning point",
        text: "A profile full of completed tasks turned out to be a portfolio by another name. In September 2026 Bevisly became a job board that can ask for the work, and it is now becoming a freelance platform.",
      },
    ],
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
    // No code link: the Bevisly repo is private, so the button sent every
    // visitor to GitHub's 404 page (found 2026-10-18).
    links: { demo: "https://bevisly.com/", code: "" },
  },
  {
    id: "mockmate",
    n: "04",
    tag: "Full-Stack",
    scope: "Full-stack: a Next.js app with a Prisma-backed database and a server-side AI grading pipeline.",
    role: "Personal project",
    year: "2026 – now",
    // The Making (Ice, 2026-10-26): the PRD as of commit b19af3d (27 May 2026).
    making: [
      {
        label: "Brief",
        text: "No grand plan. I wanted to build something, and since I was preparing for interviews myself, it became a place to practise them.",
      },
      {
        label: "Day one, a written spec",
        text: "It started as a product requirements document on 27 May 2026, before any code: the problem, the scope and the open questions, closed one by one.",
        image: "/assets/mockmate/making/day-one-spec.webp",
        alt: "MockMate's product requirements document on GitHub, dated 27 May 2026, opening with the problem statement.",
      },
    ],
    title: "MockMate",
    sub: "Paste a job description. Get a tailored interview. Get graded like a hiring panel would.",
    images: [
      "/assets/mockmate/mockmate-landing.webp",
      "/assets/mockmate/mockmate-dashboard.webp",
      "/assets/mockmate/mockmate-feedback.webp",
    ],
    overview:
      "A full-stack AI interview platform. Paste a job description, answer tailored technical questions from an AI interviewer, and receive a structured graded report. Built with Next.js, Google Gemini and Prisma.",
    challenge:
      "Interview prep tools ask you to read, not do. The real problem was designing an AI pipeline that ingests any job description, generates role-specific technical questions, and grades answers the way a hiring panel would, with depth, clarity, and gap analysis, not just correct or incorrect.",
    stackWhy:
      "Next.js App Router for full-stack delivery in one repo. Google Gemini via the Vercel AI SDK for streaming question generation and answer grading, with grading in a Next.js API route so the whole product lives in one repo and one deploy. Prisma for a typed data layer. PDF.js to parse uploaded resumes. PostHog to see where users drop off.",
    engineering:
      "Built an AI pipeline: JD upload, Gemini parses role requirements, generates targeted questions, streams answers, and grading runs in a Next.js API route with structured Zod-validated output. Two decisions worth calling out. First, I split the AI into two separate flows, a live interview conversation and a separate grading pass. If I had merged them into one prompt, the feedback came out inconsistent, because the model was doing two jobs at once. Second, answers persist to the database before any AI runs. If a Gemini call fails, the user's work is still there instead of vanishing mid-interview.",
    metrics: [
      { v: "Live", k: "Product" },
      { v: "Gemini", k: "Interview engine" },
      { v: "Zod", k: "Validated grading output" },
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Shadcn/UI"],
    links: { demo: "https://mockmate.space/", code: "https://github.com/Taninwat-55/mockmate", docs: "https://github.com/Taninwat-55/mockmate/blob/main/docs/PRD.md" },
  },
  {
    id: "satoshi",
    n: "05",
    tag: "FinTech",
    scope: "Frontend only: a React dashboard that reads a live public price API. No backend of its own.",
    role: "Personal project",
    year: "2025",
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
      // The .xyz domain lapsed. This is Vercel's PRODUCTION alias, which follows
      // every future deploy — deliberately not the deployment-specific URL
      // (satoshi-standard-<hash>-...), which pins one build, can be garbage
      // collected, and is deployment-protected: it answers 200 with a Vercel
      // login page rather than the app.
      demo: "https://satoshi-standard.vercel.app",
      code: "https://github.com/Taninwat-55/Satoshi-Standard",
    },
  },
  {
    id: "racha",
    n: "07",
    tag: "Client Work",
    scope: "Frontend only: a static React site with no backend or database. The contact form posts to Web3Forms, a hosted form service.",
    role: "Freelance, design and build for a paying client",
    year: "2025",
    // The Making (Ice, 2026-10-26): the first version rebuilt from commit
    // 2142f3c (27 Jun 2025).
    making: [
      {
        label: "Brief",
        text: "Racha was opening her own beauty and wellness studio and needed a website to open with. She knew I was studying frontend development and asked me to build it.",
      },
      {
        label: "First version, June 2025",
        text: "The site as first built. It has illustrations where today's site has photos of the studio.",
        image: "/assets/racha/making/first-version.webp",
        alt: "Racha Beauty & Wellness in June 2025: a green header, the welcome headline and an illustrated portrait.",
      },
    ],
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
      "A small local business has no budget for ongoing maintenance and nobody to call when something breaks. The site had to be fast on first deploy, cheap to host, and keep working without me. Especially the contact form, since that is the only channel enquiries arrive through.",
    stackWhy:
      "React with Vite for a fast build and a small bundle. React Router for the Danish URLs the client wanted (/behandlinger, /kontakt). Tailwind so she could react to something visual instead of a spec. react-helmet-async for per-page titles and descriptions.",
    engineering:
      "95+ Lighthouse on first deploy. Every route is code-split with lazy() and Suspense behind a loader, all imagery is WebP, and an ErrorBoundary stops one failure from blanking the site. The contact form posts to Web3Forms and falls back to a Google Form if that request fails. On a site with no backend, a dropped enquiry is a lost customer.",
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
  // The last two entries — Lumina and Saep — are the only ones with no client
  // behind them, and each says so in its own first sentence. Everything else on
  // this page answers "would you ship for me"; these two answer "can you do
  // motion work", which nothing else in the list shows.
  // Their metrics are measured rather than framed as outcomes for that reason — an
  // invented business result sitting beside Racha's real ones would cost more
  // credibility than the entries are worth. Saep is the sharper case: it is an
  // invented Thai restaurant and /th sells to real Thai restaurant owners, so the
  // "no client" sentence is load-bearing wherever it appears, not a disclaimer.
  {
    id: "lumina",
    concept: true,
    n: "08",
    tag: "Motion & Craft",
    scope: "Frontend only: a static HTML, CSS and JavaScript page with no backend, and a concept with no client.",
    role: "Self-initiated concept",
    year: "2026",
    making: [
      {
        label: "Brief",
        text: "I wanted to know what it takes to build an award-level website, so I gave myself a brief with no client.",
      },
    ],
    title: "Lumina Spa",
    sub: "A self-initiated scroll-choreography piece: ten animated sections, no build step, 10.8 KB over the wire.",
    images: [
      "/assets/lumina/lumina-hero.webp",
      "/assets/lumina/lumina-arrival.webp",
      "/assets/lumina/lumina-rituals.webp",
      "/assets/lumina/lumina-experience.webp",
    ],
    overview:
      "A landing page for a spa that does not exist. No client, no brief. I wanted to build the kind of scroll-choreographed site that usually arrives as a framework plus a few hundred kilobytes of JavaScript, and find out how far plain HTML, CSS and two libraries would get instead. Ten sections move with the scroll: a layered hero, a pinned arrival, oil cards, hand and stone compositions, water ripples, a horizontal ritual carousel and a sequential benefit reveal.",
    challenge:
      "Scroll animation is where responsive layout quietly breaks. The techniques that read as premium on a desktop (pinned sections, fixed viewport heights, multi-column grids) are the same ones that strand content off-screen on a phone, and they fail silently: nothing throws, the text is simply unreachable. Holding the whole thing to three static files with no build step meant every fix had to be a layout decision rather than a new dependency.",
    stackWhy:
      "GSAP with ScrollTrigger for scrubbed timelines and pinning, because CSS scroll-driven animations still cannot express scroll-linked easing reliably across browsers. Lenis for smooth scroll, with its scroll event wired into ScrollTrigger.update so the two share one scroll position instead of fighting over two. Both from CDN: no install, no bundler, no lockfile.",
    engineering:
      "A responsive audit turned up three real bugs, two of them the same mistake. A position: sticky element taller than the viewport pins at top: 0 and can never scroll its own bottom into view, so both pinned sections stranded their lower content below the fold on phones; the fix was to unpin them under 1100px and let them flow. The benefit list declared a two-column grid but had three children, so auto-placement dropped every paragraph into the 60px number gutter and wrapped it one word per line. Full-height sections moved to 100dvh with a 100vh fallback, except the four values the pinning maths reads, which stay in vh so the sticky range cannot reflow mid-scroll.",
    metrics: [
      { v: "10.8 KB", k: "Total page weight" },
      { v: "Zero", k: "Build steps" },
      { v: "10", k: "Scroll-driven sections" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger", "Lenis"],
    links: {
      demo: "https://lumina-spa-sample.netlify.app",
      code: "https://github.com/Taninwat-55/lumina-spa",
    },
    showroom: {
      business: "A day spa",
      style: "Scroll storytelling",
      rung: 0,
      addOns: ["scroll-story"],
      gets: [
        "One long page that walks a visitor through the visit: arriving, the oils, the treatments, the rituals",
        "Ten sections that move with the scroll, in 10.8 KB over the wire, so it opens fast on a phone",
        "Everything in every build: search setup, your Google Business profile, an enquiry form and analytics",
      ],
    },
  },
  {
    id: "saep",
    concept: true,
    n: "09",
    tag: "Motion & Craft",
    scope: "Frontend only: a static page built on the platform alone (canvas and CSS), no backend, and a concept with no client.",
    role: "Self-initiated concept",
    year: "2026",
    making: [
      {
        label: "Brief",
        text: "I wanted to know what it takes to build an award-level website, so I gave myself a brief with no client.",
      },
    ],
    title: "Saep Fire Kitchen",
    sub: "A concept piece for an invented Thai restaurant: scroll-driven, every ingredient drawn in code, and no animation library underneath it.",
    images: [
      "/assets/saep/saep-hero.webp",
      "/assets/saep/saep-phet.webp",
      "/assets/saep/saep-balance.webp",
      "/assets/saep/saep-menu.webp",
    ],
    overview:
      "A site for an invented Thai fire kitchen in Nørrebro. Thai cooking balances five tastes and no dish tastes of one thing, so scrolling descends through them one pinned chapter at a time (spicy, sour, salty, sweet, aromatic) while that taste's ingredient draws itself on canvas and the page's accent colour travels with it. One self-contained HTML file: no framework, no libraries, no build step.",
    challenge:
      "Two problems, and the second one was the real one. The obvious challenge was building scroll choreography with nothing underneath it: no GSAP, no ScrollTrigger, no Lenis, which is what Lumina Spa leans on. The harder challenge was that a page like this cannot be reviewed by reading its source. A hand-drawn chilli is either recognisable or it isn't, and the only way to find out is to look at it.",
    stackWhy:
      "Nothing but the platform. One requestAnimationFrame loop, canvas 2D, and CSS custom properties, partly to show the animation library is a convenience rather than a requirement, and partly because a bundler buys you nothing on a page with no state, no routing and no data to fetch.",
    engineering:
      "The scroll engine writes exactly one number: a single loop sets a 0-to-1 progress value per section as a CSS custom property, and every bit of motion is CSS calc() off that value. No scroll listeners, no per-element style writes. The ingredients are procedural: bezier curves sampled to points, with progress controlling how much of the stroke set exists, which is what makes them appear to draw themselves. The accent colour is interpolated per frame rather than switched, and canvases repaint while it is still travelling; without that, a chapter's drawing keeps the previous chapter's colour the moment you stop scrolling. Because I couldn't review the drawings by reading them, I built a proofing harness that drives headless Chrome over the DevTools Protocol and renders every motif at 760px on one contact sheet. It paid for itself immediately: my first chilli cluster read unmistakably as a cannabis leaf, and the kaffir lime leaf read as a fish skeleton. Neither was visible at the size they appear on the page. The menu taught the same lesson from the visitor's side. I had shipped abstract circles as plates, when the thing anyone actually wants from a restaurant menu is to see the food, so each plate became a photograph with the kitchen's heat rating drawn around its rim as a gauge arc. prefers-reduced-motion unpins every section and renders each chapter in its finished state rather than freezing it mid-animation.",
    metrics: [
      { v: "0", k: "Animation libraries" },
      { v: "5 tastes", k: "Pinned chapters, one CSS variable" },
      { v: "1 file", k: "No build step" },
    ],
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Canvas 2D",
      "CSS Custom Properties",
      "Chrome DevTools Protocol",
    ],
    links: {
      demo: "https://saep-fire-kitchen.netlify.app",
      code: "https://github.com/Taninwat-55/saep-fire-kitchen",
    },
  },
];

/**
 * The work in the order the homepage's hall shows it, and the order case
 * pages hand on to the next one. Saep stays out until its redesign;
 * Millennial has no screens to show. Both still have case pages.
 */
export const leadCaseIds = ["trailr", "bevisly", "mockmate", "racha", "lumina"];

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
   * A price defined purely by page count invites the obvious question "so what
   * am I actually paying for?" — a template shop will do five pages for 3.000
   * kr, and the honest answer is that the pages are not the work.
   * includedInEvery is that answer, stated before anyone has to ask for it.
   *
   * There used to be two build methods on offer, Webflow and coded, first with
   * two price ladders and later with one shared price. Both are gone: since
   * 2026-10-11 every client site is coded, and Webflow is not sold at all. A
   * second method doubled every explanation on this page (two running costs,
   * two editing stories, two FAQ answers) for a route with no shipped client
   * work behind it, and a builder site is exactly what the Local visibility
   * plan cannot promise to keep fast and findable.
   *
   * So there is one price ladder, priced by scope, and what the site costs to
   * KEEP lives in runningCosts below, because it is a question a non-technical
   * buyer can actually answer.
   */
  includedInEvery?: { label: string; body: string; items: string[] };
  /** The single price ladder. Priced by scope alone. */
  priceLadder?: { scope: string; detail: string; price: string; timeline: string }[];
  /** One line pointing from the price down to the running-cost section. */
  buildMethodNote?: string;
  /**
   * The itemised add-ons. Offer 01 only.
   *
   * 🔒 ONE PRICE PER ADD-ON. Each item is a single published figure (the
   * second language is the one span, and its comment says why). Never quote a
   * cheaper "light" version of an add-on on a call: a second number for the
   * same outcome is how a published price list turns into a negotiation.
   *
   * `note` on an item may say what it costs to KEEP, or who else gets paid
   * (Stripe, a booking tool, a translator), never a different build price.
   */
  addOns?: {
    label: string;
    body: string;
    items: { name: string; price: string; body: string; note?: string }[];
    /** What is deliberately NOT an add-on. */
    includedLabel: string;
    included: string;
    /** Honest capability framing where there is no client work to point at. */
    ownWork: string;
  };
}

/**
 * Everything the site says about moms, in one place.
 *
 * WHY THIS EXISTS. The claim used to be written out in six places, and the real
 * hazard was not the duplication — it was the phrasing. "No VAT is added, the
 * figure you see is the figure you pay" was sold as a REASON TO BUY. Ice will
 * register for moms once turnover passes the Danish 50.000 kr threshold, and
 * withdrawing a stated benefit reads as a 25% price rise even though it is not
 * one: a moms-registered business client deducts moms, so their real cost does
 * not move. Only consumers and unregistered buyers actually pay more.
 *
 * So prices are quoted "ekskl. moms" — the Danish B2B convention — which is true
 * in BOTH states. Registering then changes a sentence, not a number, and not the
 * argument for hiring him.
 *
 * TO REGISTER: flip `registered` to true. That updates offers[0].priceNote, the
 * pricing FAQ, termsShort and the chatbot grounding automatically.
 *
 * TWO PLACES DO NOT INTERPOLATE and must be edited by hand at the same time:
 *   - public/llms.txt          (static file, no build step)
 *   - app/data.th.ts           (hand-written Thai, see thContent.pricing.terms)
 */
const VAT_REGISTERED = false;

export const vat = {
  registered: VAT_REGISTERED,

  /**
   * Safe standalone label: accurate whether or not he is registered, so the
   * short surfaces never need touching.
   */
  shortLabel: "ekskl. moms (VAT)",

  /** One sentence, for anywhere with room for it. */
  note: VAT_REGISTERED
    ? "All prices are ekskl. moms, so 25% is added at invoicing — which a moms-registered business deducts again."
    : "All prices are ekskl. moms. I am under the Danish registration threshold, so no moms is added today.",

  /**
   * What the chatbot is allowed to say. Deliberately instructs it not to sell the
   * current state, because that is the habit this whole object exists to break.
   */
  briefing: VAT_REGISTERED
    ? "Prices are quoted ekskl. moms, so 25% moms is added at invoicing. For a moms-registered business client that is deductible and therefore cost-neutral — say so if asked."
    : "Prices are quoted ekskl. moms. He is under the Danish 50.000 kr registration threshold, so no moms is added today. State it as a fact if asked; never present it as a discount or a reason to hire him, and do not speculate about when he might register.",
} as const;

/**
 * The add-ons for offer 01, and the band the price ladder shows for them.
 *
 * Lifted out of `services` so the ladder's "Add-ons" rung can be COMPUTED from
 * this list rather than hand-kept in step with it. The rung used to read
 * "+ 3.000 – 8.000 DKK" against no itemisation at all; once the items existed,
 * a hand-typed band was one edit away from advertising a floor or ceiling that
 * nothing behind it charged — on the one page whose whole argument is that the
 * numbers survive checking.
 *
 * 🔒 ONE PRICE PER ADD-ON. See the lock note on ServiceOffer.addOns: one
 * published figure per outcome, and `note` is only ever about what something
 * costs to keep or who else gets paid.
 */
export type AddOnId =
  | "self-edit"
  | "managed-list"
  | "second-language"
  | "booking"
  | "payments"
  | "motion"
  | "art-direction"
  | "scroll-story"
  | "extra-page";

const WEBSITE_ADD_ONS: { id: AddOnId; name: string; price: string; body: string; note?: string }[] = [
  {
  id: "self-edit",
  name: "Edit your own text and images",
  price: "3.000 DKK",
  body: "A small editor built onto the site so you can change your opening hours, your prices and your photos yourself. Setup, your own login, and a recording of me walking through it.",
  // The one place the running-cost story belongs on an add-on: it is
  // about what it costs to KEEP, not what it costs to build.
  note: "A one-off. The editor runs on a free tier, so there is nothing to pay for it each year.",
  },
  {
  id: "managed-list",
  name: "A list you manage yourself",
  price: "3.500 DKK",
  body: "Treatments, a menu, a team page, or a blog you post to yourself. Anything where you add and remove entries rather than editing a fixed page. You get a simple form per entry instead of a page to lay out.",
  note: "Free to run afterwards: there is no higher plan to move up to.",
  },
  {
  id: "second-language",
  name: "A second language",
  // The ONE add-on priced as a span rather than a figure, because it is
  // the only one whose work genuinely tracks page count: every page has
  // to exist twice, with its own address and its own search title. A
  // flat number would be wrong at both ends — on a one-pager 4.500 was
  // nearly the price of the whole site, and on an eight-pager it
  // undercharged. The span is tied to the two rungs above it, not
  // invented: 3.000 at 1–3 pages, 5.500 at 4–8.
  //
  // Still ONE price in the sense that matters: one published span for
  // one outcome. The market model is proportional too: Danish
  // agencies describe a second language as roughly doubling the
  // content work rather than as a fixed fee.
  price: "3.000 – 5.500 DKK",
  body: "The whole site in a second language, with its own web addresses and its own page titles for search, so Google serves the right one to the right person, plus a switcher. Danish, English, Swedish or Thai. This is the one add-on that follows the size of the site, because every page has to exist twice.",
  note: "The translation itself is not in this. A translation bureau charges around 1 kr a word and you pay them directly, so on a small site expect a separate bill of one to two thousand kroner. What I build is the structure around the words.",
  },
  {
  id: "booking",
  name: "Online booking",
  price: "3.500 DKK",
  body: "A booking tool wired properly into the site and its design, with confirmation emails that work, rather than a grey box dropped onto a page. Building a booking engine from nothing is a different job and a different price.",
  note: "The booking tool's own subscription is paid by you, directly, like the domain and the hosting.",
  },
  {
  id: "payments",
  name: "Take payment online",
  price: "5.000 DKK",
  body: "Card, MobilePay, Apple Pay and Google Pay through Stripe, set up in your name and tested with real payments before it goes live. Suited to a handful of services or products. A full webshop is a bigger job than this.",
  note: "Stripe's own fee is theirs and comes out of each payment, currently about 1,4% plus 1,80 kr on a European card. It never passes through me.",
  },
  {
  id: "motion",
  name: "Motion and animation",
  price: "2.500 DKK",
  body: "Considered movement: sections arriving as you scroll, things that respond when you touch them. Built to go still for a visitor whose device asks for reduced motion, because for some people it is not a preference.",
  },
  // Added 2026-10-24 with the Showroom, which shows both on concept sites.
  // Set inside the freelance market rather than at its floor: a Danish
  // freelancer charges 3.000 – 8.000 extra for custom design, an agency 15.000
  // – 25.000 for custom design with animation (webworq.dk, louimicheletti.dk).
  // The founding-client discount, not a lower list price, is what makes them
  // reachable while there is little client proof behind them.
  {
  id: "art-direction",
  // Every site is already designed for the client; this buys the visual
  // material they do not have yet. Ice makes illustrations with design and
  // AI image tools, not by hand, so the copy says so rather than implying
  // an illustrator.
  name: "Illustrations and a visual identity",
  price: "4.000 DKK",
  body: "Every site I build is designed for your business, around the logo, colours and photos you already have. This is for when you have no visual identity yet, or want one that stands out. I create a type and colour system, an icon set, and illustrations or a photo style for the site. The illustrations are made with design and AI image tools and finished by me to fit your site.",
  note: "A logo and photography are separate jobs. If you need them, you pay the designer or photographer directly.",
  },
  {
  // Not a bigger version of "Motion and animation" above, which adds
  // movement to a page that would work the same without it. Here the
  // scroll IS the page's structure, so it is a different outcome with its
  // own price, not a second price for the same one.
  id: "scroll-story",
  name: "A page that tells a story as you scroll",
  price: "6.000 DKK",
  body: "I build the whole page around one story that unfolds as the visitor scrolls. Sections pin in place, pictures and words move together, and the visitor sets the pace. Lumina Spa in the Showroom is built this way. A visitor whose device asks for reduced motion gets the same story as a calm, complete page.",
  },
  {
  id: "extra-page",
  name: "An extra page",
  price: "1.800 DKK",
  body: "Per page, beyond the eight. Same standard as the rest, so a ninth page is a line on an invoice rather than a new project.",
  },
];

/**
 * Formats the ladder band from the add-on list — the lowest and highest figure
 * any add-on actually charges.
 *
 * Reads every number in every price, so an add-on priced as a span ("3.000 –
 * 5.500 DKK", which the second-language one is) contributes both ends rather
 * than being misparsed as one value.
 */
function addOnBand(items: { price: string }[]): string {
  const all = items.flatMap((item) => figures(item.price));
  return `+ ${dk(Math.min(...all))} – ${dk(Math.max(...all))} DKK`;
}

/** Every number in a price string: "3.000 – 5.500 DKK" gives [3000, 5500]. */
function figures(price: string): number[] {
  return [...price.matchAll(/\d+(?:\.\d{3})*/g)].map((match) => Number(match[0].replace(/\./g, "")));
}

/** Danish thousands separator, to match every other figure on the site. */
const dk = (n: number) => n.toLocaleString("da-DK");

/**
 * The aftercare figures, as figures. ITEM 44.
 *
 * These used to live only inside English prose — "Works out at 480 kroner an hour
 * instead of 650" — which was fine while /services was the only page that said
 * them. It stopped being fine the moment /da, /sv and /th needed the same numbers
 * in their own sentences, because the Danish, Swedish and Thai copy files forbid
 * numerals on purpose: a price typed into a translation is a price that drifts.
 *
 * So the numbers live here once, the English strings below interpolate them, and
 * the language files use `{hourly}` / `{effective}` placeholders filled at render
 * time — the same idiom their form errors already use for `{max}` and `{email}`.
 * Change a rate here and all four languages follow.
 *
 * Written the Danish way, with a dot for thousands, like every other figure in
 * this file. /sv reformats it through svPrice() because a Swedish reader can parse
 * "2.400" as two and a half.
 */
export const aftercareRates = {
  currency: "DKK",
  /** Ad-hoc rate. */
  hourly: "650",
  /** What the block works out at per hour — the reason to prepay. */
  effective: "480",
  blockPrice: "2.400",
  blockHours: "5",
  blockMonths: "12",
} as const;

/**
 * The Local visibility plan's price, as a figure. Same idea as aftercareRates:
 * the number lives here once, and the page, the JSON-LD, the FAQ and the chatbot
 * all read it from here.
 *
 * ⚠️ PLACEHOLDER, set 2026-10-11, NOT YET CONFIRMED BY ICE. Danish local SEO
 * retainers publish at 1.800 – 5.000 kr/md (mfwebdesign, Wayfab, WebWorq), so
 * 1.900 sits near the floor on purpose, the same reasoning as offer 01's price.
 * Also hand-edit public/llms.txt, which does not interpolate.
 */
export const localVisibilityRates = {
  currency: "DKK",
  monthly: "1.900",
} as const;

/**
 * Fills the `{effective}` / `{hourly}` placeholders in the language files' aftercare
 * terms. ITEM 44.
 *
 * The placeholders carry BARE NUMBERS and each language writes its own currency and
 * unit words around them — "480 kr. i timen", "480 DKK i timmen", "480 DKK
 * ต่อชั่วโมง". Putting the currency in the placeholder instead would have forced one
 * word order on three languages.
 *
 * `format` exists for /sv, which passes svPrice so a four-figure rate would render
 * "2 400" rather than "2.400". It is a no-op at today's rates and is wired up anyway,
 * because the whole point of this indirection is that the rates can change.
 */
export function fillAftercareRates(
  text: string,
  format: (value: string) => string = (value) => value,
): string {
  return text
    .replace("{effective}", format(aftercareRates.effective))
    .replace("{hourly}", format(aftercareRates.hourly));
}

/**
 * The rescue audit bought on its own. A constant because two places quote it:
 * the rescue offer's priceNote below, and the receipt on the clock homepage.
 * As a number typed into a sentence, the receipt would drift the first time the
 * price changed.
 */
export const RESCUE_AUDIT_PRICE = "3.500 DKK";

export const services = {
  intro: {
    eyebrow: "Freelance & Client Work",
    title: "Services",
    // "Selected" and "a few at a time" carry the positioning. Nothing in this
    // block should read as availability anxiety — that is the whole reason
    // freelance lives on its own page instead of next to "Open to work".
    lead: "I take on a small number of selected client projects alongside my product work.",
    body: "I build websites and web interfaces for businesses that need the thing to work, load fast, and keep working after I hand it over. Fixed scope and a fixed price by default, agreed before anything starts. If I am not the right person for what you need, I will tell you on the first call.",
    chips: [
      "Copenhagen · remote across the EU",
      "Dansk · English · Svenska",
      "Fixed price by default",
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
      // The niche, stated in English since /th was dropped (2026-10-25): Ice
      // still runs projects in Thai, there is just no Thai page to point to.
      "You run a Thai-owned business in Denmark or Sweden and would rather run the whole project in Thai.",
    ],
    notFit: [
      "You need a native iOS or Android app.",
      "You need a large backend or data platform built from nothing.",
      "You want the cheapest possible option. A template builder will serve you better.",
      "You need someone on call around the clock after launch.",
    ],
  },

  offers: [
    {
      id: "website",
      n: "01",
      name: "Small-Business Website",
      tagline: "The site your business should already have: fast, findable, and yours.",
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
        label: "In every build",
        body: "This is the part that separates a real site from a 3.000-kroner template job, and it is why the starting price is what it is. None of it is an upsell. It is in the price of every site.",
        items: [
          "Search setup that actually works: page titles and descriptions written per page, a sitemap, structured data, and your Google Business profile connected, so you turn up when someone searches your town and your service, not just your name",
          // AEO/GEO, added 2026-10-11. Written for the owner, so each item says
          // what it does before it names the technique. "Answer engine" and
          // "generative engine" never appear on the page; the outcome does.
          "Set up to be found by AI assistants too, not just Google. When someone asks ChatGPT, Gemini or Google's AI answers for the best place in your area, those tools read your site and repeat what it says, so it needs answers they can quote",
          "Your common questions answered on the site (prices, opening hours, parking, whether you take walk-ins), written so a person can read them and an AI assistant can quote them word for word",
          "A label for search engines that says exactly what kind of business you are, such as a restaurant, a massage clinic or a cleaning firm, with your hours, prices and area. This is called schema.org, and it is how Google and AI tools tell your business apart from a blog about it",
          "A short summary file for AI tools (llms.txt): one page that tells them who you are, what you offer and where, in plain words",
          "Your name, address and phone number checked so they match everywhere that matters: Google, Apple Maps, Krak and De Gule Sider (or Hitta and Eniro in Sweden). Mismatches are one of the most common reasons a business ranks lower than it should",
          "A check of how AI assistants describe your business today, at launch, so you know where you stand and what they get wrong",
          "Built mobile-first and checked at real phone widths, because that is where nearly all of your visitors are",
          "A performance budget: compressed images, minimal scripts, and a site that opens fast on mobile data rather than on your office wifi",
          "Accessibility basics (keyboard navigation, readable contrast, labelled forms), which is both the right thing and increasingly a legal expectation",
          "An enquiry form that reaches your inbox, with a second delivery path so a lost message never costs you a customer",
          "Analytics, so you can see how many people found you and what they clicked",
          "Domain and hosting registered in your name, and a walkthrough at handover so nothing depends on me afterwards",
        ],
      },
      priceLadder: [
        {
          scope: "1–3 pages",
          detail: "A one-pager or simple presence: who you are, what you offer, how to reach you.",
          // The floor sits above the Danish freelance entry point on purpose. A
          // simple site starts around 5.000 kr here, and pricing below that
          // reads as inexperience rather than as value.
          price: "6.500 – 9.500 DKK",
          timeline: "1–2 weeks",
        },
        {
          scope: "4–8 pages",
          detail: "A full site: services, prices, gallery, about, and an enquiry form.",
          price: "12.000 – 20.000 DKK",
          timeline: "2–3 weeks",
        },
        {
          scope: "Add-ons",
          // Was "+ 3.000 – 8.000 DKK" against a one-line detail. A ladder with a
          // wide unexplained band at the bottom reads as an arbitrary number, and
          // gives someone with a bigger budget no visible reason to climb it. The
          // band is now narrower AND every item behind it is priced below.
          detail: "Priced one by one below, rather than as a band you have to ask about.",
          price: addOnBand(WEBSITE_ADD_ONS),
          timeline: "+ 2–4 days each",
        },
      ],
      buildMethodNote:
        "Every site is coded by hand, with no platform underneath it. What it costs to keep afterwards, and who that money goes to, is the next section.",
      /**
       * Prices set against the Danish market rather than invented, August 2026.
       * Where an agency publishes a band, this sits at or just under its floor:
       * below the floor reads as inexperience, which is the same reasoning that
       * put the base price above 5.000.
       *
       *   booking            agencies quote 3.000 – 10.000  → 3.500
       *   payment setup      agencies quote 5.000 – 10.000  → 5.000
       *   member login       agencies quote 5.000 – 15.000  → not offered, see ownWork
       *   CRM/ERP            agencies quote 5.000 – 20.000  → not offered
       *   second language    no market flat price; bureaus charge ~1 kr/word for
       *                      the WORDS, which is a separate bill to a separate
       *                      supplier. 4.500 is for the structure only.
       *   self-editing       no market figure found. Derived from the ladder's own
       *                      economics: offer 01 implies roughly 1.300–1.900 kr a
       *                      working day, and this is a day and a half.
       *   extra page         derived so it cannot undercut the ladder. The 4–8
       *                      band spans 12.000–20.000, so a marginal page is
       *                      about 2.000; 1.800 sits just inside that, and eight
       *                      pages priced this way lands at ~19.200 against a
       *                      20.000 ceiling.
       */
      addOns: {
        label: "What more money buys",
        body: "Each of these is one price. Take one, take none, or add one later. None of them has to be decided now, and none of them changes the price of the pages themselves.",
        items: WEBSITE_ADD_ONS,
        includedLabel: "Not add-ons",
        included: "A map with directions, a gallery, a contact form and a cookie and privacy page are in every build already. They take minutes, and charging for them would make the list above less believable rather than more profitable.",
        /**
         * Item 36 route 2, in one paragraph.
         *
         * Two of these capabilities have no client build behind them. Saying so
         * is cheaper than the alternative and safer than the other alternative:
         * inventing a case study is the line the testimonial was held to for
         * weeks, and it is not crossed here for an upsell table.
         */
        ownWork: "Two of these, taking payment and anything with logins, I have built on my own products rather than for a client. Bevisly runs multi-role accounts with row-level security, and MockMate runs a graded AI pipeline; both are written up under Projects, and you can go and use them. I would rather say that plainly than imply a client history I do not have.",
      },
      priceRange: "From 6.500 DKK",
      priceNote: `${vat.note} It is fixed in writing before we start, and the domain and any hosting are billed to you directly rather than through me.`,
      timeline: "1 – 3 weeks",
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
        "Wired to the API you already have. I scope to what your backend supports rather than asking you to change it",
        "Loading, empty and error states designed, not left to chance",
        "Keyboard paths, screen-reader labels and reduced-motion handled as part of the build",
        "Reviewed pull requests, so nothing lands that your team has not seen",
      ],
      /**
       * 5.500 was 4.800. At a 7.5-hour day that moved 640 kr/h to about 730.
       *
       * The old figure sat in the middle of the Danish JUNIOR freelance band
       * (550–750 kr/h) — but this offer is not sold to the same person as offer
       * 01. A startup or product team benchmarks against agency and consultant
       * rates (1.000–1.500 kr/h), and to that buyer 640 does not read as good
       * value, it reads as a risk signal.
       *
       * Deliberately not higher. 5.500 is the top of the junior band and the
       * bottom of mid, which is defensible on one year of professional frontend
       * work plus one paying client. 6.500 would have been mid-market pricing
       * without the years to answer for it. Revisit after two or three more
       * client projects.
       */
      priceRange: "5.500 DKK / day",
      priceNote: "Roughly 27.500 DKK a week. Quoted as a fixed project price wherever the scope is clear enough to fix, and by the day where it genuinely is not.",
      timeline: "3–8 weeks, or ongoing part-time",
    },
    {
      id: "rescue",
      n: "03",
      name: "Redesign & Performance Rescue",
      tagline: "The site exists. It is slow, dated, or invisible. I fix it without starting over.",
      forWho: "Businesses with a site that works but is quietly losing them enquiries.",
      includes: [
        "A written audit of speed, mobile, accessibility and search basics, in plain language",
        "A prioritised list of fixes with what each one is actually worth, so you can stop at any point",
        "A visual refresh on the structure you already have, on a coded site. On WordPress or Wix I fix what is broken, and a new look means a rebuild in code",
        "Image, font and bundle work, usually where most of the speed is hiding",
        "Before-and-after numbers, measured the same way both times",
        "An honest call on rebuilding: if starting over is cheaper than repairing, I will say so and tell you why",
      ],
      priceRange: "8.000 – 16.000 DKK",
      priceNote: `The audit can be bought on its own for ${RESCUE_AUDIT_PRICE} if you would rather take the fixes elsewhere.`,
      timeline: "1–3 weeks",
    },
  ] satisfies ServiceOffer[],

  // Framing only. Every number and screenshot on the page is read from
  // cases[id === "racha"] at render time, so this section cannot drift from the
  // case study and cannot grow a metric that is not already in this file.
  // ── Client quote ────────────────────────────────────────────────────────
  // This was null for a long time on purpose: a quote may only go up once the
  // client has read the EXACT words and agreed to them. "Write whatever you
  // like and I'll back it up" is permission to draft, not approval of a
  // sentence, and anything published on that basis is a fabricated testimonial
  // no matter how kindly it was offered.
  //
  // What actually happened, 2026-08-18: Racha was sent three drafts, chose the
  // third, and edited it herself — "reliable" is her word, not ours. She then
  // agreed to a grammar pass. So one typo was fixed (lanuched), an "and" was
  // added to close the list, and a comma moved. No claim was added, removed or
  // strengthened; all four claims in the sentence are hers and all four are
  // checkable against the live site.
  //
  // She also offered blanket permission to embellish it. Declined, on the
  // grounds that it would make the quote WORSE: "professional", "a pleasure to
  // work with" and "highly recommend" are what every invented testimonial says,
  // and specificity is the only thing that makes one credible. If more warmth
  // is wanted, ask her for another sentence in her own words rather than
  // writing one for her.
  //
  // Credited to the business rather than to her personally. Approving words and
  // approving publication of your own name are two different consents, and only
  // the first was given. A named business with a live site is checkable anyway,
  // which is the part that carries the weight.
  //
  // If this ever needs replacing, the bar is the same: exact words, her
  // agreement on record, and approvedOn set to the date of that agreement.
  testimonial: {
    text: "Ice built my shop's first website. It's fast, reliable and in Danish, and since it launched I haven't had to fix anything or pay anything extra.",
    author: "Racha Beauty & Wellness",
    role: "Wellness studio, Næstved",
    approvedOn: "2026-08-18",
  } as null | {
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
    body: "Racha is a Thai-owned wellness studio in Næstved, and she had a Facebook page and nothing else. I built her a Danish-language site covering treatments, prices, a gallery and an enquiry form. She has no budget for maintenance and nobody to call when something breaks, so the site was built to keep running without me, and it has.",
    // Retitles the case study's metric keys for a non-technical reader. The
    // values are untouched; only the wording changes.
    plainLabels: {
      "Lighthouse score": "Google speed score, on day one",
      "Paid client project": "First paying client",
      "Contact form fallback": "Backup routes, so no enquiry is lost",
    } as Record<string, string>,
  },

  // What the site costs to KEEP, not to build. Almost nobody publishes this,
  // which is exactly why it earns trust: the running cost is the thing a small
  // business gets surprised by a year later.
  //
  // One column since 2026-10-11, when Webflow stopped being offered. The old
  // two-column comparison is in git history if a builder route ever returns.
  // Figures are approximate and in DKK per year.
  runningCosts: {
    eyebrow: "After Launch",
    title: "What it costs to keep",
    lead: "What you pay every year after launch, and who that money goes to. A coded site has no platform underneath it, so the list is short.",
    note: "Approximate, in DKK per year. Hosting depends on where the site lives, so it is a range rather than one figure.",
    /**
     * Stated as a full sentence, directly under the table, rather than as the
     * footnote it used to be.
     *
     * "Then, per year: 100 – 1.600 kr" with no recipient named reads, to a
     * nervous small-business owner, as "he charges me every year forever" —
     * which is the exact fear that stops people hiring a developer at all. The
     * money genuinely goes to third parties, so say so where the numbers are.
     */
    paidTo:
      "Every figure here is paid to your host or your domain registrar, directly and in your name. None of it comes to me, and I do not mark up other people's invoices. After handover I do not invoice you again unless you ask me for more work, or choose the optional Local visibility plan further down.",
    rows: [
      {
        label: "Platform fee",
        value: "0 kr",
        why: "A hand-coded site has no platform underneath it, so there is nothing to subscribe to. Builders like Wix, Squarespace and Webflow charge a site plan every year; this does not.",
      },
      {
        label: "Hosting",
        value: "0 – 1.500 kr",
        why: "A marketing site this size fits inside the free tier at Netlify or Vercel. That is a company's free tier, not a promise, so if it ever changes or you would rather sit on a Danish webhotel, budget 500 – 1.500 kr a year.",
      },
      {
        label: "Domain",
        value: "≈ 100 kr",
        why: "A .dk domain, registered in your name and not mine.",
      },
      {
        label: "Editing it yourself",
        value: "One-off add-on",
        why: "If you want to change your own text, prices and images, I set up a free editor on the site once, as an add-on. After that it costs nothing a year. Rearranging the layout is still a call to me.",
      },
    ],
    /**
     * Five years of RUNNING cost only. The build price is a separate, one-off
     * figure on the receipt above, and adding it here would hide the point.
     *
     * 5 × (hosting 0–1.500 + domain ~100) = 500 – 8.000.
     */
    fiveYear: {
      label: "Five years of running cost",
      note: "Hosting and domain only. The build is paid once.",
      value: "500 – 8.000 kr",
    },
    verdict:
      "On the likely setup, a free hosting tier and a .dk domain, that is about 100 kroner a year. There is no plan, no plugin to patch and no platform that can raise its price on you. Content you post to repeatedly, like a menu or a treatment list, is the one add-on that changes what you can do afterwards, and it is free to run once it is built.",
  },

  /**
   * ITEM 33, DECIDED 2026-08-21: a prepaid block of hours, and NO subscription.
   *
   * WHY NOT THE STANDARD PRODUCT. Danish agencies sell website care at 250 – 3.000
   * kr a MONTH, typically 500 – 2.000. Read what is in those plans and they are all
   * the same product: hosting, security patches, daily backups, WordPress core and
   * plugin updates. That plan exists because WordPress rots. A static site on
   * Netlify has no plugins to patch, so selling a monthly CARE plan here would
   * mean charging for a problem this stack deliberately does not have, and it
   * would undercut the exact technical choice that makes "no yearly bill" true
   * in runningCosts. That is not a small inconsistency to accept for recurring
   * revenue; it is the argument.
   *
   * AMENDED 2026-10-11. There IS now one monthly product, `localVisibility`
   * below, and it is deliberately not care: it sells getting customers (Google
   * profile, reviews, AI assistants, a report), not keeping software alive.
   * The reasoning above still rules out a maintenance plan, and the block below
   * still never renews. Keep the two apart in every sentence that mentions them.
   *
   * SO THE PRODUCT IS CHANGES, NOT MAINTENANCE. That is also what clients actually
   * want, and it closes the one thing the old position left dangling: what a
   * ten-minute text change costs. "Call me and I will invoice you 100 kr" costs
   * more in admin and awkwardness than it earns, so small changes are simply free
   * and anything real is either billed hourly or drawn from a prepaid block.
   *
   * The block is the recommended answer and it is priced to be one: 480 kr an hour
   * against 650 ad-hoc, roughly a quarter less, which is what makes prepaying a
   * decision rather than a favour. 650 sits inside the Danish freelance band
   * (550 – 750) and above offer 01's implied project rate, which is correct — ad-hoc
   * work has no economies of scale and every change is a context switch.
   *
   * ⚠️ NOTHING HERE RENEWS. No subscription, no automatic billing. The only
   * recurring charge on the page is `localVisibility`, which the client opts
   * into separately. If anything in THIS object ever renews, `paidTo` and the
   * aftercare FAQ both become false and have to change in the same commit.
   */
  aftercare: {
    eyebrow: "After Launch",
    title: "If you want changes later",
    lead: "Your site has no plugins to patch and nothing that rots. That is the point of building it this way, and it is why there is no maintenance plan here to sell you. What people do want later is changes, so this is what those cost.",
    free: {
      label: "Free, just ask",
      body: "A price, a phone number, an opening hour, a typo. Anything that takes me a few minutes is not worth either of us raising an invoice for, so I do not.",
    },
    hourly: {
      label: "By the hour",
      price: `${aftercareRates.hourly} ${aftercareRates.currency} / hour`,
      body: "Billed in half hours, for anything bigger: new photos, a rewritten page, a seasonal menu. I tell you the estimate before I start, not after.",
    },
    block: {
      label: "A block of hours",
      price: `${aftercareRates.blockPrice} ${aftercareRates.currency}`,
      unit: `${aftercareRates.blockHours} hours · valid ${aftercareRates.blockMonths} months`,
      body: "Most of my clients never need this, and I would rather say so than sell you a subscription. But if you would rather not think about it every time you want something changed, buy a block up front and draw on it. Use it for anything: text, photos, prices, a new page, a question. I log what each change took and tell you what is left.",
      terms: [
        `Works out at ${aftercareRates.effective} kroner an hour instead of ${aftercareRates.hourly}`,
        "Unused hours roll over once, into a second year",
        "No monthly bill, and nothing renews automatically",
        "When it runs out you buy another or you do not. There is no default",
      ],
    },
  },

  /**
   * The one monthly product, added 2026-10-11. Read the AMENDED note on
   * aftercare before changing the framing: this is sold as getting customers,
   * never as looking after the website, because the site does not need looking
   * after and the page says so two sections earlier.
   *
   * 🔒 NO BINDING. Cancel any month, no notice period, no setup fee. Danish
   * owners on amino.dk complain most about agency lock-in and paying for work
   * nobody can see; this plan answers both, so neither promise may soften.
   * The price is localVisibilityRates above; never type it here.
   */
  localVisibility: {
    eyebrow: "Optional, Monthly",
    title: "Local visibility",
    lead: "A website is only half of being found. The other half lives on Google, in your reviews and, more and more, in what AI assistants say when someone asks where to go. This plan looks after that half every month, so you can get on with running the business.",
    price: `${localVisibilityRates.monthly} ${localVisibilityRates.currency} / month`,
    includes: [
      "Your Google Business profile kept up to date: hours, holiday closures, photos, menu or price list, and a regular post so it stays active",
      "Help getting more reviews: a simple way to ask happy customers, and suggested replies to every review, good or bad, for you to approve",
      "Updates beyond the free small changes, such as new photos, a seasonal menu or a rewritten section, included rather than billed by the hour",
      "A monthly check of how Google and AI assistants like ChatGPT describe your business, and corrections to the sources they read when they get it wrong",
      "Your name, address and phone number kept consistent across the directories that matter",
      "A short report each month in plain language: how many people found you, called, asked for directions or visited the site, and what I did",
    ],
    terms: [
      "No binding: cancel any month, no notice period",
      "No setup fee",
      "Works best on a site I built, but I can take on your Google profile and reviews alone",
      "Not advertising: no ad budget is spent on your behalf",
    ],
    /**
     * Said on the page because the reader just saw "no maintenance plan" in
     * the aftercare section and will otherwise think this contradicts it.
     */
    notCare: "This is not website care. Your site does not need patching, and I will not charge you to watch it. What this pays for is the work that brings customers in, which never really finishes.",
  },

  /**
   * The shortest honest form of the terms, for the homepage. The prices are
   * already up there (the old homepage's offer list); what was missing was what
   * surrounds them.
   *
   * The moms line reads from `vat` above rather than restating the claim, and it
   * uses the short label, which is true whether or not he is registered. This line
   * therefore survives registration untouched.
   */
  termsShort: [
    "Fixed price by default, agreed in writing before anything starts",
    `All prices ${vat.shortLabel}`,
    "Domain, hosting and code all end up in your name",
  ],

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
    a: `It depends on how many pages, and the answer is published rather than quoted on request. A one-pager or simple three-page site is ${services.offers[0].priceLadder![0].price}, and a full four-to-eight page site is ${services.offers[0].priceLadder![1].price}. Every site is coded by hand, so there is no platform fee on top afterwards, only a domain and possibly hosting. Fixing an existing site is ${services.offers[2].priceRange}, and frontend work on a web app is ${services.offers[1].priceRange}. The exact number is fixed in writing before any work starts. ${vat.note} For context, a simple site from a Danish freelancer or agency typically runs 5.000 to 25.000 kroner before moms, so this sits at the lower half of the market.`,
  },
  // Second, beside the price questions (Ice, 2026-10-05). It replaced the
  // "Yours, not mine" section on /services, whose ownership half the FAQ already
  // covered ("Who owns the code?"). This half stays because it prevents the most
  // common scope blow-up in small web projects: a client assuming their
  // developer will write their copy and take their photos. Saying it before the
  // first call costs one answer and saves an argument in week two.
  {
    q: "What is not included in the price?",
    a: "Said plainly so it is never a surprise halfway through. Writing your content: I will structure it, edit it, and tell you what each page needs, but the words about your own business should come from you or a copywriter. It is the most common thing that delays a project. Professional photography: phone photos in good light are often fine; if you need a photographer, budget for one separately. Logo and brand identity: I design around the brand you already have. Ongoing work after launch: the search and AI foundations are included, and keeping your Google profile, reviews and listings active is the optional Local visibility plan, ${services.localVisibility.price}. Paid advertising: running ad campaigns is somebody else's speciality. Legal wording: I put the privacy page, cookie notice and structure in place, but the wording should be checked by someone qualified. For most of these I can point you to someone good.",
  },
  {
    q: "Why not just get a site for 3.000 kroner?",
    a: "You can, and for some businesses that is genuinely the right call: if you need a placeholder page and nothing more, a template builder will do it cheaper than I will. What you usually do not get at that price is the part that makes the site earn its money: search setup written per page so you turn up when someone searches your town and your service, a performance budget so it opens fast on mobile data, accessibility basics, an enquiry form with a backup delivery path, and analytics so you can tell whether any of it is working. That work is the same amount of work whether the site has three pages or eight, which is why the starting price is where it is. If your budget is firmly under 6.500, say so in the enquiry form. I will tell you honestly whether to spend it with me or somewhere else.",
  },
  {
    q: "Can I pay by the hour instead?",
    a: `For a website I would rather you did not, and that is more for your protection than mine. A fixed price means you know the number before anything starts and I carry the risk if it takes longer than I estimated. Billing by the hour moves that risk onto you, and you are the one who cannot see how long things ought to take. Where scope genuinely cannot be pinned down, a day rate is the honest shape and I do use one: ${services.offers[1].priceRange} for frontend work on a product, which is the second offer above. That fits ongoing work, an open-ended list of changes, or anything waiting on decisions nobody has made yet. What it is not is a cheaper way to buy a website: a fixed-price site will almost always cost you less than the same site billed by the day.`,
  },
  // Added 2026-10-11 with the Webflow removal. Many of the businesses this page
  // is for already have a WordPress, Wix or Elementor site, often a broken one,
  // so this is a real first question rather than a hypothetical.
  {
    q: "Can you fix my WordPress or Wix site?",
    a: "Yes, when something is broken: error messages on the page, a slow or insecure site, a form that stopped sending. I fix those on the site you already have, as a Rescue or at the hourly rate. What I do not do is redesign a builder site or keep patching it month after month. A WordPress site breaks when its plugins and its PHP version drift apart, so ongoing patching only buys time until the next update does the same. Wix and Squarespace lock the parts that make a site fast and findable inside the platform. So when you want a new look, I rebuild in code: priced like any new site, often reusing your text and photos, with no plugins to update and no platform fee afterwards. The written audit tells you honestly which of the two you need.",
  },
  // AEO in the FAQ itself: the question an owner actually types into ChatGPT.
  {
    q: "Will my business show up when people ask ChatGPT or Google's AI?",
    a: `More and more people ask an AI assistant where to eat or who to call, and those tools answer from what they can read about you: your website, your Google profile, your reviews and the big directories. Every site I build is set up for that: your common questions answered in plain words they can quote, a label that tells them exactly what kind of business you are, a short summary file written for AI tools, and your name, address and phone number matching everywhere. I also check what the assistants say about you at launch. Nobody can promise a place in an AI answer, and anyone who does is guessing. What I can do is make sure the facts they find are right and easy to repeat. Keeping that up every month is part of the optional Local visibility plan, ${services.localVisibility.price} with no binding.`,
  },
  // Deliberately a FAQ rather than a line on the offer card. To the buyer this
  // page is written for, "React · Next.js · TypeScript" is noise, and jargon in
  // the money section reads as "this will be complicated and I will not
  // understand it". Collapsed, it costs the non-technical reader nothing and is
  // there instantly for anyone checking whether they would be locked in.
  {
    q: "What do you build it with, and could another developer take it over?",
    a: "Hand-coded sites are built with React and Next.js in TypeScript, styled with Tailwind CSS, and hosted on Netlify or Vercel. Forms go through a service like Resend so messages reach you even though there is no server to maintain. The part that actually matters: these are mainstream tools, not anything invented here. Any React developer can open the repository and continue, which is deliberate: you should be able to replace me without replacing your website. Racha Beauty's site is React and Tailwind, and the full stack for every project I have built is listed on its case study page.",
  },
  {
    q: "Is there a monthly fee for the website?",
    a: "Not to me, and not to a platform. A coded site has no site plan underneath it. Its hosting fits inside the free tier at Netlify or Vercel for a site this size, though I will not pretend a company's free tier is a guarantee: if it changes, or you would rather sit on a Danish webhotel, that is 500 to 1.500 kroner a year. The domain is about 100 kroner, in your name. You pay those directly; I do not mark up other people's invoices. The only monthly thing I sell is the optional Local visibility plan, which is about getting customers rather than keeping the site running, and you can cancel it any month.",
  },
  {
    q: "Can I update the website myself afterwards?",
    a: `Yes, if you want to. I set up a free editor on the site as a one-off add-on (${WEBSITE_ADD_ONS[0].price}), and after that you can change text, prices and images yourself and it costs nothing a year to keep. Content you post to repeatedly, like a menu or a treatment list, is a list you manage yourself (${WEBSITE_ADD_ONS[1].price}), also free to run afterwards. What you cannot do is move the layout around yourself; a new section is still a call to me. Either way you get a walkthrough at handover, and you are not locked into paying me for small changes.`,
  },
  {
    q: "Do you only work with clients in Copenhagen?",
    a: "No. I am based in Copenhagen and happy to meet in person anywhere in the greater Copenhagen area, but most of the work happens remotely and I take clients across Denmark, Sweden, and the rest of the EU. Racha Beauty is in Næstved and that project ran almost entirely remotely. If we never meet in person, nothing about the result changes.",
  },
  {
    q: "Do you maintain the site afterwards?",
    a: `The site itself does not need maintaining, and that is deliberate. It has no plugins to patch, so I do not sell a care plan: Racha Beauty's site has run since launch without anyone touching it. What I do not do is pretend you will never want anything changed. Small things, like a price, an opening hour or a typo, are free, because a 100-kroner invoice costs us both more in admin than it is worth. Anything bigger is ${services.aftercare.hourly.price}, billed in half hours, with the estimate given before I start. Or buy a block of ${services.aftercare.block.unit.split(" · ")[0]} for ${services.aftercare.block.price} and draw on it as you go, which works out cheaper per hour and never renews. Separately, if you want someone keeping your Google profile, reviews and AI listings working for you every month, that is the Local visibility plan at ${services.localVisibility.price}, with no binding. It is about getting customers, not looking after software.`,
  },
  {
    q: "Which languages can you work in?",
    a: "I build in Danish, English and Swedish. Racha Beauty's site is entirely Danish, down to the page addresses. My own spoken Danish is still improving, so we can run the project itself in English or Swedish and still ship a fully Danish site. The language of the meetings and the language of the website are two different things.",
  },
  {
    q: "How long does it actually take?",
    a: "A small-business site is usually two to three weeks, a rescue one to three, an app frontend three to eight. Those are real numbers, not best cases. The most common delay is not the build. It is waiting on text and photos from you, which is why the scope says exactly what I need from you and when.",
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
    // The monthly plan. Before it had a value of its own, an owner who only
    // wanted their Google profile looked after had to pick "Something else".
    { value: "local-visibility", label: "Local visibility (monthly)" },
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

// ─── CONTACT ──────────────────────────────────────────────────────────────────
// The /contact page (2026-10-25): recruiters get the direct lines first,
// clients the enquiry form below (it replaced the Stack's /build card).
export const contactPage = {
  lead: "Hiring, or need a website built? Both start here.",
  role: {
    title: "For a role",
    body: "Email or LinkedIn reach me directly. My CV has the details.",
  },
  project: {
    title: "For a project",
    body: "Tell me about the business and what it needs. It lands in my inbox, and I reply to every enquiry myself.",
    price: `Websites ${services.offers[0].priceRange.replace(/^From/, "from")}, at a fixed price agreed in writing before any work starts.`,
  },
};

// ─── WORK AND SHOWROOM ────────────────────────────────────────────────────────
// /work lists every case; /showroom only the priced concept sites. Moved out
// of stackContent on 2026-10-25, when both pages joined the world.
export const workPage = {
  lead: "Every project with a case page: what it is, what I did and how it was built.",
  leadGroup: "Selected work",
  restGroup: "Also",
};

export const showroomPage = {
  lead: "Sample sites for made-up businesses, each showing what you would get and what a site like it costs. I price a site by what it needs, never by its style, so two sites that look nothing alike can cost the same. Open one to see what is included.",
  concept: "Concept, no client",
  more: "I add a new sample site every week or two. The next one is a restaurant in an editorial, print-inspired style.",
  prices: "All prices and add-ons",
};

// ─── CASE PAGES ───────────────────────────────────────────────────────────────
// The case page's own labels (moved out of stackContent on 2026-10-25).
export const casePage = {
  concept: "Concept, no client",
  code: "Code",
  sections: [
    { key: "overview", label: "Overview" },
    { key: "challenge", label: "The challenge" },
    // "Approach", not "Why this stack": for Trailr and Millennial the answer
    // is about process, not tech (Ice, 2026-10-26).
    { key: "stackWhy", label: "Approach" },
    { key: "engineering", label: "How it was built" },
  ] as const,
  price: {
    label: "What a site like this costs",
    gets: "What you get",
    total: "Total",
    timeline: "Typically",
    terms: `Prices ${vat.shortLabel}. You pay for the domain and any hosting directly, never through me.`,
    buildLike: "Build me one like this",
  },
};

// ─── FOUNDING CLIENTS AND THE SHOWROOM (2026-10-24) ──────────────────────────

/**
 * The founding-client offer: how Ice starts below market without printing a
 * below-market price. The list prices stay where the market puts them, and the
 * first few clients get a stated discount in return for a testimonial and
 * permission to show the work, which is the proof the list price lacks today.
 *
 * Every founding figure is COMPUTED from the list price, never typed. When the
 * spots are gone, set `spotsLeft` to 0: every founding line on the site and in
 * the chatbot disappears, and nobody sees a price rise, only an offer that
 * closed.
 *
 * DOES NOT INTERPOLATE: public/llms.txt repeats these terms by hand. Delete its
 * Founding bullet when spotsLeft reaches 0, and edit it if spots or discount
 * change.
 */
export const founding = {
  spots: 3,
  spotsLeft: 3,
  discount: 0.4,
  label: "Founding client price",
};

export const foundingOpen = founding.spotsLeft > 0;

/** The terms, in one place, with the numbers read from `founding`. */
export const foundingTerms = `${Math.round(founding.discount * 100)}% off a whole website for my first ${founding.spots} clients. In return you write me a short testimonial and let me show your site in my portfolio.`;

/** List price to founding price, rounded to the nearest hundred kroner. */
export const foundingFigure = (n: number) => Math.round((n * (1 - founding.discount)) / 100) * 100;

export const foundingSpotsLine = `${founding.spotsLeft} of ${founding.spots} spots left.`;

/**
 * What a concept would cost a real business: its ladder rung plus its add-ons,
 * read from the same strings /services shows. Returns the build-up rows for the
 * placard and the totals, list and founding.
 */
export function conceptPrice(showroom: NonNullable<CaseStudy["showroom"]>) {
  const rung = services.offers[0].priceLadder![showroom.rung];
  const addOns = showroom.addOns.map((id) => WEBSITE_ADD_ONS.find((a) => a.id === id)!);
  const [low, high] = figures(rung.price);
  // A span-priced add-on (the second language) adds its low end to the low
  // total and its high end to the high one.
  const addLow = addOns.reduce((sum, a) => sum + Math.min(...figures(a.price)), 0);
  const addHigh = addOns.reduce((sum, a) => sum + Math.max(...figures(a.price)), 0);
  const range = (a: number, b: number) => `${dk(a)} – ${dk(b)} DKK`;
  return {
    rows: [
      { label: rung.scope, value: rung.price },
      ...addOns.map((a) => ({ label: a.name, value: `+ ${a.price}` })),
    ],
    total: range(low + addLow, high + addHigh),
    founding: range(foundingFigure(low + addLow), foundingFigure(high + addHigh)),
    // The ladder's own Add-ons rung says how much time each add-on adds.
    timeline: addOns.length
      ? `${rung.timeline}, ${services.offers[0].priceLadder![2].timeline.replace("+ ", "plus ")}`
      : rung.timeline,
  };
}

/**
 * The one rule for "is this in the Showroom?": a sample site with a placard.
 * Only samples built from 2026-10-24 on, priced for what they are. Old client
 * work is not re-priced here (Ice, 2026-10-24: Racha is a small static site,
 * and a page-count price made it look like a 12.000 job).
 */
export const inShowroom = (c: CaseStudy) => Boolean(c.concept && c.showroom);

/** The samples with a Showroom entry, in stack order. */
export const showroomCases = () => cases.filter(inShowroom);

/** The chatbot's price lines for the Showroom samples. */
function showroomLines() {
  return showroomCases()
    .map((c) => {
      const p = conceptPrice(c.showroom!);
      return `- ${c.title} (${c.showroom!.business.toLowerCase()}, ${c.showroom!.style.toLowerCase()}): ${p.rows.map((r) => r.label).join(" + ")} = ${p.total}${foundingOpen ? `, founding client price ${p.founding}` : ""}`;
    })
    .join("\n");
}

// ─── CHATBOT CONTEXT ──────────────────────────────────────────────────────────

export const chatbotContext = `
Taninwat is actively job searching as of July 2026. He recently earned his Higher Vocational Diploma in Frontend Development (2-year program) from Jensen Yrkeshögskola (May 2026). He targets full-stack engineering roles first, and is equally open to frontend or product engineer roles at small companies where he can own delivery end to end: shaping product direction, building the thing, and iterating on real feedback. Frontend is his depth: React, Next.js, TypeScript. He works full-stack too (Node.js, Express, PostgreSQL) and is straightforward that the backend is the newer half of his toolkit rather than overselling it.

He's based in Denmark and holds dual Thai-Swedish citizenship, so he can work anywhere in the EU/Schengen without visa complications. He's open to roles in Denmark, Sweden, or remote.

He's honest about where he stands. His degree is a vocational frontend program, not a CS degree, so he doesn't pretend to be a systems engineer. What he brings is genuine delivery and operations experience. He led an organisation as Head of Organization at Millennial Consulting, coordinating around five client projects per cycle with no full-time staff. He has shipped real products (Bevisly, a skill-verification SaaS; MockMate, an AI interview platform; a commercial client site; a full-stack booking system), and contributes part-time to an early-stage AI startup, Trailr AI.

He works best where he can own something end to end, figure things out without constant hand-holding, and collaborate closely with a small team. He's not looking for the biggest company, he's looking for the right fit.

He works part-time at Trailr AI, so he's fully available for full-time employment in parallel.
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

A small-business website is priced by scope alone, and every client site is coded by hand. Ice does not build client sites in Webflow, Wix, WordPress or any other builder, and does not redesign existing builder sites: a new look means a rebuild in code. He does fix what is broken on any existing site, builder or not (visible errors, speed, security, a form that stopped sending), as a Rescue or at the hourly rate. Never offer to build a new site in a builder. You may quote these figures, they are published on the services page:
${services.offers[0]
  .priceLadder!.map((r) => `- ${r.scope}: ${r.price} (typically ${r.timeline})`)
  .join("\n")}

Add-ons are itemised and each has ONE price. You may quote these; they are published on the services page:
${services.offers[0]
  .addOns!.items.map((a) => `- ${a.name}: ${a.price}${a.note ? ` (${a.note})` : ""}`)
  .join("\n")}
${services.offers[0].addOns!.included}
${
  foundingOpen
    ? `\nFounding client offer, published on the site: ${foundingTerms} ${foundingSpotsLine} It applies to a website build only. Quote it if asked about price or budget; never extend it, invent another discount or negotiate below it.\n`
    : ""
}
The Showroom (https://taninwatkaewpankan.xyz/showroom) shows sample sites for made-up businesses, each with what a site like it would cost. They are concepts with no client; never present them as client work, and never put a price on a real client's site. You may quote these:
${showroomLines()}

Taking payment and anything involving logins are capabilities Ice has built on his own products (Bevisly and MockMate) rather than for a client. Say that plainly if asked; never imply a client build that does not exist.

What the site costs to keep: there is no platform fee. Hosting fits a free tier or costs 500 – 1.500 kr a year on a Danish webhotel, and a .dk domain is about 100 kr a year, so five years of running cost is about ${services.runningCosts.fiveYear.value}. Self-editing is a one-off add-on Ice sets up, free to run afterwards; nobody can rearrange the layout themselves. All of these yearly costs are paid by the client directly to their host and registrar, never to Ice, and he does not mark up other people's invoices. If someone worries about an ongoing bill from him, say that plainly.

There is NO website maintenance or care plan. Danish agencies sell website care at 250 – 3.000 kr a month, but that product is patching WordPress, and a static site has no plugins to patch. Charging for that would be charging for a problem this stack does not have.

For changes after launch: small things, like a price, an opening hour or a typo, are FREE, because a 100 kr invoice costs more in admin than it earns. Anything bigger is ${services.aftercare.hourly.price}, billed in half hours, estimate given first. Or a prepaid block: ${services.aftercare.block.price} for ${services.aftercare.block.unit}, which works out at ${aftercareRates.effective} kr an hour instead of ${aftercareRates.hourly} and rolls over once. The block never renews.

There IS one optional monthly plan, and it is about getting customers, not maintaining the site: Local visibility, ${services.localVisibility.price} ekskl. moms, no binding, cancel any month, no setup fee. It covers: ${services.localVisibility.includes.join("; ")}. It does not include paid advertising or an ad budget. If someone asks about a retainer or ongoing SEO, this plan is the answer; never call it maintenance or website care, and never imply it is required.

Every build includes per-page search setup and Google Business connection, setup for AI assistants (common questions answered in quotable form, schema.org for the business type, an llms.txt summary file, name/address/phone made consistent across the main directories, and a check of how AI assistants describe the business at launch), mobile-first construction, a performance budget, accessibility basics, an enquiry form with a backup delivery path, analytics, and domain and hosting in the client's name. If someone asks why it is not 3.000 kroner, that list is the answer: a template shop skips it, and it is the part that makes the site actually get found and convert. Never promise a ranking or a place in an AI answer; promise correct, consistent, quotable facts.

Note that his shipped client work to date is hand-coded. Webflow and Framer are in his skill list as skills, but he does not sell builder sites and has no Webflow or Framer client work; never offer either or claim case studies.

How he works: a short call, then a written scope with a fixed price and a delivery date before any work starts. Fixed price is the default, and it is how a website is sold: the client knows the number before anything begins and Ice carries the risk if it runs long. Where scope genuinely cannot be pinned down, such as ongoing frontend work on a product or an open-ended list of changes, he bills by the day at ${services.offers[1].priceRange} instead. Never say he refuses hourly or time-based work: the day rate is a published offer on the same page. He does the work himself. There is no agency and no handoff to someone else. The code, domain and hosting all end up in the client's name.

What he does not take on: native iOS/Android apps, paid advertising campaigns, redesigns or ongoing patching of builder sites (WordPress, Wix, Squarespace; those get rebuilt in code), and large backend-heavy platforms built from nothing.

VAT: ${vat.briefing}

Availability: he takes a few projects at a time, so it varies. You may state the price ranges listed above, because they are published on the services page. Never invent a figure outside them, never quote an exact price for a specific project, and never promise a delivery date: every project is scoped individually. Point people at the enquiry form on /contact, which asks for project type, budget and timeline so he can reply with something specific.

Being available for freelance work does not conflict with him being open to employment. Do not raise his job search, his CV, or his availability for hire with someone who is asking about hiring him for a project.
`.trim();
