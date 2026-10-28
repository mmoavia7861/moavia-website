import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Run after scripts/generate-seo-pages.mjs and before Vite.
const root = join(process.cwd(), 'public');
const host = 'https://moaviaseo.com';
const date = '2026-10-28';
const dateText = '28 October 2026';
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const par = s => '<p>'+esc(s)+'</p>';
const a = (href,name) => '<a href="'+esc(href)+'">'+esc(name)+'</a>';
const content = [
 {path:'/about/',title:'About Moavia SEO Pro | SEO Agency Islamabad',name:'About Moavia SEO Pro',
 intro:'Moavia SEO Pro is an Islamabad-based digital services website founded by Moavia Hassan. We present technical SEO, content and local search guidance, web development and paid marketing services to businesses looking for a clear plan.',
 sections:[
 ['Who we are','Moavia SEO Pro is based in Islamabad, Pakistan. Our website provides service information and educational material about search optimization, responsive websites and measurable advertising. We can discuss projects with clients in Pakistan and other locations. We do not claim a publicly staffed storefront.'],
 ['Our services','Our listed services include technical and on-page SEO, local SEO guidance, AEO and AI-search content, AI-assisted websites, custom WordPress websites, Meta Ads and Google Ads strategy. Project details, timelines, budgets and deliverables are agreed separately for each enquiry.'],
 ['How we approach projects','A useful starting point is the existing website, audience and business objective. We review discoverability, actual site experience, page content, contact pathways and available measurement. We explain what is known, what needs testing, and which work has the highest practical priority.'],
 ['Transparency and results','No agency can guarantee Google search positions, inclusion in AI-generated search answers or advertising revenue. Illustrative calculators and conceptual portfolio demonstrations are not client results. Verified reviews and case studies should only be published with evidence and permission.'],
 ['Editorial information','Our guides aim to explain technical concepts with practical checklists and links to source documentation. Product rules change over time; readers should confirm relevant details with the platform responsible. Our articles are educational and not individual legal, financial or security advice.'],
 ['Contact the agency','For services, corrections, questions or privacy enquiries, email moaviahassan124@gmail.com or use the contact section at https://moaviaseo.com/#contact. The site also provides a WhatsApp contact route.']
 ],extra:[['Services','/services/seo/'],['Read articles','/blog/'],['Contact','/#contact']]},
 {path:'/privacy-policy/',title:'Privacy Policy | Moavia SEO Pro',name:'Privacy Policy',
 intro:'This policy describes the information that may be processed when visiting moaviaseo.com, sending an enquiry, subscribing to updates, signing in to administrative features, or choosing to use interactive AI tools. Last updated: 28 October 2026.',
 sections:[
 ['Who manages this website','Moavia SEO Pro is based in Islamabad, Pakistan. Questions about privacy, information you submitted, correction or deletion requests can be sent to moaviahassan124@gmail.com. We may verify requests before acting on records.'],
 ['Information you provide','The consultation form may collect your full name, work email, phone or WhatsApp number, business name, website address, chosen service, budget and project description. We use this information to respond and manage enquiries. The optional newsletter subscription collects an email address to maintain an updates list. Please do not submit passwords, payment card details or unnecessary sensitive information.'],
 ['AI and SEO tools','If you deliberately use the AI Studio tools, your prompt, URLs or submitted text may be processed by our Cloudflare Worker backend and, for AI-powered responses, by Google Gemini services. A URL audit may retrieve publicly accessible website HTML. Avoid sending confidential data or credentials. AI outputs can be inaccurate and should be independently reviewed.'],
 ['Hosting, Firebase and technical information','We use Cloudflare to host and serve the website and API requests. Firebase and other Google services support some contact, newsletter and administrative functions. These providers may process information necessary for their operations, such as network addresses, browser and request details, sign-in information or submitted records. Providers may process data outside your country.'],
 ['Cookies and similar technologies','Cloud services and authentication features may use cookies, browser storage and related identifiers for essential functionality, safety, or diagnostics. You can control website storage in your browser, although blocking essential functions may affect sign-in or tools. We do not represent that all third-party providers set no cookies.'],
 ['Google advertising disclosures','Google AdSense advertising is not represented as active on this website at the date of this policy. If advertising is added, third-party vendors, including Google, may place or read cookies, use web beacons, IP addresses or other identifiers and serve ads based on visits to this or other websites. Google and its partners may use advertising cookies for personalized advertising. Visitors can manage personalized ads via Google Ad Settings or My Ad Center. The policy and any legally required consent mechanisms must be reviewed before ads or new tracking are activated.'],
 ['Retention and security','Enquiries and newsletter subscriptions may be retained while needed to respond, operate the relevant service, address recordkeeping needs or comply with applicable requirements. We do not promise a fixed deletion schedule. Please request a review or deletion by email. We apply reasonable access safeguards but cannot promise absolute security for internet systems.'],
 ['Your choices and requests','You can choose not to fill optional fields, ask about personal information associated with your submission, request correction or deletion when applicable, or ask to stop newsletter messages through the contact email above. Your legal rights may depend on your location.'],
 ['External sites and policy updates','Links to other websites, including WhatsApp, LinkedIn and platform documentation, have their own policies. We may revise this policy when technologies or business practices change and will update the date shown above.']
 ],extra:[['About','/about/'],['Contact','/#contact'],['Google Privacy Policy','https://policies.google.com/privacy'],['Google advertising policies','https://policies.google.com/technologies/ads']]},
 {path:'/terms-and-conditions/',title:'Terms & Conditions | Moavia SEO Pro',name:'Terms & Conditions',
 intro:'These terms apply to your use of the public pages and optional interactive tools on moaviaseo.com. Last updated: 28 October 2026.',
 sections:[
 ['Use of the website','You may read public content, share links and use tools for lawful activities. Do not attempt unauthorized access, interfere with security or hosting, overload the service, submit malicious content or misuse other people’s information.'],
 ['Educational information','SEO, AEO, GEO, website development and advertising explanations are general educational information, not tailored professional or regulated advice. They can be incomplete or become outdated as platforms change.'],
 ['No guaranteed outcomes','Search rankings, Google AdSense approval, AI answer citations, sales, campaign returns and PageSpeed scores depend on external systems and real conditions. Content and calculators here do not guarantee any particular result.'],
 ['AI tools and data you submit','You are responsible for ensuring you have permission to submit information or inspect a public website URL. AI-generated suggestions may be wrong. Review them carefully before publishing or running changes; do not provide passwords or confidential personal information.'],
 ['Consultations and project contracts','Sending a consultation form does not create a paid project contract. The scope, delivery plan, pricing, deadlines, payment schedule and any warranties must be separately agreed in writing before work begins.'],
 ['Content ownership and third-party links','Original site materials and branding may not be copied and presented as your own without permission. Other brands, platforms and trademarks belong to their respective owners. External links are provided for context, not as a guarantee or endorsement of everything on those sites.'],
 ['Availability and limitations','We may update the website, change features or apply usage limits. We aim for reliable content but do not promise continuous availability or error-free tools. Any liability limitations apply only to the extent permitted by applicable law.'],
 ['Questions and revisions','Contact moaviahassan124@gmail.com for questions about using the website or a proposed paid service. We may update these general website terms and will show a revised date. They should be reviewed for the business’s actual contracting and legal needs.']
 ],extra:[['Privacy Policy','/privacy-policy/'],['About us','/about/'],['Contact','/#contact']]}
];

