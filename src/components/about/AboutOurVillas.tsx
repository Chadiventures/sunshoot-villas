"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

export default function AboutOurVillas() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-site">
        <ScrollReveal className="mx-auto max-w-[800px] text-center">
          <h2
            className="mb-6 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            <AdminEditableText blockKey="our_villas.title" as="span" />
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
            <AdminEditableText blockKey="our_villas.body" allowLineBreaks as="span" />
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
