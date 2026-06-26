import Image from "next/image";
import Link from "next/link";
import { VILLAS } from "@/lib/villas";
import { VILLA_IMAGES } from "@/lib/media";

export default function VillaCards({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="bg-[var(--bg)] py-20 md:py-28">
      <div className="container-site">
        {showHeader && (
          <div className="mb-14 text-center">
            <p className="section-eyebrow mb-3">Our Collection</p>
            <h2 className="section-heading">Four Private Pool Villas</h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Each villa offers two bedrooms, a private pool, and the warmth of
              personal Balinese hospitality in Seminyak&apos;s Bidadari area.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {VILLAS.map((villa) => (
            <article
              key={villa.slug}
              className="card-lift group overflow-hidden rounded-sm bg-white shadow-sm"
            >
              <div className="img-zoom-wrap relative h-56 overflow-hidden sm:h-64">
                <Image
                  src={VILLA_IMAGES[villa.slug]}
                  alt={villa.name}
                  fill
                  className="zoom-target object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <p
                  className="mb-2 text-[var(--sand)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  2 Bedrooms | Private Pool
                </p>
                <h3
                  className="mb-3 text-[var(--dark)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                  }}
                >
                  {villa.name}
                </h3>
                <p
                  className="mb-6 text-[var(--text-muted)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {villa.description.length > 140
                    ? `${villa.description.slice(0, 140)}…`
                    : villa.description}
                </p>
                <Link
                  href={`/villas/${villa.slug}`}
                  className="btn-outline-dark btn-hover !px-6 !py-2.5 !text-[10px]"
                >
                  View Villa
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
