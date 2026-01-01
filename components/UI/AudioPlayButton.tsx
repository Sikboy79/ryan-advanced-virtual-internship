"use client";

import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface Props {
  src: string;
  duration?: string;
}

export default function AudioPlayButton({ src, duration }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-105 transition"
      >
        {isPlaying ? (
          <FaPause className="text-white text-xl" />
        ) : (
          <FaPlay className="text-white text-xl ml-1" />
        )}
      </button>

      <span className="text-sm text-gray-800 font-medium">
        {duration ?? "3 mins"}
      </span>

      <audio ref={audioRef} src={src} />
    </div>
  );
}
