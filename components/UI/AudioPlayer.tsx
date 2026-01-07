"use client";

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

export interface AudioPlayerHandle {
  toggle: () => void;
  play: () => void;
  pause: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerHandle, { src: string }>(
  ({ src }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useImperativeHandle(ref, () => ({
      toggle() {
        if (!audioRef.current) return;
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
      },
      play() {
        audioRef.current?.play();
        setIsPlaying(true);
      },
      pause() {
        audioRef.current?.pause();
        setIsPlaying(false);
      },
    }));

    return <audio ref={audioRef} src={src} preload="metadata" />;
  }
);

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
