"use client";

import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";
import { useLibraryStore } from "@/store/useMyLibraryStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiClock, FiStar } from "react-icons/fi";

export default function LibraryPage() {
  const { savedBooks, finishedBooks } = useLibraryStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
        <p className="text-gray-500 text-sm mt-1 ml-52 border-none">
          {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
        </p>
        {savedBooks.length === 0 ? (
          <>
            <div className="ml-52 mt-20 flex justify-center border-none">
              <div className="bg-[#f3f8f6] rounded-2xl px-10 py-8 max-w-md text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Save your favorite books!
                </h3>
                <p className="text-gray-600 text-sm">
                  When you save a book, it will appear here.
                </p>
              </div>
            </div>
          </>
        ) : (
        //   <div className="ml-52 text-lg font-semibold text-gray-800 mt-6 flex">
        //       Finished Books
        //     </div>
        //   <p className="text-gray-500 text-sm mt-1 ml-52 border-none">
        //   {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
        // </p>
        //   {finishedBooks.length === 0 ? (
        //   <>
        //   <div className="ml-52 text-lg font-semibold text-gray-800 mb-4 flex border-none">
        //       Finished
        //     </div>
        //     <div className="ml-52 mt-20 flex justify-center border-none">
        //       <div className="bg-[#f3f8f6] rounded-2xl px-10 py-8 max-w-md text-center">
        //         <h3 className="text-lg font-semibold text-gray-900 mb-2">
        //           Done and dusted
        //         </h3>
        //         <p className="text-gray-600 text-sm">
        //           When you finish a book, it will appear here.
        //         </p>
        //       </div>
        //     </div>
        //     </>
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ml-52 mt-6 border-none">
              {savedBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <Image
                      src={book.imageLink}
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
              ))}
            </div>
            {/* <div className="ml-52 text-lg font-semibold text-gray-800 mt-6 flex border-none">
              Finished Books
            </div>
            <p className="text-gray-500 text-sm mt-1 ml-52 border-none">
                {finishedBooks.length} {finishedBooks.length === 1 ? "item" : "items"}
              </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ml-52 border-none">
              {finishedBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <Image
                      src={book.imageLink}
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
              ))}
            </div> */}
          </>
        )}
      </div>
    </>
  );
}
