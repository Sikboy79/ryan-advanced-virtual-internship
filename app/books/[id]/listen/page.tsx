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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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
      <div className="flex justify-between items-center md:hidden p-4 border-b">
        <SearchInput/>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 ml-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="hidden md:flex justify-end p-4 border-b">
        <SearchInput />
      </div>
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileSidebarOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full bg-white shadow-lg w-64 p-4 transform transition-transform duration-300 ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
          <Sidebar
            setIsLoginOpen={setIsLoginOpen}
            showTextSizeControls={true}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>
      </div>
      <aside className="hidden md:block border-r bg-[#f7fbf9] h-screen fixed w-48">
        <Sidebar
          setIsLoginOpen={setIsLoginOpen}
          showTextSizeControls={true}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      </aside>
      <div className="max-w-4xl mx-auto p-6 mt-4 md:mt-12 bg-white shadow-md rounded-lg relative pb-32 ml-0 md:ml-48">
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
