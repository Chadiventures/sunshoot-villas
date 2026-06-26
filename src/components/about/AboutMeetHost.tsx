"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function AboutMeetHost() {
  return (
    <section className="bg-[var(--bg)] py-12 md:py-16">
      <div className="container-site">
        <div className="grid grid-cols-[2fr_3fr] items-stretch gap-3 lg:grid-cols-2 lg:items-center lg:gap-14">
          <ScrollReveal direction="left" className="h-full min-h-0">
            <div
              className="flex h-full min-h-[120px] w-full items-center justify-center overflow-hidden rounded-sm border-2 border-dashed lg:aspect-[4/5] lg:max-w-none"
              style={{
                borderColor: "#C9A96E",
                backgroundColor: "rgba(201, 169, 110, 0.1)",
              }}
            >
              <p
                className="px-2 text-center"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#C9A96E",
                }}
              >
                <span className="lg:hidden">[ Photo ]</span>
                <span className="hidden lg:inline" style={{ fontSize: "1rem" }}>
                  [ Your photo here ]
                </span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100} className="h-full min-h-0">
            <div className="flex h-full flex-col justify-center rounded-sm border border-[var(--text)]/10 bg-white p-3 shadow-sm md:p-10">
              <h2
                className="mb-3 text-[var(--dark)] lg:mb-6"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.125rem, 4vw, 2.25rem)",
                  fontWeight: 300,
                }}
              >
                Meet Warren, Your Host
              </h2>
              <p
                className="text-[var(--text)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                <span className="lg:hidden">
                  Warren is originally from Perth, Australia and has been living
                  in Bali for over 9 years. Together with his wife Lianah, he
                  manages the Sunshoot Villas complex with a small dedicated team.
                  Warren speaks English and some Indonesian, Lianah speaks both
                  Indonesian and English fluently, and the team can assist in other
                  languages using online translation. Warren and Lianah are
                  passionate about giving every guest personal attention and
                  making sure your Bali holiday is everything you hoped for. They
                  are always contactable via WhatsApp, even outside of regular
                  hours, so you never have to worry if something comes up during
                  your stay.
                </span>
                <span className="hidden lg:inline" style={{ fontSize: "1rem", lineHeight: 1.85 }}>
                  Warren is originally from Perth, Australia and has been living
                  in Bali for over 9 years. Together with his wife Lianah, he
                  manages the Sunshoot Villas complex with a small dedicated team.
                  Warren speaks English and some Indonesian, Lianah speaks both
                  Indonesian and English fluently, and the team can assist in other
                  languages using online translation. Warren and Lianah are
                  passionate about giving every guest personal attention and
                  making sure your Bali holiday is everything you hoped for. They
                  are always contactable via WhatsApp, even outside of regular
                  hours, so you never have to worry if something comes up during
                  your stay.
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
