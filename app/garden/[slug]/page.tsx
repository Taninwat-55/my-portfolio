import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getPostData, getSortedPostsData } from "../../lib/posts";
import { PageShell } from "../../components/PageShell";
import { PaperSheet } from "../../components/paper/PaperSheet";
import { PageHeader } from "../../components/paper/PageHeader";
import { SatsConverter } from "../../components/post-tools/SatsConverter";
import styles from "../notebook.module.css";

// ─── Static params + metadata ──────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) return { title: "Post Not Found" };

  const url = `https://taninwatkaewpankan.xyz/garden/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ─── MDX components map ─────────────────────────────────────────────────────
// One map for all 10 posts. The look lives in notebook.module.css (.body), so
// only what needs logic is here. JSX components embedded directly inside .mdx
// posts (like <SatsConverter />) are also resolved through this map.

const mdxComponents = {
  // The posts write their section headings as ###, straight under the page's
  // h1. Rendered one level up so the outline has no gap (Lighthouse flagged
  // heading-order); the words are untouched.
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
  a: ({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...rest}
      />
    );
  },
  img: ({ alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? ""} {...rest} />
  ),

  // ── Garden tools — embeddable inside any post ────────────────────────────
  SatsConverter,
};

// ─── Page ───────────────────────────────────────────────────────────────────

/** A note: a page of the notebook, with the text written on its lines. */
export default async function GardenPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://taninwatkaewpankan.xyz",
    },
    datePublished: post.date,
    publisher: {
      "@type": "Person",
      name: "Taninwat Kaewpankan",
      url: "https://taninwatkaewpankan.xyz",
    },
  };

  return (
    <PageShell back={{ href: "/garden", label: "Garden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PaperSheet as="article" className={styles.notebook}>
        {/* The page's top margin: header and meta above the lines. */}
        <PageHeader kicker={post.category} title={post.title} lead={post.excerpt} />
        <p className={styles.meta}>
          <span>{post.author}</span>
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readTime}</span>
        </p>

        <div className={styles.body} data-note-body>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </PaperSheet>
    </PageShell>
  );
}
