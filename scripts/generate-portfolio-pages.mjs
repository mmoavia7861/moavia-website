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
  ['/tools/', 'Tools'],
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
function buildPage({path, title, intro, body, index = true}) {
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
    + '<link rel="stylesheet" href="/seo/pages.css">' + style
    + '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script></head><body>'
    + '<header><div class="wrap"><a class="brand" href="/"><img src="/site-logo.png" width="42" height="42" alt="Moavia Hassan logo">Moavia Hassan</a>' + nav + '</div></header>'
    + '<main><div class="wrap subnav"><a href="/">Home</a> / ' + esc(title.replace(' | Moavia Hassan','')) + '</div>'
    + '<div class="hero"><div class="wrap"><span class="pill">Personal developer portfolio</span>'
    + '<h1>' + esc(title.replace(' | Moavia Hassan','')) + '</h1><p class="portfolio-intro">' + esc(intro) + '</p></div></div>'
    + '<div class="wrap">' + body + '<p><a class="portfolio-cta" href="/contact/">Discuss a project</a></p></div></main>'
    + '<footer><div class="wrap"><div><strong>Moavia Hassan</strong><p>Student developer · Islamabad, Pakistan</p></div>'
    + '<div><a href="/web-development/">Web</a> · <a href="/android-development/">Android</a> · <a href="/ai-automations/">AI</a> · <a href="/certificates/">Certificates</a> · <a href="/projects/">Projects</a> · <a href="/privacy-policy/">Privacy</a> · <a href="/contact/">Contact</a></div></div></footer>'
    + '</body></html>\n';
  const dir = join(root, path.slice(1,-1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
  return index ? path : null;
}

const webProjects = projects.filter(item => item.kind !== 'android');
const androidProjects = projects.filter(item => item.kind === 'android');
const paths = [];
paths.push(buildPage({
  path: '/web-development/',
  title: 'Web & E-commerce Development | Moavia Hassan',
  intro: 'Explore public website projects, responsive interfaces, online tool platforms and e-commerce work by Moavia Hassan. Project descriptions distinguish demos from production claims.',
  body: '<section><h2>Web development interests and skills</h2><p>Responsive UI, React, TypeScript, WordPress, SEO-friendly information architecture, online stores, web utilities and practical usability.</p></section>'
    + '<section aria-label="Website projects"><h2>Public web and e-commerce projects</h2><div class="portfolio-cards">'
    + webProjects.map(projectCard).join('') + '</div></section>'
    + '<p class="portfolio-note">These links represent public work and prototypes. No verified client outcomes, advertising revenue or paid engagement are implied.</p>'
}));
paths.push(buildPage({
  path: '/android-development/',
  title: 'Android App Development | Moavia Hassan',
  intro: 'My Android development learning journey and source-verifiable mobile application prototypes. I do not label unfinished starter projects as published Play Store apps.',
  body: '<section><h2>Mobile development</h2><p>My Android work currently includes Kotlin and Jetpack Compose exploration. I plan further mobile interfaces and will add releases only after there is a verifiable build or store listing.</p></section>'
    + '<section><h2>Android project</h2><div class="portfolio-cards">' + androidProjects.map(projectCard).join('') + '</div></section>'
    + '<p class="portfolio-note">The current Android starter displays a simple Hello Android! greeting. It is not a released product. The source repository is linked for direct verification.</p>'
}));
paths.push(buildPage({
  path: '/ai-automations/',
  title: 'AI Tools & Automation Projects | Moavia Hassan',
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
