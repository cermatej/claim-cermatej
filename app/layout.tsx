import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlightRefund — Get paid for your delayed flight",
  description:
    "Instantly check how much compensation you're owed under EU 261/2004 for a delayed or cancelled flight.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
