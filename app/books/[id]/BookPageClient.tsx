"use client";

import { useState, useEffect } from "react";
import { FiStar, FiClock, FiMic, FiBookOpen, FiBookmark } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { LiaLightbulb } from "react-icons/lia";
import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";
import SummaryModal from "@/app/account/SummaryModal";
import SubscribeModal from "@/app/account/SubscribeModal";
import AccessButton from "@/components/UI/AccessButton";
import { useLibraryStore } from "@/store/useMyLibraryStore";
import { useSubscription } from "@/store/useSubscriptions";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookPageClient({ book }: { book: any }) {
  const [mounted, setMounted] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isReadOpen, setIsReadOpen] = useState(false);
  const { toggleBook, isSaved } = useLibraryStore();
  const saved = isSaved(book.id);
  const { subscription } = useSubscription();
  const hasAccess = !!subscription;
  const router = useRouter();

  const prices = {
    yearly: "price_1Smk4jRihjZKySBasJB6U9cS",
    monthly: "price_1Smk3lRihjZKySBaPnYoPqbe",
  };
  const selectedPlan: "yearly" | "monthly" = "monthly";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-screen bg-white" />;

  return (
    <>
      <div className="search__input--wrapper flex justify-end m-1">
        <SearchInput />
      </div>
      <Sidebar setIsLoginOpen={setIsLoginOpen} />
      <div className="flex divide-y divide-gray-200 my-4">
        <aside className="border-r bg-[#f7fbf9] h-screen fixed" />
        <main className="ml-48 p-10 w-full max-w-6xl">
          <div className="flex gap-16">
            <div className="flex-0">
              <h1 className="text-4xl font-bold mb-1 text-gray-800">
                {book.title}
              </h1>
              <p className="font-semibold text-gray-700 mb-4">{book.author}</p>
              <p className="text-gray-800 mb-6 font-thin">{book.subTitle}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 text-gray-700 font-semibold mt-2">
                    <FiStar className="text-gray-600 text-2xl" />
                    {book.averageRating} ({book.totalRating} ratings)
                  </p>
                </div>
                <div className="flex gap-2 text-gray-700 font-semibold mt-2 w-40 ml-3">
                  <FiClock className="text-gray-600 text-2xl" /> 03:24
                </div>
                <div className="flex gap-2 text-gray-700 font-semibold mt-2">
                  <FiMic className="text-gray-600 text-2xl" /> Audio & Text
                </div>
                <div className="flex gap-2 text-gray-700 font-semibold mt-2 ml-8">
                  <LiaLightbulb className="text-gray-600 text-2xl" />{" "}
                  {book.keyIdeas} Key ideas
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                <AccessButton
                  label="Read"
                  icon={<FiBookOpen />}
                  hasAccess={hasAccess}
                  priceId={prices[selectedPlan]}
                  onAccess={() => setIsReadOpen(true)}
                  onNoAccess={() => setIsSubscribeOpen(true)}
                />
                <AccessButton
                  label="Listen"
                  icon={<FiMic />}
                  hasAccess={hasAccess}
                  priceId={prices[selectedPlan]}
                  onAccess={() => router.push(`/books/${book.id}/listen`)}
                  onNoAccess={() => setIsSubscribeOpen(true)}
                />
              </div>
            </div>
            <div className="flex-shrink-0 ml-72">
              <Image
                src={book.imageLink}
                alt={book.title}
                width={300}
                height={300}
              />
            </div>
          </div>
          <button
            onClick={() =>
              toggleBook({
                id: book.id,
                title: book.title,
                author: book.author,
                imageLink: book.imageLink,
                summary: book.summary,
                subTitle: book.subTitle,
                averageRating: book.averageRating,
                totalRating: book.totalRating,
              })
            }
            className="border flex items-center gap-2 text-blue-600 font-bold mt-4"
          >
            {saved ? (
              <BsBookmarkFill className="text-blue-600" />
            ) : (
              <FiBookmark />
            )}
            {saved ? "Saved to My Library" : "Add title to My Library"}
          </button>
          <div className="font-bold text-lg text-gray-700 mb-4 mt-6 cursor-pointer">
            What's it about?
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {book.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 w-60 h-14 text-lg font-semibold px-3 py-1 rounded-md flex justify-around items-center"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="w-8/12 text-gray-700">{book.bookDescription}</div>
          <div className="mt-6">
            <div className="font-bold text-lg text-gray-700 mb-4">
              About the Author
            </div>
            <div className="w-8/12 text-gray-700">{book.authorDescription}</div>
          </div>
          {isSubscribeOpen && (
            <SubscribeModal onClose={() => setIsSubscribeOpen(false)} />
          )}
          <SummaryModal
            isOpen={isReadOpen}
            onClose={() => setIsReadOpen(false)}
            summary={book.summary}
            title={book.title}
          />
        </main>
      </div>
    </>
  );
}
