"use client";

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

export const openBillingPortal = async () => {
  const functions = getFunctions(app);

  const createPortalLink = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  const result: any = await createPortalLink({
    returnUrl: window.location.origin,
  });

  window.location.href = result.data.url;
};
