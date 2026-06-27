import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import ConstructionNavbar from "@/components/ConstructionNavbar";
import ConstructionFooter from "@/components/ConstructionFooter";
import { getProjectBySlug, getProjectsByDivision } from "@/lib/our-works";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const projects = await getProjectsByDivision("Construction");
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found | Ractysh Infra" };

  return {
    title: `${project.title} | Ractysh Infra Pvt Ltd`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.division}`,
      description: project.description,
      images: project.coverImage
        ? [{ url: project.coverImage }]
        : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjectsByDivision("Construction");
  const related = allProjects.filter((p) => p.slug !== slug).slice(0, 3);
  const gallery = project.galleryImages.slice(1);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ConstructionNavbar />

      <section className="px-5 pb-20 pt-32 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/works"
            className="group mb-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Works</span>
          </Link>

          <div className="relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1280px) 90vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-red-800">
                  Construction
                </span>
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-600">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-red-700/60" />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          </div>

          {gallery.length > 0 && (
            <section className="mb-24">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-400">
                Project Gallery
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image, i) => (
                  <div
                    key={`gallery-${i}`}
                    className={`group relative overflow-hidden rounded-xl bg-slate-100 ${
                      i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image}
                        alt={`${project.title} gallery image ${i + 1}`}
                        fill
                        sizes={
                          i === 0
                            ? "(min-width: 1024px) 56vw, 100vw"
                            : "(min-width: 1024px) 28vw, 100vw"
                        }
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="border-t border-slate-200 pt-16">
              <h2 className="mb-2 text-3xl font-bold tracking-tight">
                Related Projects
              </h2>
              <p className="mb-10 text-slate-500">
                Explore more projects from our portfolio.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/works/${item.slug}`}
                    className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(127,29,29,0.12)]"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
                        Construction
                      </p>
                      <h3 className="mt-1 text-xl font-bold leading-tight tracking-tight text-slate-950">
                        {item.title}
                      </h3>
                      {item.location && (
                        <p className="mt-1 text-sm text-slate-500">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <div className="relative overflow-hidden bg-black bg-[radial-gradient(circle_at_20%_0%,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px]">
        <ConstructionFooter />
      </div>
    </main>
  );
}
