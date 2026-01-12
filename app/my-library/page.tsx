"use client";

import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";
import { useLibraryStore } from "@/store/useMyLibraryStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiClock, FiStar } from "react-icons/fi";

export default function LibraryPage() {
  const savedBooks = useLibraryStore((state) => state.savedBooks);
  const finishedBooks = useLibraryStore((state) => state.finishedBooks);
  const removeFinishedBook = useLibraryStore(
    (state) => state.removeFinishedBook
  );
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className="search__input--wrapper flex justify-end m-1">
        <SearchInput />
      </div>
      <Sidebar setIsLoginOpen={setIsLoginOpen} />
      <div className="ml-52 my-4">
        {/* Saved Books */}
        <div className="text-lg font-semibold text-gray-800 mb-2">
          Saved Books
        </div>
        <p className="text-gray-500 text-sm mb-4">
          {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
        </p>
        {savedBooks.length === 0 ? (
          <div className="mt-20 flex justify-center">
            <div className="bg-[#f3f8f6] rounded-2xl px-10 py-8 max-w-md text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Save your favorite books!
              </h3>
              <p className="text-gray-600 text-sm">
                When you save a book, it will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
            {savedBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <Image
                    src={book.imageLink || "/fallback-image.png"}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold mb-1 text-gray-700">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500">{book.author}</p>
                    <p className="text-gray-700">{book.subTitle}</p>
                    <div className="flex gap-3 mt-2 text-gray-400">
                      <p className="flex gap-2 items-center">
                        <FiClock />
                        4:25
                      </p>
                      <p className="flex gap-2 items-center">
                        <FiStar />
                        {book.averageRating}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-lg font-semibold text-gray-800 mt-10 mb-2">
          Finished Books
        </div>
        <p className="text-gray-500 text-sm mb-4">
          {finishedBooks.length} {finishedBooks.length === 1 ? "item" : "items"}
        </p>
        {finishedBooks.length === 0 ? (
          <div className="mt-20 flex justify-center">
            <div className="bg-[#f3f8f6] rounded-2xl px-10 py-8 max-w-md text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Done and dusted
              </h3>
              <p className="text-gray-600 text-sm">
                When you finish a book, it will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
            {finishedBooks.map((book, index) => (
              <div
                key={book.id || `${book.title}-${index}`}
                className="relative group"
              >
                <Link href={`/books/${book.id}`} className="block">
                  <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <Image
                      src={book.imageLink || "/fallback-image.png"}
                      alt={book.title}
                      width={300}
                      height={400}
                      className="object-cover"
                    />
                    <div className="p-3">
                      <h3 className="text-sm font-semibold mb-1 text-gray-700">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-500">{book.author}</p>
                      <p className="font-thin text-gray-700">{book.subTitle}</p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => removeFinishedBook(book.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
