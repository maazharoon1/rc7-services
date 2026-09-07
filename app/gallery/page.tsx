import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "../components/gallery";
import { Icon } from "../components/site-icon";
export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore RC7’s supplied project photographs, from interior details to spaces in progress.",
};
export default function GalleryPage() {
  return (
    <section className="section wrap">
      <div className="page-title">
        <h1>
          Spaces. Details.
          <br />
          Possibilities<span className="orange">.</span>
        </h1>
        <p>
          A closer look through the RC7 lens.
          <br />
          Select an image to explore.
        </p>
      </div>
      <Gallery />
      <div className="gallery-cta">
        <h2>What do you have in mind?</h2>
        <Link href="/contact" className="button">
          Let’s talk about your project <Icon name="diagonal" />
        </Link>
      </div>
    </section>
  );
}
