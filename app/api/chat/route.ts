import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { personalInfo, siteContent, experience, projects, cases, chatbotContext } from "@/app/data";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: false,
});

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful assistant representing ${personalInfo.name}, a ${siteContent.roleLabel} based in ${personalInfo.location}.
He builds and ships web products — React, Next.js, TypeScript — and also leads product and project delivery: scoping, prioritization, stakeholder alignment, shipping. He can talk directly with developers because he is one.
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

== OTHER PROJECTS ==
${projects.map((p) => `- ${p.title} (${p.category}): ${p.description} Tech: ${p.tech.join(", ")}`).join("\n")}

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

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({ error: "Rate limit reached. Come back in an hour." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = await request.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = await streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 400,
  });

  return result.toUIMessageStreamResponse();
}