const articles = [
 {slug:'technical-seo-playbook-2026',name:'Technical SEO in 2026: A Practical Audit Checklist',desc:'A practical guide to indexing, canonical URLs, sitemap checks, internal linking, mobile performance and structured data.',topic:'Technical SEO',
 sections:[
 ['Check indexing before making assumptions','Search Console URL Inspection tells you whether a URL can be accessed and whether Google has indexed it. A successful live test is not the same as an indexed page. Monitor the actual Google Index status, HTTP responses and server redirects.','Check for accidental noindex directives, blocked paths and canonical links that point to another URL. A sitemap assists discovery but does not force indexing.'],
 ['Make useful service pages discoverable','A clear service page should answer who a service helps, what it includes, how it is delivered and how the customer can contact the provider. Give genuinely different services separate URLs.','Link pages from navigational areas and related articles. Avoid creating near-identical location pages with only city names changed. Google rewards useful information rather than keyword repetition.'],
 ['Measure user experience correctly','Core Web Vitals include Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift. Good field thresholds are LCP at most 2.5 seconds, INP at most 200 milliseconds, and CLS at most 0.1 at the 75th percentile.','Reduce oversized images and render-blocking resources, reserve image dimensions and defer optional UI. Compare mobile and desktop on fresh tests and review actual field data when available.'],
 ['Use accurate structured data','Organization, Service, BreadcrumbList and BlogPosting markup can clarify content when the markup agrees with what visitors see. It cannot create legitimate reviews, rankings or guarantees out of thin air.','Test JSON-LD syntax, keep author and publication data accurate, and do not assume valid markup automatically results in a rich result.'],
 ['Create a repeatable launch routine','For each important page, verify its canonical HTTPS URL, status code, metadata, H1, internal links, sitemap inclusion and mobile experience. Document the result instead of relying on a single score.','Track search impressions, clicks and relevant enquiries over time. Improvements can take time to be crawled and reflected in search results.']
 ],sources:[['Google SEO Starter Guide','https://developers.google.com/search/docs/fundamentals/seo-starter-guide'],['Core Web Vitals','https://web.dev/articles/vitals'],['Google recrawling guidance','https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl']]},
 {slug:'ai-generated-websites-human-engineering',name:'AI-Assisted Websites: Why Human Review Still Matters',desc:'A practical guide to reviewing AI-generated website code for SEO, accessibility, privacy, security and page speed.',topic:'Web Development',
 sections:[
 ['Start with the business requirement','AI tools can draft layouts, code and content, but they do not know what is true about your business unless reliable information is supplied. Define the audience, contact pathway, required pages and intended outcomes before starting.','Remove invented case studies, customer reviews and certifications. Label demonstrations accurately and keep website claims consistent with real capabilities.'],
 ['Check technical security','Public JavaScript must not contain server API secrets or private access keys. Sensitive operations belong behind appropriate authentication and permission checks.','Validate form submissions and use rate limits where necessary. Collect only the information needed for the stated purpose and explain who processes it.'],
 ['Test accessibility beyond automation','Use an accessible name for every control. Visible labels should be associated with form inputs, dialogs should be manageable using a keyboard, and focus indicators should be clear.','Automated audits detect many problems but cannot prove that every interaction works well for keyboard and screen-reader users. Manual testing remains important.'],
 ['Protect speed and indexability','Heavy libraries, images and interactive widgets should not automatically load on the first screen when they are only needed near the bottom. Provide responsive images and reserve dimensions to avoid shifts.','Important blog articles and service pages should have distinct crawlable URLs and useful HTML. Repeated JavaScript-only modal content is less straightforward to share and discover.'],
 ['Deploy and verify','Use source control, automated build checks and a deployment rollback plan. Test real links, static files, site search previews and 404 responses after launch.','Track genuine site performance and enquiries. A fast coding workflow does not guarantee a fast or secure production website without verification.']
 ],sources:[['Google JavaScript SEO','https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics'],['Learn Accessibility','https://web.dev/learn/accessibility'],['OWASP Top 10','https://owasp.org/www-project-top-ten/']]},
 {slug:'mastering-meta-ads-capi-cro',name:'Meta Ads and Conversions API: What to Measure First',desc:'Understand Meta Ads conversion tracking, event deduplication, privacy, and landing-page conversion optimization.',topic:'Paid Social',
 sections:[
 ['Define a useful conversion','Before configuring campaigns, decide what counts as a real outcome: a qualified lead, confirmed order, booking or useful enquiry. A button click is not necessarily a business result.','Align the promise in the ad with the landing page. Clear information, working forms and realistic claims matter more than extra visual effects.'],
 ['Understand server-side event tracking','Meta Conversions API supports sending selected business or web events from server-side systems. It can complement browser tracking but cannot guarantee lower acquisition costs.','If both Pixel and Conversions API report the same event, use the platform’s documented event matching and deduplication methods. Otherwise reports may overcount results.'],
 ['Respect visitors and their data','Advertising identifiers, cookies and server-side measurement may require notices or consent depending on applicable law. Describe data collection accurately in the website privacy policy.','Avoid sending unrelated personal details, passwords or confidential content. Review the platform’s requirements rather than copying a tracking setup blindly.'],
 ['Improve landing-page experience','Test your form on a slow mobile connection, verify error handling and confirmation messages, and monitor duplicate requests. Small problems can waste expensive ad traffic.','Measure quality of leads as well as conversion counts. Test creative and page changes thoughtfully so you can understand which updates are actually helpful.'],
 ['Report performance with context','Compare outcomes against an agreed baseline, time window and budget. Cost per lead is different from cost per qualified lead or acquired customer.','Competition, offer quality, market conditions and measurement accuracy can all change results. No agency can promise a fixed return.']
 ],sources:[['Meta Conversions API documentation','https://developers.facebook.com/docs/marketing-api/conversions-api/'],['Meta Business Help','https://www.facebook.com/business/help'],['Google Ads landing page experience','https://support.google.com/google-ads/answer/2404197']]},
 {slug:'local-seo-google-maps-3pack',name:'Local SEO in Islamabad: Google Maps and Business Eligibility',desc:'Understand Google Business Profile eligibility, service areas, relevant local content and honest reviews.',topic:'Local SEO',
 sections:[
 ['Check Google Business Profile eligibility','Google requires an eligible business with in-person customer contact. A website operating completely online does not automatically qualify for a business profile.','Use a real location and operating model when eligible. A virtual office or mailbox that is not genuinely staffed should not be represented as a storefront.'],
 ['Keep business facts accurate','Use the business’s actual name, appropriate category, hours, service area, website and contact method. Clear details help customers decide whether a business meets their needs.','Do not post fake photographs of premises or team members. Keep service information current as business offerings change.'],
 ['Publish useful geographic information','A service page for Islamabad should explain what is available locally, which customer needs it addresses and how the business provides the service.','Avoid producing many nearly identical city pages that exist only to capture keyword variations. Visitors need more than a location name in a headline.'],
 ['Collect genuine feedback','Invite real customers to share honest experiences, within Google’s platform rules. Do not buy reviews or invent testimonials to improve perceived credibility.','Respond to useful questions professionally and keep the profile current. Review content should not be misrepresented using fabricated schema markup.'],
 ['Measure the outcome, not just a position','Local result visibility can vary by the searcher’s location, device, query and Google systems. A single screenshot is not a reliable ranking guarantee.','Where possible, monitor meaningful calls, directions, messages and qualified website enquiries in addition to search impressions.']
 ],sources:[['Google Business Profile eligibility','https://support.google.com/business/answer/13763036'],['Improve local ranking','https://support.google.com/business/answer/7091'],['Google Search Essentials','https://developers.google.com/search/docs/essentials']]},
 {slug:'image-video-resolution-cro',name:'Marketing Images and Videos: Quality Without Slow Pages',desc:'How to balance high-quality marketing visuals with responsive images, accessibility, loading speed and clear messaging.',topic:'Creative Strategy',
 sections:[
 ['Use visuals with a clear purpose','A useful product image explains a product; a service screenshot demonstrates a real process; a portrait should not pretend to be a verified real person when it is an illustration.','Do not present stock images as evidence of project outcomes or real client workplaces. Transparent captions make it easier to trust the surrounding content.'],
 ['Pick efficient dimensions and formats','A 2.5 MB image is rarely appropriate as a small mobile thumbnail. Use responsive sizes and modern formats such as WebP or AVIF when supported.','Compare the compression quality of important visuals and keep a suitable fallback. Preserve enough detail for a customer to understand the subject.'],
 ['Protect the first screen','Images above the fold may influence Largest Contentful Paint. Give important images appropriate priority and reserve their dimensions to minimize layout shifts.','Images far below the initial screen can generally load lazily, but confirm the results with a fresh PageSpeed test instead of assuming a technique works everywhere.'],
 ['Keep video accessible','Include captions or text context when appropriate and give users clear playback controls. Avoid surprising autoplay audio or unnecessarily heavy video downloads.','Test the viewing experience on a mobile connection as well as on desktop. Short, useful information may be more valuable than a long decorative animation.'],
 ['Test actual results','Compare meaningful enquiries or task completion, not just image clicks. A relevant lightweight image may convert better than an attractive but unrelated video.','Speed, clarity, credibility and a direct call to action work together. Resolution alone does not guarantee conversions.']
 ],sources:[['Responsive images','https://web.dev/learn/images/responsive-images'],['Image performance','https://web.dev/learn/performance/image-performance'],['Accessible images','https://www.w3.org/WAI/tutorials/images/']]}
];

