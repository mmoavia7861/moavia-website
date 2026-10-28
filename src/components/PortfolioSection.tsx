import React, { useState } from 'react';
import { initialPortfolio } from '../data/mockData';
import { PortfolioItem } from '../types';
import { ExternalLink, Tag, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'SEO', 'AI Websites', 'WordPress', 'Meta Ads', 'Google Ads'];

  const filteredItems =
    selectedCategory === 'All'
      ? initialPortfolio
      : initialPortfolio.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17A99A]/10 text-[#17A99A] text-xs font-bold uppercase tracking-wider">
            Verified Architectural Demonstrations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A] tracking-tight">
            Featured Agency <span className="aurora-gradient-text">Portfolio</span>
          </h2>
          <p className="text-base sm:text-lg text-[#65738B]">
            Explore our real and architectural demonstration case studies showcasing technical SEO execution,
            high-converting AI websites, custom WordPress builds, and performance advertising funnels.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#18243A] text-white shadow-md'
                  : 'bg-[#F8F9FD] text-[#65738B] hover:text-[#18243A] hover:bg-slate-100 border border-[#E7EAF2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden border border-[#E7EAF2] flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Demo Label */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    srcSet={`${item.image.replace('w=800', 'w=360&q=68')} 360w, ${item.image.replace('w=800', 'w=640')} 640w, ${item.image} 800w`}
                    sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) 50vw, 33vw"
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={460}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#18243A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>

                  {/* Mandatory Explicit Demonstration Project Flag */}
                  {item.isDemo && (
                    <span className="absolute top-4 right-4 bg-[#8B63D8] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Demonstration Project
                    </span>
                  )}

                  {/* Bottom Image Overlay Metric */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs font-bold text-white tracking-wide truncate">
                      {item.metrics}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#18243A] leading-snug group-hover:text-[#5265D8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#65738B] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F8F9FD] border border-[#E7EAF2] text-[#65738B]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-[#E7EAF2] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#65738B]">
                  Client: <strong className="text-[#18243A]">{item.clientName}</strong>
                </span>

                {item.liveUrl && /^https:\/\//.test(item.liveUrl) && !item.liveUrl.includes('example.com') ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#5265D8] hover:text-[#4353bc] transition-colors"
                    aria-label={`Open live site for ${item.title}`}
                  >
                    <span>View Live Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : item.isDemo ? (
                  <span className="text-xs font-semibold text-[#65738B]" title="This is a concept demonstration, not an externally hosted project">
                    Concept demo · No live site
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
