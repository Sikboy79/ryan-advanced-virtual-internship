"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchStore } from "@/store/useSearchStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import BookTimer  from "@/components/UI/BookTimer"

export default function SearchInput() {
  const { query, setQuery } = useSearchStore();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            query
          )}`
        );
        setResults(data);
        setShowDropdown(true);
        console.log(data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400); 
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectBook = (bookId: string) => {
    setShowDropdown(false);
    setQuery(""); 
    router.push(`/books/${bookId}`); 
  };

  return (
    <div className="relative max-w-md mt-4 mr-4" ref={containerRef}>
      <input
        name="q"
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
        className="w-full rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2 pr-12 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:text-blue-600 transition"
        aria-label="Search"
      >
        <FiSearch className="h-5 w-5" />
      </button>

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-64 w-full overflow-y-scroll rounded-lg border border-gray-200 bg-white shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {results.map((book, index) => (
            <li
              key={index}
              className="flex items-center gap-5 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectBook(book.id)}
            >
              <img
                src={book.imageLink || "/default-book.png"}
                alt={book.title}
                className="h-12 w-8 object-cover rounded-sm"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{book.title}</span>
                <span className="text-gray-500 text-sm">{book.author}</span>
                <BookTimer audioLink={book.audioLink} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {loading && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          Loading...
        </div>
      )}
    </div>
  );
}


