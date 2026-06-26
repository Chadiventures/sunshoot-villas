import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Requests | Sahana Villas",
  description: "Booking request dashboard mockup for Sahana Villas.",
};

const sidebarLinks = [
  { label: "Dashboard", href: "/book", active: false },
  { label: "Booking Requests", href: "/book", active: true },
  { label: "Calendar", href: "/book", active: false },
  { label: "Guests", href: "/book", active: false },
  { label: "Settings", href: "/book", active: false },
];

const stats = [
  { label: "Total Requests This Month", value: "24" },
  { label: "Confirmed", value: "16" },
  { label: "Pending", value: "5" },
  { label: "Occupancy Rate", value: "78%" },
];

type BookingStatus = "Pending" | "Confirmed" | "Declined";

interface BookingRequest {
  id: string;
  guestName: string;
  flag: string;
  arrival: string;
  departure: string;
  guests: number;
  status: BookingStatus;
}

const bookingRequests: BookingRequest[] = [
  {
    id: "REQ-1042",
    guestName: "Sarah & Michael Chen",
    flag: "🇦🇺",
    arrival: "12 Jul 2026",
    departure: "19 Jul 2026",
    guests: 4,
    status: "Pending",
  },
  {
    id: "REQ-1041",
    guestName: "Henrik Lindqvist",
    flag: "🇸🇪",
    arrival: "5 Jul 2026",
    departure: "12 Jul 2026",
    guests: 2,
    status: "Confirmed",
  },
  {
    id: "REQ-1040",
    guestName: "The Williams Family",
    flag: "🇬🇧",
    arrival: "28 Jun 2026",
    departure: "5 Jul 2026",
    guests: 5,
    status: "Confirmed",
  },
  {
    id: "REQ-1039",
    guestName: "Yuki Tanaka",
    flag: "🇯🇵",
    arrival: "20 Jun 2026",
    departure: "25 Jun 2026",
    guests: 3,
    status: "Declined",
  },
  {
    id: "REQ-1038",
    guestName: "Marco & Elena Rossi",
    flag: "🇮🇹",
    arrival: "15 Jun 2026",
    departure: "22 Jun 2026",
    guests: 2,
    status: "Pending",
  },
];

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, { bg: string; color: string }> = {
    Pending: { bg: "rgba(103, 188, 106, 0.15)", color: "#67bc6a" },
    Confirmed: { bg: "rgba(143, 169, 154, 0.2)", color: "#5A8A6A" },
    Declined: { bg: "rgba(176, 123, 114, 0.15)", color: "#B07B72" },
  };

  const { bg, color } = styles[status];

  return (
    <span
      className="inline-block px-3 py-1"
      style={{
        backgroundColor: bg,
        color,
        fontFamily: "var(--font-inter)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}

export default function BookPage() {
  return (
    <div className="-mt-[80px] flex min-h-screen flex-col md:flex-row">
      <aside
        className="hidden w-64 shrink-0 flex-col px-6 py-8 md:flex"
        style={{ backgroundColor: "#c1bab2" }}
      >
        <Link href="/" className="mb-12">
          <Image
            src="/logo.png"
            alt="Sahana Villas"
            width={144}
            height={36}
            className="h-9 w-auto"
          />
        </Link>

        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-3 transition-colors duration-200"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: link.active ? 500 : 300,
                color: link.active ? "#67bc6a" : "rgba(26, 26, 26, 0.6)",
                backgroundColor: link.active
                  ? "rgba(103, 188, 106, 0.1)"
                  : "transparent",
                borderLeft: link.active
                  ? "2px solid #67bc6a"
                  : "2px solid transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div
        className="flex items-center justify-between px-6 py-4 md:hidden"
        style={{ backgroundColor: "#c1bab2" }}
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Sahana Villas"
            width={128}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <span
          className="text-[#67bc6a]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Booking Requests
        </span>
      </div>

      <main className="flex-1 bg-[#F7F3EE] px-6 py-8 md:px-8 lg:px-12">
        <h1
          className="mb-8 text-[#1A1A1A]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Booking Requests
        </h1>

        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-[#1A1A1A]/10 bg-white px-6 py-5"
            >
              <p
                className="mb-1 text-[#6B6B6B]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
              <p
                className="text-[#1A1A1A]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "2rem",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto border border-[#1A1A1A]/10 bg-white">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#1A1A1A]/10">
                {[
                  "Guest",
                  "Arrival",
                  "Departure",
                  "Guests",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-left text-[#6B6B6B]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookingRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-[#1A1A1A]/5 last:border-b-0"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: "20px" }}>{request.flag}</span>
                      <div>
                        <p
                          className="text-[#1A1A1A]"
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          {request.guestName}
                        </p>
                        <p
                          className="text-[#6B6B6B]"
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "11px",
                            fontWeight: 300,
                          }}
                        >
                          {request.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 py-5 text-[#1A1A1A]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "13px",
                      fontWeight: 300,
                    }}
                  >
                    {request.arrival}
                  </td>
                  <td
                    className="px-6 py-5 text-[#1A1A1A]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "13px",
                      fontWeight: 300,
                    }}
                  >
                    {request.departure}
                  </td>
                  <td
                    className="px-6 py-5 text-[#1A1A1A]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "13px",
                      fontWeight: 300,
                    }}
                  >
                    {request.guests}
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="min-h-[44px] px-4 py-2 text-white transition-opacity duration-200 hover:opacity-80"
                        style={{
                          backgroundColor: "#5A8A6A",
                          fontFamily: "var(--font-inter)",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="min-h-[44px] border px-4 py-2 transition-colors duration-200 hover:bg-[#B07B72]/10"
                        style={{
                          borderColor: "#B07B72",
                          color: "#B07B72",
                          fontFamily: "var(--font-inter)",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
