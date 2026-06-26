const features = [
  {
    title: "Prime Seminyak Location",
    description:
      "Walking distance to restaurants, supermarkets, salons and Seminyak Beach in the famous Bidadari area.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Private Pool",
    description:
      "Every villa comes with its own private pool - your personal oasis steps from your living room.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
        <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
      </svg>
    ),
  },
  {
    title: "Personal Service",
    description:
      "Luxury without the corporate hotel feel - genuine Balinese warmth and attentive hospitality.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Airport Pickup Included",
    description:
      "Start your holiday stress-free with complimentary airport pickup arranged for your arrival.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 19 4c-1 0-2 1-3.5 2.5L12 10 3.8 8.2" />
        <path d="M3.8 8.2L2 16l8.2 1.8" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[var(--dark)] py-20 md:py-28">
      <div className="container-site">
        <div className="mb-14 text-center">
          <p className="section-eyebrow mb-3">Why Choose Us</p>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 300,
            }}
          >
            The Sun Shoot Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--sand)] text-[var(--sand)]">
                {feature.icon}
              </div>
              <h3
                className="mb-3 text-white"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-white/65"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
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
  );
}
