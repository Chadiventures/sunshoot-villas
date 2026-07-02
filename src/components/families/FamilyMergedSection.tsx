"use client";

import dynamic from "next/dynamic";
import FamilyFeaturesAccordion from "@/components/families/FamilyFeaturesAccordion";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

const ContactHeroVideo = dynamic(
  () => import("@/components/contact/ContactHeroVideo"),
  {
    loading: () => (
      <div className="absolute inset-0 bg-[#c1bab2]" aria-hidden="true" />
    ),
  },
);

export default function FamilyMergedSection() {
  return (
    <section className="relative overflow-hidden">
      <ContactHeroVideo />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10, 20, 14, 0.10) 0%, rgba(10, 20, 14, 0.60) 30%, rgba(10, 20, 14, 0.80) 100%)",
        }}
      />

      <div className="relative z-10 pb-12 md:pb-16 lg:pb-[100px]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <blockquote
            className="text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            <AdminEditableText blockKey="merged.quote" as="span" />
          </blockquote>

          <div>
            <p
              className="mb-5"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <AdminEditableText blockKey="merged.body_1" as="span" />
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <AdminEditableText blockKey="merged.body_2" as="span" />
            </p>
          </div>
        </div>

        <div
          className="mx-auto my-16 max-w-7xl px-6 lg:px-10"
          style={{
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />

        <FamilyFeaturesAccordion embedded />
      </div>
    </section>
  );
}
