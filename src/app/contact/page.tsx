import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import VideoPageHero from "@/components/VideoPageHero";
import InquiryForm from "@/components/InquiryForm";
import MapSection from "@/components/MapSection";
import { SITE } from "@/lib/site";

const CONTACT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

const CONTACT_IMAGE =
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354560.jpg?k=6a8de904dbd7d2121d6e233fd5a13746df529ac987d74da48410ae3357898cfa&o=&hp=1";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description:
    "Contact Sun Shoot Villas Seminyak. Call, email, or send a booking enquiry via WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <VideoPageHero
        imageSrc={CONTACT_HERO_IMAGE}
        title="Contact Us"
        subtitle="We are always just a message away"
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
                    style={{ backgroundColor: "#25D366" }}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="group mt-6">
                <div className="relative h-[200px] w-full overflow-hidden rounded-sm md:h-[250px]">
                  <Image
                    src={CONTACT_IMAGE}
                    alt="Sun Shoot Villas Seminyak"
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <p
                  className="mt-2 text-[var(--text-muted)] italic"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    fontWeight: 300,
                  }}
                >
                  Jl. Bidadari II E, Seminyak, Bali
                </p>
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
