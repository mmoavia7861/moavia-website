import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const read=path=>readFileSync(join(root,path),'utf8');
const data=JSON.parse(read('src/data/githubProjects.json'));
const web=data.filter(project=>project.kind!=='android');
const visibleWeb=web.filter(project=>project.id!=='ranknova');
const android=data.find(project=>project.kind==='android');
const page=read('dist/web-development/index.html');
const directory=read('dist/projects/index.html');
const css=read('dist/web-showcase.css');
const js=read('dist/web-showcase.js');
const code=read('scripts/generate-portfolio-pages.mjs');
const homepage=read('src/App.tsx');
assert.equal(web.length,6,'Keep all six public projects in the data catalog');
assert.equal(visibleWeb.length,5,'Web showcase should display five projects without RankNova');
assert.ok(!page.includes('/projects/ranknova/') && !page.includes('RankNova — SEO Tools Website'),'Broken RankNova must not appear in Web Development showcase');
assert.equal(android?.id,'moavia-app','Android starter must remain source-only');
assert.ok(page.includes('data-webcase-parallax'),'The web page needs a layered depth scene');
assert.ok(page.includes('data-skill-scene="web"'),'Keep the existing web sculpture behind the screenshot');
assert.ok(page.includes('webcase-page-hero') && page.includes('webcase-grid'),'Showcase requires a featured screenshot and a project grid');
assert.equal((page.match(/data-portfolio-shot/g)||[]).length,visibleWeb.length+1,'One featured shot and five visible project screenshots');
for(const item of web){
  const detail=read('dist/projects/'+item.id+'/index.html');
  for(const html of (item.id==='ranknova' ? [detail] : [directory,detail])){
    assert.ok(html.includes(item.url),'Missing project live link for '+item.id);
    assert.ok(html.includes('/project-captures/'+item.id+'.jpg'),'Missing deploy-time screenshot for '+item.id);
    assert.ok(html.includes('data-fallback-src='),'A failed screenshot must have an alternate source for '+item.id);
  }
  if (item.id !== 'ranknova') {
    assert.ok(page.includes(item.url),'Missing live project link in showcase for '+item.id);
    assert.ok(page.includes('/project-captures/'+item.id+'.jpg'),'Missing preview for visible project '+item.id);
    assert.ok(page.includes('href="/projects/'+item.id+'/'),'Missing details link for '+item.id);
  }
  assert.ok(detail.includes('data-portfolio-shot'),'Case study must include screenshot for '+item.id);
}
assert.equal((directory.match(/data-portfolio-shot/g)||[]).length,visibleWeb.length,'Directory must preview the five public web sites excluding RankNova');
assert.ok(!directory.includes('/projects/ranknova/') && !directory.includes('RankNova — SEO Tools Website'),'RankNova must not appear in the project directory');
assert.ok(!read('dist/projects/'+android.id+'/index.html').includes('data-portfolio-shot'),
 'An unfinished Android starter must not be shown as a released app screenshot');
assert.ok(directory.includes('No released app or verified screen capture'),'Label source-only Android project honestly');
assert.ok(page.includes('data-portfolio-fallback'),'Screenshot failures need readable fallback');
assert.ok(css.includes('prefers-reduced-motion:reduce'),'Reduced motion is required');
assert.ok(js.includes('pointer: fine') && js.includes('pointerleave'),'Parallax must be optional and reset');
assert.ok(js.includes('naturalWidth === 0') && js.includes('fallbackAttempted'),'Broken screenshots must try fallback then show text');
assert.ok(css.includes('html body.portfolio-detail-page .hero.webcase-page-hero'),
  'Web hero colors must override later-loaded generic portfolio hero styles');
assert.ok(homepage.includes('premium-real-preview-link'),'Homepage selected work should feature real web site captures');
assert.ok(homepage.includes('premium-real-preview-fallback'),'Homepage preview failures must not be blank');
assert.ok(homepage.includes("'/project-captures/' + originalProject.id"),'Featured project should use local real screenshot');
assert.ok(homepage.includes("item.visual !== 'mobile'"),'Android starter must keep a truthful illustration rather than a fake screenshot');
assert.ok(!/\.glb|\.gltf|WebGLRenderingContext/.test(code),'Avoid heavy assets for the decorative background');
console.log('PASS: RankNova hidden from Web Development showcase; five real previews, directory cases and motion safety preserved');
