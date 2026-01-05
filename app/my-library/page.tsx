"use client";

import { useLibraryStore } from "@/store/useMyLibraryStore";
import Image from "next/image";
import Link from "next/link";

export default function LibraryPage() {
  const { savedBooks } = useLibraryStore();

  if (savedBooks.length === 0) {
    return (
      <p className="text-gray-500">
        You haven’t added any books yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {savedBooks.map(book => (
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
              <h3 className="text-sm font-semibold">
                {book.title}
              </h3>
              <p className="text-xs text-gray-500">
                {book.author}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}