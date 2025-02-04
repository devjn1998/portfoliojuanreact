import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  throw new Error('Missing Firebase API Key');
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const firebaseService = {
  login: async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  logout: async () => {
    return signOut(auth);
  },
  register: async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
}; 