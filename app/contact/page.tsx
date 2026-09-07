import type { Metadata } from "next";
import { ContactSection } from "../components/sections";
import { services } from "../lib/site";
export const metadata: Metadata = {
  title: "Contact & Free Estimate",
  description:
    "Discuss your remodeling or construction project with Isaid Rangel at RC7. Call 682-203-3923 or prepare a free estimate email.",
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <ContactSection
      page
      service={services.some((s) => s.name === service) ? service : ""}
    />
  );
}
