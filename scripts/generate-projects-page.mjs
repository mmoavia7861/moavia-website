import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const origin='https://moaviaseo.com';
const root=join(process.cwd(),'public');
const websites=JSON.parse(readFileSync(join(process.cwd(),'src/data/githubProjects.json'),'utf8'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const json=s=>JSON.stringify(s).replace(/</g,'\\u003c');
const canonical=path=>origin+path;
const image=origin+'/social-preview.png';
const thumb=url=>'https://image.thum.io/get/width/960/crop/680/maxAge/72/'+url;
const nav='<nav aria-label="Main navigation"><a href="/tools/">Tools</a><a href="/hire-me/">Services</a><a href="/projects/" aria-current="page">Projects</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav>';
const foot='<footer><div class="wrap"><div><strong>Moavia Hassan</strong><p>SEO Tools · Services · Web/App Projects</p></div><div><a href="/tools/">Tools</a> · <a href="/hire-me/">Services</a> · <a href="/projects/">Projects</a> · <a href="/privacy-policy/">Privacy</a> · <a href="/contact/">Contact</a></div></div></footer>';
const sep='<div class="wrap"><p class="project-note">These are public website demos, not verified paid-client case studies. Descriptions cover source-visible work, not traffic, leads, rankings or revenue.</p></div>';
function head(path,title,description,entity,crumbs) {
 const url=canonical(path);
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
 +'<title>'+esc(title)+'</title><meta name="description" content="'+esc(description)+'">'
 +'<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="'+esc(url)+'">'
 +'<meta property="og:type" content="website"><meta property="og:site_name" content="Moavia Hassan">'
 +'<meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(description)+'">'
 +'<meta property="og:url" content="'+esc(url)+'"><meta property="og:image" content="'+image+'"><meta property="og:image:alt" content="Moavia Hassan SEO tools and web projects banner"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
 +'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+esc(title)+'"><meta name="twitter:description" content="'+esc(description)+'"><meta name="twitter:image" content="'+image+'">'
 +'<link rel="icon" href="/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">'
 +'<link rel="stylesheet" href="/seo/pages.css"><link rel="stylesheet" href="/projects/projects.css">'
 +'<script type="application/ld+json">'+json({'@context':'https://schema.org','@graph':[entity,{'@type':'BreadcrumbList',itemListElement:crumbs}]})+'</script></head><body>'
 +'<header><div class="wrap"><a class="brand" href="/">Moavia Hassan</a>'+nav+'</div></header>';
}
function link(href,label) { return '<a href="'+esc(href)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>'; }
function snapshot(w) {
 return '<figure class="project-screenshot"><img src="'+esc(thumb(w.url))+'" width="960" height="544" loading="lazy" decoding="async" referrerpolicy="no-referrer" alt="Live screenshot preview of '+esc(w.title)+'" onerror="this.hidden=true;this.nextElementSibling.hidden=false">'
 +'<p hidden class="project-screenshot-unavailable">Screenshot preview is unavailable. Use the live project link to inspect the website.</p>'
 +'<figcaption>Live page thumbnail provided by Thum.io. It may change or be unavailable; this is not an analytics or results screenshot.</figcaption></figure>';
}
if(websites.length!==4||new Set(websites.map(w=>w.id)).size!==4||websites.some(w=>!/^https:\/\/mmoavia7861\.github\.io\/[A-Za-z0-9_.-]+\/$/.test(w.url)
 || !/^[a-z0-9-]+$/.test(w.id) || !w.problem || !w.role || !w.result || !w.repo || !Array.isArray(w.stack) || !Array.isArray(w.work))) {
 throw Error('Project data must contain four unique real public project demos with complete fields.');
}
mkdirSync(join(root,'projects'),{recursive:true});
const directory='/projects/',directoryTitle='Website Projects & Case Notes | Moavia Hassan',
directoryDesc='Explore four public website demos, each with its brief, role, technology stack, real preview and verified deliverables. No invented client results.';
const cards=websites.map(w=>
 '<article class="card project-card"><span class="pill">'+esc(w.category)+'</span><h2><a href="/projects/'+esc(w.id)+'/">'+esc(w.title)+'</a></h2>'
 +'<p>'+esc(w.description)+'</p><p class="project-card-actions"><a class="action" href="/projects/'+esc(w.id)+'/">Read project details</a> '+link(w.url,'Open live demo')+'</p></article>'
).join('');
const listSchema={'@type':'CollectionPage',url:canonical(directory),name:directoryTitle,description:directoryDesc,
 mainEntity:{'@type':'ItemList',itemListElement:websites.map((w,i)=>({'@type':'ListItem',position:i+1,name:w.title,url:canonical('/projects/'+w.id+'/')}))}};
const breadcrumbs=path=>[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:'Projects',item:canonical(directory)},...(path!==directory?[{'@type':'ListItem',position:3,name:websites.find(w=>'/projects/'+w.id+'/'===path)?.title||'Project',item:canonical(path)}]:[])];
const index=head(directory,directoryTitle,directoryDesc,listSchema,breadcrumbs(directory))
 +'<main><div class="wrap subnav"><a href="/">Home</a> / Projects</div><div class="hero"><div class="wrap"><span class="pill">Portfolio</span><h1>Public web projects</h1><p>'+esc(directoryDesc)+'</p></div></div>'
 +sep+'<div class="wrap"><section aria-label="Project directory"><div class="cards">'+cards+'</div></section></div></main>'+foot+'</body></html>\n';
writeFileSync(join(root,'projects/index.html'),index,'utf8');
const paths=[directory];
for(const w of websites){
 const path='/projects/'+w.id+'/',url=canonical(path),
 title=w.title+' | Portfolio | Moavia Hassan',
 desc=w.description+' Read the problem, portfolio role, technology and source-visible outcomes.';
 const entity={'@type':'CreativeWork',name:w.title,url,description:desc,creator:{'@type':'Person',name:'Moavia Hassan',url:origin+'/about/'},isBasedOn:w.repo,
  about:w.problem};
 const list=(arr)=>'<ul>'+arr.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
 const body=head(path,title,desc,entity,breadcrumbs(path))
 +'<main><div class="wrap subnav"><a href="/">Home</a> / <a href="/projects/">Projects</a> / '+esc(w.title)+'</div>'
 +'<div class="hero"><div class="wrap"><span class="pill">'+esc(w.category)+'</span><h1>'+esc(w.title)+'</h1><p>'+esc(w.description)+'</p></div></div>'
 +'<div class="wrap project-layout"><section class="project-main"><h2>Project screenshot</h2>'+snapshot(w)
 +'<section><h2>Problem / project brief</h2><p>'+esc(w.problem)+'</p></section>'
 +'<section><h2>My portfolio role</h2><p>'+esc(w.role)+'</p></section>'
 +'<section><h2>What the repository includes</h2>'+list(w.work)+'</section>'
 +'<section><h2>Results and verification</h2><p>'+esc(w.result)+'</p><p class="project-note">No client name, testimonial, revenue, traffic increase or ranking claim has been added without independent evidence or permission.</p></section></section>'
 +'<aside class="card project-side"><h2>Technology stack</h2>'+list(w.stack)
 +'<h2>Links</h2><p>'+link(w.url,'View live project')+'</p><p>'+link(w.repo,'View source repository')+'</p><p><a href="/projects/">All projects</a></p>'
 +'<p class="project-note">This is a publicly linked portfolio demo, not proof of a paid engagement.</p></aside></div></main>'
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
console.log('Generated '+paths.length+' canonical portfolio pages for '+websites.length+' public website demos.');
