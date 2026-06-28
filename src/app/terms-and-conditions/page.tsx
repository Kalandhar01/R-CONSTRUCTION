import ConstructionFooter from "@/components/ConstructionFooter";
import ConstructionNavbar from "@/components/ConstructionNavbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ractysh Infra Pvt Ltd",
  description:
    "Review the Terms & Conditions of Ractysh Infra Pvt Ltd governing the use of our website and services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using this website, you accept and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must refrain from using our website and services. These terms apply to all visitors, users, and others who access or use our services.",
  },
  {
    title: "Website Usage",
    content:
      "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behaviour includes harassing or causing distress to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, designs, graphics, logos, images, text, and software on this website are the intellectual property of Ractysh Infra Pvt Ltd unless otherwise stated. You may not reproduce, distribute, modify, display, or create derivative works from any content without our prior written consent.",
  },
  {
    title: "User Responsibilities",
    content:
      "Users are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under their account. You agree to notify us immediately of any unauthorised use of your account or any other breach of security. We are not liable for any loss or damage arising from your failure to protect your account information.",
  },
  {
    title: "Accuracy of Information",
    content:
      "We strive to ensure that all information on our website is accurate and up to date. However, we make no warranties or representations regarding the completeness, accuracy, reliability, suitability, or availability of the information presented. Any reliance you place on such information is strictly at your own risk.",
  },
  {
    title: "Third Party Links",
    content:
      "Our website may contain links to third-party websites or services that are not owned or controlled by Ractysh Infra Pvt Ltd. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. We recommend reviewing the terms and policies of any third-party sites you visit.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Ractysh Infra Pvt Ltd shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use our website or services. This includes damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.",
  },
  {
    title: "Service Availability",
    content:
      "We strive to keep our website available 24/7 but shall not be liable if for any reason the website is unavailable at any time or for any period. We reserve the right to suspend, restrict, or terminate access to the website for maintenance, updates, or any other reason without prior notice.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu, India.",
  },
  {
    title: "Termination",
    content:
      "We reserve the right to terminate or suspend access to our website and services immediately, without prior notice or liability, for any reason whatsoever, including without limitation a breach of these Terms & Conditions. Upon termination, your right to use the website will cease immediately.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions about these Terms & Conditions, please contact us at ractyshinfrapvtltd@gmail.com. We welcome your feedback and are committed to addressing any concerns you may have regarding your use of our website and services.",
  },
];

export default function TermsConditionsPage() {
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
            <span style={{ color: "#C8A45D" }}>Terms & Conditions</span>
          </nav>
          <div className="max-w-3xl">
            <p
              className="mb-4 inline-flex border border-red-900/50 bg-red-950/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#C8A45D" }}
            >
              Legal
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Terms &{" "}
              <span style={{ color: "#C8A45D" }}>
                Conditions
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
              Questions? Email us at{" "}
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
