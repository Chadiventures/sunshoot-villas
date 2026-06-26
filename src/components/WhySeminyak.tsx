"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const SEMINYAK_VIDEO =
  "https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4";

const DESTINATIONS = [
  { name: "Seminyak Beach", time: "15 min by taxi" },
  { name: "Kuta Beach", time: "15 min by taxi" },
  { name: "Canggu", time: "20 min by taxi" },
  { name: "Airport", time: "20 min by taxi" },
  { name: "Eat Street (Jl Kayu Aya)", time: "10 min walk" },
  { name: "Seminyak Square", time: "10 min walk" },
  { name: "Potato Head Beach Club", time: "10 min by taxi" },
  { name: "Mexicola", time: "10 min by taxi" },
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
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={SEMINYAK_VIDEO} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <h2
            className="mb-3 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 300,
            }}
          >
            {t.seminyakTitle}
          </h2>
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
            }}
          >
            {t.seminyakSubtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <p
              className="text-white"
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
              Whether you want to catch waves at the legendary surf breaks of
              Batu Bolong or Echo Beach, explore the iconic rice terraces of
              Ubud, dance the night away at one of Seminyak&apos;s famous beach
              clubs, or simply spend the day by your private pool with a cold
              Bintang, Seminyak is the perfect base for your Bali adventure.
            </p>
          </ScrollReveal>

          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {DESTINATIONS.map((dest, index) => (
                <ScrollReveal key={dest.name} delay={100 + index * 60}>
                  <div
                    className="card-lift flex items-center gap-3 rounded-sm border px-3 py-3 sm:px-4 sm:py-4"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <PinIcon />
                    <div className="min-w-0">
                      <p
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {dest.name}
                      </p>
                      <p
                        className="text-white"
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
              className="mt-4 text-center text-white lg:text-left"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Times approximate by Gojek, Grab or scooter
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
