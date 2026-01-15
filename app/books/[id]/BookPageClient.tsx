"use client";

import { useState, useEffect } from "react";
import { FiStar, FiMic, FiBookOpen, FiBookmark } from "react-icons/fi";
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
import BookTimer from "@/components/UI/BookTimer";

export default function BookPageClient({ book }: { book: any }) {
  const [mounted, setMounted] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isReadOpen, setIsReadOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { toggleBook, isSaved } = useLibraryStore();
  const saved = isSaved(book.id);
  const { subscription } = useSubscription();
  const hasAccess = !!subscription;
  const router = useRouter();
  const isPremium = book.subscriptionRequired;

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
      <div className="flex justify-between items-center md:hidden p-4 border-b">
        <SearchInput />
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 ml-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="hidden md:flex justify-end p-4 border-b">
        <SearchInput />
      </div>
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileSidebarOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full bg-white shadow-lg w-64 p-4 transform transition-transform duration-300 ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
          <Sidebar setIsLoginOpen={setIsLoginOpen} />
        </div>
      </div>
      <aside className="hidden md:block border-r bg-[#f7fbf9] h-screen fixed w-48">
        <Sidebar setIsLoginOpen={setIsLoginOpen} />
      </aside>
      <main className="ml-0 md:ml-48 p-4 md:p-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-16">
          <div className="flex-1">
            {isPremium && (
              <span className="w-16 rounded-full bg-blue-800 px-2 py-0.5 text-xs font-thin text-white mb-2 inline-block">
                Premium
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-gray-800">
              {book.title}
            </h1>
            <p className="font-semibold text-gray-700 mb-2">{book.author}</p>
            <p className="text-gray-800 mb-4 font-thin">{book.subTitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <FiStar className="text-gray-600 text-2xl" />
                <span className="font-semibold text-gray-700">
                  {book.averageRating} ({book.totalRating} ratings)
                </span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <BookTimer audioLink={book.audioLink} />
              </div>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <FiMic className="text-gray-600 text-2xl" /> Audio & Text
              </div>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <LiaLightbulb className="text-gray-600 text-2xl" /> {book.keyIdeas} Key ideas
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              {!isPremium ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsReadOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                  >
                    <FiBookOpen />
                    Read
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push(`/books/${book.id}/listen`)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                  >
                    <FiMic />
                    Listen
                  </button>
                </>
              ) : (
                <div className="flex gap-4 flex-wrap">
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
              )}
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <Image
              src={book.imageLink}
              alt={book.title}
              width={300}
              height={300}
              priority
              className="rounded-md"
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
          className="border flex items-center gap-2 text-blue-600 font-bold mt-6 px-4 py-2 rounded-md"
        >
          {saved ? <BsBookmarkFill className="text-blue-600" /> : <FiBookmark />}
          {saved ? "Saved to My Library" : "Add title to My Library"}
        </button>
        <div className="font-bold text-lg text-gray-700 mb-2 mt-6 cursor-pointer">
          What's it about?
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {book.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 min-w-[120px] md:w-60 h-14 text-lg font-semibold px-3 py-1 rounded-md flex justify-center items-center"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full md:w-8/12 text-gray-700">{book.bookDescription}</div>
        <div className="mt-6">
          <div className="font-bold text-lg text-gray-700 mb-4">About the Author</div>
          <div className="w-full md:w-8/12 text-gray-700">{book.authorDescription}</div>
        </div>
        {isSubscribeOpen && (
          <SubscribeModal onClose={() => setIsSubscribeOpen(false)} />
        )}
        <SummaryModal
          isOpen={isReadOpen}
          onClose={() => setIsReadOpen(false)}
          summary={book.summary}
          title={book.title}
          isPremium={book.subscriptionRequired}
        />
      </main>
    </>
  );
}