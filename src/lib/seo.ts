import type { Metadata } from "next";

export const SITE_URL = "https://construction.ractysh.com";
export const COMPANY_NAME = "Ractysh Infra Pvt Ltd";
export const COMPANY_FULL = "RACTYSH INFRA PRIVATE LIMITED";
export const COMPANY_EMAIL = "ractyshinfrapvtltd@gmail.com";
export const OG_IMAGE = "/images/construction/our-work-premium-tower-dawn-04.webp";
export const LOGO_IMAGE = "/images/brand/ractysh-logo.png";

export const SITE_DESCRIPTION =
  "Ractysh Infra Pvt Ltd delivers premium construction, infrastructure development, engineering, labour contracting, and turnkey project solutions across India with quality, safety, and excellence.";

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
}

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: "Ractysh Infra Pvt Ltd | Construction & Infrastructure Company",
    description: SITE_DESCRIPTION,
    keywords: [
      "Ractysh Infra",
      "Construction Company",
      "Infrastructure Development",
      "Engineering Solutions",
      "Labour Contracting",
      "Commercial Construction",
      "Residential Construction",
      "Government Projects",
      "Industrial Construction",
      "Civil Engineering",
      "Tamil Nadu Construction Company",
    ],
    path: "/",
  },
  "/works": {
    title: "Our Projects & Portfolio | Ractysh Infra Pvt Ltd",
    description:
      "Explore the portfolio of Ractysh Infra Pvt Ltd featuring residential, commercial, infrastructure, and government construction projects across Tamil Nadu.",
    path: "/works",
  },
  "/construction-services": {
    title: "Construction & Infrastructure Services | Ractysh Infra Pvt Ltd",
    description:
      "Ractysh Infra Pvt Ltd offers civil engineering, construction, infrastructure development, project management, labour contracting, and government tender execution services.",
    path: "/construction-services",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Ractysh Infra Pvt Ltd",
    description:
      "Read the Privacy Policy of Ractysh Infra Pvt Ltd regarding the collection, use, and protection of your personal information.",
    path: "/privacy-policy",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Ractysh Infra Pvt Ltd",
    description:
      "Review the Terms and Conditions of Ractysh Infra Pvt Ltd for using our website and services.",
    path: "/terms-and-conditions",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Ractysh Infra Pvt Ltd",
    description:
      "Learn how Ractysh Infra Pvt Ltd uses cookies and similar tracking technologies on our website.",
    path: "/cookie-policy",
  },
  "/disclaimer": {
    title: "Disclaimer | Ractysh Infra Pvt Ltd",
    description:
      "Read the Disclaimer of Ractysh Infra Pvt Ltd regarding the use of our website, content, and services.",
    path: "/disclaimer",
  },
};

export function buildMetadata(seo: PageSeo, ogImage?: string): Metadata {
  const url = `${SITE_URL}${seo.path}`;
  const image = ogImage || OG_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: COMPANY_NAME,
      title: seo.title,
      description: seo.description,
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: COMPANY_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}
