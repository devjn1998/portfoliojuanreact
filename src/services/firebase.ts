import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLfmi48VEV1OEQCthPBSSEswpEowdfSM8",
  authDomain: "portfoliojuan-9e27b.firebaseapp.com",
  projectId: "portfoliojuan-9e27b",
  storageBucket: "portfoliojuan-9e27b.firebasestorage.app",
  messagingSenderId: "24873500726",
  appId: "1:24873500726:web:88053531d7ba6960bd1897",
  measurementId: "G-MQPFBJ0HYW"
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