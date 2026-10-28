import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const origin = 'https://moaviaseo.com';
const url = origin + '/projects/';
const root = join(process.cwd(), 'public');
const websites = JSON.parse(readFileSync(join(process.cwd(), 'src/data/githubProjects.json'), 'utf8'));
const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

if (websites.length !== 3 || websites.some(w => !/^https:\/\/mmoavia7861\.github\.io\/[A-Za-z0-9_.-]+\/$/.test(w.url))) {
  throw new Error('Expected 3 published GitHub Pages website URLs');
}

const title = 'Website Portfolio | Moavia SEO Pro';
const description = 'Open three GitHub Pages websites from the Moavia SEO Pro website portfolio.';
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'CollectionPage', name: title, url, description },
    { '@type': 'ItemList', itemListElement: websites.map((w, i) => (
      { '@type': 'ListItem', position: i + 1, name: w.title, url: w.url }
    )) }
  ]
};
const cards = websites.map(w =>
  '<article class="card"><span class="pill">' + escape(w.category) + '</span>'
  + '<h2>' + escape(w.title) + '</h2>'
  + '<p><a href="' + escape(w.url) + '" target="_blank" rel="noopener noreferrer">Visit Website ↗</a></p></article>'
).join('');

const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
  + '<title>' + escape(title) + '</title><meta name="description" content="' + escape(description) + '">'
  + '<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="' + url + '">'
  + '<meta property="og:title" content="' + escape(title) + '"><meta property="og:description" content="' + escape(description) + '">'
  + '<meta property="og:url" content="' + url + '"><link rel="stylesheet" href="/seo/pages.css">'
  + '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script>'
  + '</head><body><header><div class="wrap"><a class="brand" href="/">Moavia SEO Pro</a>'
  + '<nav aria-label="Main navigation"><a href="/">Home</a><a href="/#portfolio">Websites</a><a href="/blog/">Blog</a><a href="/about/">About</a><a href="/#contact">Contact</a></nav></div></header>'
  + '<main><div class="wrap subnav"><a href="/">Home</a> / Websites</div>'
  + '<div class="hero"><div class="wrap"><span class="pill">Website Portfolio</span><h1>Explore Our Websites</h1>'
  + '<p>Choose a website below. Each link opens the GitHub Pages website in a new tab.</p></div></div>'
  + '<div class="wrap"><section><h2>Visit a website</h2><div class="cards">' + cards + '</div></section></div></main>'
  + '<footer><div class="wrap"><div><strong>Moavia SEO Pro</strong><p>Islamabad, Pakistan</p></div>'
  + '<div><a href="/about/">About</a> · <a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms-and-conditions/">Terms</a></div></div></footer>'
  + '</body></html>\n';

mkdirSync(join(root, 'projects'), { recursive: true });
writeFileSync(join(root, 'projects/index.html'), html, 'utf8');

const sitemapPath = join(root, 'sitemap.xml');
const sitemap = readFileSync(sitemapPath, 'utf8');
if (!sitemap.includes('</urlset>') || sitemap.includes('<loc>' + url + '</loc>')) {
  throw new Error('Invalid or repeated projects sitemap entry');
}
writeFileSync(sitemapPath, sitemap.replace('</urlset>', '  <url><loc>' + url + '</loc></url>\n</urlset>'), 'utf8');
console.log('Generated website link directory for ' + websites.length + ' GitHub Pages sites.');
