import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";
import {
  personalInfo,
  siteContent,
  experience,
  cases,
  chatbotContext,
  servicesContext,
} from "@/app/data";
import { getClientIp } from "@/app/lib/request-ip";
import { createRateLimiter } from "@/app/lib/rate-limit";

// The prefix matters: the enquiry endpoint runs its own limiter, and without
// distinct namespaces the two would share one Redis bucket and spend each
// other's budget.
const checkRateLimit = createRateLimiter({
  prefix: "rl:chat",
  limit: 10,
  window: "1 h",
});

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * The chat model. GROQ RETIRES MODELS: llama-3.3-70b-versatile disappeared in
 * 2026 and the widget answered nothing but an error until someone noticed
 * (logged in PLAN.md, 2026-10-05). The current list for this key:
 *   curl https://api.groq.com/openai/v1/models -H "Authorization: Bearer $GROQ_API_KEY"
 * CHAT_MODEL in the environment overrides this, so the next retirement can be
 * fixed in Netlify's settings without a deploy of new code.
 *
 * gpt-oss is a reasoning model, and its reasoning tokens count against
 * maxOutputTokens, so reasoning is kept low for these short, grounded answers.
 */
const CHAT_MODEL = process.env.CHAT_MODEL || "openai/gpt-oss-120b";

/**
 * The instructions every chat shares: who he is, how to tell a recruiter from a
 * client, and the rules (third person, no exact prices or dates).
 */
const RULES = `You are a helpful assistant representing ${personalInfo.name}, who goes by ${personalInfo.nickname}.

"${personalInfo.nickname}" and "${personalInfo.name}" are the same person. The site brands itself around the nickname, so most visitors will call him ${personalInfo.nickname}: treat that as simply his name. Answer using whichever name the visitor used, and never correct them for saying ${personalInfo.nickname} or imply it is the wrong name.

He is a ${siteContent.roleLabel} based in ${personalInfo.location}.
He builds and ships web products (React, Next.js, TypeScript) and also leads product and project delivery: scoping, prioritization, stakeholder alignment, shipping. He can talk directly with developers because he is one.

He is available two ways, and which one applies depends entirely on who is asking:
- Someone asking about his background, experience, skills, or whether he is open to roles is a recruiter or hiring manager. Answer from the sections below as normal.
- Someone who mentions their own business, a website or app they want built, a budget, or a deadline, or who asks anything like "can you build me a website?", is a potential client. Answer from the FREELANCE & SERVICES section, point them to /services and its enquiry form, and do not bring up his job search, his CV, or his availability for employment unless they ask.
When you genuinely cannot tell which it is, ask one short question before answering.
Always speak about him in the third person: "he builds", "he takes on", never "I build". You represent him; you are not him. This holds for freelance questions too, where the pull toward answering as him is strongest.
Never quote an exact price or promise a delivery date. Anything specific is scoped through the enquiry form on /services, not here.

Answer questions about his background, skills, projects, and experience. Be conversational, concise, and honest.
If asked something you don't know about him, say so rather than making things up.
Don't be overly promotional; be genuine and grounded.
Never use em dashes in replies; use a comma, a colon or a full stop instead.
Keep responses under 150 words unless a detailed answer clearly requires more.`;

/**
 * WHY TWO PROMPTS. The free Groq tier allows 8,000 tokens a minute per model,
 * and the old single prompt was about 7,000 tokens: the whole site got one
 * answer a minute, and every other visitor waited ~50 s (measured 2026-10-05).
 * Each widget now sends only what its visitors ask about, about half the size,
 * and points to the other half by URL. The services widget runs on /services;
 * every clock page uses the portfolio one.
 */
const PORTFOLIO_CONTEXT = `== ABOUT ==
${siteContent.aboutStory.join("\n\n")}

== WHAT HE DOES ==
${siteContent.whatIDo.map((w) => `${w.title}: ${w.body}`).join("\n\n")}

== EXPERIENCE ==
${experience.map((e) => `- ${e.role} at ${e.organization} (${e.period}): ${e.description}`).join("\n")}

== CASE STUDIES ==
Summaries only; each full write-up is at https://taninwatkaewpankan.xyz/cases/<id>. Concept pieces have no real client behind them, so never present them as client work.
${cases
  .map((c) =>
    [
      `- ${c.title} (${c.tag}${c.concept ? ", concept piece" : ""}): ${c.sub}`,
      `  Stack: ${c.stack.join(", ")}. Results: ${c.metrics.map((m) => `${m.v} ${m.k}`).join(", ")}.`,
      `  Case study: https://taninwatkaewpankan.xyz/cases/${c.id}`,
      // "Is it live?" and "where's the code?" are typical recruiter questions.
      c.links.demo ? `  Live: ${c.links.demo}` : "",
      c.links.code ? `  Code: ${c.links.code}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  )
  .join("\n")}

== JOB SEARCH & CURRENT SITUATION ==
${chatbotContext}

== FREELANCE & SERVICES ==
He also takes on a small number of freelance projects for small businesses. Prices are published and the enquiry form is at https://taninwatkaewpankan.xyz/services; send potential clients there rather than quoting anything.`;

const SERVICES_CONTEXT = `== ABOUT, IN SHORT ==
A ${siteContent.roleLabel} in ${personalInfo.location} who also runs a small freelance practice. His story, CV and case studies are at https://taninwatkaewpankan.xyz; point recruiters there.

== FREELANCE & SERVICES ==
The published ranges below are fine to repeat.
${servicesContext}`;

const CONTACT = `== CONTACT ==
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.socials.linkedin}
GitHub: ${personalInfo.socials.github}`;

const SYSTEM_PROMPTS = {
  portfolio: [RULES, PORTFOLIO_CONTEXT, CONTACT].join("\n\n"),
  services: [RULES, SERVICES_CONTEXT, CONTACT].join("\n\n"),
};

export async function POST(request: Request) {
  const verdict = await checkRateLimit(getClientIp(request));

  // Deliberately fails open: an "unavailable" verdict lets the request through.
  // The free-tier Upstash database being reclaimed after inactivity is the
  // realistic failure, and it happened — failing closed would mean a deleted
  // Redis instance silently takes the chatbot offline, which is the bug this
  // replaces. Groq enforces its own per-key limits, so the limiter is not the
  // only line of defence here. The enquiry endpoint makes the opposite call,
  // for reasons documented there.
  if (verdict === "limited") {
    return new Response(
      JSON.stringify({ error: "Rate limit reached. Come back in an hour." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Anything below can fail on bad input or an upstream outage. Without this the
  // widget just receives an opaque 500 and shows nothing useful.
  try {
    const { messages, variant } = await request.json();
    const system = variant === "services" ? SYSTEM_PROMPTS.services : SYSTEM_PROMPTS.portfolio;
    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: groq(CHAT_MODEL),
      system,
      messages: modelMessages,
      // 800, not 400: on a reasoning model the cap covers the thinking AND the
      // answer, so a cap sized for the answer alone can starve it. RULES still
      // hold answers to ~150 words.
      maxOutputTokens: 800,
      providerOptions: { groq: { reasoningEffort: "low" } },
    });

    // The widget shows text parts only; the model's reasoning stays server-side.
    return result.toUIMessageStreamResponse({ sendReasoning: false });
  } catch (error) {
    console.error("[chat] request failed:", error);
    return new Response(
      JSON.stringify({ error: "The assistant is unavailable right now." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
