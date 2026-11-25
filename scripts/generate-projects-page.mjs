import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const origin='https://moaviaseo.com';
const root=join(process.cwd(),'public');
const websites=JSON.parse(readFileSync(join(process.cwd(),'src/data/githubProjects.json'),'utf8'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const json=s=>JSON.stringify(s).replace(/</g,'\\u003c');
const canonical=path=>origin+path;
const image=origin+'/social-preview.png';
const thumb=item=>'/project-captures/'+item.id+'.jpg';
const fallback=url=>'https://s.wordpress.com/mshots/v1/'+encodeURIComponent(url)+'?w=960';
const nav='<nav aria-label="Main navigation"><a href="/web-development/">Web</a><a href="/android-development/">Android</a><a href="/ai-automations/">AI</a><a href="/hire-me/">Services</a><a href="/projects/" aria-current="page">Projects</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav>';
const foot='<footer><div class="wrap"><div><strong>Moavia Hassan</strong><p>Web Development · SEO Services · App Projects</p></div><div><a href="/hire-me/">Services</a> · <a href="/projects/">Projects</a> · <a href="/privacy-policy/">Privacy</a> · <a href="/contact/">Contact</a></div></div></footer>';
const sep='<div class="wrap"><p class="project-note projects-trust-note"><strong>Portfolio transparency:</strong> These are published personal projects and design prototypes, not verified paid-client case studies or evidence of traffic, rankings or revenue. The Android starter is source code, not a released app.</p></div>';
function head(path,title,description,entity,crumbs) {
 const url=canonical(path);
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
 +'<title>'+esc(title)+'</title><meta name="description" content="'+esc(description)+'">'
 +'<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="'+esc(url)+'">'
 +'<meta property="og:type" content="website"><meta property="og:site_name" content="Moavia Hassan">'
 +'<meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(description)+'">'
 +'<meta property="og:url" content="'+esc(url)+'"><meta property="og:image" content="'+image+'"><meta property="og:image:alt" content="Moavia Hassan web development and app project portfolio banner"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
 +'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+esc(title)+'"><meta name="twitter:description" content="'+esc(description)+'"><meta name="twitter:image" content="'+image+'">'
 +'<link rel="icon" href="/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">'
 +'<link rel="stylesheet" href="/seo/pages.css"><link rel="stylesheet" href="/projects/projects.css"><script src="/web-showcase.js" defer></script>'
 +'<script type="application/ld+json">'+json({'@context':'https://schema.org','@graph':[entity,{'@type':'BreadcrumbList',itemListElement:crumbs}]})+'</script></head><body class="project-case-study-page">'
 +'<header><div class="wrap"><a class="brand" href="/">Moavia Hassan</a>'+nav+'</div></header>';
}
function link(href,label) { return '<a href="'+esc(href)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>'; }
function snapshot(w) {
 if(w.id==='mealverse'){
   const navSource=w.repo+'/blob/main/app/src/main/java/com/example/ui/navigation/MealVerseApp.kt';
   return '<figure class="project-screenshot project-android-preview">'
     +'<div class="project-app-layout"><div class="project-phone" aria-hidden="true">'
     +'<div class="project-phone-notch"></div><div class="project-phone-screen">'
     +'<span class="project-phone-label">MealVerse · Food Ordering</span><strong>Customer / Shopkeeper</strong>'
     +'<span class="project-phone-caption">Source-inspired concept, not a screenshot</span></div></div>'
     +'<div class="project-app-explainer"><span class="pill">Source-backed Android application</span>'
     +'<h3>MealVerse — Native Kotlin/Compose App</h3>'
     +'<p>The repository has Compose screens and navigation for store discovery, customer/shopkeeper registration, cart/checkout, order tracking and menu management. This illustration is not a captured emulator screenshot.</p>'
     +'<p>'+link(navSource,'Inspect actual MealVerse navigation code')+'</p></div></div>'
     +'<figcaption>Source-based illustration, not a verified screenshot or Play Store listing.</figcaption></figure>';
 }
 if(w.kind==='android'){
  const source=w.repo+'/blob/main/app/src/main/java/com/example/MainActivity.kt';
  return '<figure class="project-screenshot project-android-preview">'
   +'<div class="project-app-layout"><div class="project-phone" aria-hidden="true">'
   +'<div class="project-phone-notch"></div><div class="project-phone-screen">'
   +'<span class="project-phone-label">Moavia SEO Pro</span><strong>Hello Android!</strong>'
   +'<span class="project-phone-caption">Starter Compose screen</span></div></div>'
   +'<div class="project-app-explainer"><span class="pill">Source-based illustration</span><h3>Android project foundation</h3>'
   +'<p>The current MainActivity displays a simple “Hello Android!” greeting inside a Compose scaffold. This illustrated device is not a captured app screenshot or a released product.</p>'
   +'<p>'+link(source,'Inspect the actual MainActivity.kt file')+'</p></div></div>'
   +'<figcaption>Illustration based on verified source code, not an emulator screenshot or Play Store listing.</figcaption></figure>';
 }
 return '<figure class="project-screenshot"><span class="project-screenshot-image"><img data-portfolio-shot src="'+esc(thumb(w))+'" data-fallback-src="'+esc(fallback(w.url))+'" width="1440" height="680" loading="lazy" decoding="async" referrerpolicy="no-referrer" alt="Public homepage screenshot preview of '+esc(w.title)+'">'
 +'<span data-portfolio-fallback hidden class="project-screenshot-unavailable">Screenshot preview is unavailable. Use the live project link to inspect the website.</span></span>'
 +'<figcaption>Browser-rendered capture of the public website homepage at deployment time. Open the live project for the latest version.</figcaption></figure>';
}
if(websites.length!==8||new Set(websites.map(w=>w.id)).size!==8
 || websites.filter(w=>w.kind==='android').length!==2
 || websites.some(w=>(w.kind==='android' ? (!['moavia-app','mealverse'].includes(w.id)||w.repo!==('https://github.com/mmoavia7861/'+(w.id==='mealverse'?'mobile-application':'moavia-app'))||w.url!==w.repo)
   : !(/^(https:\/\/mmoavia7861\.github\.io\/[A-Za-z0-9_.-]+\/|https:\/\/(toolscresta|draliwellness)\.com\/)$/.test(w.url)))
 || !/^[a-z0-9-]+$/.test(w.id) || !w.problem || !w.role || !w.result || !w.repo || !Array.isArray(w.stack) || !Array.isArray(w.work))) {
 throw Error('Project data must contain six public web projects and two source-backed Android repositories.');
}
mkdirSync(join(root,'projects'),{recursive:true});
const showcaseOrder=['toolscresta','draliwellness','umm-e-aiman','dark-agency','agency-multipage','moavia-app','mealverse'];
const directoryWebsites=websites.filter(w=>w.id!=='ranknova').sort((a,b)=>showcaseOrder.indexOf(a.id)-showcaseOrder.indexOf(b.id));
const featuredProjects=directoryWebsites.filter(w=>['toolscresta','draliwellness'].includes(w.id));
const conceptProjects=directoryWebsites.filter(w=>w.kind!=='android'&&!['toolscresta','draliwellness'].includes(w.id));
const androidProjects=directoryWebsites.filter(w=>w.kind==='android');
const directory='/projects/',directoryTitle='Web & App Projects | Moavia Hassan',
directoryDesc='Explore deployed websites, front-end design prototypes and two Android source-code projects, with real project previews and source links.';
const directoryPreview = w => w.kind === 'android'
 ? '<div class="project-directory-no-live"><span class="project-directory-device" aria-hidden="true"></span><strong>'+esc(w.id==='mealverse'?'MealVerse · Android source project':'Android starter · source project')+'</strong><small>No released app or verified screen capture</small></div>'
 : '<a class="project-directory-preview" href="' + esc(w.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Visit live website for ' + esc(w.title) + '">'
   + '<span class="project-directory-preview-bar" aria-hidden="true"><i></i><i></i><i></i><span>' + esc(new URL(w.url).hostname) + '</span></span>'
   + '<span class="project-directory-image"><img data-portfolio-shot src="' + esc(thumb(w)) + '" data-fallback-src="' + esc(fallback(w.url)) + '" width="1440" height="680" loading="lazy" decoding="async" referrerpolicy="no-referrer" alt="Homepage screenshot of ' + esc(w.title) + '">'
   + '<span data-portfolio-fallback hidden class="project-screenshot-unavailable">Live preview unavailable. Click to open the website.</span></span></a>';
const projectCard=(w,featured=false)=>{
 const status=w.kind==='android'?(w.id==='mealverse'?'Source-backed Android project':'Source-only starter'):w.category==='Design Prototype'?'Design prototype':'Published website';
 const stack=w.stack.slice(0,3).map(x=>'<span>'+esc(x)+'</span>').join('');
 return '<article class="card project-card'+(featured?' project-card--featured':'')+'">'+directoryPreview(w)
  +'<div class="project-directory-body"><div class="projects-card-labels"><span class="pill">'+esc(w.category)+'</span><span class="project-status">'+esc(status)+'</span></div>'
  +'<h2><a href="/projects/'+esc(w.id)+'/">'+esc(w.title)+'</a></h2><p>'+esc(w.description)+'</p>'
  +'<div class="projects-stack" aria-label="Technology stack">'+stack+'</div>'
  +'<p class="project-card-actions"><a class="action" href="/projects/'+esc(w.id)+'/">Project details</a> '
  +link(w.url,w.kind==='android'?'View GitHub source':'Open live website')+'</p></div></article>';
};
const featuredCards=featuredProjects.map(w=>projectCard(w,true)).join('');
const conceptCards=conceptProjects.map(w=>projectCard(w)).join('');
const androidCards=androidProjects.map(w=>projectCard(w)).join('');
const listSchema={'@type':'CollectionPage',url:canonical(directory),name:directoryTitle,description:directoryDesc,
 mainEntity:{'@type':'ItemList',itemListElement:directoryWebsites.map((w,i)=>({'@type':'ListItem',position:i+1,name:w.title,url:canonical('/projects/'+w.id+'/')}))}};
const breadcrumbs=path=>[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:'Projects',item:canonical(directory)},...(path!==directory?[{'@type':'ListItem',position:3,name:websites.find(w=>'/projects/'+w.id+'/'===path)?.title||'Project',item:canonical(path)}]:[])];
const index=head(directory,directoryTitle,directoryDesc,listSchema,breadcrumbs(directory))
 +'<main class="projects-directory"><div class="wrap subnav"><a href="/">Home</a> / Projects</div>'
 +'<section class="projects-hero" aria-labelledby="projects-heading"><div class="wrap projects-hero-inner"><div class="projects-hero-copy"><span class="projects-eyebrow">SELECTED WORK / WEB · E-COMMERCE · ANDROID</span>'
 +'<h1 id="projects-heading">Ideas shaped into <span>digital experiences.</span></h1>'
 +'<p>Explore my website builds, interface prototypes and Android source projects. Open real project pages, review the technology, and see what was actually built.</p>'
 +'<div class="projects-hero-actions"><a class="projects-primary" href="#featured-projects">Explore projects</a><a class="projects-secondary" href="/contact/">Discuss a project</a></div>'
 +'<div class="projects-hero-stats" aria-label="Portfolio collection"><span><strong>5</strong> published web demos</span><span><strong>2</strong> Android source projects</span><span><strong>2</strong> featured websites</span></div>'
 +'</div><div class="projects-hero-visual" aria-hidden="true"><span class="projects-orbit projects-orbit-one"></span><span class="projects-orbit projects-orbit-two"></span><span class="projects-hero-core"></span><span class="projects-spark projects-spark-one"></span><span class="projects-spark projects-spark-two"></span></div></div></section>'
 +'<div class="wrap projects-directory-content">'
 +'<section id="featured-projects" class="projects-section" aria-labelledby="featured-heading"><div class="projects-section-head"><div><span class="projects-kicker">FEATURED BUILDS</span><h2 id="featured-heading">Explore the main projects</h2><p>Web experiences with dedicated domains and their own project breakdowns.</p></div><a class="projects-section-link" href="/web-development/">Web development portfolio</a></div>'
 +'<div class="cards projects-featured-grid">'+featuredCards+'</div></section>'
 +'<section id="more-projects" class="projects-section" aria-labelledby="more-heading"><div class="projects-section-head"><div><span class="projects-kicker">OTHER WORK</span><h2 id="more-heading">Web concepts &amp; prototypes</h2><p>Additional public site concepts and interface experiments.</p></div></div>'
 +'<div class="cards projects-concept-grid">'+conceptCards+'</div></section>'
 +'<section id="android-project" class="projects-section" aria-labelledby="android-heading"><div class="projects-section-head"><div><span class="projects-kicker">ANDROID DEVELOPMENT</span><h2 id="android-heading">Mobile application projects</h2><p>Two public Android source repositories: a Moavia SEO Pro starter and MealVerse food-ordering code. Neither is claimed as released.</p></div><a class="projects-section-link" href="/android-development/">Android development</a></div>'
 +'<div class="cards projects-android-grid">'+androidCards+'</div></section>'
 +'<section class="projects-contact-cta" aria-labelledby="projects-cta-heading"><div><span class="projects-kicker">HAVE AN IDEA?</span><h2 id="projects-cta-heading">Your project could be next.</h2><p>Need a business website, storefront or custom web experience? Share your goals and requirements.</p></div><a href="/contact/">Let’s discuss your project</a></section>'
 +'</div>'+sep+'</main>'+foot+'</body></html>\\n';
writeFileSync(join(root,'projects/index.html'),index,'utf8');
const paths=[directory];
for(const w of websites){
 const path='/projects/'+w.id+'/',url=canonical(path),
 title=w.title+' | Portfolio | Moavia Hassan',
 desc=w.description+' Read the problem, portfolio role, technology and source-visible outcomes.';
 const entity=w.kind==='android'
  ? {'@type':'SoftwareSourceCode',name:w.title,url,description:desc,codeRepository:w.repo,programmingLanguage:'Kotlin',
    creator:{'@type':'Person',name:'Moavia Hassan',url:origin+'/about/'},about:w.problem}
  : {'@type':'CreativeWork',name:w.title,url,description:desc,creator:{'@type':'Person',name:'Moavia Hassan',url:origin+'/about/'},isBasedOn:w.repo,
    about:w.problem};
 const list=(arr)=>'<ul>'+arr.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
 const body=head(path,title,desc,entity,breadcrumbs(path))
 +'<main><div class="wrap subnav"><a href="/">Home</a> / <a href="/projects/">Projects</a> / '+esc(w.title)+'</div>'
 +'<div class="hero"><div class="wrap"><span class="pill">'+esc(w.category)+'</span><h1>'+esc(w.title)+'</h1><p>'+esc(w.description)+'</p></div></div>'
 +'<div class="wrap project-layout"><section class="project-main"><h2>'+(w.kind==='android'?'Source-based app illustration':'Project screenshot')+'</h2>'+snapshot(w)
 +'<section><h2>Problem / project brief</h2><p>'+esc(w.problem)+'</p></section>'
 +'<section><h2>My portfolio role</h2><p>'+esc(w.role)+'</p></section>'
 +'<section><h2>What the repository includes</h2>'+list(w.work)+'</section>'
 +'<section><h2>Results and verification</h2><p>'+esc(w.result)+'</p><p class="project-note">No client name, testimonial, revenue, traffic increase or ranking claim has been added without independent evidence or permission.</p></section></section>'
 +'<aside class="card project-side"><h2>Technology stack</h2>'+list(w.stack)
 +'<h2>Links</h2>'+(w.kind==='android' ? '<p>'+link(w.repo,'View Android source repository')+'</p><p>No live app or store download is offered.</p>' : '<p>'+link(w.url,'View live project')+'</p><p>'+link(w.repo,'View source repository')+'</p>')
 +'<p><a href="/projects/">All projects</a></p>'
 +'<p class="project-note">This is a public '+(w.kind==='android'?'Android source project':'portfolio demo')+', not proof of a paid engagement or verified user results.</p></aside></div></main>'
 +foot+'</body></html>\n';
 const d=join(root,'projects',w.id);mkdirSync(d,{recursive:true});
 writeFileSync(join(d,'index.html'),body,'utf8');
 paths.push(path);
}
const sitemapPath=join(root,'sitemap.xml');
let xml=readFileSync(sitemapPath,'utf8');
if(!xml.includes('</urlset>'))throw Error('Sitemap root missing; run SEO generator before project generator.');
for(const p of paths)if(xml.includes('<loc>'+canonical(p)+'</loc>'))throw Error('Duplicate sitemap entry: '+p);
xml=xml.replace('</urlset>',paths.map(p=>'  <url><loc>'+canonical(p)+'</loc></url>').join('\n')+'\n</urlset>');
writeFileSync(sitemapPath,xml,'utf8');
console.log('Generated '+paths.length+' canonical portfolio pages for '+websites.length+' verified web and Android repositories.');
