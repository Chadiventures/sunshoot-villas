"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Our Villas", href: "/villas" },
  { label: "About Us", href: "/about" },
  { label: "Families", href: "/families" },
];

const ratesDropdownItems = [
  { label: "Published Rates", href: "/rates" },
  { label: "Promotions", href: "/promos" },
];

const languages = [
  { code: "EN", flagFile: "en.svg", label: "English" },
  { code: "ZH", flagFile: "zh-CN.svg", label: "Chinese" },
  { code: "ID", flagFile: "id.svg", label: "Indonesian" },
  { code: "KO", flagFile: "ko.svg", label: "Korean" },
  { code: "RU", flagFile: "ru.svg", label: "Russian" },
];

function FlagIcon({ flagFile, label }: { flagFile: string; label: string }) {
  return (
    <Image
      src={`https://cdn.gtranslate.net/flags/svg/${flagFile}`}
      alt={label}
      width={20}
      height={20}
      unoptimized
      className="shrink-0 rounded-[2px] object-cover"
    />
  );
}

function ChevronDown() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/50"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const contactIconClass =
  "text-white opacity-75 transition-all duration-300 hover:text-[#67bc6a] hover:opacity-100";

const navLinkClass =
  "text-white transition-colors duration-300 hover:text-[#67bc6a]";

const navLinkStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "11px",
  fontWeight: 400,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "white",
  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
};

const navButtonStyle = {
  ...navLinkStyle,
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [ratesOpen, setRatesOpen] = useState(false);
  const [mobileRatesOpen, setMobileRatesOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setRatesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: "transparent",
      }}
    >
      <div className="relative flex h-full w-full items-center justify-between">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "140px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Sahana Villas"
            width={160}
            height={48}
            priority
            className="shrink-0"
            style={{
              height: "48px",
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={navLinkClass}
              style={navLinkStyle}
            >
              {link.label}
            </Link>
          ))}

          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setRatesOpen(!ratesOpen)}
              className={navLinkClass}
              style={navButtonStyle}
              aria-expanded={ratesOpen}
              aria-haspopup="menu"
            >
              Rates &amp; Promos ▾
            </button>

            {ratesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "8px",
                  background: "#1C2E20",
                  minWidth: "180px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  zIndex: 200,
                  padding: "8px 0",
                }}
              >
                <Link
                  href="/rates"
                  onClick={() => setRatesOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 24px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                  }}
                >
                  Published Rates
                </Link>
                <Link
                  href="/promos"
                  onClick={() => setRatesOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 24px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                  }}
                >
                  Promotions
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={navLinkClass}
            style={navLinkStyle}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <div ref={langDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-white transition-colors duration-300 hover:text-[#67bc6a]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <FlagIcon
                flagFile={currentLang.flagFile}
                label={currentLang.label}
              />
              <span>{currentLang.code}</span>
              <ChevronDown />
            </button>

            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-full mt-2 min-w-[120px] border border-[#1A1A1A]/10 bg-[#f5f2ef] py-1 shadow-lg"
              >
                {languages.map((lang) => (
                  <li key={lang.code} role="option">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-[#1A1A1A] transition-colors duration-200 hover:text-[#67bc6a]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "11px",
                        fontWeight: 400,
                        letterSpacing: "0.05em",
                        backgroundColor:
                          currentLang.code === lang.code
                            ? "rgba(103, 188, 106, 0.1)"
                            : "transparent",
                      }}
                    >
                      <FlagIcon flagFile={lang.flagFile} label={lang.label} />
                      <span>{lang.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a href="tel:+6236173667" aria-label="Call us" className={contactIconClass}>
              <PhoneIcon />
            </a>
            <a
              href="mailto:booking@sahanavillas.com"
              aria-label="Email us"
              className={contactIconClass}
            >
              <MailIcon />
            </a>
            <a
              href="https://wa.me/628113882070"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={contactIconClass}
            >
              <WhatsAppIcon />
            </a>
          </div>

          <Link
            href="#book"
            className="hidden border border-[#67bc6a] bg-[#67bc6a] px-6 py-2.5 text-white transition-all duration-300 hover:bg-[#5aaa5d] md:inline-block"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-white md:hidden"
          style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <HamburgerIcon />
        </button>
      </div>
    </header>

    {mobileOpen && (
      <div
        className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#c1bab2] px-6 pt-24"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex w-full max-w-sm flex-col items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="min-h-[44px] py-3 text-center text-[#1A1A1A] transition-colors duration-300 hover:text-[#67bc6a]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
                fontWeight: 300,
                lineHeight: 1.3,
              }}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setMobileRatesOpen(!mobileRatesOpen)}
            className="min-h-[44px] py-3 text-center text-[#1A1A1A] transition-colors duration-300 hover:text-[#67bc6a]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
              fontWeight: 300,
              lineHeight: 1.3,
            }}
            aria-expanded={mobileRatesOpen}
          >
            Rates &amp; Promos
          </button>
          {mobileRatesOpen && (
            <div className="flex w-full flex-col items-center gap-1 pb-2">
              {ratesDropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="min-h-[44px] py-2 text-[#6B6B6B] transition-colors hover:text-[#67bc6a]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="min-h-[44px] py-3 text-center text-[#1A1A1A] transition-colors duration-300 hover:text-[#67bc6a]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
              fontWeight: 300,
              lineHeight: 1.3,
            }}
          >
            Contact
          </Link>
        </nav>

        <div className="mt-10 w-full max-w-sm">
          <button
            type="button"
            onClick={() => setMobileLangOpen(!mobileLangOpen)}
            className="mx-auto flex min-h-[44px] items-center justify-center gap-2 text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}
          >
            <FlagIcon flagFile={currentLang.flagFile} label={currentLang.label} />
            <span>{currentLang.code}</span>
            <ChevronDown />
          </button>
          {mobileLangOpen && (
            <ul className="mt-2 border border-[#1A1A1A]/10 bg-[#f5f2ef] py-1">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentLang(lang);
                      setMobileLangOpen(false);
                    }}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-2 text-[#1A1A1A] hover:text-[#67bc6a]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                    }}
                  >
                    <FlagIcon flagFile={lang.flagFile} label={lang.label} />
                    <span>{lang.code}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="#book"
          onClick={() => setMobileOpen(false)}
          className="btn-alive mt-10 min-h-[44px] border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-colors duration-300 hover:bg-[#5aaa5d]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Book Now
        </Link>
      </div>
    )}
    </>
  );
}
