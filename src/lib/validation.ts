import { z } from "zod";

export const constructionLeadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+]?[\d\s()-]{7,20}$/,
      "Invalid phone number",
    )
    .optional()
    .or(z.literal(""))
    .nullable(),
  selectedServices: z.array(z.string().trim()).optional().default([]).nullable(),
  projectType: z.string().trim().optional().nullable(),
  projectLocation: z.string().trim().optional().nullable(),
  budgetRange: z.string().trim().optional().nullable(),
  timeline: z.string().trim().optional().nullable(),
  message: z.string().trim().optional().nullable(),
});

export type ConstructionLeadInput = z.infer<typeof constructionLeadSchema>;

export const leadStatusUpdateSchema = z.object({
  status: z.enum([
    "new",
    "contacted",
    "qualified",
    "proposal_sent",
    "won",
    "lost",
  ]),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const sanitize = (input: string): string =>
  input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
