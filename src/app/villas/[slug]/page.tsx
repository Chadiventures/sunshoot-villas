import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import VillaFacilities from "@/components/villas/VillaFacilities";
import VillaPolicies from "@/components/villas/VillaPolicies";
import { getVillaBySlug, getVillaSlugs } from "@/lib/villas";
import { VILLA_IMAGES } from "@/lib/media";
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

  const heroImage = VILLA_IMAGES[slug] ?? VILLA_IMAGES.mawar;

  return (
    <>
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <Image
          src={heroImage}
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
              "linear-gradient(to top, rgba(26,46,26,0.85) 0%, rgba(26,46,26,0.3) 60%)",
          }}
        />
        <div className="absolute right-0 bottom-0 left-0 p-6 md:p-10">
          <div className="container-site">
            <p
              className="mb-2 text-[var(--sand)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {villa.bedrooms} · Private Pool
            </p>
            <h1
              className="text-white"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
              }}
            >
              {villa.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-6 text-[var(--dark)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.75rem",
                fontWeight: 300,
              }}
            >
              About This Villa
            </h2>
            <p
              className="text-[var(--text-muted)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              {villa.description}
            </p>
            {villa.highlights.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {villa.highlights.map((h) => (
                  <span
                    key={h}
                    className="border border-[var(--sand)] px-3 py-1 text-[var(--sand)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-site">
          <h2
            className="mb-8 text-center text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 300,
            }}
          >
            Facilities
          </h2>
          <div className="mx-auto max-w-3xl">
            <VillaFacilities facilities={villa.facilities} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-xl">
            <InquiryForm
              defaultVilla={slug}
              hideVillaSelect
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--dark)] py-16 md:py-20">
        <div className="container-site">
          <h2
            className="mb-10 text-center text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 300,
            }}
          >
            Policies
          </h2>
          <div className="mx-auto max-w-3xl">
            <VillaPolicies />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
