import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const read=(p)=>readFileSync(join(root,p),'utf8');
const contact=read('dist/contact/index.html');
const hire=read('dist/hire-me/index.html');
const css=read('dist/contact-premium.css');
const home=read('src/App.tsx');

assert.ok(contact.includes('<body class="contact-premium-page">'),'Contact must get its own isolated premium page layout');
assert.ok(contact.includes('<link rel="stylesheet" href="/seo/pages.css"><link rel="stylesheet" href="/contact-premium.css">'),'Contact CSS link tags must be syntactically well formed');
assert.ok((contact.match(/<h1(?:\s[^>]*)?>/g)||[]).length===1,'Contact page must have one semantic H1');
assert.ok(contact.includes('id="contact-premium-heading"'),'Contact H1 should be named for accessibility');
assert.ok(contact.includes('"@type":"ContactPage"'),'ContactPage structured data should be preserved');
assert.ok(contact.includes('href="https://moaviaseo.com/contact/"'),'Contact canonical should remain');
assert.ok(contact.includes('href="mailto:hello@moaviaseo.com'),'Email action must remain functional');
assert.ok(contact.includes('href="https://wa.me/923234313869'),'WhatsApp must link to the owner-provided business number');
assert.ok((contact.match(/href="\/#contact"/g)||[]).length>=2,'Structured project enquiry must link to existing real form');
assert.ok(home.includes('id="contact"') && home.includes('<ContactSection'),'Homepage project form must still exist');
for(const path of ['/web-development/','/ai-automations/','/android-development/','/privacy-policy/','/hire-me/']){
  assert.ok(contact.includes('href="'+path+'"'),'Missing useful Contact page route: '+path);
}
for(const source of ['fiverr.com/moavia_seopro','upwork.com/freelancers']){
  assert.ok(contact.includes(source),'Missing verified freelancer contact route '+source);
}
assert.ok(css.includes('@media(max-width:480px)'),'Narrow mobile layout is required');
assert.ok(css.includes('prefers-reduced-motion:reduce'),'Reduced-motion rules are required');
assert.ok(css.includes('html[data-theme="dark"]'),'Dark mode compatibility is required');
assert.ok(css.includes('body.contact-premium-page .contact-premium-hero'),'Hero must use a scoped high-contrast style');
assert.ok(!contact.includes('guaranteed 24-hour response')&&!contact.includes('walk-in office available'),'Do not invent response SLA or physical office');
assert.ok(hire.includes('SEO, Website &amp; Project Services'),'Retain the existing Hire Me page, independently');
assert.ok(existsSync(join(root,'dist/contact-premium.css')),'Contact styling asset must be shipped');
console.log('PASS: polished Contact page links, accessibility, real form route and Hire Me isolation');
