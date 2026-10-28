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
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[#E7EAF2] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#5265D8] via-[#8B63D8] to-[#17A99A] text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        <span>Now booking Q4/Q1 Strategic Technical SEO Audits & AI-Powered Next-Gen Websites</span>
        <button
          onClick={() => handleNavClick('contact')}
          className="underline font-semibold hover:opacity-80 ml-2"
        >
          Claim Free Consultation →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/aistudio/moavia_seopro_logo_720x720_10966138.png`}
            alt="Moavia SEO Pro Logo"
            className="w-11 h-11 rounded-xl shadow-md border border-[#E7EAF2] object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#18243A]">MOAVIA</span>
              <span className="bg-[#5265D8]/10 text-[#5265D8] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#17A99A] tracking-wider uppercase">
              SEO & Digital Agency
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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
              className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              Services
              <ChevronDown className="w-4 h-4 text-[#65738B]" />
            </button>

            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-[#E7EAF2] p-3 mt-1 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div
                  onClick={() => handleNavClick('services')}
                  className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#17A99A]/10 text-[#17A99A] mt-0.5">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#18243A]">Search Engine Optimization</h4>
                    <p className="text-xs text-[#65738B]">Technical, on-page, local & link authority</p>
                  </div>
                </div>

                <div
                  onClick={() => handleNavClick('services')}
                  className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#8B63D8]/10 text-[#8B63D8] mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#18243A]">AI Website Development</h4>
                    <p className="text-xs text-[#65738B]">Next-gen React & AI-accelerated web systems</p>
                  </div>
                </div>

                <div
                  onClick={() => handleNavClick('services')}
                  className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#5265D8]/10 text-[#5265D8] mt-0.5">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#18243A]">WordPress & Web Dev</h4>
                    <p className="text-xs text-[#65738B]">Elementor, custom themes & speed optimization</p>
                  </div>
                </div>

                <div
                  onClick={() => handleNavClick('services')}
                  className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#F17F72]/10 text-[#F17F72] mt-0.5">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#18243A]">Meta Ads Management</h4>
                    <p className="text-xs text-[#65738B]">Facebook & Instagram high-ROAS funnels</p>
                  </div>
                </div>

                <div
                  onClick={() => handleNavClick('services')}
                  className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#E8B451]/10 text-[#E8B451] mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#18243A]">Google Ads Management</h4>
                    <p className="text-xs text-[#65738B]">Search, display & Performance Max campaigns</p>
                  </div>
                </div>
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

          <button
            onClick={() => handleNavClick('blog')}
            className="px-3 py-2 text-sm font-medium text-[#18243A] hover:text-[#5265D8] rounded-lg hover:bg-slate-50 transition-colors"
          >
            Blog
          </button>

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
            className="lg:hidden p-2 text-[#18243A] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E7EAF2] px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
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
          <button
            onClick={() => handleNavClick('blog')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-[#18243A] rounded-lg hover:bg-slate-50"
          >
            Agency Blog
          </button>
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
