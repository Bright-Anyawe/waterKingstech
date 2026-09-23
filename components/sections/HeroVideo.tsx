"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroMedia } from "@/data/hero";

type NetworkInformation = { saveData?: boolean };

/**
 * Background video for the hero. The poster paints immediately; the video
 * itself is attached only after the page has loaded, skipped for visitors who
 * prefer reduced motion or have data saver on, and paused while off-screen.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData;
    if (reduceMotion || saveData) return;

    const start = () => setEnabled(true);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;
    video.muted = true; // required for autoplay on mobile browsers

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByVisitor.current) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [enabled]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!enabled) {
      // Visitors who opted out of motion can still choose to play it.
      pausedByVisitor.current = false;
      setEnabled(true);
      return;
    }
    if (video.paused) {
      pausedByVisitor.current = false;
      video.play().catch(() => {});
    } else {
      pausedByVisitor.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={enabled ? heroMedia.video : undefined}
        poster={heroMedia.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_50%] lg:object-center"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute top-20 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-ink-950/40 text-white/80 backdrop-blur-md transition-colors hover:bg-ink-950/70 hover:text-white sm:right-6 lg:top-auto lg:right-8 lg:bottom-8"
      >
        {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
      </button>
    </>
  );
}
