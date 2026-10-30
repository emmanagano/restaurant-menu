import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kapampangan Grill & Bar in San Fernando, Pampanga | Uling",
  description:
    "Charcoal-grilled sisig, kare-kare and carabao tapa in San Fernando, Pampanga. Heirloom Kapampangan recipes for family lunches and barkada nights. Book a table.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:flex focus:min-h-tap focus:items-center focus:rounded-control focus:bg-ember-dark focus:px-4 focus:text-on-dark"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
