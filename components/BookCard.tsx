import Link from "next/link";

export default function BookCard({ book }: { book: any }) {
  return (
    <Link href={`/books/${book.id}`}>
      <div className="cursor-pointer hover:scale-[1.02] transition">
        <img
          src={book.image}
          alt={book.title}
          className="rounded-lg shadow-md mb-3"
        />

        <h3 className="font-semibold text-sm">{book.title}</h3>
        <p className="text-xs text-gray-500">{book.author}</p>
      </div>
    </Link>
  );
}
