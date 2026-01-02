"use client";

import { useSearchStore } from "@/store/useSearchStore";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  const { query, setQuery } = useSearchStore();

  return (
    <form action="/search" className="relative max-w-md mt-4 mr-4">
      <input
        name="q"
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2 pr-12 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
      />

      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:text-blue-600 transition"
        aria-label="Search"
      >
        <div className="hourglass_wrapper border-l-2 ">
          <FiSearch className="h-5 w-5 " />
        </div>
      </button>
    </form>
  );
}
