import React, { useState, useEffect } from 'react';
import { initialTestimonials } from '../data/mockData';
import { Testimonial } from '../types';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface TestimonialsSectionProps {
  onConsultationClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onConsultationClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = initialTestimonials;

  // Auto-scroll every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI Website Development':
        return {
          pill: 'bg-[#8B63D8]/10 text-[#8B63D8] border-[#8B63D8]/30',
          metric: 'bg-[#8B63D8]/10 text-[#8B63D8]',
        };
      case 'Meta Ads':
        return {
          pill: 'bg-[#F17F72]/10 text-[#F17F72] border-[#F17F72]/30',
          metric: 'bg-[#F17F72]/10 text-[#F17F72]',
        };
      case 'Google Ads':
        return {
          pill: 'bg-[#E8B451]/15 text-[#E8B451] border-[#E8B451]/30',
          metric: 'bg-[#E8B451]/15 text-[#E8B451]',
        };
      case 'SEO':
      default:
        return {
          pill: 'bg-[#17A99A]/10 text-[#17A99A] border-[#17A99A]/30',
          metric: 'bg-[#17A99A]/10 text-[#17A99A]',
        };
    }
  };

  const activeTestimonial = testimonials[currentIndex];
  const colors = getCategoryColor(activeTestimonial.serviceCategory);

  return (
    <section
      id="testimonials"
      className="py-24 bg-white border-t border-[#E7EAF2] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Aurora Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#5265D8]/8 via-[#8B63D8]/8 to-[#17A99A]/8 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17A99A]/10 text-[#17A99A] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Verified Collaboration Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A] tracking-tight">
            Client Feedback & <span className="aurora-gradient-text">Success Stories</span>
          </h2>
          <p className="text-base sm:text-lg text-[#65738B]">
            Demonstrating how technical SEO precision, AI web architecture, and performance advertising drive
            tangible commercial revenue for real businesses.
          </p>
        </div>

        {/* Carousel Showcase Card */}
        <div className="mt-14 max-w-4xl mx-auto relative">
          
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#E7EAF2] shadow-xl relative transition-all">
            
            {/* Top Bar with Category, Rating & Metric */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E7EAF2]">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${colors.pill}`}
                >
                  {activeTestimonial.serviceCategory}
                </span>

                {activeTestimonial.isVerifiedDemonstration && (
                  <span className="text-[10px] font-extrabold bg-[#5265D8]/10 text-[#5265D8] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Verified Endorsement
                  </span>
                )}
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="my-8 relative">
              <Quote className="w-12 h-12 text-[#5265D8]/15 absolute -top-4 -left-4 -z-10" />
              <blockquote className="text-base sm:text-xl text-[#18243A] font-medium leading-relaxed italic">
                "{activeTestimonial.quote}"
              </blockquote>
            </div>

            {/* Metric Highlight Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8F9FD] border border-[#E7EAF2] text-xs font-bold text-[#18243A] mb-8">
              <TrendingUp className="w-4 h-4 text-[#17A99A]" />
              <span>Result: <strong className="text-[#17A99A]">{activeTestimonial.metricHighlight}</strong></span>
            </div>

            {/* Bottom Client Details & Carousel Controls */}
            <div className="pt-6 border-t border-[#E7EAF2] flex flex-wrap items-center justify-between gap-6">
              
              {/* Client Info */}
              <div className="flex items-center gap-3.5">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#5265D8]/30 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-[#18243A]">
                    {activeTestimonial.clientName}
                  </h4>
                  <p className="text-xs text-[#65738B]">
                    {activeTestimonial.role} • <strong className="text-[#18243A]">{activeTestimonial.company}</strong>
                  </p>
                  {activeTestimonial.location && (
                    <span className="text-[10px] text-[#65738B] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#5265D8]" />
                      {activeTestimonial.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-xl border border-[#E7EAF2] bg-white hover:bg-slate-50 text-[#18243A] transition-colors shadow-sm"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-xl border border-[#E7EAF2] bg-white hover:bg-slate-50 text-[#18243A] transition-colors shadow-sm"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

          {/* Dot Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full ${
                  currentIndex === idx
                    ? 'w-8 h-2 bg-[#5265D8]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Bottom CTA to Discuss Success Story */}
        <div className="mt-14 text-center">
          <button
            onClick={onConsultationClick}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5265D8] hover:text-[#4353bc] bg-[#5265D8]/10 hover:bg-[#5265D8]/15 px-6 py-3 rounded-xl transition-all"
          >
            <span>Ready to scale your business with Moavia SEO Pro? Request a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
