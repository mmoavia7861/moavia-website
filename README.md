# Moavia Hassan — SEO Tools & Web Projects

Personal portfolio and free browser-based SEO utilities at **https://moaviaseo.com/**.

**Start here:** [All free SEO tools](https://moaviaseo.com/tools/) · [Projects](https://moaviaseo.com/projects/) · [About](https://moaviaseo.com/about/) · [Contact](https://moaviaseo.com/contact/)

## Three free SEO tools

| Tool | What it does | Launch |
| --- | --- | --- |
| **Meta Title & Description Checker** | Counts the title and description characters, extracts tags from *pasted* HTML, and displays an **illustrative**, Google-style search snippet preview. | [Open Meta Checker](https://moaviaseo.com/tools/meta-title-description-checker/) |
| **JSON-LD Schema Generator** | Generates FAQPage, Organization and Article structured data from information you enter. Copy JSON-LD, copy a script tag or download the JSON. | [Open Schema Generator](https://moaviaseo.com/tools/json-ld-schema-generator/) |
| **Robots.txt & XML Sitemap Generator** | Creates robots.txt and sitemap.xml files from real website paths and URLs you supply; copy or download either file. | [Open Robots & Sitemap Generator](https://moaviaseo.com/tools/robots-txt-sitemap-generator/) |

### How to use each tool

**1 — [Meta Checker](https://moaviaseo.com/tools/meta-title-description-checker/)**

Enter a title and meta description, or paste a page's HTML source and click **Extract from pasted HTML**. Review the counts and search-style preview, then copy the generated tags. The preview is not Google's actual search result; Google may rewrite titles or snippets. This tool does **not** crawl a URL.

**2 — [Schema Generator](https://moaviaseo.com/tools/json-ld-schema-generator/)**

Choose FAQPage, Organization or Article, enter **accurate facts that are visible on the real page**, generate the JSON-LD, and copy or download it. Correctly formatted JSON-LD does not guarantee a rich result. In particular, generating FAQPage markup does not imply a Google FAQ rich-result feature will be shown.

**3 — [Robots & Sitemap Generator](https://moaviaseo.com/tools/robots-txt-sitemap-generator/)**

Enter a website origin, any intended crawl directives, and real canonical URLs or paths. Generate and download `robots.txt` and `sitemap.xml`, review them carefully, then publish them at the relevant site's root. **The generator does not discover URLs automatically**. Avoid `Disallow: /` unless you intend to block the whole site from crawling, and never treat robots.txt as access control.

These three static tools operate on text entered into your browser; they do not require an account or a paid API for the listed functions.

## Web projects

The [project directory](https://moaviaseo.com/projects/) contains public GitHub-linked demos with project briefs, technology stacks and source links. They are not presented as verified paid-client case studies, and no unverified traffic or ranking gains are claimed.

## Website stack and development

- React, TypeScript and Vite for the portfolio application.
- Static HTML, CSS and JavaScript for the three standalone tools.
- Cloudflare Workers for the live site and backend-dependent optional features; GitHub Actions for deployments.
- Firebase and selected external services for some optional site functions.
- The `public/` directory contains the static tools, `robots.txt` and `sitemap.xml`; generators in `scripts/` update the production pages and sitemap during the build.

Build locally using the repository's Bun lockfile:

```bash
bun install --frozen-lockfile
bun run build
```

**Do not commit API tokens, account IDs, credentials or secrets.** Live deployment uses GitHub Actions encrypted secrets. Publishing the Cloudflare Worker requires authorized account credentials; cloning the repository alone will not give you that access.

## Secure administrator dashboard and content CMS

The admin interface is at **https://moaviaseo.com/admin/** after a successful Cloudflare deployment; it is also linked in the homepage footer. Sign-in requires the designated verified Firebase Email/Password owner. Firestore Security Rules, not hiding a URL, provide access control.

- **Live operations:** real enquiries and newsletter data; lead search/status updates/deletion/CSV export; subscriber unsubscribe and deletion.
- **Website controls:** homepage copy, SEO title/meta description, announcement, primary button, public contact details, social profile URLs and the three featured tool cards saved to `siteSettings/public`.
- **Publish new content:** real Firestore CRUD for Blog, Portfolio, Service and Custom Pages. Only records marked published are served publicly by the Cloudflare Worker at `/blog/`, `/projects/`, `/offerings/` and `/pages/` routes. New content URLs are dynamically included in the sitemap.
- **Separate providers:** Google Analytics/Search Console, Cloudflare deployment/DNS and Firebase rules are accessed in their respective official systems. Existing source-generated posts, project pages, tool functionality, branding assets and legal pages still require reviewed GitHub changes.
- **Required to activate:** deploy the current `firestore.rules` to the exact named Firebase database and verify the latest GitHub Actions Cloudflare deployment. Committing these rules does not deploy them to Firebase.

**Instructions and a production test checklist:** [Admin CMS Control Guide](docs/ADMIN-CMS.md). Do not paste passwords, service-account credentials, API secrets or private customer records into public GitHub files.

## SEO and privacy

- [Production sitemap](https://moaviaseo.com/sitemap.xml) and [robots.txt](https://moaviaseo.com/robots.txt)
- [Privacy Policy](https://moaviaseo.com/privacy-policy/) — includes the Cloudflare Web Analytics disclosure
- [Terms and Conditions](https://moaviaseo.com/terms-and-conditions/)

Sitemap publication helps search engines discover pages but **does not guarantee indexing or rankings**. Content, SEO, and privacy claims should be checked against each production release.

## Feedback

If a tool behaves unexpectedly, include the tool URL, browser, steps to reproduce and expected versus actual result in a [GitHub Issue](https://github.com/mmoavia7861/moavia-website/issues). Avoid posting passwords, tokens, personal records or confidential site data.

Contact: **hello@moaviaseo.com**

## Sharing the tools

The [Share Kit](docs/SHARE-KIT.md) contains factual LinkedIn and maker-community descriptions for all three tools. Share only where community rules permit it; do not spam, buy links, or claim unverified results.

---
Built as a practical public portfolio. No guarantees of search rankings, rich results, or third-party service availability.
