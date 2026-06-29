import ConstructionFooter from "@/components/ConstructionFooter";
import ConstructionNavbar from "@/components/ConstructionNavbar";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/disclaimer"]);

const sections = [
  {
    title: "General Information",
    content:
      "The information provided on this website by Ractysh Infra Pvt Ltd is for general informational purposes only. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on the website.",
  },
  {
    title: "Professional Advice Disclaimer",
    content:
      "The content on this website does not constitute professional advice, including but not limited to legal, financial, or engineering advice. You should not act or refrain from acting based on any information on this website without seeking independent professional advice tailored to your specific circumstances.",
  },
  {
    title: "No Guarantees",
    content:
      "Ractysh Infra Pvt Ltd does not guarantee that the website will be available uninterrupted, timely, secure, or error-free. We do not guarantee that any defects will be corrected, or that the website or the server that makes it available are free of viruses or other harmful components.",
  },
  {
    title: "External Links",
    content:
      "This website may contain links to external websites that are not provided or maintained by or in any way affiliated with Ractysh Infra Pvt Ltd. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any link does not imply endorsement by us.",
  },
  {
    title: "Intellectual Property",
    content:
      "All trademarks, logos, images, and content displayed on this website are the property of Ractysh Infra Pvt Ltd or their respective owners. Unauthorised use, reproduction, or distribution of any material from this website is prohibited without prior written permission from the respective rights holder.",
  },
  {
    title: "Limitation of Liability",
    content:
      "In no event shall Ractysh Infra Pvt Ltd, its directors, employees, or affiliates be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.",
  },
  {
    title: "Contact Details",
    content:
      "If you have any questions, concerns, or require further information regarding this disclaimer, please do not hesitate to contact us at ractyshinfrapvtltd@gmail.com. We are happy to clarify any aspect of this disclaimer and provide additional information as needed.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ConstructionNavbar />

      <section className="relative overflow-hidden bg-black px-5 pb-20 pt-32 sm:px-8 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(185,28,28,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(200,164,93,0.15), transparent 40%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/50">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span style={{ color: "#C8A45D" }}>Disclaimer</span>
          </nav>
          <div className="max-w-3xl">
            <p
              className="mb-4 inline-flex border border-red-900/50 bg-red-950/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#C8A45D" }}
            >
              Legal
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span style={{ color: "#C8A45D" }}>
                Disclaimer
              </span>
            </h1>
            <p className="mt-4 text-sm text-white/60">
              Last Updated: June 2026
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={section.title}>
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "#B91C1C" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {section.title}
                  </h2>
                </div>
                <div
                  className="ml-11 mb-4 h-px"
                  style={{ background: "linear-gradient(90deg, #B91C1C, #C8A45D, transparent)" }}
                />
                <p className="ml-11 leading-7 text-slate-600">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-slate-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Questions about this disclaimer? Reach out at{" "}
              <a
                href="mailto:ractyshinfrapvtltd@gmail.com"
                className="font-medium underline transition"
                style={{ color: "#B91C1C" }}
              >
                ractyshinfrapvtltd@gmail.com
              </a>
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] transition"
              style={{ color: "#B91C1C" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-black bg-[radial-gradient(circle_at_20%_0%,rgba(153,27,27,0.28),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px]">
        <ConstructionFooter />
      </div>
    </main>
  );
}
