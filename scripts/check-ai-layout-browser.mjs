import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const { chromium }=require(process.env.MOAVIA_PLAYWRIGHT_PACKAGE || 'playwright');

const target=process.argv[2]||'http://127.0.0.1:4173/ai-automations/';
const live=target.startsWith('https://');
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const sizes=[{label:'desktop',width:1440,height:900},{label:'mobile',width:390,height:844},{label:'narrow',width:320,height:740}];
try {
 for(const size of sizes) {
  const page=await browser.newPage({viewport:{width:size.width,height:size.height},reducedMotion:'reduce'});
  const sheets=[];
  page.on('response',res=>{
   if(res.url().split('?')[0].endsWith('/ai-showcase.css'))
    sheets.push({status:res.status(),type:res.headers()['content-type']||''});
  });
  try {
   const url=live?target+'?ai-layout-check='+size.label:target;
   const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(response?.status(),200,size.label+' AI route should return HTTP 200');
   await page.locator('.aicase-stage').waitFor({state:'visible',timeout:10000});
   await page.waitForLoadState('load',{timeout:12000}).catch(()=>{});
   const result=await page.evaluate(()=>{
    const rect=el=>{const r=el.getBoundingClientRect();return{x:r.x,right:r.right,width:r.width,height:r.height};};
    const hero=document.querySelector('.aicase-hero');
    const stage=document.querySelector('.aicase-stage');
    const action=document.querySelector('.aicase-btn-primary');
    const images=[...document.querySelectorAll('.aicase-card img')];
    const cards=[...document.querySelectorAll('.aicase-card')];
    return {
      viewport:document.documentElement.clientWidth,
      scroll:document.documentElement.scrollWidth,
      heroBg:getComputedStyle(hero).backgroundImage,
      stage:rect(stage),
      action:rect(action),
      images:images.map(rect),
      previews:images.map(el=>rect(el.closest('.aicase-preview'))),
      cards:cards.map(rect),
      cssLinked:!!document.querySelector('link[href="/ai-showcase.css"]'),
      screenshotInHero:!!document.querySelector('.aicase-hero img'),
      workflowStages:document.querySelectorAll('.aicase-flow-step').length,
      sourceLinkCount:[...document.querySelectorAll('.aicase-links a')].filter(a=>a.href.includes('github.com/')).length,
    };
   });
   assert.ok(result.cssLinked,size.label+' AI CSS link must exist');
   assert.ok(sheets.some(s=>s.status===200&&s.type.includes('text/css')),size.label+' AI CSS must return text/css HTTP 200: '+JSON.stringify(sheets));
   assert.ok(result.heroBg.includes('linear-gradient'),size.label+' AI hero CSS gradient missing');
   assert.ok(result.stage.width>190&&result.stage.right<=size.width+5,size.label+' AI 3D visual clipped/overflowed: '+JSON.stringify(result.stage));
   assert.ok(result.action.width>120&&result.action.right<=size.width+5,size.label+' CTA clipped: '+JSON.stringify(result.action));
   assert.equal(result.screenshotInHero,false,'Hero must never contain an unbounded website capture');
   assert.equal(result.images.length,2,'Exactly two actual homepage screenshots below the hero');
   assert.ok(result.images.every((r,i)=>r.width<=result.previews[i].width+3&&r.height<400&&r.width<size.width),size.label+' screenshot overflow: '+JSON.stringify(result.images));
   assert.ok(result.cards.every(r=>r.right<=size.width+5),size.label+' project cards overflow');
   assert.equal(result.workflowStages,4,'Human-in-the-loop workflow illustration must show 4 stages');
   assert.ok(result.sourceLinkCount>=3,'AI source references must be reachable');
   assert.ok(result.scroll<=result.viewport+5,size.label+' horizontally scrolls: '+JSON.stringify(result));
   console.log('PASS AI',live?'production':'local',size.label,JSON.stringify({stage:Math.round(result.stage.width),maxScreenshot:Math.round(Math.max(...result.images.map(r=>r.width))),scroll:result.scroll}));
  } finally {await page.close()}
 }
} finally {await browser.close()}
