import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Facebook,
  ExternalLink,
  Github,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface FounderSectionProps {
  onDirectConsultation: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onDirectConsultation }) => {
  const coreCompetencies = [
    'Technical SEO & Core Web Vitals (< 1.5s LCP)',
    'On-Page Semantic Keyword & Entity Mapping',
    'Local SEO & Google Business Profile 3-Pack',
    'High-Converting AI Website Architecture',
    'WordPress Custom Development & Elementor Pro',
    'High-ROAS Meta Ads (Facebook & Instagram)',
    'Precision Google Search & Performance Max Ads',
    'Full-Stack React, TypeScript & Tailwind CSS',
  ];

  return (
    <section id="founder" className="py-24 bg-[#F8F9FD] border-t border-[#E7EAF2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Headshot & Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="glass-card rounded-3xl p-6 relative border border-[#E7EAF2] shadow-xl w-full max-w-md mx-auto">
              
              {/* Authentic Headshot of Moavia Hassan */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-[#5265D8]/20 bg-slate-100 aspect-[3/4]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/ChatGPT_Image_Apr_12__2026__04_13_21_PM_7c49c572.png`}
                  alt="Moavia Hassan — Founder and Principal Specialist at Moavia SEO Pro"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Verified Founder Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E7EAF2] shadow-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#18243A]">Moavia Hassan</h4>
                    <p className="text-[11px] font-semibold text-[#17A99A]">Founder & Principal Strategist</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#5265D8]" />
                </div>
              </div>

              {/* Verified Location & Contact Details */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#65738B]">
                  <MapPin className="w-4 h-4 text-[#5265D8] shrink-0" />
                  <span className="font-semibold text-[#18243A]">Islamabad, Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-[#65738B]">
                  <Mail className="w-4 h-4 text-[#8B63D8] shrink-0" />
                  <a href="mailto:moaviahassan124@gmail.com" className="hover:text-[#5265D8] transition-colors">
                    moaviahassan124@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#65738B]">
                  <Phone className="w-4 h-4 text-[#17A99A] shrink-0" />
                  <a href="https://wa.me/923234313869" target="_blank" rel="noopener noreferrer" className="hover:text-[#17A99A] transition-colors">
                    +92 323 4313869 (WhatsApp)
                  </a>
                </div>
              </div>

              {/* Social and Verified Profile Links */}
              <div className="mt-6 pt-4 border-t border-[#E7EAF2] flex flex-wrap items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/moavia-hassan-seo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#5265D8]/10 text-[#5265D8] hover:bg-[#5265D8] hover:text-white transition-all shadow-sm"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61594226902693"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#18243A]/10 text-[#18243A] hover:bg-[#18243A] hover:text-white transition-all shadow-sm"
                  title="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/mmoavia7861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 text-[#18243A] hover:bg-[#18243A] hover:text-white transition-all shadow-sm"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href="https://www.upwork.com/freelancers/~01c3735023b2f296fa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-[#17A99A]/15 text-[#17A99A] text-xs font-bold hover:bg-[#17A99A] hover:text-white transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Upwork Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Founder Narrative & Direct Expertise */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5265D8]/10 text-[#5265D8] text-xs font-bold uppercase tracking-wider">
              Meet The Founder & Lead Specialist
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18243A] tracking-tight leading-tight">
              Direct Engineering Leadership with <span className="aurora-gradient-text">Moavia Hassan</span>
            </h2>

            <p className="text-sm font-semibold text-[#17A99A]">
              Digital Marketing Specialist | SEO Specialist | WordPress & AI Website Developer | Meta Ads & Google Ads Specialist
            </p>

            <div className="space-y-4 text-sm text-[#65738B] leading-relaxed">
              <p>
                Based in Islamabad, Pakistan, I founded Moavia SEO Pro with a single commitment: eliminating the
                divide between high-velocity web development and aggressive organic search dominance.
              </p>
              <p>
                Unlike generic agencies where accounts are passed off to junior trainees, every single technical audit,
                keyword clustering blueprint, and ad campaign architecture at Moavia SEO Pro is directly engineered and
                supervised by me.
              </p>
              <p>
                Whether you need a high-speed AI-assisted website deployed in React, a custom WordPress architecture,
                or a scalable multi-channel customer acquisition funnel across Google and Meta, I guarantee transparent
                communication and measurable revenue growth.
              </p>
            </div>

            {/* Core Competencies Matrix */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-[#18243A] uppercase tracking-wider mb-3">
                Core Specializations & Technical Mastery
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coreCompetencies.map((comp, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#18243A]">
                    <CheckCircle2 className="w-4 h-4 text-[#5265D8] shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Consultation Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onDirectConsultation}
                className="bg-gradient-to-r from-[#5265D8] to-[#8B63D8] hover:from-[#4453b7] hover:to-[#744ebd] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#5265D8]/20 flex items-center gap-2"
              >
                <span>Book 1-on-1 Consultation with Moavia</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/923234313869?text=Hello%20Moavia,%20I%20visited%20Moavia%20SEO%20Pro%20and%20would%20like%20to%20discuss%20your%20professional%20digital%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#17A99A] hover:bg-[#149284] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-md flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Directly</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
