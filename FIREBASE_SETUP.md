# Moavia SEO Pro — Firebase connection setup

## Existing configuration
- Project ID: `watchful-adapter-wbcxw`
- Firestore database ID: `ai-studio-moaviaseoprodigi-1ac5ad8a-6ad0-4d35-b8d4-22db21a03fe4`
- Firebase config: `firebase-applet-config.json`
- Authentication: `src/firebase.ts`
- Private Admin UI: `src/components/admin/AdminPortal.tsx`
- Website inquiry form: `src/components/ContactSection.tsx`

This repository is configured to **use** Firebase, but Firestore rules and Auth provider settings require separate activation. GitHub Pages is a static host and cannot run the Express `server.ts` API endpoints.

## Complete Firebase console configuration
1. Open https://console.firebase.google.com/project/watchful-adapter-wbcxw/overview and verify you are using the correct project.
2. Go to **Build > Authentication > Sign-in method**. Enable **Google** and, only if needed, **Email/Password**.
3. Go to **Authentication > Settings > Authorized domains**. Add `mmoavia7861.github.io` (without protocol or path). Keep the project's existing Firebase Auth domain entries.
4. In **Firestore Database**, verify the named database ID above exists. The web app uses this **named** database, not the `(default)` database.
5. Deploy the **reviewed** `firestore.rules` to the named database using Firebase CLI with a Firebase-authorized administrator account. The repository file is not automatically active in Firebase.
6. Sign in as verified primary owner `moaviahassan124@gmail.com`; staff access requires a separate owner-provisioned `adminUsers/{uid}` document with a verified matching email, permitted role, and `active: true`.
7. Check client inquiries under the named Firestore database's `leads` collection. Run an actual form test and confirm the same document appears in Firestore and in the dashboard.
8. Configure GitHub Pages **Source: GitHub Actions** and verify compiled deployment to https://mmoavia7861.github.io/moavia-website/.

## Deploy Firestore rules (requires Firebase CLI and project permissions)

```bash
npm install -g firebase-tools
firebase login
firebase use watchful-adapter-wbcxw
firebase deploy --only firestore:ai-studio-moaviaseoprodigi-1ac5ad8a-6ad0-4d35-b8d4-22db21a03fe4
```

Verify the exact CLI command and target using the installed firebase-tools version before deployment; named databases may require specific configuration.

## Security cautions
- `adminUsers` and invitation records require a trusted provisioning procedure. Do **not** make public signup or arbitrary invitation tokens grant access.
- The public lead form currently uses a Firestore client write with validation rules. Add App Check, anti-abuse protections, and preferably a rate-limited backend endpoint for production abuse prevention.
- Content panels other than leads may contain initial sample/mock data; do not treat that content as verified Firebase records.
- The AI tools call `/api/*` implemented in `server.ts`. Those endpoints do **not** run on GitHub Pages. Deploy a protected backend separately or disable these tools until configured.
- No Firebase Auth, Firestore rule, or Cloud Functions production deployment has been performed by generating this file.
