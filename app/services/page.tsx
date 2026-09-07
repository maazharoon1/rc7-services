import type { Metadata } from "next";
import Link from "next/link";
import { services, estimateHref } from "../lib/site";
import { Icon } from "../components/site-icon";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore RC7 electrical, roofing, painting, flooring, concrete, framing, and interior and exterior remodeling services. Request a free estimate.",
};
export default function ServicesPage() {
  return (
    <section className="section wrap">
      <div className="page-title">
        <h1>
          Make room
          <br />
          for what’s next<span className="orange">.</span>
        </h1>
        <p>
          Seven ways to move your home forward.
          <br />
          One conversation to get started.
        </p>
      </div>
      <div className="service-list">
        {services.map((service, i) => (
          <article key={service.name} className="service-row reveal">
            <span className="row-number">0{i + 1}</span>
            <Icon name={service.icon} />
            <h2>{service.name}</h2>
            <div>
              <p>{service.detail}</p>
              <Link className="text-link" href={estimateHref(service.name)}>
                Request an estimate <Icon name="diagonal" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
