"use client";

import ScrollReveal from "@/components/ScrollReveal";

const DESTINATIONS = [
  { name: "Canggu", time: "20 min" },
  { name: "Berawa", time: "15 min" },
  { name: "Kuta", time: "15 min" },
  { name: "Airport", time: "20 min" },
  { name: "Ubud", time: "1 hour" },
  { name: "Uluwatu", time: "45 min" },
];

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[var(--sand)]"
      aria-hidden="true"
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function WhySeminyak() {
  return (
    <section className="bg-[var(--bg)] py-14 md:py-20">
      <div className="container-site">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <h2
            className="mb-3 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 300,
            }}
          >
            Why Seminyak?
          </h2>
          <p
            className="text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
            }}
          >
            Perfectly positioned in the heart of Bali
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <p
              className="text-[var(--text)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.85,
              }}
            >
              Seminyak is one of Bali&apos;s most sought-after destinations,
              known for its world-class restaurants, vibrant beach clubs,
              boutique shopping, and stunning sunsets. Staying in Seminyak puts
              you right in the middle of everything Bali has to offer. Canggu
              and Berawa are just a short Gojek or Grab ride away to the north,
              while Kuta and the airport are easily accessible to the south.
              Whether you want to surf the famous breaks at Echo Beach, explore
              the rice terraces of Ubud, or simply spend the day by your private
              pool with a cold Bintang, Seminyak is the perfect base.
            </p>
          </ScrollReveal>

          <div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {DESTINATIONS.map((dest, index) => (
                <ScrollReveal key={dest.name} delay={100 + index * 60}>
                  <div className="card-lift flex items-center gap-3 rounded-sm border border-[var(--text)]/10 bg-white px-3 py-3 sm:px-4 sm:py-4">
                    <PinIcon />
                    <div className="min-w-0">
                      <p
                        className="text-[var(--dark)]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {dest.name}
                      </p>
                      <p
                        className="text-[var(--sand)]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.75rem",
                          fontWeight: 400,
                        }}
                      >
                        {dest.time}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p
              className="mt-4 text-center text-[var(--text-muted)] lg:text-left"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Times approximate by Gojek or Grab
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
