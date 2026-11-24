import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { join } from 'node:path';

const root = process.cwd();
const load = (file) => readFileSync(join(root, file), 'utf8');
const home = load('dist/index.html');
const renderer = load('dist/skill-scenes.js');
const css = load('dist/skill-scenes.css');
const app = load('src/App.tsx');
const routes = [
  ['/web-development/', 'web'],
  ['/android-development/', 'android'],
  ['/ai-automations/', 'ai'],
];
assert.ok(home.includes('skill-scenes.css'), 'Homepage stylesheet must be linked');
assert.ok(app.includes('skill-scenes.js'), 'Homepage should load local renderer after mount');
for (const [route, scene] of routes) {
  const page = join('dist', route.slice(1), 'index.html');
  assert.ok(existsSync(page), route + ' must be generated');
  const html = load(page);
  assert.ok(html.includes('data-skill-scene="' + scene + '"'), route + ' must display its own dimensional scene');
  assert.ok(html.includes('src="/skill-scenes.js"'), route + ' must load animation renderer');
  assert.ok(html.includes('href="/skill-scenes.css"'), route + ' must load animation styles');
  assert.ok(html.includes('role="img"') && html.includes('aria-label='), route + ' must describe the visual accessibly');
}
for (const scene of ['web','android','ai']) {
  assert.ok(app.includes('data-skill-scene="' + scene + '"'), 'Homepage must include ' + scene);
}
assert.ok(!/https?:\/\//.test(renderer), 'Animation renderer must not fetch remote assets');
assert.ok(css.includes('prefers-reduced-motion:reduce'), 'Reduced motion must be supported');
assert.ok(css.includes('animation-play-state:paused'), 'Animations must pause offscreen');
assert.ok(css.includes('rotateY(') && css.includes('perspective:'), 'Scenes must use 3D transforms');
assert.ok(!/three\.js|webgl|glb|gltf|spline/i.test(renderer), 'No external 3D engine should be bundled');
console.log('PASS: three section-specific scene pages, homepage 3D scenes and performance/accessibility checks');
