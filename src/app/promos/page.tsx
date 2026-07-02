import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Footer from "@/components/Footer";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import ServerPageContent from "@/components/admin/ServerPageContent";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { getPageCmsContentBlocks } from "@/lib/pageCms";
import { getRequestLocale } from "@/lib/requestLocale";
import { buildPageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("promos");
}

const PromosHeroVideo = dynamic(
  () => import("@/components/promos/PromosHeroVideo"),
  {
    loading: () => (
      <div
        className="absolute inset-0 h-full w-full bg-[#c1bab2]"
        aria-hidden="true"
      />
    ),
  },
);

const eyebrowStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.25em",
  textTransform: "uppercase" as const,
};

const buttonStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

function PromoVisual({
  titleBlockKey,
  subtitleBlockKey,
}: {
  titleBlockKey: string;
  subtitleBlockKey: string;
}) {
  return (
    <div
      className="relative flex min-h-[280px] flex-col items-center justify-center p-8 text-center md:min-h-full"
      style={{
        background:
          "linear-gradient(135deg, #1A1A1A 0%, #3d4a42 50%, #1A1A1A 100%)",
      }}
    >
      <p
        className="mb-2 text-white"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          lineHeight: 1.6,
        }}
      >
        <AdminEditableText blockKey={titleBlockKey} as="span" />
      </p>
      <p
        className="mb-4 text-[#67bc6a]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.15em",
        }}
      >
        <AdminEditableText blockKey={subtitleBlockKey} as="span" />
      </p>
      <p className="text-[#67bc6a]" style={{ fontSize: "18px" }} aria-hidden="true">
        ★★★★★
      </p>
    </div>
  );
}

interface PromoSectionProps {
  imageFirst: boolean;
  keyPrefix: string;
  bulletCount: number;
  hasDescription?: boolean;
  bgClass: string;
}

function PromoSection({
  imageFirst,
  keyPrefix,
  bulletCount,
  hasDescription = false,
  bgClass,
}: PromoSectionProps) {
  const visual = (
    <div className="card-alive overflow-hidden">
      <PromoVisual
        titleBlockKey={`${keyPrefix}.visual_title`}
        subtitleBlockKey={`${keyPrefix}.visual_subtitle`}
      />
    </div>
  );

  const content = (
    <div className={`flex flex-col justify-center px-6 py-10 md:px-12 md:py-14 ${bgClass}`}>
      <h2
        className="mb-6 text-[#1A1A1A]"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
        }}
      >
        <AdminEditableText blockKey={`${keyPrefix}.heading`} as="span" />
      </h2>
      {hasDescription && (
        <p
          className="mb-6 text-[#6B6B6B]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.8,
          }}
        >
          <AdminEditableText blockKey={`${keyPrefix}.description`} as="span" />
        </p>
      )}
      <ul className="mb-8 space-y-3">
        {Array.from({ length: bulletCount }, (_, i) => (
          <li
            key={`${keyPrefix}.bullet_${i + 1}`}
            className="flex items-start gap-3 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#67bc6a]"
              aria-hidden="true"
            />
            <AdminEditableText blockKey={`${keyPrefix}.bullet_${i + 1}`} as="span" />
          </li>
        ))}
      </ul>
      <Link
        href="/book"
        className="btn-alive inline-block w-fit border border-[#67bc6a] bg-[#67bc6a] px-8 py-3 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
        style={buttonStyle}
      >
        <AdminEditableText blockKey={`${keyPrefix}.button`} as="span" />
      </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {imageFirst ? (
        <>
          {visual}
          {content}
        </>
      ) : (
        <>
          {content}
          {visual}
        </>
      )}
    </div>
  );
}

export default async function PromosPage() {
  const locale = await getRequestLocale();
  const cms = await getPageCmsContentBlocks("promos", locale);
  return (
    <ServerPageContent content={cms}>
      <AdminBlockPage pageSlug="promos">
        <>
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          marginTop: "calc(-1 * var(--site-chrome-h))",
          paddingTop: "var(--site-chrome-h)",
          height: "40vh",
          minHeight: "280px",
        }}
      >
        <PromosHeroVideo />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(28, 46, 32, 0.65)" }}
        />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-3 text-[#67bc6a]" style={eyebrowStyle}>
            <AdminEditableText blockKey="hero.eyebrow" as="span" />
          </p>
          <h1
            className="mb-4 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.15,
            }}
          >
            <AdminEditableText blockKey="hero.title" as="span" />
          </h1>
          <p
            className="mb-6 text-white/75"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.7,
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
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <Link href="/" className="transition-colors hover:text-[#67bc6a]">
              <AdminEditableText blockKey="breadcrumb.home" as="span" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">
              <AdminEditableText blockKey="breadcrumb.current" as="span" />
            </span>
          </nav>
        </div>
      </section>

      <section className="bg-[#F7F3EE] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p
            className="text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.85,
            }}
          >
            <AdminEditableText blockKey="intro.body" allowLineBreaks as="span" />
          </p>
        </div>
      </section>

      <section>
        <PromoSection
          imageFirst
          keyPrefix="promo.usd"
          bulletCount={3}
          bgClass="bg-[#F7F3EE]"
        />

        <PromoSection
          imageFirst={false}
          keyPrefix="promo.aud"
          hasDescription
          bulletCount={2}
          bgClass="bg-[#c1bab2]"
        />

        <PromoSection
          imageFirst
          keyPrefix="promo.sgd"
          bulletCount={3}
          bgClass="bg-[#F7F3EE]"
        />

        <PromoSection
          imageFirst={false}
          keyPrefix="promo.idr"
          bulletCount={3}
          bgClass="bg-[#c1bab2]"
        />
      </section>

      <section className="bg-[#c1bab2] py-12 md:py-16 lg:py-20">
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
          <Link
            href="/contact"
            className="btn-alive inline-block border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
            style={buttonStyle}
          >
            <AdminEditableText blockKey="cta.button" as="span" />
          </Link>
          <p
            className="mt-6 text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 300,
            }}
          >
            <AdminEditableText blockKey="cta.note" as="span" />{" "}
            <a
              href="https://wa.me/628113882070"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] transition-colors hover:text-[#67bc6a]"
            >
              <AdminEditableText blockKey="cta.whatsapp" as="span" />
            </a>
          </p>
        </div>
      </section>

      <Footer />
        </>
      </AdminBlockPage>
    </ServerPageContent>
  );
}
