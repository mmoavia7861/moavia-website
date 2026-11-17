/**
 * Public, read-only Firestore CMS renderer.
 * No credentials or Firebase Admin SDK are used here. Firestore Security Rules
 * must permit only published documents to be fetched anonymously.
 * All user content is escaped before inclusion in public HTML.
 */
type CmsCollection = 'blogPosts' | 'portfolioProjects' | 'cmsServices' | 'cmsPages';
type CmsRoute = 'blog' | 'projects' | 'offerings' | 'pages';
interface StaticAssets { fetch(request: Request): Promise<Response> }
export interface CmsEnvironment { ASSETS: StaticAssets }
const origin = 'https://moaviaseo.com';
const project = 'watchful-adapter-wbcxw';
const database = 'ai-studio-moaviaseoprodigi-1ac5ad8a-6ad0-4d35-b8d4-22db21a03fe4';
const prefix = 'https://firestore.googleapis.com/v1/projects/' + project + '/databases/' + database + '/documents';
const collectionMap: Record<CmsRoute,CmsCollection> = {
  blog: 'blogPosts',
  projects: 'portfolioProjects',
  offerings: 'cmsServices',
  pages: 'cmsPages',
};
const headingMap: Record<CmsRoute,string> = {
  blog:'Latest articles',
  projects:'Additional portfolio projects',
  offerings:'Additional services',
  pages:'Published pages',
};
const esc = (v:unknown) => String(v ?? '').replace(/&/g,'&amp;')
  .replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const fields = (data:any):Record<string,any> =>
  data && typeof data==='object' && data.fields && typeof data.fields==='object' ? data.fields : {};
const str = (doc:any,key:string):string =>
  typeof fields(doc)[key]?.stringValue === 'string' ? fields(doc)[key].stringValue : '';
const published = (doc:any):boolean => fields(doc).published?.booleanValue === true;
const slugOkay = (slug:string):boolean => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length<=60;
const httpsLink = (url:string):string => /^https:\/\/[a-z0-9.-]+(?::443)?(?:[/?#][^\s]*)?$/i.test(url) ? url : '';
const publicLink = (url:string):string => /^\/(?!\/)[a-z0-9\/#._?=&%-]*$/i.test(url) ? url : httpsLink(url);
const escapeJson = (value:unknown) => JSON.stringify(value).replace(/</g,'\\u003c');

async function fetchJson(url:string,init?:RequestInit):Promise<{ok:boolean;data:any}> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(),2500);
    try {
      const result = await fetch(url,{...init,signal:controller.signal});
      if (!result.ok) return {ok:false,data:null};
      const data = await result.json();
      return {ok:true,data};
    } finally { clearTimeout(timeout); }
  } catch { return {ok:false,data:null}; }
}
async function getDocument(collection:CmsCollection,slug:string):Promise<any|null> {
  if(!slugOkay(slug))return null;
  const result=await fetchJson(prefix+'/'+collection+'/'+slug);
  return result.ok && published(result.data)?result.data:null;
}
async function listDocuments(collection:CmsCollection):Promise<any[]|null> {
  // Query includes the published predicate. Firestore Rules are not filters,
  // so a public collection scan without the predicate would be rejected.
  const query={
    structuredQuery:{
      from:[{collectionId:collection}],
      where:{fieldFilter:{field:{fieldPath:'published'},op:'EQUAL',value:{booleanValue:true}}},
      limit:80,
    },
  };
  const result=await fetchJson(prefix+':runQuery',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify(query),
  });
  if(!result.ok || !Array.isArray(result.data)) return null;
  return result.data.map((entry:any)=>entry?.document).filter((entry:any)=>entry && published(entry));
}

const publicSettingFields = [
  'heroBadge','heroTitle','heroDescription','announcementEnabled','announcementText',
  'ctaLabel','ctaHref','contactEmail','whatsapp','seoTitle','seoDescription',
  'socialGithub','socialLinkedin','socialFiverr','socialUpwork',
  'toolTitles','toolDescriptions','toolVisible','updatedAt',
];
function decodeFirestoreValue(value:any):unknown {
  if(typeof value?.stringValue==='string')return value.stringValue;
  if(typeof value?.booleanValue==='boolean')return value.booleanValue;
  if(Array.isArray(value?.arrayValue?.values))
    return value.arrayValue.values.map(decodeFirestoreValue);
  return undefined;
}
export async function publicSiteJson():Promise<Response> {
  // Public presentation fields only. Never forward arbitrary Firestore records
  // or private customer data in this endpoint.
  const [settings,services,projects]=await Promise.all([
    fetchJson(prefix+'/siteSettings/public'),listDocuments('cmsServices'),listDocuments('portfolioProjects')
  ]);
  const publicSettings:Record<string,unknown> = {};
  if(settings.ok) {
    for(const name of publicSettingFields) {
      const value=decodeFirestoreValue(fields(settings.data)[name]);
      if(value!==undefined)publicSettings[name]=value;
    }
  }
  const present=(docs:any[]|null,kind:'service'|'project')=>(docs||[]).map(d=>({
    ...(kind==='service'?{slug:str(d,'slug')}:{id:str(d,'slug')}),
    title:str(d,'title').slice(0,140),
    ...(kind==='service'?{excerpt:str(d,'excerpt').slice(0,320)}:{
      description:str(d,'excerpt').slice(0,320),category:str(d,'category').slice(0,80)
    }),
  })).filter(row=>typeof row.title==='string' && row.title.length>0 &&
    slugOkay('slug' in row ? String(row.slug) : String(row.id)));
  return new Response(JSON.stringify({
    settings:publicSettings,
    services:present(services,'service'),
    projects:present(projects,'project'),
  }),{headers:{
    'Content-Type':'application/json; charset=utf-8',
    'Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff',
  }});
}

