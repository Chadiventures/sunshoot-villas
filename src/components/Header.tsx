"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { AdminBlockPage } from "@/components/admin/AdminProvider";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminCoreContext } from "@/hooks/useAdminContent";
import { ADMIN_TOOLBAR_HEIGHT_PX } from "@/lib/adminToolbar";
import { adminPathSegment } from "@/lib/adminPath";
import { getPageContentDefaults } from "@/lib/contentDefaults";

const HEADER_DEFAULTS = getPageContentDefaults("global");

export default function Header() {
  const pathname = usePathname();
  const core = useContext(AdminCoreContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = pathname.startsWith(`/${adminPathSegment()}`);
  const isHome = pathname === "/";
  const adminEditing = Boolean(core?.adminMode);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (isAdmin) return null;

  const solid = scrolled || !isHome;
  const headerTop = adminEditing
    ? `${ADMIN_TOOLBAR_HEIGHT_PX}px`
    : "var(--top-banner-h, 32px)";

  const navLinks = [
    { href: "/villas", key: "villas", blockKey: "header.nav.villas" },
    { href: "/about", key: "about", blockKey: "header.nav.about" },
    { href: "/contact", key: "contact", blockKey: "header.nav.contact" },
  ];

  return (
    <AdminBlockPage pageSlug="global" register={false}>
      <header
        className={`fixed right-0 left-0 transition-all duration-300 ease-in-out ${
          solid ? "bg-[var(--dark)] shadow-lg" : "bg-transparent"
        } ${mobileOpen ? "z-[80]" : "z-50"}`}
        style={{ top: headerTop }}
      >
        <div className="container-site flex h-[72px] items-center justify-between md:h-20">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-wide text-white transition-all duration-300 ease-in-out md:text-2xl"
          >
            <AdminEditableText
              blockKey="header.brand_name"
              fallback={HEADER_DEFAULTS["header.brand_name"]}
              isolateLink
              as="span"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.15em] text-white/85 uppercase transition-all duration-300 ease-in-out hover:scale-105 hover:text-[var(--sand)]"
              >
                <AdminEditableText
                  blockKey={link.blockKey}
                  fallback={HEADER_DEFAULTS[link.blockKey]}
                  isolateLink
                  as="span"
                />
              </Link>
            ))}
            <Link href="/book" className="btn-primary btn-hover !py-2.5 !text-[10px]">
              <AdminEditableText
                blockKey="header.book_button"
                fallback={HEADER_DEFAULTS["header.book_button"]}
                isolateLink
                as="span"
              />
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
                <AdminEditableText
                  blockKey={link.blockKey}
                  fallback={HEADER_DEFAULTS[link.blockKey]}
                  isolateLink
                  as="span"
                />
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="btn-primary btn-hover mt-8 w-full text-center"
            >
              <AdminEditableText
                blockKey="header.book_button"
                fallback={HEADER_DEFAULTS["header.book_button"]}
                isolateLink
                as="span"
              />
            </Link>
          </nav>
        </div>
      )}
    </AdminBlockPage>
  );
}
