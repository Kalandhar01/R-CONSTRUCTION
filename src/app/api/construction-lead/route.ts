import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import ConstructionLead from "@/models/ConstructionLead"
import { constructionLeadSchema } from "@/lib/validation"

export const dynamic = "force-dynamic"

const RESEND_EMAILS_API = "https://api.resend.com/emails"
const ADMIN_EMAIL = "ractysh@gmail.com"

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function display(value: string | undefined | null): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : "Not provided"
}

function renderAdminHtml(payload: Record<string, unknown>, submittedAt: string): string {
  const fields = [
    ["Client Name", payload.fullName as string],
    ["Email", payload.email as string],
    ["Phone", display(payload.phone as string)],
    ["Services", (payload.selectedServices as string[]).join(", ")],
    ["Project Type", display(payload.projectType as string)],
    ["Location", display(payload.projectLocation as string)],
    ["Budget", display(payload.budgetRange as string)],
    ["Timeline", display(payload.timeline as string)],
  ]

  const fieldCards = fields
    .map(([label, value]) => `
      <td width="50%" valign="top" style="padding:0 8px 12px 0">
        <div style="border:1px solid #E7E2D9;border-radius:14px;background:#FFFFFF;padding:18px;box-shadow:0 10px 28px rgba(17,17,17,.05)">
          <p style="margin:0 0 8px;color:#A47A2D;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;line-height:14px;text-transform:uppercase">${escapeHtml(label)}</p>
          <p style="margin:0;color:#111111;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;line-height:22px">${escapeHtml(value)}</p>
        </div>
      </td>`)
    .reduce((rows: string[][], card, index) => {
      if (index % 2 === 0) rows.push([])
      rows[rows.length - 1].push(card)
      return rows
    }, [])
    .map((row) => `<tr>${row.join("")}</tr>`)
    .join("")

  const message = payload.message as string | undefined

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Construction Inquiry</title>
<style>@media only screen and (max-width:640px){td{display:block!important;width:100%!important;padding:0 0 12px!important}}</style>
</head><body style="margin:0;padding:0;background:#F8F5EF;color:#111111">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5EF"><tr><td align="center" style="padding:34px 14px 40px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;border-radius:24px;border:1px solid #E7E2D9;background:#FFFFFF;box-shadow:0 18px 70px rgba(17,17,17,.08)">
<tr><td align="center" style="padding:34px 42px 28px">
<p style="margin:0;color:#8F1118;font-family:Georgia,'Times New Roman',serif;font-size:44px;font-weight:700;line-height:40px">R</p>
<p style="margin:6px 0 0;color:#111827;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:.12em;line-height:34px">RACTYSH</p>
<p style="margin:5px 0 0;color:#6B5653;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.28em;line-height:16px;text-transform:uppercase">Construction Contact Desk</p>
<div style="width:48px;height:2px;margin:24px auto 0;background:#A47A2D"></div>
</td></tr>
<tr><td style="height:4px;background:#A3121A;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:32px 42px 34px;border-bottom:1px solid #E7E2D9;background:#FFFCF7">
<p style="margin:0 0 14px;color:#A47A2D;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase">New Lead</p>
<h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:400;line-height:42px">New Construction Inquiry</h1>
<p style="margin:14px 0 0;color:#6A6A6A;font-family:Arial,sans-serif;font-size:13px;line-height:22px">Received ${escapeHtml(submittedAt)}</p>
</td></tr>
<tr><td style="padding:34px 42px 40px;background:#FFFFFF">
<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 26px">${fieldCards}</table>
${message ? `<div style="margin:0 0 30px;padding:24px;border:1px solid #E7E2D9;border-left:4px solid #A3121A;border-radius:14px;background:#FFFCF7">
<p style="margin:0 0 8px;color:#A47A2D;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">Client Message</p>
<p style="margin:0;color:#2F2F2F;font-family:Arial,sans-serif;font-size:15px;line-height:27px;white-space:pre-wrap">${escapeHtml(message)}</p>
</div>` : ""}
<a href="mailto:${escapeHtml(payload.email as string)}" style="display:block;padding:13px 16px;border-radius:8px;background:#A3121A;color:#FFFFFF;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-align:center;text-decoration:none;text-transform:uppercase;box-shadow:0 12px 28px rgba(163,18,26,.2)">Reply to Client</a>
</td></tr>
<tr><td align="center" style="padding:28px 42px 34px;border-top:1px solid #E7E2D9">
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:700;line-height:25px">Ractysh Group</p>
</td></tr>
</table></td></tr></table></body></html>`
}

function renderAutoReplyHtml(payload: Record<string, unknown>): string {
  const name = payload.fullName as string
  const fields = [
    ["Name", payload.fullName as string],
    ["Email", payload.email as string],
    ["Phone", display(payload.phone as string)],
    ["Services", (payload.selectedServices as string[])?.join(", ") || "Not specified"],
    ["Project Type", display(payload.projectType as string)],
    ["Location", display(payload.projectLocation as string)],
    ["Budget Range", display(payload.budgetRange as string)],
    ["Timeline", display(payload.timeline as string)],
  ]

  const fieldRows = fields
    .filter(([_, v]) => v && v !== "Not provided" && v !== "Not specified")
    .map(([label, value]) => `
    <tr><td style="padding:6px 0;font-size:14px;line-height:20px;color:#62584e;border-bottom:1px solid #f0ebe2">
      <span style="font-weight:600;color:#20130f;display:inline-block;width:120px">${escapeHtml(label)}</span>
      <span style="color:#4a3f35">${escapeHtml(value)}</span>
    </td></tr>`)
    .join("")

  const message = payload.message as string | undefined

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thank You — RACTYSH Construction</title></head>
<body style="margin:0;padding:0;background-color:#f8f3ea;font-family:Georgia,'Times New Roman',serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f3ea">
<tr><td align="center" style="padding:40px 16px">
<table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%">
<tr><td style="background:linear-gradient(135deg,#0a0806,#1c120e);border-radius:12px 12px 0 0;padding:32px 40px 24px;text-align:center">
<table cellpadding="0" cellspacing="0" style="margin:0 auto">
<tr><td style="font-size:28px;font-weight:700;letter-spacing:2px;color:#d9bd7a;font-family:Georgia,'Times New Roman',serif">RACTYSH</td></tr>
<tr><td style="font-size:11px;font-weight:400;letter-spacing:4px;color:#d9bd7a;padding-top:4px;text-transform:uppercase">Construction Division</td></tr>
</table></td></tr>
<tr><td style="background-color:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8ddca;border-right:1px solid #e8ddca">
<table cellpadding="0" cellspacing="0" width="100%">
<tr><td style="font-size:28px;font-weight:700;color:#20130f;padding-bottom:8px;font-family:Georgia,'Times New Roman',serif">Thank You, ${escapeHtml(name)}</td></tr>
<tr><td style="height:3px;width:48px;background-color:#d9bd7a;margin:0 0 24px;display:block"></td></tr>
<tr><td style="font-size:16px;line-height:26px;color:#62584e;padding-bottom:16px">We have received your inquiry. A member of our construction team will reach out within <strong style="color:#20130f">24–48 business hours</strong>.</td></tr>
<tr><td><table cellpadding="0" cellspacing="0" width="100%">
<tr><td style="padding:16px 0 8px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a47a2d;font-family:Arial,sans-serif">Your Submission Details</td></tr>
${fieldRows}
</table></td></tr>
${message ? `<tr><td style="padding:16px 0 0">
<div style="padding:16px;border-left:3px solid #a47a2d;background:#fcf9f4;border-radius:8px">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a47a2d;font-family:Arial,sans-serif">Your Message</p>
<p style="margin:0;font-size:14px;line-height:22px;color:#4a3f35">${escapeHtml(message)}</p>
</div>
</td></tr>` : ""}
</table></td></tr>
<tr><td style="background:linear-gradient(135deg,#0a0806,#1c120e);border-radius:0 0 12px 12px;padding:24px 40px;text-align:center">
<p style="font-size:12px;line-height:18px;color:#9d8a74;margin:0;font-family:Arial,Helvetica,sans-serif">RACTYSH GROUP — CONSTRUCTION DIVISION</p>
<p style="font-size:11px;line-height:18px;color:#7a6a58;margin:4px 0 0;font-family:Arial,Helvetica,sans-serif">This is an automated acknowledgement.</p>
</td></tr>
</table></td></tr></table></body></html>`
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 })
    }

    const parsed = constructionLeadSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Validation failed."
      return NextResponse.json({ success: false, error: message }, { status: 400 })
    }

    const payload = parsed.data

    await dbConnect()

    const lead = await ConstructionLead.create({
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone || undefined,
      selectedServices: payload.selectedServices || [],
      projectType: payload.projectType || undefined,
      projectLocation: payload.projectLocation || undefined,
      budgetRange: payload.budgetRange || undefined,
      timeline: payload.timeline || undefined,
      message: payload.message || undefined,
      status: "new",
    })

    const submittedAt = new Date().toISOString()

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Ractysh Construction <construction@ractysh.com>"

    // Admin notification (fire-and-forget)
    if (apiKey) {
      fetch(RESEND_EMAILS_API, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: [ADMIN_EMAIL],
          reply_to: payload.email,
          subject: `New Construction Inquiry - ${payload.fullName}`,
          html: renderAdminHtml({ ...payload }, submittedAt),
          tags: [{ name: "source", value: "construction-lead" }],
        }),
        signal: AbortSignal.timeout(8_000),
      }).catch((err) => console.error("[construction-lead] Admin notification failed:", err))
    }

    // Auto-reply to submitter (fire-and-forget)
    if (apiKey) {
      fetch(RESEND_EMAILS_API, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: payload.email,
          subject: `Thank You, ${payload.fullName} — RACTYSH Construction`,
          html: renderAutoReplyHtml({ ...payload }),
        }),
        signal: AbortSignal.timeout(8_000),
      }).catch((err) => console.error("[construction-lead] Auto-reply failed:", err))
    }

    return NextResponse.json(
      { success: true, message: "Thank you. Your inquiry has been received.", id: lead._id },
      { status: 201 },
    )
  } catch (error) {
    console.error("[construction-lead] Error:", error)
    return NextResponse.json(
      { success: false, error: "Unable to process your inquiry. Please try again." },
      { status: 503 },
    )
  }
}
