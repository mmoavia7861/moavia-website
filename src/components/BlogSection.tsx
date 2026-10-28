import React from 'react';
import { BookOpen, ArrowRight, CalendarDays } from 'lucide-react';

const posts = [
  {slug: 'technical-seo-playbook-2026', topic: 'Technical SEO', title: 'Technical SEO in 2026: A Practical Audit Checklist', excerpt: 'Check indexing, canonical URLs, page speed and schema with a realistic, repeatable audit.'},
  {slug: 'ai-generated-websites-human-engineering', topic: 'Web Development', title: 'AI-Assisted Websites: Why Human Review Still Matters', excerpt: 'Review AI-generated websites for speed, privacy, security and accessibility before launch.'},
  {slug: 'mastering-meta-ads-capi-cro', topic: 'Paid Social', title: 'Meta Ads and Conversions API: What to Measure First', excerpt: 'Understand event deduplication, consent, lead quality and landing-page improvements.'},
  {slug: 'local-seo-google-maps-3pack', topic: 'Local SEO', title: 'Local SEO in Islamabad: Google Maps and Business Eligibility', excerpt: 'Practical guidance for eligible businesses without guaranteed Maps ranking promises.'},
  {slug: 'image-video-resolution-cro', topic: 'Creative Strategy', title: 'Marketing Images and Videos: Quality Without Slow Pages', excerpt: 'Use efficient visuals, accessible captions and realistic testing for better user experience.'}
];
export const BlogSection: React.FC = () => (
  <section id="blog" className="py-24 bg-[#F8F9FD] border-t border-[#E7EAF2]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B63D8]/10 text-[#8B63D8] text-xs font-bold uppercase"><BookOpen className="w-4 h-4" /> SEO & Marketing Learning</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18243A]">Latest From Our <span className="aurora-gradient-text">Agency Blog</span></h2>
        <p className="text-[#65738B]">Useful technical SEO, AI-assisted development, local search and advertising guides with original page URLs and primary-source reading.</p>
        <p><a href="/blog/" className="text-[#5265D8] font-bold underline underline-offset-4">View all blog articles</a></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
        {posts.map((post) => (
          <article key={post.slug} className="glass-card rounded-3xl p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#5265D8] uppercase tracking-wide">{post.topic}</span>
              <h3 className="mt-3 text-xl font-extrabold text-[#18243A] leading-snug"><a href={`/blog/${post.slug}/`} className="hover:text-[#5265D8] hover:underline">{post.title}</a></h3>
              <p className="text-sm text-[#65738B] leading-relaxed mt-3">{post.excerpt}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E7EAF2]">
              <p className="text-xs text-[#65738B] flex items-center gap-2 mb-3"><CalendarDays className="w-4 h-4" aria-hidden="true"/> Published 28 October 2026</p>
              <a href={`/blog/${post.slug}/`} className="inline-flex items-center gap-2 text-sm font-bold text-[#5265D8] hover:underline">Read full article <ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-9">
        <a className="px-4 py-2 rounded-xl bg-white border border-[#E7EAF2] text-[#5265D8] hover:underline" href="/guides/seo-aeo-geo-explained/">SEO vs AEO vs GEO</a>
        <a className="px-4 py-2 rounded-xl bg-white border border-[#E7EAF2] text-[#5265D8] hover:underline" href="/guides/technical-seo-checklist/">Technical SEO Checklist</a>
      </div>
    </div>
  </section>
