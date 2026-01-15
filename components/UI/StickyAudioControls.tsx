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
    <div className="fixed bottom-0 inset-x-0 z-50 bg-gray-900 border-t border-gray-700 shadow-lg">
      <AudioPlayer ref={playerRef} src={src} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 flex flex-col sm:flex-col md:flex-row md:justify-center md:items-center gap-2 sm:gap-2 md:gap-3 text-white">
        <div className="flex items-center gap-2 sm:gap-2 md:gap-3 w-full md:w-auto justify-center">
          {imageLink ? (
            <img
              src={imageLink}
              alt={title}
              className="w-10 h-14 sm:w-12 sm:h-16 md:w-12 md:h-16 object-cover rounded"
            />
          ) : (
            <div className="w-10 h-14 sm:w-12 sm:h-16 md:w-12 md:h-16 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
              No Cover
            </div>
          )}
          <div className="leading-tight flex-1 min-w-0">
            <p className="text-sm sm:text-sm md:text-sm font-semibold text-white truncate">
              {title}
            </p>
            {author && (
              <p className="text-xs text-gray-300 truncate">{author}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-2 mt-1 sm:mt-1 md:mt-0 justify-center">
          <button
            onClick={() => playerRef.current?.skip(-10)}
            className="hover:text-green-400 transition"
          >
            <FaArrowRotateLeft size={18} />
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
            <FaArrowRotateRight size={18} />
          </button>
        </div>
        <div className="flex flex-col sm:flex-col md:flex-row items-center gap-1 sm:gap-1 md:gap-2 w-full md:w-auto mt-1 sm:mt-2 md:mt-0">
          <div className="flex items-center gap-1 sm:gap-1 md:gap-2 w-full md:w-auto">
            <span className="text-xs w-8 text-gray-300">{format(time)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(e) =>
                playerRef.current?.setTime(Number(e.target.value))
              }
              className="flex-1 h-0.5 sm:h-0.5 md:h-1 cursor-pointer accent-green-500"
            />
            <span className="text-xs w-8 text-right text-gray-300">
              {format(duration)}
            </span>
          </div>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="ml-0 md:ml-2 mt-1 sm:mt-1 md:mt-0 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s}>
                {s}x
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
