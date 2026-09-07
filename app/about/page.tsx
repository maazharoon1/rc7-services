import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { assets, approach } from "../lib/site";
import { Icon } from "../components/site-icon";
export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Isaid Rangel, owner of RC7, and learn about our approach to remodeling and construction.",
};
export default function AboutPage() {
  return (
    <>
      <section className="wrap section about-page">
        <div className="page-title">
          <h1>
            A personal approach.
            <br />A better place to call home<span className="orange">.</span>
          </h1>
        </div>
        <div className="about-grid">
          <div className="portrait-frame">
            <Image
              src={assets.owner}
              alt="Isaid Rangel, owner of RC7"
              width={1080}
              height={1080}
              sizes="(max-width: 700px) 90vw, 45vw"
              preload
            />
            <div className="portrait-caption">
              <span>Isaid Rangel</span>
              <span>Owner, RC7</span>
            </div>
          </div>
          <div className="about-copy">
            <h2>
              Meet Isaid<span className="orange">.</span>
            </h2>
            <p className="lead">The person behind RC7.</p>
            <p>
              Your home is personal. The conversation about changing it should
              be, too. Isaid Rangel leads RC7, a remodeling and construction
              business for interior and exterior projects.
            </p>
            <p>
              Whether you have a clear plan or are still exploring
              possibilities, start by sharing what matters to you. The space,
              your priorities, and your ideas give us a place to begin.
            </p>
            <Link href="/contact" className="button">
              Get a Free Estimate <Icon name="diagonal" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section about-approach">
        <div className="wrap">
          <div className="section-heading">
            <h2>
              Our approach to your project<span className="orange">.</span>
            </h2>
            <p>
              Professional. Reliable. Affordable.
              <br />
              The values behind the work.
            </p>
          </div>
          <div className="approach-grid">
            {approach.map((a, i) => (
              <article key={a.title}>
                <span>0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
