"use client";

import Image from "next/image";
import VideoPageHero from "@/components/VideoPageHero";
import InquiryForm from "@/components/InquiryForm";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminEditableImage } from "@/components/admin/AdminEditableImage";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { useContext } from "react";
import { SITE } from "@/lib/site";

const CONTACT_IMAGE =
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354560.jpg?k=6a8de904dbd7d2121d6e233fd5a13746df529ac987d74da48410ae3357898cfa&o=&hp=1";

type ContactPageClientProps = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageSrc: string;
  contactEmail: string;
};

export default function ContactPageClient({
  heroTitle,
  heroSubtitle,
  heroImageSrc,
  contactEmail,
}: ContactPageClientProps) {
  const core = useContext(AdminCoreContext);
  const { getText } = useAdminContent();
  void core?.contentRevision;

  return (
    <>
      <VideoPageHero
        imageSrc={heroImageSrc}
        title={heroTitle}
        subtitle={heroSubtitle}
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
                <AdminEditableText blockKey="section.title" as="span" />
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="section-eyebrow mb-1">
                    <AdminEditableText blockKey="contact.phone_label" as="span" />
                  </p>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="text-[var(--text)] transition-colors hover:text-[var(--sand)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    <AdminEditableText blockKey="contact.phone" as="span" />
                  </a>
                </div>
                <div>
                  <p className="section-eyebrow mb-1">
                    <AdminEditableText blockKey="contact.email_label" as="span" />
                  </p>
                  <a
                    href={`mailto:${getText("contact.email") || contactEmail}`}
                    className="text-[var(--text)] transition-colors hover:text-[var(--sand)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    <AdminEditableText blockKey="contact.email" fallback={contactEmail} as="span" />
                  </a>
                </div>
                <div>
                  <p className="section-eyebrow mb-1">
                    <AdminEditableText blockKey="contact.address_label" as="span" />
                  </p>
                  <p
                    className="text-[var(--text-muted)]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "1rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    <AdminEditableText blockKey="contact.address" as="span" />
                  </p>
                </div>
                <div>
                  <p className="section-eyebrow mb-1">
                    <AdminEditableText blockKey="contact.whatsapp_label" as="span" />
                  </p>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border-0 outline-none ring-0 hover:border-0 hover:outline-none hover:ring-0 focus:border-0 focus:outline-none focus:ring-0"
                    style={{
                      backgroundColor: "#25D366",
                      color: "#ffffff",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.875rem 2rem",
                      textDecoration: "none",
                    }}
                  >
                    <AdminEditableText blockKey="contact.whatsapp_button" as="span" />
                  </a>
                </div>
              </div>

              <div className="group mt-6">
                <div className="relative h-[200px] w-full overflow-hidden rounded-sm md:h-[250px]">
                  <AdminEditableImage
                    imageBlockKey="contact.image"
                    altBlockKey="contact.image.alt"
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    renderStaticImage={({ src, alt, className, style }) => (
                      <Image
                        src={src || CONTACT_IMAGE}
                        alt={alt}
                        fill
                        className={className}
                        style={style}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
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
                  <AdminEditableText blockKey="contact.image.caption" as="span" />
                </p>
              </div>
            </div>

            <div className="rounded-sm bg-white p-6 shadow-sm md:p-8">
              <div className="mb-2">
                <h3
                  className="mb-2 text-[var(--dark)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 300,
                  }}
                >
                  <AdminEditableText blockKey="form.title" as="span" />
                </h3>
                <p
                  className="text-[var(--text-muted)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  <AdminEditableText blockKey="form.subtitle" as="span" />
                </p>
              </div>
              <InquiryForm contactMode showHeading={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
