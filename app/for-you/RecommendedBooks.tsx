// app/for-you/RecommendedBooks.tsx
import Image from "next/image";
import Link from "next/link";

// Server-side function to fetch recommended books
async function getRecommendedBooks() {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    { cache: "no-store" } // ensures SSR always fetches fresh data
  );
  if (!res.ok) {
    throw new Error("Failed to fetch recommended books");
  }
  return res.json();
}

export default async function RecommendedBooks() {
  const books = await getRecommendedBooks();

  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
      <p className="text-gray-500 mb-6">We think you’ll like these</p>

      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {books.map((book: any) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="flex-shrink-0 w-48 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <div className="relative w-full h-64">
              <Image
                src={book.image} // make sure API provides `image` URL
                alt={book.title}
                fill
                className="rounded-t-lg object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-1">{book.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{book.author}</p>
              {book.description && (
                <p className="text-xs text-gray-400 line-clamp-3">
                  {book.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                {book.duration && <span>{book.duration}</span>}
                {book.rating && <span>⭐ {book.rating}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
