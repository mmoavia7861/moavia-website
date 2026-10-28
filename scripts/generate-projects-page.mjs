import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const root = join(process.cwd(),'public');
const host = 'https://moaviaseo.com';
const url = host+'/projects/';
const projects=JSON.parse(readFileSync(join(process.cwd(),'src/data/githubProjects.json'),'utf8'));
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
if(!projects.length || projects.some(p=>!/^https:\/\/github\.com\/mmoavia7861\/[\w.-]+$/.test(p.repoUrl)))throw Error('Unverified GitHub URL');
const title='Real GitHub Projects | Moavia SEO Pro';
const description='Explore five public source code repositories for Moavia SEO Pro, educational portal development, static websites and an Android starter.';
const schema={'@context':'https://schema.org','@graph':[
  {'@type':'CollectionPage',name:title,url,description},
  {'@type':'ItemList',itemListElement:projects.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.title,url:p.repoUrl}))}
]};
const cards=projects.map(p=>'<article class="card"><span class="pill">'+e(p.category)+' · '+e(p.stage)+'</span>'
+'<h2>'+e(p.title)+'</h2><p>'+e(p.description)+'</p>'
+'<h3>Features represented in the repository</h3><ul class="clean">'+p.highlights.map(h=>'<li>'+e(h)+'</li>').join('')+'</ul>'
+'<p><strong>Technologies:</strong> '+e(p.stack.join(', '))+'</p>'
+'<p><a href="'+e(p.repoUrl)+'" target="_blank" rel="noopener noreferrer">Open public GitHub source</a>'
+(p.liveUrl?' · <a href="'+e(p.liveUrl)+'" target="_blank" rel="noopener noreferrer">Visit live website</a>':'')+'</p></article>').join('');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
+'<title>'+e(title)+'</title><meta name="description" content="'+e(description)+'"><meta name="robots" content="index,follow,max-image-preview:large">'
+'<link rel="canonical" href="'+url+'"><meta property="og:title" content="'+e(title)+'"><meta property="og:description" content="'+e(description)+'">'
+'<meta property="og:url" content="'+url+'"><link rel="stylesheet" href="/seo/pages.css">'
+'<script type="application/ld+json">'+JSON.stringify(schema).replace(/</g,'\\u003c')+'</script></head><body>'
+'<header><div class="wrap"><a class="brand" href="/">Moavia SEO Pro</a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/#portfolio">Project cards</a><a href="/blog/">Blog</a><a href="/about/">About</a><a href="/#contact">Contact</a></nav></div></header>'
+'<main><div class="wrap subnav"><a href="/">Home</a> / Projects</div><div class="hero"><div class="wrap"><span class="pill">Source code portfolio</span>'
+'<h1>Real GitHub Projects</h1><p>'+e(description)+'</p><p>These repositories can be inspected directly. Some are prototypes or starter code rather than completed commercial deployments.</p></div></div>'
+'<div class="wrap"><section><h2>Explore the projects</h2><div class="cards">'+cards+'</div></section><section class="card">'
+'<h2>Discuss a project</h2><p>Want to discuss your own website, SEO or development requirements?</p><a class="action" href="/#contact">Contact the agency</a></section></div></main>'
+'<footer><div class="wrap"><div><strong>Moavia SEO Pro</strong><p>Islamabad, Pakistan</p></div><div><a href="/about/">About</a> · <a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms-and-conditions/">Terms</a></div></div></footer>'
+'</body></html>\n';
mkdirSync(join(root,'projects'),{recursive:true});
writeFileSync(join(root,'projects/index.html'),html,'utf8');
const path=join(root,'sitemap.xml');
const sitemap=readFileSync(path,'utf8');
if(!sitemap.includes('</urlset>')||sitemap.includes('<loc>'+url+'</loc>'))throw Error('Invalid project sitemap insertion');
writeFileSync(path,sitemap.replace('</urlset>','  <url><loc>'+url+'</loc></url>\n</urlset>'),'utf8');
console.log('Generated real project page and updated sitemap for '+projects.length+' public GitHub repositories.');
