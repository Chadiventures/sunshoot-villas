import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/Footer";

const ContactHeroVideo = dynamic(
  () => import("@/components/contact/ContactHeroVideo"),
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
  title: "Contact | Sahana Villas",
  description:
    "Get in touch with Sahana Villas in Seminyak, Bali. Call, email, or send a booking enquiry and our team will respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          marginTop: "-80px",
          height: "40vh",
          minHeight: "280px",
        }}
      >
        <ContactHeroVideo />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(28, 46, 32, 0.70)" }}
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
            Get in Touch
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
            Contact Sahana Villas
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
            <span className="text-white/80">Contact</span>
          </nav>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
