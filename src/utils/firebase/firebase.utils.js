import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const isEmailAlreadyExist = async (email) => {
  if (!email) return;
  return await fetchSignInMethodsForEmail(auth, email).then((response) => {
    return response.length === 0;
  });
};

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserDocument = async (userAuth, usernameInput) => {
  const userReference = doc(database, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userReference);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const username = usernameInput === undefined ? email.split('@')[0] : usernameInput;
    const createdAt = new Date();

    try {
      await setDoc(userReference, {
        email: email,
        username: username,
        createdAt: createdAt
      });
    } catch (error) {
      console.error(error);
    }
  }

  return userReference;
};

export const createUserAccount = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAccount = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
