"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { getBook } from "../../../library/getBook";
import SearchInput from "@/components/UI/SearchInput";
import Sidebar from "@/components/UI/Sidebar";
import StickyAudioControls from "@/components/UI/StickyAudioControls";

export default function ListenPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [book, setBook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, router]);

  if (loading || !book) {
    return (
      <div className="h-screen flex items-center justify-center">Loading…</div>
    );
  }

  return (
    <>
      <div className="search__input--wrapper flex justify-end m-1">
        <SearchInput />
      </div>
      <Sidebar
        setIsLoginOpen={setIsLoginOpen}
        showTextSizeControls={true}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="max-w-4xl mx-auto p-6 ml-60 mt-12 bg-white shadow-md rounded-lg relative pb-32">
        <button
          onClick={() => router.push(`/books/${id}`)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>
        <h1 className="text-3xl font-bold mb-1">{book.title}</h1>
        <p className="text-gray-700 mb-6">{book.author}</p>
        <div className="text-gray-800 leading-relaxed" style={{ fontSize }}>
          {book.readText || book.summary}
        </div>
      </div>
      <StickyAudioControls
        src={book.audioLink}
        title={book.title}
        author={book.author}
        imageLink={book.imageLink}
        bookId={book.id}
      />
    </>
  );
}
