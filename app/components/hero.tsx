"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { assets, business } from "../lib/site";
import { Icon } from "./site-icon";
export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (!motion.matches && !connection?.saveData) {
      media.src = assets.video;
      media.play().catch(() => setPlaying(false));
    }
    const changed = () => {
      if (motion.matches) media.pause();
    };
    motion.addEventListener("change", changed);
    return () => motion.removeEventListener("change", changed);
  }, []);
  async function toggle() {
    const media = video.current;
    if (!media) return;
    if (playing) media.pause();
    else {
      if (!media.src) media.src = assets.video;
      try {
        await media.play();
      } catch {
        setFailed(true);
      }
    }
  }
  return (
    <section className="hero">
      <video
        ref={video}
        className="hero-video"
        poster={assets.poster}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setFailed(true);
        }}
        aria-hidden="true"
      />
      <div className="hero-shade" />
      <div className="hero-content wrap">
        <h1>
          Build Better.
          <br />
          Live Better<span className="orange">.</span>
        </h1>
        <p>
          Remodeling and construction for
          <br className="desktop-break" /> the spaces you call home.
        </p>
        <div className="actions">
          <Link className="button" href="/contact">
            Get a Free Estimate <Icon name="diagonal" />
          </Link>
          <a className="button button-glass" href={business.call}>
            <Icon name="phone" />
            Call Now
          </a>
        </div>
        <div className="hero-tagline">
          <span /> {business.tagline}
        </div>
      </div>
      <div className="hero-bottom wrap">
        <a href="#about" className="scroll-link">
          A better space starts here <span>↓</span>
        </a>
        <button
          className="video-control"
          onClick={toggle}
          aria-label={
            playing ? "Pause background video" : "Play background video"
          }
        >
          <Icon name={playing ? "pause" : "play"} />
          <span>{playing ? "Pause video" : "Play video"}</span>
        </button>
        {failed && (
          <span className="sr-only" role="status">
            Video unavailable. You can still explore the site and request an
            estimate.
          </span>
        )}
      </div>
    </section>
  );
}
