import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import GalleryView from "@/components/GalleryView";
import CtaBand from "@/components/CtaBand";
import { projects, projectCategories } from "@/data/projects";

export const metadata: Metadata = {
  title: "Project Gallery | Gypsum Ceilings, Feature Walls & Drywall in Abuja",
  description:
    "Browse gypsum ceilings, feature walls, drywall partitions and interior finishing by Jiugypsum Nigeria Limited. Filter by project type and request a quote for something similar.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Our work, up close.">
        <p>A look at ceilings, feature walls, partitions and finishing details from our projects. Tap any project for a larger view.</p>
      </PageHero>
      <section className="section--tight" style={{ paddingBottom: "var(--section)" }}>
        <div className="container">
          <Suspense fallback={<p className="empty">Loading projects…</p>}>
            <GalleryView projects={projects} categories={projectCategories} />
          </Suspense>
        </div>
      </section>
      <CtaBand location="gallery_final" title="See something you like?" text="Tell us about your space and we'll discuss how to bring a similar finish to it." />
    </>
  );
}
