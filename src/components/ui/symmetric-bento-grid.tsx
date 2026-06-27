"use client";

import {
  Building2,
  ClipboardCheck,
} from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useId, type ReactNode } from "react";

const dashboardImage = "/images/our-works/Construction/17.webp";

export default function SymmetricBentoGrid() {
  return (
    <div className="mx-auto mt-20 w-full max-w-7xl px-4 md:px-8">
      <Header />
      <p className="mx-auto mt-4 max-w-lg text-center text-sm text-neutral-600 dark:text-neutral-400">
        25 integrated construction and engineering services delivered with a
        single standard — quality, schedule, and transparency.
      </p>

      <div className="cols-1 mt-20 grid gap-4 md:auto-rows-[25rem] md:grid-cols-5">
        <BentoCard className="md:col-span-3">
          <DeploymentSkeleton />
          <CardCopy
            title="25 integrated services, one partner"
            description="Civil, MEP, PMC, PEB, surveys, interiors, approvals — every capability under a single contract with unified accountability."
          />
        </BentoCard>

        <BentoCard className="md:col-span-2">
          <CardCopy
            title="500+ projects delivered"
            description="From luxury residences and commercial towers to government infrastructure and industrial campuses — proven execution across scale."
          />
          <DashboardPanel />
        </BentoCard>

        <BentoCard className="md:col-span-3">
          <CardCopy
            title="End-to-end project delivery"
            description="From soil testing and structural design to finishing, handover, and compliance — managed end-to-end without gaps or coordination lapses."
          />
          <DashboardPanel />
        </BentoCard>
      </div>
    </div>
  );
}

function Header() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex w-fit items-center justify-center p-4">
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, width: "100%", height: "100%", borderRadius: 0 }
            : { opacity: 1, width: 0, height: 0, borderRadius: 0 }
        }
        whileInView={{ opacity: 1, width: "100%", height: "100%", borderRadius: 0 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full border border-neutral-200 dark:border-neutral-800"
        style={{ transformOrigin: "top left" }}
      >
        {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-right-1 -bottom-1"].map(
          (position) => (
            <motion.div
              key={position}
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.8,
                duration: shouldReduceMotion ? 0 : 0.25,
              }}
              className={`absolute h-2 w-2 bg-neutral-200 dark:bg-neutral-800 ${position}`}
            />
          ),
        )}
      </motion.div>
            <h2 className="mx-auto w-fit text-center text-xl font-bold tracking-tight text-neutral-800 md:text-4xl dark:text-neutral-100">
        Why choose <span className="text-red-700 dark:text-red-400">Ractysh</span>
      </h2>
    </div>
  );
}

function BentoCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 56, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`group isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] dark:bg-neutral-900 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CardCopy({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="h-40 p-6">
      <h3 className="font-sans text-base font-medium tracking-tight text-neutral-700 dark:text-neutral-100">
        {title}
      </h3>
      <p className="mt-2 max-w-xs font-sans text-base font-normal tracking-tight text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}

function DeploymentSkeleton() {
  const shouldReduceMotion = useReducedMotion();
  const topGradientId = useId();
  const bottomGradientId = useId();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative flex h-full w-full items-center justify-center">
        <svg
          width="128"
          height="69"
          viewBox="0 0 128 69"
          fill="none"
          className="absolute -top-2 left-1/2 -translate-x-[90%] text-neutral-200 dark:text-neutral-800"
          aria-hidden="true"
        >
          <path
            d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
            stroke={`url(#${topGradientId})`}
            strokeWidth="1"
          />
          <defs>
            <motion.linearGradient
              id={topGradientId}
              gradientUnits="userSpaceOnUse"
              initial={shouldReduceMotion ? false : { x1: "0%", x2: "0%" }}
              animate={shouldReduceMotion ? { x1: "0%", x2: "100%" } : { x1: ["0%", "100%"], x2: ["0%", "100%"] }}
              transition={{
                duration: 2.2,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "linear",
              }}
            >
              <stop stopColor="#001AFF" stopOpacity="0" />
              <stop offset="1" stopColor="#6DD4F5" />
              <stop offset="1" stopColor="#6DD4F5" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="62"
          height="105"
          viewBox="0 0 62 105"
          fill="none"
          className="absolute -bottom-2 left-1/2 -translate-x-0 text-neutral-200 dark:text-neutral-800"
          aria-hidden="true"
        >
          <path
            d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
            stroke={`url(#${bottomGradientId})`}
            strokeWidth="1"
          />
          <defs>
            <motion.linearGradient
              id={bottomGradientId}
              gradientUnits="userSpaceOnUse"
              initial={shouldReduceMotion ? false : { x1: "0%", x2: "0%" }}
              animate={shouldReduceMotion ? { x1: "0%", x2: "100%" } : { x1: ["0%", "100%"], x2: ["0%", "100%"] }}
              transition={{
                duration: 2.2,
                delay: 0.65,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "linear",
              }}
            >
              <stop stopColor="#001AFF" stopOpacity="0" />
              <stop offset="1" stopColor="#6DD4F5" />
              <stop offset="1" stopColor="#6DD4F5" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>

        <div className="relative z-30 mx-auto grid w-full max-w-lg grid-cols-3 gap-2 p-4 [perspective:1000px] [transform-style:preserve-3d] sm:gap-4 sm:p-0">
          <SkeletonBlock delay={0} className="flex-col items-start justify-center overflow-hidden px-2 font-mono text-neutral-800 dark:text-neutral-300">
            <p className="bg-transparent text-[8px]">approval sync --scope A17</p>
            <p className="bg-transparent text-[8px]">vendor flow --site zone A</p>
            <p className="bg-transparent text-[8px]">handover proof --close</p>
          </SkeletonBlock>

          <SkeletonBlock delay={0.24} className="items-center justify-center">
            <ClipboardCheck className="h-8 w-8 object-contain text-black dark:text-white" />
          </SkeletonBlock>

          <SkeletonBlock delay={0.48} className="flex-col items-center justify-center">
            <Building2 className="h-8 w-8 object-contain text-black dark:text-white" />
            <p className="bg-transparent text-[8px] text-neutral-800 dark:text-neutral-300">
              project is live
            </p>
          </SkeletonBlock>
        </div>
      </div>
    </div>
  );
}

function SkeletonBlock({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -8, 0],
              rotateX: [0, 8, 0],
            }
      }
      transition={{
        delay,
        duration: 2.8,
        repeat: shouldReduceMotion ? 0 : Infinity,
        ease: "easeInOut",
      }}
      className={`relative flex h-20 w-full min-w-0 rounded-lg bg-gradient-to-b from-white to-white p-2 shadow-lg sm:h-24 md:h-40 dark:from-neutral-800 dark:to-neutral-700 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DashboardPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="mt-2 ml-6 h-full w-full rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <Image
          src={dashboardImage}
          alt="Project command dashboard"
          width={500}
          height={500}
          className="w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}


