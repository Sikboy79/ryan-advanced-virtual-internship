import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { auth } from "./firebase";
import {
  getAuth,
  signInAnonymously,
  sendPasswordResetEmail,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const loginWithGuest = async () => {
  const auth = getAuth();
  return await signInAnonymously(auth);
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const loginWithEmail = async (email: string, password: string) => {
  if (auth.currentUser?.isAnonymous) {
    const credential = EmailAuthProvider.credential(email, password);
    return await linkWithCredential(auth.currentUser, credential);
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email: string, password: string) => {
  if (auth.currentUser?.isAnonymous) {
    const credential = EmailAuthProvider.credential(email, password);
    return await linkWithCredential(auth.currentUser, credential);
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
  if (auth.currentUser?.isAnonymous) {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  }

  return await signInWithPopup(auth, googleProvider);
};

export const logout = () => signOut(auth);

export const onAuthChanged = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error: any) {
    console.error("Password reset error:", error.message);
    throw error;
  }
};
