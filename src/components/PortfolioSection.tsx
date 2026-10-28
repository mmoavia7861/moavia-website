import React, { useState } from 'react';
import projects from '../data/githubProjects.json';
import { ArrowUpRight, Github, Code2, GraduationCap, Laptop2, Smartphone, ExternalLink } from 'lucide-react';

const categories = ['All', 'Websites', 'Education', 'Android'];
const icons = { Websites: Laptop2, Education: GraduationCap, Android: Smartphone };
const colors = [
  'from-[#253A7C] to-[#8664D6]',
  'from-[#0B5555] to-[#239A99]',
  'from-[#46316D] to-[#9C75CD]',
  'from-[#1B5175] to-[#3896BA]',
  'from-[#22314B] to-[#667B95]',
];

export const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filtered = selectedCategory === 'All' ? projects : projects.filter(p => p.category === selectedCategory);
  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-white relative" aria-labelledby="projects-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-[#5265D8]/10 text-[#4353BC] px-4 py-2 rounded-full">
            <Github className="w-4 h-4" aria-hidden="true"/> Public GitHub Repositories
          </span>
          <h2 id="projects-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A]">
            Real Projects. <span className="aurora-gradient-text">Real Source Code.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#52607A] leading-relaxed">
            These are publicly accessible repositories containing actual source code—not invented client case studies or performance results.
            Projects in prototype or starter stages are clearly labelled.
          </p>
          <a href="/projects/" className="inline-flex gap-2 items-center text-sm font-bold text-[#4353BC] underline underline-offset-4">
            Browse all projects on a separate page <ArrowUpRight className="w-4 h-4" aria-hidden="true"/>
          </a>
        </div>
        <div className="mt-10 flex justify-center gap-2 flex-wrap" role="group" aria-label="Filter GitHub projects">
          {categories.map(category => (
            <button key={category} type="button" onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={'px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-colors ' +
                (selectedCategory === category ? 'bg-[#18243A] border-[#18243A] text-white'
                  : 'border-[#E7EAF2] bg-[#F8F9FD] text-[#52607A] hover:bg-slate-100')}>
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {filtered.map(p => {
            const Icon = icons[p.category as keyof typeof icons] || Code2;
            const index = projects.indexOf(p);
            return (
              <article key={p.id} className="rounded-3xl border border-[#E7EAF2] overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <div className={'relative p-6 min-h-40 bg-gradient-to-br text-white ' + colors[index % colors.length]}>
                  <div className="flex items-start justify-between gap-3 relative">
                    <div className="p-3 rounded-xl bg-white/20"><Icon className="w-7 h-7" aria-hidden="true"/></div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wide rounded-full bg-white/20 px-3 py-1.5">{p.stage}</span>
                  </div>
                  <div className="relative mt-7">
                    <p className="text-xs text-white/85">github.com/mmoavia7861</p>
                    <p className="text-base font-extrabold mt-1 break-all">{p.repo}</p>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-xs font-bold text-[#4353BC] uppercase">{p.category}</p>
                  <h3 className="mt-2 text-lg leading-snug font-extrabold text-[#18243A]">{p.title}</h3>
                  <p className="mt-3 text-sm text-[#52607A] leading-relaxed">{p.description}</p>
                  <ul className="mt-4 space-y-2 text-xs text-[#52607A]">
                    {p.highlights.map(t => <li key={t} className="flex gap-2 items-start"><span className="text-[#08786F]" aria-hidden="true">✓</span>{t}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {p.stack.map(t => <span key={t} className="text-[10px] font-semibold px-2 py-1 bg-[#F8F9FD] border border-[#E7EAF2] text-[#52607A] rounded-lg">{t}</span>)}
                  </div>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-3 px-6 py-4 border-t border-[#E7EAF2]">
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex gap-2 items-center bg-[#18243A] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#304365]">
                    <Github className="w-4 h-4" aria-hidden="true"/> View Source <ExternalLink className="w-3.5 h-3.5" aria-hidden="true"/>
                  </a>
                  {'liveUrl' in p && typeof p.liveUrl === 'string' && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-[#4353BC] gap-1 hover:underline">
                      Live website <ArrowUpRight className="w-4 h-4" aria-hidden="true"/>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-[#65738B]">Public source code is verifiable; production deployments and client outcomes are not claimed unless separately confirmed.</p>
      </div>
    </section>
  );
};
