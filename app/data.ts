
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

  // Three paragraphs since 2026-10-31 (Ice): the character, not the timeline.
  // The facts live in aboutFacts and the CV.
  aboutStory: [
    "I moved to Sweden at 16 with no Swedish and no plan. I learned the language, rebuilt my grades, and worked every job that would have me, from cleaning and waiting tables to a food truck and night shifts sorting packages.",
    "Then came York, Uppsala University (interaction design, then a Master's in Entrepreneurship), and Denmark, where I grew from operations assistant to head of organization at Millennial Consulting. I wanted the technical side too, so I trained as a frontend developer at Jensen, interned at Trailr AI, and stayed on as an early team member.",
    "I'm in Copenhagen now, building products and websites for local businesses. Still the same person who walked into Sweden without the language, just with a few more tools.",
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
      body: "Taking a paying client from the first call to handover: working out what they actually need, quoting a fixed price, building it, and leaving them owning the result. I build every client site in custom code, so it is fast, easy to find on Google, and has no platform fee to pay each year. Racha Beauty has run since launch without maintenance.",
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
    "Full-stack engineer working mostly in TypeScript, React and Next.js. At Trailr AI, an early-stage AI video startup, I work part-time on the React frontend and led a redesign of the platform's UI within what the existing backend supports. In my own products I build the backend too, with Node.js, REST APIs and PostgreSQL, and add LLM features where a person keeps the final say. I use AI-assisted development every day and check the result with tests and CI before it ships.",

  // Only what the JD Ledger's engineering ads ask for (97 Nordic ads with full
  // text, 2026-10-28). Terms almost no ad names (Zustand, Redux, Prisma, Zod,
  // Express, Tailwind, Agile) stay in the project lines as evidence, not here.
  skills: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Accessibility (WCAG)", "Web performance (Core Web Vitals)"],
    },
    {
      label: "Backend",
      items: ["Node.js", "REST APIs", "PostgreSQL", "Supabase"],
    },
    {
      label: "AI and tools",
      items: [
        "LLM integration (Gemini)",
        "AI-assisted development (Claude Code, review agents)",
        "Git",
        "CI/CD (GitHub Actions)",
        "Testing (Vitest)",
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
        "A redesign of Story Builder and the platform navigation, scoped to what the existing backend already supports, with state reworked inside the existing Zustand store.",
        "Most work arrives as rough briefs with no formal specs, so the job is reading the intent, flagging feasibility gaps early and checking with the backend team before building.",
        "The platform is in enterprise trials with two major Danish media companies.",
      ],
    },
    {
      org: "Freelance",
      role: "Web Developer",
      period: "Jun 2025 – Present",
      place: "Copenhagen, Denmark",
      bullets: [
        "Racha Beauty, a paying client's first website. A Danish-language React site with a 95+ Lighthouse score and a contact form with a fallback path.",
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
        "A hybrid Agile and waterfall process of my design, later adopted across the organisation.",
      ],
    },
  ] satisfies CvEntry[],

  projects: [
    {
      org: "Bevisly",
      role: "Personal Project (React, TypeScript, React Router, Supabase, PostgreSQL, Vitest)",
      period: "Aug 2025 – Present",
      place: "Copenhagen, Denmark",
      bullets: [
        "Proof pages for web freelancers with real work and no reviews yet. Each project is confirmed by the client who paid for it, through a link the freelancer sends.",
        "72 PostgreSQL migrations so far, with access rules per role, triggers and SQL functions.",
        "Public pages prerendered to HTML, built to a budget of about 100 KB of JavaScript and Core Web Vitals targets.",
      ],
    },
    {
      org: "MockMate",
      role: "Personal Project (Next.js, TypeScript, PostgreSQL, Prisma, Gemini)",
      period: "May 2026 – Present",
      place: "Copenhagen, Denmark",
      bullets: [
        "An AI interview practice tool, live at mockmate.space. Candidates paste a job ad, rehearse a tailored interview and get graded the way a hiring panel would.",
        "The LLM grades in a separate pass that reads only summarized notes, not the raw answers, which keeps scores consistent and closes a prompt injection risk.",
        "Composite indexes chosen for the real query paths, for example the cleanup job that finds stale interview sessions.",
      ],
    },
    {
      org: "Concept websites (Lumina, Saep, Første Lys)",
      role: "Personal Projects (HTML, CSS, JavaScript)",
      period: "Aug 2026 – Present",
      place: "Copenhagen, Denmark",
      bullets: [
        "Three sites for invented Copenhagen businesses, each built around one scroll-driven moment, at 11 to 14 KB of page code gzipped.",
        "Each site works in full with reduced motion or without JavaScript, and each form says exactly what to fix.",
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
  /**
   * The design side of the case, beside the engineering (Ice, 2026-10-26:
   * the site speaks both languages). Palette and type are read from the
   * project's own code, never picked to look nice here; `notes` is Ice's
   * reasoning, in his words, and stays out until he gives it.
   */
  design?: {
    palette: { name: string; hex: string }[];
    type: { role: string; family: string }[];
    notes?: string;
    /** Where the facts were read from. For us, never rendered (Ice, 2026-10-26). */
    source: string;
  };
  title: string;
  sub: string;
  images: string[];
  /**
   * A short silent loop of the real product, played on the case's hall card
   * only (Ice, 2026-10-26: hero and case pages stay static). Recorded and cut
   * by the recipe in SIGNIFLY-PLAN.md; without it the card shows images[0].
   */
  clip?: string;
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
    design: {
      palette: [
        { name: "Background", hex: "#F8FAFC" },
        { name: "Accent", hex: "#007AFF" },
        { name: "Text", hex: "#0E1116" },
        { name: "Dark background", hex: "#0E1116" },
        { name: "Dark accent", hex: "#3ABFF8" },
        { name: "Supporting", hex: "#2DD4BF" },
      ],
      type: [
        { role: "Headings", family: "Space Grotesk" },
        { role: "Text", family: "DM Sans" },
      ],
      source: "src/style/theme/theme.ts, from the light and dark palette I added on 28 Oct 2025",
    },
    title: "Trailr AI",
    sub: "Leading a platform redesign at an early-stage AI video startup.",
    images: [
      "/assets/trailr/trailr-hero.webp",
      "/assets/trailr/trailr-clip-generator.webp",
      "/assets/trailr/trailr-screening-room.webp",
      "/assets/trailr/trailr-story-builder.webp",
    ],
    // Story Builder on the Aliens demo project: play runs clip 1 into clips 2 and 3, 2026-10-31.
    clip: "/assets/trailr/clip.mp4",
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
    // The Making (Ice, 2026-10-26): v1 rebuilt from commit 5d00537 (9 Nov
    // 2025); v2 is Ice's own screenshot of the landing from 941aa18 (22 Feb
    // 2026); v3 is the live site on 2026-10-26. Bevisly is becoming a freelance platform; update
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
        label: "Second version, February 2026",
        text: "Renamed Bevisly and rebuilt around one line: prove your skills, get hired, keep the proof forever.",
        image: "/assets/bevisly/making/second-version.webp",
        alt: "Bevisly in 2026: 'Prove your skills. Get hired. Keep the proof forever.' above a box for generating a skill task from a job description.",
      },
      {
        label: "Turning point",
        text: "A profile full of completed tasks turned out to be a portfolio by another name. In September 2026 Bevisly became a job board that can ask for the work, and it is now becoming a freelance platform.",
      },
      {
        label: "In progress, October 2026",
        text: "One page of your projects, each confirmed by the client who paid for it. Still being built.",
        image: "/assets/bevisly/making/in-progress.webp",
        alt: "Bevisly in October 2026: 'Your work, confirmed by the clients who paid for it.' with a Create your page button.",
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
    design: {
      palette: [
        { name: "Background", hex: "#FFFFFF" },
        { name: "Text", hex: "#0A0A0A" },
        { name: "Surface", hex: "#F5F5F5" },
        { name: "Border", hex: "#E5E5E5" },
      ],
      type: [
        { role: "Text", family: "Geist" },
        { role: "Code", family: "Geist Mono" },
      ],
      source: "the app's globals.css (neutral oklch tokens)",
    },
    title: "MockMate",
    sub: "Paste a job description. Get a tailored interview. Get graded like a hiring panel would.",
    images: [
      "/assets/mockmate/mockmate-landing.webp",
      "/assets/mockmate/mockmate-dashboard.webp",
      "/assets/mockmate/mockmate-feedback.webp",
    ],
    // Inside the app: dashboard → one interview's feedback report, names and companies hidden, 2026-10-31.
    clip: "/assets/mockmate/clip.mp4",
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
    design: {
      palette: [
        { name: "Bitcoin orange", hex: "#F7931A" },
        { name: "Neutral 950", hex: "#0A0A0A" },
        { name: "Neutral 500", hex: "#737373" },
        { name: "Neutral 100", hex: "#F5F5F5" },
      ],
      type: [{ role: "Text", family: "Inter" }],
      source: "src CSS tokens (--color-brand-orange, --color-neutral-*)",
    },
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
    // The Making (Ice, 2026-10-26): v1 rebuilt from commit 2142f3c (27 Jun
    // 2025); photos from 29bd3a6/5af606e (4 Aug 2025); the form's history from
    // the repo (own backend Jun 2025, Web3Forms + Google Form fallback in
    // bfd94de, Nov 2025, backend removed Jan 2026, date/time fields 723fbcd,
    // d013bec); tokens from client/src/index.css (#437066, #f2c84a, #f7f5f0).
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
      {
        label: "Real photos, August 2025",
        text: "Real photos of Racha replaced the illustrations on every page.",
        image: "/assets/racha/racha-landing.webp",
        alt: "Racha Beauty & Wellness today: the welcome headline beside a photo of Racha in her studio.",
      },
      {
        label: "The contact form",
        text: "Enquiries first went through my own small email backend. In November 2025 I moved the form to Web3Forms, a hosted form service, with a Google Form as a fallback if it is ever down, and then removed the backend, so the business has nothing to maintain. Since then it has gained a preferred date and time, and a clear confirmation when it is sent.",
        image: "/assets/racha/making/contact-form.webp",
        alt: "Racha's contact form: name, phone, email, preferred date and time, message and a Send button, on the site's green.",
      },
    ],
    design: {
      palette: [
        { name: "Cream", hex: "#F7F5F0" },
        { name: "Green", hex: "#437066" },
        { name: "Deep green", hex: "#305D4B" },
        { name: "Gold", hex: "#F2C84A" },
        { name: "Stone", hex: "#9C8C7F" },
      ],
      type: [
        { role: "Headings", family: "Lora" },
        { role: "Text", family: "Roboto" },
      ],
      source: "client/src/index.css",
    },
    title: "Racha Beauty",
    sub: "A paying client's first website: 95+ Lighthouse, Danish-language, no maintenance budget.",
    images: [
      "/assets/racha/racha-landing.webp",
      "/assets/racha/racha-services.webp",
      "/assets/racha/racha-about.webp",
      "/assets/racha/racha-contact.webp",
    ],
    // The live site: the hero, then Behandlinger and its prices, 2026-10-31.
    clip: "/assets/racha/clip.mp4",
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
      code: "",
    },
  },
  // The last three entries — Lumina, Saep and Første Lys — are the only ones with
  // no client behind them, and each says so in its own first sentence. Everything
  // else on this page answers "would you ship for me"; these three answer "can you
  // do motion work", which nothing else in the list shows.
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
    scope: "Frontend only. Four static HTML pages with CSS and JavaScript, no backend, and a concept with no client.",
    role: "Self-initiated concept",
    year: "2026",
    making: [
      {
        label: "Brief",
        text: "I wanted to know what it takes to build an award-level website, so I gave myself a brief with no client.",
      },
      {
        label: "First version, August 2026",
        text: "A day spa told in ten scroll-driven sections: oils, hands, stones, water and rituals. Everything moved, so nothing stood out.",
        image: "/assets/lumina/making/first-version.webp",
        alt: "Lumina's first version: 'Step into pure stillness' in a large serif, centred on a dark green background, with a 'Begin the journey' prompt below.",
      },
      {
        label: "Redesign, October 2026",
        text: "Rebuilt as a bathhouse on the harbour, around one moment instead of ten. You scroll from 9 °C harbour water into an 85 °C sauna, and steam hides the change.",
        image: "/assets/lumina/making/steam.webp",
        alt: "Halfway through the scroll on the new Lumina: steam over a wooden sauna, with 32 °C in large type as the temperature climbs.",
      },
    ],
    design: {
      palette: [
        { name: "Fog", hex: "#E4E6E3" },
        { name: "Birch", hex: "#EEE8DD" },
        { name: "Slate", hex: "#1D2327" },
        { name: "Ember", hex: "#3A1A10" },
        { name: "Ember glow", hex: "#F0B48A" },
      ],
      type: [
        { role: "Headings", family: "Newsreader" },
        { role: "Text", family: "Hanken Grotesk" },
      ],
      source: "the page's CSS custom properties",
    },
    title: "Lumina",
    sub: "A concept site for an invented bathhouse on Copenhagen's harbour, with no client behind it. Four pages, one scroll moment from cold water to a hot sauna, and no build step.",
    images: [
      "/assets/lumina/lumina-hero.webp",
      "/assets/lumina/lumina-cold.webp",
      "/assets/lumina/lumina-heat.webp",
      "/assets/lumina/lumina-rooms.webp",
      "/assets/lumina/lumina-booking.webp",
    ],
    // The live site: hero → 9 to 85 °C → booking a session, 2026-10-31.
    clip: "/assets/lumina/clip.mp4",
    overview:
      "A website for a bathhouse that does not exist. No client. The first version was a ten-section day spa page where everything moved, so nothing stood out. This version is a bathhouse on Copenhagen's harbour, built around one moment. The screen holds still while you scroll, the 9 °C harbour water disappears into steam, the number climbs, and an 85 °C sauna comes through. Around that moment sit four calm pages: the ritual, rooms and prices, the place, and a booking form that works but sends nothing.",
    challenge:
      "The first try at the moment looked cheap. A plain crossfade between the cold photo and the warm one gave a muddy double exposure halfway through, both pictures at half strength. The fix was to stop fading one picture into the other. Steam now rises first and fills the frame, the water goes behind it, and the sauna only fades in once the steam is thick. The same moment also has to work for someone whose device asks for less motion, so without motion it becomes a plain section with the warm photo and both lines of text.",
    stackWhy:
      "GSAP with ScrollTrigger runs the one scrubbed timeline, because the moment is a fixed sequence of eased steps (steam, swap, number, text) that CSS scroll-driven animations cannot yet sequence reliably across browsers. Lenis smooths the scroll and hands ScrollTrigger the same position. Both load from a CDN. Fonts and photos are self-hosted, and the photos come as AVIF and WebP at three widths, made once by a small script and committed, so there is still no build step. The hero's entrance is plain CSS, so it never waits on the CDN.",
    engineering:
      "Screenshots caught three bugs that reading the code did not. The text in the scroll moment wrapped one word per line, because its max-width was 16ch on the wrapper, and ch is measured in the wrapper's small body font rather than the heading's large one; moving the limit onto the heading as 11em fixed it. The steam was invisible because the dark shade over the photos was an ::after pseudo-element, which paints after its siblings at the same z-index and so sat on top of the steam. And the masks that make headings rise into view clipped the tops of tall letters, like the T in Three, until each line got room above as well as below.",
    metrics: [
      { v: "11.1 KB", k: "Authored code, gzipped" },
      { v: "Zero", k: "Build steps" },
      { v: "9 → 85 °C", k: "One scroll moment" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger", "Lenis"],
    links: {
      demo: "https://lumina-spa-sample.netlify.app",
      code: "https://github.com/Taninwat-55/lumina-spa",
    },
    showroom: {
      business: "A harbour bathhouse",
      style: "Scroll storytelling",
      rung: 1,
      addOns: [],
      gets: [
        "Four pages: the visit as one story on the front page, then rooms and prices, the place, and booking",
        "One scroll moment, from cold water to a hot sauna, that turns into a calm page when a phone asks for less motion",
        "Everything in every build: search setup, your Google Business profile, analytics, and an enquiry form, here shaped as a booking request",
      ],
    },
  },
  {
    id: "saep",
    concept: true,
    n: "09",
    tag: "Motion & Craft",
    scope: "Frontend only. Four static HTML pages with CSS and JavaScript, no backend, and a concept with no client.",
    role: "Self-initiated concept",
    year: "2026",
    making: [
      {
        label: "Brief",
        text: "I wanted to know what it takes to build an award-level website, so I gave myself a brief with no client.",
      },
      {
        label: "First version, August 2026",
        text: "A night kitchen told in five pinned chapters, one per Thai taste, with every ingredient drawn on canvas and no animation library. It proved a point about engineering, but it opened behind a loader, and nobody choosing a restaurant cares how a chilli was drawn.",
        image: "/assets/saep/making/first-version.webp",
        alt: "Saep's first version: the word SAEP in a large serif with the E in chilli red, over a dark background with a faint Thai script behind it.",
      },
      {
        label: "Redesign, October 2026",
        text: "Rebuilt as a six-seat Thai chef's table on light paper, around one moment instead of five chapters. A som tam comes together as you scroll: the five tastes land one by one while the photo moves from chilli to the mortar, and then the finished plate fills the screen.",
        image: "/assets/saep/making/mortar.webp",
        alt: "Halfway through the scroll on the new Saep: four Thai tastes underlined in chilli red, beside a photo of a hand working a stone mortar.",
      },
    ],
    design: {
      palette: [
        { name: "Rice paper", hex: "#F3EDE2" },
        { name: "Paper deep", hex: "#E8DFCF" },
        { name: "Char", hex: "#1B1612" },
        { name: "Chilli", hex: "#C7361B" },
        { name: "Ember", hex: "#FF9A76" },
      ],
      type: [
        { role: "Headings", family: "Fraunces" },
        { role: "Text", family: "Instrument Sans" },
        { role: "Thai", family: "Charm" },
      ],
      source: "the page's CSS custom properties",
    },
    title: "Saep",
    sub: "A concept site for an invented Thai chef's table in Nørrebro, with no client behind it. Four pages, one scroll moment where a som tam comes together, and no build step.",
    images: [
      "/assets/saep/saep-hero.webp",
      "/assets/saep/saep-balance.webp",
      "/assets/saep/saep-plate.webp",
      "/assets/saep/saep-menu.webp",
      "/assets/saep/saep-booking.webp",
    ],
    // The live site: hero → five tastes to the plate → booking two seats, 2026-10-31.
    clip: "/assets/saep/clip.mp4",
    overview:
      "A site for an invented six-seat Thai chef's table on Jægersborggade in Nørrebro. It reads like a food magazine spread, with light paper, big serif type and photographs of the food. The homepage builds to one moment called Balance. Thai cooking balances five tastes, so a sticky stage shows a som tam being made one taste at a time until the finished plate fills the screen. After that come the menu, the visit details and a booking form that works.",
    challenge:
      "The first Saep was built to make a point about engineering, with five pinned chapters, canvas drawings and no animation library. It made the point and missed the reader. It opened behind a loader, and someone choosing a restaurant wants to see the food, know the price and book a seat. The challenge was to keep the one good idea, the five tastes, and give the rest of the page back to the restaurant.",
    stackWhy:
      "Plain HTML, CSS and JavaScript, with GSAP and ScrollTrigger for the one scrubbed timeline and Lenis for smooth scrolling. The first version avoided libraries on principle. This time the weight that mattered was photos and fonts rather than code, so the photos are AVIF and WebP at three sizes, the fonts are self-hosted, and each page's own code is 12 to 14 KB gzipped.",
    engineering:
      "Balance is one GSAP timeline scrubbed by scroll, with every step placed as a fraction of the track, so the five tastes, the photo wipes and the plate all run on one clock. The plate starts exactly on top of the photo frame and then grows to fill the stage. Its starting box is measured from the frame and measured again when the window changes, so it lines up at any size. Two bugs only showed up in screenshots. The growing plate pushed the page sideways, because an absolutely positioned grid item measures from its grid area rather than the whole grid. And on phones the last photo never loaded, because lazy loading skipped an image stacked under four others. With reduced motion nothing pins, and Balance reads as a plain recipe with the finished plate. The booking form knows which nights are open, how many seats are left and what the evening costs, and says plainly that it sends nothing.",
    metrics: [
      { v: "4", k: "Pages" },
      { v: "1", k: "Scroll moment" },
      { v: "14 KB", k: "Code per page, gzipped" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger", "Lenis"],
    links: {
      demo: "https://saep-fire-kitchen.netlify.app",
      code: "https://github.com/Taninwat-55/saep-fire-kitchen",
    },
    showroom: {
      business: "A Thai chef's table",
      style: "Editorial, photo-led",
      rung: 1,
      addOns: [],
      gets: [
        "Four pages: the evening as one story on the front page, then the menu, the visit details and booking",
        "One scroll moment, a dish coming together taste by taste, that turns into a calm page when a phone asks for less motion",
        "Everything in every build: search setup, your Google Business profile, analytics, and an enquiry form, here shaped as a booking request",
      ],
    },
  },
  {
    id: "forste-lys",
    concept: true,
    n: "10",
    tag: "Motion & Craft",
    scope: "Frontend only. One static HTML page with CSS and JavaScript, no backend, and a concept with no client.",
    role: "Self-initiated concept",
    year: "2026",
    making: [
      {
        label: "Brief",
        text: "I wanted a café site that no other café could copy, so I gave myself a brief with no client. The café opens at 05:30, closes at 13:00, and its menu follows the clock.",
      },
      {
        label: "Prototype, October 2026",
        text: "I built the hero and the scroll moment first and judged them in the browser before anything else. The screenshot caught a bug. The text font put a gap before every full stop and comma.",
        image: "/assets/forste-lys/making/prototype.webp",
        alt: "The first prototype of the scroll moment: 05:30 in a large serif on dark blue beside a photo of hands around a paper cup, with gaps before the full stops in the text.",
      },
      {
        label: "Build, October 2026",
        text: "Then the rest of the page: the menu grouped by the hour, the regulars as an arrival log, and a form to save a bun for tomorrow that knows which mornings are already full.",
        image: "/assets/forste-lys/making/saved.webp",
        alt: "The Save a bun form after a save, reading 'Saved, Ice.' in a serif, next to a close-up of a sugared cardamom bun.",
      },
    ],
    design: {
      palette: [
        { name: "Night", hex: "#151B26" },
        { name: "Ember", hex: "#4A2F1F" },
        { name: "Gold", hex: "#E8B453" },
        { name: "Cream", hex: "#F6F0E3" },
        { name: "Flat", hex: "#DCD7CD" },
      ],
      type: [
        { role: "Headings", family: "Bodoni Moda" },
        { role: "Text", family: "Schibsted Grotesk" },
      ],
      source: "the page's CSS custom properties",
    },
    title: "Første Lys",
    sub: "A concept site for an invented café on the quay in Nordhavn, with no client behind it. One page, one scroll moment where the scroll is the clock from 05:30 to 13:00, and no build step.",
    images: [
      "/assets/forste-lys/forste-lys-hero.webp",
      "/assets/forste-lys/forste-lys-day.webp",
      "/assets/forste-lys/forste-lys-close.webp",
      "/assets/forste-lys/forste-lys-menu.webp",
      "/assets/forste-lys/forste-lys-save.webp",
    ],
    // The live site: 05:30 → the whole day to 13:00 → saving two buns, 2026-10-31.
    clip: "/assets/forste-lys/clip.mp4",
    overview:
      "A website for a café that does not exist. No client. Første Lys is Danish for \"first light\". It sits on the quay in Nordhavn and opens at 05:30 for the people who are up before the city: nurses off the night shift, crane drivers, rowers and new parents. The page builds to one moment called The Day, where the scroll is the clock. It ticks from 05:30 to 13:00 while the room changes colour from night blue to gold to flat midday grey, sunlight crosses the window, and the counter board strikes dishes off as they sell out. After that come the menu by the hour, the regulars, a form to save a bun for tomorrow, and the visit details.",
    challenge:
      "A café is one of the most common briefs there is, and most café sites look alike, with a latte photo, a menu and the opening hours. The challenge was to find the one thing this café could say that no other could. Here it is time. The menu changes by the hour and the buns run out, so the page lets the visitor scroll through one morning. The same morning has to work with no motion at all, so with reduced motion each hour becomes a still block in its own light.",
    stackWhy:
      "Plain HTML, CSS and JavaScript, with GSAP and ScrollTrigger for the one scrubbed timeline. One page needs no framework, and the page's own code is 12.4 KB gzipped, so it arrives in the first round trip. The weight is in photos and fonts. The photos are AVIF and WebP at three widths, the two fonts are self-hosted, and the hero's entrance is plain CSS, so it never waits on the CDN.",
    engineering:
      "The Day is one GSAP timeline with every hour placed as a fraction of the track. The clock reads the smoothed timeline rather than the raw scroll position, so the digits land with the photos instead of ahead of them, and it only rewrites a digit when the digit changes. The counter board checks each dish's start and sold-out time against the same clock. Screenshots caught two bugs. Tabular figures, switched on for the whole page to keep the clock steady, also made the text font's full stops and commas tabular, so every sentence had a gap before its punctuation. And the closing photo turned muddy, because GSAP cannot tween a filter that starts from none. The Save a bun form knows the café is closed on Mondays, that Saturday's tray is always fully saved, and how many buns are left on other mornings, and it says plainly that it sends nothing.",
    metrics: [
      { v: "1", k: "Page" },
      { v: "05:30 → 13:00", k: "One scroll moment" },
      { v: "12.4 KB", k: "Authored code, gzipped" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger"],
    links: {
      demo: "https://forste-lys.netlify.app",
      code: "https://github.com/Taninwat-55/forste-lys",
    },
    showroom: {
      business: "An early-morning café",
      style: "Photo-led, one scroll story",
      rung: 1,
      addOns: [],
      gets: [
        "One page: the morning as one story, then the menu, the regulars, a pre-order form and the visit details",
        "One scroll moment, the café's day from opening to closing, that turns into a calm page when a phone asks for less motion",
        "Everything in every build: search setup, your Google Business profile, analytics, and an enquiry form, here shaped as a pre-order",
      ],
    },
  },
];

/**
 * The work in the order the homepage's hall shows it, and the order case
 * pages hand on to the next one. Saep joined on 2026-10-26 with its current
 * screens (Ice), Første Lys on 2026-10-28; Millennial has no screens to show,
 * so it stays a case page only.
 */
// Strongest first (Ice, 2026-10-31): open on the most striking piece, then
// alternate client-style sites and product work. Bevisly last while on hiatus.
export const leadCaseIds = ["lumina", "trailr", "saep", "mockmate", "forste-lys", "racha", "bevisly"];

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
export type AddOnId = "self-edit" | "second-language" | "booking" | "payments" | "extra-page";

/*
 * Cut from nine to five on 2026-10-31 (Ice), when the three tiers arrived.
 * Motion, art direction and the scroll story are no longer extras: they are
 * what "Stand out" is. The managed list folded into self-edit, because one
 * editor covers both. Self-edit dropped 3.000 → 2.000 and is included in
 * Stand out; extra page 1.800 → 600 so it fits a 3.000 – 5.000 site.
 */
const WEBSITE_ADD_ONS: { id: AddOnId; name: string; price: string; body: string; note?: string }[] = [
  {
    id: "self-edit",
    name: "Edit the important parts yourself",
    price: "2.000 DKK",
    body: "A simple editor for the parts that change. The big photo at the top, your headline and button text, opening hours, prices, a menu or treatment list, and a banner for an offer. Setup, your own login, and a short recording showing you how. Already included in Stand out.",
    note: "A one-off. The editor runs on a free plan, so there is nothing to pay for it each year. A new layout or a seasonal theme is still a job for me.",
  },
  {
    id: "second-language",
    name: "A second language",
    // Still the one span: the work tracks page count, because every page has
    // to exist twice. 1.000 up to five pages (which is what the 4.000 → 5.000
    // step in Get found already charges), 2.000 above that. Ice translates with
    // AI and the client approves the words (Ice, 2026-10-31).
    price: "1.000 – 2.000 DKK",
    body: "The whole site in a second language, with its own web addresses and page titles for search, plus a switcher. Danish, English, Swedish or Thai. 1.000 for up to five pages, 2.000 above that, because every page exists twice.",
    note: "The translation is included, and you approve every word before it goes live. A certified translation is a separate bill from a translation bureau.",
  },
  {
    id: "booking",
    name: "Online booking",
    price: "3.500 DKK",
    body: "A booking tool wired properly into the site and its design, with confirmation emails that work, rather than a grey box dropped onto a page.",
    note: "The booking tool's own subscription is paid by you, directly, like the domain and the hosting.",
  },
  {
    id: "payments",
    name: "Take payment online",
    price: "5.000 DKK",
    body: "Card, MobilePay, Apple Pay and Google Pay through Stripe, set up in your name and tested with real payments before it goes live. Suited to a handful of services or products. A full webshop is a bigger job than this.",
    note: "Stripe's own fee comes out of each payment, currently about 1,4% plus 1,80 kr on a European card. It never passes through me.",
  },
  {
    id: "extra-page",
    name: "An extra page",
    price: "600 DKK",
    body: "Per page, beyond what your package covers. Same standard as the rest.",
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
 * The after-launch figures, as figures. Decided 2026-10-31 (Ice): no block of
 * hours and no subscription. Two free small changes in the first three months,
 * bugs that are Ice's fault fixed free forever, then these.
 */
export const aftercareRates = {
  currency: "DKK",
  /** One small change: text, a photo, a price. */
  small: "300",
  /** Anything bigger, quoted before it starts. */
  hourly: "450",
} as const;


export const services = {
  intro: {
    eyebrow: "Freelance & Client Work",
    title: "Services",
    lead: "Ice's Stack is my one-person web studio. I build websites for local businesses, and you deal with me from the first call to launch.",
    body: "Fixed price, agreed in writing before anything starts. Custom-built in code, fast on a phone, and yours when it is done. If I am not the right person for what you need, I will say so on the first call.",
    chips: [
      "Copenhagen · remote across the EU",
      "Dansk · English · Svenska",
      "Fixed price",
      "No monthly fees",
    ],
  },

  // Ice, 2026-10-31: the case for hiring one person who builds in custom code rather
  // than an agency or a builder. Four short claims, each true today.
  whyMe: [
    {
      title: "Built for you, not from a template",
      body: "Every site is coded for your business, so it opens fast and looks like you, not like the shop next door.",
    },
    {
      title: "Yours, all of it",
      body: "Domain, hosting and code end up in your name. Nothing depends on me, and another developer can take over any day.",
    },
    {
      title: "No monthly fees",
      body: "No subscription to me and no platform plan. After launch you only pay for changes you ask for.",
    },
    {
      title: "One person, start to finish",
      body: "You talk to the person who builds it. No project manager in between, and a straight answer on the first call.",
    },
  ],

  // Qualification before price. The niche since 2026-10-31 (Ice): local
  // businesses with a weak website, or none.
  audience: {
    fit: [
      "You run a local business with no website, or one that does not do the business justice.",
      "Your site works but is slow, dated, hard to use on a phone, or invisible on Google.",
      "You want one person who is accountable, not an agency with a project manager in between.",
      "You want to own the result outright when it is finished.",
      // The niche, stated in English since /th was dropped (2026-10-25).
      "You run a Thai-owned business in Denmark or Sweden and would rather run the whole project in Thai.",
      "You have a product and need a frontend built on an API that already exists.",
    ],
    notFit: [
      "You need a full ordering and delivery system. The restaurant platforms do that well, and I can build your site around the one you use.",
      "You need a native iOS or Android app.",
      "You need a large backend or data platform built from nothing.",
      "You need someone on call around the clock after launch.",
    ],
  },

  offers: [
    {
      id: "website",
      n: "01",
      name: "Websites for local businesses",
      tagline: "For a business with no website, or one that does not do it justice.",
      forWho: "Cafés, restaurants, salons, clinics, trades and shops in Denmark and Sweden.",
      includes: [
        "Pages built around what your customers actually come looking for",
        "Made for phones first, and fast on mobile data",
        "Set up to be found on Google and by AI assistants like ChatGPT",
        "An enquiry form that reaches your inbox, with a backup so no message is lost",
        "Domain, hosting and code in your name, not mine",
        "One round of changes at each check-in, and a walkthrough at handover",
      ],
      includedInEvery: {
        label: "In every site, at every price",
        body: "None of this is an upsell.",
        items: [
          "Search set up page by page, with titles, descriptions, a sitemap and your Google Business profile connected, so you turn up for your town and your service, not only your name",
          // AEO/GEO, written for the owner: the outcome first, the technique in passing.
          "Ready for AI assistants, with your common questions answered in plain words, a label (schema.org) that says exactly what kind of business you are, and a short summary file for AI tools",
          "Your name, address and phone number matching on Google, Apple Maps, Krak and De Gule Sider",
          "One clear next step on every page, like call, book or find us, where people see it first",
          "Accessibility basics, with keyboard navigation, readable contrast and labelled forms",
          "Analytics, so you can see how many people found you and what they clicked",
        ],
      },
      /*
       * Three tiers, decided 2026-10-31 (Ice). Named for what the client gets.
       * The fourth row is the computed add-on band. conceptPrice() reads rung
       * 0 or 1 for a Showroom placard and row 3 for the add-on timeline.
       */
      priceLadder: [
        {
          scope: "Get found",
          detail: "For a business where customers need the facts fast. 3.000 for up to three pages with your own text and photos. 4.000 for up to five pages, or if I write the text with you. 5.000 for five pages, a second language and help with the text. Racha Beauty, my first client, is this tier.",
          price: "3.000 – 5.000 DKK",
          timeline: "1–2 weeks",
        },
        {
          scope: "Stand out",
          detail: "For a business where the look itself sells, like a restaurant, a café or a spa. Its own visual identity, motion, and one moment on the page people remember, plus an editor for the important parts. Lumina, Saep and Første Lys in the Showroom are this tier.",
          price: "9.000 – 15.000 DKK",
          timeline: "2–4 weeks",
        },
        {
          scope: "Run your business on it",
          detail: "A site with a database behind it, such as logins, orders you manage or an admin page. Scoped to your budget, so we decide together what goes in first and what can wait. Online booking or a menu you edit yourself does not need this. Those are add-ons. Security updates are included for the first 12 months.",
          price: "From 15.000 DKK",
          timeline: "3–8 weeks",
        },
        {
          scope: "Add-ons",
          detail: "Priced one by one below.",
          price: addOnBand(WEBSITE_ADD_ONS),
          timeline: "+ 1–3 days each",
        },
      ],
      buildMethodNote: "Every site is custom-built in code, with no page builder and no monthly fee underneath it.",
      addOns: {
        label: "Add-ons",
        body: "One price each. Take one, none, or add one later.",
        items: WEBSITE_ADD_ONS,
        includedLabel: "Not add-ons",
        included: "A map with directions, a gallery, a contact form and a cookie and privacy page are in every build already. They take minutes, and charging for them would make the list above less believable rather than more profitable.",
        // Honest capability framing: no client build behind these two yet.
        ownWork: "Two of these, taking payment and anything with logins, I have built on my own products rather than for a client. Bevisly runs multi-role accounts with row-level security, and MockMate runs a graded AI pipeline; both are written up under Projects, and you can go and use them. I would rather say that plainly than imply a client history I do not have.",
      },
      priceRange: "From 3.000 DKK",
      priceNote: `${vat.note} Half when we start, half at launch. The domain and any hosting are billed to you directly rather than through me.`,
      timeline: "1 – 4 weeks",
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
      // Was "Redesign & Performance Rescue", 8.000 – 16.000 with a 3.500 audit,
      // which cost more than a new Get found site. Replaced 2026-10-31 (Ice):
      // one rate for fixes, a new site for a new look, and the look is free.
      id: "rescue",
      n: "03",
      name: "Already have a site?",
      tagline: "Fixed if it is broken, rebuilt if it is dated. I tell you which on the first call.",
      forWho: "Businesses with a site that is slow, broken or out of date, on any platform.",
      includes: [
        "A free look at your site on the first call, and a straight answer on whether to fix it or replace it",
        "Something broken, like a form that stopped sending, an error or a slow page, fixed on the site you have",
        "An estimate before I start, so the bill is never a surprise",
        "A dated site replaced at Get found or Stand out prices, often reusing your text and photos",
      ],
      priceRange: `${aftercareRates.hourly} DKK / hour`,
      priceNote: "For fixes. A new look is a new site, priced by the tiers above.",
      timeline: "Usually days, not weeks",
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
      "Every figure here is paid to your host or your domain registrar, directly and in your name. None of it comes to me, and I do not mark up other people's invoices. After handover I do not invoice you again unless you ask me for more work.",
    rows: [
      {
        label: "Platform fee",
        value: "0 kr",
        why: "A site built in code has no platform underneath it, so there is nothing to subscribe to. Builders like Wix, Squarespace and Webflow charge a site plan every year; this does not.",
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
        why: "An editor for your own text, prices and images is included in Stand out and an add-on for Get found. After setup it costs nothing a year. Rearranging the layout is still a call to me.",
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
   * DECIDED 2026-10-31 (Ice): no subscription of any kind and no prepaid block.
   * Ice: "We're all tired of subscriptions." A static site has no plugins to
   * patch, so there is no care plan to sell either. The Local visibility
   * monthly plan was removed the same day for the same reason. If anything
   * here ever renews, `runningCosts.paidTo` and the FAQ become false.
   */
  aftercare: {
    eyebrow: "After Launch",
    title: "If you want changes later",
    lead: "No subscription and no maintenance plan. Your site has no plugins to patch, so there is nothing to sell you every month. What you might want later is changes, and this is what they cost.",
    free: {
      label: "Free",
      body: "Two small changes in the first three months, like a new price, an opening hour or a photo. And a bug in my code is fixed for free, always.",
    },
    small: {
      label: "A small change",
      price: `${aftercareRates.small} ${aftercareRates.currency}`,
      body: "After that, a text, photo or price change is one fixed price. No hourly maths.",
    },
    hourly: {
      label: "Bigger work",
      price: `${aftercareRates.hourly} ${aftercareRates.currency} / hour`,
      body: "A new page, a seasonal theme, a campaign with its own design. I quote it before I start, not after.",
    },
    /**
     * Security, decided 2026-10-31 (Ice). Tiers 1 and 2 are static by
     * promise, so there is nothing to patch. Tier 3 runs server code, and a
     * hole in an outside library (React2Shell, December 2025) is not a bug in
     * Ice's code, so "free forever" must not cover it.
     */
    security: "Get found and Stand out sites are static files with no server behind them, so there is nothing to patch and no security update to pay for. A site with a database is different. Security updates are included for the first 12 months, and after that I apply one when it is needed, at the hourly rate, with nothing on a subscription.",
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
    body: "You get a live preview link you can open on your phone. We check in three times: when the look of the homepage is ready, when the whole site is ready, and before launch. One round of changes at each check-in is in the price.",
    youGet: "A preview link and three check-ins.",
    duration: "1–8 weeks",
  },
  {
    n: "04",
    title: "Handover",
    body: "We set up the domain and hosting in your name together, on a call, so I never need your passwords. The code is handed over to you, and you get a short recording of how to change what you can change.",
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
    a: `Published, not quoted on request. Get found, a clear site of up to five pages, is ${services.offers[0].priceLadder![0].price}. Stand out, with its own design, motion and an editor, is ${services.offers[0].priceLadder![1].price}. A site with logins or a database behind it starts at ${services.offers[0].priceLadder![2].price.replace("From ", "")}, scoped to your budget. Every site is coded by hand, so there is no platform fee afterwards, only a domain and possibly hosting. The exact number is fixed in writing before any work starts, and you pay half when we start and half at launch. ${vat.note}`,
  },
  // Second, beside the price questions (Ice, 2026-10-05). It replaced the
  // "Yours, not mine" section on /services, whose ownership half the FAQ already
  // covered ("Who owns the code?"). This half stays because it prevents the most
  // common scope blow-up in small web projects: a client assuming their
  // developer will write their copy and take their photos. Saying it before the
  // first call costs one answer and saves an argument in week two.
  {
    q: "What is not included in the price?",
    a: "Said plainly so it is never a surprise halfway through. Photography, though phone photos in good light are often fine, and a photographer is paid directly. A logo, because I design around the brand you already have. A professional translation, if you want one. Paid advertising. Legal wording. I put the privacy page and cookie notice in place, but the wording should be checked by someone qualified. Writing the text is not on this list. Tell me about the business on a short call, and from the 4.000 version of Get found I write it with you and you approve every word.",
  },
  {
    q: "Why does Stand out cost more than Get found?",
    a: "Because it is more work, not a fancier label. Get found uses clear layouts I already know work, so the time goes into your content and your search setup. Stand out gets a visual identity of its own, motion, one moment designed for your business, and an editor for the important parts. Search setup, speed and accessibility are the same in both.",
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
    a: "Yes, when something is broken: error messages on the page, a slow or insecure site, a form that stopped sending. I fix those on the site you already have, at the hourly rate with an estimate first. What I do not do is redesign a builder site or keep patching it month after month. A WordPress site breaks when its plugins and its PHP version drift apart, so ongoing patching only buys time until the next update does the same. Wix and Squarespace lock the parts that make a site fast and findable inside the platform. So when you want a new look, I rebuild in code: priced like any new site, often reusing your text and photos, with no plugins to update and no platform fee afterwards. I look at it with you on the first call, for free, and tell you honestly which of the two you need.",
  },
  // AEO in the FAQ itself: the question an owner actually types into ChatGPT.
  {
    q: "Will my business show up when people ask ChatGPT or Google's AI?",
    a: "More and more people ask an AI assistant where to eat or who to call, and those tools answer from what they can read about you: your website, your Google profile, your reviews and the big directories. Every site I build is set up for that, with your common questions answered in plain words they can quote, a label that tells them exactly what kind of business you are, a short summary file written for AI tools, and your name, address and phone number matching everywhere. Nobody can promise a place in an AI answer, and anyone who does is guessing. What I can do is make sure the facts they find are right and easy to repeat.",
  },
  // Deliberately a FAQ rather than a line on the offer card. To the buyer this
  // page is written for, "React · Next.js · TypeScript" is noise, and jargon in
  // the money section reads as "this will be complicated and I will not
  // understand it". Collapsed, it costs the non-technical reader nothing and is
  // there instantly for anyone checking whether they would be locked in.
  {
    q: "What do you build it with, and could another developer take it over?",
    a: "Get found and Stand out sites are static, which means plain files on a fast host like Netlify, Cloudflare or Vercel, with no server and no database to keep patched. They are written in HTML, CSS and JavaScript, sometimes with React or Next.js turned into plain files at build time. A site in the third tier uses React, Next.js and TypeScript with a database behind it. Forms go through a service like Resend so messages reach you without a server of your own. The part that actually matters is that these are mainstream tools, not anything invented here. Any React developer can open the repository and continue, which is deliberate: you should be able to replace me without replacing your website. Racha Beauty's site is React and Tailwind, and the full stack for every project I have built is listed on its case study page.",
  },
  {
    q: "Is there a monthly fee for the website?",
    a: "No. Not to me, and not to a platform. A coded site has no site plan underneath it. Its hosting fits inside the free tier at Netlify or Vercel for a site this size, though a company's free tier is not a guarantee. If it changes, or you would rather sit on a Danish webhotel, that is 500 to 1.500 kroner a year. The domain is about 100 kroner, in your name. You pay those directly, and I do not mark up other people's invoices. I sell nothing that renews.",
  },
  {
    q: "Can I update the website myself afterwards?",
    a: `Yes, the important parts. An editor for your headline, the big photo, button text, opening hours, prices, a menu or treatment list and an offer banner is included in Stand out, and an add-on for Get found (${WEBSITE_ADD_ONS[0].price}). It runs on a free plan, so it costs nothing a year. Changing the layout or the theme is a job for me, at a price agreed first.`,
  },
  {
    q: "Do you only work with clients in Copenhagen?",
    a: "No. I am based in Copenhagen and happy to meet in person anywhere in the greater Copenhagen area, but most of the work happens remotely and I take clients across Denmark, Sweden, and the rest of the EU. Racha Beauty is in Næstved and that project ran almost entirely remotely. If we never meet in person, nothing about the result changes.",
  },
  {
    q: "Do you maintain the site afterwards?",
    a: `The site itself does not need maintaining, and that is deliberate. It has no plugins to patch, so I do not sell a care plan, and Racha Beauty's site has run since launch without anyone touching it. You get two small changes free in the first three months, and a bug in my code is fixed free, always. After that a small change is ${services.aftercare.small.price} and bigger work is ${services.aftercare.hourly.price}, quoted before I start. A site with a database gets security updates free for its first 12 months, then at the hourly rate when one is needed. Nothing renews.`,
  },
  {
    q: "Which languages can you work in?",
    a: "I build in Danish, English and Swedish. Racha Beauty's site is entirely Danish, down to the page addresses. My own spoken Danish is still improving, so we can run the project itself in English or Swedish and still ship a fully Danish site. The language of the meetings and the language of the website are two different things.",
  },
  {
    q: "How long does it actually take?",
    a: "A small-business site is usually two to three weeks, a fix usually a few days, an app frontend three to eight weeks. Those are real numbers, not best cases. The most common delay is not the build. It is waiting on text and photos from you, which is why the scope says exactly what I need from you and when.",
  },
  {
    q: "Who owns the code?",
    a: "You do, completely. The domain and hosting are set up in your name from the start, and the code is handed over to you at launch. If you want another developer to take over next year, there is nothing to untangle and nothing you need to ask me for.",
  },
];

// The select values are an API contract: app/lib/services-enquiry.ts turns them
// into the server-side allowlist, so the rendered <option> values and what the
// endpoint accepts cannot drift apart. Labels are safe to reword. Values are not.
export const servicesEnquiryOptions = {
  projectType: [
    { value: "small-business-site", label: "A website for my business" },
    { value: "web-app-frontend", label: "A web app frontend build" },
    { value: "redesign-rescue", label: "Fix or replace my current site" },
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
  lead: "Sample sites for made-up businesses, each showing what you would get and what a site like it costs. The price follows how much design and building a site needs, not which style it has, so two sites that look nothing alike can cost the same. Open one to see what is included.",
  concept: "Concept, no client",
  more: "I add a new sample site every week or two.",
  prices: "All prices and add-ons",
};

// ─── CASE PAGES ───────────────────────────────────────────────────────────────
// The case page's own labels (moved out of stackContent on 2026-10-25).
/**
 * What no quote includes, said beside every concept price (Ice, 2026-10-27).
 * The samples run on stock photos, which is fine for a concept and wrong for a
 * real business, so the line says so before a client assumes otherwise.
 */
export const quoteExcludes =
  "Writing your text and photographing your business are not in the price. The samples use stock photos, and a real business needs its own: a restaurant its own food, a bathhouse its own rooms. If you need a copywriter or a photographer, you pay them directly.";

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
    line: "A site like this costs",
    see: "See what's included",
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
  discount: 0.3,
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
      ? `${rung.timeline}, ${services.offers[0].priceLadder![3].timeline.replace("+ ", "plus ")}`
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

A small-business website is priced by scope alone, and every client site is custom-built in code. Ice does not build client sites in Webflow, Wix, WordPress or any other builder, and does not redesign existing builder sites: a new look means a rebuild in code. He does fix what is broken on any existing site, builder or not (visible errors, speed, security, a form that stopped sending), at the hourly rate. A dated site gets a free look on the first call and a new build at tier prices. Never offer to build a new site in a builder. You may quote these figures, they are published on the services page:
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

What the site costs to keep: there is no platform fee. Hosting fits a free tier or costs 500 – 1.500 kr a year on a Danish webhotel, and a .dk domain is about 100 kr a year, so five years of running cost is about ${services.runningCosts.fiveYear.value}. Self-editing is included in Stand out and a one-off add-on for Get found, free to run afterwards; nobody can rearrange the layout themselves. All of these yearly costs are paid by the client directly to their host and registrar, never to Ice, and he does not mark up other people's invoices. If someone worries about an ongoing bill from him, say that plainly.

There is NO website maintenance or care plan. Danish agencies sell website care at 250 – 3.000 kr a month, but that product is patching WordPress, and a static site has no plugins to patch. Charging for that would be charging for a problem this stack does not have.

For changes after launch: two small changes are FREE in the first three months, and a bug in Ice's code is fixed free, always. Get found and Stand out sites are static, so there is nothing to patch; a third-tier site with a database gets security updates free for 12 months, then at the hourly rate when needed. After that a small change (text, a photo, a price) is ${services.aftercare.small.price}, and bigger work is ${services.aftercare.hourly.price}, quoted before he starts. There is no prepaid block, no subscription and no monthly plan of any kind; if asked about a retainer, say he sells nothing that renews.

The three website tiers: Get found is for a business where customers need the facts fast; Stand out is for one where the look itself sells, with its own visual identity, motion and an editor for the important parts included; Run your business on it is a site with a database behind it, scoped to the client's budget. Online booking or a menu the client edits does not need the third tier; those are add-ons.

Every build includes per-page search setup and Google Business connection, setup for AI assistants (common questions answered in quotable form, schema.org for the business type, an llms.txt summary file, name/address/phone made consistent across the main directories, and a check of how AI assistants describe the business at launch), mobile-first construction, a performance budget, accessibility basics, an enquiry form with a backup delivery path, analytics, and domain and hosting in the client's name. If someone asks why it is not 3.000 kroner, that list is the answer: a template shop skips it, and it is the part that makes the site actually get found and convert. Never promise a ranking or a place in an AI answer; promise correct, consistent, quotable facts.

Note that his shipped client work to date is custom code. Webflow and Framer are in his skill list as skills, but he does not sell builder sites and has no Webflow or Framer client work; never offer either or claim case studies.

How he works: a short call, then a written scope with a fixed price and a delivery date before any work starts. Fixed price is the default, and it is how a website is sold: the client knows the number before anything begins and Ice carries the risk if it runs long. Where scope genuinely cannot be pinned down, such as ongoing frontend work on a product or an open-ended list of changes, he bills by the day at ${services.offers[1].priceRange} instead. Never say he refuses hourly or time-based work: the day rate is a published offer on the same page. He does the work himself. There is no agency and no handoff to someone else. The code, domain and hosting all end up in the client's name.

What he does not take on: native iOS/Android apps, paid advertising campaigns, redesigns or ongoing patching of builder sites (WordPress, Wix, Squarespace; those get rebuilt in code), and large backend-heavy platforms built from nothing.

VAT: ${vat.briefing}

Availability: he takes a few projects at a time, so it varies. You may state the price ranges listed above, because they are published on the services page. Never invent a figure outside them, never quote an exact price for a specific project, and never promise a delivery date: every project is scoped individually. Point people at the enquiry form on /contact, which asks for project type, budget and timeline so he can reply with something specific.

Being available for freelance work does not conflict with him being open to employment. Do not raise his job search, his CV, or his availability for hire with someone who is asking about hiring him for a project.
`.trim();
