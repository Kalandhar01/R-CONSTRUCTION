"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Home, ClipboardCheck } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { toSlug } from "@/lib/construction-services-data";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "27+", label: "Integrated Services" },
  { value: "500+", label: "Projects Delivered" },
  { value: "200+", label: "Certified Engineers" },
  { value: "10+", label: "Years of Excellence" },
];

const capabilities = [
  { label: "Infrastructure Development", desc: "Roads, bridges, flyovers, utilities" },
  { label: "Commercial Construction", desc: "Office towers, retail, corporate" },
  { label: "Residential Development", desc: "Luxury villas, apartments" },
  { label: "Project Management", desc: "Owner-representative oversight" },
  { label: "Government Tender Execution", desc: "DSR/CPWD-compliant project delivery" },
  { label: "Labour Contract Services", desc: "Skilled & unskilled workforce management" },
];

export default function ConstructionServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const editorialRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      const editorial = editorialRef.current?.querySelectorAll(".gsap-reveal");
      if (editorial && editorial.length) {
        tl.fromTo(
          editorial,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" },
        );
      }

      const statEls = statsRef.current?.querySelectorAll(".gsap-stat");
      if (statEls && statEls.length) {
        tl.fromTo(
          statEls,
          { y: 32, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
          "-=0.2",
        );
      }

      const matrixEls = matrixRef.current?.querySelectorAll(".gsap-matrix");
      if (matrixEls && matrixEls.length) {
        tl.fromTo(
          matrixEls,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          "-=0.2",
        );
      }

      const featureEl = featureRef.current;
      if (featureEl) {
        tl.fromTo(
          featureEl,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.15",
        );
      }

      const secondaryEls = secondaryRef.current?.querySelectorAll(".gsap-secondary");
      if (secondaryEls && secondaryEls.length) {
        tl.fromTo(
          secondaryEls,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden" id="services">
      <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-16 lg:py-36">

        {/* ===== 1. EDITORIAL HERO STATEMENT ===== */}
        <div ref={editorialRef} className="mx-auto max-w-5xl">
          <SplitText
            text="Ractysh Infra Pvt Ltd"
            tag="p"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700"
            delay={20}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
            rootMargin="0px"
            textAlign="left"
          />
          <div className="mt-5 text-5xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[1.06]">
            <SplitText
              text="Building"
              tag="span"
              className="block"
              delay={25}
              duration={0.7}
              ease="power3.out"
              splitType="chars, words"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
              rootMargin="0px"
              textAlign="left"
            />
            <SplitText
              text="India's Infrastructure."
              tag="span"
              className="block text-red-700"
              delay={25}
              duration={0.7}
              ease="power3.out"
              splitType="chars, words"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
              rootMargin="0px"
              textAlign="left"
            />
            <SplitText
              text="Delivering Trust."
              tag="span"
              className="block"
              delay={25}
              duration={0.7}
              ease="power3.out"
              splitType="chars, words"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
              rootMargin="0px"
              textAlign="left"
            />
          </div>
          <SplitText
            text="Ractysh Infra Pvt Ltd is a construction and infrastructure company specializing in project execution, government contracts, labour contracting, and end-to-end development solutions."
            tag="p"
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg"
            delay={15}
            duration={0.5}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
            rootMargin="0px"
            textAlign="left"
          />
        </div>

        {/* ===== 2. STATISTICS STRIP ===== */}
        <div
          ref={statsRef}
          className="gsap-reveal mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="gsap-stat flex flex-col items-center justify-center bg-white px-4 py-10 text-center"
            >
              <span className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ===== 3. CAPABILITY MATRIX ===== */}
        <div ref={matrixRef} className="mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Full-spectrum capability
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className="gsap-matrix flex flex-col justify-center bg-white px-6 py-8"
              >
                <span className="text-sm font-semibold text-slate-950">
                  {cap.label}
                </span>
                <span className="mt-1 text-sm text-slate-400">{cap.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 4. THREE FEATURED SERVICES ===== */}

        {/* Primary: Commercial Construction */}
        <div ref={featureRef} className="mt-28">
          <div className="group relative aspect-[16/7] overflow-hidden rounded-2xl bg-slate-950 sm:aspect-[16/6] lg:aspect-[16/5]">
            <Image
              src="/images/construction/construction-service-command-center-construction-india-commercial-tower-01.webp"
              alt="Commercial Building Construction"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="100vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-16">
              <Building2 className="mb-3 h-6 w-6 text-red-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-400">
                Featured Service
              </p>
              <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Commercial Building<br />Construction
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
                Full-service commercial construction for office towers, corporate
                headquarters, retail centers, and mixed-use developments —
                delivered with scalable infrastructure and future-ready systems.
              </p>
              <Link
                href={`/construction-services/${toSlug("Commercial Building Construction")}`}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                Explore Commercial Build
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary: Residential + Turnkey */}
        <div
          ref={secondaryRef}
          className="mt-5 grid gap-5 sm:grid-cols-2"
        >
          {/* Residential */}
          <div className="gsap-secondary group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950 sm:aspect-[3/2]">
            <Image
              src="/images/construction/our-work-finished-villa-08.webp"
              alt="Residential Building Construction"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="50vw"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
              <Home className="mb-2 h-5 w-5 text-red-400" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Residential Building<br />Construction
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
                Luxury villas, premium apartments, and custom homes defined by
                quality craftsmanship and enduring durability.
              </p>
              <Link
                href={`/construction-services/${toSlug("Residential Building Construction")}`}
                className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-red-300 transition-colors hover:text-red-200"
              >
                Design Your Residence
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Turnkey */}
          <div className="gsap-secondary group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950 sm:aspect-[3/2]">
            <Image
              src="/images/construction/our-work-premium-tower-dawn-04.webp"
              alt="Turnkey Construction Projects"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="50vw"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
              <ClipboardCheck className="mb-2 h-5 w-5 text-red-400" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Turnkey Construction<br />Projects
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
                Single-point accountability from concept to handover — design,
                procurement, construction, testing, and commissioning.
              </p>
              <Link
                href={`/construction-services/${toSlug("Turnkey Construction Projects")}`}
                className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-red-300 transition-colors hover:text-red-200"
              >
                Inquire About Turnkey
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===== 5. NEW SERVICES: Government Tender + Labour ===== */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* Government Tender Execution */}
          <div className="gsap-secondary group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950 sm:aspect-[3/2]">
            <Image
              src="/images/construction/construction-service-command-center-construction-india-infrastructure-viaduct-03.webp"
              alt="Government Tender Execution"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="50vw"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
              <Building2 className="mb-2 h-5 w-5 text-[#C4A87C]" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Government Tender<br />Execution
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
                End-to-end execution of government infrastructure and development
                projects with compliance, quality, and timely delivery.
              </p>
              <Link
                href={`/construction-services/${toSlug("Government Tender Execution")}`}
                className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#C4A87C] transition-colors hover:text-[#d4b88c]"
              >
                Discuss Tender Requirements
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Labour Contract Services */}
          <div className="gsap-secondary group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950 sm:aspect-[3/2]">
            <Image
              src="/images/construction/construction-service-command-center-construction-india-rebar-deck-02.webp"
              alt="Labour Contract Services"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="50vw"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
              <ClipboardCheck className="mb-2 h-5 w-5 text-[#C4A87C]" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Labour Contract<br />Services
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
                Skilled and unskilled workforce management for construction,
                infrastructure, industrial, and engineering projects.
              </p>
              <Link
                href={`/construction-services/${toSlug("Labour Contract Services")}`}
                className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#C4A87C] transition-colors hover:text-[#d4b88c]"
              >
                Hire Labour Workforce
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===== 6. EXPLORE ALL CTA ===== */}
        <div className="mt-20 text-center">
          <p className="mb-4 text-sm text-slate-500">
            27 integrated services. One proven delivery system.
          </p>
          <Link
            href="/construction-services"
            className="group inline-flex items-center gap-2 rounded-lg bg-red-700 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(127,29,29,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-[0_8px_32px_rgba(127,29,29,0.35)]"
          >
            View 27 Integrated Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
