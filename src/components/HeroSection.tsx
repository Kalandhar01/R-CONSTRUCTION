"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const trustIndicators = [
  "Government Projects",
  "Infrastructure Development",
  "Engineering Solutions",
  "Labour Contracting",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-black"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/construction/our-work-premium-tower-dawn-04.webp"
          alt="Ractysh Infra construction and infrastructure project"
          fill
          className="object-cover brightness-[0.3] saturate-[0.9]"
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-32 sm:px-10 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/50"
        >
          RACTYSH INFRA PVT LTD
        </motion.p>

        <h1 className="mt-4 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl xl:text-8xl"
          >
            Building Tomorrow&rsquo;s
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 block text-4xl font-bold leading-[1.08] tracking-tight text-[#C4A87C] sm:text-5xl lg:text-7xl xl:text-8xl"
          >
            Infrastructure With Precision.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8"
        >
          RACTYSH Infra Pvt Ltd delivers construction, infrastructure
          development, government projects, labour contracting, and
          engineering solutions with a commitment to quality, safety, and
          long-term value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4"
        >
          {trustIndicators.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C4A87C]/15 text-[10px] text-[#C4A87C]">
                ✓
              </span>
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            href="/works"
            className="flex h-12 w-full items-center justify-center bg-[#991b1b] px-7 text-sm font-semibold text-white shadow-[0_0_34px_rgba(127,29,29,0.34)] transition hover:bg-[#b91c1c] sm:w-48"
          >
            View Projects
          </Link>
          <Link
            href="/#contact"
            className="flex h-12 w-full items-center justify-center border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/20 sm:w-48"
          >
            Request Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
