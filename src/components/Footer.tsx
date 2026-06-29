"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/sunshootvillas/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "Google",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.navOurVillas, href: "/villas", key: "villas" },
    { label: t.navAboutUs, href: "/about", key: "about" },
    { label: t.navContactUs, href: "/contact", key: "contact" },
    { label: "FAQ", href: "/faq", key: "faq" },
    { label: "Terms & Conditions", href: "/terms", key: "terms" },
  ];

  return (
    <footer className="bg-[var(--dark)] text-white">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.5rem",
                fontWeight: 300,
              }}
            >
              Sun Shoot Villas
            </p>
            <p
              className="text-white/55"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Private pool villas in the heart of Seminyak, Bali.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href === "#" ? undefined : "_blank"}
                  rel={social.href === "#" ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-[var(--sand)] hover:text-[var(--sand)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="mb-4 text-[var(--sand)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {t.footerQuickLinksTitle}
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  {"isAnchor" in link && link.isAnchor ? (
                    <a
                      href={link.href}
                      className="text-white/60 transition-colors hover:text-[var(--sand)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.875rem",
                        fontWeight: 300,
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white/60 transition-colors hover:text-[var(--sand)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.875rem",
                        fontWeight: 300,
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-[var(--sand)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {t.footerContactTitle}
            </p>
            <address
              className="space-y-2 not-italic text-white/60"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              <p>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="transition-colors hover:text-[var(--sand)]"
                >
                  {SITE.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-[var(--sand)]"
                >
                  {SITE.email}
                </a>
              </p>
              <p>Jl. Bidadari II E, Seminyak</p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-6">
          <p
            className="text-center text-white/40"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 300,
            }}
          >
            &copy; 2026 Sun Shoot Villas Seminyak
          </p>
        </div>
      </div>
    </footer>
  );
}
