import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Published Rates | Sahana Villas",
  description:
    "Transparent published villa rates for Sahana Villas in Seminyak, Bali. Low, high and peak season pricing in USD and IDR.",
};

const eyebrowStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.25em",
  textTransform: "uppercase" as const,
};

const seasons = [
  {
    name: "Low Season",
    usd: "$500",
    idr: "8,700,000 IDR",
    nights: "Minimum 2 nights",
  },
  {
    name: "High Season",
    usd: "$550",
    idr: "9,500,000 IDR",
    nights: "Minimum 4 nights",
  },
  {
    name: "Peak Season",
    usd: "$575",
    idr: "9,217,480 IDR",
    nights: "Minimum 7 nights",
  },
];

const seasonDates = [
  {
    label: "High season",
    detail:
      "Chinese New Year, Easter, June 28th to September 8th inclusive",
  },
  {
    label: "Peak season",
    detail: "December 20th 2025 to January 10th 2026",
  },
  {
    label: "Low season",
    detail: "Remaining time of the year",
  },
  {
    label: "Chinese New Year",
    detail: "February 14th to 20th 2026",
  },
  {
    label: "Easter",
    detail: "March 28th to April 8th 2026 inclusive",
  },
];

const includedItems = [
  {
    label: "Airport Transfer in a Private Vehicle",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M5 17h14M5 17l1.5-5h11L19 17M5 17l-1-3h16l-1 3M7 13l1-4h8l1 4" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="16.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  {
    label: "Bathroom Amenities",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 12h16M6 12V8a2 2 0 012-2h1M18 12V8a2 2 0 00-2-2h-1" />
        <path d="M8 20h8M12 12v8" />
      </svg>
    ),
  },
  {
    label: "Daily Continental Breakfast",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 10h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z" />
        <path d="M8 6V4M12 6V4M16 6V4" />
      </svg>
    ),
  },
  {
    label: "Welcome Drink and Chill Towels",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 4h8l-1 14H9L8 4zM10 8h4" />
      </svg>
    ),
  },
  {
    label: "HiFi Sound System",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 010 7M18 6a8 8 0 010 12" />
      </svg>
    ),
  },
  {
    label: "Internet WiFi",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M5 12.55a11 11 0 0114 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
      </svg>
    ),
  },
  {
    label: "Full Staff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20v-1a5 5 0 015-5h2a5 5 0 015 5v1M14 20v-1a3 3 0 013-3h1" />
      </svg>
    ),
  },
  {
    label: "Home Grown Organic Free Flow Coffee",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 8h12v8a4 4 0 01-4 4H10a4 4 0 01-4-4V8zM18 10h1a2 2 0 010 4h-1" />
      </svg>
    ),
  },
  {
    label: "1 Baby Cot and High Chair",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 10h16v8H4zM7 10V7a2 2 0 012-2h6a2 2 0 012 2v3" />
      </svg>
    ),
  },
  {
    label: "Free Flow Mineral Water",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l4 7v9a3 3 0 01-6 0v-9l4-7z" />
      </svg>
    ),
  },
  {
    label: "On-Call Manager",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.57 1.82 2.16 3.28 4.01 3.95" />
      </svg>
    ),
  },
  {
    label: "24 Hours Security",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67bc6a" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
      </svg>
    ),
  },
];

const pleaseNote = [
  "All villa rates including discounted rates include government taxes and charges",
  "For stays with rates of less than USD 350 per night, the Sahana breakfast and airport transfers are not included. The team is happy to shop and prepare for you at your cost",
  "Check in time: from 15:00 onwards",
  "Check out time: 11:00",
  "A regular direct booking includes 1 free airport transfer each way. For additional airport transfers a charge of USD 35 applies each way, with a nighttime surcharge of USD 10 for arrivals after 21:00",
  "Unused airport services are not refundable or re-routable",
];

export default function RatesPage() {
  return (
    <>
      <section
        className="relative -mt-[80px] flex flex-col items-center justify-center px-6 text-center"
        style={{
          height: "40vh",
          minHeight: "280px",
          background:
            "linear-gradient(135deg, #c1bab2 0%, #f5f2ef 50%, #c1bab2 100%)",
        }}
      >
        <div className="relative z-10 max-w-3xl">
          <p className="mb-3 text-[#67bc6a]" style={eyebrowStyle}>
            Transparency First
          </p>
          <h1
            className="mb-4 text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.15,
            }}
          >
            Published Rates
          </h1>
          <p
            className="mb-6 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            All rates include government taxes and charges
          </p>
          <nav
            aria-label="Breadcrumb"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(26, 26, 26, 0.5)",
            }}
          >
            <Link href="/" className="transition-colors hover:text-[#67bc6a]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#1A1A1A]/65">Rates</span>
          </nav>
        </div>
      </section>

      <section className="bg-[#F7F3EE] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {seasons.map((season) => (
              <div
                key={season.name}
                className="card-alive border border-[#c1bab2] bg-white p-8 text-center transition-shadow duration-300"
              >
                <h3
                  className="mb-6 text-[#1A1A1A]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {season.name}
                </h3>
                <p
                  className="mb-2 text-[#1A1A1A]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  {season.usd}
                  <span
                    className="text-[#6B6B6B]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      fontWeight: 300,
                    }}
                  >
                    {" "}
                    / night
                  </span>
                </p>
                <p
                  className="mb-4 text-[#67bc6a]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {season.idr} per night
                </p>
                <p
                  className="text-[#6B6B6B]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 300,
                  }}
                >
                  {season.nights}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mx-auto mt-10 max-w-3xl text-center italic text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Since USD is generally the global industry standard, we have displayed
            it on the website. Transaction prices are always in IDR.
          </p>
        </div>
      </section>

      <section className="bg-[#c1bab2] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2
            className="mb-10 text-center text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            Season Dates
          </h2>
          <div className="space-y-0 overflow-hidden rounded-sm border border-[#1A1A1A]/10 bg-[#f5f2ef]">
            {seasonDates.map((row, index) => (
              <div
                key={row.label}
                className={`flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:gap-6 ${
                  index < seasonDates.length - 1
                    ? "border-b border-[#1A1A1A]/10"
                    : ""
                }`}
              >
                <p
                  className="shrink-0 text-[#1A1A1A] sm:w-40"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {row.label}
                </p>
                <p
                  className="text-[#6B6B6B]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EE] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-3 text-center text-[#67bc6a]" style={eyebrowStyle}>
            Every Stay Includes
          </p>
          <h2
            className="mb-12 text-center text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            What is Included?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="shrink-0">{item.icon}</div>
                <p
                  className="text-[#1A1A1A]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#c1bab2] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2
            className="mb-8 text-center text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            Please Note
          </h2>
          <ul className="space-y-5">
            {pleaseNote.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 text-[#6B6B6B]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#67bc6a]"
                  aria-hidden="true"
                />
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <a
              href="https://sahanavilla.com/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] underline decoration-[#67bc6a]/40 underline-offset-4 transition-colors hover:text-[#67bc6a]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              View our full Terms and Conditions
            </a>
          </p>
        </div>
      </section>

      <section className="bg-[#F7F3EE] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Link
            href="/contact"
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
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
