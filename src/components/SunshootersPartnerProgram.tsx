const BENEFITS = [
  "10% OFF all food and drinks",
  "Free welcome drink (juice, soda, tea or coffee)",
  "VIP priority seating, even on busy nights",
  "Priority villa delivery for breakfast, lunch and dinner",
  "English-speaking team and premium hospitality standards",
];

export default function SunshootersPartnerProgram() {
  return (
    <section className="bg-[var(--bg)] py-14 md:py-20">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex justify-center md:justify-start">
            <img
              src="/sunshooters-logo.png"
              alt="Sunshooters Villa Partner Program"
              width={120}
              height={120}
              className="h-auto w-[120px]"
              style={{
                filter: "drop-shadow(0 0 18px rgba(201, 169, 110, 0.45))",
              }}
            />
          </div>

          <div className="text-center md:text-left">
            <p
              className="mb-2 text-[var(--sand)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Official Partner Villas
            </p>
            <h2
              className="mb-4 text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 300,
              }}
            >
              Sunshooters Villa Partner Program
            </h2>
            <p
              className="mb-6 text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              As an official partner of the Sunshooters Villa Partner Program, our
              guests enjoy exclusive perks at Sunshooters Bar and Grill, located
              just steps away.
            </p>

            <ul className="mx-auto mb-6 w-fit space-y-2.5 text-left md:mx-0">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-[var(--text)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A96E]"
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <p
              className="text-[var(--text-muted)] italic"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Simply mention your villa name when ordering or arriving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
