"use client";

import { useState } from "react";
import { GLOBAL_POLICIES } from "@/lib/site";

const policies = [
  {
    id: "checkin",
    title: "Check-in & Check-out",
    content: `Check-in: ${GLOBAL_POLICIES.checkIn}. Check-out: ${GLOBAL_POLICIES.checkOut}.`,
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: GLOBAL_POLICIES.payment,
  },
  {
    id: "smoking",
    title: "Smoking Policy",
    content: GLOBAL_POLICIES.smoking,
  },
  {
    id: "cancellation",
    title: "Cancellation",
    content: GLOBAL_POLICIES.cancellation,
  },
];

export default function VillaPagePolicies() {
  const [openId, setOpenId] = useState<string | null>("checkin");

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container-site">
        <h2
          className="mb-8 text-center text-[var(--dark)] md:mb-10"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 300,
          }}
        >
          Guest Policies
        </h2>

        <div className="mx-auto max-w-2xl space-y-3">
          {policies.map((policy) => {
            const isOpen = openId === policy.id;
            return (
              <div
                key={policy.id}
                className="overflow-hidden rounded-sm border border-[var(--text)]/10 bg-[var(--bg)]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenId(isOpen ? null : policy.id)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span
                    className="text-[var(--dark)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    {policy.title}
                  </span>
                  <span
                    className="shrink-0 text-[var(--sand)] transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--text)]/8 px-4 py-4 sm:px-5">
                    <p
                      className="text-[var(--text-muted)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.875rem",
                        fontWeight: 300,
                        lineHeight: 1.7,
                      }}
                    >
                      {policy.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
