import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import MapSection from "@/components/MapSection";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description:
    "Contact Sun Shoot Villas Seminyak. Call, email, or send a booking enquiry via WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Send an enquiry and we'll get back to you promptly."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="bg-[var(--bg)] py-16 md:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                className="mb-8 text-[var(--dark)]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.75rem",
                  fontWeight: 300,
                }}
              >
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="section-eyebrow mb-1">Phone</p>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="text-[var(--text)] transition-colors hover:text-[var(--sand)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    {SITE.phone}
                  </a>
                </div>
                <div>
                  <p className="section-eyebrow mb-1">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[var(--text)] transition-colors hover:text-[var(--sand)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <p className="section-eyebrow mb-1">Address</p>
                  <p
                    className="text-[var(--text-muted)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "1rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {SITE.address}
                  </p>
                </div>
                <div>
                  <p className="section-eyebrow mb-1">WhatsApp</p>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-block"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-sm bg-white p-6 shadow-sm md:p-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <Footer />
    </>
  );
}
