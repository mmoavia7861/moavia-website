import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Generate useful independently indexable service and contact hubs after the
// existing static pages; keep all other sitemap URLs intact.
const origin = 'https://moaviaseo.com';
const root = join(process.cwd(),'public');
const services = [
  ['/services/seo/','Technical and On-page SEO','Indexability audits, keyword intent, on-page improvements and realistic Search Console reporting.'],
  ['/services/local-seo-islamabad/','Local SEO Islamabad','Business profile eligibility, location relevance, service information and genuine review practices.'],
  ['/services/aeo-geo-optimization/','AEO and GEO Optimization','Clear, crawlable answers to customer questions and honest AI-search visibility evaluation.'],
  ['/services/ai-website-development/','AI-assisted Website Development','Human-reviewed responsive website prototypes, implementation and testing.'],
  ['/services/wordpress-development/','WordPress Development','Custom business websites, content management, accessibility and performance checks.'],
  ['/services/google-ads/','Google Ads','Search campaign structure, useful landing pages, conversions and reporting.'],
  ['/services/meta-ads/','Meta Ads','Paid social messaging, lead quality and consent-aware measurement.']
];
const clean=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function page(path,title,description,body,kind){
 const url=origin+path;
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':kind==='services'?'CollectionPage':'ContactPage',name:title,description,url},
  {'@type':'BreadcrumbList',itemListElement:[
   {'@type':'ListItem',position:1,name:'Home',item:origin+'/'},
   {'@type':'ListItem',position:2,name:kind==='services'?'Services':'Contact',item:url}
  ]}
 ]};
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
 +'<title>'+clean(title.includes('Moavia SEO Pro')?title:title+' | Moavia SEO Pro')+'</title><meta name="description" content="'+clean(description)+'">'
 +'<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="'+url+'">'
 +'<meta property="og:site_name" content="Moavia SEO Pro"><meta property="og:title" content="'+clean(title)+'">'
 +'<meta property="og:description" content="'+clean(description)+'"><meta property="og:url" content="'+url+'">'
 +'<meta property="og:image" content="'+origin+'/site-logo.png"><link rel="icon" type="image/png" href="/favicon.png">'
 +'<link rel="stylesheet" href="/seo/pages.css">'
 +'<script type="application/ld+json">'+JSON.stringify(schema).replace(/</g,'\\u003c')+'</script>'
 +'</head><body><header><div class="wrap"><a class="brand" href="/"><img src="/site-logo.png" width="42" height="42" alt="">Moavia SEO Pro</a>'
 +'<nav aria-label="Main navigation"><a href="/">Home</a><a href="/services/">Services</a><a href="/about/">About</a><a href="/blog/">Blog</a><a href="/contact/">Contact</a></nav></div></header>'
 +'<main><div class="wrap subnav"><a href="/">Home</a> / '+(kind==='services'?'Services':'Contact')+'</div>'
 +'<div class="hero"><div class="wrap"><span class="pill">Islamabad, Pakistan</span><h1>'+clean(title)+'</h1><p>'+clean(description)+'</p></div></div>'
 +'<div class="wrap">'+body+'</div></main>'
 +'<footer><div class="wrap"><div><strong>Moavia SEO Pro</strong><p>Islamabad, Pakistan</p></div>'
 +'<div><a href="/about/">About</a> · <a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms-and-conditions/">Terms</a></div>'
 +'<div><a href="mailto:moaviahassan124@gmail.com">Email us</a></div></div></footer></body></html>\n';
 const dir=join(root,path.replace(/^\/|\/$/g,''));mkdirSync(dir,{recursive:true});
 writeFileSync(join(dir,'index.html'),html,'utf8');
}
const serviceCards=services.map(([url,title,description])=>'<article class="card"><h3><a href="'+url+'">'+clean(title)+'</a></h3><p>'+clean(description)+'</p></article>').join('');
page('/services/','SEO, Website Development and Digital Marketing Services',
'Explore SEO, local SEO, AEO/GEO, WordPress and paid advertising services from Moavia SEO Pro, Islamabad.',
'<section><h2>What we can help you evaluate</h2><p>Start with the website and business problem rather than a ranking claim. We can discuss search visibility, helpful content, website performance, enquiry forms and paid marketing measurement. A service conversation is not a guarantee of results.</p>'
+'<div class="cards">'+serviceCards+'</div></section>'
+'<section><h2>Our working approach</h2><ol class="clean"><li>Share your website, goals and target audience.</li><li>Review available site and Search Console information.</li><li>Agree project scope, priorities, timeline and measurement.</li><li>Track real enquiries and relevant performance indicators.</li></ol></section>'
+'<section class="faq"><h2>Service questions</h2><details><summary>Can you guarantee a Google ranking?</summary><p>No. Rankings depend on relevance, quality, competition and search systems outside our control. We discuss realistic work and measurable progress.</p></details>'
+'<details><summary>Do you offer services for businesses outside Islamabad?</summary><p>Remote projects can be discussed case by case. Location, availability and terms must be confirmed for each engagement.</p></details></section>'
+'<section class="card"><h2>Talk about your website</h2><p>Send your website address and what needs improving.</p><a class="action" href="/contact/">Contact Moavia SEO Pro</a></section>',
'services');
page('/contact/','Contact Moavia SEO Pro in Islamabad',
'Contact Moavia SEO Pro about technical SEO, AEO/GEO, web development or digital marketing. Email, WhatsApp or submit a consultation enquiry.',
'<section><h2>Contact channels</h2><p>Moavia SEO Pro is based in Islamabad, Pakistan. Please use email or WhatsApp for a project enquiry. We do not advertise a staffed walk-in office or an unverified street address.</p>'
+'<div class="cards"><article class="card"><h3>Email</h3><p><a href="mailto:moaviahassan124@gmail.com">moaviahassan124@gmail.com</a></p><p>Describe your website, services and goals.</p></article>'
+'<article class="card"><h3>WhatsApp</h3><p><a href="https://wa.me/923234313869" target="_blank" rel="noopener noreferrer">+92 323 4313869</a></p><p>Ask about project availability and next steps.</p></article>'
+'<article class="card"><h3>Website consultation form</h3><p>The consultation form is available on our homepage, with fields for business, services and project details.</p>'
+'<p><a href="/#contact">Open the consultation form</a></p></article></div></section>'
+'<section><h2>What to include</h2><ul class="clean"><li>Your website URL if you have one</li><li>The audience or location you want to reach</li><li>Your biggest SEO, design or marketing challenge</li><li>A preferred way to reply</li></ul>'
+'<p>Do not send passwords or sensitive customer records. Read the <a href="/privacy-policy/">Privacy Policy</a> for information about how form enquiries and technical information are processed.</p></section>'
+'<section><h2>Useful starting points</h2><p><a href="/services/">Browse our services</a> · <a href="/projects/">Explore website projects</a> · <a href="/about/">About the agency</a></p></section>',
'contact');
const sitemapFile=join(root,'sitemap.xml');
let xml=readFileSync(sitemapFile,'utf8');
if(!xml.includes('</urlset>')||xml.includes('<loc>'+origin+'/services/</loc>'))throw Error('Sitemap generator ordering invalid');
xml=xml.replace('</urlset>','  <url><loc>'+origin+'/services/</loc></url>\n  <url><loc>'+origin+'/contact/</loc></url>\n</urlset>');
writeFileSync(sitemapFile,xml,'utf8');
console.log('Generated 2 service/contact hub pages; total sitemap URLs '+(xml.match(/<loc>/g)||[]).length);
