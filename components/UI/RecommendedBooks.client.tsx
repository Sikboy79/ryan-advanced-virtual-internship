"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { FadeInItem } from "./Animations";

export default function RecommendedBooksClient({ books }: { books: any[] }) {
  const VISIBLE = 5;
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, books.length - VISIBLE);

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <section className="mb-10 ">
      <h2 className="text-2xl font-bold mb-1">Recommended For You</h2>
      <p className="text-gray-500 mb-6">We think you’ll like these</p>

      <div className="relative overflow-hidden">
        {/* LEFT BUTTON */}
        {index > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-slate-400 shadow rounded-full p-2"
          >
            <FiChevronLeft size={20} />
          </button>
        )}

        {/* RIGHT BUTTON */}
        {index < maxIndex && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-slate-400 shadow rounded-full p-2"
          >
            <FiChevronRight size={20} />
          </button>
        )}

        {/* TRACK */}
        <FadeInItem>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${index * (100 / VISIBLE)}%)`,
            }}
          >
            {books.map((book) => (
              <div key={book.id} className="w-1/5 px-3 shrink-0">
                <Link href={`/books/${book.id}`}>
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={200}
                    height={280}
                    className="rounded-md shadow"
                  />
                  <h3 className="mt-3 text-sm font-semibold line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500">{book.author}</p>
                  <p className="text-xs text-gray-800 mt-2">{book.subTitle}</p>
                  <div className="">
                    <p className="flex gap-2 text-gray-400 mt-2">
                      <FiStar />
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
