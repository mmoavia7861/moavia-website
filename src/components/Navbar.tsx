import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Code2,
  Share2,
  Target,
  ArrowRight,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Layers,
  PhoneCall,
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenAdmin, isAdminOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E7EAF2] shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#5265D8] via-[#8B63D8] to-[#17A99A] text-white text-xs font-medium py-1.5 px-4 text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        <span>Now booking Q4/Q1 Strategic Technical SEO Audits & AI-Powered Next-Gen Websites</span>
        <button
          onClick={() => handleNavClick('contact')}
          className="underline font-semibold hover:opacity-80 ml-2"
        >
          Claim Free Consultation →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 sm:min-h-20 py-2 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <button type="button"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group text-left"
          aria-label="Moavia SEO Pro — back to homepage"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/aistudio/moavia_seopro_logo_720x720_10966138.png`}
            alt="Moavia SEO Pro Logo"
            width={44}
            height={44}
            decoding="async"
            className="w-11 h-11 rounded-xl shadow-md border border-[#E7EAF2] object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#18243A]">MOAVIA</span>
              <span className="bg-[#5265D8]/10 text-[#5265D8] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#08786F] tracking-wider uppercase">
              SEO & Digital Agency
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
          <button
            onClick={() => handleNavClick('hero')}
            className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Home
          </button>

          {/* Services Mega-Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              aria-expanded={servicesDropdownOpen}
              aria-controls="service-menu"
              aria-haspopup="true"
              className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              Services
              <ChevronDown className="w-4 h-4 text-[#65738B]" />
            </button>

            {servicesDropdownOpen && (
              <div
                id="service-menu"
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full left-0 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-[#E7EAF2] p-3 mt-1 grid gap-1"
                role="group"
                aria-label="Browse services"
              >
                {[
                  ['/services/seo/', 'Search Engine Optimization'],
                  ['/services/local-seo-islamabad/', 'Local SEO Islamabad'],
                  ['/services/aeo-geo-optimization/', 'AEO & GEO Optimization'],
                  ['/services/ai-website-development/', 'AI Website Development'],
                  ['/services/wordpress-development/', 'WordPress & Web Development'],
                  ['/services/meta-ads/', 'Meta Ads Management'],
                  ['/services/google-ads/', 'Google Ads Management'],
                ].map(([href, title]) => (
                  <a key={href} href={href}
                    className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#18243A] hover:text-[#5265D8] hover:bg-[#F8F9FD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5265D8]"
                    onClick={() => setServicesDropdownOpen(false)}>
                    {title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('ai-tools')}
            className="px-3 py-2 text-sm font-medium text-[#8B63D8] hover:bg-[#8B63D8]/10 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Agency Studio
          </button>

          <button
            onClick={() => handleNavClick('portfolio')}
            className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Portfolio
          </button>

          <button
            onClick={() => handleNavClick('testimonials')}
            className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Our Process
          </button>

          <button
            onClick={() => handleNavClick('pricing')}
            className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Pricing
          </button>

          <button
            onClick={() => handleNavClick('founder')}
            className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Founder
          </button>

          <a href="/blog/" className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors">Blog</a>

          <button
            onClick={() => handleNavClick('contact')}
            className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Admin Portal Toggle Button */}
          <button
            onClick={onOpenAdmin}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isAdminOpen
                ? 'bg-[#18243A] text-white border-[#18243A]'
                : 'bg-white text-[#18243A] border-[#E7EAF2] hover:bg-slate-50'
            }`}
            title="Access Secure Administrative Management Portal"
          >
            <ShieldCheck className="w-4 h-4 text-[#5265D8]" />
            <span className="hidden sm:inline">Admin Portal</span>
          </button>

          {/* Get Free Consultation CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="bg-gradient-to-r from-[#5265D8] to-[#8B63D8] hover:from-[#4353bc] hover:to-[#764ec3] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-[#5265D8]/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#18243A] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="xl:hidden bg-white border-b border-[#E7EAF2] px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            Services Catalog
          </button>
          <button
            onClick={() => handleNavClick('ai-tools')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#8B63D8] rounded-lg hover:bg-[#8B63D8]/10"
          >
            AI Agency Studio
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            Our Approach
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            Pricing Packages
          </button>
          <button
            onClick={() => handleNavClick('founder')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            About Founder (Moavia Hassan)
          </button>
          <a href="/blog/" className="block w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50">Agency Blog</a>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            Contact & Consultation
          </button>
        </div>
      )}
    </header>
  );
};
