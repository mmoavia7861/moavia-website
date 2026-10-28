import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const publicDir = join(process.cwd(), 'public');
const site = 'https://moaviaseo.com';
const logo = site + '/assets/aistudio/moavia_seopro_logo_720x720_10966138.png';
const company = { '@type': 'Organization', '@id': site + '/#organization', name: 'Moavia SEO Pro',
  url: site + '/', logo, areaServed: [{ '@type': 'City', name: 'Islamabad' }, { '@type': 'Country', name: 'Pakistan' }] };
const clean = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
const pages = [
  {
    path: '/services/seo/', kind: 'service',
    name: 'Search Engine Optimization',
    title: 'SEO Services in Islamabad | Technical & On-Page SEO | Moavia SEO Pro',
    description: 'SEO services for businesses in Islamabad and across Pakistan: technical audits, search intent research, on-page content and transparent Search Console reporting.',
    lead: 'Search engine optimization helps the right customers find a useful answer on your website. We start with the pages, technical barriers and search queries that matter to your business, rather than promising a guaranteed position.',
    audience: 'Businesses that need qualified organic enquiries, clearer service pages and measurable website visibility.',
    steps: [
      ['Technical access and indexing', 'Review crawl status, canonical URLs, redirects, mobile usability, Core Web Vitals signals and Search Console coverage. Prioritize errors that prevent discovery before polishing minor metadata.'],
      ['Search intent and page structure', 'Map target queries to genuinely useful pages. Create unique page titles, helpful headings, comparison explanations, internal links and trustworthy examples based on your actual services.'],
      ['Measurement and iteration', 'Use Google Search Console for impressions and queries, web analytics for engagement and lead tracking for business outcomes. Review changes against the baseline rather than claiming instant results.'],
    ],
    deliverables: ['Technical SEO issue list with priorities', 'Keyword-to-page mapping', 'On-page metadata and internal-link recommendations', 'Structured data only where accurate', 'Search Console monitoring guidance'],
    faqs: [
      ['How long does SEO take?', 'Crawling and content improvements can start quickly, but organic visibility and enquiries usually require sustained work. Timing depends on competition, site history, content and Google indexing.'],
      ['Can you guarantee first place on Google?', 'No. No agency can control Google rankings. We focus on useful content, technical accessibility and transparent measurement.'],
      ['Do I need separate pages for each service?', 'Usually yes when the services meet different search needs. Each page should explain its scope and help people choose, rather than repeating a city keyword on many near-identical pages.'],
    ],
    related: ['/services/local-seo-islamabad/', '/services/aeo-geo-optimization/', '/guides/technical-seo-checklist/']
  },
  {
    path: '/services/local-seo-islamabad/', kind: 'service',
    name: 'Local SEO in Islamabad',
    title: 'Local SEO in Islamabad & Rawalpindi | Google Business Profile Guidance',
    description: 'Practical local SEO for eligible Islamabad and Rawalpindi businesses: business profile quality, accurate listings, location relevance and useful local pages.',
    lead: 'Local search connects nearby customers with businesses that genuinely serve them. We focus on accurate business details, the quality of the website and Google Business Profile eligibility—not fabricated map-pack rankings.',
    audience: 'Storefront and in-person service businesses operating in Islamabad or Rawalpindi, subject to Google Business Profile eligibility.',
    steps: [
      ['Check real-world eligibility', 'Google Business Profiles generally require eligible in-person customer contact. Online-only agencies are not automatically eligible. Use your real operating address or service area; never list a virtual office as a staffed storefront.'],
      ['Improve business information', 'Keep the official business name, appropriate primary category, hours, phone, services and website consistent. Add truthful photographs and respond professionally to genuine reviews.'],
      ['Connect local searches to useful pages', 'Explain real service coverage, how customers contact you and what differentiates your business. Link accurate location information from your website; avoid doorway pages for neighborhoods you do not serve.'],
    ],
    deliverables: ['Local visibility and eligibility checklist', 'Business information consistency review', 'Business Profile category/content guidance', 'Location-relevant on-page recommendations', 'Tracking of actual enquiries'],
    faqs: [
      ['Is a Google Business Profile available to every online agency?', 'No. Google requires eligible in-person customer contact. Online-only businesses without an eligible location or in-person service model may not qualify.'],
      ['Does adding an Islamabad keyword guarantee Maps visibility?', 'No. Relevance, distance, prominence and Google systems influence local results. Useful local content is one part of a wider approach.'],
      ['Should I buy or post fake Google reviews?', 'No. Reviews must reflect genuine customer experiences. Fake reviews damage trust and violate platform policies.'],
    ],
    related: ['/services/seo/', '/services/aeo-geo-optimization/', '/guides/seo-aeo-geo-explained/']
  },
  {
    path: '/services/aeo-geo-optimization/', kind: 'service',
    name: 'AEO & Generative Engine Optimization',
    title: 'AEO & GEO Services | AI Search Visibility and Answer-Ready Content',
    description: 'AEO and generative engine optimization through clear answers, crawlable service pages, accurate structured data and entity-consistent business information.',
    lead: 'Answer engine optimization (AEO) and generative engine optimization (GEO) describe work that helps people and search systems understand your expertise. There is no guaranteed AI citation technique: useful, indexed, clear content comes first.',
    audience: 'Businesses whose buyers compare providers and ask detailed questions in AI-assisted and traditional search.',
    steps: [
      ['Turn buyer questions into useful answers', 'Document real customer questions, explain the answer first and follow with limitations, examples and next steps. Publish it in readable HTML with descriptive headings and links.'],
      ['Make facts verifiable', 'Show the company name, services, contact route and author or organization consistently. Use Organization, Service and Article structured data where the markup agrees with visible content. Avoid fake ratings, reviews, awards and capabilities.'],
      ['Support technical discoverability', 'Keep indexable URLs accessible, avoid blocked assets and provide a current sitemap. Track search impressions and qualified leads; AI citations are not guaranteed or fully measurable by every platform.'],
    ],
    deliverables: ['Customer question and topic map', 'Answer-first page outlines', 'Visible FAQs with accurate schema where appropriate', 'Technical indexability and internal linking review', 'Content quality and source verification checklist'],
    faqs: [
      ['What is the difference between SEO, AEO and GEO?', 'SEO improves search discovery and relevance. AEO emphasizes direct, useful answers. GEO emphasizes clear, trustworthy information for generative search systems. The same content quality and crawlability foundations support all three.'],
      ['Is llms.txt required to appear in Google AI Overviews?', 'No. Google does not require an llms.txt file, a special AI schema or a separate submission process for its AI search features.'],
      ['Can AI citations be guaranteed?', 'No. Search and AI engines choose sources dynamically. We improve clarity and discoverability without promising inclusion in a specific answer.'],
    ],
    related: ['/services/seo/', '/guides/seo-aeo-geo-explained/', '/services/local-seo-islamabad/']
  },
  {
    path: '/services/ai-website-development/', kind: 'service',
    name: 'AI-Assisted Website Development',
    title: 'AI-Assisted Website Development | Accessible, Fast Web Experiences',
    description: 'Modern business website development with AI-assisted workflows, human review, mobile-first design, accessibility and search-friendly semantic HTML.',
    lead: 'AI-assisted development can speed up prototypes, but a business website still needs human review of content, security, usability and performance. We help turn early concepts into maintainable public-facing experiences.',
    audience: 'Founders and businesses looking for a responsive marketing website or custom interactive web experience.',
    steps: [
      ['Discovery and page planning', 'Define the audience, content requirements, conversion goals and site map before selecting a framework or AI coding tool.'],
      ['Build with accessibility and SEO in mind', 'Use semantic headings, descriptive links, optimized media, responsive layouts and crawlable service pages. Review generated code before release.'],
      ['Test and maintain', 'Check real devices, forms, analytics, redirects, metadata and error states. Maintain a changelog and avoid exposing API secrets in browser code.'],
    ],
    deliverables: ['Responsive layout and page hierarchy', 'Reviewable implementation and deployment', 'Basic technical SEO setup', 'Contact form and accessibility checks', 'Handover and maintenance recommendations'],
    faqs: [
      ['Can an AI-generated website rank on Google?', 'Yes, if it offers useful content and meets Google technical and quality requirements. AI generation alone does not improve rankings.'],
      ['Will the website be mobile-friendly?', 'Mobile-first usability is part of the planning and test process, but final results should be checked on actual devices and page templates.'],
      ['Can you connect the website to Firebase or Cloudflare?', 'Integration can be scoped during discovery. Authentication, database rules and secret handling need separate security review.'],
    ],
    related: ['/services/seo/', '/services/wordpress-development/', '/services/aeo-geo-optimization/']
  },
  {
    path: '/services/wordpress-development/', kind: 'service',
    name: 'WordPress & Custom Web Development',
    title: 'WordPress Website Development | Business Websites & SEO Foundations',
    description: 'WordPress website planning and implementation with responsive design, content management, technical SEO, accessibility and practical maintenance guidance.',
    lead: 'A well-built WordPress website should be easy for your team to edit and easy for customers to navigate. The right structure depends on your pages, content workflows, integrations and maintenance needs.',
    audience: 'Service businesses that want control over website content, landing pages or an expandable blog.',
    steps: [
      ['Choose an appropriate WordPress setup', 'Review content types, editorial roles, hosting needs and plugin requirements before installing themes or page builders.'],
      ['Prioritize real user journeys', 'Create clear service navigation, accessible forms, helpful copy and mobile layouts. Keep plugins lean and image loading efficient.'],
      ['Plan for ongoing security and search', 'Schedule updates and backups, review access permissions, create XML sitemaps and test schema against the actual page text.'],
    ],
    deliverables: ['Site architecture and page templates', 'CMS editing workflow', 'Mobile and accessibility review', 'SEO metadata and redirects', 'Update and backup recommendations'],
    faqs: [
      ['Is WordPress good for SEO?', 'WordPress can support strong SEO, but rankings depend on content quality, technical implementation, site experience and competition rather than the CMS alone.'],
      ['Can an existing site be redesigned without losing traffic?', 'A migration should preserve important URLs when possible, map redirects, copy metadata and monitor Search Console after launch.'],
      ['Do I need many plugins?', 'No. Use only the plugins needed for the project and keep them maintained to reduce complexity and risk.'],
    ],
    related: ['/services/seo/', '/services/ai-website-development/', '/guides/technical-seo-checklist/']
  },
  {
    path: '/services/google-ads/', kind: 'service',
    name: 'Google Ads & PPC Management',
    title: 'Google Ads Management | Search Campaigns and Conversion Tracking',
    description: 'Google Ads campaign planning for qualified leads: keyword intent, landing pages, conversion tracking, ad relevance and accountable reporting.',
    lead: 'Paid search is useful when your offer matches a clear customer need. Good Google Ads management starts with measurement, relevant landing pages and a budget that supports testing.',
    audience: 'Businesses ready to test or improve search advertising with a defined product, service and lead objective.',
    steps: [
      ['Clarify goals and conversion events', 'Define what counts as a qualified enquiry, confirm consent requirements and ensure conversion events are measured correctly.'],
      ['Match keywords to landing pages', 'Separate search intent, write honest ad copy and send visitors to the most relevant service page. Review negative keywords and search terms.'],
      ['Optimize with actual results', 'Measure conversion rate and cost per meaningful lead rather than clicks alone. Adjust budgets according to evidence, not promises of a fixed return.'],
    ],
    deliverables: ['Campaign and landing-page recommendations', 'Keyword and negative keyword plan', 'Tracking quality checklist', 'Ad copy testing framework', 'Reporting metrics and optimisation priorities'],
    faqs: [
      ['Do Google Ads improve organic Google rankings?', 'No. Paying for ads does not buy higher organic search ranking. SEO and ads can complement one another but are separate systems.'],
      ['What budget should I start with?', 'It depends on location, keyword competition and the value of a qualified lead. A forecast should be grounded in your business data, not a universal minimum.'],
      ['Can you guarantee a return on ad spend?', 'No. Campaign results vary with market conditions, offer quality, tracking accuracy and site conversion rates.'],
    ],
    related: ['/services/seo/', '/services/meta-ads/', '/services/ai-website-development/']
  },
  {
    path: '/services/meta-ads/', kind: 'service',
    name: 'Meta Ads Management',
    title: 'Meta Ads Management | Facebook & Instagram Campaign Strategy',
    description: 'Facebook and Instagram ads strategy including audience selection, creative testing, landing-page fit, consent-aware tracking and clear lead quality reporting.',
    lead: 'Meta advertising can help businesses reach potential customers through Facebook and Instagram. Sustainable campaigns balance creative, audience relevance and a measurable conversion path.',
    audience: 'Service businesses and brands with an offer, an appropriate advertising budget and capacity to follow up enquiries.',
    steps: [
      ['Build a measurable funnel', 'Define campaign goals, connect appropriate conversion events and check that privacy notices and consent choices match the implementation.'],
      ['Test helpful creative', 'Develop distinct messages for different needs, use genuine visuals and avoid misleading urgency, before-and-after claims or invented testimonials.'],
      ['Improve lead quality', 'Review leads beyond form submissions and refine campaign delivery based on customer fit, not just the lowest cost per click.'],
    ],
    deliverables: ['Campaign strategy and audience hypotheses', 'Creative testing plan', 'Landing-page and form review', 'Measurement and consent checklist', 'Lead quality reporting recommendations'],
    faqs: [
      ['Are Meta Ads better than Google Ads?', 'It depends on customer intent, product category and creative. Google Search often captures active queries; social advertising can introduce an offer to new audiences.'],
      ['Is the Meta Pixel enough for tracking?', 'Pixel and server-side integrations may help measurement, but implementation should minimize duplicate events and respect consent and platform policies.'],
      ['Can paid social ads guarantee sales?', 'No. Ads drive exposure and traffic; actual sales depend on offer, market, pricing and customer experience.'],
    ],
    related: ['/services/google-ads/', '/services/ai-website-development/', '/services/seo/']
  },
  {
    path: '/guides/seo-aeo-geo-explained/', kind: 'guide',
    name: 'SEO vs AEO vs GEO: What Is the Difference?',
    title: 'SEO vs AEO vs GEO: Differences, Examples & Practical Checklist',
    description: 'Plain-English guide to SEO, answer engine optimization (AEO) and generative engine optimization (GEO), including what actually helps Google and AI search.',
    lead: 'SEO, AEO and GEO are different labels for related ways of helping people discover and understand online information. They are not three separate ranking switches.',
    audience: 'Website owners and marketers deciding what work to prioritize for traditional and AI-assisted search.',
    steps: [
      ['SEO: search discovery and usefulness', 'Search engine optimization makes pages discoverable, usable and relevant. Examples include a crawlable service URL, an accurate title, helpful original content and links from related pages.'],
      ['AEO: answer the question directly', 'Answer engine optimization emphasizes clear answers to the questions buyers actually ask. For example, explain what a technical SEO audit checks and what it cannot measure instead of adding vague buzzwords.'],
      ['GEO: clarity for generative discovery', 'Generative engine optimization emphasizes source transparency, consistent business facts and explanations an AI-assisted search result can understand. Google says AI Overviews and AI Mode rely on the same foundational search systems.'],
      ['A realistic implementation order', 'Start with indexable pages and content quality. Add descriptive headings, direct answers, trustworthy references and accurate structured data. Avoid fake citations or promises of guaranteed AI inclusion.'],
    ],
    deliverables: ['Check crawl access and sitemap', 'Create a unique page per meaningful user intent', 'Answer FAQs visibly and accurately', 'Support claims with trustworthy sources', 'Measure impressions, enquiries and content quality'],
    faqs: [
      ['Does Google require a special AEO or GEO schema?', 'No. Google states that no additional schema or machine-readable AI file is required for eligibility in its AI search features.'],
      ['Does an llms.txt file make Google cite my business?', 'No. It is not a required Google AI search ranking or citation mechanism. Useful indexed content matters more.'],
      ['Which should a new website do first?', 'Start with basic SEO: accessible pages, useful service descriptions, internal links and Search Console. Then deepen content around real questions buyers ask.'],
    ],
    sources: [
      ['Google: Generative AI search optimization', 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide'],
      ['Google: AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features']
    ],
    related: ['/services/aeo-geo-optimization/', '/services/seo/', '/guides/technical-seo-checklist/']
  },
  {
    path: '/guides/technical-seo-checklist/', kind: 'guide',
    name: 'Technical SEO Checklist for a New Website',
    title: 'Technical SEO Checklist: Indexing, Canonicals & Performance',
    description: 'A practical technical SEO checklist: Search Console, crawl status, XML sitemap, canonical URLs, internal links, mobile performance and structured data.',
    lead: 'A technical SEO audit is most useful when it separates observable facts from assumptions. This checklist helps website owners find common discoverability problems before requesting an expensive overhaul.',
    audience: 'Owners launching a new website or moving an existing domain to a new host.',
    steps: [
      ['Confirm the preferred site URL', 'Choose one canonical HTTPS version and ensure that other versions redirect consistently. Test the actual final URL, not just the display address in a browser.'],
      ['Check indexability', 'Verify Search Console property ownership, inspect the homepage and key pages, and confirm there is no accidental noindex tag, robots block or authentication wall.'],
      ['Publish a correct XML sitemap', 'Include only canonical, useful pages that return HTML successfully. Submit the sitemap to Search Console, then monitor indexing rather than repeatedly clicking Request Indexing.'],
      ['Review page-level essentials', 'Use a unique title, description, descriptive H1, helpful main text and clear links to other useful pages. Structured data must match visible information and must not invent ratings.'],
      ['Measure performance rather than guessing', 'Use PageSpeed Insights, CrUX and real devices for LCP, INP and CLS. A basic HTML fetch does not measure real-world performance or rankings.'],
    ],
    deliverables: ['Canonical URL and redirect review', 'Sitemap and robots check', 'Search Console coverage checks', 'Main content and internal-link review', 'Actual performance testing using appropriate tools'],
    faqs: [
      ['Will submitting a sitemap immediately index my pages?', 'No. A sitemap helps Google discover canonical URLs, but crawling, indexing and rankings are not guaranteed.'],
      ['Is robots.txt the same as a noindex directive?', 'No. robots.txt controls crawling. A noindex directive must be accessible for a crawler to see it and can prevent indexing when appropriately applied.'],
      ['Can an HTML-only audit calculate Core Web Vitals?', 'No. Web Vitals require lab or field performance measurements, not just a download of the HTML response.'],
    ],
    sources: [
      ['Google: Search Essentials', 'https://developers.google.com/search/docs/essentials'],
      ['Google: SEO Starter Guide', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'],
      ['PageSpeed Insights', 'https://pagespeed.web.dev/']
    ],
    related: ['/services/seo/', '/guides/seo-aeo-geo-explained/', '/services/ai-website-development/']
  }
];

const menu = [
  ['/services/seo/', 'SEO Services'],
  ['/services/local-seo-islamabad/', 'Local SEO'],
  ['/services/aeo-geo-optimization/', 'AEO & GEO'],
  ['/services/ai-website-development/', 'AI Websites'],
  ['/services/wordpress-development/', 'WordPress'],
  ['/services/google-ads/', 'Google Ads'],
  ['/services/meta-ads/', 'Meta Ads'],
];
const pagesByUrl = new Map(pages.map((page) => [page.path, page]));
const style = `
:root{color-scheme:light;font-family:Inter,"Segoe UI",Arial,sans-serif;color:#18243a;background:#f7f8fc}
*{box-sizing:border-box}body{margin:0;line-height:1.65}a{color:#5265d8;text-underline-offset:3px}
a:hover{text-decoration:underline}a:focus-visible{outline:3px solid #17a99a;outline-offset:4px}
header{background:#fff;border-bottom:1px solid #e7eaf2}header .wrap{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.1rem 0}
.wrap{width:min(1100px,calc(100% - 36px));margin:auto}.brand{display:flex;align-items:center;gap:.65rem;font-weight:800;color:#18243a;text-decoration:none}.brand img{height:42px;width:42px;border-radius:11px}
nav{display:flex;gap:.8rem;flex-wrap:wrap}nav a{font-weight:600;font-size:.86rem;color:#18243a;text-decoration:none}
.hero{background:linear-gradient(125deg,#eef2ff 0%,#f9f6ff 60%,#e7f8f4 100%);padding:3.8rem 0}
.pill{display:inline-block;padding:.3rem .8rem;background:#e8e6ff;color:#5265d8;border-radius:99px;text-transform:uppercase;font-size:.7rem;font-weight:800;letter-spacing:.09em}
h1{font-size:clamp(2rem,4.6vw,3.5rem);line-height:1.14;letter-spacing:-.04em;max-width:920px;margin:1rem 0}
.hero p{max-width:860px;font-size:1.12rem;color:#3f506b}
main{padding-bottom:4rem}section{margin-top:3rem}h2{font-size:clamp(1.4rem,3vw,1.95rem);line-height:1.3;letter-spacing:-.02em}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:1rem}
.card{background:#fff;border:1px solid #e7eaf2;border-radius:18px;padding:1.4rem;box-shadow:0 8px 25px #18243a08}
.card h3{font-size:1.12rem;margin:.15rem 0 .45rem}.card p{color:#52607a;margin:0}
.action{display:inline-flex;border-radius:10px;background:#5265d8;color:#fff;font-weight:700;padding:.85rem 1.25rem;text-decoration:none;margin-top:1rem}
.action:hover{background:#4052c8;text-decoration:none}
.subnav{font-size:.82rem;color:#52607a;padding:1rem 0}.subnav a{color:#52607a}
.faq details{border:1px solid #e7eaf2;background:white;border-radius:12px;padding:1rem 1.2rem;margin:.7rem 0}
.faq summary{font-weight:700;cursor:pointer}.faq p{color:#52607a;margin:.7rem 0 0}
ul.clean{padding-left:1.25rem}ul.clean li{padding:.23rem 0}
footer{background:#18243a;color:#d9e0f0;padding:2.5rem 0}footer a{color:#c5ceff}footer .wrap{display:flex;gap:1rem;justify-content:space-between;flex-wrap:wrap}
.sources li{margin:.5rem 0}.note{font-size:.9rem;color:#65738b}
@media(max-width:720px){.hero{padding:2.5rem 0}header .wrap{align-items:flex-start}nav{gap:.7rem}nav a{font-size:.78rem}}
`;
mkdirSync(join(publicDir, 'seo'), { recursive: true });
writeFileSync(join(publicDir, 'seo', 'pages.css'), style.trim() + '\n', 'utf8');

function renderPage(page) {
  const url = site + page.path;
  const isGuide = page.kind === 'guide';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site + '/' },
          { '@type': 'ListItem', position: 2, name: isGuide ? 'Guides' : 'Services', item: isGuide ? site + '/#blog' : site + '/#services' },
          { '@type': 'ListItem', position: 3, name: page.name, item: url }
        ]
      },
      isGuide
        ? { '@type': 'Article', '@id': url + '#article', mainEntityOfPage: url, headline: page.name,
            description: page.description, author: { '@id': company['@id'] }, publisher: { '@id': company['@id'] } }
        : { '@type': 'Service', '@id': url + '#service', name: page.name, url, description: page.description,
            provider: { '@id': company['@id'] }, areaServed: [{ '@type': 'City', name: 'Islamabad' }, { '@type': 'Country', name: 'Pakistan' }] },
      { '@type': 'FAQPage', '@id': url + '#faq', mainEntity: page.faqs.map(([q,a]) =>
        ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
    ]
  };
  const steps = page.steps.map(([name, detail],i) =>
    '<article class="card"><h3>' + (i+1) + '. ' + clean(name) + '</h3><p>' + clean(detail) + '</p></article>').join('');
  const related = page.related.map((path) => {
    const p = pagesByUrl.get(path);
    return '<li><a href="' + clean(path) + '">' + clean(p?.name || path) + '</a></li>';
  }).join('');
  const faqs = page.faqs.map(([q,a]) =>
    '<details><summary>' + clean(q) + '</summary><p>' + clean(a) + '</p></details>').join('');
  const sources = (page.sources || []).map(([label,link]) =>
    '<li><a href="' + clean(link) + '" rel="noopener noreferrer" target="_blank">' + clean(label) + '</a></li>').join('');
  return '<!doctype html>\n<html lang="en"><head>\n'
    + '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n'
    + '<title>' + clean(page.title) + '</title>\n'
    + '<meta name="description" content="' + clean(page.description) + '">\n'
    + '<meta name="robots" content="index,follow,max-image-preview:large">\n'
    + '<link rel="canonical" href="' + clean(url) + '">\n'
    + '<meta property="og:type" content="' + (isGuide ? 'article' : 'website') + '">\n'
    + '<meta property="og:site_name" content="Moavia SEO Pro">\n'
    + '<meta property="og:title" content="' + clean(page.title) + '">\n'
    + '<meta property="og:description" content="' + clean(page.description) + '">\n'
    + '<meta property="og:url" content="' + clean(url) + '">\n'
    + '<meta property="og:image" content="' + clean(logo) + '">\n'
    + '<meta name="twitter:card" content="summary">\n'
    + '<link rel="icon" type="image/png" href="/assets/aistudio/moavia_seopro_logo_720x720_10966138.png">\n'
    + '<link rel="stylesheet" href="/seo/pages.css">\n'
    + '<script type="application/ld+json">' + jsonLd(schema) + '</script>\n'
    + '</head><body>\n'
    + '<header><div class="wrap"><a class="brand" href="/"><img src="/assets/aistudio/moavia_seopro_logo_720x720_10966138.png" alt="" width="42" height="42">Moavia SEO Pro</a>'
    + '<nav aria-label="Main navigation"><a href="/">Home</a><a href="/#services">Services</a><a href="/guides/seo-aeo-geo-explained/">SEO Guides</a><a href="/#contact">Contact</a></nav></div></header>'
    + '<main><div class="wrap subnav"><a href="/">Home</a> / <a href="' + (isGuide ? '/#blog' : '/#services') + '">'
    + (isGuide ? 'Guides' : 'Services') + '</a> / ' + clean(page.name) + '</div>'
    + '<div class="hero"><div class="wrap"><span class="pill">' + (isGuide ? 'Practical SEO Guide' : 'Moavia SEO Pro Service')
    + '</span><h1>' + clean(page.name) + '</h1><p>' + clean(page.lead) + '</p>'
    + '<a class="action" href="/#contact">' + (isGuide ? 'Ask about your website' : 'Discuss your project') + '</a></div></div>'
    + '<div class="wrap"><section aria-labelledby="audience"><h2 id="audience">Who this is for</h2><p>' + clean(page.audience) + '</p></section>'
    + '<section aria-labelledby="approach"><h2 id="approach">' + (isGuide ? 'What you need to know' : 'How we approach the work')
    + '</h2><div class="cards">' + steps + '</div></section>'
    + '<section aria-labelledby="checklist"><h2 id="checklist">' + (isGuide ? 'Action checklist' : 'What to expect')
    + '</h2><ul class="clean">' + page.deliverables.map(d => '<li>' + clean(d) + '</li>').join('') + '</ul></section>'
    + '<section class="faq" aria-labelledby="faq-title"><h2 id="faq-title">Frequently asked questions</h2>' + faqs + '</section>'
    + (sources ? '<section aria-labelledby="sources"><h2 id="sources">Further reading</h2><ul class="sources">' + sources + '</ul></section>' : '')
    + '<section aria-labelledby="more"><h2 id="more">Explore related topics</h2><ul class="clean">' + related + '</ul></section>'
    + '<section class="card"><h2>Need a plan for your actual website?</h2><p>Share the URL, target audience and your main business goal. We can discuss the scope before making any promises about outcomes.</p>'
    + '<a class="action" href="/#contact">Contact Moavia SEO Pro</a></section>'
    + '<p class="note">Based in Islamabad, Pakistan. Services are discussed case by case; search rankings, AI citations and advertising returns are not guaranteed.</p>'
    + '</div></main><footer><div class="wrap"><div><strong>Moavia SEO Pro</strong><br>Islamabad, Pakistan</div>'
    + '<div><a href="/">Homepage</a> · <a href="/services/seo/">SEO Services</a> · <a href="/blog/">Blog</a> · <a href="/about/">About</a> · <a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms-and-conditions/">Terms</a></div>'
    + '<div>© 2026 Moavia SEO Pro</div></div></footer></body></html>\n';
}

for (const page of pages) {
  const dir = join(publicDir, page.path.replace(/^\/|\/$/g, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), renderPage(page), 'utf8');
}
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
  + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + ['/', ...pages.map(p => p.path)].map(path => '  <url><loc>' + site + path + '</loc></url>').join('\n')
  + '\n</urlset>\n';
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(publicDir, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://moaviaseo.com/sitemap.xml\n', 'utf8');
writeFileSync(join(publicDir, '404.html'),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
  + '<meta name="robots" content="noindex"><title>Page not found | Moavia SEO Pro</title>'
  + '<link rel="stylesheet" href="/seo/pages.css"></head><body><main class="wrap"><h1>Page not found</h1>'
  + '<p>This URL does not exist. Browse our <a href="/">homepage</a> or <a href="/services/seo/">SEO services</a>.</p></main></body></html>\n',
  'utf8');
console.log('Generated ' + pages.length + ' static SEO pages and sitemap with ' + (pages.length + 1) + ' URLs.');
