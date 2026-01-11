"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../app/library/firebase";
import { useAuthStore } from "@/store/useAuthStore";

export function useSubscription() {
  const { user } = useAuthStore();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const ref = collection(db, "customers", user.uid, "subscriptions");

    const unsub = onSnapshot(ref, (snapshot) => {
      let activeSub = null;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === "active" || data.status === "trialing") {
          activeSub = data;
        }
      });

      setSubscription(activeSub);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  return { subscription, loading };
}
