(function(){
"use strict";
const $=id=>document.getElementById(id);
const show=(s,err)=>{const e=$("notice");if(e){e.textContent=s;e.classList.toggle("error",!!err);}};
const val=id=>($(id)?.value||"").trim();
const absoluteURL=(s)=>{try{const u=new URL(s);if(!["http:","https:"].includes(u.protocol)||!u.hostname||u.username||u.password)throw Error();u.hash="";return u;}catch{return null;}};
const escHTML=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,'&quot;');
const escXML=s=>escHTML(s).replace(/'/g,"&apos;");
const write=async(s)=>{if(!s){show("Nothing to copy yet.",true);return;}try{await navigator.clipboard.writeText(s);show("Copied to clipboard.");}catch{const t=document.createElement("textarea");t.value=s;t.style.position="fixed";t.style.opacity="0";document.body.append(t);t.select();const ok=document.execCommand("copy");t.remove();show(ok?"Copied to clipboard.":"Copy blocked by browser; select the text manually.",!ok);}};
const download=(name,data,type)=>{if(!data){show("Generate the content first.",true);return;}const href=URL.createObjectURL(new Blob([data],{type:type||"text/plain;charset=utf-8"}));const a=document.createElement("a");a.href=href;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),1000);show(name+" downloaded.");};
const bindCopy=(id,get)=>$(id)?.addEventListener("click",()=>write(get()));
const bindDownload=(id,name,get,type)=>$(id)?.addEventListener("click",()=>download(name,get(),type));
function initMeta(){
 const update=()=>{
  const t=val("metaTitle"),d=val("metaDescription"),u=absoluteURL(val("metaUrl"));
  $("titleCount").textContent=t.length+" characters";
  $("descCount").textContent=d.length+" characters";
  $("titleAdvice").textContent=!t?"No title entered.":t.length>65?"Long title; Google may shorten or rewrite it.":t.length<25?"Short title; confirm it describes the page.":"Check relevance and uniqueness; length is only a guideline.";
  $("descAdvice").textContent=!d?"No meta description entered.":d.length>165?"Long description; search engines may choose a shorter snippet.":d.length<70?"Short description; consider adding useful context.":"Description is present; Google may still generate a different snippet.";
  $("snippetTitle").textContent=t||"Your page title appears here";
  $("snippetDescription").textContent=d||"Add a descriptive summary to preview its appearance in a search-style result.";
  $("snippetUrl").textContent=u?u.hostname+u.pathname+(u.search||""):"example.com (illustrative)";
  $("previewNote").textContent="Illustrative preview only — not live Google search results. Character ranges are editorial hints, not Google limits.";
 };
 ["metaTitle","metaDescription","metaUrl"].forEach(id=>$(id)?.addEventListener("input",update));
 $("extractHTML")?.addEventListener("click",()=>{
  const raw=val("htmlSource");
  if(!raw){show("Paste HTML source first.",true);return;}
  const doc=new DOMParser().parseFromString(raw,"text/html");
  const title=doc.querySelector("title")?.textContent?.trim()||"";
  const desc=doc.querySelector('meta[name="description" i]')?.getAttribute("content")?.trim()||"";
  if(!title&&!desc){show("No <title> or meta description found in pasted HTML.",true);return;}
  $("metaTitle").value=title;$("metaDescription").value=desc;update();
  show("Extracted metadata from the HTML you pasted; no URL was fetched.");
 });
 function tags(){const t=val("metaTitle"),d=val("metaDescription");return (t?"<title>"+escHTML(t)+"</title>\n":"")+(d?'<meta name="description" content="'+escHTML(d)+'">\n':"");}
 bindCopy("copyMeta",tags);bindDownload("downloadMeta","meta-tags.html",tags,"text/html;charset=utf-8");
 update();
}
function initSchema(){
 const sections={FAQPage:"faqFields",Organization:"orgFields",Article:"articleFields"};
 let last="";
 $("schemaType").addEventListener("change",()=>{
  for(const [type,id] of Object.entries(sections))$(id).classList.toggle("hidden",type!==$("schemaType").value);
  $("schemaOutput").value="";last="";show("");
 });
 const makeRow=()=>{const row=document.createElement("div");row.className="faqitem";
  const q=document.createElement("label");q.textContent="Question";const qin=document.createElement("input");qin.type="text";qin.maxLength=500;qin.className="faqQuestion";qin.placeholder="Question visible on the page";q.append(qin);
  const a=document.createElement("label");a.textContent="Answer";a.style.marginTop="9px";const ain=document.createElement("textarea");ain.rows=3;ain.maxLength=4000;ain.className="faqAnswer";ain.placeholder="Answer visible to site visitors";a.append(ain);
  const rem=document.createElement("button");rem.type="button";rem.className="btn secondary";rem.textContent="Remove Q&A";rem.style.marginTop="8px";rem.addEventListener("click",()=>{row.remove();});row.append(q,a,rem);$("faqRows").append(row);};
 $("addFaq").addEventListener("click",makeRow);makeRow();
 const build=()=>{
  const type=$("schemaType").value;const data={"@context":"https://schema.org","@type":type};
  if(type==="FAQPage"){
   const rows=[...document.querySelectorAll("#faqRows .faqitem")].map(row=>({q:row.querySelector(".faqQuestion").value.trim(),a:row.querySelector(".faqAnswer").value.trim()}));
   if(!rows.length||rows.some(x=>!x.q||!x.a))throw Error("Every FAQ entry needs a question and an answer.");
   data.mainEntity=rows.map(x=>({"@type":"Question",name:x.q,acceptedAnswer:{"@type":"Answer",text:x.a}}));
  } else if(type==="Organization"){
   const name=val("orgName"),url=absoluteURL(val("orgUrl")),logo=val("orgLogo"),social=val("orgSocial");
   if(!name||!url)throw Error("Organization name and valid website URL are required.");
   data.name=name;data.url=url.href;
   if(logo){const l=absoluteURL(logo);if(!l)throw Error("Logo URL must be a valid HTTP(S) link.");data.logo=l.href;}
   if(social){const links=social.split(/\n|,/).map(s=>s.trim()).filter(Boolean);const urls=links.map(absoluteURL);if(urls.some(u=>!u))throw Error("Every social profile URL must be valid HTTP(S).");data.sameAs=[...new Set(urls.map(u=>u.href))];}
  } else {
   const headline=val("articleHeadline"),url=absoluteURL(val("articleUrl")),author=val("articleAuthor"),published=val("articlePublished");
   if(!headline||!url||!author||!published)throw Error("Headline, article URL, author name, and publish date are required.");
   data.headline=headline;data.mainEntityOfPage=url.href;data.url=url.href;data.author={"@type":"Person",name:author};data.datePublished=published;
   const modified=val("articleModified"),desc=val("articleDescription"),img=val("articleImage");
   if(modified){if(modified<published)throw Error("Modified date cannot be earlier than publish date.");data.dateModified=modified;}
   if(desc)data.description=desc;
   if(img){const i=absoluteURL(img);if(!i)throw Error("Image URL must be HTTP(S).");data.image=i.href;}
  }
  return JSON.stringify(data,null,2);
 };
 $("generateSchema").addEventListener("click",()=>{
  try{last=build();$("schemaOutput").value=last;show("Valid JSON-LD generated locally. Confirm every fact appears on the actual page before publishing.");}catch(e){last="";$("schemaOutput").value="";show(e.message||"Invalid information.",true);}
 });
 bindCopy("copySchema",()=>last);
 bindCopy("copySchemaHTML",()=>last?'<script type="application/ld+json">\n'+last.replace(/</g,"\\u003c")+'\n</script>':"");
 bindDownload("downloadSchema","structured-data.json",()=>last,"application/ld+json;charset=utf-8");
}
function initCrawler(){
 let robots="",sitemap="";
 $("generateCrawler").addEventListener("click",()=>{
  try{
   const base=absoluteURL(val("siteOrigin"));if(!base)throw Error("Enter a valid HTTP(S) website URL.");
   if(base.search||base.pathname!=="/")throw Error("Website URL must be the origin, such as https://example.com/ (no path or query).");
   const readPaths=id=>val(id).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
   const dis=readPaths("disallowPaths"),allow=readPaths("allowPaths");
   for(const p of [...dis,...allow]){if(!p.startsWith("/")||/[\r\n\s]/.test(p))throw Error("Robots paths must start with / and contain no spaces.");}
   const blockedRoot=dis.includes("/");
   const siteMapUrl=new URL("/sitemap.xml",base).href;
   const lines=["User-agent: *",...dis.map(x=>"Disallow: "+x),...allow.map(x=>"Allow: "+x),"","Sitemap: "+siteMapUrl];
   robots=lines.join("\n")+"\n";
   const listed=readPaths("sitemapPaths");if(!listed.length)throw Error("Add at least one actual page URL or path to your sitemap list. No pages are invented.");
   const entries=[];
   for(const s of listed){
    const u=absoluteURL(s.startsWith("/")?new URL(s,base).href:s);
    if(!u)throw Error("Invalid sitemap URL or path: "+s);
    if(u.hostname!==base.hostname||u.protocol!==base.protocol||u.port!==base.port)throw Error("Sitemap URLs must belong to the website you entered: "+s);
    if(!entries.includes(u.href))entries.push(u.href);
   }
   if(entries.length>5000)throw Error("Generate at most 5,000 URLs per file in this tool.");
   const lastmod=val("lastModified"),last=lastmod?"<lastmod>"+escXML(lastmod)+"</lastmod>":"";
   sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+entries.map(u=>"  <url><loc>"+escXML(u)+"</loc>"+last+"</url>").join("\n")+"\n</urlset>\n";
   $("robotsOutput").value=robots;$("sitemapOutput").value=sitemap;
   show("Generated "+entries.length+" unique URL"+(entries.length!==1?"s":"")+". "+(blockedRoot?"WARNING: Disallow: / blocks crawling site-wide. Verify before publishing.":"Review both files before publishing at the website root."),blockedRoot);
  }catch(e){robots="";sitemap="";$("robotsOutput").value="";$("sitemapOutput").value="";show(e.message||"Invalid input.",true);}
 });
 bindCopy("copyRobots",()=>robots);bindCopy("copySitemap",()=>sitemap);
 bindDownload("downloadRobots","robots.txt",()=>robots,"text/plain;charset=utf-8");
 bindDownload("downloadSitemap","sitemap.xml",()=>sitemap,"application/xml;charset=utf-8");
}
const tool=document.body.dataset.tool;
if(tool==="meta")initMeta();if(tool==="schema")initSchema();if(tool==="crawler")initCrawler();
})();