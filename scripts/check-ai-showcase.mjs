import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read=p=>readFileSync(p,'utf8');
const page=read('dist/ai-automations/index.html');
const css=read('dist/ai-showcase.css');
const generator=read('scripts/ai-premium-template.mjs');

assert.ok(page.includes('<body class="portfolio-detail-page aicase-page">'),'Page needs scoped AI layout');
assert.ok(page.includes('<link rel="stylesheet" href="/ai-showcase.css">'),'Premium AI stylesheet must load');
assert.ok(page.includes('src="/web-showcase.js"'),'Authentic screenshot fallback script missing');
assert.ok(page.includes('src="/skill-scenes.js"')&&page.includes('data-skill-scene="ai"'),'Original 3D AI renderer must be present');
assert.equal((page.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,'AI page must have exactly one H1');
assert.ok(page.includes('id="aicase-title"')&&page.includes('id="ai-projects"'),'Accessible AI hero and project section needed');
assert.ok(page.includes('href="https://moaviaseo.com/ai-automations/"'),'Canonical AI page address must stay valid');
assert.ok(page.includes('WebPage')&&page.includes('BreadcrumbList'),'AI page schema must remain valid');
assert.equal((page.match(/data-portfolio-shot/g)||[]).length,2,'Only two genuine homepage captures; no fabricated AI screenshot');
for(const id of ['toolscresta','draliwellness']){
 assert.ok(page.includes('src="/project-captures/'+id+'.jpg"'),'Verified public homepage capture missing: '+id);
 assert.ok(page.includes('data-fallback-src='),'Image error handler fallback missing');
 assert.ok(page.includes('href="/projects/'+id+'/'),'Relevant public project detail missing: '+id);
}
for(const uri of [
 'https://toolscresta.com/ai-card-generator/',
 'https://github.com/mmoavia7861/tools-website/blob/main/src/views/AICardGeneratorView.tsx',
 'https://draliwellness.com/',
 'https://github.com/mmoavia7861/draliwellness/blob/main/workers/ai-guide.js',
 'https://github.com/mmoavia7861/mobile-application/blob/main/app/src/main/java/com/example/data/ai/GeminiFoodAssistant.kt',
 '/projects/mealverse/',
 '/#contact',
 '/hire-me/'
])assert.ok(page.includes('href="'+uri+'"'),'Missing grounded AI portfolio link: '+uri);
assert.ok(page.includes('not a verified release')||page.includes('not a verified release or production'),'MealVerse code cannot imply Play Store release');
assert.ok(page.includes('not a verified live AI conversation')&&page.includes('not a record of generated AI output'),'Public homepage capture must not masquerade as working AI');
assert.ok(page.includes('not proof of an activated Make scenario'),'Workflow exercise must not be presented as a delivered outreach automation');
assert.ok(page.includes('AI + LOGIC')&&page.includes('REVIEW')&&page.includes('OUTPUT'),'Human-review flow must be explained');
assert.ok(css.includes('body.aicase-page .aicase-hero')&&css.includes('max-width:100%'),'Responsive hero and image boundaries missing');
assert.ok(css.includes('@media(max-width:640px)'),'Mobile CSS breakpoints missing');
assert.ok(css.includes('prefers-reduced-motion:reduce'),'Motion accessibility must be preserved');
assert.ok(css.includes('html[data-theme="dark"]'),'Sitewide user dark-mode must be honored');
assert.ok(!page.includes('100% success rate')&&!page.includes('10,000 happy clients'),'No unverifiable client or performance claims');
assert.ok(generator.includes('Source code was inspected')||generator.includes('Integration code is verifiable'),'Source-status transparency required');
console.log('PASS: AI automation hero, real code examples, source-backed links, conceptual workflow, mobile CSS and honest disclosures');
