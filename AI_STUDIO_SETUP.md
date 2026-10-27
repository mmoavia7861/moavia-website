# Moavia SEO Pro — AI tools (free-tier safe setup)

Cloudflare deploys `src/worker.ts` for the same-origin `/api/*` endpoints.
The Vite static website remains at https://moaviaseo.com and `server.ts` is not
running in Cloudflare production.

## Keyless free tools
- **On-Page SEO Audit:** inspect observable HTML metadata from a public HTTPS
  URL: title, meta description, canonical, H1, JSON-LD markup, image alt
  attributes. This is **not** Lighthouse, Core Web Vitals, real traffic,
  Google rankings, or link analysis. A blocked URL may be uninspectable.
- **Quick Meta:** deterministic SEO tag drafts. Review manually.
- **SERP Research Planner:** keyword/location research checklist plus
  clickable *real Google Search* query; does **not** fetch or rank live SERP
  competitors. Search Console can show rankings for domains you own.
- **Local SEO Checklist:** business name, category and city guidance plus
  a link to real Google Maps listings; does **not** compute map-pack position,
  fake local reviews, or inspect competitor listings.
- **SVG Poster Maker:** original downloadable marketing vector graphics;
  not AI-generated photography or editing.

## Gemini free-tier tools
- Chatbot: **Gemini 3.5 Flash-Lite (default)** or **Gemini 3.8 Flash**.
  When the 3.8 model returns 503 or 504 and the query uses no paid
  grounding, the server tries 3.5 Flash-Lite and reports the fallback.
  A 429 quota error is **not** auto-retried.
- Video SEO: analyzes user-provided title and script text only.
- Browser voice: uses device/browser recognition & speech synthesis and
  the Gemini text API, not the Gemini Live streaming API.
- HTML audit may additionally request **optional** Gemini recommendations;
  this checkbox is off by default. If quota runs out, the HTML findings
  still return.

**Google Search / Maps grounding is not bundled into this free setup.**
Google AI documentation limits grounding by model and account tier. The
SERP/Maps tools deliberately use honest keyless research guides and
external Google Search/Maps links. Do not call those real-time API results.

## Production secret
1. Get your own key at https://aistudio.google.com/apikey.
2. Cloudflare Workers & Pages -> moaviaseo -> Settings -> Variables and
   Secrets -> Add Secret in Production.
3. Use exact name `GEMINI_API_KEY`. Store the value only inside Cloudflare.
4. Save/deploy, then view https://moaviaseo.com/api/health. JSON should show
   `ok:true` and `geminiConfigured:true`.
5. Test Chat (3.5), free HTML audit (unchecked AI option), SERP checklist
   and Maps checklist independently. Confirm the latest Cloudflare deployment
   is successful; a GitHub build alone does not prove production deploy.

## Errors, access, and costs
- Google API **503/504**: temporary overload or timeout; 3.8 chat tries
  3.5 after a transient overload. Other tools show a clear error.
- Google API **429**: rate limit, model quota or spending cap exceeded;
  check the selected project's AI Studio rate-limit/usage settings and
  do not repeatedly retry.
- Google API **400/404**: unsupported model, grounding feature, or invalid
  request; **403**: project/key not authorized.
- Cloudflare `AI_LIMITER` uses approximately 12 requests/minute per IP
  per location. This is not an exact global budget or abuse safeguard;
  add Turnstile, Cloudflare WAF and Google project limits before promoting
  unlimited public AI tools. A paid Google tier can incur fees.

No Firebase rules, subscriber data, leads or admin credentials are changed
by the Worker/API updates.

Google references:
- https://ai.google.dev/gemini-api/docs/api-errors
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/troubleshooting
