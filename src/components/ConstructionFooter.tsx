import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const primary = "#B91C1C";

const footerColumns = [
  {
    title: "Pages",
    links: [
      { title: "Home", href: "#home" },
      { title: "Services", href: "#services" },
      { title: "Projects", href: "/works" },
      { title: "Consultation", href: "#contact" },
      { title: "Careers", href: "#contact" },
      { title: "RACTYSH Group", href: "https://www.ractysh.com/" },
    ],
  },
  {
    title: "Services",
    links: [
      { title: "Infrastructure Development", href: "#services" },
      { title: "Commercial Construction", href: "#services" },
      { title: "Residential Construction", href: "#services" },
      { title: "Project Management", href: "#services" },
      { title: "Government Tender Execution", href: "#services" },
      { title: "Labour Contract Services", href: "#services" },
    ],
  },
  {
    title: "Projects",
    links: [
      { title: "Infrastructure", href: "/works" },
      { title: "Commercial", href: "/works" },
      { title: "Residential", href: "/works" },
      { title: "Government Projects", href: "/works" },
      { title: "Industrial Projects", href: "/works" },
    ],
  },
  {
    title: "Contact",
    links: [
      { title: "ractyshinfrapvtltd@gmail.com", href: "mailto:ractyshinfrapvtltd@gmail.com" },
      { title: "Start a project", href: "#contact" },
      { title: "Book consultation", href: "#contact" },
      { title: "View project work", href: "/works" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms & Conditions", href: "/terms-and-conditions" },
      { title: "Cookie Policy", href: "/cookie-policy" },
      { title: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default function ConstructionFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-transparent px-8 py-20 text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 text-sm sm:flex-row md:px-8">
        <div className="relative z-10 max-w-sm">
          <Link
            href="#home"
            className="relative z-20 mr-0 mb-4 flex items-center space-x-2 py-1 text-sm font-normal text-white md:mr-4"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/brand/ractysh-logo.png"
                alt="Ractysh Infra Pvt Ltd"
                fill
                className="object-contain"
                sizes="36px"
              />
            </div>
            <div>
              <span className="block font-bold text-white">
                RACTYSH INFRA
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-wider" style={{ color: "#C8A45D" }}>
                Pvt Ltd
              </span>
            </div>
          </Link>
          <p className="mt-4 max-w-xs leading-6 text-neutral-400">
            Ractysh Infra Pvt Ltd is a construction and infrastructure
            company specializing in project execution, government contracts,
            labour contracting, and end-to-end development solutions.
          </p>
          <div className="mt-5 flex max-w-xs items-start gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-sm">
            <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: primary }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Location
              </p>
              <p className="mt-1 leading-5 text-neutral-300">
                Palani, Dindigul, Coimbatore — India
              </p>
            </div>
          </div>

          <div className="mt-6 text-neutral-500">
            &copy; 2025 <Link href="https://www.ractysh.com/" className="hover:text-neutral-200 transition-colors">RACTYSH GROUP</Link>. All Rights Reserved.
          </div>
        </div>

        <div className="relative z-10 grid w-full grid-cols-2 items-start gap-10 sm:w-auto sm:shrink-0 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <div
              key={column.title}
              className="flex w-full flex-col justify-center space-y-4"
            >
              <p className="font-bold text-neutral-200 transition-colors hover:text-white">
                {column.title}
              </p>
              <ul className="list-none space-y-4 text-neutral-400 transition-colors">
                {column.links.map((link) => (
                  <li key={link.title} className="list-none">
                    <Link
                      className="transition-colors hover:text-white"
                      href={link.href}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
