import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dist=join(process.cwd(),'dist'), base='https://moaviaseo.com';
const routes=[
 '/guides/seo-aeo-geo-explained/','/guides/technical-seo-checklist/',
 '/about/','/privacy-policy/','/terms-and-conditions/','/blog/',
 '/blog/technical-seo-playbook-2026/','/blog/ai-generated-websites-human-engineering/',
 '/blog/mastering-meta-ads-capi-cro/','/blog/local-seo-google-maps-3pack/',
 '/blog/image-video-resolution-cro/','/blog/google-search-console-discovered-vs-indexed/',
 '/blog/seo-aeo-geo-small-business-guide/','/projects/','/hire-me/','/contact/'
];
const read=path=>readFileSync(join(dist,path),'utf8');
const check=(ok,err)=>{if(!ok)throw Error('Site build check failed: '+err)};
const sitemap=read('sitemap.xml'),root=read('index.html');
check(read('robots.txt').includes('Sitemap: '+base+'/sitemap.xml'),'missing sitemap rule');
check(root.includes('<link rel="canonical" href="'+base+'/"'),'missing homepage canonical');
check(root.includes('<h1>Moavia Hassan: SEO Tools &amp; Web Projects</h1>'),'wrong homepage fallback H1');
check(root.includes('Moavia Hassan: SEO Tools & Web Projects'),'wrong site title');
check(root.includes('https://moaviaseo.com/#person'),'person schema missing');
check(root.includes('mailto:hello@moaviaseo.com'),'public homepage must use verified domain email');
check(existsSync(join(dist,'moavia-hassan-portrait.webp')),'Professional photo asset missing');
check(!root.includes('Moavia SEO Pro'),'old agency branding still in homepage');
check(!root.includes('moaviahassan124@gmail.com'),'legacy personal email should not appear on public homepage');
for(const href of ['/#tools','/projects/','/about/','/contact/','/hire-me/']){
 check(root.includes('href="'+href+'"'),'homepage link missing: '+href);
}
for(const asset of ['favicon.png','site-logo.png','apple-touch-icon.png','site.webmanifest'])check(existsSync(join(dist,asset)),'asset missing: '+asset);
check(sitemap.includes('<loc>'+base+'/</loc>'),'homepage missing from sitemap');
check((sitemap.match(/<loc>/g)||[]).length===routes.length+1,'unexpected sitemap route count');
for(const route of routes){
 const f=join(dist,route.replace(/^\/|\/$/g,''),'index.html');
 check(existsSync(f),'page missing: '+route);
 const html=readFileSync(f,'utf8');
 check(html.includes('href="'+base+route+'"'),'canonical missing: '+route);
 check(html.includes('<h1>')&&html.includes('</h1>'),'page H1 missing: '+route);
 check(html.includes('<meta name="description"'),'description missing: '+route);
 check(html.includes('application/ld+json'),'schema missing: '+route);
 check(sitemap.includes('<loc>'+base+route+'</loc>'),'sitemap missing: '+route);
 check(html.includes('href="/favicon.png"'),'favicon missing: '+route);
 if(route==='/about/') {
  check(html.includes('https://github.com/mmoavia7861'),'About missing GitHub');
  check(html.includes('/moavia-hassan-portrait.webp'),'About portrait missing');
  check(html.includes('https://www.linkedin.com/in/moavia-hassan-seo/'),'About missing LinkedIn');
  check(!html.includes('Illustrative founder portrait'),'Unverified portrait still shown');
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
console.log('Validated '+routes.length+' canonical pages, personal homepage, retired service redirects, and sitemap.');
