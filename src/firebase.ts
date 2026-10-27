import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  User,
} from 'firebase/auth';
import {
  initializeFirestore,
  doc,
  getDocFromServer,
  collection,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { PRIMARY_ADMIN_EMAIL, isPrimaryAdministrator } from './utils/adminSecurity';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Connect to the AI Studio named Firestore database.
// Force long-polling because WebChannel streaming can hang on buffered or
// blocked intermediary networks. This avoids infinite pending writes in some
// browser/network configurations; it does not bypass security rules.
export const db = initializeFirestore(
  app,
  { experimentalForceLongPolling: true },
  (firebaseConfig as { firestoreDatabaseId: string }).firestoreDatabaseId,
);

// Initialize Auth
export const auth = getAuth(app);

// Connection health test as instructed in Firebase guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline or awaiting configuration:', error.message);
    }
    return false;
  }
}

// Error handling helper required by Firebase Integration guidelines
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error context:', JSON.stringify(errInfo));
  return errInfo;
}

// Authentication Wrappers
export async function loginWithEmail(email: string, pass: string) {
  if (!isPrimaryAdministrator(email)) {
    throw new Error('Administrator access is limited to the designated account.');
  }
  return await signInWithEmailAndPassword(auth, PRIMARY_ADMIN_EMAIL, pass);
}

export async function triggerEmailVerification(user: User) {
  await sendEmailVerification(user);
}

export async function sendResetPassword(email: string) {
  if (!isPrimaryAdministrator(email)) {
    throw new Error('Password recovery is limited to the designated administrator.');
  }
  await sendPasswordResetEmail(auth, PRIMARY_ADMIN_EMAIL);
}

export async function logOut() {
  await signOut(auth);
}
