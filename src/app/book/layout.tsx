import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now | Sun Shoot Villas Seminyak",
  description:
    "Request a booking at Sun Shoot Villas Seminyak. Select your villa, dates and guests - our team will confirm via WhatsApp within 24 hours.",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
