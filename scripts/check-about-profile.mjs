import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const read=p=>readFileSync(join(root,p),'utf8');
const about=read('dist/about/index.html');
const homeSrc=read('src/App.tsx');
const aboutCss=read('dist/about-profile.css');
const homeCss=read('public/portfolio-premium.css');
const trust=read('scripts/generate-trust-pages.mjs');

assert.ok(existsSync(join(root,'dist/moavia-hassan-portrait.webp')), 'Real portrait should remain an available local asset');
assert.ok(about.includes('<body class="about-profile-page">'), 'Custom About layout must be rendered');
assert.ok(about.includes('href="/about-profile.css"'), 'Profile styles must be loaded');
assert.ok(about.includes('<h1 id="about-profile-heading">About Moavia Hassan'), 'Proper About H1 is required');
assert.ok(about.includes('src="/moavia-hassan-portrait.webp"'), 'Actual portrait is required');
assert.ok(about.includes('href="/projects/toolscresta/"') && about.includes('href="/projects/draliwellness/"'), 'Selected public work case studies are required');
assert.ok(about.includes('href="https://toolscresta.com/"') && about.includes('href="https://draliwellness.com/"'), 'Actual public URLs are required');
for(const href of ['/web-development/','/android-development/','/ai-automations/','/contact/','/hire-me/']){
  assert.ok(about.includes('href="'+href+'"'), 'Missing About link '+href);
}
for(const host of ['github.com/mmoavia7861','linkedin.com/in/moavia-hassan-seo','fiverr.com/moavia_seopro','upwork.com/freelancers']){
  assert.ok(about.includes(host),'Missing professional profile '+host);
}
assert.ok(about.includes('"@type":"AboutPage"') && about.includes('"@type":"Person"'), 'Structured personal profile metadata is required');
assert.ok(aboutCss.includes('@media(max-width:500px)') && aboutCss.includes('prefers-reduced-motion:reduce'), 'About should support small screens and reduced motion');
assert.ok(aboutCss.includes('html[data-theme="dark"]'), 'About page dark mode must be supported');
assert.ok(homeSrc.includes('premium-about-specialties') && homeSrc.includes('premium-about-panel'), 'Homepage About redesign is required');
assert.ok(homeSrc.includes('href="/about/"') && homeSrc.includes('href="/projects/"'), 'Homepage About should link to bio and proof');
assert.ok(homeCss.includes('premium-about-panel-proof'), 'Homepage About visual styles should be available');
assert.ok(trust.includes("p.path==='/about/'?aboutProfileContent()"), 'Only About should receive the custom editorial content');
assert.ok(!about.includes('50+ happy clients') && !about.includes('10 years of experience'), 'Do not fabricate experience');
console.log('PASS: redesigned About profile, source-backed work, accessibility, mobile and trust-page isolation');
