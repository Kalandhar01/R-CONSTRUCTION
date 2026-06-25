import ConstructionFooter from "@/components/ConstructionFooter";
import ConstructionNavbar from "@/components/ConstructionNavbar";
import WorksGallery from "@/components/WorksGallery";
import { getAllProjects } from "@/lib/portfolio-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Works | Ractysh Infra Pvt Ltd",
  description:
    "Explore our portfolio of premium exterior construction projects across Tamil Nadu.",
};

export default function WorksPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ConstructionNavbar />

      <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <a
            href="/#works"
            className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-red-700 transition hover:text-red-900"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Projects
          </a>
          <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 inline-flex border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-800">
                Ractysh portfolio
              </p>
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Our Works
              </h1>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              A curated collection of our finest exterior projects across Tamil Nadu.
            </p>
          </div>

          <WorksGallery projects={projects} />
        </div>
      </section>

      <div className="relative overflow-hidden bg-black bg-[radial-gradient(circle_at_20%_0%,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px]">
        <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8 lg:px-16">
          <a
            href="/#works"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition hover:text-white/90"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Projects
          </a>
        </div>
        <ConstructionFooter />
      </div>
    </main>
  );
}
