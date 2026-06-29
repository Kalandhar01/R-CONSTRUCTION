import { services, toSlug } from "@/lib/construction-services-data";
import type { Metadata } from "next";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: toSlug(s.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => toSlug(s.title) === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Construction Services`,
    description: service.description.slice(0, 160),
    alternates: {
      canonical: `${SITE_URL}/construction-services/${slug}`,
    },
    openGraph: {
      title: `${service.title} — ${COMPANY_NAME}`,
      description: service.description.slice(0, 160),
      url: `${SITE_URL}/construction-services/${slug}`,
      images: [
        {
          url: "/images/construction/construction-service-command-center-construction-india-commercial-tower-01.webp",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ServiceDetailClient slug={params.slug} />;
}
