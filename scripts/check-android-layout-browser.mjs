import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.MOAVIA_PLAYWRIGHT_PACKAGE || 'playwright');

const target = process.argv[2] || 'http://127.0.0.1:4173/android-development/';
const browser = await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
try {
  const page = await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
  await page.goto(target,{waitUntil:'networkidle',timeout:30000});
  await page.locator('.androidcase-device-link .androidcase-screen').waitFor({state:'visible',timeout:8000});
  const desktop = await page.evaluate(() => {
    const hero = document.querySelector('.androidcase-hero');
    const title = hero?.querySelector('h1');
    const photo = document.querySelector('.androidcase-device-link .androidcase-screen');
    const stage = document.querySelector('[data-webcase-parallax]');
    const hue = hero && getComputedStyle(hero).backgroundImage;
    const color = title && getComputedStyle(title).color;
    const photoRect = photo && photo.getBoundingClientRect();
    const stageRect = stage && stage.getBoundingClientRect();
    return {
      background:hue,titleColor:color,
      loaded:photo?.complete && photo?.naturalWidth===176 && photo?.naturalHeight===367,
      visible:!!photoRect && photoRect.width>120 && photoRect.height>250,
      stageVisible:!!stageRect && stageRect.width>250 && stageRect.height>300,
      screenshotLink:document.querySelector('.androidcase-device-link')?.getAttribute('href'),
    };
  });
  assert.ok(desktop.background?.includes('rgb(7, 21, 33)'),'Hero must remain dark after late stylesheets; got '+desktop.background);
  assert.ok(desktop.titleColor==='rgb(255, 255, 255)','Hero title must stay white and readable; got '+desktop.titleColor);
  assert.ok(desktop.loaded && desktop.visible && desktop.stageVisible,'Real phone screenshot must render in front of a visible 3D stage');
  assert.equal(desktop.screenshotLink,'/android/moavia-seo-pro-ui.jpg');
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(350);
  const mobile = await page.evaluate(() => {
    const photo=document.querySelector('.androidcase-device-link .androidcase-screen');
    const box=photo?.getBoundingClientRect();
    return {
      photoWidth:box?.width,
      scrollWidth:document.documentElement.scrollWidth,
      viewport:document.documentElement.clientWidth,
      loaded:photo?.naturalWidth>0,
    };
  });
  assert.ok(mobile.loaded && mobile.photoWidth>110,'Mobile capture must remain visible');
  assert.ok(mobile.scrollWidth<=mobile.viewport+2,'Android page should not overflow viewport on a phone');
  console.log('PASS browser Android showcase',JSON.stringify({desktop,mobile}));
} finally {
  await browser.close();
}
