"use client";

import { httpsCallable } from "firebase/functions";
import { auth, functions, loginAsGuest } from "../app/library/firebase";
import { useState, useEffect } from "react";

export default function SubscribeModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ensureLogin = async () => {
      if (!auth.currentUser) {
        try {
          await loginAsGuest();
        } catch (error) {
          console.error("Failed to sign in anonymously:", error);
        }
      }
    };

    ensureLogin();
  }, []);

  const subscribe = async () => {
    if (loading) return; 
    setLoading(true);

    try {
      if (!auth.currentUser) {
        console.error("User not signed in.");
        setLoading(false);
        return;
      }

      const createCheckoutSession = httpsCallable(
        functions,
        "ext-firestore-stripe-payments-createCheckoutSession"
      );

      const result: any = await createCheckoutSession({
        price: "price_1Smk3lRihjZKySBaPnYoPqbe",
        success_url: window.location.origin + "/library",
        cancel_url: window.location.origin,
      });

      window.location.href = result.data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-2">Upgrade to Pro</h2>
        <p className="text-gray-600 mb-4">
          Unlock audio, summaries, and full access.
        </p>

        <button
          onClick={subscribe}
          className="w-full bg-black text-white py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "Subscribe"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 text-sm"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}



