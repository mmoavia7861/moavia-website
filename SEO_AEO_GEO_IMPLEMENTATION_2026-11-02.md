# moaviaseo.com — SEO, AEO and GEO implementation roadmap
Updated 2 November 2026. Based on `moaviaseo-seo-aeo-geo-plan.pdf` supplied by the site owner, reviewed against repository source and current official Google guidance.

## 1. Strengths
- Google Search Console domain property verified; screenshot reported 20 URLs discovered, sitemap status Success as of 1 November 2026. **Discovery is not indexing**.
- Homepage has a canonical URL, metadata, HTTPS, favicon, brand identity and Organization markup.
- Seven unique service URLs, two specialized guides, five blog articles, legal/about pages and a real website portfolio exist. Do not recreate them as duplicate city doorway pages.
- Recorded mobile Lighthouse 98 and desktop 100 in the owner's reports; these are lab snapshots, not fixed ongoing CWV field scores.

## 2. Gaps and accuracy corrections
- PDF says services are only homepage anchors: **not true** for seven existing service URLs; only the overview hub was missing. This update adds `/services/`.
- PDF says there is no founder bio or contact: existing About, Founder, and contact components contain these. No publicly staffed address is verified.
- Homepage initial HTML was short and React-heavy. Expanded crawlable non-JS fallback with useful answers; added a React FAQ section matching FAQPage schema.
- Separate `/contact/` page was missing. Added a contact hub linking to the real interactive homepage form.
- New hub pages need Cloudflare production deployment and separate indexing checks. Indexing is not guaranteed.
- We have not verified Cloudflare security rules for AI search bots or confirmed Bing Webmaster Tools/GA4 ownership.
- No verified client case-study metrics exist; do not manufacture testimonials, ROI percentages, offices or address information.

## 3. SEO priorities
| Priority | Work | Estimated effort | Status |
| --- | --- | --- | --- |
| High | Expand initial homepage HTML, publish visible answer section | 2–4 h | Code implemented |
| High | `/services/` and `/contact/` indexable hubs, internal links | 2–4 h | Code implemented |
| High | Canonicals, sitemap, valid FAQ/Organization/Service/Breadcrumb schema; check all 22 URLs | 1–3 h | Automated build check; live check pending |
| High | Search Console URL Inspection on new hubs and high-value service/blog pages | 30–60 min | Owner action |
| High | Add original project screenshots, before/after screenshots or firsthand observations **without invented metrics** | 1–3 days | Evidence needed |
| Medium | Review service content against actual offered scope and location claims | 2–4 h | Owner review |
| Medium | Connect Bing Webmaster Tools, verify, submit sitemap, review indexing | 30–90 min | Owner action |
| Medium | Configure GA4 or privacy-respecting analytics and consent appropriately | 2–5 h | Owner access/consent needed |
| Medium | Audit mobile performance, accessibility, broken links monthly | 1–3 h | Ongoing |
| Low | Additional city pages ONLY if substantial unique local relevance exists | Case-by-case | Avoid doorway pages |

### Ready-to-use homepage outline
Recommended target approximately 450–650 substantive words across visible HTML sections, excluding legal links:
1. **H1: SEO, AEO and Website Development in Islamabad** (30–50-word introduction about brand, founder, audience and value).
2. **Our services** (120–160 words explaining SEO, Local SEO, AEO/GEO, website development and Ads with links).
3. **Who we help and how we work** (80–110 words, real consultation stages, realistic promises).
4. **Work you can inspect** (50–80 words linking to publicly accessible website portfolio; no fake clients).
5. **Frequently asked questions** (4–5 questions with 40–60-word direct answers, aligned with visible content).
6. **Contact and location** (35–60 words with real phone, email and form; Islamabad location only, not a fabricated street address).

**Structured data:** homepage includes Organization, WebSite, and FAQPage with matching visible FAQ. Seven service pages already include Service and BreadcrumbList plus their visible FAQs. The new hubs include CollectionPage/ContactPage + BreadcrumbList. Do not add fake aggregate ratings or LocalBusiness street address. `ProfessionalService` markup should only describe genuine service activity and must not imply a staffed office or Google Business Profile eligibility. Test with Schema.org Validator and Google Rich Results Test. FAQ rich-result display is generally unavailable to typical agencies (mostly reserved for authoritative government/health sites).

## 4. AEO — direct helpful answers
Answer questions accurately with definitions, the practical context, tradeoffs and links to detailed pages. Use readable HTML, not JavaScript-only content; verify all schema maps to **visible** answers.

**10 editorial topic ideas (not ten automatically published posts):**
1. What does an SEO audit include for a small business in Islamabad?
2. SEO vs AEO vs GEO: what is different and what overlaps?
3. How long does Google indexing take for a new website?
4. How can I check why my web page is not indexed?
5. Can an online-only agency create a Google Business Profile?
6. What is a realistic Core Web Vitals optimization workflow?
7. How should a service business measure qualified leads from SEO?
8. Is ChatGPT Search indexing the same as Google Search indexing?
9. What is the difference between local SEO and city doorway pages?
10. How does a WordPress business website need to handle privacy and consent?

