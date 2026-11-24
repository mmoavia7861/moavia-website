/* Hire Me: truthful, self-contained service portfolio.
 * No fake metrics, client testimonials, inventory, pricing or guaranteed rankings.
 * Leads go to the existing homepage form, WhatsApp or email. */
const shot = (id, url, title, eager=false) =>
  '<span class="hire-premium-shot">'
  +'<img data-portfolio-shot src="/project-captures/'+id+'.jpg"'
  +' data-fallback-src="https://s.wordpress.com/mshots/v1/'+encodeURIComponent(url)+'?w=960"'
  +' alt="Captured homepage preview of '+title+'" width="1440" height="900"'
  +' loading="'+(eager?'eager':'lazy')+'" decoding="async" referrerpolicy="no-referrer">'
  +'<span data-portfolio-fallback hidden class="hire-premium-shot-fallback">Homepage screenshot temporarily unavailable. Open the live website to view the current project.</span>'
  +'</span>';

export function hireHero(){
 const url='https://toolscresta.com/';
 return [
  '<section class="hire-premium-hero" aria-labelledby="hire-premium-title">',
  '<div class="hire-premium-hero-grid" aria-hidden="true"></div>',
  '<div class="wrap hire-premium-hero-layout">',
  '<div class="hire-premium-hero-copy">',
  '<span class="hire-premium-eyebrow"><i aria-hidden="true"></i>WEB DEVELOPMENT · SEO · AUTOMATION</span>',
  '<h1 id="hire-premium-title">Your next digital project, <em>built with purpose.</em></h1>',
  '<p class="hire-premium-hero-lead">From a fast, polished website to a clearer search experience or a practical automation idea, let’s turn your requirements into a plan worth building.</p>',
  '<p class="hire-premium-hero-sub">I’m Moavia Hassan, an independent developer based in Islamabad. Every engagement starts with understanding the project, scope and feasibility.</p>',
  '<div class="hire-premium-hero-actions">',
  '<a class="hire-premium-btn hire-premium-btn--primary" href="/#contact">Start a project enquiry <span aria-hidden="true">↗</span></a>',
  '<a class="hire-premium-btn hire-premium-btn--secondary" href="#hire-services">Explore services <span aria-hidden="true">↓</span></a>',
  '</div>',
  '<div class="hire-premium-hero-highlights" aria-label="Working principles">',
  '<span><i aria-hidden="true"></i>Clear scope</span>',
  '<span><i aria-hidden="true"></i>Responsive design</span>',
  '<span><i aria-hidden="true"></i>Honest communication</span>',
  '</div></div>',
  '<div class="hire-premium-hero-visual" aria-label="Featured public web development project">',
  '<div class="hire-premium-visual-rings" aria-hidden="true"></div>',
  '<span class="hire-premium-float hire-premium-float--one" aria-hidden="true">&lt;/&gt; Web engineering</span>',
  '<span class="hire-premium-float hire-premium-float--two" aria-hidden="true">✦ Thoughtful UX</span>',
  '<a class="hire-premium-featured-browser" href="'+url+'" target="_blank" rel="noopener noreferrer" aria-label="Open ToolsCresta live website">',
  '<span class="hire-premium-browser-top" aria-hidden="true"><i></i><i></i><i></i><span>toolscresta.com</span></span>',
  shot('toolscresta',url,'ToolsCresta',true),
  '<span class="hire-premium-feature-label">LIVE PROJECT EXAMPLE <b>VIEW WEBSITE ↗</b></span>',
  '</a>',
  '</div>',
  '</div></section>'
 ].join('');
}

