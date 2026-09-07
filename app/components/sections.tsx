import Image from "next/image";
import Link from "next/link";
import {
  assets,
  business,
  estimateHref,
  navigation,
  services,
} from "../lib/site";
import { Icon } from "./site-icon";
import { EstimateForm } from "./estimate-form";
export function AboutSection() {
  return (
    <section id="about" className="section wrap about-grid reveal">
      <div className="portrait-frame">
        <Image
          src={assets.owner}
          alt="Isaid Rangel, owner of RC7"
          width={1080}
          height={1080}
          sizes="(max-width: 700px) 90vw, 42vw"
        />
        <div className="portrait-caption">
          <span>Isaid Rangel</span>
          <span>
            Owner, RC7 <Icon name="diagonal" />
          </span>
        </div>
        <span className="image-corner" />
      </div>
      <div className="about-copy">
        <h2>
          Your home.
          <br />
          Our commitment<span className="orange">.</span>
        </h2>
        <p className="lead">A better space begins with someone who listens.</p>
        <p>
          RC7 is a remodeling and construction business led by Isaid Rangel.
          From a fresh coat of paint to a bigger transformation, we’re here to
          talk through your ideas and help shape the next step.
        </p>
        <p>
          Your priorities. Your space. A thoughtful approach to bringing it all
          together.
        </p>
        <div className="actions">
          <Link className="text-link" href="/about">
            Meet RC7 <Icon name="diagonal" />
          </Link>
          <Link className="text-link secondary-link" href="/contact">
            Let’s talk about your project <Icon />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function ServicesSection() {
  return (
    <section className="services-section section">
      <div className="wrap">
        <div className="section-heading reveal">
          <h2>
            One home.
            <br />
            So many possibilities<span className="orange">.</span>
          </h2>
          <div>
            <p>
              From the first idea to the finishing touches,
              <br />
              find the right starting point for your project.
            </p>
            <Link className="text-link" href="/services">
              Explore our services <Icon name="diagonal" />
            </Link>
          </div>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <Link
              className={`service-card reveal service-${i}`}
              href={estimateHref(service.name)}
              key={service.name}
            >
              <div className="service-top">
                <Icon name={service.icon} />
                <span>0{i + 1}</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span className="service-arrow">
                <Icon name="diagonal" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ContactSection({
  service = "",
  page = false,
}: {
  service?: string;
  page?: boolean;
}) {
  return (
    <section
      className={`section wrap contact-grid ${page ? "contact-page" : ""}`}
      id="estimate"
    >
      <div className="contact-copy">
        {page ? (
          <h1>
            Let’s build
            <br />
            something better<span className="orange">.</span>
          </h1>
        ) : (
          <h2>
            Have a project
            <br />
            in mind<span className="orange">?</span>
          </h2>
        )}
        <p className="lead">
          Tell us what you’re thinking.
          <br />
          We’ll take it from there.
        </p>
        <p>
          Share a few details about your space and the changes you’d like to
          make. Start a conversation with Isaid about a free estimate.
        </p>
        <div className="contact-details">
          <a href={business.call}>
            <Icon name="phone" />
            <span>
              <small>Call Now</small>
              {business.phone}
            </span>
            <Icon name="diagonal" />
          </a>
          <a href={`mailto:${business.email}`}>
            <span className="at-symbol">@</span>
            <span>
              <small>Email Isaid</small>
              {business.email}
            </span>
            <Icon name="diagonal" />
          </a>
        </div>
        <span className="contact-mark" aria-hidden="true">
          Let’s get
          <br />
          to work. <span>↗</span>
        </span>
      </div>
      <EstimateForm initialService={service} />
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <Link href="/" className="brand">
          <Image
            src={assets.logo}
            alt="RC7 Services home"
            width={66}
            height={66}
          />
          <span>
            REMODELING
            <br />& CONSTRUCTION
          </span>
        </Link>
        <nav aria-label="Footer navigation">
          {navigation.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          className="icon-button"
          href={business.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RC7 on Facebook (opens in a new tab)"
        >
          <Icon name="facebook" />
        </a>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} RC7. All rights reserved.</span>
        <a href={business.call}>{business.phone}</a>
        <a href={`mailto:${business.email}`}>{business.email}</a>
        <span>{business.tagline}</span>
      </div>
    </footer>
  );
}
