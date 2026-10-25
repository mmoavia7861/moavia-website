import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { isValidNewsletterEmail, normalizeSubscriberEmail } from '../utils/newsletter';

const SUBSCRIPTION_TIMEOUT_MS = 12000;

export class NewsletterTimeoutError extends Error {
  constructor() {
    super('Firebase did not confirm the subscription within 12 seconds. Please check the newsletter list before trying again.');
    this.name = 'NewsletterTimeoutError';
  }
}

/**
 * Persist one confirmed newsletter signup to the configured named Firestore DB.
 * Firestore may queue writes while offline, so a timed-out request is NOT
 * proof of failure or success. Never show a success message before confirmation.
 */
export async function subscribeToNewsletter(address: string): Promise<void> {
  const email = normalizeSubscriberEmail(address);
  if (!isValidNewsletterEmail(email) || email.length > 254) {
    throw new Error('Please enter a valid email address.');
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new Error('Your device appears offline. Reconnect and try again.');
  }
  if (!globalThis.crypto?.subtle) {
    throw new Error('Secure subscription is unavailable in this browser.');
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      (async () => {
        const digest = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(email)
        );
        const documentId = Array.from(new Uint8Array(digest))
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join('');

        await setDoc(doc(db, 'newsletterSubscribers', documentId), {
          email,
          status: 'active',
          source: 'footer_signup',
          consent: true,
          createdAt: serverTimestamp(),
        });
      })(),
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(
          () => reject(new NewsletterTimeoutError()),
          SUBSCRIPTION_TIMEOUT_MS
        );
      }),
    ]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
