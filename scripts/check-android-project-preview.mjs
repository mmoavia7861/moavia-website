import assert from 'node:assert/strict';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const read = path => readFileSync(join(process.cwd(),path),'utf8');
const page = read('dist/android-development/index.html');
const css = read('dist/android-showcase.css');
const data = JSON.parse(read('src/data/githubProjects.json'));
const source = data.find(item => item.id === 'moavia-app');
const mealverse = data.find(item => item.id === 'mealverse');
assert.ok(mealverse && mealverse.kind === 'android' && mealverse.repo === 'https://github.com/mmoavia7861/mobile-application', 'MealVerse Kotlin Android codebase must be listed as the second app');
const relative = 'dist/android/moavia-seo-pro-ui.jpg';
const imagePath = join(process.cwd(),relative);
assert.ok(source && source.kind === 'android','Public Android source project must remain available');
assert.ok(existsSync(imagePath),'User-supplied Android screenshot missing from production build');
const bytes = readFileSync(imagePath);
assert.ok(bytes.length >= 3000 && bytes.length < 100000,'Mobile screenshot should stay optimized');
assert.deepEqual([...bytes.subarray(0,3)], [0xff,0xd8,0xff], 'Screenshot must be a genuine JPEG asset');
assert.ok(page.includes('androidcase-hero') && page.includes('androidcase-project'), 'Android page needs hero and featured project card');
assert.ok((page.match(/src="\/android\/moavia-seo-pro-ui\.jpg"/g)||[]).length >= 2,
 'The actual supplied image must appear in hero and project details');
assert.ok(page.includes('data-skill-scene="android"') && page.includes('data-webcase-parallax'),
 'Phone screenshot must be layered above a dimensional Android scene');
assert.ok(page.includes('href="/android/moavia-seo-pro-ui.jpg"'),'Visitors must be able to open the supplied screenshot');
assert.ok(page.includes(source.repo), 'Starter source link must resolve to the documented GitHub repository');
assert.ok(page.includes('Hello Android!') && page.includes('separate code starter'),
 'Do not imply the shown UI is implemented in the current basic starter');
assert.ok(page.includes('not a Play Store listing') && page.includes('not independently verified'),
 'App design must not be marketed as a released and verified product');
assert.ok(page.includes('SEO') && page.includes('Web development') &&
  page.includes('Meta Ads') && page.includes('Google Ads'), 'Show real UI categories from the screenshot');
assert.ok(css.includes('html body.portfolio-detail-page .hero.androidcase-hero') &&
  css.includes('!important'), 'Hero colors must not be overridden by shared portfolio CSS');
assert.ok(css.includes('prefers-reduced-motion:reduce'), 'Reduced motion support is required');
assert.ok(page.includes('src="/web-showcase.js"'), 'Desktop parallax must be optional enhancement');
assert.ok(page.includes('width="176" height="367"'), 'Image dimensions should prevent layout shift');
assert.ok(page.includes('id="mealverse-project"') && page.includes('MealVerse — Food Ordering Android App'), 'Second MealVerse project must be displayed on Android page');
assert.ok(page.indexOf('id="android-project"') < page.indexOf('id="mealverse-project"'), 'Existing Moavia SEO Pro should be first, MealVerse second');
assert.ok(page.includes('href="/projects/mealverse/"') && page.includes(mealverse.repo), 'MealVerse must link to its case study and actual GitHub code');
assert.ok(page.includes('Customer &amp; Shopkeeper') && page.includes('Order tracking screens'), 'MealVerse source-backed Android modules must be described');
assert.ok(page.includes('not an actual') || page.includes('not a captured running app'), 'MealVerse visual must have an honest source-based illustration disclosure');
assert.ok(page.includes('not a verified app screenshot') && page.includes('have not been independently verified'), 'Do not claim a production release or actual emulator capture');
assert.ok(css.includes('.mealverse-case') && css.includes('@media(max-width:580px)'), 'MealVerse illustration must have responsive mobile styling');
console.log('PASS: Moavia screenshot plus source-backed MealVerse, responsive Android showcase, repository disclosure and accessibility');
