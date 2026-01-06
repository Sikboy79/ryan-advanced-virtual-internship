"use client";

import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";
import { useLibraryStore } from "@/store/useMyLibraryStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiClock, FiStar } from "react-icons/fi";

export default function LibraryPage() {
  const { savedBooks } = useLibraryStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  if (savedBooks.length === 0) {
    return <p className="text-gray-500">You haven’t added any books yet.</p>;
  }

  return (
    <>
      <div className="search__input--wrapper flex justify-end m-1 ">
        <SearchInput />
      </div>
      <div className="divide-y divide-gray-200 my-4">
        <Sidebar setIsLoginOpen={setIsLoginOpen} />
        <div className="ml-52 text-lg font-semibold text-gray-800 mb-4 flex">
          Saved Books
        </div>
        <span className="text-sm text-gray-500 ml-52 border-none">
          {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
        </span>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ml-52 border-none mt-6">
          {savedBooks.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="group">
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <Image
                  src={book.imageLink}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="object-cover"
                />
                <div className="p-3 ">
                  <h3 className="text-sm font-semibold mb-1 text-gray-700">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500">{book.author}</p>
                  <p className="font-thin text-gray-700">{book.subTitle}</p>
                  <div className="flex gap-3 mt-1">
                    <p className="text-gray-400 gap-2 text-xs flex">
                      <FiClock /> 4:52
                    </p>
                    <p className="flex gap-2 text-gray-400 text-xs">
                      <FiStar />
                      {book.averageRating}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="ml-52 text-lg font-semibold text-gray-800 mt-6 flex">
          Finished Books
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ml-52 border-none ">Done and dusted!</div>
      </div>
    </>
  );
}
