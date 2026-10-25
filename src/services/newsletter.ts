import { isValidNewsletterEmail, normalizeSubscriberEmail } from '../utils/newsletter';
import { postFirestore, firestoreDocumentPath, FirestoreRestError } from './firestoreRest';

export { FirestoreRestError };

/** Write a subscriber using the Firestore REST commit API.
 *  The serverTimestamp transform satisfies the timestamp security rule.
 *  A create-only precondition avoids overwriting subscriptions.
 */
export async function subscribeToNewsletter(address: string): Promise<void> {
  const email = normalizeSubscriberEmail(address);
  if (!isValidNewsletterEmail(email) || email.length > 254) {
    throw new Error('Please enter a valid email address.');
  }
  if (!globalThis.crypto?.subtle) throw new Error('Secure browser context required.');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
  const id = Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2,'0')).join('');
  const name = firestoreDocumentPath('newsletterSubscribers', id);
  await postFirestore(':commit', {
    writes: [{
      update: { name, fields: {
        email: { stringValue: email },
        status: { stringValue: 'active' },
        source: { stringValue: 'footer_signup' },
        consent: { booleanValue: true },
      }},
      updateTransforms: [{ fieldPath: 'createdAt', setToServerValue: 'REQUEST_TIME' }],
      currentDocument: { exists: false },
    }],
  });
}
