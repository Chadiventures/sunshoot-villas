import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms and Conditions | ${SITE.name}`,
  description:
    "Terms and conditions for booking and staying at Sun Shoot Villas Seminyak, private pool villas in Bali.",
};

const sectionHeadingStyle = {
  fontFamily: "var(--font-cormorant)",
  fontSize: "1.5rem",
  fontWeight: 400,
} as const;

const bodyStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.9375rem",
  fontWeight: 300,
  lineHeight: 1.8,
} as const;

const TERMS_SECTIONS = [
  {
    title: "General",
    content: [
      "These terms and conditions apply to all bookings at Sun Shoot Villas Seminyak, located at Jalan Bidadari II E, 80361 Seminyak, Indonesia, operated by Warren and Lianah.",
      "Sun Shoot Villas offers private villa accommodation. Each booking rents an entire villa with its own private pool. The full property included in your reservation is for the exclusive use of your party for the duration of your stay.",
    ],
  },
  {
    title: "Check-in and Check-out",
    content: [
      "Check-in is from 14:00. Check-out is by 11:00.",
      "Guests must inform the property of their expected arrival time in advance so that check-in can be arranged smoothly.",
    ],
  },
  {
    title: "Cancellation and Prepayment",
    content: [
      "Cancellation and prepayment policies vary depending on the room or villa type and the rate selected at the time of booking.",
      "Guests must review and confirm the specific cancellation and prepayment conditions applicable to their reservation before completing a booking.",
    ],
  },
  {
    title: "Children and Extra Beds",
    content: [
      "Children of all ages are welcome.",
      "Children aged 6 and older are charged at adult rates.",
      "An extra bed is available for IDR 150,000 per person per night, subject to availability.",
      "A baby crib is available free of charge on request, subject to availability.",
    ],
  },
  {
    title: "Accepted Payment Methods",
    content: ["We accept Visa, Mastercard, and cash."],
  },
  {
    title: "House Rules",
    content: [
      "No parties or events are allowed.",
      "Quiet hours are from 00:00 to 07:00.",
      "Pets are not allowed.",
    ],
  },
  {
    title: "Pool",
    content: [
      "Each villa has a private pool available for guest use.",
      "The pool is open year round.",
      "The pool area is fenced for privacy and safety.",
      "A shallow zone is available where applicable.",
    ],
  },
  {
    title: "Damage and Liability",
    content: [
      "Guests are responsible for any damage caused to the villa, its furnishings, equipment, or grounds during their stay.",
      "The property reserves the right to charge guests for repair or replacement costs arising from damage caused by the guest or members of their party.",
    ],
  },
  {
    title: "Privacy",
    content: [
      "Guest information collected during the booking and stay process is handled in accordance with applicable privacy laws.",
      "Personal details are used only for purposes related to your reservation, communication, and the management of your stay.",
    ],
  },
  {
    title: "Contact",
    content: [
      "For questions about these terms and conditions or your booking, please contact Warren and Lianah via WhatsApp.",
      "Full contact details are provided in your booking confirmation.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms and Conditions"
        subtitle="Booking and stay policies for Sun Shoot Villas Seminyak"
      />

      <section className="bg-[var(--bg)] py-14 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <p
              className="mb-10 text-[var(--text-muted)]"
              style={bodyStyle}
            >
              Please read these terms carefully before booking. By confirming a
              reservation at Sun Shoot Villas Seminyak, you agree to the
              conditions set out below.
            </p>

            <div className="space-y-10">
              {TERMS_SECTIONS.map((section) => (
                <article key={section.title}>
                  <h2
                    className="mb-4 text-[var(--dark)]"
                    style={sectionHeadingStyle}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-3 text-[var(--text)]">
                    {section.content.map((paragraph) => (
                      <p key={paragraph} style={bodyStyle}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <p
              className="mt-12 text-[var(--text-muted)]"
              style={bodyStyle}
            >
              Questions?{" "}
              <Link
                href="/contact"
                className="text-[var(--sand)] transition-colors hover:text-[var(--dark)]"
              >
                Contact us
              </Link>{" "}
              or message Warren and Lianah on{" "}
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--sand)] transition-colors hover:text-[var(--dark)]"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
