import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE } from "@/lib/site";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hydraulic Equipment Manufacturer in Chennai | PJ Industries",
    template: "%s | PJ Industries",
  },
  description:
    "PJ Industries manufactures and services hydraulic power packs, presses, cylinders, cooling systems and special machines in Chennai since 2011.",
  icons: {
    icon: [{ url: "/images/about/logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/images/about/logo.jpeg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "PJ Industries",
    description:
      "One stop solution for all your hydraulic needs. Manufacturing in Ambattur, Chennai since 2011.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/about/logo.jpeg", alt: "PJ Industries logo" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    foundingDate: String(SITE.foundedYear),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: "Chennai",
  };

  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
