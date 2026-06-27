import crypto from "crypto"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

function createSignature(params: Record<string, string>, secret: string): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&")
  return crypto.createHash("sha1").update(sorted + secret).digest("hex")
}

export async function uploadImageBuffer(
  buffer: Buffer,
  filename: string
): Promise<{ url: string; publicId: string }> {
  if (!cloudName || !apiKey || !apiSecret) {
    return fallbackUpload(buffer, filename)
  }

  const timestamp = Math.round(Date.now() / 1000).toString()
  const publicId = `our-works/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`

  const params: Record<string, string> = {
    timestamp,
    public_id: publicId,
    upload_preset: "ml_default",
  }
  const signature = createSignature(params, apiSecret)
  params.signature = signature
  params.api_key = apiKey

  const formData = new FormData()
  formData.append("file", new Blob([new Uint8Array(buffer)]), filename)
  Object.entries(params).forEach(([key, val]) => formData.append(key, val))

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: formData, signal: controller.signal }
    )
    clearTimeout(timeout)
    if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.statusText}`)
    const data = await res.json()
    return { url: data.secure_url, publicId: data.public_id }
  } catch (err) {
    clearTimeout(timeout)
    console.warn("[cloudinary] Upload failed, falling back to local:", err)
    return fallbackUpload(buffer, filename)
  }
}

export async function deleteImage(publicUrl: string): Promise<boolean> {
  const publicId = extractPublicId(publicUrl)
  if (!publicId) return false

  if (!cloudName || !apiKey || !apiSecret) return false

  const timestamp = Math.round(Date.now() / 1000).toString()
  const params: Record<string, string> = { timestamp, public_id: publicId }
  const signature = createSignature(params, apiSecret)
  params.signature = signature
  params.api_key = apiKey

  const body = new URLSearchParams(params)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      { method: "POST", body, signal: controller.signal, headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    clearTimeout(timeout)
    return res.ok
  } catch {
    clearTimeout(timeout)
    return false
  }
}

function extractPublicId(url: string): string | null {
  if (!url || typeof url !== "string") return null
  const match = url.match(/\/v\d+\/(.+)\.\w+$/)
  return match ? match[1] : null
}

async function fallbackUpload(
  buffer: Buffer,
  filename: string
): Promise<{ url: string; publicId: string }> {
  const uploadDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadDir, { recursive: true })
  const unique = `${Date.now()}-${filename}`
  const filePath = path.join(uploadDir, unique)
  await writeFile(filePath, buffer)
  return { url: `/uploads/${unique}`, publicId: unique }
}
