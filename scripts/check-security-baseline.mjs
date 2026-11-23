import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const text = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const worker = text('src/worker.ts');
const cms = text('src/cmsWorker.ts');
const headers = text('public/_headers');
const rules = text('firestore.rules');

const checks = [
  ['Bounded API request streams', worker.includes('size > MAX_REQUEST_BYTES') &&
    worker.includes('readLimitedBody(request)') && !worker.includes('await request.text()')],
  ['Rate-limit failure closes billable/external-fetch API paths',
    worker.includes('requiresLimiter && !env.AI_LIMITER') &&
    worker.includes("path === '/api/chat'") &&
    worker.includes("path === '/api/audit'")],
  ['Same-origin API restriction', worker.includes("request.headers.get('Origin')") &&
    worker.includes("request.headers.get('Sec-Fetch-Site')")],
  ['JSON API payload only', worker.includes("request.headers.get('content-type')") &&
    worker.includes('application/json')],
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
