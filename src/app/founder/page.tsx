import ConstructionFooter from "@/components/ConstructionFooter";
import ConstructionNavbar from "@/components/ConstructionNavbar";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import StatsSection from "@/components/StatsSection";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founder & Director | Ractysh Infra Pvt Ltd",
  description:
    "Meet A. Subash, B.E. Civil — Director of RACTYSH Infra Private Limited. Leading construction and infrastructure development with precision, safety, and sustainability.",
  alternates: {
    canonical: `${SITE_URL}/founder`,
  },
  openGraph: {
    title: "Founder & Director — A. Subash | Ractysh Infra Pvt Ltd",
    description:
      "A. Subash, B.E. Civil, Director of RACTYSH Infra Private Limited. Civil engineering, infrastructure development, and construction management leadership.",
    url: `${SITE_URL}/founder`,
    images: [
      {
        url: "/images/construction/our-work-premium-tower-dawn-04.webp",
        width: 1200,
        height: 630,
        alt: "A. Subash — Director, RACTYSH Infra Pvt Ltd",
      },
    ],
  },
};

const philosophy = [
  {
    title: "Precision",
    desc: "Every structure begins with exacting standards. From material selection to execution, precision engineering ensures long-term durability and client satisfaction.",
  },
  {
    title: "Safety",
    desc: "Zero-compromise safety protocols govern every worksite. Rigorous training, compliance, and monitoring protect our workforce and project stakeholders.",
  },
  {
    title: "Sustainability",
    desc: "Environmentally responsible construction through waste minimisation, energy-efficient design, and sustainable material sourcing for lasting impact.",
  },
  {
    title: "Timely Delivery",
    desc: "Disciplined project management ensures milestones are met on schedule, backed by transparent reporting and proactive risk mitigation.",
  },
];

export default async function FounderPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ConstructionNavbar />

      {/* HERO */}
      <section className="relative bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(153,27,27,0.3),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(196,168,124,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pt-32 sm:px-10 lg:px-16">
          <div className="relative -mx-6 sm:-mx-10 lg:-mx-16 overflow-hidden border-y border-white/10 bg-white/5" style={{ minHeight: "60vh" }}>
            <Image
              src="/A.Subash B.E Civil.png"
              alt="A. Subash — B.E. Civil, Director of RACTYSH Infra Private Limited"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl pb-32 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
              RACTYSH INFRA PVT LTD
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Mr. A. Subash
            </h1>
            <p className="mt-2 text-xl font-medium tracking-wide text-[#C4A87C] sm:text-2xl">
              B.E. Civil
            </p>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/40">
              RACTYSH INFRA PRIVATE LIMITED
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              A. Subash leads the engineering and construction operations of
              RACTYSH Infra Private Limited. With a strong background in Civil
              Engineering, he oversees project planning, structural execution,
              quality assurance, site management, and timely project delivery.
              His focus on precision, safety, and sustainable construction
              ensures every project meets the highest industry standards.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Civil Engineering", "Infrastructure Dev", "Construction Mgmt", "Quality Assurance"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="flex h-12 items-center justify-center bg-[#991b1b] px-7 text-sm font-semibold text-white shadow-[0_0_34px_rgba(127,29,29,0.34)] transition hover:bg-[#b91c1c]"
              >
                Request Consultation
              </Link>
              <Link
                href="/works"
                className="flex h-12 items-center justify-center border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/20"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE & BACKGROUND */}
      <MotionReveal className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4A87C]">
                Expertise & Background
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Civil Engineering &<br />
                Construction Leadership
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                <p>
                  A. Subash holds a Bachelor&rsquo;s degree in Civil Engineering
                  (B.E. Civil) and serves as the Director of RACTYSH Infra
                  Private Limited, the construction and infrastructure arm of
                  the RACTYSH Group.
                </p>
                <p>
                  With deep domain expertise in civil engineering,
                  infrastructure development, and construction management, he
                  oversees the complete lifecycle of every project — from
                  initial site analysis and structural planning through
                  execution, quality assurance, and timely handover.
                </p>
                <p>
                  Under his leadership, RACTYSH Infra has delivered complex
                  government tenders, commercial developments, residential
                  projects, industrial campuses, and large-scale infrastructure
                  works across Tamil Nadu. His hands-on approach and unwavering
                  focus on quality ensure that every structure meets the highest
                  standards of safety, durability, and design intent.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="sticky top-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
                <div className="relative mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-2 border-[#C4A87C]/30">
                  <Image
                    src="/A.Subash B.E Civil.png"
                    alt="A. Subash"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-950">Mr. A. Subash</h3>
                <p className="mt-1 text-sm font-medium text-[#C4A87C]">
                  B.E. Civil
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">
                  RACTYSH INFRA PRIVATE LIMITED
                </p>
                <ul className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                  {[
                    "Civil Engineering & Structural Design",
                    "Infrastructure Development",
                    "Construction Project Management",
                    "Government Tender Execution",
                    "Quality Assurance & Compliance",
                    "Team & Resource Leadership",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C4A87C]/10 text-xs text-[#C4A87C]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* CONSTRUCTION PHILOSOPHY */}
      <section className="bg-slate-50 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <MotionReveal>
            <div className="mb-14 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4A87C]">
                Construction Philosophy
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Values That Define
                <br />
                Every Build
              </h2>
            </div>
          </MotionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((item) => (
              <MotionReveal key={item.title}>
                <div className="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C4A87C]/30 hover:shadow-lg sm:p-8">
                  <h3 className="text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS / IMPACT */}
      <StatsSection />

      {/* CTA */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <MotionReveal>
            <div className="relative overflow-hidden rounded-2xl bg-black px-8 py-20 sm:px-16 sm:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(196,168,124,0.1),transparent_60%)]" />
              <div className="relative mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4A87C]">
                  Let&rsquo;s Work Together
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Discuss Your Next
                  <br />
                  Construction Project
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/60">
                  Schedule a consultation with our engineering and project
                  delivery team. From concept to completion, we build with
                  precision.
                </p>
                <Link
                  href="/#contact"
                  className="mt-8 inline-flex h-12 items-center justify-center bg-[#991b1b] px-8 text-sm font-semibold text-white shadow-[0_0_34px_rgba(127,29,29,0.34)] transition hover:bg-[#b91c1c]"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* FOOTER */}
      <div className="relative overflow-hidden bg-black text-white">
        <MotionReveal as="div" amount={0.2}>
          <ConstructionFooter />
        </MotionReveal>
      </div>
    </main>
  );
}
