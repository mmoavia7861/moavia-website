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
