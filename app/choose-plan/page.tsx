"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, app, loginAsGuest } from "../library/firebase";
import { getCheckoutUrl } from "../account/stripePayment";
import { PlanCard } from "../../components/PlanCard";
import Image from "next/image";
import Footer from "@/components/footer";

export default function ChoosePlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">(
    "yearly"
  );
  const [loading, setLoading] = useState(false);

  const prices = {
    yearly: {
      id: "price_1Smk4jRihjZKySBasJB6U9cS",
      label: "Premium Plus Yearly",
      price: "$99.99/year",
      subtitle: "7-day free trial included",
      cta: "Start your free 7-day trial",
    },
    monthly: {
      id: "price_1Smk3lRihjZKySBaPnYoPqbe",
      label: "Premium Monthly",
      price: "$9.99/month",
      subtitle: "No trial included",
      cta: "Continue to checkout",
    },
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      if (!auth.currentUser) {
        await loginAsGuest();
      }

      const checkoutUrl = await getCheckoutUrl(app, prices[selectedPlan].id);

      router.push(checkoutUrl);
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-[#062f43] text-white rounded-b-[40%]">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight ">
            Get unlimited access to many
            <br />
            amazing books to read
          </h1>

          <p className="mt-6 text-lg text-white/80">
            Turn ordinary moments into amazing learning opportunities
          </p>
        </div>
        <div className="relative flex justify-center z-10">
          <div className=" w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-t-full rounded-b-none overflow-hidden bg-white">
            <figure>
              <Image
                src="/media/pricing-top.png"
                alt="Pricing illustration"
                width={860}
                height={722}
                className="object-cover w-full h-full"
                priority
              />
            </figure>
          </div>
        </div>
      </section>

      <div className="plan-features flex text-wrap w-1/3 p-10 text-center">
        <div className="ml-16">
          <figure className="">
            <svg></svg>
          </figure>
          <span className="font-bold">Key ideas in a few min</span> with many
          books to read
        </div>
        <div className="ml-12">
          <figure className="">
            <svg></svg>
          </figure>
          <span className="font-bold">3 million</span> people growing with
          Summarist everyday
        </div>
        <div className="ml-12">
          <figure className="">
            <svg></svg>
          </figure>
          <span className="font-bold">Precise recommendations</span> collections
          curated by experts
        </div>
      </div>

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-8">
          <h1 className="text-3xl font-bold text-center">
            Choose the plan that fits you
          </h1>

          {/* YEARLY */}
          <PlanCard
            selected={selectedPlan === "yearly"}
            onClick={() => setSelectedPlan("yearly")}
            title={prices.yearly.label}
            price={prices.yearly.price}
            subtitle={prices.yearly.subtitle}
            highlight
          />

          <div className="text-center text-gray-400">or</div>

          {/* MONTHLY */}
          <PlanCard
            selected={selectedPlan === "monthly"}
            onClick={() => setSelectedPlan("monthly")}
            title={prices.monthly.label}
            price={prices.monthly.price}
            subtitle={prices.monthly.subtitle}
          />
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg text-lg"
          >
            {prices[selectedPlan].cta}
          </button>

          <p className="text-center text-sm text-gray-500">
            Cancel your trial at any time before it ends, and you won’t be
            charged.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
