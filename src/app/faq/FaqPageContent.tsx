"use client";

import FooterFaq from "@/components/FooterFaq";
import { AdminEditableText } from "@/components/admin/AdminEditableText";

export default function FaqPageContent() {
  return (
    <div
      className="min-h-screen bg-[#1A2E1A]"
      style={{ paddingTop: "calc(var(--site-chrome-h) + 3rem)" }}
    >
      <div className="container-site pb-16">
        <h1
          className="mb-8 text-center text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
          }}
        >
          <AdminEditableText blockKey="page.title" as="span" />
        </h1>
        <FooterFaq />
      </div>
    </div>
  );
}
