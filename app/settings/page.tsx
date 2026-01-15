"use client";

import { useEffect, useState, useRef } from "react";
import { auth } from "@/app/library/firebase";
import { useSubscription } from "@/store/useSubscriptions";
import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";

export default function Settings() {
  const [email, setEmail] = useState<string | null>(null);
  const { subscription, loading } = useSubscription();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const getPlanName = () => {
    if (!subscription) return "No active subscription";
    const priceId = subscription?.price?.id;
    if (priceId === PREMIUM_PLUS_PRICE_ID) return "Premium Plus";
    if (priceId === PREMIUM_PRICE_ID) return "Premium";
    return "Active subscription";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <div className="hidden md:block md:w-52 fixed top-0 left-0 h-full">
        <Sidebar setIsLoginOpen={setIsLoginOpen} />
      </div>
      <button
        ref={hamburgerRef}
        className="md:hidden fixed top-4 right-4 z-50  bg-gray-300  text-black p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            ref={sidebarRef}
            className={`relative w-64 bg-white h-full shadow-lg p-4 transform transition-transform duration-300 translate-x-0`}
          >
            <button
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
            <Sidebar setIsLoginOpen={setIsLoginOpen} />
          </div>
        </div>
      )}
      <div className="flex-1 md:ml-52 px-4 md:px-8 py-6">
        <div className="hidden md:flex justify-end mb-4">
          <SearchInput />
        </div>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
            Account Settings
          </h1>
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
      </div>
    </div>
  );
}
