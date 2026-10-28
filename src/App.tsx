import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
const ServicesSection = lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })));

// Load only above-the-fold elements on initial visit. AI Studio and the
// Firebase Admin Portal are especially expensive and must not block LCP.
const AiToolsSection = lazy(() => import('./components/AiToolsSection').then(m => ({ default: m.AiToolsSection })));
const PortfolioSection = lazy(() => import('./components/PortfolioSection').then(m => ({ default: m.PortfolioSection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FounderSection = lazy(() => import('./components/FounderSection').then(m => ({ default: m.FounderSection })));
const PricingSection = lazy(() => import('./components/PricingSection').then(m => ({ default: m.PricingSection })));
const BlogSection = lazy(() => import('./components/BlogSection').then(m => ({ default: m.BlogSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget').then(m => ({ default: m.WhatsAppWidget })));
const AdminPortal = lazy(() => import('./components/admin/AdminPortal').then(m => ({ default: m.AdminPortal })));

type DeferredSectionProps = {
  id: string;
  label: string;
  children: React.ReactNode;
  minHeight?: number;
  eager?: boolean;
};

function DeferredSection({ id, label, children, minHeight = 220, eager = false }: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);
  useEffect(() => {
    if (visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '650px 0px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);
  return (
    <div id={id} ref={ref} style={!visible ? { minHeight } : undefined}>
      {visible ? (
        <Suspense fallback={<div className="py-16 text-center text-sm text-[#65738B]" role="status">Loading {label}…</div>}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('Search Engine Optimization (SEO)');

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Navbar onNavigate={handleNavigate} onOpenAdmin={() => setIsAdminOpen(true)} isAdminOpen={isAdminOpen} />
      <main className="flex-1">
        <div id="hero">
          <Hero
            onConsultationClick={() => handleNavigate('contact')}
            onExploreServicesClick={() => handleNavigate('services')}
            onOpenAiStudio={() => handleNavigate('ai-tools')}
          />
        </div>
        <DeferredSection id="services" label="services" minHeight={500}>
          <ServicesSection onSelectServiceForConsultation={handleSelectServiceForConsultation} />
        </DeferredSection>
        <DeferredSection id="ai-tools" label="AI Studio" minHeight={350}>
          <AiToolsSection />
        </DeferredSection>
        <DeferredSection id="portfolio" label="portfolio">
          <PortfolioSection />
        </DeferredSection>
        <DeferredSection id="testimonials" label="our process">
          <TestimonialsSection onConsultationClick={() => handleNavigate('contact')} />
        </DeferredSection>
        <DeferredSection id="founder" label="founder information">
          <FounderSection onDirectConsultation={() => handleNavigate('contact')} />
        </DeferredSection>
        <DeferredSection id="pricing" label="pricing">
          <PricingSection onSelectPlan={handleSelectPlan} />
        </DeferredSection>
        <DeferredSection id="blog" label="SEO guides">
          <BlogSection />
        </DeferredSection>
        <DeferredSection id="contact" label="contact form">
          <ContactSection initialService={prefilledService} />
        </DeferredSection>
      </main>
      <DeferredSection id="site-footer" label="footer" minHeight={160}>
        <Footer onNavigate={handleNavigate} onOpenAdmin={() => setIsAdminOpen(true)} />
      </DeferredSection>
      <DeferredSection id="whatsapp-support" label="contact widget" minHeight={0} eager>
        <WhatsAppWidget />
      </DeferredSection>
      {isAdminOpen && (
        <Suspense fallback={<div role="status" className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 text-[#18243A]">Loading secure admin portal…</div>}>
          <AdminPortal onClose={() => setIsAdminOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
