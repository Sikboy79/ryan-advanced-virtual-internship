import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/app/library/firebase";

export async function getProPrices() {
  const db = getFirestore(app);
  const pricesRef = collection(db, "products", "pro", "prices");

  const snap = await getDocs(pricesRef);

  const prices: Record<string, string> = {};

  snap.forEach((doc) => {
    prices[doc.id] = doc.data().priceId;
  });

  return prices; 
  const MonthlyPriceId = "price_1Smk3lRihjZKySBaPnYoPqbe";
    const YearlyPriceId = "price_1Smk4jRihjZKySBasJB6U9cS";
}
