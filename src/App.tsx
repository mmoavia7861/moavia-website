import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import websiteLinks from './data/githubProjects.json';
import { SITE_DEFAULTS, TOOL_ROUTES, mergeSiteSettings, safeHref, type PublicSiteSettings } from './siteConfig';
import { ArrowRight, ArrowUpRight, Code2, Github, Linkedin, Mail, Menu, ShieldCheck, X, Smartphone, ShoppingBag, Workflow, Sparkles, Globe2 } from 'lucide-react';

const AiToolsSection = lazy(() => import('./components/AiToolsSection').then(m => ({ default: m.AiToolsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));


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
  const [siteSettings, setSiteSettings] = useState<PublicSiteSettings>(SITE_DEFAULTS);
  const [managedServices, setManagedServices] = useState<Array<{slug:string;title:string;excerpt:string}>>([]);
  const [managedProjects, setManagedProjects] = useState<Array<{id:string;title:string;description:string;category:string}>>([]);
  useEffect(() => {
    // Public site uses a lightweight read-only endpoint, not Firebase Auth or
    // the Firestore browser SDK. Admin access is separate.
    const controller = new AbortController();
    void fetch('/api/public-site',{signal:controller.signal})
      .then(response=>{if(!response.ok)throw Error('Public content unavailable');return response.json();})
      .then((payload: {
        settings?:Partial<PublicSiteSettings>;
        services?:Array<{slug:string;title:string;excerpt:string}>;
        projects?:Array<{id:string;title:string;description:string;category:string}>;
      })=>{
        if(controller.signal.aborted)return;
        setSiteSettings(mergeSiteSettings(payload.settings));
        if(Array.isArray(payload.services)){
          setManagedServices(payload.services.filter(item=>
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) &&
            typeof item.title==='string' && typeof item.excerpt==='string'));
        }
        if(Array.isArray(payload.projects)){
          setManagedProjects(payload.projects.filter(item=>
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) &&
            typeof item.title==='string' && typeof item.description==='string'));
        }
      }).catch(()=>{/* Keep verified static fallback copy when the CMS is offline. */});
    return ()=>controller.abort();
  },[]);
  useEffect(()=>{
    if(siteSettings.seoTitle)document.title=siteSettings.seoTitle;
    const meta=document.querySelector('meta[name="description"]');
    if(meta&&siteSettings.seoDescription)meta.setAttribute('content',siteSettings.seoDescription);
  },[siteSettings.seoTitle,siteSettings.seoDescription]);
  const featuredServices = managedServices.length ? managedServices.map(s => ({
    title: s.title, description: s.excerpt, href: '/offerings/' + s.slug + '/'
  })) : [
    { title: 'Websites & E-commerce', description: 'Responsive business websites, storefronts, product pages and practical web applications.', href: '/web-development/' },
    { title: 'AI & Workflow Automation', description: 'Explore AI integrations, API-backed utilities and carefully scoped workflow automation.', href: '/ai-automations/' },
    { title: 'SEO & Website Improvements', description: 'Review search visibility, site structure, page performance and technical SEO opportunities.', href: '/hire-me/' },
  ];
  const publicProjects=[...websiteLinks,...managedProjects.filter(item=>
    !websiteLinks.some(original=>original.id===item.id))];
  const sections = [
    { label: 'Web', href: '/web-development/' },
    { label: 'Android', href: '/android-development/' },
    { label: 'AI Automation', href: '/ai-automations/' },
    { label: 'Certificates', href: '/certificates/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Tools', href: '/tools/' },
    { label: 'Services', href: '/hire-me/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ];
  const skillAreas = [
    { number:'01', title: 'Web Development', href: '/web-development/', text: 'Responsive websites and reliable interfaces shaped for real people.', tags: ['React', 'TypeScript', 'WordPress'], icon: Globe2 },
    { number:'02', title: 'E-commerce Websites', href: '/web-development/', text: 'Product pages, storefront journeys and online shopping experiences.', tags: ['Storefronts', 'Product UX', 'Responsive'], icon: ShoppingBag },
    { number:'03', title: 'Android Applications', href: '/android-development/', text: 'Mobile-first development and source-verifiable Android prototypes.', tags: ['Kotlin', 'Jetpack Compose', 'Learning'], icon: Smartphone },
    { number:'04', title: 'AI & Automation', href: '/ai-automations/', text: 'Practical AI-powered tools, integrations and workflow experiments.', tags: ['AI APIs', 'Make', 'Workflows'], icon: Workflow },
  ];
  return (
    <div className="portfolio-home min-h-screen bg-[#F8F9FD] text-[#18243A]">
      <a className="premium-skip-link" href="#homepage-title">Skip to main content</a>
      <header className="premium-header">
        <div className="premium-container premium-header-inner">
          <a href="/" aria-label="Moavia Hassan — homepage" className="premium-brand">
            <img src="/site-logo.png" width="46" height="46" alt="" className="premium-brand-mark" />
            <span>Moavia Hassan<small>Developer & Digital Creator</small></span>
          </a>
          <nav aria-label="Primary" className="premium-desktop-nav">
            {sections.filter(link => ['Projects','Web','Android','AI Automation','Certificates','About'].includes(link.label)).map(link =>
              <a key={link.label} href={link.href}>{link.label}</a>
            )}
          </nav>
          <div className="premium-header-actions">
            <a href="/tools/" className="premium-header-tools">Free tools</a>
            <a href="/contact/" className="premium-header-cta">Let's talk <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <button type="button" className="premium-menu-toggle" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-primary" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
        {mobileOpen &&
          <nav id="mobile-primary" aria-label="Mobile primary" className="premium-mobile-nav">
            {sections.map(link => <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
          </nav>}
      </header>

      {siteSettings.announcementEnabled && siteSettings.announcementText.trim() &&
        <div className="bg-[#18243A] text-white text-center text-sm font-semibold px-5 py-3" role="status">{siteSettings.announcementText}</div>}
      <main>
        <section className="premium-hero" aria-labelledby="homepage-title">
          <div className="premium-hero-aura" aria-hidden="true"></div>
          <div className="premium-container premium-hero-grid">
            <div className="premium-hero-content">
              <p className="premium-eyebrow"><span className="premium-status-dot"></span> PERSONAL DEVELOPER PORTFOLIO <span className="premium-eyebrow-divider">/</span> ISLAMABAD, PAKISTAN</p>
              <p className="premium-hero-intro">Hello, I'm Moavia Hassan <span aria-hidden="true">✳</span></p>
              <h1 id="homepage-title">{siteSettings.heroTitle}</h1>
              <p className="premium-hero-description">{siteSettings.heroDescription}</p>
              <div className="premium-hero-actions">
                <a href={safeHref(siteSettings.ctaHref) ? siteSettings.ctaHref : '/projects/'} className="premium-button premium-button-primary">{siteSettings.ctaLabel}<ArrowUpRight size={19} aria-hidden="true" /></a>
                <a href="/contact/" className="premium-button premium-button-ghost">Discuss a project <ArrowRight size={19} aria-hidden="true" /></a>
              </div>
              <div className="premium-hero-tags" aria-label="Main focus areas">
                <span>Web development</span><span>Online stores</span><span>AI & automation</span>
              </div>
            </div>
            <div className="premium-hero-visual">
              <div className="premium-orbit premium-orbit-one" aria-hidden="true"></div>
              <div className="premium-orbit premium-orbit-two" aria-hidden="true"></div>
              <figure className="premium-portrait">
                <img src="/moavia-hassan-portrait.webp" alt="Portrait of Moavia Hassan" width="440" height="550" fetchPriority="high" decoding="async" />
                <figcaption><span className="premium-portrait-name">Moavia Hassan</span><span className="premium-portrait-role">Web · Android · AI</span></figcaption>
              </figure>
              <div className="premium-float premium-float-code" aria-hidden="true"><Code2 size={20} /> <span>Building for the web</span></div>
              <div className="premium-float premium-float-ai" aria-hidden="true"><Sparkles size={19} /> <span>Exploring AI</span></div>
            </div>
          </div>
          <div className="premium-container premium-hero-footer">
            <span><strong>{websiteLinks.length}</strong> public portfolio projects</span>
            <span>Focused on thoughtful design and maintainable code</span>
            <a href="/about/">Get to know me <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="expertise" className="premium-expertise" aria-labelledby="expertise-heading">
          <div className="premium-container">
            <div className="premium-section-heading premium-section-heading-split">
              <div>
                <p className="premium-kicker">WHAT I BUILD</p>
                <h2 id="expertise-heading">Every good idea deserves<br /><em>a great digital experience.</em></h2>
              </div>
              <p>From responsive websites and online stores to Android prototypes and AI-powered workflows, here's where I focus my work and learning.</p>
            </div>
            <div className="premium-skills-grid">
              {skillAreas.map(area => {
                const Icon = area.icon;
                return (
                  <article key={area.title} className="premium-skill-card">
                    <div className="premium-skill-header"><span>{area.number} / EXPERTISE</span><span className="premium-skill-icon"><Icon size={25} strokeWidth={1.8} aria-hidden="true" /></span></div>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
                    <div className="premium-skill-tags">{area.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                    <a href={area.href} className="premium-skill-link">Explore focus area <ArrowUpRight size={18} aria-hidden="true" /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="premium-work" aria-labelledby="selected-projects-heading">
          <div className="premium-container">
            <div className="premium-section-heading premium-section-heading-split">
              <div>
                <p className="premium-kicker">SELECTED WORK / WEB & APP PROJECTS</p>
                <h2 id="selected-projects-heading">Proof is in <em>the projects.</em></h2>
              </div>
              <p>Explore public work, from helpful online tools to e-commerce websites and Android prototypes. Each project is described according to its actual development status.</p>
            </div>
            <div className="premium-project-grid">
              {[
                {title:'ToolsCresta',category:'ONLINE UTILITIES',subtitle:'Everyday tools, built for a simpler digital workflow.',href:'/projects/toolscresta/',visual:'tools',icon:Code2},
                {title:'Dr. Ali Hassan Health & Wellness',category:'E-COMMERCE WEBSITE',subtitle:'A product-focused storefront for a wellness brand.',href:'/projects/draliwellness/',visual:'store',icon:ShoppingBag},
                {title:'Android App Starter',category:'MOBILE PROTOTYPE',subtitle:'A Kotlin & Jetpack Compose starter — source project, not a published app.',href:'/projects/moavia-app/',visual:'mobile',icon:Smartphone}
              ].map(item => {
                const Icon = item.icon;
                return (
                  <article key={item.href} className={'premium-project-card premium-project-' + item.visual}>
                    <div className={'premium-project-visual premium-visual-' + item.visual} aria-hidden="true">
                      <div className="premium-preview-window">
                        <div className="premium-preview-chrome"><i></i><i></i><i></i><span>PORTFOLIO CONCEPT</span></div>
                        <div className="premium-preview-body">
                          <span className="premium-preview-icon"><Icon size={38} strokeWidth={1.5} /></span>
                          <div className="premium-preview-lines"><i></i><i></i><i></i></div>
                          <div className="premium-preview-tiles"><i></i><i></i><i></i></div>
                        </div>
                      </div>
                    </div>
                    <div className="premium-project-content">
                      <p className="premium-project-category">{item.category}</p>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                      <a href={item.href} className="premium-project-link">Explore project <ArrowUpRight size={19} aria-hidden="true" /></a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="premium-work-bottom">
              <p>All previews above are illustrative designs, not captured product screenshots.</p>
              <a href="/projects/" className="premium-text-link">View all Web/App Projects <ArrowRight size={19} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 border-y border-[#E7EAF2] bg-[#F8F9FD] py-16 sm:py-20" aria-labelledby="services-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#5265D8]">Freelance services · Scope agreed individually</p>
            <h2 id="services-title" className="mt-3 text-3xl sm:text-4xl font-extrabold">SEO &amp; Web Development Services</h2>
            <p className="mt-3 max-w-3xl text-[#52607A]">Discuss a practical project before hiring. These are areas I can review or scope, not promises of specific rankings, app launches or client outcomes.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredServices.map(service => (
                <article key={service.title} className="rounded-2xl border border-[#DCE3F2] bg-white p-6">
                  <h3 className="text-lg font-extrabold"><a href={service.href} className="hover:underline">{service.title}</a></h3>
                  <p className="mt-3 text-sm leading-7 text-[#52607A]">{service.description}</p>
                </article>
              ))}
            </div>
            <a href="/hire-me/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#5265D8] px-5 py-3 text-white font-bold hover:bg-[#4353BC]">Explore Services &amp; Discuss a Project <ArrowRight className="w-4 h-4" /></a>
          </div>
        </section>


        <section id="projects" className="premium-more-projects" aria-labelledby="more-projects-heading">
          <div className="premium-container">
            <div className="premium-section-heading premium-section-heading-split">
              <div>
                <p className="premium-kicker">PROJECT ARCHIVE</p>
                <h2 id="more-projects-heading">More things I've <em>worked on.</em></h2>
              </div>
              <p>Browse source-linked experiments and design prototypes, without invented client metrics or app releases.</p>
            </div>
            <div className="premium-more-grid">
              {publicProjects.filter(site => !['toolscresta', 'draliwellness', 'moavia-app'].includes(site.id)).slice(0, 6).map((site, index) => (
                <a href={'/projects/' + site.id + '/'} key={site.id} className="premium-more-item">
                  <span className="premium-more-number">0{index + 1}</span>
                  <span className="premium-more-copy"><strong>{site.title}</strong><small>{site.category}</small></span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="premium-more-footer"><a href="/projects/" className="premium-text-link">Browse the complete project directory <ArrowRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section id="about" className="premium-about" aria-labelledby="about-title">
          <div className="premium-container premium-about-grid">
            <div className="premium-about-intro">
              <p className="premium-kicker">A LITTLE ABOUT ME</p>
              <h2 id="about-title">Curious by nature.<br /><em>Focused on building.</em></h2>
              <p>I'm Moavia Hassan, a student developer based in Islamabad, Pakistan. I work on SEO, practical web tools, responsive websites and software projects while growing my skills in Android development and AI automation.</p>
              <p>I believe good software should feel easy to use, communicate clearly and be built with care. This site shares genuine public work rather than unverified agency claims.</p>
              <div className="premium-social-links">
                <a href={safeHref(siteSettings.socialGithub) ? siteSettings.socialGithub : SITE_DEFAULTS.socialGithub} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a>
                <a href={safeHref(siteSettings.socialLinkedin) ? siteSettings.socialLinkedin : SITE_DEFAULTS.socialLinkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a>
                <a href="/about/">Full story <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="premium-process">
              <p className="premium-process-label">MY APPROACH</p>
              {[
                ['01','Understand the problem','Start with real goals, users and constraints.'],
                ['02','Build deliberately','Work with thoughtful UI, maintainable code and sensible integrations.'],
                ['03','Test and improve','Review real behavior, accessibility and device performance.']
              ].map(step => <div className="premium-process-step" key={step[0]}>
                <span>{step[0]}</span>
                <div><h3>{step[1]}</h3><p>{step[2]}</p></div>
                <ArrowUpRight size={17} aria-hidden="true" />
              </div>)}
            </div>
          </div>
        </section>

        <section id="tools" className="scroll-mt-20 bg-white border-y border-[#E7EAF2] py-16 sm:py-20" aria-labelledby="featured-tools-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#5265D8]">Free browser-based utilities</p>
            <h2 id="featured-tools-heading" className="mt-3 text-3xl sm:text-4xl font-extrabold">Explore 3 practical SEO tools</h2>
            <p className="mt-3 max-w-3xl text-[#52607A]">Each tool has its own page and works with information you enter. No invented SEO audit scores.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {TOOL_ROUTES.map((href,i)=>({href,title:siteSettings.toolTitles[i],description:siteSettings.toolDescriptions[i],visible:siteSettings.toolVisible[i]})).filter(tool=>tool.visible).map(tool => (
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

        <section className="premium-final-cta" aria-labelledby="final-cta-heading">
          <div className="premium-container premium-final-inner">
            <div>
              <p className="premium-kicker">HAVE AN IDEA?</p>
              <h2 id="final-cta-heading">Let's build something <em>worth sharing.</em></h2>
              <p>Tell me about your website, store or software concept. We can discuss feasibility, scope and next steps.</p>
            </div>
            <div className="premium-final-actions">
              <a href="/contact/" className="premium-button premium-button-dark">Start a conversation <ArrowUpRight size={19} aria-hidden="true" /></a>
              <a href="/hire-me/" className="premium-final-secondary">Explore services <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <OnView id="contact" minHeight={480}><ContactSection initialService="Website Development / SEO Project" contactEmail={siteSettings.contactEmail} whatsappNumber={siteSettings.whatsapp} /></OnView>
      </main>

      <footer className="bg-[#18243A] text-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between gap-7">
            <div><p className="font-extrabold text-white">Moavia Hassan</p><p className="mt-2 text-sm text-slate-400">SEO Tools · Services · Web/App Projects · Islamabad, Pakistan</p><a href={'mailto:'+siteSettings.contactEmail} className="mt-3 inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"><Mail className="h-4 w-4" /> {siteSettings.contactEmail}</a></div>
            <nav aria-label="Footer" className="flex flex-wrap items-start gap-x-5 gap-y-3 text-sm">
              <a href="/web-development/" className="hover:text-white">Web</a><a href="/android-development/" className="hover:text-white">Android</a><a href="/ai-automations/" className="hover:text-white">AI Automations</a><a href="/certificates/" className="hover:text-white">Certificates</a><a href="/tools/" className="hover:text-white">Tools</a><a href="/hire-me/" className="hover:text-white">Services</a><a href="/projects/" className="hover:text-white">Projects</a><a href="/about/" className="hover:text-white">About</a><a href="/contact/" className="hover:text-white">Contact</a><a href="/hire-me/" className="hover:text-white">Hire Me</a><a href="/blog/" className="hover:text-white">Blog</a><a href="https://www.fiverr.com/moavia_seopro" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Fiverr freelancer profile (opens in new tab)">Fiverr</a><a href="https://www.upwork.com/freelancers/~01c3735023b2f296fa" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Upwork freelancer profile (opens in new tab)">Upwork</a>
            </nav>
          </div>
          <div className="mt-9 border-t border-slate-700 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <span>© {new Date().getFullYear()} Moavia Hassan</span>
            <div className="flex flex-wrap gap-4"><a href="/privacy-policy/" className="hover:text-white">Privacy Policy</a><a href="/terms-and-conditions/" className="hover:text-white">Terms & Conditions</a>
              <a href="/admin/" className="inline-flex items-center gap-1 hover:text-white" aria-label="Open secure administrator dashboard"><ShieldCheck className="h-3 w-3" /> Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
