import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostsData } from '../../lib/posts';
import ReactMarkdown from 'react-markdown';

// 1. Generate Static Params so Next.js knows which pages to build at build time
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostData(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter">
            TK<span className="text-orange-500">.</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </nav>

      <article className="container mx-auto px-6 pt-32 pb-24 max-w-3xl">
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
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-12 mb-4 text-zinc-900 dark:text-zinc-100" {...props} />,
              // Custom Paragraph styling
              p: ({node, ...props}) => <p className="mb-6 text-zinc-600 dark:text-zinc-300 leading-relaxed" {...props} />,
              // Custom List styling (This fixes the orange bullets!)
              ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-8 marker:text-orange-500" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
              // Custom Bold styling
              strong: ({node, ...props}) => <strong className="font-bold text-zinc-900 dark:text-white" {...props} />,
              // Custom Blockquote styling
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-orange-500 pl-4 italic bg-zinc-100 dark:bg-zinc-900/50 py-2 rounded-r" {...props} />
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}