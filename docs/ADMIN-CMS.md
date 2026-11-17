# Moavia Admin CMS — Deployment and Control Guide

## Private administrator URL

https://moaviaseo.com/admin/

The public footer also has an Admin link. The admin HTML is not sensitive, but **private Firestore records are never rendered before Firebase Authentication and the owner-only security-rule check**. An unindexed page is not an access-control mechanism.

## Working capabilities (after required Firebase and Cloudflare deployment)

| Dashboard section | Actual behavior |
| --- | --- |
| Overview | Live counts for enquiries, new leads and active newsletter subscribers, or an explicit data-loading error |
| Leads | Read, search, filter, change status, delete and export actual Firestore enquiries; no sample records |
| Newsletter | View actual subscribers; unsubscribe or delete subscriber records |
| Website & SEO | Save homepage hero, subtitle, announcement, CTA, contact email, WhatsApp, homepage SEO metadata and profile links into Firestore `siteSettings/public` |
| Featured tools | Rename/reword/hide homepage feature cards; **does not change tool functionality or block their URLs** |
| Blog CMS | Create/edit, save draft, publish/unpublish and delete new articles in `blogPosts`; public route `/blog/<slug>/` |
| Portfolio CMS | Manage new published project summaries, source links and optional images in `portfolioProjects`; route `/projects/<slug>/` |
| Services CMS | Manage new service pages in `cmsServices`; route `/offerings/<slug>/`; published entries also appear on the homepage and Hire Me page |
| Custom pages | Manage new pages in `cmsPages`; route `/pages/<slug>/` |
| Integrations | Open Google Analytics, Search Console, Cloudflare and code-generated page sources; these are links, **not integrations which can edit those providers** |

Published CMS pages are rendered by the Cloudflare Worker as escaped HTML with canonical URLs, descriptions, JSON-LD where appropriate, and are added dynamically to the sitemap. Drafts are not served publicly when the Firestore rules are deployed correctly. Public homepage settings are applied in React and used by the Worker for server-rendered homepage title/description and fallback text.

## Important boundaries

The existing **legacy static blog articles, portfolio source pages, legal pages, logos, tool algorithms, website theme, and code-defined forms** remain version-controlled and require reviewed GitHub code changes plus redeployment. New CMS records are manageable without GitHub. The admin does not edit Google Analytics/Search Console accounts, Cloudflare DNS, Firebase Security Rules, AdSense approval, or upload local images. You may reference HTTPS-hosted images when creating new pages; do not use unauthorized assets.

Changing homepage SEO metadata does not guarantee indexing, rankings, traffic, rich results, AdSense approval or revenue. Published content must be accurate and not fabricate case studies, results, client reviews, or metrics.

## Required Firebase setup

The website uses Firebase project `watchful-adapter-wbcxw` and the named Firestore database specified in `firebase.json`.

1. In Firebase Console, verify that **Authentication > Sign-in method > Email/Password** is enabled and that the designated administrator account already exists and has completed email verification. Never paste or commit its password.
2. Open **Firestore Database**, select the exact **named database** in `firebase.json`, then open **Rules**. Review and deploy the repository's `firestore.rules` to that database. The checked-in file is *not* automatically deployed just because it was committed to GitHub.
3. Confirm the deployed rules enforce owner-only writing and public reading of **published** content only. Run Rules Simulator checks: unauthenticated draft read must fail; unauthenticated published article read must succeed; unauthenticated create/update/delete must fail; verified owner writes must succeed.
4. Do not initialize `siteSettings/public` with secrets. It is a publicly readable settings document. Admin settings Save creates it the first time.
5. If Firestore denies a CMS read or write, verify you selected the correct database and published current rules. The admin will display the failure, rather than pretending a save succeeded.

## Required Cloudflare setup

The repository's GitHub Actions workflow `.github/workflows/deploy-cloudflare.yml` builds and deploys to the existing Cloudflare Worker when the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are correctly configured.

1. Open GitHub Actions in the repo, inspect the latest **Deploy moaviaseo.com to Cloudflare** run and verify it completed successfully. Do not assume a commit is a successful deployment.
2. Inspect the **Validate website and admin CMS** workflow. It runs the TypeScript check and production build.
3. Open `https://moaviaseo.com/admin/`, sign in and test one *draft* article. Verify that its public URL does not disclose the draft. Publish it and check the URL, `/blog/` listing and `/sitemap.xml`; unpublish it and confirm it stops being accessible.
4. Test a homepage setting and verify the rendered homepage changes. Then restore correct public wording if the test was only temporary.
5. Confirm no private customer information appears in public HTML, URLs, analytics events or search results.

## Content editing tips

- Use a lowercase hyphenated slug such as `local-seo-guide`. Once an item has a public URL, its slug is locked by the editor; create a replacement document to change a URL, then separately arrange a redirect if needed.
- The body editor accepts **plain text**, empty lines separating paragraphs and `## Heading` / `### Subheading`. HTML is escaped rather than executed.
- Publication requires real title, excerpt and main body. Use actual HTTPS project links; do not invent customers or performance numbers.
- The original static blog and project pages are protected from CMS slug collisions. To update those source-generated pages, use their GitHub source and deploy.
- An image URL is a remote asset link, not an upload. Publish only images you have permission to use.
- Lead and newsletter deletions cannot be undone. Keep exports private and protect subscriber email addresses.

## Diagnostics and rollback

- A blank count or a Firebase error is not zero traffic or zero leads. Read the error and confirm permissions/database.
- CMS content lives in Firestore. GitHub version history does not automatically back up these documents.
- For code rollback, use a reviewed GitHub revert and redeploy the Worker. For CMS content rollback, use an authorized Firestore backup or recreate the record.
- Google Analytics and Search Console must be opened in their own accounts; no made-up metrics are displayed.
