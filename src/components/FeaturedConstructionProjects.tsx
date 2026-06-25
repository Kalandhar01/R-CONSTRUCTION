"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-data";

export default function FeaturedConstructionProjects({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  if (!projects.length) return null;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#fff 0.5px, transparent 0.5px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="mb-14">
          <p className="mb-4 inline-flex border border-red-800/50 bg-red-950/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-400">
            Featured Projects
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            A selection of our finest exterior projects across Tamil Nadu.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/works/${project.slug}`}
              className="group block overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all duration-300 hover:border-slate-600 hover:bg-slate-900"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-800">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-400">
                  {project.category}
                </p>
                <h3 className="mt-1 text-2xl font-bold leading-tight tracking-tight text-white">
                  {project.title}
                </h3>
                {project.location && (
                  <p className="mt-1 text-sm text-slate-400">
                    {project.location}
                  </p>
                )}
                {project.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {project.description}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-red-400 transition-all group-hover:gap-2.5">
                  View Project
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-3 border border-slate-700 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition-all duration-300 hover:border-slate-500 hover:text-white"
          >
            <span>View All Works</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
