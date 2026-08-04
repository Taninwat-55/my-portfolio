import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSortedPostsData } from "../lib/posts";
import { FadeIn } from "../components/FadeIn";
import { SectionHeading } from "../components/SectionHeading";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats an ISO date string without touching Date, so the output can't shift by
 * a day depending on the runtime's timezone.
 */
function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName || !year || !day) return iso;
  return `${monthName} ${Number(day)}, ${year}`;
}

export function Garden() {
  const posts = getSortedPostsData().slice(0, 4);

  return (
    <section
      id="garden"
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <SectionHeading
        eyebrow="Writing"
        title="Garden"
        subtitle="Thoughts on product, coordination, and building"
        className="mb-16 sm:mb-20"
      />

      {/* Horizontal pills rather than a card grid: for text-first content the
          scannable row wins, and read time is a far more useful affordance than
          a truncated excerpt. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:gap-4">
        {posts.map((post, i) => (
          <FadeIn key={post.slug} delay={i * 0.1} y={20}>
            <Link
              href={`/garden/${post.slug}`}
              className="group flex items-center gap-4 rounded-[32px] border border-frost/10 bg-white/3 px-5 py-4 transition-colors duration-200 hover:border-frost/25 hover:bg-white/6 sm:gap-6 sm:rounded-full sm:px-7 sm:py-5"
            >
              <span className="shrink-0 rounded-full bg-crystal-500/10 px-3 py-1 text-[10px] uppercase tracking-wider text-crystal-500">
                {post.category}
              </span>

              <h3 className="min-w-0 flex-1 text-sm font-medium leading-snug text-frost line-clamp-2 sm:truncate sm:text-base">
                {post.title}
              </h3>

              <span className="hidden shrink-0 text-xs text-frost/40 sm:block">
                {post.readTime}
              </span>

              <span
                aria-hidden
                className="hidden h-1 w-1 shrink-0 rounded-full bg-frost/20 md:block"
              />

              <span className="hidden shrink-0 text-xs text-frost/40 md:block">
                {formatPostDate(post.date)}
              </span>

              <ArrowRight
                size={16}
                strokeWidth={1.5}
                aria-hidden
                className="shrink-0 text-frost/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-frost"
              />
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3} y={20}>
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            href="/garden"
            className="inline-flex items-center gap-2 text-frost/60 hover:text-frost transition-colors text-sm tracking-wider uppercase"
          >
            All posts
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
