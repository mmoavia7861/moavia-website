// Run after Vite build so the same accessible pointer halo reaches every HTML page.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'dist');
if (!existsSync(join(root, 'cursor-effect.js')) || !existsSync(join(root, 'cursor-effect.css'))) {
  throw new Error('Cursor-effect assets were not copied into dist by Vite.');
}
const snippet = '<link rel="stylesheet" href="/cursor-effect.css"><script src="/cursor-effect.js" defer></script>';
let count = 0;
function visit(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) { visit(path); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    let html = readFileSync(path, 'utf8');
    if (html.includes('cursor-effect.js')) continue;
    if (!html.includes('</head>')) throw new Error('Missing closing head tag in ' + path);
    html = html.replace('</head>', snippet + '</head>');
    writeFileSync(path, html, 'utf8');
    count++;
  }
}
visit(root);
if (count < 20) throw new Error('Cursor injection expected at least 20 site HTML pages; found ' + count);
console.log('Applied lightweight desktop cursor halo to ' + count + ' HTML pages.');