function routePath(route:CmsRoute,slug:string):string{return '/'+route+'/'+slug+'/';}
function plainTextBody(value:string):string {
  return value.split(/\n\s*\n/).slice(0,180).map(section=>{
    const text=section.trim().slice(0,18000);
    if(!text)return '';
    if(text.startsWith('## '))return '<h2>'+esc(text.slice(3))+'</h2>';
    if(text.startsWith('### '))return '<h3>'+esc(text.slice(4))+'</h3>';
    return '<p>'+esc(text).replace(/\n/g,' ')+'</p>';
  }).join('');
}
function buildDocumentPage(doc:any,route:CmsRoute,slug:string):string {
  const title=str(doc,'title').slice(0,140);
  const description=str(doc,'excerpt').slice(0,320);
  const category=str(doc,'category').slice(0,80);
  const body=str(doc,'body').slice(0,16000);
  const seoTitle=(str(doc,'metaTitle') || title+' | Moavia Hassan').slice(0,160);
  const seoDescription=(str(doc,'metaDescription') || description).slice(0,320);
  const canonical=origin+routePath(route,slug);
  const image=httpsLink(str(doc,'imageUrl'));
  const link=publicLink(str(doc,'linkUrl'));
  const repo=httpsLink(str(doc,'repoUrl'));
  const date=str(doc,'createdAt');
  const day=/^\d{4}-\d{2}-\d{2}/.test(date)?date.slice(0,10):'';
  const schemaType:Record<CmsRoute,string>={blog:'BlogPosting',projects:'CreativeWork',offerings:'Service',pages:'WebPage'};
  const schema:any={
    '@context':'https://schema.org',
    '@type':schemaType[route],name:title,url:canonical,description:seoDescription,
    author:{'@type':'Person',name:'Moavia Hassan',url:origin+'/about/'},
  };
  if(route==='blog'){schema.headline=title;if(day)schema.datePublished=day;}
  if(image)schema.image=image;
  const nav='<nav aria-label="Main navigation"><a href="/">Home</a><a href="/tools/">Tools</a><a href="/hire-me/">Services</a><a href="/projects/">Projects</a><a href="/blog/">Blog</a><a href="/contact/">Contact</a></nav>';
  const button=route==='projects'&&link?'<p><a class="cms-link" href="'+esc(link)+'" rel="noopener noreferrer" target="_blank">Visit live project</a></p>':'';
  const source=route==='projects'&&repo?'<p><a href="'+esc(repo)+'" rel="noopener noreferrer" target="_blank">View source repository</a></p>':'';
  const cta=route==='offerings'&&link?'<p><a class="cms-link" href="'+esc(link)+'">Get in touch</a></p>':'';
  const imageHtml=image?'<figure><img src="'+esc(image)+'" alt="'+esc(title)+'" loading="lazy" decoding="async" style="max-width:100%;height:auto;border-radius:12px"></figure>':'';
  const breadcrumb=route==='blog'?'Blog':route==='projects'?'Projects':route==='offerings'?'Services':'Pages';
  const intro=category?'<p class="cms-category">'+esc(category)+'</p>':'';
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
   +'<meta name="robots" content="index,follow,max-image-preview:large"><title>'+esc(seoTitle)+'</title>'
   +'<meta name="description" content="'+esc(seoDescription)+'"><link rel="canonical" href="'+esc(canonical)+'">'
   +'<meta property="og:type" content="'+(route==='blog'?'article':'website')+'"><meta property="og:title" content="'+esc(title)+'">'
   +'<meta property="og:description" content="'+esc(seoDescription)+'"><meta property="og:url" content="'+esc(canonical)+'">'
   +'<meta property="og:image" content="'+esc(image||origin+'/social-preview.png')+'"><meta name="twitter:card" content="summary_large_image">'
   +'<script type="application/ld+json">'+escapeJson(schema)+'</script>'
   +'<link rel="icon" type="image/png" href="/favicon.png"><link rel="stylesheet" href="/seo/pages.css"><script src="/analytics-consent.js" defer></script>'
   +'<style>.cms-wrap{max-width:900px;margin:0 auto;padding:2rem 1.25rem 5rem}.cms-wrap p{line-height:1.85}.cms-category{font-weight:700;color:#5265d8;text-transform:uppercase;font-size:.85rem}.cms-wrap article h2{margin-top:2rem}.cms-wrap article h3{margin-top:1.5rem}.cms-link{display:inline-block;background:#5265d8;color:#fff;border-radius:9px;padding:.8rem 1.1rem;text-decoration:none}header nav a{margin-right:1rem}</style>'
   +'</head><body><header><div class="wrap"><a class="brand" href="/"><img src="/site-logo.png" width="42" height="42" alt="Moavia Hassan logo">Moavia Hassan</a>'+nav+'</div></header>'
   +'<main><div class="cms-wrap"><p><a href="/">Home</a> / <a href="/'+route+'/">'+breadcrumb+'</a></p>'
   +'<article>'+intro+'<h1>'+esc(title)+'</h1><p>'+esc(description)+'</p>'
   +(route==='blog'&&day?'<p><time datetime="'+esc(day)+'">Published '+esc(day)+'</time></p>':'')
   +imageHtml+plainTextBody(body)+button+source+cta+'</article>'
   +'<p><a href="/contact/">Contact Moavia Hassan</a> · <a href="/privacy-policy/">Privacy Policy</a></p></div></main>'
   +'<footer><div class="wrap"><p>© Moavia Hassan · <a href="/about/">About</a> · <a href="/contact/">Contact</a></p></div></footer>'
   +'</body></html>';
}
function indexCards(route:CmsRoute,docs:any[]):string {
  const cards=docs.filter(published).map(d=>{
    const slug=str(d,'slug');
    if(!slugOkay(slug))return '';
    const title=str(d,'title').slice(0,140);
    const excerpt=str(d,'excerpt').slice(0,320);
    if(!title||!excerpt)return '';
    const href=routePath(route,slug);
    return '<article class="card"><h3><a href="'+esc(href)+'">'+esc(title)+'</a></h3>'
     +'<p>'+esc(excerpt)+'</p><p><a href="'+esc(href)+'">Read more</a></p></article>';
  }).join('');
  if(!cards)return '';
  return '<section class="wrap" aria-label="'+esc(headingMap[route])+'" style="padding:24px 20px 48px">'
   +'<h2>'+esc(headingMap[route])+'</h2><div class="cards">'+cards+'</div></section>';
}
function responseHtml(html:string,status=200):Response {
  return new Response(html,{status,headers:{
    'Content-Type':'text/html; charset=utf-8',
    'Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff',
    'Referrer-Policy':'strict-origin-when-cross-origin',
    'Content-Security-Policy':"object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    'X-Frame-Options':'DENY',
    'Strict-Transport-Security':'max-age=31536000',
  }});
}
async function injectListing(request:Request,env:CmsEnvironment,route:CmsRoute):Promise<Response> {
  const [assets,docs]=await Promise.all([env.ASSETS.fetch(request),listDocuments(collectionMap[route])]);
  if(!assets.ok || !docs || docs.length===0)return assets;
  const html=await assets.text();
  if(!html.includes('</main>'))return responseHtml(html);
  return responseHtml(html.replace('</main>',indexCards(route,docs)+'</main>'));
}
async function staticContactAndServices(request:Request,env:CmsEnvironment,includeServices:boolean):Promise<Response> {
  const [asset,settings,services] = await Promise.all([
    env.ASSETS.fetch(request),
    fetchJson(prefix+'/siteSettings/public'),
    includeServices?listDocuments('cmsServices'):Promise.resolve(null),
  ]);
  if(!asset.ok)return asset;
  if(!settings.ok && (!services || !services.length))return asset;
  let html=await asset.text();
  if(settings.ok){
    const email=str(settings.data,'contactEmail');
    const phone=str(settings.data,'whatsapp');
    const digits=phone.replace(/\D/g,'');
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)&&email.length<=254){
      html=html.replaceAll('hello@moaviaseo.com',esc(email));
    }
    if(digits.length>=9&&digits.length<=15){
      html=html.replaceAll('923234313869',digits);
      html=html.replaceAll('+92 323 4313869',esc(phone));
    }
    const profiles=[
      ['socialGithub','https://github.com/mmoavia7861'],
      ['socialLinkedin','https://www.linkedin.com/in/moavia-hassan-seo/'],
      ['socialFiverr','https://www.fiverr.com/moavia_seopro'],
      ['socialUpwork','https://www.upwork.com/freelancers/~01c3735023b2f296fa'],
    ];
    for(const [field,old] of profiles){
      const updated=httpsLink(str(settings.data,field));
      if(updated)html=html.replaceAll(old,esc(updated));
    }
  }
  if(services&&services.length&&html.includes('</main>')){
    html=html.replace('</main>',indexCards('offerings',services)+'</main>');
  }
  return responseHtml(html);
}
async function dynamicSitemap(request:Request,env:CmsEnvironment):Promise<Response> {
  const asset=await env.ASSETS.fetch(request);
  if(!asset.ok)return asset;
  const xml=await asset.text();
  if(!xml.includes('</urlset>'))return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
  const all=await Promise.all((['blog','projects','offerings','pages'] as CmsRoute[])
    .map(async route=>({route,docs:await listDocuments(collectionMap[route])})));
  let additions='';
  for(const {route,docs} of all) {
    if(!docs)continue;
    for(const doc of docs){
      const slug=str(doc,'slug');
      if(!slugOkay(slug))continue;
      const link=origin+routePath(route,slug);
      if(xml.includes('<loc>'+link+'</loc>'))continue;
      additions+='  <url><loc>'+esc(link)+'</loc></url>\n';
    }
  }
  return new Response(xml.replace('</urlset>',additions+'</urlset>'),{
    headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-store'}
  });
}
async function homepage(request:Request,env:CmsEnvironment):Promise<Response> {
  const [asset,result]=await Promise.all([env.ASSETS.fetch(request),fetchJson(prefix+'/siteSettings/public')]);
  if(!asset.ok || !result.ok)return asset;
  const d=result.data;
  let html=await asset.text();
  const title=str(d,'seoTitle');
  const description=str(d,'seoDescription');
  const heroTitle=str(d,'heroTitle');
  const heroDescription=str(d,'heroDescription');
  if(title)html=html.replace(/<title>[^<]*<\/title>/i,'<title>'+esc(title.slice(0,160))+'</title>');
  if(description)html=html.replace(/<meta name="description" content="[^"]*" *\/?>/i,
    '<meta name="description" content="'+esc(description.slice(0,320))+'"/>');
  if(heroTitle)html=html.replace(/<h1>Moavia Hassan: SEO Tools, Services &amp; Web\/App Projects<\/h1>/,
    '<h1>'+esc(heroTitle.slice(0,140))+'</h1>');
  if(heroDescription)html=html.replace(
    'Explore SEO tools, discuss SEO and web development services, and browse real public website projects by Moavia Hassan in Islamabad, Pakistan.',
    esc(heroDescription.slice(0,500)));
  return responseHtml(html);
}

