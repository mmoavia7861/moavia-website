import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Build after the normal project, SEO and hub page generators.
const root = join(process.cwd(), 'public');
const origin = 'https://moaviaseo.com';
const projects = JSON.parse(readFileSync(join(process.cwd(), 'src/data/githubProjects.json'), 'utf8'));
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const link = (url, label) => '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + '</a>';
const siteLinks = [
  ['/web-development/', 'Web & E-commerce'],
  ['/android-development/', 'Android'],
  ['/ai-automations/', 'AI Automation'],
  ['/certificates/', 'Certificates'],
  ['/projects/', 'Projects'],
  ['/hire-me/', 'Services'],
  ['/about/', 'About'],
  ['/contact/', 'Contact']
];
const nav = '<nav aria-label="Main navigation">' + siteLinks.map(item => '<a href="' + item[0] + '">' + esc(item[1]) + '</a>').join('') + '</nav>';
const style = '<style>'
  + '.portfolio-intro{max-width:780px}.portfolio-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:18px;margin:26px 0}'
  + '.portfolio-card{border:1px solid #dce3f2;background:white;padding:25px;border-radius:18px}'
  + '.portfolio-card h2,.portfolio-card h3{margin:0 0 12px}.portfolio-card p{line-height:1.75;color:#52607a}'
  + '.portfolio-card .label{font-size:12px;font-weight:800;color:#5265d8;text-transform:uppercase;letter-spacing:.06em}'
  + '.portfolio-card a{font-weight:700}.portfolio-note{padding:17px 20px;border-left:4px solid #5265d8;background:#edf2ff;margin:26px 0;border-radius:8px}'
  + '.portfolio-cta{display:inline-block;padding:13px 19px;border-radius:11px;background:#5265d8;color:white!important;text-decoration:none;font-weight:700}'
  + '.portfolio-cta:focus-visible,.portfolio-card a:focus-visible{outline:3px solid #10a58f;outline-offset:3px}'
  + '@media(max-width:700px){.portfolio-cards{grid-template-columns:1fr}}'
  + '</style>';
const projectCard = item => '<article class="portfolio-card"><span class="label">' + esc(item.category) + '</span>'
  + '<h2>' + esc(item.title) + '</h2><p>' + esc(item.description) + '</p>'
  + '<p><a href="/projects/' + esc(item.id) + '/">Read project details</a></p>'
  + '<p>' + link(item.url, item.kind === 'android' ? 'View actual source repository' : 'Open public website') + '</p></article>';

// Actual public front pages are requested via the same live-screenshot service
// used by the individual project case studies. Never replace captures with fake UI.
const screenshotUrl = item => '/project-captures/' + item.id + '.jpg';
const screenshotFallback = url => 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(url) + '?w=960';
const hostname = url => new URL(url).hostname.replace(/^www\./, '');
const screenshot = (item, eager = false) => '<span class="webcase-image">'
  + '<img data-portfolio-shot src="' + esc(screenshotUrl(item)) + '" data-fallback-src="' + esc(screenshotFallback(item.url)) + '" alt="Real homepage screenshot preview of ' + esc(item.title) + '"'
  + ' width="1440" height="900" loading="' + (eager ? 'eager' : 'lazy') + '" decoding="async" referrerpolicy="no-referrer">'
  + '<span class="webcase-fallback" data-portfolio-fallback hidden>Live front-page screenshot is temporarily unavailable. Open the website to view the real project.</span>'
  + '</span>';
const browserBar = item => '<span class="webcase-preview-chrome" aria-hidden="true"><i></i><i></i><i></i>'
  + '<span class="webcase-preview-domain">' + esc(hostname(item.url)) + '</span></span>';
const webProjectCard = item => '<article class="webcase-card">'
  + '<a class="webcase-preview-link" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Open live homepage of ' + esc(item.title) + '">'
  + browserBar(item) + screenshot(item) + '</a>'
  + '<div class="webcase-card-body"><span class="webcase-category">' + esc(item.category) + '</span>'
  + '<h3>' + esc(item.title) + '</h3><p>' + esc(item.description) + '</p>'
  + '<div class="webcase-tags">' + item.stack.slice(0,3).map(tag => '<span>' + esc(tag) + '</span>').join('') + '</div>'
  + '<div class="webcase-card-actions">'
  + '<a href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">Visit live website ↗</a>'
  + '<a href="/projects/' + esc(item.id) + '/">Project details →</a></div></div></article>';
