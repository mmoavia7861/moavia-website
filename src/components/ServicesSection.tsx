import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Code2,
  Share2,
  Target,
  ArrowRight,
  CheckCircle2,
  X,
  ExternalLink,
  Shield,
  Layers,
  Wrench,
} from 'lucide-react';
import { agencyServices } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForConsultation: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForConsultation,
}) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getAccentColors = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          bg: 'bg-[#8B63D8]/10',
          text: 'text-[#8B63D8]',
          border: 'border-[#8B63D8]/30',
          gradient: 'from-[#8B63D8] to-[#5265D8]',
        };
      case 'teal':
        return {
          bg: 'bg-[#17A99A]/10',
          text: 'text-[#17A99A]',
          border: 'border-[#17A99A]/30',
          gradient: 'from-[#17A99A] to-[#5265D8]',
        };
      case 'coral':
        return {
          bg: 'bg-[#F17F72]/10',
          text: 'text-[#F17F72]',
          border: 'border-[#F17F72]/30',
          gradient: 'from-[#F17F72] to-[#8B63D8]',
        };
      case 'gold':
        return {
          bg: 'bg-[#E8B451]/10',
          text: 'text-[#E8B451]',
          border: 'border-[#E8B451]/30',
          gradient: 'from-[#E8B451] to-[#F17F72]',
        };
      case 'blue':
      default:
        return {
          bg: 'bg-[#5265D8]/10',
          text: 'text-[#5265D8]',
          border: 'border-[#5265D8]/30',
          gradient: 'from-[#5265D8] to-[#17A99A]',
        };
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'seo-complete':
        return <Search className="w-6 h-6" />;
      case 'ai-websites':
        return <Sparkles className="w-6 h-6" />;
      case 'wordpress-dev':
        return <Code2 className="w-6 h-6" />;
      case 'meta-ads':
        return <Share2 className="w-6 h-6" />;
      case 'google-ads':
        return <Target className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5265D8]/10 text-[#5265D8] text-xs font-bold uppercase tracking-wider">
            Engineered For Market Dominance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A] tracking-tight">
            Specialized Digital Agency <span className="aurora-gradient-text">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-[#65738B]">
            Every service is led directly by founder Moavia Hassan with uncompromised engineering quality,
            measurable performance metrics, and transparent communication.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16">
          {agencyServices.map((service, index) => {
            const colors = getAccentColors(service.accentColor);
            const isFeatured = service.id === 'ai-websites';

            return (
              <div
                key={service.id}
                className={`glass-card rounded-3xl p-7 flex flex-col justify-between relative group ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white to-[#8B63D8]/5 border-[#8B63D8]/30 shadow-xl' : ''
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-5 right-5 bg-gradient-to-r from-[#8B63D8] to-[#5265D8] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Featured Service
                  </div>
                )}

                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center gap-3">
                    <div className={`p-3.5 rounded-2xl ${colors.bg} ${colors.text} shadow-sm group-hover:scale-110 transition-transform`}>
                      {getServiceIcon(service.id)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#65738B] uppercase tracking-wider">
                        {service.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#18243A] tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-[#5265D8] mt-4">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-[#65738B] mt-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Features Preview */}
                  <div className="mt-6 space-y-2.5">
                    {service.features.slice(0, isFeatured ? 5 : 4).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#18243A]">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${colors.text}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tools Stack Chips */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {service.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F8F9FD] border border-[#E7EAF2] text-[#65738B]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Starting Price & Drill-down Buttons */}
                <div className="mt-8 pt-5 border-t border-[#E7EAF2] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#65738B] block font-medium">Starting from</span>
                    <span className="text-base font-extrabold text-[#18243A]">
                      {service.priceStarting}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="text-xs font-bold text-[#18243A] hover:text-[#5265D8] px-3 py-2 rounded-xl border border-[#E7EAF2] hover:bg-slate-50 transition-colors"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onSelectServiceForConsultation(service.title)}
                      className={`text-xs font-bold text-white px-4 py-2 rounded-xl bg-gradient-to-r ${colors.gradient} shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95`}
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#E7EAF2] shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#65738B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#5265D8]/10 text-[#5265D8]">
                {getServiceIcon(activeModalService.id)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#17A99A] uppercase tracking-wider">
                  {activeModalService.category}
                </span>
                <h3 className="text-2xl font-extrabold text-[#18243A]">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm font-semibold text-[#5265D8] mt-4">
              {activeModalService.tagline}
            </p>
            <p className="text-sm text-[#65738B] mt-2 leading-relaxed">
              {activeModalService.description}
            </p>

            {/* Deliverables Box */}
            <div className="mt-6 p-5 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2]">
              <h4 className="text-xs font-bold text-[#18243A] uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#17A99A]" />
                Official Project Deliverables
              </h4>
              <ul className="mt-3 space-y-2">
                {activeModalService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-medium text-[#18243A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5265D8] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Scope Features */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-[#18243A] uppercase tracking-wider mb-3">
                Full Technical Scope
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#18243A]">
                    <CheckCircle2 className="w-4 h-4 text-[#17A99A] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Included */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-[#65738B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                Industry Tools Utilized
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalService.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-[#18243A]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-[#E7EAF2] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#65738B] block font-medium">Starting Investment</span>
                <span className="text-xl font-extrabold text-[#18243A]">
                  {activeModalService.priceStarting}
                </span>
              </div>
              <button
                onClick={() => {
                  onSelectServiceForConsultation(activeModalService.title);
                  setActiveModalService(null);
                }}
                className="bg-gradient-to-r from-[#5265D8] to-[#8B63D8] hover:from-[#4453b7] hover:to-[#744ebd] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#5265D8]/20 flex items-center gap-2"
              >
                <span>Request Custom Scope for this Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
