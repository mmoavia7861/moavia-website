# Moavia SEO Pro AI Tools — Cloudflare Worker

## Working without an API key
- On-page SEO audit: live public HTTPS HTML check (title, meta description, canonical, H1, JSON-LD, alt attributes). This is NOT Google search rankings, Core Web Vitals, backlinks, Lighthouse or speed metrics. The Worker forbids non-public hosts, non-HTTPS URLs and redirects.
- Quick Meta: rule-based keyword-focused title and description suggestions.
- Free image designer: generated SVG promotional poster in a scalable 1K/2K/4K size. Not AI photography or photo editing.

## Gemini free-tier key required
- SERP Scout: Gemini 2.5 Flash Google Search grounding (account-dependent free quota).
- Maps: Gemini 2.5 Flash Google Maps grounding (account-dependent availability/quota).
- Chatbot: Gemini 2.5 Flash / Flash-Lite.
- Browser Voice: browser speech recognition and synthesis, Gemini text reply (Chrome/Edge support varies).
- Video SEO: reviews submitted title and script only, not a video file.
- SEO Audit: optional AI advice grounded in live HTML findings.

## Not free on Gemini API
Photorealistic generative AI image and actual generative video. No such key is embedded.
The AI video button reports the paid-tier requirement rather than a fake job ID.

## Set up the free key (manual user action)
1. Sign in to https://aistudio.google.com/apikey and obtain a Gemini API key using your own Google account. Google controls free access and quotas.
2. Cloudflare → Workers & Pages → `moaviaseo` → Settings → Variables and Secrets → Add.
3. Choose **Secret**, name exactly `GEMINI_API_KEY`, paste the key. Never add a real key to GitHub, frontend variables, screenshots, or chat messages.
4. Save/Deploy the secret (ensure it is set on **Production**). The frontend uses same-origin `/api/*` and never receives the secret.
5. Check `https://moaviaseo.com/api/health` returns JSON with `ok: true`, `geminiConfigured: true`. Test tools one by one.

## Production notes
Cloudflare `wrangler.jsonc` config includes Worker `main: src/worker.ts` and `assets.run_worker_first: ['/api/*']`. Other static assets remain CDN served.
Worker-side API rate limit binding is approximately 12 requests/minute per IP at each location, not a strict global quota. Add Cloudflare Turnstile / WAF or admin-only permissions before unlimited public use, and set Google AI budget controls to avoid unwanted costs.
A model/grounding tool may be disabled on a particular free account; its API returns an informative error rather than inventing output.
Firebase, admin authentication, lead forms and security rules are not changed by the AI backend.
