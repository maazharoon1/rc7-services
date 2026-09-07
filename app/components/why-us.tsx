"use client";
import { useEffect, useRef } from "react";
import { approach } from "../lib/site";
import { Icon } from "./site-icon";
export function WhyUs() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia(
      "(prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = root.current?.querySelectorAll<HTMLElement>(".stack-card");
      cards?.forEach((card, i) => {
        const next = cards[i + 1];
        const progress =
          media.matches && next
            ? Math.max(
                0,
                Math.min(1, (430 - next.getBoundingClientRect().top) / 300),
              )
            : 0;
        card.style.setProperty("--stack-scale", String(1 - progress * 0.045));
        card.style.setProperty("--stack-opacity", String(1 - progress * 0.12));
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    media.addEventListener("change", update);
    update();
    return () => {
      window.removeEventListener("scroll", scroll);
      media.removeEventListener("change", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section className="section why-section">
      <div className="wrap">
        <div className="section-heading reveal">
          <h2>
            Good work starts
            <br />
            with the right approach<span className="orange">.</span>
          </h2>
          <p>
            More than what we do.
            <br />
            It’s how we approach your home.
          </p>
        </div>
        <div className="stack" ref={root}>
          {approach.map((item, i) => (
            <article
              className={`stack-card stack-${i}`}
              key={item.title}
              style={{ top: `calc(var(--header) + 16px + ${i * 18}px)` }}
            >
              <span className="stack-number">0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <Icon name={["phone", "frame", "paint", "home"][i]} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
