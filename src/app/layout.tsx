import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { listedProducts } from "@/lib/products";
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

const seoDescription =
  "PJ Industries — hydraulic equipment manufacturer in Chennai since 2011. Power packs, presses, cylinders, cooling systems, stackers and special-purpose machines from Ambattur works.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hydraulic Equipment Manufacturer in Chennai | PJ Industries",
    template: "%s | PJ Industries",
  },
  description: seoDescription,
  applicationName: SITE.name,
  keywords: [
    "PJ Industries",
    "hydraulic equipment manufacturer Chennai",
    "hydraulic power packs Chennai",
    "hydraulic presses manufacturer",
    "hydraulic cylinders Ambattur",
    "cooling systems manufacturer Chennai",
    "special purpose machines Chennai",
    "hydraulic stackers",
    "Mannurpet",
    "Ambattur",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "manufacturing",
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Hydraulic Equipment Manufacturer in Chennai | PJ Industries",
    description: seoDescription,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/about/logo.jpeg",
        width: 512,
        height: 512,
        alt: "PJ Industries logo — hydraulic manufacturer Chennai",
      },
      {
        url: "/images/hero/cooling-units.jpg",
        width: 1200,
        height: 630,
        alt: "PJ Industries hydraulic cooling units manufactured in Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PJ Industries | Hydraulic Manufacturer Chennai",
    description: seoDescription,
    images: ["/images/hero/cooling-units.jpg"],
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const productNames = listedProducts().map((p) => p.name);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Manufacturer"],
    name: SITE.name,
    legalName: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    logo: `${SITE.url}/images/about/logo.jpeg`,
    image: `${SITE.url}/images/hero/cooling-units.jpg`,
    telephone: SITE.phoneTel,
    email: SITE.email,
    foundingDate: String(SITE.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.locations.registeredOffice.address,
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600050",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Chennai" },
      { "@type": "State", name: "Tamil Nadu" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: productNames,
    sameAs: [SITE.indiamart].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneTel,
        contactType: "sales",
        email: SITE.email,
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: seoDescription,
    publisher: { "@type": "Organization", name: SITE.name },
    inLanguage: "en-IN",
  };

  return (
    <html lang="en-IN" className={`${barlow.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
