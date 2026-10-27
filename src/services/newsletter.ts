import { isValidNewsletterEmail, normalizeSubscriberEmail } from '../utils/newsletter';
import { postFirestore, firestoreDocumentPath, firestoreEmailDocumentId } from './firestoreRest';

export { FirestoreRestError, isDuplicateFirestoreDocumentError } from './firestoreRest';

/** Write a subscriber using the Firestore REST commit API.
 *  The serverTimestamp transform satisfies the timestamp security rule.
 *  A create-only precondition avoids overwriting subscriptions.
 */
export async function subscribeToNewsletter(address: string): Promise<void> {
  const email = normalizeSubscriberEmail(address);
  if (!isValidNewsletterEmail(email) || email.length > 254) {
    throw new Error('Please enter a valid email address.');
  }
  const id = await firestoreEmailDocumentId(email);
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
