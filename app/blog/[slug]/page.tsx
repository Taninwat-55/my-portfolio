import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

// Using the same mock data for now. In the future, this will read from MDX files.
const posts: Record<string, { title: string; date: string; category: string; content: React.ReactNode }> = {
  'portfolio-redesign': {
    title: 'From Code to Product: Redesigning My Portfolio',
    date: 'December 2, 2025',
    category: 'Case Study',
    content: (
      <>
        <p className="mb-6">
          When I started building my portfolio, I leaned heavily into a "hacker/crypto" aesthetic. Dark mode, terminal fonts, and blockchain references everywhere. While it showed my passion for Bitcoin, I realized it might be pigeonholing me.
        </p>
        <h3 className="text-2xl font-bold mb-4 mt-8">The Pivot</h3>
        <p className="mb-6">
          As a Product Engineer, my goal is to show that I can build <strong>business value</strong>, not just cool code. I decided to pivot to a cleaner, "FinTech" aesthetic—something you might see from Stripe or Vercel.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Typography:</strong> Switched to Inter for readability.</li>
          <li><strong>Layout:</strong> Moved from horizontal scroll (cool but confusing) to standard vertical scroll (better for SEO).</li>
          <li><strong>Tech Stack:</strong> Migrated from Vite to Next.js for better performance and SEO capabilities.</li>
        </ul>
        <p>
          The result is what you see now: a fast, accessible, and professional platform that represents my dual background in Economics and Engineering.
        </p>
      </>
    ),
  },
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts[resolvedParams.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="font-bold text-xl tracking-tighter">
            TK<span className="text-orange-500">.</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Back to Writing
          </Link>
        </div>
      </nav>

      <article className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <header className="mb-12 text-center">
          <div className="flex justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          <time className="text-zinc-500 font-mono text-sm">{post.date}</time>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-lg leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}