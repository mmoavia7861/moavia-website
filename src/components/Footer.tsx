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
                src={`${import.meta.env.BASE_URL}assets/aistudio/moavia_seopro_logo_720x720_10966138.png`}
                alt="Moavia SEO Pro Logo"
                loading="lazy"
                decoding="async"
                width={48}
                height={48}
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
              Founded by Moavia Hassan in Islamabad, Pakistan. We present technical SEO,
              AI-assisted websites, WordPress development, and Meta and Google Ads services. Project results vary.
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Navigation</h3>
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
                  Our Process
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

          {/* Crawlable service and guide links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Service Pages</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/services/seo/" className="hover:text-white">SEO Services</a></li>
              <li><a href="/services/local-seo-islamabad/" className="hover:text-white">Local SEO Islamabad</a></li>
              <li><a href="/services/aeo-geo-optimization/" className="hover:text-white">AEO &amp; GEO</a></li>
              <li><a href="/services/ai-website-development/" className="hover:text-white">AI Websites</a></li>
              <li><a href="/services/wordpress-development/" className="hover:text-white">WordPress Development</a></li>
              <li><a href="/services/google-ads/" className="hover:text-white">Google Ads</a></li>
              <li><a href="/services/meta-ads/" className="hover:text-white">Meta Ads</a></li>
              <li><a href="/guides/technical-seo-checklist/" className="hover:text-white">Technical SEO Guide</a></li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Specializations</h3>
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Official Contact</h3>
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
          <nav aria-label="Legal and company information" className="flex items-center flex-wrap justify-center gap-4">
            <a href="/about/" className="hover:text-white hover:underline">About Us</a>
            <a href="/blog/" className="hover:text-white hover:underline">Blog</a>
            <a href="/privacy-policy/" className="hover:text-white hover:underline">Privacy Policy</a>
            <a href="/terms-and-conditions/" className="hover:text-white hover:underline">Terms &amp; Conditions</a>
          </nav>
        </div>

      </div>
    </footer>
  );
};
