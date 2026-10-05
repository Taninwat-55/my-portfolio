#!/usr/bin/env node
/**
 * Checks that the live site still works, the way a visitor would find out.
 * Run every 6 hours by .github/workflows/uptime.yml; exits non-zero on any
 * failure, and GitHub emails the repo owner.
 *
 *   node scripts/uptime-check.mjs                       # the live site
 *   BASE_URL=http://localhost:3123 node scripts/uptime-check.mjs
 *
 * WHY IT EXISTS. Two outages in 2026 failed quietly for the owner: the enquiry
 * form answered 503 for as long as its Upstash database was gone, and the chat
 * answered "model does not exist" after Groq retired its model. Visitors saw a
 * polite error; nobody was told. Each check below would have caught one.
 *
 * Nothing it does has a side effect: the enquiry is invalid on purpose (no
 * email is sent), and the chat question costs one small Groq call.
 */

const BASE = (process.env.BASE_URL || "https://taninwatkaewpankan.xyz").replace(/\/$/, "");
const failures = [];

async function check(name, fn) {
  try {
    const detail = await fn();
    console.log(`ok    ${name}${detail ? `: ${detail}` : ""}`);
  } catch (error) {
    failures.push(name);
    console.log(`FAIL  ${name}: ${error.message}`);
  }
}

const timed = (url, init = {}) => fetch(url, { ...init, signal: AbortSignal.timeout(60_000) });

// 1. The pages answer.
for (const path of ["/", "/work", "/services", "/cv", "/garden", "/th", "/sv", "/da"]) {
  await check(`page ${path}`, async () => {
    const res = await timed(`${BASE}${path}`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  });
}

// 2. The enquiry form is alive. elapsedMs gets it past the bot traps (which
// answer a fake 200), and the empty fields make validation refuse it: 400 is
// healthy. 503 is what the Upstash outage looked like.
await check("enquiry endpoint", async () => {
  const res = await timed(`${BASE}/api/services-enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ elapsedMs: 5000 }),
  });
  if (res.status === 429) return "rate limited, so the limiter is up (counts as healthy)";
  if (res.status !== 400) throw new Error(`expected 400 for an invalid enquiry, got ${res.status}`);
  return "400 for an invalid enquiry, as it should";
});

// 3. The chat answers with text. The stream reports errors in-band with a 200,
// so the body has to be read: "model does not exist" arrives as an error event.
await check("chat answers", async () => {
  const res = await timed(`${BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      variant: "portfolio",
      messages: [{ id: "uptime", role: "user", parts: [{ type: "text", text: "In one sentence, who is Ice?" }] }],
    }),
  });
  if (res.status === 429) return "rate limited, so the limiter is up (counts as healthy)";
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  let text = "";
  for (const line of (await res.text()).split("\n")) {
    if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
    const event = JSON.parse(line.slice(6));
    if (event.type === "error") throw new Error(event.errorText);
    if (event.type === "text-delta") text += event.delta;
  }
  if (!text.trim()) throw new Error("finished with no text");
  return `${text.trim().split(/\s+/).length} words back`;
});

if (failures.length) {
  console.log(`\n${failures.length} check(s) failed: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("\nAll checks passed.");
