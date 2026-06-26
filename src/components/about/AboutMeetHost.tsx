"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const HOST_PORTRAIT =
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg";

export default function AboutMeetHost() {
  return (
    <section className="bg-[var(--bg)] py-16 md:py-24">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal direction="left">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm lg:mx-0 lg:max-w-none">
              <Image
                src={HOST_PORTRAIT}
                alt="Warren, your host at Sun Shoot Villas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
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
                Warren has been welcoming guests to Seminyak for years, building
                a reputation for warmth, reliability, and going above and beyond.
                Whether it is arranging airport pickup, recommending the best
                local warungs, or simply making sure everything is perfect before
                you arrive, Warren and his team are always just a WhatsApp
                message away. Our guests do not just leave with great memories,
                many come back year after year.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
