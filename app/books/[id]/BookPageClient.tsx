"use client";

import { useState } from "react";
import { FiStar, FiClock, FiMic } from "react-icons/fi";
import DashboardLayout from "@/app/for-you/ForYouLayout";

export default function BookPageClient({ book }: { book: any }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <DashboardLayout isLoginOpen={isLoginOpen}
  setIsLoginOpen={setIsLoginOpen} />

      <div className="flex">
        <aside className=" border-r bg-[#f7fbf9] h-screen fixed left-0 top-0" />
        <main className="ml-56 p-10 w-full max-w-6xl">
          <div className="flex gap-16">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{book.title}</h1>
              <p className="font-semibold text-gray-700 mb-4">
                {book.author}
              </p>

              <p className="text-gray-600 mb-6">{book.subTitle}</p>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
                <span className="flex items-center gap-1">
                  <FiStar /> {book.rating} ({book.totalRatings} ratings)
                </span>
                <span className="flex items-center gap-1">
                  <FiClock /> {book.audioLength}
                </span>
                <span className="flex items-center gap-1">
                  <FiMic /> Audio & Text
                </span>
              </div>

              <div className="flex gap-4 mb-6">
                <button className="bg-[#0f2a44] text-white px-6 py-3 rounded-lg font-semibold">
                  Read
                </button>
                <button className="bg-[#0f2a44] text-white px-6 py-3 rounded-lg font-semibold">
                  Listen
                </button>
              </div>
            </div>

            <div className="w-72 flex-shrink-0">
              <img
                src={book.image}
                alt={book.title}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}