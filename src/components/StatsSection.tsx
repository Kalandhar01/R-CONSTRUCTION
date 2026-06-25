"use client";

import { motion } from "motion/react";

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Industry Partners" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Commitment to Quality" },
];

export default function StatsSection() {
  return (
    <section className="bg-black px-6 pb-20 pt-10 sm:px-10 sm:pb-24 sm:pt-14 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/40"
        >
          Project Statistics
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-lg border border-white/10 bg-white/[0.05] px-5 py-5 text-center backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.08em] text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
