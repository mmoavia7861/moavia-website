import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = path => readFileSync(join(root, path), 'utf8');
const hire = read('dist/hire-me/index.html');
const contact = read('dist/contact/index.html');
const css = read('dist/hire-premium.css');
const homepage = read('src/App.tsx');

assert.ok(hire.includes('<body class="hire-premium-page">'), 'Hire page must use its own scoped premium design');
assert.ok(hire.includes('href="/hire-premium.css"'), 'Hire page stylesheet must be included');
assert.ok(hire.includes('src="/web-showcase.js"'), 'Hire screenshots require the existing image error handler');
assert.equal((hire.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,'One accessible H1 per Hire page');
assert.ok(hire.includes('id="hire-premium-title"'), 'Hire hero requires an accessible heading ID');
assert.ok(hire.includes('href="https://moaviaseo.com/hire-me/"'), 'Canonical URL must remain stable');
assert.ok(hire.includes('"@type":"WebPage"'), 'Existing structured data must be preserved');
assert.ok(hire.includes('SEO, Website &amp; Project Services'), 'Public service descriptor must remain');
assert.ok((hire.match(/href="\/#contact"/g)||[]).length >= 2, 'Multiple CTAs must open the existing project enquiry form');
assert.ok(homepage.includes('id="contact"') && homepage.includes('<ContactSection'), 'The real homepage contact form must remain intact');
for (const route of ['/web-development/','/tools/','/ai-automations/','/android-development/','/contact/','/privacy-policy/']) {
  assert.ok(hire.includes('href="'+route+'"'), 'Missing service or information link: '+route);
}
for (const id of ['toolscresta','draliwellness']) {
  assert.ok(hire.includes('src="/project-captures/'+id+'.jpg"'), 'Public project must have an authentic deploy-time screenshot: '+id);
  assert.ok(hire.includes('href="/projects/'+id+'/'), 'Public project needs details link: '+id);
}
assert.ok(hire.includes('href="https://toolscresta.com/"') && hire.includes('href="https://draliwellness.com/"'), 'Real project website links required');
assert.equal((hire.match(/data-portfolio-shot/g)||[]).length,2, 'Only two real project thumbnails should load below the hero');
assert.ok(hire.includes('class="hire-premium-ui-board"'),'Hero should display a bounded original illustration');
assert.ok(!hire.split('</section>')[0].includes('data-portfolio-shot'),'Hero must not embed a giant full-page screenshot');
assert.ok(hire.includes('data-portfolio-fallback') && hire.includes('data-fallback-src'), 'Unavailable images must have alternative preview and readable fallback');
for (const link of ['mailto:hello@moaviaseo.com','https://wa.me/923234313869','https://www.fiverr.com/moavia_seopro','https://www.upwork.com/freelancers/~01c3735023b2f296fa']) {
  assert.ok(hire.includes(link), 'Missing contact channel: '+link);
}
assert.ok(hire.includes('<details class="hire-premium-faq-item">'), 'FAQ must be native and keyboard accessible');
assert.ok(hire.includes('scope') && hire.includes('pricing'), 'Hiring process should explain transparent scope and pricing');
assert.ok(css.includes('@media(max-width:600px)'), 'Narrow mobile support required');
assert.ok(css.includes('prefers-reduced-motion:reduce'), 'Reduced motion support required');
assert.ok(css.includes('html[data-theme="dark"]'), 'Manual dark-mode support required');
assert.ok(css.includes('body.hire-premium-page .hire-premium-hero'), 'High-contrast hero style must be scoped to this route');
assert.ok(css.includes('body.hire-premium-page .hire-premium-ui-board'), 'Illustration needs bounded 3D styling');
assert.ok(css.includes('body.hire-premium-page .hire-premium-project-visual .hire-premium-shot img'), 'Project screenshots need containment rules');
assert.ok(!hire.includes('10 years experience') && !hire.includes('100% guaranteed ranking') && !hire.includes('50+ clients'), 'Do not fabricate proof or guarantee outcomes');
assert.ok(contact.includes('<body class="contact-premium-page">') && contact.includes('href="/contact-premium.css"'), 'Contact page must stay untouched');
assert.ok(existsSync(join(root,'dist/hire-premium.css')), 'Hire stylesheet must ship in dist');
console.log('PASS: Hire Me premium service page, authentic project previews, contact channels, accessibility and route isolation');
