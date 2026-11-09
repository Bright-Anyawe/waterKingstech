"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroMedia } from "@/data/hero";

type NetworkInformation = { saveData?: boolean };

/**
 * Shop footage behind the search band, tinted by the band's blue. The video is
 * attached only after the page has loaded, skipped for visitors who prefer
 * reduced motion or have data saver on, and paused while off-screen.
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
        className="absolute inset-0 -z-20 size-full object-cover opacity-40 mix-blend-luminosity"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        title={playing ? "Pause background video" : "Play background video"}
        className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-navy/30 text-white/85 backdrop-blur-sm transition-colors hover:bg-navy/50 hover:text-white sm:top-4 sm:right-4"
      >
        {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
      </button>
    </>
  );
}
