"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assets, business, navigation } from "../lib/site";
import { Icon } from "./site-icon";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function close() {
    const finish = () => {
      dialog.current?.close();
      setOpen(false);
      trigger.current?.focus();
    };
    if (
      dialog.current?.open &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const animation = dialog.current.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-12px)" },
        ],
        { duration: 180, easing: "ease-in" },
      );
      animation.onfinish = finish;
    } else finish();
  }
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="RC7 home">
          <Image
            src={assets.logo}
            alt="RC7 Services"
            width={70}
            height={70}
            preload
          />
          <span>
            REMODELING
            <br />& CONSTRUCTION
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="button header-cta" href="/contact">
          Get a Free Estimate <Icon name="diagonal" />
        </Link>
        <button
          className="menu-toggle icon-button"
          ref={trigger}
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          <Icon name="menu" />
        </button>
      </div>
      <dialog
        id="mobile-menu"
        className="mobile-menu"
        ref={dialog}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="mobile-top">
          <span>
            RC7<span className="orange">.</span>
          </span>
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close navigation"
            autoFocus
          >
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <span>0{i + 1}</span>
              {link.label}
              <Icon name="diagonal" />
            </Link>
          ))}
        </nav>
        <a className="button" href={business.call}>
          <Icon name="phone" /> {business.phone}
        </a>
      </dialog>
    </header>
  );
}

export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
