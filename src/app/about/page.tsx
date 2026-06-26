import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ImageCollage from "@/components/ImageCollage";
import Footer from "@/components/Footer";
import VillaPolicies from "@/components/villas/VillaPolicies";
import { SITE } from "@/lib/site";

const AboutHeroVideo = dynamic(
  () => import("@/components/about/AboutHeroVideo"),
  {
    loading: () => (
      <div
        className="absolute inset-0 h-full w-full bg-[var(--beige)]"
        aria-hidden="true"
      />
    ),
  },
);

export const metadata: Metadata = {
  title: `About Us | ${SITE.name}`,
  description:
    "Learn about Sun Shoot Villas Seminyak — four private pool villas in the Bidadari area with personal Balinese hospitality.",
};

const whyChooseUs = [
  {
    title: "Personal, Not Corporate",
    description:
      "A small complex with genuine warmth — luxury without the hotel feel.",
  },
  {
    title: "Prime Bidadari Location",
    description:
      "Walking distance to restaurants, supermarkets, salons and Seminyak Beach.",
  },
  {
    title: "Private Pool Villas",
    description:
      "Each villa has its own pool, open-plan living, and fully equipped kitchen.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          marginTop: "-80px",
          height: "45vh",
          minHeight: "320px",
        }}
      >
        <AboutHeroVideo />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(31, 46, 36, 0.65)" }}
        />

        <div className="relative z-10">
          <p
            className="mb-3 text-[var(--brand-green-light)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Our Story
          </p>

          <h1
            className="mb-4 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.15,
            }}
          >
            About {SITE.shortName}
          </h1>

          <nav
            aria-label="Breadcrumb"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Link href="/" className="transition-colors hover:text-[var(--brand-green-light)]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">About Us</span>
          </nav>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
          <div className="order-2 lg:order-1">
            <p
              className="mb-3 text-[var(--brand-green)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Seminyak, Bali
            </p>

            <h2
              className="mb-6 text-[#1A1A1A]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 300,
                lineHeight: 1.25,
              }}
            >
              Balinese Minimalism in the Heart of Seminyak
            </h2>

            <p
              className="mb-5 text-[#6B6B6B]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              {SITE.name} is a collection of four private pool villas on{" "}
              {SITE.address}. Each villa offers two bedrooms, open-plan living
              and dining, and your own private pool — designed for couples,
              families, and groups who want space, privacy, and authentic
              Balinese warmth.
            </p>

            <p
              className="text-[#6B6B6B]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Villa Mawar, Jepun, Anggrek and Sandat each have their own
              character — from garden villas to modern ensuites — but all
              share the same commitment to personal, attentive hospitality.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <ImageCollage fixedHeight={560} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--beige)] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2
            className="mb-10 text-center text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Why Sun Shoot Villas
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title}>
                <div className="mb-4 h-px w-10 bg-[var(--brand-green)]" />
                <h3
                  className="mb-3 text-[#1A1A1A]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#6B6B6B]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--dark-green)] py-12 lg:py-16">
        <div className="mx-auto max-w-[700px] px-6">
          <h2
            className="mb-10 text-center text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Guest Policies
          </h2>
          <VillaPolicies />
        </div>
      </section>

      <section className="bg-[var(--cream)] py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2
            className="mb-8 text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            Ready to Book Your Stay?
          </h2>

          <Link
            href="/contact"
            className="btn-alive inline-block border border-[var(--brand-green)] bg-[var(--brand-green)] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[var(--brand-green-hover)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Send an Enquiry
          </Link>

          <p
            className="mt-6 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 300,
            }}
          >
            Or contact us directly at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-[#1A1A1A] transition-colors hover:text-[var(--brand-green)]"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
