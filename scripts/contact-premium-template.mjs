/* Static portfolio contact presentation.
 * Links to the existing working React/Firebase project enquiry form at /#contact.
 * No duplicate form, external embeds, speculative response times or fake office. */
export function contactHero() {
  return [
    '<section class="contact-premium-hero" aria-labelledby="contact-premium-heading">',
    '<div class="contact-premium-grid" aria-hidden="true"></div>',
    '<div class="wrap contact-premium-hero-grid">',
    '<div class="contact-premium-copy">',
    '<span class="contact-premium-eyebrow"><i aria-hidden="true"></i>LET’S CONNECT · ISLAMABAD, PAKISTAN</span>',
    '<h1 id="contact-premium-heading">Let’s build something <em>worth sharing.</em></h1>',
    '<p class="contact-premium-lead">Have a website, e-commerce, SEO or automation idea? Tell me what you want to achieve and we can explore a practical next step.</p>',
    '<div class="contact-premium-actions">',
    '<a class="contact-premium-button contact-premium-button--mint" href="/#contact">Send a project enquiry <span aria-hidden="true">↗</span></a>',
    '<a class="contact-premium-button contact-premium-button--outline" href="mailto:hello@moaviaseo.com?subject=New%20project%20enquiry">Email directly <span aria-hidden="true">→</span></a>',
    '</div>',
    '<p class="contact-premium-hero-note">Independent developer · Online collaboration · No walk-in office</p>',
    '</div>',
    '<div class="contact-premium-hub" aria-label="Direct contact methods">',
    '<div class="contact-premium-hub-top">',
    '<span class="contact-premium-hub-symbol" aria-hidden="true">@</span>',
    '<span class="contact-premium-hub-head">YOUR NEXT STEP</span>',
    '<span class="contact-premium-hub-decoration" aria-hidden="true">✳</span>',
    '</div>',
    '<h2>Choose how to connect.</h2>',
    '<p>Pick the channel that works for you.</p>',
    '<div class="contact-premium-channel-list">',
    '<a class="contact-premium-channel" href="mailto:hello@moaviaseo.com?subject=Website%20or%20SEO%20project%20enquiry">',
    '<span class="contact-premium-channel-glyph contact-premium-channel-glyph--email" aria-hidden="true">@</span>',
    '<span class="contact-premium-channel-content"><strong>Email</strong><small>hello@moaviaseo.com</small></span>',
    '<span class="contact-premium-channel-arrow" aria-hidden="true">↗</span></a>',
    '<a class="contact-premium-channel" href="https://wa.me/923234313869?text=Hello%20Moavia%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">',
    '<span class="contact-premium-channel-glyph contact-premium-channel-glyph--chat" aria-hidden="true">↗</span>',
    '<span class="contact-premium-channel-content"><strong>WhatsApp</strong><small>+92 323 4313869</small></span>',
    '<span class="contact-premium-channel-arrow" aria-hidden="true">↗</span></a>',
    '<a class="contact-premium-channel" href="/#contact">',
    '<span class="contact-premium-channel-glyph contact-premium-channel-glyph--form" aria-hidden="true">✦</span>',
    '<span class="contact-premium-channel-content"><strong>Project enquiry form</strong><small>Share scope, needs and goals</small></span>',
    '<span class="contact-premium-channel-arrow" aria-hidden="true">→</span></a>',
    '</div>',
    '<div class="contact-premium-hub-footer"><span class="contact-premium-online-dot" aria-hidden="true"></span>',
    'Messages are reviewed personally; response times depend on availability.</div>',
    '</div></div></section>'
  ].join('');
}
export function contactContent(){
  const services=[
    ['01','Web &amp; e-commerce','Responsive websites, storefront interfaces and practical web functionality.','/web-development/'],
    ['02','SEO &amp; discoverability','Technical SEO, page structure and website reviews.','/hire-me/'],
    ['03','AI &amp; automation','Workflow ideas, API integration plans and AI-assisted utilities.','/ai-automations/'],
    ['04','Android &amp; app ideas','Early mobile concepts, UI prototypes and feasibility discussions.','/android-development/']
  ].map(([index,title,description,url])=>
    '<a class="contact-premium-focus-card" href="'+url+'"><span class="contact-premium-focus-index">'+index+'</span>'
    +'<h3>'+title+'</h3><p>'+description+'</p><span class="contact-premium-card-arrow" aria-hidden="true">↗</span></a>'
  ).join('');
  const steps=[
    ['01','Tell me the goal','Share your website link or idea, intended users and what you need help with.'],
    ['02','Discuss the scope','Review requirements, available technologies, feasibility and constraints.'],
    ['03','Agree on next steps','Confirm deliverables, availability, timelines and fees in writing if moving forward.']
  ].map(([num,title,description])=>
    '<div class="contact-premium-step"><span>'+num+'</span><div><h3>'+title+'</h3><p>'+description+'</p></div></div>'
  ).join('');
  return [
    '<section class="contact-premium-focus" aria-labelledby="contact-premium-focus-title">',
    '<div class="contact-premium-section-head"><span class="contact-premium-kicker">WHAT CAN WE DISCUSS?</span>',
    '<h2 id="contact-premium-focus-title">A good idea starts with a conversation.</h2>',
    '<p>Whether you need a website, a stronger search experience or help planning a digital product, send the details and we can discuss what is realistic.</p></div>',
    '<div class="contact-premium-focus-grid">'+services+'</div></section>',
    '<section class="contact-premium-bottom-grid" aria-labelledby="contact-premium-process-title">',
    '<div class="contact-premium-process"><span class="contact-premium-kicker">SIMPLE &amp; TRANSPARENT</span>',
    '<h2 id="contact-premium-process-title">How enquiries work.</h2>',
    '<div class="contact-premium-steps">'+steps+'</div></div>',
    '<div class="contact-premium-brief" aria-labelledby="contact-premium-brief-title">',
    '<span class="contact-premium-brief-art" aria-hidden="true">✳</span>',
    '<span class="contact-premium-kicker">GOT YOUR DETAILS READY?</span>',
    '<h2 id="contact-premium-brief-title">Start with a short project brief.</h2>',
    '<p>The existing enquiry form lets you include the service, budget, website URL and project goals. It opens in the contact section on the homepage.</p>',
    '<a class="contact-premium-brief-button" href="/#contact">Open project enquiry form <span aria-hidden="true">↗</span></a>',
    '<p class="contact-premium-privacy">Please do not send passwords, confidential customer information or payment card details. Read the <a href="/privacy-policy/">Privacy Policy</a>.</p>',
    '</div></section>',
    '<section class="contact-premium-footer-links" aria-labelledby="contact-premium-other-title">',
    '<div><span class="contact-premium-kicker">OTHER WAYS TO CONNECT</span>',
    '<h2 id="contact-premium-other-title">Prefer a freelance platform?</h2>',
    '<p>You can also check my public freelancer profiles and available services.</p></div>',
    '<div class="contact-premium-footer-actions">',
    '<a href="https://www.fiverr.com/moavia_seopro" target="_blank" rel="noopener noreferrer">Fiverr profile ↗</a>',
    '<a href="https://www.upwork.com/freelancers/~01c3735023b2f296fa" target="_blank" rel="noopener noreferrer">Upwork profile ↗</a>',
    '</div></section>'
  ].join('');
}
