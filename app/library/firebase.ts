import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyC0XpmsGmGnMFW96CgA0rp3KgC_ChG25EA",
  authDomain: "advanced-virtual-interns-2b133.firebaseapp.com",
  projectId: "advanced-virtual-interns-2b133",
  storageBucket: "advanced-virtual-interns-2b133.firebasestorage.app",
  messagingSenderId: "302870407788",
  appId: "1:302870407788:web:2eb46b2b7257cbeaaac649",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, "us-central1");

export const loginAsGuest = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  return auth.currentUser;
};
