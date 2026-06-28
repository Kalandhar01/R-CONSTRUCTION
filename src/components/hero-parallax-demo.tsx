import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Premium Tower Residences",
    category: "Residential",
    location: "Coimbatore, Tamil Nadu",
    description:
      "A landmark residential tower developed with precision engineering, modern amenities, and superior construction standards.",
    status: "Completed",
    image: "/images/construction/our-work-premium-tower-dawn-04.webp",
    slug: "premium-tower-residences",
  },
  {
    title: "Commercial Business Hub",
    category: "Commercial",
    location: "Coimbatore, Tamil Nadu",
    description:
      "State-of-the-art commercial complex designed for modern businesses with sustainable infrastructure and premium workspaces.",
    status: "Completed",
    image: "/images/construction/construction-service-command-center-construction-india-commercial-tower-01.webp",
    slug: "commercial-business-hub",
  },
  {
    title: "Luxury Villa Estate",
    category: "Residential",
    location: "Palani, Tamil Nadu",
    description:
      "Exclusive villa community featuring contemporary architecture, private gardens, and world-class residential amenities.",
    status: "Ongoing",
    image: "/images/construction/our-work-finished-villa-08.webp",
    slug: "luxury-villa-estate",
  },
];

export default function HeroParallaxDemo() {
  return (
    <section className="relative w-full bg-white px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 inline-flex border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-800">
          Project gallery
        </div>

        <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Finished spaces backed by controlled site execution.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          A visual record of homes, commercial blocks, interiors,
          infrastructure, and handover moments shaped through the Ractysh
          project-control idea.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/works/${project.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(153,27,27,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
                  {project.category}
                </span>
                <span
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#991b1b]">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#C8A45D]">
                  {project.location}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {project.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#991b1b] transition-all duration-300 group-hover:gap-3">
                  <span>View Project</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/works"
            className="group inline-flex items-center gap-3 bg-[#991b1b] px-10 py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgba(153,27,27,0.3)] transition-all duration-300 hover:bg-[#b91c1c] hover:shadow-[0_12px_40px_rgba(153,27,27,0.4)]"
          >
            <span>Explore More Projects</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
