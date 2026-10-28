import React from 'react';
import websiteLinks from '../data/githubProjects.json';
import { ArrowUpRight, Globe2 } from 'lucide-react';

export const PortfolioSection: React.FC = () => (
  <section id="portfolio" className="py-20 sm:py-24 bg-white" aria-labelledby="website-portfolio-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5265D8]/10 text-[#4353BC] text-xs font-bold uppercase tracking-wider">
          <Globe2 className="w-4 h-4" aria-hidden="true" /> Website Portfolio
        </span>
        <h2 id="website-portfolio-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A]">
          Explore Our <span className="aurora-gradient-text">Websites</span>
        </h2>
        <p className="text-[#52607A] text-sm sm:text-base leading-relaxed">
          Click a website below to open its GitHub Pages website in a new tab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {websiteLinks.map((site, index) => (
          <a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={'Visit ' + site.title + ' (opens in a new tab)'}
            className="group block rounded-3xl p-7 border border-[#E7EAF2] bg-[#F8F9FD] hover:bg-white hover:border-[#5265D8]/40 hover:shadow-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5265D8]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className={'p-3 rounded-2xl ' + (index === 2 ? 'bg-[#E4F5F1] text-[#08786F]' : 'bg-[#E9EDFF] text-[#4353BC]')}>
                <Globe2 className="w-7 h-7" aria-hidden="true" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#52607A] group-hover:text-[#4353BC] transition-colors" aria-hidden="true"/>
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#4353BC]">{site.category}</p>
            <h3 className="mt-2 text-lg font-extrabold text-[#18243A] leading-snug group-hover:text-[#4353BC]">{site.title}</h3>
            <p className="mt-4 text-xs text-[#52607A] break-all">{site.url.replace('https://', '')}</p>
            <span className="inline-flex mt-5 items-center gap-2 font-bold text-[#4353BC] text-sm">Visit Website <ArrowUpRight className="w-4 h-4" aria-hidden="true"/></span>
          </a>
        ))}
      </div>
    </div>
  </section>
);
