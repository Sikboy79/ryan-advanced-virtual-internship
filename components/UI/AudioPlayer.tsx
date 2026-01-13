"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

export interface AudioPlayerHandle {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  skip: (seconds: number) => void;
  setTime: (seconds: number) => void;
  setPlaybackRate: (rate: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

interface AudioPlayerProps {
  src: string;
  onEnded?: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  ({ src, onEnded }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => audioRef.current?.play(),
      pause: () => audioRef.current?.pause(),
      toggle: () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.paused ? audio.play() : audio.pause();
      },
      skip: (seconds: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(
          Math.max(0, audio.currentTime + seconds),
          audio.duration || 0
        );
      },
      setTime: (seconds: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = seconds;
      },
      setPlaybackRate: (rate: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.playbackRate = rate;
      },
      getCurrentTime: () => audioRef.current?.currentTime || 0,
      getDuration: () => audioRef.current?.duration || 0,
    }));

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio || !onEnded) return;

      const handleEnded = () => {
        onEnded();
      };

      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }, [onEnded]);

    return <audio ref={audioRef} src={src} preload="auto" style={{ display: "none" }} />;
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;




