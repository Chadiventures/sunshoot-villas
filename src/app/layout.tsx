import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";
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
  title: "Sahana Villas | Luxury Villas in Seminyak, Bali",
  description:
    "3-bedroom luxury villas with private pool in the heart of Seminyak, Bali. Your private oasis awaits.",
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
