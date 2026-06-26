import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";
import { SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: `${SITE.name} | Private Pool Villas in Seminyak, Bali`,
  description:
    "Four private pool villas in the heart of Seminyak, Bali. Balinese luxury with a personal touch on Jl. Bidadari II E.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <TopBanner />
        <Header />
        <main style={{ paddingTop: "80px" }}>{children}</main>
        <ChatBot />
      </body>
    </html>
  );
}
