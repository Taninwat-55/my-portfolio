"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Search, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

// MOCK DATA: Add your real posts here
const allPosts = [
  {
    slug: 'portfolio-redesign',
    title: 'From Code to Product: Redesigning My Portfolio',
    date: 'December 2, 2025',
    category: 'Case Study',
    readTime: '5 min read',
    excerpt: 'How I pivoted my personal brand from "Crypto Enthusiast" to "Product Engineer" using Next.js and a user-centric design approach.',
  },
  // Example of another post to show how filtering works
  /*
  {
    slug: 'react-server-components',
    title: 'Understanding React Server Components',
    date: 'January 15, 2026',
    category: 'Engineering',
    readTime: '8 min read',
    excerpt: 'A deep dive into how RSCs change the data fetching paradigm in Next.js applications.',
  },
  */
];

const categories = ["All", "Case Study", "Product", "Engineering"];

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-orange-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter">
            TK<span className="text-orange-500">.</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-5xl">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Blog</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Exploring the intersection of frontend engineering, product strategy, and business value.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  selectedCategory === cat 
                    ? "bg-orange-500 text-white" 
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.article 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={post.slug} 
                className="group cursor-pointer flex flex-col h-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  
                  {/* Meta Top */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock size={12} />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800/50 mt-auto">
                    <span className="text-xs font-mono text-zinc-400">{post.date}</span>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowLeft className="rotate-180" size={16} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-zinc-500">
              <p>No articles found matching your criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All')}}
                className="mt-4 text-orange-500 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}