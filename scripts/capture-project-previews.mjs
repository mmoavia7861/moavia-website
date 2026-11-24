import { readFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.MOAVIA_PLAYWRIGHT_PACKAGE || 'playwright');

/**
 * Build-time, browser-rendered homepage screenshots.
 * Runs in GitHub Actions AFTER the ordinary Vite build and BEFORE deploy.
 * Does not fetch private pages, bypass authentication, or store visitor data.
 * Page previews stay local to the deployed site; no screenshot service requests
 * are made by visitors when the capture succeeds.
 */
const outputRoot = process.argv[2] || 'dist';
const projects = JSON.parse(readFileSync('src/data/githubProjects.json','utf8'));
const allowed = new Set([
  'mmoavia7861.github.io', 'toolscresta.com', 'draliwellness.com'
]);
const targets = projects.filter(item => item.kind !== 'android');
const output = join(outputRoot, 'project-captures');
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless:true, args:['--disable-dev-shm-usage','--no-sandbox'] });
let captured = 0;
try {
  for (const project of targets) {
    const url = new URL(project.url);
    if (url.protocol !== 'https:' || !allowed.has(url.hostname) || !/^[a-z0-9-]+$/.test(project.id)) {
      throw Error('Unapproved screenshot target: ' + project.id);
    }
    const page = await browser.newPage({
      viewport:{width:1440,height:900},deviceScaleFactor:1,
      reducedMotion:'reduce',locale:'en-US',
    });
    try {
      await page.goto(project.url,{waitUntil:'domcontentloaded',timeout:35000});
      await page.waitForLoadState('networkidle',{timeout:12000}).catch(() => {});
      // Ensure website JS has rendered before making any visible capture.
      const keyText = project.id === 'toolscresta' ? 'Free Online Tools'
        : project.id === 'draliwellness' ? 'Shop' : '';
      if (keyText) {
        await page.getByText(keyText,{exact:false}).first().waitFor({state:'visible',timeout:14000});
      } else {
        await page.locator('body').waitFor({state:'visible',timeout:10000});
      }
      await page.evaluate(async () => {
        await document.fonts?.ready;
        await Promise.all(Array.from(document.images).slice(0,8).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.addEventListener('load',resolve,{once:true});
            img.addEventListener('error',resolve,{once:true});
            setTimeout(resolve,3500);
          });
        }));
      });
      await page.waitForTimeout(1800);
      const meaningful = await page.evaluate(() => {
        const body = document.body;
        const content = (body?.innerText || '').trim();
        return { chars:content.length, visible:body ? body.getBoundingClientRect().height : 0 };
      });
      if (meaningful.chars < 45 || meaningful.visible < 300) {
        throw Error('Page did not render substantive content');
      }
      const path = join(output,project.id+'.jpg');
      await page.screenshot({path,type:'jpeg',quality:82,fullPage:false,animations:'disabled'});
      if (statSync(path).size < 4000) throw Error('Screenshot appears unexpectedly small');
      console.log('Captured:',project.id,statSync(path).size,'bytes');
      captured++;
    } catch(error) {
      // An unsuccessful capture must never replace another project with a fake
      // thumbnail; its HTML will instead use its external thumbnail fallback.
      console.warn('Screenshot unavailable for',project.id,String(error.message).slice(0,180));
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log('Captured',captured,'of',targets.length,'public site homepages');
