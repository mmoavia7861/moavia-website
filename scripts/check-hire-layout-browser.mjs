import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.MOAVIA_PLAYWRIGHT_PACKAGE || 'playwright');

/* Pixel-geometry smoke checks in actual Chromium, not just text assertions.
   Guards against full-width image regressions and missing CSS on /hire-me/. */
const target=process.argv[2]||'http://127.0.0.1:4173/hire-me/';
const live=target.startsWith('https://');
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage','--no-sandbox']});
const sizes=[
  {name:'desktop',width:1440,height:900},
  {name:'mobile',width:390,height:844},
  {name:'narrow-mobile',width:320,height:740},
];
try{
 for(const device of sizes){
  const page=await browser.newPage({viewport:{width:device.width,height:device.height},reducedMotion:'reduce'});
  const styles=[];
  page.on('response',response=>{
    if(response.url().split('?')[0].endsWith('/hire-premium.css')){
      styles.push({status:response.status(),type:response.headers()['content-type']||''});
    }
  });
  try{
    const dest=live ? target+'?layout-check='+device.name : target;
    const response=await page.goto(dest,{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(response?.status(),200,device.name+' Hire Me should respond HTTP 200');
    await page.locator('.hire-premium-ui-board').waitFor({state:'visible',timeout:15000});
    await page.waitForLoadState('load',{timeout:12000}).catch(()=>{});
    const result=await page.evaluate(()=>{
      const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,width:r.width,height:r.height,right:r.right};};
      const art=document.querySelector('.hire-premium-ui-board');
      const hero=document.querySelector('.hire-premium-hero-layout');
      const col=document.querySelector('.hire-premium-hero-visual');
      const cta=document.querySelector('.hire-premium-btn--primary');
      const shot=[...document.querySelectorAll('.hire-premium-project-visual img')];
      return {
        viewport:window.innerWidth,
        scrollWidth:document.documentElement.scrollWidth,
        hero:rect(hero),
        visual:rect(col),
        art:rect(art),
        cta:rect(cta),
        imageRects:shot.map(rect),
        imageParentRects:shot.map(x=>rect(x.closest('.hire-premium-project-visual'))),
        heroBg:getComputedStyle(document.querySelector('.hire-premium-hero')).backgroundImage,
        heroLayout:getComputedStyle(hero).display,
        artDisplay:getComputedStyle(art).display,
        cardLayout:getComputedStyle(document.querySelector('.hire-premium-project-grid')).display,
        hasHeroScreenshot:!!document.querySelector('.hire-premium-hero img'),
        cssLink:!!document.querySelector('link[href="/hire-premium.css"]'),
      };
    });
    assert.ok(result.cssLink,device.name+' CSS link must exist');
    assert.ok(styles.some(s=>s.status===200&&s.type.includes('text/css')),
      device.name+' dedicated CSS must actually serve as text/css HTTP 200: '+JSON.stringify(styles));
    assert.equal(result.heroLayout,'grid',device.name+' hero must be arranged in grid');
    assert.ok(result.heroBg.includes('linear-gradient'),device.name+' hero needs actual dark background');
    assert.equal(result.hasHeroScreenshot,false,device.name+' hero must not contain a full-page screenshot');
    assert.equal(result.imageRects.length,2,device.name+' must have only 2 project screenshots in bounded cards');
    assert.ok(result.art.width>160&&result.art.width<device.width,
      device.name+' illustration should be bounded: '+JSON.stringify(result.art));
    assert.ok(result.art.right<=device.width+5&&result.art.x>=-5,
      device.name+' illustration must fit viewport');
    assert.ok(result.cta.width>110 && result.cta.right<=device.width+5,
      device.name+' main enquiry CTA must be visible without horizontal clipping');
    assert.ok(result.scrollWidth<=device.width+5,
      device.name+' horizontal page overflow: '+JSON.stringify(result));
    result.imageRects.forEach((item,index)=>{
      assert.ok(item.width<=result.imageParentRects[index].width+3,
        device.name+' screenshot '+index+' overflows its project card');
      assert.ok(item.width<device.width,
        device.name+' screenshot '+index+' has expanded to viewport width');
      assert.ok(item.height<=380,
        device.name+' screenshot '+index+' is too tall: '+JSON.stringify(item));
    });
    console.log('PASS',live?'production':'local',device.name,
      JSON.stringify({scrollWidth:result.scrollWidth,illustration:Math.round(result.art.width),
        maxScreenshot:Math.round(Math.max(...result.imageRects.map(x=>x.width)))}));
  }finally{await page.close();}
 }
}finally{await browser.close();}
