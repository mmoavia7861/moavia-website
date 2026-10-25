import React, { useState } from 'react';
import { initialBlogPosts } from '../data/mockData';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight, X, User } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-[#F8F9FD] border-t border-[#E7EAF2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B63D8]/10 text-[#8B63D8] text-xs font-bold uppercase tracking-wider">
            Technical Insights & Industry Strategy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A] tracking-tight">
            Latest From Our <span className="aurora-gradient-text">Agency Blog</span>
          </h2>
          <p className="text-base sm:text-lg text-[#65738B]">
            Original, research-backed deep dives into search algorithms, Core Web Vitals, paid media funnels, and
            next-generation web architecture.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {initialBlogPosts.map((post) => (
            <article
              key={post.id}
              className="glass-card rounded-3xl overflow-hidden border border-[#E7EAF2] flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#5265D8] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-[#65738B]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#18243A] leading-snug group-hover:text-[#5265D8] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#65738B] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F8F9FD] border border-[#E7EAF2] text-[#65738B]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Read Article Trigger */}
              <div className="p-6 pt-0 border-t border-[#E7EAF2] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#18243A]">
                  By {post.author}
                </span>
                <span className="text-xs font-bold text-[#5265D8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 max-h-[90vh] overflow-y-auto border border-[#E7EAF2] shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#65738B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[#5265D8] bg-[#5265D8]/10 px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedPost.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18243A] mt-3 leading-tight">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-[#65738B] mt-4 pb-6 border-b border-[#E7EAF2]">
              <span className="font-semibold text-[#18243A] flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#5265D8]" />
                {selectedPost.author}
              </span>
              <span>•</span>
              <span>{selectedPost.createdAt}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <img
              src={selectedPost.featuredImage}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-2xl my-6 border border-[#E7EAF2]"
            />

            <div className="prose prose-sm max-w-none text-[#18243A] leading-relaxed whitespace-pre-wrap font-sans space-y-4">
              {selectedPost.content}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7EAF2] flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((t, idx) => (
                  <span key={idx} className="text-xs font-medium px-2.5 py-1 bg-[#F8F9FD] rounded-lg border border-[#E7EAF2] text-[#65738B]">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-bold bg-[#18243A] text-white px-5 py-2.5 rounded-xl hover:bg-[#253655]"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
