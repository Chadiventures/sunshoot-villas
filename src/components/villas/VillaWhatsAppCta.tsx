"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

type VillaWhatsAppCtaProps = {
  villaName: string;
};

const WHATSAPP = "6281239701978";

function WhatsAppLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="#25D366"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function VillaWhatsAppCta({ villaName }: VillaWhatsAppCtaProps) {
  const { t } = useLanguage();
  const message = `Hi! I am interested in ${villaName}. Could you please send me more information about availability and pricing?`;

  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="bg-[var(--bg)] py-14 md:py-20">
      <div className="container-site">
        <ScrollReveal className="mx-auto max-w-lg px-4 text-center">
          <div className="mb-5 flex justify-center">
            <WhatsAppLogo />
          </div>
          <h2
            className="mb-3 text-[var(--dark)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 400,
            }}
          >
            Interested in {villaName}?
          </h2>
          <p
            className="mb-8 text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Send us a message on WhatsApp and we will get back to you within a
            few hours.
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="btn-hover w-full rounded-sm bg-[#25D366] px-6 py-4 text-white transition-all duration-300 ease-in-out hover:opacity-90 sm:w-auto sm:min-w-[280px]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {t.whatsAppButton}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
