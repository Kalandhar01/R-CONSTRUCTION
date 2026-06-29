import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { SITE_URL, COMPANY_NAME, OG_IMAGE } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ractysh Infra Pvt Ltd | Construction & Infrastructure Company",
    template: "%s | Ractysh Infra Pvt Ltd",
  },
  description:
    "Ractysh Infra Pvt Ltd delivers premium construction, infrastructure development, engineering, labour contracting, and turnkey project solutions across India with quality, safety, and excellence.",
  keywords: [
    "Ractysh Infra",
    "Construction Company India",
    "Infrastructure Development",
    "Civil Engineering",
    "Labour Contracting",
    "Government Tenders",
    "Commercial Construction",
    "Residential Construction",
    "Turnkey Projects",
    "Tamil Nadu Contractor",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: "Ractysh Infra Pvt Ltd | Construction & Infrastructure Company",
    description:
      "Ractysh Infra Pvt Ltd delivers premium construction, infrastructure development, engineering, labour contracting, and turnkey project solutions across India.",
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: COMPANY_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ractysh Infra Pvt Ltd | Construction & Infrastructure Company",
    description:
      "Ractysh Infra Pvt Ltd delivers premium construction, infrastructure development, engineering, labour contracting, and turnkey project solutions across India.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    alternateName: "Ractysh Infra",
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/ractysh-logo.png`,
    email: "ractyshinfrapvtltd@gmail.com",
    description:
      "Premium construction and infrastructure development company based in Tamil Nadu, India.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_NAME,
    url: SITE_URL,
    description:
      "Ractysh Infra Pvt Ltd delivers premium construction, infrastructure development, engineering, labour contracting, and turnkey project solutions across India.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={cn("font-sans", geist.variable, inter.variable)} data-scroll-behavior="smooth">
      <body>
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
