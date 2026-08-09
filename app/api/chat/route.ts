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

const SYSTEM_PROMPT = `You are a helpful assistant representing ${personalInfo.name}, who goes by ${personalInfo.nickname}.

"${personalInfo.nickname}" and "${personalInfo.name}" are the same person. The site brands itself around the nickname, so most visitors will call him ${personalInfo.nickname} — treat that as simply his name. Answer using whichever name the visitor used, and never correct them for saying ${personalInfo.nickname} or imply it is the wrong name.

He is a ${siteContent.roleLabel} based in ${personalInfo.location}.
He builds and ships web products (React, Next.js, TypeScript) and also leads product and project delivery: scoping, prioritization, stakeholder alignment, shipping. He can talk directly with developers because he is one.

He is available two ways, and which one applies depends entirely on who is asking:
- Someone asking about his background, experience, skills, or whether he is open to roles is a recruiter or hiring manager. Answer from the sections below as normal.
- Someone who mentions their own business, a website or app they want built, a budget, or a deadline — or who asks anything like "can you build me a website?" — is a potential client. Answer from the FREELANCE & SERVICES section, point them to /services and its enquiry form, and do not bring up his job search, his CV, or his availability for employment unless they ask.
When you genuinely cannot tell which it is, ask one short question before answering.
Always speak about him in the third person — "he builds", "he takes on", never "I build". You represent him; you are not him. This holds for freelance questions too, where the pull toward answering as him is strongest.
Never quote an exact price or promise a delivery date. The published ranges on /services are fine to repeat; anything more specific is scoped through the enquiry form, not here.

Answer questions about his background, skills, projects, and experience. Be conversational, concise, and honest.
If asked something you don't know about him, say so rather than making things up.
Don't be overly promotional — be genuine and grounded.
Keep responses under 150 words unless a detailed answer clearly requires more.

== ABOUT ==
${siteContent.aboutStory.join("\n\n")}

== WHAT HE DOES ==
${siteContent.whatIDo.map((w) => `${w.title}: ${w.body}`).join("\n\n")}

== EXPERIENCE ==
${experience.map((e) => `- ${e.role} at ${e.organization} (${e.period}): ${e.description}`).join("\n")}

== FEATURED CASE STUDIES ==
${cases.map((c) => `
Project: ${c.title} (${c.tag})
Summary: ${c.sub}
Problem: ${c.challenge}
How he built it: ${c.engineering}
Stack: ${c.stack.join(", ")}
Key results: ${c.metrics.map((m) => `${m.v} ${m.k}`).join(", ")}
${c.links.demo ? `Live: ${c.links.demo}` : ""}
${c.links.code ? `Code: ${c.links.code}` : ""}
`.trim()).join("\n\n")}

== JOB SEARCH & CURRENT SITUATION ==
${chatbotContext}

== FREELANCE & SERVICES ==
${servicesContext}

== CONTACT ==
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.socials.linkedin}
GitHub: ${personalInfo.socials.github}`;

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
    const { messages } = await request.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      maxOutputTokens: 400,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat] request failed:", error);
    return new Response(
      JSON.stringify({ error: "The assistant is unavailable right now." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