export async function handleCmsRequest(request:Request,env:CmsEnvironment):Promise<Response|null> {
  if(request.method!=='GET')return null;
  const path=new URL(request.url).pathname;
  if(path==='/')return homepage(request,env);
  if(path==='/sitemap.xml')return dynamicSitemap(request,env);
  if(path==='/contact/' || path==='/contact' || path==='/about/' || path==='/about')
    return staticContactAndServices(request,env,false);
  if(path==='/hire-me/' || path==='/hire-me')
    return staticContactAndServices(request,env,true);
  const parts=path.split('/').filter(Boolean);
  const route=parts[0] as CmsRoute;
  if(!(route in collectionMap))return null;
  if(parts.length===1 && (route==='blog'||route==='projects'))return injectListing(request,env,route);
  if(parts.length===1 && route==='offerings') {
    const docs=await listDocuments(collectionMap[route]);
    if(!docs)return null;
    return responseHtml('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Services | Moavia Hassan</title><meta name="robots" content="index,follow"><link rel="canonical" href="'+origin+'/offerings/"><link rel="stylesheet" href="/seo/pages.css"></head><body><main><div class="wrap"><h1>Services</h1><p><a href="/">Home</a> · <a href="/hire-me/">Hire Me</a></p></div>'+indexCards(route,docs)+'</main></body></html>');
  }
  if(parts.length===1 && route==='pages') {
    const docs=await listDocuments(collectionMap[route]);
    if(!docs)return null;
    return responseHtml('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Pages | Moavia Hassan</title><meta name="robots" content="index,follow"><link rel="canonical" href="'+origin+'/pages/"><link rel="stylesheet" href="/seo/pages.css"></head><body><main><div class="wrap"><h1>Pages</h1><p><a href="/">Home</a></p></div>'+indexCards(route,docs)+'</main></body></html>');
  }
  if(parts.length!==2 || !slugOkay(parts[1]))return null;
  const document=await getDocument(collectionMap[route],parts[1]);
  if(!document)return null;
  return responseHtml(buildDocumentPage(document,route,parts[1]));
}
