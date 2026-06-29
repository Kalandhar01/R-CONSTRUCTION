import ConstructionFooter from "@/components/ConstructionFooter";
import ConstructionNavbar from "@/components/ConstructionNavbar";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/privacy-policy"]);

const sections = [
  {
    title: "Introduction",
    content:
      "Ractysh Infra Pvt Ltd ('we', 'our', 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services. Please read this policy carefully to understand our views and practices regarding your personal data.",
  },
  {
    title: "Information We Collect",
    content:
      "We may collect personal identification information such as your name, email address, phone number, and company name when you fill out contact forms, subscribe to newsletters, or apply for careers. We also collect non-personal data including browser type, device information, and usage patterns through analytics tools to improve our website experience.",
  },
  {
    title: "Personal Information",
    content:
      "Personal information refers to any data that identifies you as an individual. This includes your name, email address, telephone number, postal address, and professional details. We only collect such information when voluntarily provided by you through our forms or direct communication channels.",
  },
  {
    title: "Contact Forms",
    content:
      "When you submit a contact form on our website, we collect your name, email address, phone number, and message content. This information is used solely to respond to your inquiry. We retain this data for a reasonable period to provide follow-up support and services as requested.",
  },
  {
    title: "Careers Applications",
    content:
      "Job applicants who submit their details through our careers section provide us with personal information including but not limited to name, contact details, work history, educational qualifications, and resume attachments. This information is used exclusively for recruitment and hiring purposes.",
  },
  {
    title: "Newsletter Subscriptions",
    content:
      "If you subscribe to our newsletter, we collect your email address and name to send you updates about our projects, services, and industry insights. You may unsubscribe at any time by clicking the unsubscribe link provided in every email communication.",
  },
  {
    title: "Cookies",
    content:
      "Our website uses cookies to enhance your browsing experience, analyse site traffic, and understand where our visitors come from. Cookies are small text files stored on your device. You can control cookie preferences through your browser settings. For detailed information, refer to our Cookie Policy.",
  },
  {
    title: "Analytics",
    content:
      "We use analytics services to collect and analyse information about how users interact with our website. This includes pages visited, time spent on pages, referral sources, and geographic location. This data is aggregated and anonymised — it does not identify individual users personally.",
  },
  {
    title: "Data Security",
    content:
      "We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Despite our efforts, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Third-Party Services",
    content:
      "We may engage trusted third-party service providers to perform functions on our behalf, such as hosting, analytics, email delivery, and payment processing. These providers have access to personal information only to the extent necessary to perform their functions and are contractually obligated to protect your data.",
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website and conducting business, provided they agree to keep your information confidential and comply with applicable data protection laws.",
  },
  {
    title: "User Rights",
    content:
      "You have the right to access, update, correct, or delete your personal information held by us. You may also object to or restrict the processing of your data. To exercise these rights, please contact us using the information provided at the end of this policy. We will respond to your request within applicable legal timeframes.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable laws and regulations. Once the retention period expires, your data will be securely deleted or anonymised.",
  },
  {
    title: "Children's Privacy",
    content:
      "Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information promptly.",
  },
  {
    title: "Policy Updates",
    content:
      "We reserve the right to update or modify this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at ractyshinfrapvtltd@gmail.com. We are committed to addressing your concerns and resolving any issues in a timely manner.",
  },
];

export default function PrivacyPolicyPage() {
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
            <span style={{ color: "#C8A45D" }}>Privacy Policy</span>
          </nav>
          <div className="max-w-3xl">
            <p
              className="mb-4 inline-flex border border-red-900/50 bg-red-950/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#C8A45D" }}
            >
              Legal
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Privacy{" "}
              <span style={{ color: "#C8A45D" }}>
                Policy
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
              For any privacy-related concerns, email us at{" "}
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
