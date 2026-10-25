import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AiToolsSection } from './components/AiToolsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FounderSection } from './components/FounderSection';
import { PricingSection } from './components/PricingSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminPortal } from './components/admin/AdminPortal';
import { testFirestoreConnection } from './firebase';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('Search Engine Optimization (SEO)');

  useEffect(() => {
    // Validate Firestore connection on boot
    testFirestoreConnection();
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectServiceForConsultation = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    handleNavigate('contact');
  };

  const handleSelectPlan = (planName: string, category: string) => {
    setPrefilledService(`${category} — ${planName} Plan`);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] text-[#18243A]">
      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminOpen={isAdminOpen}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <div id="hero">
          <Hero
            onConsultationClick={() => handleNavigate('contact')}
            onExploreServicesClick={() => handleNavigate('services')}
            onOpenAiStudio={() => handleNavigate('ai-tools')}
          />
        </div>

        {/* Section 2: Core Agency Services Bento Grid */}
        <div id="services">
          <ServicesSection
            onSelectServiceForConsultation={handleSelectServiceForConsultation}
          />
        </div>

        {/* Section 3: Interactive Gemini AI Power Suite */}
        <div id="ai-tools">
          <AiToolsSection />
        </div>

        {/* Section 4: Verified Portfolio & Demonstration Projects */}
        <div id="portfolio">
          <PortfolioSection />
        </div>

        {/* Section 4b: Client Feedback & Success Stories Carousel */}
        <div id="testimonials">
          <TestimonialsSection
            onConsultationClick={() => handleNavigate('contact')}
          />
        </div>

        {/* Section 5: Meet The Founder (Moavia Hassan) */}
        <div id="founder">
          <FounderSection
            onDirectConsultation={() => handleNavigate('contact')}
          />
        </div>

        {/* Section 6: Transparent Pricing Packages */}
        <div id="pricing">
          <PricingSection onSelectPlan={handleSelectPlan} />
        </div>

        {/* Section 7: Technical SEO & Web Dev Blog */}
        <div id="blog">
          <BlogSection />
        </div>

        {/* Section 8: Consultation & Lead Generation Form */}
        <div id="contact">
          <ContactSection initialService={prefilledService} />
        </div>
      </main>

      {/* Agency Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppWidget />

      {/* Administrative Management Portal Modal */}
      {isAdminOpen && <AdminPortal onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}
