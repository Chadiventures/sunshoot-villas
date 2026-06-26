import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import VillaFacilities from "@/components/villas/VillaFacilities";
import VillaPolicies from "@/components/villas/VillaPolicies";
import { getVillaBySlug, getVillaSlugs } from "@/lib/villas";
import { getVillaContent } from "@/lib/villa-content";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getVillaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) return { title: "Villa Not Found" };
  return {
    title: `${villa.name} | ${SITE.name}`,
    description: villa.description,
  };
}

export default async function VillaDetailPage({ params }: Props) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) notFound();

  const content = getVillaContent(slug);
  const description = content.description || villa.description;
  const gallery = content.galleryImages.length > 0
    ? content.galleryImages
    : [content.heroImage];

  return (
    <>
      <section
        className="relative flex h-[55vh] min-h-[400px] flex-col items-center justify-end overflow-hidden pb-16 text-center"
        style={{ marginTop: "-80px" }}
      >
        <Image
          src={content.heroImage}
          alt={villa.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-4"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Link href="/" className="transition-colors hover:text-[var(--brand-green-light)]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/villas" className="transition-colors hover:text-[var(--brand-green-light)]">
              Villas
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{villa.name}</span>
          </nav>
          <h1
            className="mb-4 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {villa.name}
          </h1>
          <p className="text-white/80" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: 300 }}>
            {villa.bedrooms} · Private pool
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream)]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p
              className="mb-4 text-[var(--brand-green)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              About This Villa
            </p>
            <p
              className="mb-8 text-[var(--muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              {description}
            </p>
            {content.pricing && (
              <div className="mb-8 rounded-[3px] bg-[var(--beige-light)] p-6">
                <p
                  className="mb-2 text-[var(--brand-green)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Pricing
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "15px",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {content.pricing}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {villa.highlights.map((h) => (
                <span
                  key={h}
                  className="border border-[var(--brand-green)] px-3 py-1 text-[var(--brand-green)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p
              className="mb-6 text-[var(--brand-green)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Facilities
            </p>
            <VillaFacilities facilities={villa.facilities} />
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="bg-[var(--beige)]" style={{ padding: "80px 48px" }}>
          <div className="mx-auto max-w-[1400px]">
            <h2
              className="mb-12 text-center text-[var(--dark-green)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 300,
              }}
            >
              Gallery
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative h-[280px] overflow-hidden rounded-[3px]"
                >
                  <Image
                    src={src}
                    alt={`${villa.name} photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--dark-green)]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-[700px]">
          <h2
            className="mb-10 text-center text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 300,
            }}
          >
            Policies
          </h2>
          <VillaPolicies />
        </div>
      </section>

      <section className="bg-[var(--cream)]" style={{ padding: "80px 48px" }}>
        <div className="mx-auto max-w-[600px]">
          <InquiryForm defaultVilla={slug} />
        </div>
      </section>

      <Footer />
    </>
  );
}
