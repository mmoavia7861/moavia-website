# Moavia SEO Pro — Firebase connection setup

## Existing configuration
- Project ID: `watchful-adapter-wbcxw`
- Firestore database ID: `ai-studio-moaviaseoprodigi-1ac5ad8a-6ad0-4d35-b8d4-22db21a03fe4`
- Firebase config: `firebase-applet-config.json`
- Authentication: `src/firebase.ts` (sole-owner email/password sign-in)
- Private Admin UI: `src/components/admin/AdminPortal.tsx`
- Website inquiry form: `src/components/ContactSection.tsx`

This repository is configured to **use** Firebase, but Firestore rules and Auth provider settings require separate activation. GitHub Pages is a static host and cannot run the Express `server.ts` API endpoints.

## Complete Firebase console configuration
1. Open https://console.firebase.google.com/project/watchful-adapter-wbcxw/overview and verify you are using the correct project.
2. Go to **Build > Authentication > Sign-in method**. Enable **Email/Password**. Disable **Google** if other apps in this Firebase project do not depend on it.
3. In **Authentication > Users**, create or find the **email/password** user `moavia400@gmail.com`. Set or reset its password **only in Firebase Authentication**, never in a public GitHub repository. Verify the email and revoke unwanted sessions.
4. In **Firestore Database**, verify the named database ID above exists. The web app uses this **named** database, not the `(default)` database.
5. Deploy the **reviewed** `firestore.rules` to the named database using Firebase CLI with a Firebase-authorized administrator account. The repository file is not automatically active in Firebase.
6. Sign in as the verified sole administrator `moavia400@gmail.com` using **email/password**. Other users and Google-authenticated sessions are denied by the proposed rules; former `adminUsers/{uid}` documents no longer grant admin access.
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
- The admin panel no longer allows Google login, public registration or staff invitations. Only the verified password-authenticated owner can access protected data after the new rules are published.
- The public lead form currently uses a Firestore client write with validation rules. Add App Check, anti-abuse protections, and preferably a rate-limited backend endpoint for production abuse prevention.
- Content panels other than leads may contain initial sample/mock data; do not treat that content as verified Firebase records.
- The AI tools call `/api/*` implemented in `server.ts`. Those endpoints do **not** run on GitHub Pages. Deploy a protected backend separately or disable these tools until configured.
- Committing GitHub files does **not** configure Firebase Authentication, set/reset an account password, revoke Firebase Auth sessions, or deploy Firestore rules. Publish the reviewed rules to the named database separately; until then, older live rules may still apply.

## Newsletter subscription persistence (new)

The footer newsletter form now writes to the `newsletterSubscribers` collection of the configured named Firestore database (instead of browser localStorage). Subscriptions use a SHA-256 email digest as the document ID to reduce duplicate registrations. The form does not claim success unless the Firestore write resolves.

**Action required:** Deploy the updated `firestore.rules` to the named database above. Rules saved in GitHub do not automatically update the live Firebase Console. In the Firestore **Security/Rules** tab, carefully review and publish the new `newsletterSubscribers` rule in the correct named database, or deploy with an authenticated Firebase CLI. Until the rules are published, the form may display a submission error rather than misleading success.

After deployment: open the live site, enter an email not previously registered, submit, then open Firestore **Data → newsletterSubscribers**. Confirm a new document exists with `email`, `status`, `source`, `consent`, and `createdAt`. Do not put subscriber lists in public website content.

**Prior signups:** The old form saved emails only to each visitor's browser localStorage. Those records are **not** automatically migrated to Firebase. Previously entered addresses must be resubmitted with the person's permission.

**Production note:** The direct Firestore client-write flow is not a robust anti-spam solution. Use a rate-limited server endpoint, Firebase App Check, permission-controlled reads, and double opt-in before running a public email marketing list at scale. This implementation does not send newsletters or verification emails by itself.
