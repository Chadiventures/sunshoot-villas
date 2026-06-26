import Link from "next/link";

const bannerOffer =
  "BOOK DIRECT · PRIVATE POOL VILLAS IN SEMINYAK · PERSONAL BALINESE HOSPITALITY";

const textStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

function BannerSegment({ hidden }: { hidden?: boolean }) {
  return (
    <span
      className="top-banner-content inline-flex shrink-0 items-center text-white"
      aria-hidden={hidden}
    >
      <span style={textStyle}>{bannerOffer}</span>
      <span
        className="top-banner-separator text-white/70"
        style={textStyle}
        aria-hidden="true"
      >
        ✦
      </span>
    </span>
  );
}

export default function TopBanner() {
  return (
    <div
      className="top-banner overflow-hidden bg-[var(--brand-green)] transition-colors duration-300 hover:bg-[var(--brand-green-hover)]"
      style={{
        position: "relative",
        height: "32px",
        margin: 0,
        padding: 0,
        display: "block",
      }}
    >
      <Link
        href="/contact"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          textDecoration: "none",
        }}
        aria-label="Contact Sun Shoot Villas"
      >
        <div className="top-banner-track flex h-full items-center">
          <BannerSegment />
          <BannerSegment hidden />
        </div>
      </Link>
    </div>
  );
}
