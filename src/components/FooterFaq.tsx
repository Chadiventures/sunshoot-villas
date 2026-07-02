"use client";

import { useState } from "react";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { FAQ_ITEM_IDS } from "@/lib/cmsDefaults";

function FaqItem({
  id,
  isOpen,
  onToggle,
}: {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full min-h-[48px] items-center justify-between gap-4 py-4 text-left transition-colors duration-300 ease-in-out"
      >
        <span
          className="text-[#C9A96E]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.9375rem",
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          <AdminEditableText blockKey={`faq.${id}.question`} as="span" />
        </span>
        <span
          className="shrink-0 text-[#C9A96E] transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="pb-4">
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              fontWeight: 300,
              lineHeight: 1.75,
            }}
          >
            <AdminEditableText blockKey={`faq.${id}.answer`} as="span" />
          </p>
        </div>
      )}
    </div>
  );
}

export default function FooterFaq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div id="faq" className="scroll-mt-28 mt-12 border-t border-white/10 pt-10 md:pt-12">
      <div className="py-2 md:py-4">
        <h2
          className="mb-6 text-center text-white md:mb-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 300,
          }}
        >
          <AdminEditableText blockKey="section.title" as="span" />
        </h2>

        <div className="mx-auto w-full max-w-3xl">
          {FAQ_ITEM_IDS.map((id) => (
            <FaqItem
              key={id}
              id={id}
              isOpen={openId === id}
              onToggle={() => setOpenId(openId === id ? null : id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
