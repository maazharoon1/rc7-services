"use client";
import { useEffect, useRef, useState } from "react";
import { reviews } from "../lib/site";
import { Icon } from "./site-icon";
export function Reviews() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(3);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const touch = useRef<number | null>(null);
  const pages = reviews.items.length - count + 1;
  useEffect(() => {
    const resize = () => {
      const n = innerWidth < 650 ? 1 : innerWidth < 1050 ? 2 : 3;
      setCount(n);
      setIndex((i) => Math.min(i, reviews.items.length - n));
    };
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(motion.matches);
    const visibility = () => setHidden(document.hidden);
    resize();
    change();
    visibility();
    window.addEventListener("resize", resize);
    motion.addEventListener("change", change);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || hidden || reduced) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % pages), 6500);
    return () => clearInterval(timer);
  }, [paused, hovered, focused, hidden, reduced, pages]);
  function step(direction: number) {
    setIndex((i) => (i + direction + pages) % pages);
  }
  if (!reviews.enabled) return null;
  return (
    <section className="section reviews-section">
      <div className="wrap">
        <div className="section-heading">
          <h2>
            Room for your story<span className="orange">.</span>
          </h2>
          <p>
            Customer experiences will live here.
            <br />
            Preview only — these are sample reviews.
          </p>
        </div>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Sample reviews"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
          }}
        >
          <div
            className="reviews-window"
            onTouchStart={(e) => {
              touch.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (
                touch.current !== null &&
                Math.abs(e.changedTouches[0].clientX - touch.current) > 45
              )
                step(e.changedTouches[0].clientX < touch.current ? 1 : -1);
              touch.current = null;
            }}
          >
            <div
              className="reviews-track"
              style={{
                transform: `translateX(calc(-${index} * (100% + 24px) / ${count}))`,
              }}
            >
              {reviews.items.map((item, i) => (
                <article
                  className="review-card"
                  key={item.id}
                  aria-hidden={i < index || i >= index + count}
                >
                  <div className="review-card-top">
                    <span>Sample review</span>
                    <span className="quote-mark" aria-hidden="true">
                      “
                    </span>
                  </div>
                  <p>{item.text}</p>
                  <div className="sample-person">
                    <span>{item.id}</span>
                    <div>
                      Sample {item.id}
                      <small>Illustrative content · Not a testimonial</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            <div className="pagination">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  aria-label={`Show review group ${i + 1}`}
                  aria-current={index === i ? "true" : undefined}
                  onClick={() => setIndex(i)}
                >
                  <span />
                </button>
              ))}
            </div>
            <div className="carousel-buttons">
              <button
                className="icon-button autoplay-button"
                aria-label={
                  paused || reduced
                    ? "Play review slideshow"
                    : "Pause review slideshow"
                }
                onClick={() => {
                  if (reduced) {
                    setReduced(false);
                    setPaused(false);
                  } else setPaused(!paused);
                }}
              >
                <Icon name={paused || reduced ? "play" : "pause"} />
              </button>
              <button
                className="icon-button previous"
                onClick={() => step(-1)}
                aria-label="Previous reviews"
              >
                <Icon />
              </button>
              <button
                className="icon-button"
                onClick={() => step(1)}
                aria-label="Next reviews"
              >
                <Icon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
