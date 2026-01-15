"use client";

import { useState } from "react";
import { FiClock, FiStar, FiX } from "react-icons/fi";
import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";
import { useLibraryStore } from "@/store/useMyLibraryStore";
import Image from "next/image";
import Link from "next/link";

export default function LibraryPage() {
  const savedBooks = useLibraryStore((state) => state.savedBooks);
  const finishedBooks = useLibraryStore((state) => state.finishedBooks);
  const removeFinishedBook = useLibraryStore(
    (state) => state.removeFinishedBook
  );
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center md:hidden p-4 border-b bg-white">
        <SearchInput />
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ☰
        </button>
      </div>
      <div className="hidden md:flex justify-end p-4 border-b">
        <SearchInput />
      </div>
      <div className="hidden md:flex fixed left-0 top-0 h-full">
        <Sidebar setIsLoginOpen={setIsLoginOpen} />
      </div>
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            className={`relative w-64 bg-white h-full shadow-lg p-4 transform transition-transform duration-300 ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
            >
              <FiX size={24} />
            </button>
            <Sidebar setIsLoginOpen={setIsLoginOpen} />
          </div>
        </div>
      )}
      <div className="md:ml-52 my-4 px-4">
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
                    priority
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
