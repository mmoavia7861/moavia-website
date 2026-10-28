import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Zap,
  BarChart3,
  CheckCircle2,
  Layers,
  ChevronRight,
  Calculator,
} from 'lucide-react';

interface HeroProps {
  onConsultationClick: () => void;
  onExploreServicesClick: () => void;
  onOpenAiStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onConsultationClick,
  onExploreServicesClick,
  onOpenAiStudio,
}) => {
  // Interactive Growth Simulator State
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(5000);
  const [averageDealSize, setAverageDealSize] = useState<number>(350);

  // Growth formulas
  const estimatedConversionRate = 0.035; // 3.5%
  const currentMonthlyInquiries = Math.round(monthlyVisitors * 0.012);
  const projectedMonthlyInquiries = Math.round(monthlyVisitors * 2.8 * estimatedConversionRate);
  const projectedRevenueGain = Math.round(
    (projectedMonthlyInquiries - currentMonthlyInquiries) * averageDealSize * 0.25
  );

  return (
    <section className="relative overflow-hidden pt-12 pb-24 aurora-bg">
      {/* Decorative Aurora Ambient Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#5265D8]/15 via-[#8B63D8]/15 to-[#17A99A]/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Storytelling */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Trust Pill / Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-[#E7EAF2] shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17A99A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#17A99A]" />
              </span>
              <span className="text-xs font-bold text-[#18243A]">
                Moavia SEO Pro — Founded by Moavia Hassan
              </span>
              <span className="text-xs text-[#65738B]">|</span>
              <span className="text-xs font-semibold text-[#5265D8]">Islamabad, Pakistan</span>
            </div>

            {/* Official Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#18243A] leading-[1.1] tracking-tight">
                Your Digital Growth Starts With{' '}
                <span className="aurora-gradient-text">Smarter Solutions.</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5265D8]">
                SEO, AI-Powered Websites & Performance Marketing.
              </h2>
              <p className="text-base sm:text-lg text-[#65738B] max-w-2xl leading-relaxed">
                Moavia SEO Pro combines search engine optimization, professional website development,
                AI-assisted design, Meta Ads, and Google Ads to build stronger digital experiences for
                modern businesses.
              </p>
            </div>

            {/* Core Capability Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#18243A]">
                <CheckCircle2 className="w-4 h-4 text-[#17A99A] shrink-0" />
                <span>Technical & Local SEO</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#18243A]">
                <CheckCircle2 className="w-4 h-4 text-[#8B63D8] shrink-0" />
                <span>AI Website Prototyping</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#18243A]">
                <CheckCircle2 className="w-4 h-4 text-[#5265D8] shrink-0" />
                <span>Custom WordPress & React</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#18243A]">
                <CheckCircle2 className="w-4 h-4 text-[#F17F72] shrink-0" />
                <span>Meta Ads Campaign Strategy</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#18243A]">
                <CheckCircle2 className="w-4 h-4 text-[#E8B451] shrink-0" />
                <span>Google Search & PMax</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#18243A]">
                <CheckCircle2 className="w-4 h-4 text-[#17A99A] shrink-0" />
                <span>Core Web Vitals Diagnostics</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onConsultationClick}
                className="bg-gradient-to-r from-[#5265D8] to-[#8B63D8] hover:from-[#4453b7] hover:to-[#744ebd] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#5265D8]/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreServicesClick}
                className="bg-white hover:bg-slate-50 text-[#18243A] font-bold px-6 py-3.5 rounded-xl border border-[#E7EAF2] shadow-sm flex items-center gap-2 transition-all hover:border-[#CBD5E1]"
              >
                <span>Explore Our Services</span>
                <ChevronRight className="w-4 h-4 text-[#65738B]" />
              </button>

              <button
                onClick={onOpenAiStudio}
                className="bg-[#8B63D8]/10 hover:bg-[#8B63D8]/20 text-[#8B63D8] font-bold px-5 py-3.5 rounded-xl border border-[#8B63D8]/20 flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Try AI SEO Studio</span>
              </button>
            </div>

            {/* Founder Headshot & Verification Badge */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#E7EAF2]">
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/moavia_seopro_logo_720x720_10966138.png`}
                alt="Moavia SEO Pro brand logo"
                width={52}
                height={52}
                decoding="async"
                className="w-13 h-13 rounded-full object-cover object-top border-2 border-[#5265D8] shadow-md"
              />
              <div>
                <h4 className="text-sm font-bold text-[#18243A] flex items-center gap-1.5">
                  Moavia Hassan
                  <span className="text-[10px] bg-[#17A99A]/15 text-[#17A99A] font-extrabold px-1.5 py-0.5 rounded">
                    FOUNDER & LEAD STRATEGIST
                  </span>
                </h4>
                <p className="text-xs text-[#65738B]">
                  Direct founder involvement on every client campaign, technical audit, and code delivery.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Real-Time Growth & SEO Metric Simulator */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-6 sm:p-7 relative border border-[#E7EAF2] shadow-xl">
              
              <div className="flex items-center justify-between pb-5 border-b border-[#E7EAF2]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#5265D8] to-[#8B63D8] text-white shadow-md">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#18243A]">Interactive Growth Engine</h3>
                    <p className="text-xs text-[#65738B]">Project your organic search ROI</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#17A99A] bg-[#17A99A]/10 px-2.5 py-1 rounded-full">
                  ILLUSTRATIVE MODEL
                </span>
              </div>

              {/* Slider 1: Current Monthly Traffic */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#18243A]">Current Monthly Visitors:</span>
                  <span className="font-bold text-[#5265D8] bg-[#5265D8]/10 px-2 py-0.5 rounded">
                    {monthlyVisitors.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  className="w-full accent-[#5265D8] cursor-pointer"
                />
              </div>

              {/* Slider 2: Average Customer Value */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#18243A]">Average Client Deal Value:</span>
                  <span className="font-bold text-[#8B63D8] bg-[#8B63D8]/10 px-2 py-0.5 rounded">
                    ${averageDealSize} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={averageDealSize}
                  onChange={(e) => setAverageDealSize(Number(e.target.value))}
                  className="w-full accent-[#8B63D8] cursor-pointer"
                />
              </div>

              {/* Simulation Result Cards */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2]">
                  <p className="text-[11px] font-semibold text-[#65738B] uppercase">Projected Inquiries</p>
                  <div className="text-2xl font-extrabold text-[#18243A] mt-1">
                    {projectedMonthlyInquiries}
                    <span className="text-xs text-[#17A99A] font-bold ml-1">
                      (+{Math.round((projectedMonthlyInquiries / (currentMonthlyInquiries || 1) - 1) * 100)}%)
                    </span>
                  </div>
                  <p className="text-[10px] text-[#65738B] mt-1">vs ~{currentMonthlyInquiries} baseline</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#17A99A]/10 to-[#5265D8]/10 border border-[#17A99A]/30">
                  <p className="text-[11px] font-semibold text-[#17A99A] uppercase">Estimated Gain</p>
                  <div className="text-2xl font-extrabold text-[#17A99A] mt-1">
                    ${projectedRevenueGain.toLocaleString()}
                  </div>
                  <p className="text-[10px] text-[#18243A] font-medium mt-1">Illustrative estimate only — not a forecast</p>
                </div>
              </div>

              {/* Benchmark Progress Highlights */}
              <div className="mt-6 space-y-3 pt-5 border-t border-[#E7EAF2]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#65738B] font-medium">Core Web Vitals Guarantee:</span>
                  <span className="font-bold text-[#17A99A]">Measured on real devices</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#65738B] font-medium">Search Intent Accuracy:</span>
                  <span className="font-bold text-[#5265D8]">Intent-based planning</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#65738B] font-medium">Turnaround Timeline:</span>
                  <span className="font-bold text-[#18243A]">Sprint Agile Sprints</span>
                </div>
              </div>

              {/* Bottom Quick CTA */}
              <button
                onClick={onConsultationClick}
                className="w-full mt-6 py-3 rounded-xl bg-[#18243A] hover:bg-[#253655] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Custom Growth Blueprint</span>
                <ArrowRight className="w-4 h-4 text-[#17A99A]" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
