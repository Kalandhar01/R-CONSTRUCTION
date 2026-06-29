import type { Metadata } from "next";
import { pageSeo, buildMetadata, SITE_URL, COMPANY_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/construction-services"]);

export default function ConstructionServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
