import ConstructionFooter from "@/components/ConstructionFooter";
import ConstructionNavbar from "@/components/ConstructionNavbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Ractysh Infra Pvt Ltd",
  description:
    "Learn how Ractysh Infra Pvt Ltd uses cookies on its website. Understand the types of cookies we use and how to manage them.",
};

const sections = [
  {
    title: "What Cookies Are",
    content:
      "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, enhance user experience, and provide information to website owners. Cookies allow websites to remember your preferences and recognise you on return visits.",
  },
  {
    title: "Essential Cookies",
    content:
      "Essential cookies are necessary for the proper functioning of our website. They enable core functionality such as security, network management, and accessibility. Without these cookies, certain services on our website may not function correctly. These cookies do not collect any personally identifiable information and are automatically activated when you access our site.",
  },
  {
    title: "Analytics Cookies",
    content:
      "We use analytics cookies to collect information about how visitors interact with our website. This helps us understand which pages are most frequently visited, how users navigate our site, and where traffic originates. The data collected is aggregated and anonymised, allowing us to improve our website performance and user experience.",
  },
  {
    title: "Functional Cookies",
    content:
      "Functional cookies enable our website to remember choices you make, such as your preferred language or region, and provide enhanced, more personalised features. These cookies may also be used to remember changes you have made to text size, fonts, and other customisable elements of the website.",
  },
  {
    title: "Managing Cookies",
    content:
      "Most web browsers allow you to control cookies through their settings. You can choose to accept or reject cookies, delete existing cookies, or set your browser to notify you when a cookie is being placed. Please note that disabling certain cookies may affect the functionality and performance of our website.",
  },
  {
    title: "Browser Settings",
    content:
      "You can manage cookie preferences directly through your browser settings. Instructions for popular browsers: Chrome — Settings > Privacy and Security > Cookies and other site data; Firefox — Options > Privacy & Security > Cookies and Site Data; Safari — Preferences > Privacy; Edge — Settings > Cookies and site permissions. Each browser provides detailed guidance on cookie management.",
  },
  {
    title: "Cookie Updates",
    content:
      "We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we use cookies.",
  },
];

export default function CookiePolicyPage() {
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
            <span style={{ color: "#C8A45D" }}>Cookie Policy</span>
          </nav>
          <div className="max-w-3xl">
            <p
              className="mb-4 inline-flex border border-red-900/50 bg-red-950/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#C8A45D" }}
            >
              Legal
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Cookie{" "}
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
              For cookie-related queries, contact{" "}
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
