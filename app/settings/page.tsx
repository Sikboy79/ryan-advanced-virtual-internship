"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/library/firebase";
import { useSubscription } from "@/store/useSubscriptions";
import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";

export default function Settings() {
  const [email, setEmail] = useState<string | null>(null);
  const { subscription, loading } = useSubscription();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const PREMIUM_PLUS_PRICE_ID = "price_1Smk4jRihjZKySBasJB6U9cS";
  const PREMIUM_PRICE_ID = "price_1Smk3lRihjZKySBaPnYoPqbe";

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) setEmail(user.email);
      });
      return () => unsubscribe();
    }
  }, []);

  const getPlanName = () => {
    if (!subscription) return "No active subscription";

    const priceId = subscription?.price?.id;

    if (priceId === PREMIUM_PLUS_PRICE_ID) return "Premium Plus";
    if (priceId === PREMIUM_PRICE_ID) return "Premium";
    return "Active subscription";
  };

  return (
    <>
      <div className="search__input--wrapper flex justify-end m-1">
        <SearchInput />
      </div>
      <Sidebar setIsLoginOpen={setIsLoginOpen} />
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Email</h2>
          <p className="text-gray-800">{email || "Not logged in"}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Subscription Plan
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading subscription...</p>
          ) : (
            <p className="text-gray-800">{getPlanName()}</p>
          )}
        </div>
      </div>
    </>
  );
}
