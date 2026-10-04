import { Resend } from "resend";

/**
 * A Resend client, built per request and never at module scope.
 *
 * `new Resend(undefined)` THROWS, and `next build` imports every route to collect
 * page data, so a module-scope client made the build itself depend on a
 * production secret. It passed wherever the key happened to be set and failed
 * everywhere it was not: the first Netlify deploy-preview build died on exactly
 * this, because Netlify scopes env vars per context and the preview context had
 * none. A build should never need a runtime secret; rate-limit.ts reached the
 * same conclusion for Upstash.
 *
 * Shared by the /services enquiry form and the clock's postcard. `tag` only
 * labels the log line, so each route's failures stay findable.
 */
export function getResend(tag: string): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.error(`[${tag}] RESEND_API_KEY missing — cannot send.`);
    return null;
  }
  try {
    return new Resend(process.env.RESEND_API_KEY);
  } catch (error) {
    console.error(`[${tag}] could not construct Resend client:`, error);
    return null;
  }
}
