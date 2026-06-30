import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactPageClient from "@/components/contact/ContactPageClient";
import MapSection from "@/components/MapSection";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description:
    "Contact Sun Shoot Villas Seminyak. Call, email, or send a booking enquiry via WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <ContactPageClient />
      <MapSection />
      <Footer />
    </>
  );
}
