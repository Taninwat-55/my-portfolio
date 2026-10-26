"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short silent loop in The Making (e.g. a before/after wipe). It plays only
 * while on screen. Under reduced motion it never starts by itself: the poster
 * shows, with controls to play it on purpose.
 */
export function MakingVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once on mount
    setReduced(still);
    if (still) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? void video.play().catch(() => {}) : video.pause()),
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
      aria-label={label}
    />
  );
}
