import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const text = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const worker = text('src/worker.ts');
const cms = text('src/cmsWorker.ts');
const headers = text('public/_headers');
const rules = text('firestore.rules');

const checks = [
  ['Retired tools always receive 410 Gone',
    worker.includes("url.pathname.startsWith('/tools/')") && worker.includes('status:410') &&
    worker.includes("'X-Robots-Tag':'noindex, nofollow'")],
  ['All old tool API endpoints permanently retired',
    worker.includes("url.pathname.startsWith('/api/')") &&
    !worker.includes('GEMINI_API_KEY') && !worker.includes('/api/chat') && !worker.includes('/api/audit')],
  ['Public CMS and health endpoints kept active',
    worker.includes("url.pathname==='/api/public-site'") &&
    worker.includes('handleCmsRequest(request,env)') && worker.includes("url.pathname==='/api/health'")],
  ['API retirement applies before CMS or asset lookup',
    worker.indexOf("url.pathname.startsWith('/api/')") < worker.indexOf('handleCmsRequest(request,env)')],
  ['Admin Firestore rule restricted to verified password owner',
    rules.includes('request.auth.token.email_verified == true') &&
    rules.includes("request.auth.token.firebase.sign_in_provider == 'password'") &&
    rules.includes('function owner()')],
  ['Public Firestore sensitive paths denied', rules.includes('match /adminUsers/{uid}') &&
    rules.includes('allow read, write: if false;')],
  ['HSTS, anti-framing and nosniff on static assets',
    ['Strict-Transport-Security:', 'X-Frame-Options:', 'X-Content-Type-Options:'].every((v) => headers.includes(v))],
  ['HSTS, CSP and nosniff on dynamic CMS HTML',
    ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Content-Type-Options'].every((v) => cms.includes(v))],
  ['Restricted browser permissions',
    headers.includes('Permissions-Policy:') && cms.includes("'Permissions-Policy'")],
];

for (const [name, pass] of checks) {
  console.log((pass ? 'PASS ' : 'FAIL ') + name);
  assert.ok(pass, name);
}
console.log('Security baseline source assertions passed. Live configuration must be audited separately.');