export function hireContent(){
 const services=[
  ['01','Websites &amp; e-commerce','Responsive business websites, WordPress or React interfaces, landing pages and storefront work.','Page structure · Responsive UI · Integrations','/web-development/','Explore web work'],
  ['02','SEO &amp; discoverability','Technical SEO checks, structured metadata, search-friendly architecture and practical site improvements.','Technical review · On-page SEO · Site quality','/tools/','Explore SEO tools'],
  ['03','AI tools &amp; automation','Useful AI features, API integrations and workflow ideas assessed for safety, cost and feasibility.','Workflow planning · APIs · AI utilities','/ai-automations/','Explore AI work'],
  ['04','Android &amp; app planning','Mobile interface design, Kotlin/Compose starter work and early-stage app requirements.','Mobile UI · App concepts · Prototyping','/android-development/','Explore Android work']
 ].map(([num,title,desc,tags,href,label])=>
  '<article class="hire-premium-service-card">'
  +'<span class="hire-premium-service-index">'+num+'</span>'
  +'<h3>'+title+'</h3><p>'+desc+'</p>'
  +'<span class="hire-premium-service-tags">'+tags+'</span>'
  +'<a href="'+href+'">'+label+' <span aria-hidden="true">↗</span></a>'
  +'</article>'
 ).join('');

 const projects=[
  ['toolscresta','ONLINE UTILITIES PLATFORM','ToolsCresta','A public collection of browser tools and document utilities. Explore the live experience and project details.','https://toolscresta.com/','/projects/toolscresta/'],
  ['draliwellness','E-COMMERCE WEBSITE','Dr. Ali Hassan Health &amp; Wellness','A health and wellness storefront with a responsive shopping experience and product pages.','https://draliwellness.com/','/projects/draliwellness/']
 ].map(([id,category,name,desc,url,details])=>
  '<article class="hire-premium-project-card">'
  +'<a class="hire-premium-project-visual" href="'+url+'" target="_blank" rel="noopener noreferrer" aria-label="Open '+name.replace('&amp;','and')+' live website">'
  +'<span class="hire-premium-browser-top" aria-hidden="true"><i></i><i></i><i></i><span>'+new URL(url).hostname+'</span></span>'
  +shot(id,url,name)
  +'</a>'
  +'<div class="hire-premium-project-copy"><span class="hire-premium-project-kicker">'+category+'</span>'
  +'<h3>'+name+'</h3><p>'+desc+'</p>'
  +'<div class="hire-premium-project-links"><a href="'+url+'" target="_blank" rel="noopener noreferrer">Visit live website ↗</a>'
  +'<a href="'+details+'">Project details →</a></div></div></article>'
 ).join('');

 const steps=[
  ['01','Share your brief','Describe the website, audience, goals and essential features. A current URL is helpful when available.'],
  ['02','Review the scope','We discuss feasibility, deliverables, priorities, the technology and any integrations.'],
  ['03','Agree before starting','Availability, pricing, timeline and scope are confirmed in writing before any paid work.']
 ].map(([num,title,desc])=>
  '<div class="hire-premium-process-step"><span>'+num+'</span><div><h3>'+title+'</h3><p>'+desc+'</p></div></div>'
 ).join('');

 const questions=[
  ['Do you offer fixed packages?','Projects are reviewed individually. The scope, cost and schedule depend on the features and requirements agreed in advance.'],
  ['Can you improve an existing website?','Yes, an existing site can be reviewed for design, responsive behavior, technical SEO and practical improvements. Access and technical feasibility are assessed first.'],
  ['Can we start with a small project?','You can send a focused brief for a landing page, site improvement or utility. We can discuss what is feasible within a clearly defined scope.']
 ].map(([q,a])=>'<details class="hire-premium-faq-item"><summary>'+q+'<span aria-hidden="true">+</span></summary><p>'+a+'</p></details>').join('');

 return [
  '<section id="hire-services" class="hire-premium-services" aria-labelledby="hire-services-title">',
  '<div class="hire-premium-section-head"><span class="hire-premium-kicker">SEO, Website &amp; Project Services</span>',
  '<h2 id="hire-services-title">Services for the ideas you want to bring to life.</h2>',
  '<p>Choose a starting point. Every request is evaluated for scope and technical feasibility rather than sold as a one-size-fits-all package.</p></div>',
  '<div class="hire-premium-service-grid">'+services+'</div></section>',
  '<section class="hire-premium-work" aria-labelledby="hire-work-title">',
  '<div class="hire-premium-section-head"><span class="hire-premium-kicker">REAL PROJECTS · REAL LINKS</span>',
  '<h2 id="hire-work-title">Explore public projects before we talk.</h2>',
  '<p>These are examples you can open yourself. The screenshots are public-homepage previews, not evidence of paid contracts, sales figures or guaranteed results.</p></div>',
  '<div class="hire-premium-project-grid">'+projects+'</div></section>',
  '<section class="hire-premium-process" aria-labelledby="hire-process-title">',
  '<div class="hire-premium-process-copy"><span class="hire-premium-kicker">A CLEAR WAY FORWARD</span>',
  '<h2 id="hire-process-title">Simple process.<br>Transparent scope.</h2>',
  '<p>Good work begins with clarity. There is no promised ranking or unverified performance claim, and delivery starts only after the requirements are understood.</p>',
  '<a href="/#contact" class="hire-premium-process-link">Share your project details ↗</a></div>',
  '<div class="hire-premium-process-list">'+steps+'</div></section>',
  '<section class="hire-premium-faq" aria-labelledby="hire-faq-title">',
  '<div class="hire-premium-section-head"><span class="hire-premium-kicker">FREQUENT QUESTIONS</span>',
  '<h2 id="hire-faq-title">Before you get in touch.</h2></div>',
  '<div class="hire-premium-faq-list">'+questions+'</div></section>',
  '<section class="hire-premium-last-cta" aria-labelledby="hire-final-title">',
  '<div><span class="hire-premium-last-kicker">LET’S DISCUSS YOUR IDEA</span>',
  '<h2 id="hire-final-title">Ready to make your next move?</h2>',
  '<p>Send your requirements, website URL and goals. I’ll review the enquiry personally, subject to availability. Please don’t share passwords or sensitive customer data.</p></div>',
  '<div class="hire-premium-last-actions">',
  '<a class="hire-premium-last-primary" href="/#contact">Send project enquiry ↗</a>',
  '<a class="hire-premium-last-outline" href="mailto:hello@moaviaseo.com?subject=Website%20or%20SEO%20project%20enquiry">Email directly →</a>',
  '</div></section>',
  '<section class="hire-premium-other-channels" aria-label="Other ways to connect">',
  '<p>Prefer a platform or chat? <a href="https://www.fiverr.com/moavia_seopro" target="_blank" rel="noopener noreferrer">Fiverr profile ↗</a>',
  '<a href="https://www.upwork.com/freelancers/~01c3735023b2f296fa" target="_blank" rel="noopener noreferrer">Upwork profile ↗</a>',
  '<a href="https://wa.me/923234313869?text=Hello%20Moavia%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>',
  '<a href="/contact/">Contact details →</a> <a href="/privacy-policy/">Privacy Policy →</a></p>',
  '</section>'
 ].join('');
}
