import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Footer from "@/components/Footer";

const PromosHeroVideo = dynamic(
  () => import("@/components/promos/PromosHeroVideo"),
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
  title: "Special Promotions 2026 | Sahana Villas",
  description:
    "Exclusive Bali villa promotions for 2026. USD, AUD, SGD and IDR deals when you book direct with Sahana Villas in Seminyak.",
};

const eyebrowStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.25em",
  textTransform: "uppercase" as const,
};

const buttonStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

function PromoVisual({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="relative flex min-h-[280px] flex-col items-center justify-center p-8 text-center md:min-h-full"
      style={{
        background:
          "linear-gradient(135deg, #1A1A1A 0%, #3d4a42 50%, #1A1A1A 100%)",
      }}
    >
      <p
        className="mb-2 text-white"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          lineHeight: 1.6,
        }}
      >
        {title}
      </p>
      <p
        className="mb-4 text-[#67bc6a]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.15em",
        }}
      >
        {subtitle}
      </p>
      <p className="text-[#67bc6a]" style={{ fontSize: "18px" }} aria-hidden="true">
        ★★★★★
      </p>
    </div>
  );
}

interface PromoSectionProps {
  imageFirst: boolean;
  visualTitle: string;
  visualSubtitle: string;
  heading: string;
  description?: string;
  bullets: string[];
  bgClass: string;
}

function PromoSection({
  imageFirst,
  visualTitle,
  visualSubtitle,
  heading,
  description,
  bullets,
  bgClass,
}: PromoSectionProps) {
  const visual = (
    <div className="card-alive overflow-hidden">
      <PromoVisual title={visualTitle} subtitle={visualSubtitle} />
    </div>
  );

  const content = (
    <div className={`flex flex-col justify-center px-6 py-10 md:px-12 md:py-14 ${bgClass}`}>
      <h2
        className="mb-6 text-[#1A1A1A]"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
        }}
      >
        {heading}
      </h2>
      {description && (
        <p
          className="mb-6 text-[#6B6B6B]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.8,
          }}
        >
          {description}
        </p>
      )}
      <ul className="mb-8 space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#67bc6a]"
              aria-hidden="true"
            />
            {bullet}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="btn-alive inline-block w-fit border border-[#67bc6a] bg-[#67bc6a] px-8 py-3 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
        style={buttonStyle}
      >
        Book Now
      </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {imageFirst ? (
        <>
          {visual}
          {content}
        </>
      ) : (
        <>
          {content}
          {visual}
        </>
      )}
    </div>
  );
}

export default function PromosPage() {
  return (
    <>
      <section
        className="relative -mt-[80px] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          height: "40vh",
          minHeight: "280px",
        }}
      >
        <PromosHeroVideo />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(28, 46, 32, 0.65)" }}
        />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-3 text-[#67bc6a]" style={eyebrowStyle}>
            Exclusive Deals
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
            Special Promotions 2026
          </h1>
          <p
            className="mb-6 text-white/75"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Book direct and save. All promotions valid throughout 2026.
          </p>
          <nav
            aria-label="Breadcrumb"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <Link href="/" className="transition-colors hover:text-[#67bc6a]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Promotions</span>
          </nav>
        </div>
      </section>

      <section className="bg-[#F7F3EE] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p
            className="text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.85,
            }}
          >
            At Sahana Villas we offer a curated selection of affordable Bali villa
            packages designed to make your dream vacation both luxurious and
            budget-friendly. Our promotions cater to every type of traveler,
            whether you are planning a family holiday, a group retreat, a ladies
            trip or a hens week. Each stay is backed by the warm hospitality and
            service that defines the Sahana Experience. All promotions listed below
            are valid for stays throughout 2026. All payments are processed in
            Indonesian Rupiah. Rates are displayed in foreign currency for your
            convenience.
          </p>
        </div>
      </section>

      <section>
        <PromoSection
          imageFirst
          visualTitle="SAHANA EXPERIENCE VIP LEVEL"
          visualSubtitle="(USD DEAL)"
          heading="Sahana Experience VIP Level (USD Deal)"
          bullets={[
            "Low Season: USD 350 per night (regular USD 500)",
            "High Season: USD 410 per night (regular USD 550)",
            "Book directly from your USD account with no exchange rate loss",
          ]}
          bgClass="bg-[#F7F3EE]"
        />

        <PromoSection
          imageFirst={false}
          visualTitle="SAHANA SPECIAL LIMITED-TIME OFFER"
          visualSubtitle="(AUD PROMO)"
          heading="Special Limited-Time Offer (AUD Promo)"
          description="Take advantage of our seasonal AUD Promotion making your premium Bali escape even more rewarding. All rates include taxes and government charges."
          bullets={[
            "Low Season: AUD 498 per night (regular USD 500)",
            "High Season: AUD 585 per night (regular USD 550)",
          ]}
          bgClass="bg-[#c1bab2]"
        />

        <PromoSection
          imageFirst
          visualTitle="SAHANA EXPERIENCE VIP LEVEL"
          visualSubtitle="(SGD DEAL)"
          heading="Sahana Experience VIP Level (SGD Deal)"
          bullets={[
            "Low Season: SGD 460 per night (regular SGD 680)",
            "High Season: SGD 530 per night (regular SGD 750)",
            "Book directly from your SGD account without exchange rate loss",
          ]}
          bgClass="bg-[#F7F3EE]"
        />

        <PromoSection
          imageFirst={false}
          visualTitle="SAHANA EXPERIENCE VIP LEVEL"
          visualSubtitle="(IDR DEAL)"
          heading="Sahana Experience VIP Level (IDR Deal)"
          bullets={[
            "IDR 6,250,000 per night for Low Season",
            "IDR 6,990,000 per night for High Season",
            "Book directly from your IDR account without exchange rate loss",
          ]}
          bgClass="bg-[#c1bab2]"
        />
      </section>

      <section className="bg-[#c1bab2] py-12 md:py-16 lg:py-20">
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
            Ready to Claim Your Deal?
          </h2>
          <Link
            href="/contact"
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
            style={buttonStyle}
          >
            Send a Booking Enquiry
          </Link>
          <p
            className="mt-6 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 300,
            }}
          >
            Or WhatsApp us directly on{" "}
            <a
              href="https://wa.me/628113882070"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] transition-colors hover:text-[#67bc6a]"
            >
              +62 811 388 2070
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
