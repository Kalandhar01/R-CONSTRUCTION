"use client";

import {
  Check,
  ChevronDown,
  X,
  ArrowRight,
  Building2,
  HardHat,
  ClipboardCheck,
  LineChart,
  ShieldCheck,
  Send,
  Phone,
  Mail,
  User,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { type FormEvent, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const simplifiedServices = [
  { title: "Commercial Building Construction" },
  { title: "Residential Construction" },
  { title: "Infrastructure Development" },
  { title: "MEP Engineering Works" },
  { title: "Government Tender Execution" },
  { title: "Labour Contract Services" },
];

const primary = "#B91C1C";
const secondary = "#DC2626";
const accent = "#EF4444";
const darkRed = "#7F1D1D";
const lightRed = "#FEE2E2";

function ServiceMultiSelect({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggle = (title: string) => {
    onChange(
      selected.includes(title)
        ? selected.filter((t) => t !== title)
        : [...selected, title],
    );
  };

  const filtered = simplifiedServices.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#6B6560" }}>
        Services Required
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-all"
        style={{ borderColor: "#D1D5DB", backgroundColor: "#FFFFFF" }}
      >
        <span style={{ color: selected.length ? "#1A1A1A" : "#9CA3AF" }}>
          {selected.length
            ? `${selected.length} service${selected.length > 1 ? "s" : ""} selected`
            : "Select services..."}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: primary }}
        />
      </button>

      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((title) => (
            <span
              key={title}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
              style={{
                backgroundColor: lightRed,
                color: primary,
                border: `1px solid ${secondary}`,
              }}
            >
              {title}
              <button
                type="button"
                onClick={() => toggle(title)}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border shadow-lg" style={{ borderColor: "#D1D5DB", backgroundColor: "#FFFFFF" }}>
          <Command>
            <CommandInput
              placeholder="Search services..."
              value={search}
              onValueChange={setSearch}
              className="text-sm"
            />
            <CommandList>
              <CommandEmpty>No services found.</CommandEmpty>
              <CommandGroup>
                {filtered.map((service) => (
                  <CommandItem
                    key={service.title}
                    onSelect={() => toggle(service.title)}
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                  >
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border transition-colors`}
                      style={{
                        backgroundColor: selected.includes(service.title)
                          ? primary
                          : "transparent",
                        borderColor: selected.includes(service.title)
                          ? primary
                          : "#D1D5DB",
                      }}
                    >
                      {selected.includes(service.title) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    {service.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}

export default function ContactSectionWithShader() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const leftEls = leftRef.current?.querySelectorAll(".gsap-l");
      if (leftEls && leftEls.length) {
        tl.fromTo(
          leftEls,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
        );
      }

      if (rightRef.current) {
        tl.fromTo(
          rightRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.3",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/construction-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedServices,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="overflow-hidden px-6 py-48 sm:px-10 lg:px-16"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]" style={{ backgroundColor: accent }} />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]" style={{ backgroundColor: primary }} />
      </div>
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ===== LEFT: EDITORIAL ===== */}
          <div ref={leftRef} className="flex flex-col justify-center">
            <p className="gsap-l text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: primary }}>
              Start Your Consultation
            </p>
            <h2 className="gsap-l mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: "#1A1A1A" }}>
              Tell us what<br />
              <span style={{ color: primary }}>you&apos;re building.</span>
            </h2>
            <p className="gsap-l mt-5 max-w-md text-sm leading-relaxed" style={{ color: "#6B6560" }}>
              Ractysh Infra Pvt Ltd delivers integrated construction
              and engineering services — from infrastructure to handover. Share
              your requirements and our team will respond with a tailored
              proposal within 24 hours.
            </p>

            {/* Discipline tags */}
            <div className="gsap-l mt-8 flex flex-wrap gap-2">
              {[
                { icon: Building2, label: "Construction" },
                { icon: HardHat, label: "Engineering" },
                { icon: ClipboardCheck, label: "PMC" },
                { icon: LineChart, label: "Infrastructure" },
                { icon: ShieldCheck, label: "Government" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
                  style={{ borderColor: "#D1D5DB", backgroundColor: "#FFFFFF", color: "#4A4540" }}
                >
                  <item.icon className="h-3.5 w-3.5" style={{ color: primary }} />
                  {item.label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="gsap-l mt-10 grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: "#E5E7EB" }}>
              {[
                { value: "25+", label: "Integrated Services" },
                { value: "250+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold" style={{ color: primary }}>{stat.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em]" style={{ color: "#6B6560" }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="gsap-l mt-8 flex items-center gap-4 text-xs" style={{ color: "#9CA3AF" }}>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: primary }} />
                ISO-aligned processes
              </span>
              <span className="flex items-center gap-1.5">
                <ClipboardCheck className="h-3.5 w-3.5" style={{ color: primary }} />
                24hr response
              </span>
            </div>
          </div>

          {/* ===== RIGHT: FORM ===== */}
          <div ref={rightRef}>
            <div
              className="rounded-2xl border p-8 shadow-sm"
              style={{ borderColor: "#D1D5DB", backgroundColor: "#FFFFFF" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: lightRed }}
                  >
                    <Check className="h-8 w-8" style={{ color: primary }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: "#1A1A1A" }}>
                    Consultation Request Received
                  </h3>
                  <p className="mt-3 max-w-sm text-sm" style={{ color: "#6B6560" }}>
                    Thank you. Our team will review your requirements
                    and get back to you within 24 hours with a tailored
                    proposal.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: primary }}
                  >
                    Back to Home <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-bold" style={{ color: "#1A1A1A", paddingTop: "2rem" }}>
                    Book a Consultation
                  </h3>
                  <p className="text-sm" style={{ color: "#6B6560" }}>
                    Select the services you need and we&apos;ll prepare a
                    customised proposal.
                  </p>

                  {/* Services Multi-Select */}
                  <ServiceMultiSelect
                    selected={selectedServices}
                    onChange={setSelectedServices}
                  />

                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#6B6560" }}>
                      <User className="mr-1 inline h-3 w-3" />
                      Full Name
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all focus:ring-2"
                      style={{
                        borderColor: "#D1D5DB",
                        backgroundColor: "#F9FAFB",
                        color: "#1A1A1A",
                      }}
                      placeholder="Your full name"
                      onFocus={(e) => {
                        e.target.style.borderColor = primary;
                        e.target.style.boxShadow = `0 0 0 2px ${lightRed}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#D1D5DB";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#6B6560" }}>
                        <Mail className="mr-1 inline h-3 w-3" />
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all focus:ring-2"
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          color: "#1A1A1A",
                        }}
                        placeholder="email@example.com"
                        onFocus={(e) => {
                          e.target.style.borderColor = primary;
                          e.target.style.boxShadow = `0 0 0 2px ${lightRed}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#D1D5DB";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#6B6560" }}>
                        <Phone className="mr-1 inline h-3 w-3" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all focus:ring-2"
                        style={{
                          borderColor: "#D1D5DB",
                          backgroundColor: "#F9FAFB",
                          color: "#1A1A1A",
                        }}
                        placeholder="+91 98765 43210"
                        onFocus={(e) => {
                          e.target.style.borderColor = primary;
                          e.target.style.boxShadow = `0 0 0 2px ${lightRed}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#D1D5DB";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-xs" style={{ color: secondary }}>{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                    style={{
                      background: `linear-gradient(135deg, ${darkRed}, ${primary})`,
                      boxShadow: `0 4px 20px ${primary}66`,
                    }}
                  >
                    <span className="absolute inset-0 transition-all duration-300 group-hover:opacity-0"
                      style={{
                        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                      }}
                    />
                    <span className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${secondary}, ${accent})`,
                      }}
                    />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Consultation Request
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
                    We&apos;ll respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
