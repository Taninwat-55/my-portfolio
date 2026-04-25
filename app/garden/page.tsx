import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getSortedPostsData } from "../lib/posts";
import { Navbar } from "../components/Navbar";
import { SkipLink } from "../components/SkipLink";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Garden",
  description:
    "Half engineering log, half live experiment. Writing on frontend craft, product strategy, and the projects I'm working on — some posts have interactive tools embedded.",
  openGraph: {
    title: "Garden | Taninwat Kaewpankan",
    description:
      "Half engineering log, half live experiment — interactive writing on frontend craft and product strategy.",
  },
};

export default function GardenIndex() {
  const allPosts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <SkipLink />
      <Navbar variant="simple" backLinkHref="/" backLinkText="Back to Home" />

      <main id="main-content" className="relative">
        {/* ambient glow, off-center for visual rhythm */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-[-10%] w-[680px] h-[480px] rounded-full bg-ice-500/8 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[60vh] bg-grid-ice mask-radial-fade opacity-50 pointer-events-none"
        />

        <div className="relative container mx-auto px-6 pt-32 md:pt-40 pb-24 max-w-6xl">
          {/* Page header */}
          <div className="max-w-2xl mb-20">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5">
              Garden — Interactive Writing
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-50 mb-6">
              Half engineering log,{" "}
              <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
                half live experiment.
              </span>
            </h1>
            <p className="text-lg text-charcoal-300 leading-relaxed">
              Posts about frontend craft, product strategy, and the projects
              I&apos;m thinking through. A few have small interactive tools
              embedded right inside the text — open one to find out which.
            </p>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/garden/${post.slug}`}
                aria-label={`Read: ${post.title}`}
                className="group relative flex flex-col h-full p-6 md:p-8 rounded-2xl border border-white/5 bg-charcoal-900/40 backdrop-blur-sm hover:border-ice-400/30 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
              >
                {/* Top: category + exit arrow */}
                <div className="flex items-start justify-between gap-3 mb-6">
                  <Badge variant="ice">{post.category}</Badge>
                  <span
                    aria-hidden
                    className="text-charcoal-500 group-hover:text-ice-300 transition-colors"
                  >
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-snug text-zinc-50 group-hover:text-ice-100 transition-colors mb-3">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm md:text-[15px] text-charcoal-300 leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                {/* Footer: date + read time */}
                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between text-charcoal-400 font-mono text-[11px] tracking-wider uppercase">
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
