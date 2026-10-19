import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChoose from "@/components/home/WhyChoose";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: { absolute: "Gypsum Ceiling, POP & Interior Finishing in Abuja | Jiugypsum Nigeria Limited" },
  description:
    "Jiugypsum Nigeria Limited installs gypsum ceilings, POP designs, drywall partitions, custom TV units and interior finishing for homes and commercial spaces in Abuja. Get a free quote.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProjects />
      <ServicesOverview />
      <WhyChoose />
      <Process />
      <Testimonials />
      <FaqSection items={faqs} />
      <CtaBand location="home_final" />
    </>
  );
}
