"use client";

import { useRouter } from "next/navigation"
import { auth, app, loginAsGuest } from "../library/firebase"
import { getCheckoutUrl } from "./stripePayment";

type SubscribeModalProps = {
  onClose: () => void;
};

export default function SubscribeModal({ onClose }: SubscribeModalProps) {
  const router = useRouter();

  const upgradeToPremium = async () => {
  try {
    const priceId = "price_1Smk3lRihjZKySBaPnYoPqbe";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
  } catch (err) {
    console.error("Checkout failed:", err);
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
          onClick={upgradeToPremium}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Upgrade now
        </button>

        {/* <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 text-sm"
          
        >
          Cancel
        </button> */}
      </div>
    </div>
  );
}



