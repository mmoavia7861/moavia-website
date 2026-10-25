import React, { useState } from 'react';
import { pricingPackages } from '../data/mockData';
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string, category: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('SEO');
  const [customQuoteMode, setCustomQuoteMode] = useState<boolean>(false);

  const categories = ['SEO', 'AI Website Development'];

  const filteredPackages = pricingPackages.filter(
    (p) => p.serviceCategory === selectedCategory
  );

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5265D8]/10 text-[#5265D8] text-xs font-bold uppercase tracking-wider">
            Transparent Agency Investment
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A] tracking-tight">
            Predictable Pricing, <span className="aurora-gradient-text">Uncompromised Quality</span>
          </h2>
          <p className="text-base sm:text-lg text-[#65738B]">
            Choose a structured scope or request a bespoke quote tailored to your specific enterprise metrics.
          </p>

          {/* Toggle Controls */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            
            {/* Category Selector */}
            <div className="p-1 rounded-xl bg-[#F8F9FD] border border-[#E7EAF2] flex items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#5265D8] text-white shadow-sm'
                      : 'text-[#65738B] hover:text-[#18243A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom Quote Mode Switch */}
            <label className="flex items-center gap-2 text-xs font-bold text-[#18243A] cursor-pointer bg-[#F8F9FD] px-4 py-2 rounded-xl border border-[#E7EAF2]">
              <input
                type="checkbox"
                checked={customQuoteMode}
                onChange={(e) => setCustomQuoteMode(e.target.checked)}
                className="accent-[#5265D8] w-4 h-4 cursor-pointer"
              />
              <span>Display Custom Quote Mode</span>
            </label>

          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 flex flex-col justify-between relative transition-all border ${
                pkg.popular
                  ? 'bg-gradient-to-b from-white to-[#5265D8]/5 border-[#5265D8] shadow-2xl scale-[1.02]'
                  : 'bg-white border-[#E7EAF2] shadow-sm hover:shadow-lg'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#5265D8] to-[#8B63D8] text-white text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular Scope
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-[#18243A]">{pkg.name}</h3>
                <p className="text-xs text-[#65738B] mt-1">
                  Ideal for growing businesses requiring steady execution.
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1.5 pb-6 border-b border-[#E7EAF2]">
                  {customQuoteMode ? (
                    <span className="text-2xl font-extrabold text-[#5265D8]">Custom Quote</span>
                  ) : (
                    <>
                      <span className="text-4xl font-extrabold text-[#18243A]">{pkg.price}</span>
                      <span className="text-xs text-[#65738B] font-semibold">{pkg.period}</span>
                    </>
                  )}
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-[11px] font-bold text-[#18243A] uppercase tracking-wider block">
                    What's Included:
                  </span>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#18243A]">
                      <CheckCircle2 className="w-4 h-4 text-[#17A99A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-[#E7EAF2]">
                <button
                  onClick={() => onSelectPlan(pkg.name, pkg.serviceCategory)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#5265D8] to-[#8B63D8] text-white shadow-lg shadow-[#5265D8]/25 hover:opacity-95'
                      : 'bg-[#18243A] text-white hover:bg-[#283955]'
                  }`}
                >
                  <span>Select {pkg.name} Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
