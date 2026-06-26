import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { VILLAS } from "@/lib/villas";
import { readVillaContent } from "@/lib/villa-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Our Villas | ${SITE.name}`,
  description:
    "Four private pool villas in Seminyak, Bali. Villa Mawar, Jepun, Anggrek and Sandat — each with its own character and Balinese charm.",
};

const eyebrowStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.25em",
  textTransform: "uppercase" as const,
};

const ctaButtonStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

export default function VillasPage() {
  const content = readVillaContent();

  return (
    <>
      <section
        className="relative flex h-[60vh] min-h-[400px] flex-col items-center justify-end overflow-hidden pb-16 text-center"
        style={{ marginTop: "-80px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80"
          alt="Sun Shoot Villas Seminyak"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <p className="mb-4 text-[var(--brand-green-light)]" style={eyebrowStyle}>
            Seminyak, Bali
          </p>
          <h1
            className="mb-6 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(36px, 8vw, 72px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.15,
            }}
          >
            Our Villas
          </h1>
          <p
            className="text-white/85"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Four private pool villas in the Bidadari area — each with its own
            character, all with the warmth of personal Balinese hospitality.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-center text-[var(--brand-green)]" style={eyebrowStyle}>
            Choose Your Villa
          </p>
          <h2
            className="mb-16 text-center text-[var(--dark-green)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
            }}
          >
            Four Villas. One Beautiful Complex.
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {VILLAS.map((villa) => {
              const villaContent = content[villa.slug];
              return (
                <Link
                  key={villa.slug}
                  href={`/villas/${villa.slug}`}
                  className="card-alive group overflow-hidden rounded-[3px] bg-white"
                >
                  <div className="relative h-[280px] overflow-hidden">
                    <Image
                      src={villaContent?.heroImage ?? villaContent?.galleryImages?.[0] ?? ""}
                      alt={villa.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <p className="mb-2 text-[var(--brand-green)]" style={eyebrowStyle}>
                      {villa.bedrooms}
                    </p>
                    <h3
                      className="mb-3 text-[var(--dark-green)]"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "1.75rem",
                        fontWeight: 300,
                      }}
                    >
                      {villa.name}
                    </h3>
                    <p
                      className="mb-4 text-[var(--muted)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                        fontWeight: 300,
                        lineHeight: 1.7,
                      }}
                    >
                      {villaContent?.description ?? villa.description}
                    </p>
                    {villaContent?.pricing && (
                      <p
                        className="mb-4 text-[var(--terracotta)]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "13px",
                          fontWeight: 400,
                        }}
                      >
                        {villaContent.pricing}
                      </p>
                    )}
                    <span
                      className="text-[var(--brand-green)] transition-colors group-hover:text-[var(--brand-green-hover)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      View Villa →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--beige)]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="mb-8 text-[var(--dark-green)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Ready to Book Your Stay?
          </h2>
          <Link
            href="/contact"
            className="btn-alive inline-block border border-[var(--brand-green)] bg-[var(--brand-green)] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[var(--brand-green-hover)]"
            style={ctaButtonStyle}
          >
            Send an Enquiry
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
