import React from 'react';
import { SearchCheck, LayoutTemplate, ChartNoAxesCombined, ArrowRight, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  onConsultationClick: () => void;
}

/**
 * Do not publish fabricated endorsements, stock-photo identities or
 * unverified traffic / ROI figures as real client testimonials.
 * Replace with consented, source-backed reviews when available.
 */
export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onConsultationClick,
}) => {
  const principles = [
    {
      title: 'Assess the real starting point',
      detail: 'Review the live website, indexing coverage, analytics setup, content gaps and customer enquiry path before proposing changes.',
      icon: SearchCheck,
    },
    {
      title: 'Explain the work clearly',
      detail: 'Show which pages, technical issues, or campaign elements need attention and why. Scope and priorities depend on the specific business.',
      icon: LayoutTemplate,
    },
    {
      title: 'Report measurable outcomes',
      detail: 'Where access is available, monitor actual Search Console performance, qualified enquiries and agreed conversion events over time.',
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-t border-[#E7EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17A99A]/10 text-[#148f85] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Transparent Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18243A] tracking-tight mt-5">
            How We Approach Client Projects
          </h2>
          <p className="text-[#65738B] mt-4 text-base leading-relaxed">
            Each engagement should be based on real business goals, evidence and clear communication—not invented reviews or guaranteed search rankings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-12">
          {principles.map(({ title, detail, icon: Icon }) => (
            <article key={title} className="glass-card rounded-3xl p-7 border border-[#E7EAF2]">
              <Icon className="w-7 h-7 text-[#5265D8]" aria-hidden="true" />
              <h3 className="font-extrabold text-lg mt-5 text-[#18243A]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#65738B]">{detail}</p>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-[#65738B] mt-7">
          Confirmed client reviews and independently documented results can be added with the client's permission.
        </p>
        <div className="mt-7 text-center">
          <button onClick={onConsultationClick}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white bg-[#5265D8] hover:bg-[#4353bc] transition-colors">
            Discuss Your Website Goals <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
