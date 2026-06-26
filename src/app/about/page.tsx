import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us | ${SITE.name}`,
  description:
    "Learn about Sun Shoot Villas Seminyak - private pool villas with personal Balinese hospitality in the Bidadari area.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
