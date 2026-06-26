const highlights = [
  "15 min walk to Seminyak Beach and KuDeTa",
  "Walking distance to top restaurants and cafes",
  "Easy access to Petitenget Temple and Oberoi Street",
  "30 min from Ngurah Rai International Airport",
];

export default function Location() {
  return (
    <section id="contact" className="bg-[#F7F3EE] py-12 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="h-[300px] w-full overflow-hidden md:aspect-square md:h-auto lg:aspect-[4/5]">
          <iframe
            title="Sahana Villas Seminyak location"
            src="https://maps.google.com/maps?q=-8.685326,115.163366&z=15&output=embed"
            className="h-full w-full border-0 grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div>
          <p
            className="mb-4 text-[#67bc6a]"
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
            The Heart of Seminyak
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
            Sahana Villas sits on the iconic Oberoi Street, placing you at the
            centre of Seminyak&apos;s finest dining, boutique shopping, and
            beach culture. Everything Bali&apos;s most vibrant neighbourhood
            has to offer is right at your doorstep.
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
            Yet step inside your villa and the world fades away. Tropical
            gardens, a private pool, and the sound of birdsong create a cocoon
            of calm just steps from the action.
          </p>

          <ul className="space-y-4">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-[#1A1A1A]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: 1.5,
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
        </div>
      </div>
    </section>
  );
}
