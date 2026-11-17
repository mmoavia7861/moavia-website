// Run after Vite build so the same accessible pointer halo reaches every HTML page.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'dist');
for (const asset of ['cursor-effect.js', 'cursor-effect.css', 'theme-init.js', 'theme-switcher.js', 'theme.css']) {
  if (!existsSync(join(root, asset))) throw new Error('Missing shared public asset: ' + asset);
}
const snippet = '<script src="/theme-init.js"></script><link rel="stylesheet" href="/theme.css"><link rel="stylesheet" href="/cursor-effect.css"><script src="/cursor-effect.js" defer></script><script src="/theme-switcher.js" defer></script>';
const analyticsSnippet = '<script src="/analytics-consent.js" defer></script>';
let count = 0;
function visit(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) { visit(path); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    let html = readFileSync(path, 'utf8');
    if (!/<head(?:\\s[^>]*)?>/i.test(html) || !/<\\/head>/i.test(html)) throw new Error('Missing head element in ' + path);
    // Add on every HTML page, including blog, tools, contact and privacy pages.
    // The external Google tag loads only after a visitor explicitly opts in.
    if (!html.includes('analytics-consent.js')) {
      html = html.replace(/<head(?:\\s[^>]*)?>/i, head => head + analyticsSnippet);
    }
    if (!(html.includes('theme-init.js') && html.includes('theme-switcher.js'))) {
      html = html.replace('</head>', snippet + '</head>');
      count++;
    }
    writeFileSync(path, html, 'utf8');
  }
}
visit(root);
if (count < 20) throw new Error('Cursor injection expected at least 20 site HTML pages; found ' + count);
console.log('Applied cursor halo and sitewide Light/Dark theme to ' + count + ' HTML pages.');
