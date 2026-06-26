import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ImageCollage from "@/components/ImageCollage";
import KeyInformation from "@/components/about/KeyInformation";
import Footer from "@/components/Footer";

const AboutHeroVideo = dynamic(
  () => import("@/components/about/AboutHeroVideo"),
  {
    loading: () => (
      <div
        className="absolute inset-0 h-full w-full bg-[#c1bab2]"
        aria-hidden="true"
      />
    ),
  },
);

export const metadata: Metadata = {
  title: "About Us | Sahana Villas",
  description:
    "Learn about Sahana Villas in Seminyak, Bali. Five luxury private pool villas with world-class amenities and an unbeatable location.",
};

const whyChooseUs = [
  {
    title: "Privacy and Security",
    description:
      "High walls, trained night guards, and an option for 24/7 security.",
  },
  {
    title: "Unbeatable Location",
    description:
      "Steps from the beach, restaurants and Seminyak's best venues.",
  },
  {
    title: "Genuine Value",
    description: "Luxury that does not compromise on quality or price.",
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
          style={{ backgroundColor: "rgba(28, 46, 32, 0.65)" }}
        />

        <div className="relative z-10">
          <p
            className="mb-3 text-[#67bc6a]"
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
            About Sahana Villas
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
            <Link href="/" className="transition-colors hover:text-[#67bc6a]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">About Us</span>
          </nav>
        </div>
      </section>

      <section className="bg-[#F7F3EE] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
          <div className="order-2 lg:order-1">
            <p
              className="mb-3 text-[#67bc6a]"
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
              A Private Oasis in the Heart of Seminyak
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
              The complex has five 500m2 villas each with 200m2 of built-up
              living space. Located just off the main street, a 15 min walk to
              Seminyak Beach and KuDeTa, and within 5 minutes of
              Bali&apos;s top restaurants, lounges and bar venues.
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
              Each villa offers three air-conditioned master bedrooms, large
              ensuite semi-outdoor bathrooms, a spacious living and dining area
              connected to the garden, and a fully equipped modern kitchen.
            </p>
          </div>

          <div className="order-1 lg:order-2">
          <ImageCollage fixedHeight={560} />
          </div>
        </div>
      </section>

      <KeyInformation />

      <section className="bg-[#c1bab2] py-12 lg:py-16">
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
            The Best Choice for Seminyak
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title}>
                <div className="mb-4 h-px w-10 bg-[#67bc6a]" />
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

      <section className="bg-[#F7F3EE] py-12 lg:py-16">
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
            Ready to Experience Sahana?
          </h2>

          <Link
            href="/book"
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Check Availability
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
              href="mailto:booking@sahanavillas.com"
              className="text-[#1A1A1A] transition-colors hover:text-[#67bc6a]"
            >
              booking@sahanavillas.com
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