const allPaths=[...content.map(p=>p.path),'/blog/',...articles.map(p=>'/blog/'+p.slug+'/')];
const commonLinks='<nav aria-label="Site navigation"><a href="/">Home</a><a href="/services/seo/">Services</a><a href="/blog/">Blog</a><a href="/about/">About</a><a href="/#contact">Contact</a></nav>';
const footer='<footer><div class="wrap"><div><strong>Moavia SEO Pro</strong><p>Islamabad, Pakistan</p></div><div>'+[['About Us','/about/'],['Blog','/blog/'],['Privacy Policy','/privacy-policy/'],['Terms & Conditions','/terms-and-conditions/']].map(([name,href])=>a(href,name)).join(' · ')+'</div><div><a href="mailto:moaviahassan124@gmail.com">Contact by email</a></div></div></footer>';
const schemaText = x => JSON.stringify(x).replace(/</g,'\\u003c');
function layout(info,inner){
 const url=host+info.path;const article=info.type==='article';
 const entity=article?{'@type':'BlogPosting',headline:info.name,description:info.desc,datePublished:date,dateModified:date,
   mainEntityOfPage:url,author:{'@type':'Organization',name:'Moavia SEO Pro Editorial Team',url:host+'/about/'},
   publisher:{'@type':'Organization',name:'Moavia SEO Pro',url:host+'/'}}
   :{'@type':info.path==='/about/'?'AboutPage':info.path==='/blog/'?'CollectionPage':'WebPage',name:info.name,url,description:info.desc};
 const crumbs=[{'@type':'ListItem',position:1,name:'Home',item:host+'/'}];
 if(article)crumbs.push({'@type':'ListItem',position:2,name:'Blog',item:host+'/blog/'});
 crumbs.push({'@type':'ListItem',position:article?3:2,name:info.name,item:url});
 const json=schemaText({'@context':'https://schema.org','@graph':[entity,{'@type':'BreadcrumbList',itemListElement:crumbs}]});
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
  +'<title>'+esc(info.name)+' | Moavia SEO Pro</title><meta name="description" content="'+esc(info.desc)+'">'
  +'<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="'+esc(url)+'">'
  +'<meta property="og:site_name" content="Moavia SEO Pro"><meta property="og:type" content="'+(article?'article':'website')+'">'
  +'<meta property="og:title" content="'+esc(info.name)+'"><meta property="og:description" content="'+esc(info.desc)+'">'
  +'<meta property="og:url" content="'+esc(url)+'"><link rel="stylesheet" href="/seo/pages.css">'
  +'<link rel="stylesheet" href="/blog/editorial.css"><script type="application/ld+json">'+json+'</script></head><body>'
  +'<header><div class="wrap"><a class="brand" href="/"><img src="/assets/aistudio/moavia_seopro_logo_720x720_10966138.png" alt="" width="42" height="42">Moavia SEO Pro</a>'+commonLinks+'</div></header>'
  +'<main><div class="wrap subnav">'+a('/','Home')+' / '+(article?a('/blog/','Blog')+' / ':'')+esc(info.name)+'</div>'
  +'<div class="hero"><div class="wrap"><span class="pill">'+esc(info.topic||'Moavia SEO Pro')+'</span><h1>'+esc(info.name)+'</h1>'
  +(info.intro?par(info.intro):'')+(article?'<p class="note">Published <time datetime="'+date+'">'+dateText+'</time> · By <a href="/about/">Moavia SEO Pro Editorial Team</a></p>':'')
  +'</div></div><div class="wrap editorial-content">'+inner+'</div></main>'+footer+'</body></html>\n';
}
function save(path,html) {
 const d=join(root,path.replace(/^\/|\/$/g,''));mkdirSync(d,{recursive:true});writeFileSync(join(d,'index.html'),html,'utf8');
}
mkdirSync(join(root,'blog'),{recursive:true});
writeFileSync(join(root,'blog/editorial.css'),'.editorial-content{max-width:900px;margin:2.5rem auto 5rem}.editorial-content section{margin-top:2.5rem}.editorial-content p{font-size:1.04rem;color:#485872;line-height:1.85}.editorial-content h2{font-size:clamp(1.3rem,3vw,1.85rem);margin-bottom:.7rem}.editorial-content .cards{margin-top:1.3rem}.editorial-content .card{margin:0}.editorial-content .card h2{font-size:1.2rem}.editorial-content a{overflow-wrap:anywhere}footer a{margin-right:.7rem}footer p{font-size:.9rem;margin:0}.hero .note{font-size:.9rem}.hero .note a{font-size:inherit}\n','utf8');
for(const p of content){
 const inner=p.sections.map(([heading,...paragraphs])=>'<section><h2>'+esc(heading)+'</h2>'+paragraphs.map(par).join('')+'</section>').join('')
 +'<section class="card"><h2>Related pages</h2><ul class="clean">'+p.extra.map(([title,url])=>'<li>'+a(url,title)+'</li>').join('')+'</ul></section>';
 save(p.path,layout({path:p.path,name:p.name,desc:p.intro,intro:p.intro,topic:'About and policies'},inner));
}
for(const p of articles){
 const path='/blog/'+p.slug+'/';
 const sections=p.sections.map(([heading,...paragraphs])=>'<section><h2>'+esc(heading)+'</h2>'+paragraphs.map(par).join('')+'</section>').join('');
 const sources='<section class="card"><h2>Source documentation</h2><p>Check the original platform documentation for updates and detail.</p><ul class="clean">'
  +p.sources.map(([name,url])=>'<li><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(name)+'</a></li>').join('')+'</ul></section>';
 const related='<section><h2>Explore related services</h2><p>'+a('/services/seo/','SEO services')+' · '+a('/services/aeo-geo-optimization/','AI search and AEO')+' · '+a('/#contact','Contact our agency')+'</p></section>';
 save(path,layout({path,name:p.name,desc:p.desc,intro:p.desc,topic:p.topic,type:'article'},'<article>'+sections+sources+related+'</article>'));
}
const indexBody='<section><h2>Explore our practical articles</h2><div class="cards">'+articles.map(p=>
 '<article class="card"><span class="pill">'+esc(p.topic)+'</span><h2><a href="/blog/'+esc(p.slug)+'/">'+esc(p.name)+'</a></h2><p>'+esc(p.desc)+'</p><p class="note">Published '+dateText+'</p><a href="/blog/'+esc(p.slug)+'/">Read full article</a></article>').join('')+'</div></section>'
 +'<section><h2>More detailed guides</h2><p>'+a('/guides/technical-seo-checklist/','Technical SEO checklist')+' · '+a('/guides/seo-aeo-geo-explained/','SEO vs AEO vs GEO')+'</p></section>';
save('/blog/',layout({path:'/blog/',name:'SEO and Digital Marketing Blog',desc:'Practical articles about technical SEO, AI-assisted websites, local search, Meta Ads and faster marketing media.',intro:'Learn how to make a website discoverable, usable and measurable with practical explanations grounded in original platform documentation.',topic:'Agency learning hub'},indexBody));
let sitemap=readFileSync(join(root,'sitemap.xml'),'utf8');
if(!sitemap.includes('</urlset>'))throw new Error('Core XML sitemap must run first');
for(const path of allPaths)if(sitemap.includes('<loc>'+host+path+'</loc>'))throw new Error('Duplicate sitemap URL: '+path);
sitemap=sitemap.replace('</urlset>',allPaths.map(p=>'  <url><loc>'+host+p+'</loc></url>').join('\n')+'\n</urlset>');
writeFileSync(join(root,'sitemap.xml'),sitemap,'utf8');
console.log('Generated '+allPaths.length+' trust/blog pages and '+(sitemap.match(/<loc>/g)||[]).length+' sitemap URLs.');