const webHero = (title, intro, featured) => '<div class="hero webcase-page-hero"><div class="wrap webcase-hero-grid">'
  + '<div class="webcase-hero-copy"><span class="pill">Real projects · Front-page previews</span>'
  + '<span class="webcase-hero-kicker">DESIGN / DEVELOPMENT / EXPERIENCE</span>'
  + '<h1>' + esc(title.replace(' | Moavia Hassan','')) + '</h1>'
  + '<p class="portfolio-intro">' + esc(intro) + '</p>'
  + '<div class="webcase-hero-actions"><a class="webcase-primary" href="#website-projects">Explore projects ↓</a>'
  + '<a class="webcase-secondary" href="/contact/">Discuss a website ↗</a></div></div>'
  + '<div class="webcase-stage" data-webcase-parallax>'
  + '<div class="craft3d-canvas craft3d-canvas--large" data-skill-scene="web" role="img" aria-label="Dimensional web development scene behind a real featured project screenshot"></div>'
  + '<span class="webcase-atmosphere" aria-hidden="true"></span><span class="webcase-depth-grid" aria-hidden="true"></span>'
  + '<span class="webcase-orbit" aria-hidden="true"></span><span class="webcase-orbit webcase-orbit--two" aria-hidden="true"></span>'
  + '<span class="webcase-ambient-symbol webcase-ambient-symbol--a" aria-hidden="true">{ }</span>'
  + '<span class="webcase-ambient-symbol webcase-ambient-symbol--b" aria-hidden="true">✳</span>'
  + '<a class="webcase-shot-link webcase-shot-wrap" href="' + esc(featured.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Open the featured live website ' + esc(featured.title) + '">'
  + '<span class="webcase-window-chrome" aria-hidden="true"><i></i><i></i><i></i><span class="webcase-window-label">' + esc(hostname(featured.url)) + '</span></span>'
  + screenshot(featured,true)
  + '<span class="webcase-hero-visit">VIEW LIVE PROJECT ↗</span></a>'
  + '<span class="webcase-floating webcase-floating--code" aria-hidden="true">Front-end engineering</span>'
  + '<span class="webcase-floating webcase-floating--layout" aria-hidden="true">Responsive interfaces</span>'
  + '</div></div></div>';

const androidScreenshot = '/android/moavia-seo-pro-ui.jpg';
const androidSource = projects.find(item => item.kind === 'android');
if (!androidSource || androidSource.id !== 'moavia-app') {
  throw Error('Expected the independently verifiable Kotlin/Compose starter.');
}
const androidPhone = (className = '') => '<span class="androidcase-phone ' + className + '">'
  + '<img class="androidcase-screen" src="' + androidScreenshot + '" width="176" height="367"'
  + ' alt="Moavia SEO Pro mobile interface screenshot showing an agency introduction, consultation buttons and SEO, Web Dev, Meta Ads and Google Ads sections">'
  + '</span>';
const androidHero = (title, intro) => '<div class="hero androidcase-hero"><div class="wrap androidcase-hero-grid">'
  + '<div class="androidcase-copy"><span class="androidcase-eyebrow">MOBILE DESIGN / ANDROID DEVELOPMENT</span>'
  + '<h1>Android apps.<br><span>Thoughtfully designed.</span></h1>'
  + '<p class="portfolio-intro androidcase-intro">' + esc(intro) + '</p>'
  + '<div class="androidcase-hero-actions"><a class="androidcase-primary" href="#android-project">Explore the mobile UI ↓</a>'
  + '<a class="androidcase-secondary" href="' + esc(androidSource.repo) + '" target="_blank" rel="noopener noreferrer">View Kotlin starter source ↗</a></div>'
  + '<div class="androidcase-hero-tags"><span>Responsive interfaces</span><span>Android UI</span><span>Kotlin / Compose learning</span></div>'
  + '<p class="androidcase-hero-note">Screenshot provided for this portfolio. Not represented as a Play Store release.</p></div>'
  + '<div class="androidcase-stage" data-webcase-parallax>'
  + '<div class="craft3d-canvas craft3d-canvas--large" data-skill-scene="android" role="img" aria-label="Dimensional Android development illustration behind the real UI screenshot"></div>'
  + '<span class="androidcase-depth-grid" aria-hidden="true"></span>'
  + '<span class="androidcase-orbit" aria-hidden="true"></span><span class="androidcase-orbit androidcase-orbit--two" aria-hidden="true"></span>'
  + '<span class="androidcase-shadow" aria-hidden="true"></span>'
  + '<div class="androidcase-device-wrap"><a class="androidcase-device-link" href="' + androidScreenshot + '"'
  + ' target="_blank" rel="noopener noreferrer" aria-label="Open the supplied mobile interface screenshot">'
  + androidPhone() + '</a></div>'
  + '<span class="androidcase-float androidcase-float--left" aria-hidden="true">Android UI design</span>'
  + '<span class="androidcase-float androidcase-float--right" aria-hidden="true">Kotlin · Jetpack Compose</span>'
  + '<span class="androidcase-annotation" aria-hidden="true">MOBILE / EXPERIENCE</span></div></div></div>';
const androidBody = '<section class="androidcase-portfolio" id="android-project" aria-labelledby="androidcase-project-heading">'
  + '<div class="androidcase-portfolio-heading"><div><span class="androidcase-overline">01 / SELECTED MOBILE INTERFACE</span>'
  + '<h2 id="androidcase-project-heading">Explore the Android UI</h2>'
  + '<p>A real mobile-screen image provided for the portfolio, displayed in a dimensional device and paired with transparent project links.</p>'
  + '</div></div>'
  + '<article class="androidcase-project"><div class="androidcase-project-media">'
  + '<a href="' + androidScreenshot + '" target="_blank" rel="noopener noreferrer" aria-label="View supplied Moavia SEO Pro mobile screenshot">'
  + androidPhone() + '</a></div>'
  + '<div class="androidcase-project-content"><span class="androidcase-project-kicker">ANDROID UI / PORTFOLIO PREVIEW</span>'
  + '<h3>Moavia SEO Pro — Mobile Experience</h3>'
  + '<p>This supplied interface screenshot presents a marketing and development agency experience with clear navigation, consultation actions and a department overview.</p>'
  + '<div class="androidcase-features"><span>SEO</span><span>Web development</span><span>Meta Ads</span><span>Google Ads</span></div>'
  + '<div class="androidcase-card-actions"><a class="androidcase-card-primary" href="' + androidScreenshot + '" target="_blank" rel="noopener noreferrer">View actual screenshot ↗</a>'
  + '<a class="androidcase-card-secondary" href="/contact/">Discuss an Android project →</a></div>'
  + '<p class="androidcase-disclosure">The displayed screen is a user-supplied UI preview. Its implementation, release status and working features are not independently verified; it is not a Play Store listing.</p></div></article>'
  + '</section><section class="androidcase-source" aria-label="Verified Android source repository"><div>'
  + '<h2>Kotlin &amp; Jetpack Compose — Source Starter</h2>'
  + '<p>The linked GitHub repository currently contains a basic Android scaffold showing “Hello Android!”. It is a separate code starter, not verified source for the full mobile screen shown above.</p>'
  + '</div><a href="' + esc(androidSource.repo) + '" target="_blank" rel="noopener noreferrer">Open GitHub source ↗</a></section>';

function buildPage({path, title, intro, body, index = true, scene = null, featured = null}) {
  const sceneLabels = {
    web: 'Animated three-dimensional browser showcasing a modern website',
    android: 'Animated three-dimensional Android smartphone interface',
    ai: 'Animated three-dimensional AI processor surrounded by an automation workflow',
  };
  const url = origin + path;
  const description = intro.length > 165 ? intro.slice(0, 160).trimEnd() + '…' : intro;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', name: title, description, url, author: { '@type': 'Person', name: 'Moavia Hassan', url: origin + '/about/' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' },
      { '@type': 'ListItem', position: 2, name: title.replace(' | Moavia Hassan', ''), item: url }
    ] }
  ] };
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>' + esc(title) + '</title><meta name="description" content="' + esc(description) + '">'
    + '<meta name="robots" content="' + (index ? 'index,follow,max-image-preview:large' : 'noindex,follow') + '">'
    + '<link rel="canonical" href="' + esc(url) + '"><link rel="icon" type="image/png" href="/favicon.png">'
    + '<meta property="og:type" content="website"><meta property="og:site_name" content="Moavia Hassan">'
    + '<meta property="og:title" content="' + esc(title) + '"><meta property="og:url" content="' + esc(url) + '">'
    + '<meta property="og:description" content="' + esc(description) + '">'
    + '<meta property="og:image" content="' + origin + '/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
    + '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="' + origin + '/social-preview.png">'
    + '<link rel="stylesheet" href="/seo/pages.css">'
    + (scene ? '<link rel="stylesheet" href="/skill-scenes.css"><script src="/skill-scenes.js" defer></script>' : '')
    + (scene === 'web' ? '<link rel="stylesheet" href="/web-showcase.css"><script src="/web-showcase.js" defer></script>' : '')
    + (scene === 'android' ? '<link rel="stylesheet" href="/android-showcase.css"><script src="/web-showcase.js" defer></script>' : '')
    + style
    + '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script></head><body class="portfolio-detail-page">'
    + '<header><div class="wrap"><a class="brand" href="/"><img src="/site-logo.png" width="42" height="42" alt="Moavia Hassan logo">Moavia Hassan</a>' + nav + '</div></header>'
    + '<main><div class="wrap subnav"><a href="/">Home</a> / ' + esc(title.replace(' | Moavia Hassan','')) + '</div>'
    + (scene === 'web' && featured ? webHero(title,intro,featured)
    : scene === 'android' ? androidHero(title,intro)
    : '<div class="hero"><div class="wrap">' + (scene ? '<div class="craft3d-detail-hero"><div class="craft3d-detail-copy">' : '')
      + '<span class="pill">Personal developer portfolio</span>'
      + '<h1>' + esc(title.replace(' | Moavia Hassan','')) + '</h1><p class="portfolio-intro">' + esc(intro) + '</p>'
      + (scene ? '</div><div class="craft3d-canvas craft3d-canvas--large" data-skill-scene="' + scene + '" role="img" aria-label="' + esc(sceneLabels[scene]) + '"></div></div>' : '')
      + '</div></div>')
    + '<div class="wrap">' + body + '<p><a class="portfolio-cta" href="/contact/">Discuss a project</a></p></div></main>'
    + '<footer><div class="wrap"><div><strong>Moavia Hassan</strong><p>Student developer · Islamabad, Pakistan</p></div>'
    + '<div><a href="/web-development/">Web</a> · <a href="/android-development/">Android</a> · <a href="/ai-automations/">AI</a> · <a href="/certificates/">Certificates</a> · <a href="/projects/">Projects</a> · <a href="/privacy-policy/">Privacy</a> · <a href="/contact/">Contact</a></div></div></footer>'
    + '</body></html>\n';
  const dir = join(root, path.slice(1,-1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
  return index ? path : null;
}

// RankNova's public demo currently resolves to a 404; omit it from this
// visual Web Development showcase without deleting its project record.
const webProjects = projects.filter(item => item.kind !== 'android' && item.id !== 'ranknova');
const androidProjects = projects.filter(item => item.kind === 'android');
const featuredWebProject = webProjects.find(item => item.id === 'toolscresta') || webProjects[0];
if (!featuredWebProject || webProjects.length !== 5) throw Error('Expected five visible public web projects excluding RankNova.');
const paths = [];
paths.push(buildPage({
  path: '/web-development/',
  title: 'Web & E-commerce Development | Moavia Hassan',
  scene: 'web',
  featured: featuredWebProject,
  intro: 'Explore real public website front pages, from responsive agency designs to online utilities and e-commerce work. Select any screenshot to open the actual live website.',
  body: '<section class="webcase-project-section" id="website-projects" aria-labelledby="webcase-project-title">'
    + '<div class="webcase-section-heading"><div><span class="webcase-category">SELECTED WEBSITE WORK</span>'
    + '<h2 id="webcase-project-title">Explore real website projects</h2>'
    + '<p>Every preview links to a public website; each project has a detailed case study and its technology stack.</p></div>'
    + '<span class="webcase-counter">' + webProjects.length + ' PUBLIC WEBSITES</span></div>'
    + '<div class="webcase-grid">' + webProjects.map(webProjectCard).join('') + '</div>'
    + '<p class="webcase-photo-note"><strong>About screenshots:</strong> Previews are browser-rendered captures of public website homepages at deployment time, not fabricated product mockups. If a capture is unavailable, a third-party thumbnail may be used as a fallback. Visit each website for its current version.</p>'
    + '<p class="portfolio-note">These are public projects and design prototypes. Screenshots are not evidence of paid client work, website traffic, sales, or search rankings.</p>'
    + '</section>'
}));
paths.push(buildPage({
  path: '/android-development/',
  title: 'Android App Development | Moavia Hassan',
  scene: 'android',
  intro: 'Explore a supplied Moavia SEO Pro mobile interface screenshot with Android-inspired depth animation. My independently verifiable Kotlin and Jetpack Compose starter is linked separately.',
  body: androidBody
}));
paths.push(buildPage({
  path: '/ai-automations/',
  title: 'AI Automation Projects | Moavia Hassan',
  scene: 'ai',
  intro: 'An overview of my AI-assisted web tools, workflow experiments and automation interests, with clear distinctions between project concepts, demos and verified services.',
  body: '<section><h2>AI and automation focus</h2><div class="portfolio-cards">'
    + '<article class="portfolio-card"><span class="label">AI-assisted web tools</span><h3>ToolsCresta integrations</h3><p>Tool website experiments including AI-assisted card creation concepts and backend API integrations. Third-party feature availability is not guaranteed.</p><p><a href="/projects/toolscresta/">View website project</a></p></article>'
    + '<article class="portfolio-card"><span class="label">Workflow exploration</span><h3>Business discovery & outreach automation</h3><p>Planning and experimenting with structured business research, evidence checks, spreadsheet tracking and permission-aware email workflows using Make and connected services. No private data or unverifiable success rates are published.</p></article>'
    + '<article class="portfolio-card"><span class="label">Learning</span><h3>AI agents and automation</h3><p>Studying AI agents, tool calling, workflow orchestration and API security. Coursework alone is not represented as a certification.</p></article>'
    + '</div></section><section><h2>Responsible automation</h2><p>Automation should protect API credentials, respect user consent and platform rules, use human review when necessary and never fabricate outcomes.</p></section>'
}));
buildPage({
  path: '/certificates/',
  title: 'Certificates & Learning | Moavia Hassan',
  index: false,
  intro: 'This section is reserved for verified certificates, professional learning and educational milestones. Individual credentials will appear only when their genuine supporting records are available.',
  body: '<section><h2>Verified certificates</h2><p>No certificate files or verifiable credential links have been supplied for this portfolio update. Certificates will be added here with an issuer, award date and proof link or accessible image when available.</p></section>'
    + '<section><h2>Current learning areas</h2><div class="portfolio-cards">'
    + '<article class="portfolio-card"><h3>Web and full-stack development</h3><p>React, TypeScript, Node.js, application interfaces and deployment.</p></article>'
    + '<article class="portfolio-card"><h3>AI agents and automation</h3><p>Tool use, agent workflows, APIs, evaluations and responsible integrations.</p></article>'
    + '<article class="portfolio-card"><h3>Android and game development</h3><p>Kotlin/Compose learning and Godot-based game development planning.</p></article>'
    + '</div><p class="portfolio-note">Learning interests are not presented as completed qualifications, awards or employment history.</p></section>'
});
const sitemap = join(root,'sitemap.xml');
let xml=readFileSync(sitemap,'utf8');
for(const path of paths){
  if(xml.includes('<loc>'+origin+path+'</loc>'))throw Error('Duplicate sitemap route: '+path);
}
xml=xml.replace('</urlset>',paths.map(path=>'  <url><loc>'+origin+path+'</loc></url>').join('\n')+'\n</urlset>');
writeFileSync(sitemap,xml,'utf8');
console.log('Generated category pages: web, Android, AI automation, and a noindex certificate placeholder.');
