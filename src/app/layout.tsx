import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { NavigationProvider } from "@/context/NavigationContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deccan Wheels - Premium Pre-Owned Luxury Cars in Pune",
  description: "Experience the finest collection of pre-owned luxury cars at Deccan Wheels. Certified quality, unmatched service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syne.variable} antialiased bg-[#050505] text-white`}
      >
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
