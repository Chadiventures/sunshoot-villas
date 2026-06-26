import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import VillaGalleryViewer from "@/components/villas/VillaGalleryViewer";

export const metadata: Metadata = {
  title: "Our Villas | Sahana Villas",
  description:
    "Five luxury 3-bedroom private pool villas in Seminyak, Bali. Explore your private sanctuary with virtual tour, gallery and villa features.",
};

const eyebrowStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.25em",
  textTransform: "uppercase" as const,
};

const ctaButtonStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

const features = [
  {
    title: "Three Master Bedrooms",
    description:
      "All air-conditioned with ensuite semi-outdoor bathrooms and rainforest showers",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
      </svg>
    ),
  },
  {
    title: "Private Pool",
    description:
      "Your own 8x3 metre pool surrounded by tropical gardens, sun loungers and a shaded gazebo",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
        <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
      </svg>
    ),
  },
  {
    title: "Fully Equipped Kitchen",
    description:
      "Modern appliances, espresso machine, juice extractor and free-flow organic coffee",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2h12v4a4 4 0 01-4 4H10a4 4 0 01-4-4V2z" />
        <path d="M6 6H4a2 2 0 00-2 2v2a6 6 0 006 6h8a6 6 0 006-6V8a2 2 0 00-2-2h-2" />
        <path d="M8 22h8" />
      </svg>
    ),
  },
  {
    title: "Free WiFi",
    description:
      "Strong signal throughout the entire villa and into the surrounding area",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <path d="M12 20h.01" />
        <circle cx="12" cy="20" r="1" />
      </svg>
    ),
  },
  {
    title: "Full Staff",
    description:
      "Daily housekeeping, breakfast preparation, night security and an on-call manager",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Eco-Friendly",
    description:
      "Designed with an energy consultant to minimize the ecological footprint of your stay",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 019.5 6.5C6 7 4 9.5 4 13a7 7 0 0014 0c0-2.5-1.5-5-4.5-6.5A7 7 0 0111 20z" />
      </svg>
    ),
  },
];

const galleryImages = [
  "/about-us-section-1.png",
  "/about-us-section-2.png",
  "/thoughtful-hospitality.png",
  "/about-us-section-3.png",
  "/about-us-section.png",
  "/your-private-sanctuary.png",
];

const locationHighlights = [
  "15 min walk to Seminyak Beach and KuDeTa",
  "Walking distance to top restaurants and cafes",
  "Easy access to Petitenget Temple and Oberoi Street",
  "30 min from Ngurah Rai International Airport",
];

export default function VillasPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex h-screen min-h-[500px] flex-col items-center justify-end overflow-hidden pb-20 text-center"
        style={{ marginTop: "-80px" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <p className="mb-4 text-[#67bc6a]" style={eyebrowStyle}>
            Seminyak, Bali
          </p>

          <h1
            className="mb-6 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(36px, 8vw, 72px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.15,
            }}
          >
            Your Private Sanctuary
          </h1>

          <p
            className="mb-10 text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              letterSpacing: "0.02em",
              lineHeight: 1.7,
            }}
          >
            Five luxury 3-bedroom private pool villas in the heart of Seminyak
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-alive inline-block min-h-[44px] border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
              style={ctaButtonStyle}
            >
              Check Availability
            </Link>
            <a
              href="https://maps.app.goo.gl/YVMeVAbNe2cC8hh38"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block min-h-[44px] border border-white/60 px-10 py-3.5 text-white transition-all duration-300 hover:border-white"
              style={ctaButtonStyle}
            >
              Virtual Tour
            </a>
          </div>
        </div>
      </section>

      {/* Villa Overview */}
      <section className="bg-[#F7F3EE]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-[#67bc6a]" style={eyebrowStyle}>
              The Villas
            </p>

            <h2
              className="mb-8 text-[#1C2E20]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 300,
                lineHeight: 1.25,
              }}
            >
              Five Villas. One Standard of Excellence.
            </h2>

            <p
              className="mb-6 text-[#6B6B6B]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              The Sahana complex consists of five private villas, each set on a
              generous 500m2 property with 200m2 of built living space. Every
              villa is designed to feel like a private home, not a hotel room.
            </p>

            <p
              className="mb-6 text-[#6B6B6B]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Each villa features three air-conditioned master bedrooms, large
              ensuite semi-outdoor bathrooms with rainforest showers, a spacious
              open-plan living and dining area, and a fully equipped kitchen.
            </p>

            <p
              className="mb-10 text-[#6B6B6B]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Your own 8x3 metre private pool sits at the heart of the villa,
              surrounded by a tropical garden with sun loungers, a gazebo and a
              sun deck.
            </p>

            <Link
              href="/contact"
              className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
              style={ctaButtonStyle}
            >
              Check Availability
            </Link>
          </div>

          <VillaGalleryViewer />
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="bg-[#1C2E20]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-[960px] text-center">
          <p className="mb-4 text-[#67bc6a]" style={eyebrowStyle}>
            Explore Before You Arrive
          </p>

          <h2
            className="mb-6 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            Take a Virtual Tour
          </h2>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Step inside Sahana Villas before you book. Explore every room, the
            pool, the garden and the living spaces in 360 degrees.
          </p>

          <iframe
            title="Sahana Villas virtual tour"
            src="https://www.google.com/maps/embed?pb=!4v1734665741514!6m8!1m7!1sCAoSLEFGMVFpcE5WVGtzbU94aTk4TFFUX1B5elFTVk1WTEdWamoxa090MFlFRnpD!2m2!1d-8.68464934604003!2d115.1634601690474!3f77.88!4f-1.1299999999999955!5f0.5970117501821992"
            width="100%"
            height="540"
            style={{
              border: 0,
              borderRadius: "4px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
              marginTop: "40px",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-[#F7F3EE]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-center text-[#67bc6a]" style={eyebrowStyle}>
            In Every Villa
          </p>

          <h2
            className="mb-16 text-center text-[#1C2E20]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            What Awaits You
          </h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="mb-4">{feature.icon}</div>
                <h4
                  className="mb-3 text-[#1C2E20]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "22px",
                    fontWeight: 400,
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-[#6B6B6B]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-[#c1bab2]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-center text-[#67bc6a]" style={eyebrowStyle}>
            Gallery
          </p>

          <h2
            className="mb-12 text-center text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            A Glimpse Inside
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src) => (
              <div
                key={src}
                className="group relative h-[300px] overflow-hidden rounded-[3px]"
              >
                <Image
                  src={src}
                  alt="Sahana Villas interior and exterior"
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Teaser */}
      <section className="bg-[#1C2E20]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-[700px] text-center">
          <p className="mb-4 text-[#67bc6a]" style={eyebrowStyle}>
            Location
          </p>

          <h2
            className="mb-6 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            The Heart of Seminyak
          </h2>

          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Sahana Villas sits on the iconic Oberoi Street, placing you at the
            centre of Seminyak&apos;s finest dining, boutique shopping, and
            beach culture — yet step inside and the world fades away.
          </p>

          <ul className="mb-10 space-y-3 text-left">
            {locationHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#67bc6a]"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
            style={ctaButtonStyle}
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F7F3EE]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="mb-8 text-[#1C2E20]"
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
            href="/contact"
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
            style={ctaButtonStyle}
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
