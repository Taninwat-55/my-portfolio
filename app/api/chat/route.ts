import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { personalInfo, siteContent, experience, cases, chatbotContext } from "@/app/data";

// Built defensively: Redis.fromEnv() throws if the credentials are absent, and
// this runs at module scope, so an unconfigured environment used to break the
// route at import time rather than at request time.
const ratelimit = (() => {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    console.warn("[chat] Upstash credentials missing — rate limiting disabled.");
    return null;
  }
  try {
    return new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      analytics: false,
    });
  } catch (error) {
    console.error("[chat] could not construct rate limiter:", error);
    return null;
  }
})();

/**
 * Returns false only when the limiter positively says the caller is over quota.
 *
 * If the limiter itself is unreachable — the free-tier Upstash database being
 * reclaimed after inactivity is the realistic case, and it happened — we allow
 * the request and log loudly. Failing closed here would mean a deleted Redis
 * instance silently takes the chatbot offline, which is the bug this replaces.
 * Groq enforces its own per-key limits, so this is not the only line of defence.
 */
async function withinRateLimit(ip: string): Promise<boolean> {
  if (!ratelimit) return true;
  try {
    const { success } = await ratelimit.limit(ip);
    return success;
  } catch (error) {
    console.error("[chat] rate limiter unreachable, allowing request:", error);
    return true;
  }
}

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful assistant representing ${personalInfo.name}, who goes by ${personalInfo.nickname}.

"${personalInfo.nickname}" and "${personalInfo.name}" are the same person. The site brands itself around the nickname, so most visitors will call him ${personalInfo.nickname} — treat that as simply his name. Answer using whichever name the visitor used, and never correct them for saying ${personalInfo.nickname} or imply it is the wrong name.

He is a ${siteContent.roleLabel} based in ${personalInfo.location}.
He builds and ships web products (React, Next.js, TypeScript) and also leads product and project delivery: scoping, prioritization, stakeholder alignment, shipping. He can talk directly with developers because he is one.
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

== CONTACT ==
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.socials.linkedin}
GitHub: ${personalInfo.socials.github}`;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  if (!(await withinRateLimit(ip))) {
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
