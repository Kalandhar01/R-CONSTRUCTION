"use client";

import type { PortfolioProject } from "@/lib/portfolio-data";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function WorksGallery({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  if (!projects.length) {
    return (
      <div className="border border-slate-200 bg-slate-50 px-6 py-14 text-center">
        <p className="text-sm font-medium text-slate-600">
          No projects are available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.46,
            delay: Math.min(index % 6, 5) * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={`/works/${project.slug}`}
            className="group block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(127,29,29,0.12)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
              <Image
                src={project.coverImage}
                alt={`${project.title} by Ractysh Infra Pvt Ltd`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                quality={55}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
                  {project.category}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-950">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {project.location}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {project.description}
                </p>
              </div>
              <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-slate-300 transition duration-300 group-hover:text-red-700" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
