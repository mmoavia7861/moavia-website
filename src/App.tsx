import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import websiteLinks from './data/githubProjects.json';
import { ArrowRight, ArrowUpRight, Code2, Github, Linkedin, Mail, Menu, ShieldCheck, X } from 'lucide-react';

const AiToolsSection = lazy(() => import('./components/AiToolsSection').then(m => ({ default: m.AiToolsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const AdminPortal = lazy(() => import('./components/admin/AdminPortal').then(m => ({ default: m.AdminPortal })));

function OnView({ id, children, minHeight = 240 }: { id: string; children: React.ReactNode; minHeight?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '240px 0px' });
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, [visible]);
  return <div id={id} ref={host} style={!visible ? { minHeight } : undefined}>
    {visible && <Suspense fallback={<p className="py-10 text-center text-sm text-slate-500" role="status">Loading section…</p>}>{children}</Suspense>}
  </div>;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const sections = [
    { label: 'Tools', href: '/tools/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];
  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#18243A]">
      <header className="sticky top-0 z-40 border-b border-[#E7EAF2] bg-white/95 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-20 flex items-center justify-between gap-4">
          <a href="/" aria-label="Moavia Hassan - homepage" className="flex items-center gap-3 font-extrabold min-w-0">
            <img src="/site-logo.png" width="44" height="44" alt="" className="w-11 h-11 rounded-xl object-contain border border-[#E7EAF2]" />
            <span className="min-w-0 leading-tight"><span className="block text-base sm:text-lg">Moavia Hassan</span><span className="block text-[11px] font-semibold text-[#5265D8]">SEO Tools & Web Projects</span></span>
          </a>
          <nav aria-label="Primary" className="hidden sm:flex items-center gap-1 md:gap-4">
            {sections.map(link => <a key={link.label} href={link.href} className="rounded-lg px-2.5 py-2 text-sm font-semibold text-[#263854] hover:bg-[#EEF2FF] hover:text-[#4353BC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5265D8]">{link.label}</a>)}
          </nav>
          <button type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-primary" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} className="sm:hidden p-2 rounded-lg hover:bg-slate-100">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && <nav id="mobile-primary" aria-label="Mobile primary" className="sm:hidden px-4 pb-4 flex flex-col gap-1 border-t border-[#E7EAF2]">
          {sections.map(link => <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="py-3 px-3 rounded-lg font-semibold hover:bg-[#EEF2FF]">{link.label}</a>)}
        </nav>}
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-white to-[#E8F8F5] py-20 sm:py-28" aria-labelledby="homepage-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="inline-block rounded-full bg-white border border-[#DDE3F4] px-4 py-2 text-xs font-extrabold tracking-wide text-[#4353BC]">PERSONAL PORTFOLIO · ISLAMABAD, PAKISTAN</p>
              <h1 id="homepage-title" className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">Moavia Hassan: <span className="text-[#5265D8]">SEO Tools & Web Projects</span></h1>
              <p className="mt-6 max-w-2xl text-base sm:text-xl leading-relaxed text-[#52607A]">Explore practical SEO and web tools, browse public website projects, and see how I approach creating useful, accessible web experiences. The portfolio links to real project websites, not invented case studies.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/tools/" className="inline-flex items-center gap-2 rounded-xl bg-[#5265D8] px-5 py-3 font-bold text-white hover:bg-[#4353BC]">Explore Tools <ArrowRight className="w-4 h-4" /></a>
                <a href="/projects/" className="inline-flex items-center gap-2 rounded-xl border border-[#C9D1E7] bg-white px-5 py-3 font-bold text-[#18243A] hover:bg-[#F4F6FF]">View Projects <Code2 className="w-4 h-4" /></a>
                <a href="/hire-me/" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-[#4353BC] hover:underline">Hire Me <ArrowUpRight className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="scroll-mt-20 bg-white border-y border-[#E7EAF2] py-16 sm:py-20" aria-labelledby="featured-tools-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#5265D8]">Free browser-based utilities</p>
            <h2 id="featured-tools-heading" className="mt-3 text-3xl sm:text-4xl font-extrabold">Explore 3 practical SEO tools</h2>
            <p className="mt-3 max-w-3xl text-[#52607A]">Each tool has its own page and works with information you enter. No invented SEO audit scores.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: 'Meta Title & Description Checker', href: '/tools/meta-title-description-checker/', description: 'Check metadata and preview an illustrative search snippet.' },
                { title: 'JSON-LD Schema Generator', href: '/tools/json-ld-schema-generator/', description: 'Create FAQPage, Organization and Article structured data.' },
                { title: 'Robots.txt & XML Sitemap Generator', href: '/tools/robots-txt-sitemap-generator/', description: 'Create robots.txt and sitemap.xml from real URLs.' },
              ].map(tool => (
                <article key={tool.href} className="flex flex-col rounded-2xl border border-[#DCE3F2] bg-[#F8F9FD] p-6">
                  <h3 className="text-lg font-extrabold">{tool.title}</h3>
                  <p className="mt-3 mb-6 flex-1 text-sm leading-7 text-[#52607A]">{tool.description}</p>
                  <a href={tool.href} className="inline-flex items-center gap-2 font-bold text-[#4353BC] hover:underline">Open tool <ArrowRight className="w-4 h-4" /></a>
                </article>
              ))}
            </div>
            <a href="/tools/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#5265D8] px-5 py-3 font-bold text-white hover:bg-[#4353BC]">View All Tools <ArrowRight className="w-4 h-4" /></a>
          </div>
        </section>
        <OnView id="experiments" minHeight={540}><AiToolsSection /></OnView>

        <section id="projects" className="scroll-mt-20" aria-label="Website projects">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 text-center">
            <a href="/projects/" className="text-sm font-bold text-[#4353BC] underline underline-offset-4">Open the full projects directory</a>
          </div>
          <div className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#4353BC]">Real public links</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">Web projects</h2>
              <p className="mt-3 max-w-2xl text-[#52607A]">Browse website examples and tool projects. A public demo is not a claim that the project was a paid client engagement.</p>
              <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-5">
                {websiteLinks.map(site => <a key={site.id} href={`/projects/${site.id}/`} className="group block rounded-2xl border border-[#E7EAF2] bg-[#F8F9FD] p-6 hover:border-[#5265D8] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5265D8]">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#5265D8]">{site.category}</span>
                  <span className="mt-2 flex items-start justify-between gap-4 text-lg font-extrabold">{site.title}<ArrowUpRight className="h-5 w-5 shrink-0 text-[#5265D8]" /></span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#52607A]">{site.description}</span>
                  <span className="mt-3 block text-sm font-bold text-[#4353BC]">Read project brief, stack and results →</span>
                </a>)}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 border-t border-[#E7EAF2] py-20 sm:py-24" aria-labelledby="about-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[minmax(0,290px)_1fr] items-center gap-10 lg:gap-16">
            <figure className="rounded-3xl border border-[#E7EAF2] bg-white p-5 shadow-sm">
              <div className="aspect-square overflow-hidden rounded-2xl bg-[#EEF2FF] flex items-center justify-center">
                <img src="/moavia-hassan-portrait.webp" alt="Moavia Hassan professional headshot in a charcoal suit and white shirt" width="400" height="500" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-[#65738B]">Moavia Hassan · SEO tools and web projects</figcaption>
            </figure>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#5265D8]">About me</p>
              <h2 id="about-title" className="mt-3 text-3xl sm:text-4xl font-extrabold">Hi, I'm Moavia Hassan.</h2>
              <p className="mt-5 max-w-3xl text-[#52607A] leading-8">I'm based in Islamabad, Pakistan, and I work on SEO, useful online tools and website projects. This site brings my public projects, technical interests and contact information together in one place.</p>
              <p className="mt-3 max-w-3xl text-[#52607A] leading-8">My interests include technical SEO, on-page improvements, React websites, WordPress and user-friendly design. You can inspect the website links before contacting me about a project. I don't promise Google rankings or present unverified client results.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/moavia-hassan-seo/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#D8DEEF] bg-white px-4 py-3 font-bold text-sm hover:bg-[#EEF2FF]"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                <a href="https://github.com/mmoavia7861" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#D8DEEF] bg-white px-4 py-3 font-bold text-sm hover:bg-[#EEF2FF]"><Github className="h-4 w-4" /> GitHub</a>
                <a href="/about/" className="inline-flex items-center gap-2 px-3 py-3 font-bold text-sm text-[#4353BC] hover:underline">Read more <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-[#E7EAF2] py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-5">
            <div><h2 className="text-xl sm:text-2xl font-extrabold">Have a website project in mind?</h2><p className="mt-2 text-sm text-[#52607A]">See a short overview of the work I can discuss.</p></div>
            <a className="inline-flex items-center gap-2 rounded-xl bg-[#18243A] px-5 py-3 text-white font-bold hover:bg-[#2C4163]" href="/hire-me/">Hire Me <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>

        <OnView id="contact" minHeight={480}><ContactSection initialService="Website Development / SEO Project" /></OnView>
      </main>

      <footer className="bg-[#18243A] text-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between gap-7">
            <div><p className="font-extrabold text-white">Moavia Hassan</p><p className="mt-2 text-sm text-slate-400">SEO Tools · Web Projects · Islamabad, Pakistan</p><a href="mailto:hello@moaviaseo.com" className="mt-3 inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"><Mail className="h-4 w-4" /> hello@moaviaseo.com</a></div>
            <nav aria-label="Footer" className="flex flex-wrap items-start gap-x-5 gap-y-3 text-sm">
              <a href="/tools/" className="hover:text-white">Tools</a><a href="/projects/" className="hover:text-white">Projects</a><a href="/about/" className="hover:text-white">About</a><a href="/contact/" className="hover:text-white">Contact</a><a href="/hire-me/" className="hover:text-white">Hire Me</a><a href="/blog/" className="hover:text-white">Blog</a>
            </nav>
          </div>
          <div className="mt-9 border-t border-slate-700 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <span>© {new Date().getFullYear()} Moavia Hassan</span>
            <div className="flex flex-wrap gap-4"><a href="/privacy-policy/" className="hover:text-white">Privacy Policy</a><a href="/terms-and-conditions/" className="hover:text-white">Terms & Conditions</a>
              <button type="button" onClick={() => setAdminOpen(true)} className="inline-flex items-center gap-1 hover:text-white" aria-label="Open secure admin portal"><ShieldCheck className="h-3 w-3" /> Admin</button>
            </div>
          </div>
        </div>
      </footer>
      {adminOpen && <Suspense fallback={<p role="status" className="fixed inset-0 z-50 flex items-center justify-center bg-white">Loading admin portal…</p>}><AdminPortal onClose={() => setAdminOpen(false)} /></Suspense>}
    </div>
  );
}
