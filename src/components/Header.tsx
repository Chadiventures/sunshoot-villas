"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "villa-promo-dismissed";

export default function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerActive, setBannerActive] = useState(false);

  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";
  const isVillaDetail = /^\/villas\/[^/]+$/.test(pathname);

  useEffect(() => {
    if (isAdmin) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdmin]);

  useEffect(() => {
    if (!isVillaDetail) {
      setBannerActive(false);
      return;
    }
    const check = () => {
      setBannerActive(localStorage.getItem(STORAGE_KEY) !== "1");
    };
    check();
    window.addEventListener("villa-banner-dismissed", check);
    return () => window.removeEventListener("villa-banner-dismissed", check);
  }, [isVillaDetail, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (isAdmin) return null;

  const solid = scrolled || !isHome;
  const headerTop =
    bannerActive && isVillaDetail ? "var(--villa-banner-h, 44px)" : "0px";

  const navLinks = [
    { label: t.navOurVillas, href: "/villas", key: "villas" },
    { label: t.navAboutUs, href: "/about", key: "about" },
    { label: t.navContactUs, href: "/contact", key: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed right-0 left-0 z-50 transition-all duration-300 ease-in-out ${
          solid ? "bg-[var(--dark)] shadow-lg" : "bg-transparent"
        }`}
        style={{ top: headerTop }}
      >
        <div className="container-site flex h-[72px] items-center justify-between md:h-20">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-wide text-white transition-all duration-300 ease-in-out md:text-2xl"
          >
            Sun Shoot Villas
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.15em] text-white/85 uppercase transition-all duration-300 ease-in-out hover:scale-105 hover:text-[var(--sand)]"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book" className="btn-primary btn-hover !py-2.5 !text-[10px]">
              {t.navBookNow}
            </Link>
            <LanguageSelector />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector compact />
            <button
            type="button"
            className="btn-hover flex h-10 w-10 items-center justify-center text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--dark)]"
          style={{ paddingTop: `calc(6rem + ${headerTop})` }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col px-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-5 font-[family-name:var(--font-cormorant)] text-2xl font-light text-white transition-colors hover:text-[var(--sand)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="btn-primary btn-hover mt-8 w-full text-center"
            >
              {t.navBookNow}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
