import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { contactHero, contactContent } from './contact-premium-template.mjs';
import { hireHero, hireContent } from './hire-premium-template.mjs';
const origin='https://moaviaseo.com';
const root=join(process.cwd(),'public');
const clean=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const nav='<nav aria-label="Main navigation"><a href="/tools/">Tools</a><a href="/hire-me/">Services</a><a href="/projects/">Projects</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav>';
function page(path,title,description,body,kind){
 const url=origin+path;
 const isContact=kind==='contact';
 const isHire=kind==='hire';
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':kind==='hire'?'WebPage':'ContactPage',name:title,description,url},
  {'@type':'BreadcrumbList',itemListElement:[
   {'@type':'ListItem',position:1,name:'Home',item:origin+'/'},
   {'@type':'ListItem',position:2,name:kind==='hire'?'Hire Me':'Contact',item:url}
  ]}
 ]};
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
 +'<title>'+clean(title)+'</title><meta name="description" content="'+clean(description)+'">'
 +'<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="'+url+'">'
 +'<meta property="og:site_name" content="Moavia Hassan"><meta property="og:title" content="'+clean(title)+'">'
 +'<meta property="og:description" content="'+clean(description)+'"><meta property="og:url" content="'+url+'">'
 +'<meta property="og:image" content="'+origin+'/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+origin+'/social-preview.png"><link rel="icon" type="image/png" href="/favicon.png">'
 +'<link rel="stylesheet" href="/seo/pages.css"'
 +(isContact?'<link rel="stylesheet" href="/contact-premium.css">':'')
 +(isHire?'<link rel="stylesheet" href="/hire-premium.css"><script src="/web-showcase.js" defer></script>':'')
 +'<script type="application/ld+json">'+JSON.stringify(schema).replace(/</g,'\u003c')+'</script>'
 +'</head><body'+(isContact?' class="contact-premium-page"':(isHire?' class="hire-premium-page"':''))+'><header><div class="wrap"><a class="brand" href="/"><img src="/site-logo.png" width="42" height="42" alt="Moavia Hassan logo">Moavia Hassan</a>'
 +nav+'</div></header>'
 +'<main><div class="wrap subnav"><a href="/">Home</a> / '+(kind==='hire'?'Hire Me':'Contact')+'</div>'
 +(isHire?hireHero():(isContact?contactHero():'<div class="hero"><div class="wrap"><span class="pill">SEO Tools · Services · Web/App Projects</span><h1>'+clean(title.replace(' | Moavia Hassan',''))+'</h1><p>'+clean(description)+'</p></div></div>'))
 +'<div class="wrap'+(isContact?' contact-premium-content':(isHire?' hire-premium-content':''))+'">'+body+'</div></main>'
 +'<footer><div class="wrap"><div><strong>Moavia Hassan</strong><p>Islamabad, Pakistan</p></div>'
 +'<div><a href="/tools/">Tools</a> · <a href="/hire-me/">Services</a> · <a href="/projects/">Projects</a> · <a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms-and-conditions/">Terms</a></div>'
 +'<div><a href="mailto:hello@moaviaseo.com">Email</a></div></div></footer></body></html>\n';
 const dir=join(root,path.replace(/^\/|\/$/g,''));mkdirSync(dir,{recursive:true});
 writeFileSync(join(dir,'index.html'),html,'utf8');
}
page('/hire-me/','Hire Web Developer & SEO Services | Moavia Hassan',
'Discuss responsive website development, e-commerce, technical SEO and practical AI automation ideas with Moavia Hassan. View real projects and send an enquiry.',
hireContent(),
'hire');
page('/contact/','Contact Moavia Hassan | Website, SEO & Automation Projects',
 'Contact Moavia Hassan about website development, technical SEO, online tools or automation ideas. Reach out by email, WhatsApp or the project enquiry form.',
 contactContent(),
 'contact');
const old='/services/';
const target='/hire-me/';
const d=join(root,'services');mkdirSync(d,{recursive:true});
writeFileSync(join(d,'index.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url='+target+'"><link rel="canonical" href="'+origin+target+'"><title>Page moved | Moavia Hassan</title></head><body><main><h1>Page moved</h1><p>Visit <a href="'+target+'">Hire Me</a>.</p></main></body></html>\n','utf8');
const moved=[old,'/services/seo/','/services/local-seo-islamabad/','/services/aeo-geo-optimization/','/services/ai-website-development/','/services/wordpress-development/','/services/google-ads/','/services/meta-ads/'];
writeFileSync(join(root,'_redirects'),moved.map(p=>p+' '+target+' 301').join('\n')+'\n','utf8');
const sitemapFile=join(root,'sitemap.xml');let xml=readFileSync(sitemapFile,'utf8');
if(!xml.includes('</urlset>')||xml.includes('<loc>'+origin+'/hire-me/</loc>'))throw Error('Sitemap generator ordering invalid');
const toolRoutes=['/tools/','/tools/meta-title-description-checker/','/tools/json-ld-schema-generator/','/tools/robots-txt-sitemap-generator/'];
for(const route of toolRoutes){
 if(xml.includes('<loc>'+origin+route+'</loc>'))throw Error('Duplicate tool sitemap entry: '+route);
 const pageFile=join(root,route.slice(1,-1),'index.html');
 if(!readFileSync(pageFile,'utf8').includes('href="'+origin+route+'"'))throw Error('Tool page canonical missing: '+route);
}
xml=xml.replace('</urlset>','  <url><loc>'+origin+'/hire-me/</loc></url>\n  <url><loc>'+origin+'/contact/</loc></url>\n'+toolRoutes.map(route=>'  <url><loc>'+origin+route+'</loc></url>').join('\n')+'\n</urlset>');
writeFileSync(sitemapFile,xml,'utf8');
console.log('Generated Hire Me and Contact pages with redirects for retired service URLs.');
