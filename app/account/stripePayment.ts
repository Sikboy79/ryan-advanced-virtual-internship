"use client";

import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";

export const getCheckoutUrl = async (
  app: FirebaseApp,
  priceId: string
): Promise<string> => {
  const auth = getAuth(app);

  if (!auth.currentUser) {
    await new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          unsubscribe();
          resolve();
        }
      });
    });
  }

  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("user is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionsRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionsRef, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
    locale: "en",
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        const data = snap.data() as {
          url?: string;
          error?: { message: string };
        };
        if (data.error) {
          unsubscribe();
          reject(new Error(`Stripe error: ${data.error.message}`));
        }
        if (data?.url) {
          unsubscribe();
          resolve(data.url);
        }
      },
      (err) => reject(err)
    );
  });
};
