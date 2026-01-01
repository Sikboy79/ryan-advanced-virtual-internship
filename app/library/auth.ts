import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { getAuth, signInAnonymously, sendPasswordResetEmail} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();


export const loginWithGuest = async () => {
  const auth = getAuth();
  return await signInAnonymously(auth);
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);

export const onAuthChanged = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

export const sendPasswordReset = async (email: string) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
    return true;
  } catch (error: any) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
};