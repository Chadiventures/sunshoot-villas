import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import MapSection from "@/components/MapSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us | ${SITE.name}`,
  description:
    "Learn about Sun Shoot Villas Seminyak - private pool villas with personal Balinese hospitality in the Bidadari area.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Sun Shoot Villas"
        subtitle="Luxury without the corporate feel - four private pool villas in the heart of Seminyak."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <section className="bg-[var(--bg)] py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow mb-4">Our Story</p>
            <h2 className="section-heading mb-8">A Personal Retreat in Seminyak</h2>
            <p
              className="mb-6 text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              {SITE.name} is a collection of four private pool villas on{" "}
              {SITE.address}. Each villa offers two bedrooms, open-plan living
              and dining, and your own private pool - designed for couples,
              families, and groups who want space, privacy, and authentic
              Balinese warmth.
            </p>
            <p
              className="text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Villa Mawar, Jepun, Anggrek and Sandat each have their own
              character - from garden villas to modern ensuites - but all share
              the same commitment to personal, attentive hospitality. Sunshoot
              Food &amp; Drinks can deliver directly to your villa, and the
              famous Bidadari area puts restaurants, supermarkets and salons
              within walking distance.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <MapSection />
      <Footer />
    </>
  );
}
