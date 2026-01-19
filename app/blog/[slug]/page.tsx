import { Metadata } from 'next';
import { Clock, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostsData } from '../../lib/posts';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '../../components/Navbar';
import { SkipLink } from '../../components/SkipLink';

// Generate Static Params so Next.js knows which pages to build at build time
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostData(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostData(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Article JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://taninwatkaewpankan.xyz',
    },
    datePublished: post.date,
    publisher: {
      '@type': 'Person',
      name: 'Taninwat Kaewpankan',
      url: 'https://taninwatkaewpankan.xyz',
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <SkipLink />
      <Navbar variant="simple" backLinkHref="/blog" backLinkText="Back to Blog" />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article id="main-content" className="container mx-auto px-6 pt-32 pb-24 max-w-3xl">
        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-zinc-900 dark:text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                <User size={16} />
              </div>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Markdown Content with Custom Styling */}
        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none leading-relaxed">
          <ReactMarkdown
            components={{
              // Custom H3 styling
              h3: (props) => <h3 className="text-2xl font-bold mt-12 mb-4 text-zinc-900 dark:text-zinc-100" {...props} />,
              // Custom Paragraph styling
              p: (props) => <p className="mb-6 text-zinc-600 dark:text-zinc-300 leading-relaxed" {...props} />,
              // Custom List styling (This fixes the orange bullets!)
              ul: (props) => <ul className="list-disc pl-6 space-y-2 mb-8 marker:text-orange-500" {...props} />,
              li: (props) => <li className="pl-1" {...props} />,
              // Custom Bold styling
              strong: (props) => <strong className="font-bold text-zinc-900 dark:text-white" {...props} />,
              // Custom Blockquote styling
              blockquote: (props) => <blockquote className="border-l-4 border-orange-500 pl-4 italic bg-zinc-100 dark:bg-zinc-900/50 py-2 rounded-r" {...props} />,
              // Custom Link styling with security attributes
              a: ({ href, ...props }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-orange-600 dark:text-orange-400 hover:underline"
                  {...props}
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}