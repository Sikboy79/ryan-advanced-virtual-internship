"use client";

import { useState } from "react";
import Image from "next/image";
import { AiFillFileText } from "react-icons/ai";
import { GrGrow } from "react-icons/gr";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { PlanCard } from "../../components/PlanCard";
import Footer from "@/components/footer";
import { auth, app, loginAsGuest } from "../library/firebase";
import { getCheckoutUrl } from "../account/stripePayment";

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">(
    "yearly"
  );
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
      if (!auth.currentUser) await loginAsGuest();
      const checkoutUrl = await getCheckoutUrl(app, prices[selectedPlan].id);
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "How does the free 7-day trial work?",
      a: "Begin your complimentary 7-day trial with a Summarist annual membership...",
    },
    {
      q: "Can I switch subscriptions from monthly to yearly?",
      a: "While an annual plan is active, it is not feasible to switch to a monthly plan...",
    },
    {
      q: "What's included in the Premium plan?",
      a: "Premium membership provides you with the ultimate Summarist experience...",
    },
    {
      q: "Can I cancel during my trial or subscription?",
      a: "You will not be charged if you cancel your trial before its conclusion...",
    },
  ];

  const buttonText =
    selectedPlan === "monthly"
      ? "Start your first month"
      : prices[selectedPlan].cta;
  const buttonSubtext =
    selectedPlan === "monthly"
      ? "30-day money back guarantee, no questions asked."
      : "Cancel your trial at any time before it ends, and you won’t be charged.";
  // Skeleton Component
  const Skeleton = () => (
    <div className="animate-pulse">
      <section className="relative bg-[#062f43] text-white rounded-b-[40%] h-[500px] flex flex-col items-center justify-center">
        <div className="h-8 w-64 bg-gray-300 rounded mb-4" />
        <div className="h-4 w-80 bg-gray-300 rounded mb-8" />
        <div className="h-72 w-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] bg-gray-300 rounded-t-full rounded-b-none" />
      </section>
      <div className="plan-features flex flex-wrap justify-center gap-8 py-12 text-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center max-w-xs">
            <div className="h-12 w-12 bg-gray-300 rounded mb-4" />
            <div className="h-4 w-40 bg-gray-300 rounded mb-2" />
            <div className="h-3 w-32 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
      <div className="min-h-screen bg-white px-4 py-16">
        <div className="relative w-full max-w-2xl mx-auto space-y-8">
          <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-4" />
          <div className="h-48 w-full bg-gray-300 rounded-lg mb-4" />
          <div className="h-6 w-16 bg-gray-300 rounded mx-auto mb-4" />
          <div className="h-48 w-full bg-gray-300 rounded-lg mb-4" />
          <div className="h-12 w-full bg-gray-300 rounded-lg" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto divide-y border-t border-b mb-10 mt-10 px-4 sm:px-0 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="py-6">
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
            <div className="h-4 w-full bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );

  return loading ? (
    <Skeleton />
  ) : (
    <>
      <section className="relative bg-[#062f43] text-white rounded-b-[40%]">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Get unlimited access to many
            <br />
            amazing books to read
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80">
            Turn ordinary moments into amazing learning opportunities
          </p>
        </div>
        <div className="relative flex justify-center z-10 mt-12">
          <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-t-full rounded-b-none overflow-hidden bg-white">
            <Image
              src="/media/pricing-top.png"
              alt="Pricing illustration"
              width={860}
              height={722}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </section>
      <div className="plan-features flex flex-wrap justify-center gap-8 py-12 text-center">
        {[
          {
            icon: AiFillFileText,
            text: "Key ideas in a few min with many books to read",
            bold: "Key ideas in a few min",
          },
          {
            icon: GrGrow,
            text: "3 million people growing with Summarist everyday",
            bold: "3 million",
          },
          {
            icon: FaHandshakeSimple,
            text: "Precise recommendations collections curated by experts",
            bold: "Precise recommendations",
          },
        ].map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div key={i} className="flex flex-col items-center max-w-xs">
              <figure className="mb-4 text-[#062f43] text-4xl">
                <Icon />
              </figure>
              <p className="text-base text-gray-800">
                <span className="font-bold">{feat.bold}</span>{" "}
                {feat.text.replace(feat.bold, "")}
              </p>
            </div>
          );
        })}
      </div>
      <div className="min-h-screen bg-white px-4 py-16">
        <div className="relative w-full max-w-2xl mx-auto space-y-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Choose the plan that fits you
          </h1>
          <PlanCard
            selected={selectedPlan === "yearly"}
            onClick={() => setSelectedPlan("yearly")}
            title={prices.yearly.label}
            price={prices.yearly.price}
            subtitle={prices.yearly.subtitle}
            highlight
          />
          <div className="text-center text-gray-400">or</div>
          <PlanCard
            selected={selectedPlan === "monthly"}
            onClick={() => setSelectedPlan("monthly")}
            title={prices.monthly.label}
            price={prices.monthly.price}
            subtitle={prices.monthly.subtitle}
          />
          <div className="sticky bottom-0 bg-white/95 backdrop-blur pt-4 border-t mt-8">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg text-lg shadow-lg"
            >
              {buttonText}
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              {buttonSubtext}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto divide-y border-t border-b mb-10 mt-10 px-4 sm:px-0">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-6">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-[#062f43]">
                  {item.q}
                </h3>
                <FiChevronDown
                  className={`text-xl sm:text-2xl transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