Two direct-answer examples for **future reviewed articles**:

**What does an SEO audit include?** An SEO audit checks whether search engines can reach and understand useful website pages. It normally reviews indexing, redirects, canonical links, internal links, mobile usability, Core Web Vitals and the clarity of service content. The findings should be prioritized by impact and connected to real business goals; an audit cannot guarantee rankings.

**Can an online-only agency create a Google Business Profile?** An online-only agency generally is not eligible for a Google Business Profile unless it has real in-person customer contact under Google's eligibility rules. A virtual office, mailbox or invented premises does not solve this. Businesses should verify eligibility against Google's current rules and focus on useful local service pages rather than an ineligible map listing.

**Google Search Console RE2 regex for question searches** (Queries > Custom regex): `(?i)^(who|what|where|when|why|how|which|is|are|do|does|did|can|could|should|will|kya|kaise|kyun|kab|kahan)\\b`
If regex matching does not work as expected, test narrower question-prefix filters first. Low query volume or privacy thresholds can hide some search phrases.

## 5. GEO — discoverability in AI-assisted search
- Keep important content publicly crawlable and linked from other pages. Robots currently allows all user agents other than `/api/`; check Cloudflare Firewall/Managed Challenge logs for accidental blocks to Googlebot, Bingbot, OAI-SearchBot, PerplexityBot and other search crawlers. Training crawlers are different; make deliberate decisions rather than blanket allowance.
- Brand identity should be accurate and consistent on site and on genuine social profiles (GitHub, LinkedIn and Facebook), and in any eligible directory listings.
- Bing Webmaster Tools can help Bing discover pages. IndexNow requires correctly generated ownership keys or a supported integration; do not add unverified API keys.
- Publish original research, firsthand experiments, dated methodology and verifiable examples rather than fake client numbers.
- `llms.txt` is optional and not a Google Search or Google AI eligibility requirement.
- Track Search Console visibility and manually spot-check grounded AI references. One-off AI answers change and are not a ranking metric. **No citations or ranking guarantees.**

### 18 weekly manual test prompts
Record the date, platform, region, exact response, whether `moaviaseo.com` was linked, and any factual errors. Test in ChatGPT Search, Perplexity, Gemini, and Google AI Mode **where available**, keeping conditions as consistent as possible.

1. What should I check first when a new business website is not indexed by Google?
2. What is a technical SEO checklist for a small agency website?
3. What does AEO mean in digital marketing?
4. How is GEO different from SEO?
5. How do I write useful FAQs for AI search without keyword stuffing?
6. What should an Islamabad company ask before hiring an SEO agency?
7. How does local SEO work for a service company in Islamabad?
8. Is a fully online marketing agency eligible for Google Maps Business Profile?
9. What can improve LCP on a mobile website?
10. What is a useful way to compare React and WordPress for an agency website?
11. How do I test JSON-LD schema on a website?
12. How do I connect Search Console and a sitemap?
13. How do I troubleshoot canonical problems on a new business website?
14. What makes a credible web development portfolio without client case studies?
15. How do I evaluate Meta Ads conversion tracking and consent?
16. What should a Google Ads landing page include for local business enquiries?
17. What is the best way to measure qualified leads from organic search?
18. What are the differences between indexing, crawling and ranking?

Do not write AI-generated fake reviews or submit promotional spam in forums; genuine third-party references should be earned.

## 6. 30-day work plan
- **Week 1 (site code updated):** Homepage, service/contact hubs, structured data, sitemap and robots QA. **Owner:** deploy latest Cloudflare build, inspect the 2 new URLs, test canonical response and HTML with view-source; verify robots and submit updated sitemap only if needed.
- **Week 2:** Verify Google Business Profile eligibility **before** any listing; confirm honest service areas, company contact information and real identity. Set up Bing Webmaster Tools if appropriate. Verify no search crawler is blocked by Cloudflare.
- **Weeks 3–4:** Improve 2 real public website portfolio case notes with actual features and screenshots; add actual baseline/result numbers ONLY if available and consented. Publish 2–4 original helpful articles sourced from real Search Console questions (10 ideas above are editorial candidates, not auto-published pages). Set up analytics/cookie and privacy review if tracking is enabled.
- **Ongoing:** Review Search Console status and queries, test AI search prompts weekly, publish original updates based on first-hand information, check PageSpeed, and correct outdated content.

### Official references
- Google Search AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google's generative AI guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google FAQ rich-result limitations: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Google Business Profile eligibility: https://support.google.com/business/answer/13763036
- Google Search Essentials: https://developers.google.com/search/docs/essentials
