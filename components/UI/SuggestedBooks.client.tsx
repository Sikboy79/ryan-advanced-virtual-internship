"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { FadeInItem } from "./Animations";
import BookTimer from "./BookTimer";

export default function SuggestedBooksClient({ books }: { books: any[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setVisible(5);
      else if (window.innerWidth >= 1024) setVisible(4);
      else if (window.innerWidth >= 768) setVisible(3);
      else if (window.innerWidth >= 640) setVisible(2);
      else setVisible(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, books.length - visible);
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 0, 0));

  return (
    <section className="mb-10 max-w-[95%] mx-auto">
      <h2 className="text-2xl font-bold mb-1">Suggested Books</h2>
      <p className="text-gray-500 mb-6">Browse these books</p>
      <div className="relative overflow-hidden">
        {index > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-400 shadow rounded-full p-2"
          >
            <FiChevronLeft size={20} />
          </button>
        )}
        {index < maxIndex && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-400 shadow rounded-full p-2"
          >
            <FiChevronRight size={20} />
          </button>
        )}
        <FadeInItem>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${index * (100 / visible)}%)`,
            }}
          >
            {books.map((book) => (
              <div
                key={book.id}
                className="flex-shrink-0 px-3 relative"
                style={{ width: `${100 / visible}%` }}
              >
                {book.subscriptionRequired && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold bg-blue-800 text-white rounded-full whitespace-nowrap z-10">
                    Premium
                  </span>
                )}
                <Link href={`/books/${book.id}`} className="block relative">
                  <div className="relative w-full pb-[140%] rounded-md overflow-hidden shadow">
                    <Image
                      src={book.imageLink}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500">{book.author}</p>
                  <p className="text-xs text-gray-800 mt-2">{book.subTitle}</p>
                  <div className="flex items-center text-gray-400 mt-2 gap-3">
                    <BookTimer audioLink={book.audioLink} />
                    <FiStar />
                    <p className="flex gap-2 text-gray-400 mr-4">
                      {book.averageRating}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </FadeInItem>
      </div>
    </section>
  );
}
