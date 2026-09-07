"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gallery } from "../lib/site";
import { Icon } from "./site-icon";

function LightboxImage({ selected }: { selected: number }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const item = gallery[selected];
  return (
    <div className="lightbox-image" aria-busy={status === "loading"}>
      {status === "loading" && (
        <div className="lightbox-loading" role="status">
          <span className="lightbox-spinner" aria-hidden="true" />
          <span>Loading image…</span>
        </div>
      )}
      {status === "error" && (
        <p className="lightbox-image-error" role="status">
          This image couldn’t load. Please try another image or reopen it.
        </p>
      )}
      <Image
        {...item}
        alt={item.alt}
        sizes="90vw"
        loading="eager"
        className={status === "loaded" ? "is-loaded" : "is-loading"}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}

export function Gallery() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  function step(n: number) {
    setSelected((i) => (i + n + gallery.length) % gallery.length);
  }
  return (
    <>
      <div className="gallery-grid">
        {gallery.map((item, i) => (
          <button
            key={item.src}
            className={`gallery-item gallery-item-${i}`}
            aria-label={`Enlarge image ${i + 1}: ${item.alt}`}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setSelected(i);
              setOpen(true);
              dialog.current?.showModal();
            }}
          >
            <Image
              {...item}
              alt={item.alt}
              sizes="(max-width: 700px) 90vw, 46vw"
            />
            <span>
              View image <Icon name="diagonal" />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Project image viewer"
        onCancel={close}
        onClose={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
      >
        <div className="lightbox-top">
          <span aria-live="polite">
            {String(selected + 1).padStart(2, "0")} / 04
          </span>
          <button
            autoFocus
            className="icon-button"
            onClick={close}
            aria-label="Close image viewer"
          >
            <Icon name="close" />
          </button>
        </div>
        {open && <LightboxImage key={selected} selected={selected} />}
        <div className="lightbox-bottom">
          <button
            className="icon-button previous"
            onClick={() => step(-1)}
            aria-label="Previous image"
          >
            <Icon />
          </button>
          <p>{gallery[selected].alt}</p>
          <button
            className="icon-button"
            onClick={() => step(1)}
            aria-label="Next image"
          >
            <Icon />
          </button>
        </div>
      </dialog>
    </>
  );
}
