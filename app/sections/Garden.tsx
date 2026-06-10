import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPostData, type Post } from "../lib/posts";
import { siteContent } from "../data";
import { GardenAnimator } from "./GardenAnimator";
import { GardenFeatured, type FeaturedPost } from "./GardenFeatured";

function resolveFeatured(slugs: string[]): FeaturedPost[] {
  return slugs
    .map((slug) => getPostData(slug))
    .filter((p): p is Post => p !== null)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      readTime: p.readTime,
    }));
}

export function Garden() {
  const pmFeatured = resolveFeatured(siteContent.pm.featuredSlugs);
  const devFeatured = resolveFeatured(siteContent.dev.featuredSlugs);

  return (
    <section
      id="garden"
      aria-label="Garden — writing"
      className="relative py-24 md:py-32 border-t border-border bg-sand-200"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <GardenAnimator>
          {/* Header */}
          <div className="max-w-xl mb-14">
            <p className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-5">
              Garden
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-ink-900 mb-4">
              Things I&apos;ve been thinking through.
            </h2>
            <p className="text-base text-ink-500 leading-relaxed">
              A few pieces on building, shipping, and the decisions in between. Some have interactive tools embedded inside.
            </p>
          </div>

          {/* Cards */}
          <GardenFeatured pm={pmFeatured} dev={devFeatured} />

          {/* CTA */}
          <div>
            <Link
              href="/garden"
              aria-label="Browse all garden notes"
              className="inline-flex items-center gap-2 text-sm font-medium text-clay-500 hover:text-clay-600 transition-colors group"
            >
              Browse all
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </GardenAnimator>
      </div>
    </section>
  );
}
