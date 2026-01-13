"use client";

import { useEffect, useState } from "react";

interface BookTimerProps {
  audioLink: string;
  className?: string;
}

export default function BookTimer({ audioLink }: BookTimerProps) {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!audioLink) return;

    const audio = new Audio(audioLink);
    audio.preload = "metadata";

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.pause();
      audio.src = "";
      audio.load();
    };
  }, [audioLink]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="">
      {duration !== null ? (
        <span>⏱ {formatTime(duration)}</span>
      ) : (
        <span>Loading duration...</span>
      )}
    </div>
  );
}