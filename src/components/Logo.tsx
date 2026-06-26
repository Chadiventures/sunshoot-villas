import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  const color = variant === "light" ? "text-white" : "text-[#1F2E24]";

  return (
    <Link
      href="/"
      className={`block ${className}`}
      aria-label="Sun Shoot Villas Seminyak - Home"
    >
      <span
        className={`block leading-tight ${color}`}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.35rem",
          fontWeight: 300,
          letterSpacing: "0.04em",
        }}
      >
        Sun Shoot
      </span>
      <span
        className={`block ${color}`}
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "9px",
          fontWeight: 400,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          opacity: variant === "light" ? 0.85 : 0.7,
        }}
      >
        Villas Seminyak
      </span>
    </Link>
  );
}
