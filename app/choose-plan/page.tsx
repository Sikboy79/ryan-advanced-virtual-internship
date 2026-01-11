"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, app, loginAsGuest } from "../library/firebase";
import { getCheckoutUrl } from "../account/stripePayment";
import { PlanCard } from "../../components/PlanCard";
import Image from "next/image";
import Footer from "@/components/footer";
import { AiFillFileText } from "react-icons/ai";
import { GrGrow } from "react-icons/gr";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";

export default function ChoosePlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(1);

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
  const faqs = [
    {
      q: "How does the free 7-day trial work?",
      a: `Begin your complimentary 7-day trial with a Summarist annual
      membership. You are under no obligation to continue your subscription,
      and you will only be billed when the trial period expires. With Premium
      access, you can learn at your own pace and as frequently as you desire,
      and you may terminate your subscription prior to the conclusion of the
      7-day free trial.`,
    },
    {
      q: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      a: `While an annual plan is active, it is not feasible to switch to a
      monthly plan. However, once the current month ends, transitioning from
      a monthly plan to an annual plan is an option.`,
    },
    {
      q: "What's included in the Premium plan?",
      a: `Premium membership provides you with the ultimate Summarist
      experience, including unrestricted entry to many best-selling books,
      high-quality audio, the ability to download titles for offline reading,
      and the option to send your reads to your Kindle.`,
    },
    {
      q: "Can I cancel during my trial or subscription?",
      a: `You will not be charged if you cancel your trial before its
      conclusion. While you will not have complete access to the entire
      Summarist library, you can still expand your knowledge with one curated
      book per day.`,
    },
  ];
  const buttonText = selectedPlan === "monthly" ? "Start your first month" : prices[selectedPlan].cta;
  const buttonSubtext =
    selectedPlan === "monthly"
      ? "30-day money back guarantee, no questions asked."
      : "Cancel your trial at any time before it ends, and you won’t be charged.";

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
          <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-t-full rounded-b-none overflow-hidden bg-white">
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
      <div className="plan-features flex w-full justify-center gap-24 py-12 text-center">
        <div className="flex flex-col items-center max-w-xs">
          <figure className="mb-4 text-[#062f43] text-4xl">
            <AiFillFileText />
          </figure>
          <p className="text-base text-gray-800">
            <span className="font-bold">Key ideas in a few min</span> with many books to read
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xs">
          <figure className="mb-4 text-[#062f43] text-4xl">
            <GrGrow />
          </figure>
          <p className="text-base text-gray-800">
            <span className="font-bold">3 million</span> people growing with Summarist everyday
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xs">
          <figure className="mb-4 text-[#062f43] text-4xl">
            <FaHandshakeSimple />
          </figure>
          <p className="text-base text-gray-800">
            <span className="font-bold">Precise recommendations</span> collections curated by experts
          </p>
        </div>
      </div>
      <div className="min-h-screen bg-white px-4 py-16">
        <div className="relative w-full max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Choose the plan that fits you</h1>
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
          <div className="sticky bottom-0 bg-white/95 backdrop-blur pt-4 border-t">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg text-lg shadow-lg"
            >
              {buttonText}
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">{buttonSubtext}</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto divide-y border-t border-b mb-10 mt-10">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-6">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between text-left"
              >
                <h3 className="text-xl font-semibold text-[#062f43]">{item.q}</h3>
                <FiChevronDown
                  className={`text-2xl transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

