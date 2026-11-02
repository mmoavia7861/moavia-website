import React from 'react';

const questions = [
  [
    "What is SEO and why does a business need it?",
    "Search engine optimization helps search engines discover and understand helpful pages so potential customers can find a business through relevant searches. Work may include indexing fixes, technical performance, useful service descriptions, internal links, and measurement in Google Search Console. Rankings and enquiries depend on competition, content quality, search intent and time."
  ],
  [
    "What is AEO and how is it different from SEO?",
    "Answer Engine Optimization focuses on making clear answers to real customer questions easy to find and understand. It builds on SEO rather than replacing it. Concise definitions, direct answers, supporting details, trustworthy sources, accessible HTML and descriptive headings can help users and search systems interpret the information. No answer-engine inclusion is guaranteed."
  ],
  [
    "What is GEO for AI-powered search?",
    "Generative Engine Optimization means making reliable information easier for AI-supported discovery systems to find, evaluate and reference. Useful work includes crawlable content, clear company identity, original evidence, updated pages and links from genuine third-party sources. AI citations are selected by independent systems and cannot be bought or promised through a markup file."
  ],
  [
    "Can an Islamabad-based agency help clients outside Pakistan?",
    "An Islamabad-based digital agency can discuss remote website, search and advertising projects with businesses in other cities or countries. Project scope, time zones, platform access, fees and communication methods should be agreed in advance. Being based in Islamabad does not automatically mean the agency operates a publicly staffed storefront or qualifies for a Google Business Profile."
  ],
  [
    "How do I evaluate an SEO agency without ranking guarantees?",
    "Ask for a clear website audit, specific deliverables, realistic priorities, examples of real work and a plan for measuring progress. Track search impressions and clicks together with qualified enquiries, rather than relying on a single keyword ranking. Genuine case-study metrics need a documented baseline and permission; illustrative calculators are not proof of results."
  ]
] as const;

export const SeoAuthoritySection: React.FC = () => (
  <section id="seo-answers" aria-labelledby="seo-answers-title" className="py-16 sm:py-20 bg-[#F8F9FD] border-y border-[#E7EAF2]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-wider text-[#4353BC]">SEO · AEO · GEO</p>
        <h2 id="seo-answers-title" className="text-3xl sm:text-4xl font-extrabold text-[#18243A] mt-2">Answers to common digital marketing questions</h2>
        <p className="text-[#52607A] mt-3 leading-relaxed">Clear information about search visibility, AI-assisted discovery and working with an Islamabad-based agency. Rankings, citations and revenue are not guaranteed.</p>
        <div className="space-y-3 mt-8">
          {questions.map(([question, answer]) => (
            <details key={question} className="rounded-2xl bg-white border border-[#E7EAF2] px-5 py-4 group">
              <summary className="font-bold text-[#18243A] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5265D8]">{question}</summary>
              <p className="text-sm text-[#52607A] leading-relaxed mt-3">{answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 flex gap-4 flex-wrap text-sm font-bold">
          <a className="text-[#4353BC] underline underline-offset-4" href="/services/">Explore services</a>
          <a className="text-[#4353BC] underline underline-offset-4" href="/contact/">Contact our agency</a>
          <a className="text-[#4353BC] underline underline-offset-4" href="/blog/">Read the blog</a>
        </div>
      </div>
    </div>
  </section>
);
