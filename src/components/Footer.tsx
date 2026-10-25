import React from 'react';
import {
  Linkedin,
  Facebook,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-[#18243A] text-white pt-20 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Lead Capture */}
        <NewsletterSignup />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/moavia_seopro_logo_720x720_10966138.png"
                alt="Moavia SEO Pro Logo"
                className="w-12 h-12 rounded-xl object-contain bg-white/5 p-1 border border-white/10"
              />
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">MOAVIA SEO PRO</span>
                <p className="text-[11px] font-semibold text-[#17A99A] tracking-wider uppercase">
                  Digital Agency & Web Systems
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Founded by Moavia Hassan in Islamabad, Pakistan. We deliver senior-engineered Search Engine
              Optimization, AI-generated website architectures, custom WordPress builds, and high-ROAS Meta and Google
              advertising campaigns.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.linkedin.com/in/moavia-hassan-seo/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#5265D8] text-slate-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61594226902693"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#5265D8] text-slate-300 hover:text-white transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/mmoavia7861"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.upwork.com/freelancers/~01c3735023b2f296fa"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-[#17A99A]/20 hover:bg-[#17A99A] text-[#17A99A] hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                title="Upwork Profile"
              >
                <span>Upwork Verified</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-tools')} className="hover:text-white transition-colors text-[#8B63D8]">
                  AI Studio Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-white transition-colors">
                  Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('founder')} className="hover:text-white transition-colors">
                  Founder Profile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Agency Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Specializations</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Technical SEO & Core Web Vitals</li>
              <li>Local SEO & Google Maps 3-Pack</li>
              <li>AI-Generated React Websites</li>
              <li>WordPress & Elementor Themes</li>
              <li>Meta Ads & Conversions API</li>
              <li>Google Search & PMax Ads</li>
              <li>Algorithmic Penalty Recovery</li>
            </ul>
          </div>

          {/* Contact & Admin Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Official Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5265D8] shrink-0 mt-0.5" />
                <span>Islamabad, Federal Capital, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#17A99A] shrink-0" />
                <a href="https://wa.me/923234313869" target="_blank" rel="noopener noreferrer" className="hover:text-[#17A99A]">
                  +92 323 4313869 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8B63D8] shrink-0" />
                <a href="mailto:moaviahassan124@gmail.com" className="hover:text-white">
                  moaviahassan124@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#5265D8]" />
                <span>Admin Management Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Moavia SEO Pro. All rights reserved. Founded by Moavia Hassan.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Statement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
