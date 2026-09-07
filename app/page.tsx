import { Hero } from "./components/hero";
import {
  AboutSection,
  ContactSection,
  ServicesSection,
} from "./components/sections";
import { WhyUs } from "./components/why-us";
import { Reviews } from "./components/reviews";
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <WhyUs />
      <Reviews />
      <ContactSection />
    </>
  );
}
