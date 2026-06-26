import Link from "next/link";
import { SITE } from "@/lib/site";

const highlights = [
  "Walking distance to restaurants, supermarkets and salons",
  "Famous Bidadari area of Seminyak",
  "15 min walk to Seminyak Beach",
  "30 min from Ngurah Rai International Airport",
];

export default function Location() {
  return (
    <section id="location" className="bg-[var(--cream)] py-12 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="h-[300px] w-full overflow-hidden md:aspect-square md:h-auto lg:aspect-[4/5]">
          <iframe
            title="Sun Shoot Villas Seminyak location"
            src="https://maps.google.com/maps?q=-8.685326,115.163366&z=15&output=embed"
            className="h-full w-full border-0 grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div>
          <p
            className="mb-4 text-[var(--brand-green)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Where to Find Us
          </p>

          <h2
            className="mb-8 text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            The Bidadari Area of Seminyak
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
            {SITE.name} is located on {SITE.address}. A quiet residential lane
            just minutes from Seminyak&apos;s best restaurants, boutiques, and
            beaches.
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
            Step inside your villa and the world fades away - tropical gardens,
            a private pool, and the gentle rhythm of Balinese life.
          </p>

          <ul className="mb-10 space-y-4">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "#6B6B6B",
                }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-green)]"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>

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
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
