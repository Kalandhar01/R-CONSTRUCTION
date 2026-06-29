import ConstructionNavbar from "@/components/ConstructionNavbar";
import ConstructionFooter from "@/components/ConstructionFooter";
import ConstructionServicesSection from "@/components/ConstructionServicesSection";
import ContactSectionWithShader from "@/components/ContactSectionWithShader";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HeroParallaxDemo from "@/components/hero-parallax-demo";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

import GridBackground from "@/components/ui/grid-background";
import MotionReveal from "@/components/MotionReveal";
import SubscribeCharm from "@/components/SubscribeCharm";
import SymmetricBentoGrid from "@/components/ui/symmetric-bento-grid";
import TestimonialsMarqueeGrid from "@/components/ui/testimonials-marquee-grid";
import WobbleCardDemo from "@/components/wobble-card-demo";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/ractysh-logo.png`,
    email: "ractyshinfrapvtltd@gmail.com",
    description:
      "Premium construction and infrastructure development company based in Tamil Nadu, India providing civil engineering, construction, infrastructure, and labour contracting services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tamil Nadu",
      addressCountry: "IN",
    },
    telephone: "",
    priceRange: "₹₹₹",
    image: `${SITE_URL}/images/construction/our-work-premium-tower-dawn-04.webp`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Civil Engineering & Consultation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Construction",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Construction",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Infrastructure Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Labour Contracting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Government Tender Execution",
          },
        },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <JsonLd schema={localBusinessSchema} />
      <ConstructionNavbar />
      <SubscribeCharm />
      <HeroSection />

      <StatsSection />

      <GridBackground light>
        <MotionReveal id="intro" className="px-6 py-24 sm:px-10 lg:px-16">
          <WobbleCardDemo />
        </MotionReveal>

        <ConstructionServicesSection />

        <MotionReveal id="works">
          <HeroParallaxDemo />
        </MotionReveal>

        <TestimonialsMarqueeGrid />

        <MotionReveal id="info-2">
          <SymmetricBentoGrid />
        </MotionReveal>
      </GridBackground>

      <GridBackground light>
        <MotionReveal as="div" amount={0.12}>
          <ContactSectionWithShader />
        </MotionReveal>
      </GridBackground>

      <div className="relative overflow-hidden bg-black bg-[radial-gradient(circle_at_20%_360px,rgba(153,27,27,0.28),transparent_34%)] text-white sm:bg-[radial-gradient(circle_at_20%_440px,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] sm:bg-[size:auto,72px_72px,72px_72px] lg:bg-[radial-gradient(circle_at_20%_540px,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] lg:bg-[size:auto,72px_72px,72px_72px]">
        <MotionReveal as="div" amount={0.2}>
          <ConstructionFooter />
        </MotionReveal>
      </div>
    </main>
  );
}
