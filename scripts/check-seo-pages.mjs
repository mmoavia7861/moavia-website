import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const base = 'https://moaviaseo.com';
const routes = [
  '/services/seo/',
  '/services/local-seo-islamabad/',
  '/services/aeo-geo-optimization/',
  '/services/ai-website-development/',
  '/services/wordpress-development/',
  '/services/google-ads/',
  '/services/meta-ads/',
  '/guides/seo-aeo-geo-explained/',
  '/guides/technical-seo-checklist/',
  '/about/',
  '/privacy-policy/',
  '/terms-and-conditions/',
  '/blog/',
  '/blog/technical-seo-playbook-2026/',
  '/blog/ai-generated-websites-human-engineering/',
  '/blog/mastering-meta-ads-capi-cro/',
  '/blog/local-seo-google-maps-3pack/',
  '/blog/image-video-resolution-cro/',
  '/projects/',
];
const read = (path) => readFileSync(join(dist, path), 'utf8');
function check(condition, error) { if (!condition) throw new Error('SEO check failed: ' + error); }
const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
const root = read('index.html');
check(robots.includes('Sitemap: ' + base + '/sitemap.xml'), 'sitemap missing in robots');
check(root.includes('<link rel="canonical" href="' + base + '/"'), 'homepage canonical missing');
check(root.includes('href="/services/seo/"'), 'homepage lacks crawlable service link');
check(existsSync(join(dist, 'favicon.png')), 'favicon missing');
check(existsSync(join(dist, 'site-logo.png')), 'site logo missing');
check(existsSync(join(dist, 'apple-touch-icon.png')), 'Apple touch icon missing');
check(existsSync(join(dist, 'site.webmanifest')), 'site web manifest missing');
check(root.includes('href="/favicon.png"'), 'homepage favicon link missing');
check(sitemap.includes('<loc>' + base + '/</loc>'), 'homepage missing from sitemap');
for (const route of routes) {
  const htmlPath = join(route.replace(/^\/|\/$/g, ''), 'index.html');
  check(existsSync(join(dist, htmlPath)), 'page absent from build: ' + route);
  const html = read(htmlPath);
  check(html.includes('href="' + base + route + '"'), 'canonical missing: ' + route);
  check(html.includes('<h1>') && html.includes('</h1>'), 'visible title missing: ' + route);
  check(html.includes('<meta name="description"'), 'description missing: ' + route);
  check(html.includes('application/ld+json'), 'JSON-LD missing: ' + route);
  check(html.includes('href="/favicon.png"'), 'static page favicon link missing: ' + route);
  if (route.startsWith('/services/') || route.startsWith('/guides/')) {
    check(html.includes('Frequently asked questions'), 'visible answer section missing: ' + route);
  }
  check(!html.includes('example.com'), 'placeholder URL detected: ' + route);
  check(sitemap.includes('<loc>' + base + route + '</loc>'), 'route not in sitemap: ' + route);
  const matched = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  check(Boolean(matched), 'schema script missing: ' + route);
  const schema = JSON.parse(matched[1]);
  if (route.startsWith('/blog/') && route !== '/blog/') {
    check(html.includes('<time datetime="2026-10-28">'), 'article needs a visible publication date: '+route);
    check(JSON.stringify(schema).includes('BlogPosting'), 'article schema missing: '+route);
  }
}
check((sitemap.match(/<loc>/g) || []).length === routes.length + 1,
  'sitemap URL count is not homepage + service/guide routes');
check(existsSync(join(dist, '404.html')), '404 page missing');
check(read('404.html').includes('noindex'), '404 page should not be indexed');
console.log('SEO validation passed: ' + routes.length + ' unique static pages, valid JSON-LD, canonical URLs, sitemap, robots.txt and 404.');
