import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { isValidNewsletterEmail, normalizeSubscriberEmail } from '../utils/newsletter';

/**
 * Save newsletter consent to the configured named Firestore database.
 * A deterministic email digest prevents accidental duplicate subscriptions.
 * Firestore security rules must allow CREATE only for visitors.
 * Do not log subscriber email addresses.
 */
export async function subscribeToNewsletter(address: string): Promise<void> {
  const email = normalizeSubscriberEmail(address);
  if (!isValidNewsletterEmail(email) || email.length > 254) {
    throw new Error('Please enter a valid email address.');
  }

  if (!globalThis.crypto?.subtle) {
    throw new Error('Secure subscription is unavailable in this browser.');
  }

  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
  const documentId = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  // Visitor CREATE succeeds only once. A repeat signup is rejected by
  // Firestore rules rather than overwriting the existing subscription.
  await setDoc(doc(db, 'newsletterSubscribers', documentId), {
    email,
    status: 'active',
    source: 'footer_signup',
    consent: true,
    createdAt: serverTimestamp(),
  });
}
