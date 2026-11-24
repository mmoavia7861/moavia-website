/* Static, independently verifiable personal portfolio content.
 * Biography copy does not claim paid clients, completed certifications or launched apps. */
export function aboutProfileHero() {
  return [
    '<section class="about-profile-hero" aria-labelledby="about-profile-heading">',
    '<div class="wrap about-profile-hero-grid">',
    '<div class="about-profile-hero-copy">',
    '<span class="about-profile-eyebrow">Student developer · Islamabad, Pakistan</span>',
    '<h1 id="about-profile-heading">About Moavia Hassan<em>Building with purpose.</em></h1>',
    '<p class="about-profile-hero-lead">I create responsive websites, practical online tools and SEO-focused digital experiences, while growing my skills in Android development and AI automation.</p>',
    '<p class="about-profile-hero-detail">My approach combines thoughtful design, real-world problem solving and learning through public projects. I would rather share working examples than promise results I cannot verify.</p>',
    '<div class="about-profile-hero-chips" aria-label="Focus areas"><span>Web &amp; e-commerce</span><span>Technical SEO</span><span>Android learning</span><span>AI workflow experiments</span></div>',
    '<div class="about-profile-hero-actions"><a class="about-profile-button about-profile-button--primary" href="/projects/">Explore my projects ↗</a>',
    '<a class="about-profile-button about-profile-button--secondary" href="/contact/">Start a conversation →</a></div></div>',
    '<div class="about-profile-photo-shell"><figure class="about-profile-photo">',
    '<img src="/moavia-hassan-portrait.webp" alt="Professional portrait of Moavia Hassan wearing a charcoal suit and white shirt" width="440" height="550" fetchpriority="high" decoding="async">',
    '<figcaption><strong>Moavia Hassan</strong><span>Web · SEO · Creative technology</span></figcaption></figure>',
    '<span class="about-profile-floating-note" aria-hidden="true">Design · Build · Improve</span></div>',
    '</div></section>'
  ].join('');
}
export function aboutProfileContent(){
  const focus=[
    ['01','Web development','Responsive websites, clear user interfaces, React, TypeScript and accessible web experiences.','/web-development/','Web development'],
    ['02','Technical SEO','Metadata, crawlability, information architecture and practical browser-based SEO tools.','/tools/','SEO tools'],
    ['03','Android development','Kotlin and Jetpack Compose learning, with a source-verifiable starter and a separate UI preview.','/android-development/','Android portfolio'],
    ['04','AI automation','APIs, AI-assisted utilities and experiments in reliable workflows with human review.','/ai-automations/','AI experiments']
  ].map(([id,title,description,href,label])=>
    '<article class="about-profile-focus-card"><span aria-hidden="true">'+id+'</span><h3>'+title+'</h3>'
    +'<p>'+description+'</p><a href="'+href+'">'+label+' →</a></article>'
  ).join('');
  const featured=[
    ['LIVE WEB PLATFORM','ToolsCresta — Online Utilities','An everyday tools platform with browser utility interfaces. Specific integrations and service availability should be checked on the live site.','https://toolscresta.com/','/projects/toolscresta/'],
    ['LIVE E-COMMERCE PROJECT','Dr. Ali Hassan Health & Wellness','A health and wellness storefront project with product-focused pages, navigation and responsive website design.','https://draliwellness.com/','/projects/draliwellness/']
  ].map(([kicker,title,description,live,detail])=>
    '<article class="about-profile-proof-card"><span class="about-profile-mini-label">'+kicker+'</span>'
    +'<h3>'+title+'</h3><p>'+description+'</p>'
    +'<div class="about-profile-proof-links"><a href="'+live+'" target="_blank" rel="noopener noreferrer">Visit live website ↗</a>'
    +'<a href="'+detail+'">Project details →</a></div></article>'
  ).join('');
  const process=[
    ['01','Understand','Start with the audience, the actual problem and the scope.'],
    ['02','Design & develop','Build purposeful interfaces and choose appropriate integrations.'],
    ['03','Test & refine','Check responsiveness, accessibility, real behavior and performance.']
  ].map(([num,title,description])=>
    '<div class="about-profile-method-step"><span>'+num+'</span><div><h3>'+title+'</h3><p>'+description+'</p></div></div>'
  ).join('');
  return [
    '<section aria-labelledby="about-profile-focus-title"><div class="about-profile-section-head">',
    '<span class="about-profile-label">WHAT I WORK ON</span>',
    '<h2 id="about-profile-focus-title">Different disciplines. One practical mindset.</h2>',
    '<p>I connect web development, SEO and intelligent workflows to build useful digital experiences. Exploration-stage work is labeled clearly.</p></div>',
    '<div class="about-profile-focus-grid">'+focus+'</div></section>',
    '<section aria-labelledby="about-profile-work-title"><div class="about-profile-section-head">',
    '<span class="about-profile-label">SELECTED PUBLIC WORK</span>',
    '<h2 id="about-profile-work-title">Projects you can explore for yourself.</h2>',
    '<p>These public examples are not presented as guarantees of search rankings, verified sales, paid client relationships or advertising returns.</p></div>',
    '<div class="about-profile-proof-grid">'+featured+'</div></section>',
    '<section class="about-profile-method" aria-labelledby="about-profile-method-title">',
    '<div class="about-profile-section-head"><span class="about-profile-label">HOW I WORK</span>',
    '<h2 id="about-profile-method-title">Build thoughtfully. Test carefully.</h2>',
    '<p>Good projects start with clarity and improve through testing, iteration and useful feedback.</p></div>',
    '<div class="about-profile-method-list">'+process+'</div></section>',
    '<section class="about-profile-contact" aria-labelledby="about-profile-contact-title">',
    '<div><h2 id="about-profile-contact-title">Have something in mind?</h2>',
    '<p>Tell me about a website, online store, SEO challenge or automation idea. We can explore feasibility, requirements and next steps.</p></div>',
    '<div class="about-profile-contact-links"><a href="/contact/">Get in touch ↗</a><a href="/hire-me/">Explore services →</a></div></section>',
    '<nav class="about-profile-social" aria-label="Professional profiles">',
    '<a href="https://github.com/mmoavia7861" target="_blank" rel="noopener noreferrer">GitHub ↗</a>',
    '<a href="https://www.linkedin.com/in/moavia-hassan-seo/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>',
    '<a href="https://www.fiverr.com/moavia_seopro" target="_blank" rel="noopener noreferrer">Fiverr ↗</a>',
    '<a href="https://www.upwork.com/freelancers/~01c3735023b2f296fa" target="_blank" rel="noopener noreferrer">Upwork ↗</a>',
    '<a href="mailto:hello@moaviaseo.com">Email ↗</a></nav>'
  ].join('');
}
