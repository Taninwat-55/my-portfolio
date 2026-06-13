import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getSortedPostsData } from "../lib/posts";
import { Navbar } from "../components/Navbar";
import { SkipLink } from "../components/SkipLink";

export const metadata: Metadata = {
  title: "Garden",
  description:
    "Notes on building products — engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
  alternates: {
    canonical: "https://taninwatkaewpankan.xyz/garden",
  },
  openGraph: {
    title: "Garden | Ice — Taninwat Kaewpankan",
    description:
      "Notes on building products — engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
    url: "https://taninwatkaewpankan.xyz/garden",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden | Ice — Taninwat Kaewpankan",
    description:
      "Notes on building products — engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
  },
};

export default function GardenIndex() {
  const allPosts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-night-900 text-frost">
      <SkipLink />
      <Navbar backLinkHref="/" backLinkText="Back to Home" />

      <main id="main-content" className="relative">
        <div className="relative container mx-auto px-6 pt-32 md:pt-40 pb-24 max-w-6xl">
          {/* Page header */}
          <div className="max-w-3xl mb-20">
            <div className="text-[11px] tracking-[0.3em] uppercase text-crystal-500 mb-5">
              Garden — Interactive Writing
            </div>
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-none mb-6"
              style={{ fontSize: "clamp(2.6rem, 8vw, 100px)" }}
            >
              Garden
            </h1>
            <p className="text-lg text-frost/70 font-light leading-relaxed">
              Notes on building products — engineering, product thinking, and
              the occasional tool that runs right inside the post.
            </p>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/garden/${post.slug}`}
                aria-label={`Read: ${post.title}`}
                className="group relative flex flex-col h-full p-6 md:p-8 rounded-2xl bg-white/3 border border-frost/10 hover:border-frost/25 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
              >
                {/* Top: category + exit arrow */}
                <div className="flex items-start justify-between gap-3 mb-6">
                  <span className="inline-block text-crystal-500 bg-crystal-500/10 rounded-full text-xs uppercase tracking-wider px-3 py-1">
                    {post.category}
                  </span>
                  <span
                    aria-hidden
                    className="text-frost/30 group-hover:text-crystal-500 transition-colors"
                  >
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-medium tracking-tight leading-snug text-frost group-hover:text-crystal-300 transition-colors mb-3">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm md:text-[15px] text-frost/60 font-light leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                {/* Footer: date + read time */}
                <div className="mt-auto pt-5 border-t border-frost/10 flex items-center justify-between text-frost/40 text-[11px] tracking-wider uppercase">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={12} strokeWidth={1.5} />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
