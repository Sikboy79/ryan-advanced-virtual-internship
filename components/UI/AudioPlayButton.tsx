"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0 seconds";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (minutes === 0) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }

    return `${minutes} minute${minutes !== 1 ? "s" : ""} ${seconds
      .toString()
      .padStart(2, "0")} second${seconds !== 1 ? "s" : ""}`;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={togglePlay}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-black"
      >
        {isPlaying ? (
          <FaPause className="text-white" />
        ) : (
          <FaPlay className="text-white ml-[2px]" />
        )}
      </button>
      <span className="text-sm text-gray-700">{formatTime(currentTime)}</span>
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
