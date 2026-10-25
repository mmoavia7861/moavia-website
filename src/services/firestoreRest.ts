import firebaseConfig from '../../firebase-applet-config.json';

type FirestoreValue = { stringValue: string };

export class FirestoreRestError extends Error {
  constructor(message: string, public readonly status: number, public readonly code: string) {
    super(message);
    this.name = 'FirestoreRestError';
  }
}

const { projectId, firestoreDatabaseId, apiKey } = firebaseConfig;
const database = `projects/${projectId}/databases/${firestoreDatabaseId}`;
const restBase = `https://firestore.googleapis.com/v1/${database}/documents`;

function errorMessage(code: string, status: number): string {
  if (code === 'PERMISSION_DENIED' || status === 403) {
    return 'Firebase rejected this request (403). Check the active Firestore Security Rules and Firebase API key restrictions.';
  }
  if (code === 'RESOURCE_EXHAUSTED' || status === 429) {
    return 'Firebase shared quota was reached. Check Firestore Usage in Firebase Console.';
  }
  if (code === 'UNAUTHENTICATED' || status === 401) {
    return 'Firebase authentication or API key configuration is invalid.';
  }
  if (code === 'ALREADY_EXISTS' || status === 409) {
    return 'This email is already subscribed.';
  }
  if (code === 'NOT_FOUND' || status === 404) {
    return 'Firestore project or named database was not found. Check firebase-applet-config.json.';
  }
  return `Firebase rejected the operation (HTTP ${status}, ${code || 'UNKNOWN'}).`;
}

/**
 * Firestore REST transport. Unlike WebChannel, a request fails visibly
 * rather than waiting indefinitely on Firestore's offline write queue.
 * Public API key is only a project identifier; Security Rules enforce access.
 */
export async function postFirestore(
  suffix: string,
  payload: unknown,
  timeoutMs = 12000
): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(
      `${restBase}${suffix}${suffix.includes('?') ? '&' : '?'}key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      let code = '';
      try {
        const errorBody = await response.json();
        code = String(errorBody?.error?.status || '');
      } catch {
        // HTTP status remains useful if the response body cannot be parsed.
      }
      throw new FirestoreRestError(errorMessage(code, response.status), response.status, code);
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof FirestoreRestError) throw error;
    if (controller.signal.aborted) {
      throw new FirestoreRestError(
        'Firebase did not respond within 12 seconds. This may be a network or API access issue. No save was confirmed.',
        0,
        'TIMEOUT',
      );
    }
    throw new FirestoreRestError(
      'Cannot contact firestore.googleapis.com from this browser. Check network or extensions blocking Google APIs.',
      0,
      'NETWORK_ERROR',
    );
  } finally {
    clearTimeout(timer);
  }
}

export function firestoreStringFields(record: Record<string, string>): Record<string, FirestoreValue> {
  return Object.fromEntries(
    Object.entries(record).map(([name, value]) => [name, { stringValue: value }]),
  ) as Record<string, FirestoreValue>;
}

export function firestoreDocumentPath(collection: string, id: string): string {
  return `${database}/documents/${collection}/${id}`;
}
