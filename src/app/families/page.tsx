import type { Metadata } from "next";
import Link from "next/link";
import FamilyMergedSection from "@/components/families/FamilyMergedSection";
import FamilyLocationHighlights from "@/components/families/FamilyLocationHighlights";
import FamilySafetyCarousel from "@/components/families/FamilySafetyCarousel";
import Footer from "@/components/Footer";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("families");
}


export default async function FamiliesPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("families", locale);
  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="families">
        <>
          <section
            className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-0 text-center"
            style={{
              marginTop: "calc(-1 * var(--site-chrome-h))",
              paddingTop: "var(--site-chrome-h)",
              height: "35vh",
              minHeight: "280px",
              background:
                "linear-gradient(135deg, #c1bab2 0%, #f5f2ef 50%, #c1bab2 100%)",
            }}
          >
            <div className="relative z-10 max-w-3xl">
              <p
                className="mb-3 text-[#67bc6a]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                <AdminEditableText blockKey="hero.eyebrow" as="span" />
              </p>

              <h1
                className="mb-4 whitespace-normal text-[#1A1A1A] md:whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 3.5vw, 52px)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                <AdminEditableText blockKey="hero.title" as="span" />
              </h1>

              <p
                className="mb-6"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(26, 26, 26, 0.75)",
                }}
              >
                <AdminEditableText blockKey="hero.subtitle" as="span" />
              </p>

              <nav
                aria-label="Breadcrumb"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(26, 26, 26, 0.5)",
                }}
              >
                <Link href="/" className="transition-colors hover:text-[#67bc6a]">
                  <AdminEditableText blockKey="breadcrumb.home" as="span" />
                </Link>
                <span className="mx-2">/</span>
                <span className="text-[#1A1A1A]/65">
                  <AdminEditableText blockKey="breadcrumb.current" as="span" />
                </span>
              </nav>
            </div>
          </section>

          <FamilyMergedSection />

          <FamilySafetyCarousel />

          <FamilyLocationHighlights />

          <section className="bg-[#F7F3EE] py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
              <h2
                className="mb-8 text-[#1A1A1A]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 300,
                  lineHeight: 1.25,
                }}
              >
                <AdminEditableText blockKey="cta.title" as="span" />
              </h2>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/book"
                  className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  <AdminEditableText blockKey="cta.primary" as="span" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-alive inline-block border border-[#1A1A1A] px-10 py-3.5 text-[#1A1A1A] transition-all duration-300 hover:border-[#67bc6a] hover:text-[#67bc6a]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  <AdminEditableText blockKey="cta.secondary" as="span" />
                </Link>
              </div>

              <p
                className="mt-6 text-[#6B6B6B]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 300,
                }}
              >
                <AdminEditableText blockKey="cta.note" as="span" />
              </p>
            </div>
          </section>

          <Footer />
        </>
      </AdminBlockPage>
    </ServerPageContent>
  );
}
