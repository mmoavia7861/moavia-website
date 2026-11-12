import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dist=join(process.cwd(),'dist'), base='https://moaviaseo.com';
const routes=[
 '/guides/seo-aeo-geo-explained/','/guides/technical-seo-checklist/',
 '/about/','/privacy-policy/','/terms-and-conditions/','/blog/',
 '/blog/technical-seo-playbook-2026/','/blog/ai-generated-websites-human-engineering/',
 '/blog/mastering-meta-ads-capi-cro/','/blog/local-seo-google-maps-3pack/',
 '/blog/image-video-resolution-cro/','/blog/google-search-console-discovered-vs-indexed/',
 '/blog/seo-aeo-geo-small-business-guide/','/projects/','/projects/ranknova/','/projects/dark-agency/','/projects/agency-multipage/','/projects/umm-e-aiman/','/hire-me/','/contact/',
 '/tools/','/tools/meta-title-description-checker/','/tools/json-ld-schema-generator/','/tools/robots-txt-sitemap-generator/'
];
const read=path=>readFileSync(join(dist,path),'utf8');
const check=(ok,err)=>{if(!ok)throw Error('Site build check failed: '+err)};
const sitemap=read('sitemap.xml'),root=read('index.html');
check(read('robots.txt').includes('Sitemap: '+base+'/sitemap.xml'),'missing sitemap rule');
const social=readFileSync(join(dist,'social-preview.png'));
check(social.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')),'social image not PNG');
check(social.readUInt32BE(16)===1200&&social.readUInt32BE(20)===630,'social image not 1200x630');
check(root.includes('<link rel="canonical" href="'+base+'/"'),'missing homepage canonical');
check(root.includes('<h1>Moavia Hassan: SEO Tools &amp; Web Projects</h1>'),'wrong homepage fallback H1');
check(root.includes('Moavia Hassan: SEO Tools & Web Projects'),'wrong site title');
check(root.includes('https://moaviaseo.com/#person'),'person schema missing');
check(root.includes('mailto:hello@moaviaseo.com'),'public homepage must use verified domain email');
check(existsSync(join(dist,'moavia-hassan-portrait.webp')),'Professional photo asset missing');
check(!root.includes('Moavia SEO Pro'),'old agency branding still in homepage');
check(root.includes('name="twitter:card"'),'homepage twitter card missing');
check(root.includes('https://moaviaseo.com/social-preview.png'),'homepage social image missing');
check(readFileSync(join(process.cwd(),'src/App.tsx'),'utf8').includes("{ label: 'About', href: '/about/' }"),'homepage About link must open About page');
check(readFileSync(join(process.cwd(),'src/App.tsx'),'utf8').includes("{ label: 'Contact', href: '/contact/' }"),'homepage Contact link must open Contact page');
check(!root.includes('moaviahassan124@gmail.com'),'legacy personal email should not appear on public homepage');
for(const href of ['/tools/','/projects/','/about/','/contact/','/hire-me/','/tools/meta-title-description-checker/','/tools/json-ld-schema-generator/','/tools/robots-txt-sitemap-generator/']){
 check(root.includes('href="'+href+'"'),'homepage link missing: '+href);
}
for(const asset of ['favicon.png','site-logo.png','apple-touch-icon.png','site.webmanifest'])check(existsSync(join(dist,asset)),'asset missing: '+asset);
check(sitemap.includes('<loc>'+base+'/</loc>'),'homepage missing from sitemap');
check((sitemap.match(/<loc>/g)||[]).length===routes.length+1,'unexpected sitemap route count');
const rootMap=readFileSync(join(process.cwd(),'sitemap.xml'),'utf8'),rootRobots=readFileSync(join(process.cwd(),'robots.txt'),'utf8');
const urls=x=>[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).sort().join('\n');
check(urls(rootMap)===urls(sitemap),'repository root sitemap out of sync with generated sitemap');
check(rootRobots.trim()===read('robots.txt').trim(),'repository root robots.txt differs from deployed robots.txt');
for(const route of routes){
 const f=join(dist,route.replace(/^\/|\/$/g,''),'index.html');
 check(existsSync(f),'page missing: '+route);
 const html=readFileSync(f,'utf8');
 check(html.includes('href="'+base+route+'"'),'canonical missing: '+route);
 if(route.startsWith('/tools/')){
  check(html.includes('href="/tools/toolkit.css"'),'tool CSS missing: '+route);
  check(html.includes('href="/tools/"'),'tools navigation missing: '+route);
  if(route!=='/tools/')check(html.includes('src="/tools/toolkit.js"'),'tool JavaScript missing: '+route);
 }
 if(route==='/projects/')check(html.includes('href="/projects/ranknova/"'),'RankNova missing from project directory');
 if(route.startsWith('/blog/')||route.startsWith('/guides/')){
  check(html.includes('href="/tools/"'),'old tools navigation found: '+route);
  check(!html.includes('href="/services/seo/"'),'old SEO agency page linked: '+route);
  check(!html.includes('href="/#contact"'),'old contact anchor found: '+route);
  check(!html.includes('About the team'),'old agency byline found: '+route);
 }
 if(route.startsWith('/projects/')){check(html.includes('property="og:image"'),'project social image missing: '+route);check(html.includes('name="twitter:card"'),'project Twitter card missing: '+route);if(route!=='/projects/'){for(const label of ['Project screenshot','My portfolio role','Technology stack','Results and verification','View live project'])check(html.includes(label),'project section missing '+label+': '+route);check(html.includes('image.thum.io/get/'),'project screenshot source missing: '+route);}} 
 check(html.includes('<h1>')&&html.includes('</h1>'),'page H1 missing: '+route);
 check(html.includes('<meta name="description"'),'description missing: '+route);
 check(html.includes('application/ld+json'),'schema missing: '+route);
 check(html.includes('property="og:image"'),'social preview image missing: '+route);
 check(html.includes('https://moaviaseo.com/social-preview.png'),'social preview URL missing: '+route);
 check(html.includes('content="1200"')&&html.includes('content="630"'),'social preview dimensions missing: '+route);
 check(html.includes('name="twitter:card"'),'Twitter card missing: '+route);
 check(sitemap.includes('<loc>'+base+route+'</loc>'),'sitemap missing: '+route);
 check(html.includes('href="/favicon.png"'),'favicon missing: '+route);
 if(route==='/about/') {
  check(html.includes('https://github.com/mmoavia7861'),'About missing GitHub');
  check(html.includes('/moavia-hassan-portrait.webp'),'About portrait missing');
  check(html.includes('https://www.linkedin.com/in/moavia-hassan-seo/'),'About missing LinkedIn');
  check(!html.includes('Illustrative founder portrait'),'Unverified portrait still shown');
  check(html.includes('src="/moavia-hassan-portrait.webp"'),'About portrait not rendered');
  check(html.includes('href="https://github.com/mmoavia7861"'),'GitHub profile not linked');
  check(html.includes('href="https://www.linkedin.com/in/moavia-hassan-seo/"'),'LinkedIn profile not linked');
 }
  if(['/about/','/privacy-policy/','/terms-and-conditions/','/contact/','/hire-me/'].includes(route)) {
    check(html.includes('hello@moaviaseo.com'),'domain email missing: '+route);
    check(!html.includes('moaviahassan124@gmail.com'),'old personal email remains: '+route);
  }
 const matched=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 check(Boolean(matched),'schema script missing: '+route);JSON.parse(matched[1]);
 if(route.startsWith('/blog/')&&route!=='/blog/')check(/<time datetime="\d{4}-\d{2}-\d{2}">/.test(html),'blog date missing: '+route);
}
for(const route of ['/services/','/services/seo/','/services/google-ads/','/services/meta-ads/']){
 const html=read(join(route.replace(/^\/|\/$/g,''),'index.html'));
 check(html.includes('noindex')&&html.includes('/hire-me/'),'retired route not redirected: '+route);
 check(!sitemap.includes('<loc>'+base+route+'</loc>'),'retired route in sitemap: '+route);
}
check(read('_redirects').includes('/services/meta-ads/ /hire-me/ 301'),'Cloudflare redirect missing');
check(existsSync(join(dist,'404.html')),'404 missing');
for(const asset of ['tools/toolkit.js','tools/toolkit.css'])check(existsSync(join(dist,asset)),'tool asset missing: '+asset);
const clientJs=read('tools/toolkit.js');
for(const marker of ['initMeta','initSchema','initCrawler','downloadRobots','downloadSitemap','downloadSchema','snippetTitle'])check(clientJs.includes(marker),'tool functionality marker missing: '+marker);
console.log('Validated '+routes.length+' canonical pages, personal homepage, retired service redirects, and sitemap.');
