# Moavia SEO Pro — SEO, Local GEO and AI Search (AEO/GEO) Plan

Updated: 2026-10-28

## Implemented in source code

- Homepage: canonical HTTPS URL, useful initial HTML (including real links that work
  before JavaScript runs), basic Organization JSON-LD, contact details and metadata.
- Build: `npm run build` generates **7 service pages and 2 editorial guides** as
  static HTML before Vite builds the app. `scripts/check-seo-pages.mjs` validates
  canonical URLs, schema JSON parsing, the sitemap and pages in `dist`.
- All generated pages have different page titles, descriptions, canonical URLs,
  readable HTML H1 content, question/answer sections, Service or Article
  structured data, BreadcrumbList and internal links. Links are discoverable
  without client-side JavaScript.
- Added the relevant service pages to the homepage, service cards and footer.
- `/sitemap.xml` enumerates **10 URLs** including the homepage.
- `/robots.txt` allows normal crawling and references the sitemap.
- `/404.html` identifies nonexistent pages. Wrangler assets use
  `html_handling: auto-trailing-slash` and `not_found_handling: 404-page` for
  proper redirects and missing-route responses.
- The homepage no longer displays synthetic reviews from `mockData.ts` as
  'verified endorsements'. The public section explains the project process
  until genuine documented reviews are available.

## New canonical URLs

1. https://moaviaseo.com/services/seo/
2. https://moaviaseo.com/services/local-seo-islamabad/
3. https://moaviaseo.com/services/aeo-geo-optimization/
4. https://moaviaseo.com/services/ai-website-development/
5. https://moaviaseo.com/services/wordpress-development/
6. https://moaviaseo.com/services/google-ads/
7. https://moaviaseo.com/services/meta-ads/
8. https://moaviaseo.com/guides/seo-aeo-geo-explained/
9. https://moaviaseo.com/guides/technical-seo-checklist/

The original 5 modal-only blog entries are **not** advertised in the sitemap
because they currently have no standalone URLs. Publishing an article archive
with distinct URLs, reviewed factual claims, citations and dates is a future
content editorial task. Do not claim these posts are individually indexed.

## Deployment checklist

1. Check the **latest Cloudflare Worker build**, not just GitHub Pages Actions:
   the Cloudflare build should run `npm run build` and deploy from `./dist`
   using `npx wrangler deploy --config wrangler.jsonc`.
2. Open the nine URLs above and check that each returns readable HTML, not the
   React homepage. On `/services/seo/`, View Source should contain its service
   title and canonical tag. A bad path such as `/does-not-exist/` should give a
   real HTTP 404 (not 200 with the homepage).
3. Visit `https://moaviaseo.com/sitemap.xml` and confirm it contains 10
   canonical URLs. Visit `https://moaviaseo.com/robots.txt` and confirm sitemap.
4. Search Console already contains the sitemap at the same URL. No change to
   the submitted sitemap address is needed; Google can re-fetch updated content.
   Use URL Inspection > Test Live URL on important new URLs. Request indexing
   selectively; indexing and ranking aren't guaranteed.
5. Test structured data with https://validator.schema.org/ and
   https://search.google.com/test/rich-results.
6. Measure actual CWV and loading with https://pagespeed.web.dev/. This code
   change does not certify any Lighthouse score or real-world ranking.

## Local SEO (geographic optimization)

- Site identity: Islamabad, Pakistan; services can be marketed locally.
  A genuine staffed street address, opening hours, real reviews and precise
  map coordinates were NOT fabricated or inserted.
- Only create a Google Business Profile if the business actually meets Google's
  **in-person customer contact** eligibility rules. An entirely online agency
  without in-person contact does not qualify by default.
- If eligible, verify with the real business details; select accurate category,
  service area, phone number, hours and genuine business imagery.
- Seek legitimate editorial mentions and reviews from actual customers. Do not
  use review buying, copied testimonials or mass-generated city doorway pages.

## AEO & GEO (answer and generative search)

- Pages include concise answers to buyer questions and clear definitions, scope,
  limits and practical checklists. The structured data describes visible content.
- Search engines may use the same SEO fundamentals to discover and cite useful
  answers. There is **no guaranteed inclusion** in Google AI Overviews, AI Mode,
  ChatGPT Search, Bing or another answer engine.
- Do not claim `FAQPage` schema guarantees FAQ rich results. Google generally
  restricts this specific display treatment to authoritative health/government
  sites; the FAQs remain useful to real visitors.
- Do not claim an `llms.txt` file is a Google AI ranking requirement.

## Content quality tasks requiring real business input

- Confirm every stated service is actually offered, and replace illustrative
  descriptions with firsthand work processes, original photos and verified
  examples where possible.
- Obtain written permission and evidence before publishing client testimonials,
  case-study metrics, awards, partnerships, or certifications.
- Publish substantive original articles that explain unique experiments,
  experience, examples and tradeoffs. Improve/verify broad statistics and
  claims in current modal articles before making them crawlable.
- Create privacy/terms pages suited to the business, disclose data collection,
  and review lead-contact tracking and consent.
- Set up Search Console measurement: indexed pages, impressions, clicks,
  queries, CTR, and qualified enquiries as separate metrics.
- Consider Bing Webmaster Tools indexing and sitemap submission as a follow-up.

## Official references

- Google Search's generative AI optimization:
  https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google AI features:
  https://developers.google.com/search/docs/appearance/ai-features
- Google JavaScript SEO:
  https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Cloudflare static HTML:
  https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
- Google Business Profile eligibility:
  https://support.google.com/business/answer/13763036
