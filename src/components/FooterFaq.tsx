"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

const FAQ_ITEMS = [
  {
    id: "guests",
    question: "How many guests can stay in each villa?",
    answer:
      "All four villas have 2 bedrooms and can comfortably accommodate 4 guests. Baby cribs are available free of charge on request, and extra beds can be arranged for Rp 150,000 per person per night.",
  },
  {
    id: "airport",
    question: "Is airport transfer included?",
    answer:
      "Yes! We offer free airport transfer for all guests. Our friendly driver will be waiting for you when you land so you can start your Bali holiday stress free.",
  },
  {
    id: "pools",
    question: "Do the villas have private pools?",
    answer:
      "Yes, every villa has its own private pool. Your pool is exclusively for your group during your stay.",
  },
  {
    id: "checkin",
    question: "What time is check-in and check-out?",
    answer:
      "Check-in is from 14:00. Check-out is by 11:00. If you need a different arrangement please contact Warren in advance and we will do our best to accommodate you.",
  },
  {
    id: "wifi",
    question: "Is WiFi available?",
    answer:
      "Yes, all villas have free high speed WiFi. Villa Anggrek has ultrafast 20Mbps fiber optic broadband, ideal for remote work or streaming.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard and cash.",
  },
  {
    id: "pets",
    question: "Are pets allowed?",
    answer: "Unfortunately we do not allow pets at our villas.",
  },
  {
    id: "parties",
    question: "Can I host a party or event at the villa?",
    answer:
      "Parties and events are not permitted. Quiet hours are between 00:00 and 07:00.",
  },
  {
    id: "cleaning",
    question: "Is daily cleaning included?",
    answer:
      "Yes, our team provides daily cleaning for all villas at no extra charge.",
  },
  {
    id: "pool-privacy",
    question: "Are the pools private? Can neighbours see in?",
    answer:
      "Every villa has its own completely private pool. The pool areas are fully enclosed and no one can see in from outside. You can relax in and around your pool without any concerns.",
  },
  {
    id: "connect-villas",
    question: "Can Villa Mawar and Villa Anggrek be connected?",
    answer:
      "Yes! Villa Mawar and Villa Anggrek are located side by side and can be connected by opening a shared door between the pool areas. This makes them perfect for larger groups or families travelling together who want separate spaces but easy access to each other.",
  },
  {
    id: "pool-cleaning",
    question: "How often are the pools cleaned?",
    answer:
      "The pools are cleaned twice a week and always freshly cleaned before new guests check in.",
  },
  {
    id: "ac",
    question: "Do all bedrooms have air conditioning?",
    answer:
      "Yes, every bedroom in all four villas has its own air conditioning unit.",
  },
  {
    id: "beach-walk",
    question: "Is the beach within walking distance?",
    answer:
      "The beach is approximately a 20 minute walk from the villas. Restaurants and cafes are within easy walking distance, and there are 3 breakfast spots within 500 metres.",
  },
  {
    id: "sandat-guests",
    question: "How many guests can stay in Villa Sandat?",
    answer:
      "Villa Sandat can comfortably accommodate up to 5 guests. It is our largest villa at 190 m2 and is ideal for families or groups of 4 to 5 people.",
  },
  {
    id: "two-floors",
    question: "Do all villas have two floors?",
    answer:
      "Yes, the villas have two floors with one bedroom upstairs and one bedroom downstairs, giving guests extra privacy.",
  },
  {
    id: "multiple-villas",
    question: "Can two villas be booked for a larger group?",
    answer:
      "Yes, we can accommodate larger groups by booking multiple villas. Villa Mawar and Villa Anggrek can be connected for groups of up to 10 guests. Contact Warren on WhatsApp to arrange this.",
  },
  {
    id: "breakfast",
    question: "Is breakfast included?",
    answer:
      "Breakfast is not included but there are excellent breakfast spots within a short walk of the villas. Warren is happy to recommend his favourites.",
  },
  {
    id: "contact",
    question: "How do I contact Warren?",
    answer: `The easiest way is via WhatsApp at ${SITE.phone}. Warren and Lianah are always available, even outside regular hours.`,
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
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
          {question}
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
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FooterFaq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="border-t border-white/10 bg-[var(--dark)]">
      <div className="container-site py-10 md:py-12">
        <h2
          className="mb-6 text-center text-white md:mb-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 300,
          }}
        >
          Frequently Asked Questions
        </h2>

        <div className="mx-auto w-full max-w-3xl">
          {FAQ_ITEMS.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() =>
                setOpenId(openId === item.id ? null : item.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
