"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function AboutMeetHost() {
  return (
    <section className="bg-[var(--bg)] py-16 md:py-24">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal direction="left">
            <div className="rounded-sm border border-[var(--text)]/10 bg-white p-6 shadow-sm md:p-10">
              <h2
                className="mb-6 text-[var(--dark)]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  fontWeight: 300,
                }}
              >
                Meet Warren, Your Host
              </h2>
              <p
                className="text-[var(--text)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
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
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <div
              className="mx-auto flex aspect-[4/5] w-full max-w-md items-center justify-center rounded-sm border-2 border-dashed lg:mx-0 lg:max-w-none"
              style={{
                borderColor: "#C9A96E",
                backgroundColor: "rgba(201, 169, 110, 0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#C9A96E",
                }}
              >
                [ Your photo here ]
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
