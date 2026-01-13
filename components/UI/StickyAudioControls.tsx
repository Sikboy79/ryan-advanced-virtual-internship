"use client";

import { useEffect, useRef, useState } from "react";
import { FiPlay, FiPause } from "react-icons/fi";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import AudioPlayer, { AudioPlayerHandle } from "./AudioPlayer";
import { useLibraryStore, Book } from "@/store/useMyLibraryStore";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

interface StickyAudioProps extends Partial<Book> {
  src: string;
  bookId: string;
  title: string;
  author: string;
}

export default function StickyAudioControls({
  src,
  bookId,
  title,
  author,
  imageLink,
  subTitle,
  summary,
  averageRating,
  totalRating,
}: StickyAudioProps) {
  const playerRef = useRef<AudioPlayerHandle>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [finished, setFinished] = useState(false);

  const addFinishedBook = useLibraryStore((state) => state.addFinishedBook);

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      const current = player.getCurrentTime();
      const total = player.getDuration();

      setTime(current);
      setDuration(total);

      if (!finished && total > 0 && current >= total) {
        if (!bookId) return;

        addFinishedBook({
          id: bookId,
          title,
          author,
          imageLink: imageLink || "",
          subTitle: subTitle || "",
          summary: summary || "",
          averageRating: averageRating || "0",
          totalRating: totalRating || "0",
        });

        setFinished(true);
        console.log("Book added to finishedBooks:", title);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [
    bookId,
    title,
    author,
    imageLink,
    subTitle,
    summary,
    averageRating,
    totalRating,
    addFinishedBook,
    finished,
  ]);

  useEffect(() => {
    playerRef.current?.setPlaybackRate(speed);
  }, [speed]);

  const format = (t: number) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60)
      .toString()
      .padStart(2, "0")}`;

  return (
    <div className="fixed bottom-0 inset-x-0 h-28 z-50 bg-gray-900 border-t border-gray-700 shadow-lg">
      <AudioPlayer ref={playerRef} src={src} />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 text-white">
        <div className="flex items-center gap-3 min-w-[220px]">
          {imageLink ? (
            <img
              src={imageLink}
              alt={title}
              className="w-12 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
              No Cover
            </div>
          )}
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white line-clamp-1">
              {title}
            </p>
            {author && (
              <p className="text-xs text-gray-300 line-clamp-1">{author}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => playerRef.current?.skip(-10)}
          className="hover:text-green-400 transition"
        >
          <FaArrowRotateLeft size={20} />
        </button>
        <button
          onClick={() => {
            playerRef.current?.toggle();
            setIsPlaying((p) => !p);
          }}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>
        <button
          onClick={() => playerRef.current?.skip(10)}
          className="hover:text-green-400 transition"
        >
          <FaArrowRotateRight size={20} />
        </button>
        <span className="text-xs w-10 text-gray-300">{format(time)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          onChange={(e) => playerRef.current?.setTime(Number(e.target.value))}
          className="flex-1 w-full h-1 cursor-pointer accent-green-500"
        />
        <span className="text-xs w-10 text-right text-gray-300">
          {format(duration)}
        </span>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="ml-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
        >
          {SPEEDS.map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
